import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import moment from 'moment'
import {BadRequestError, NotFoundError} from '../errors/index.js'
import Jobs from '../models/Jobs.js'
import checkPermissions from "../utils/checkPermissions.js"

const createJob = async (req, res) => {
    const {position, company, jobLocation} = req.body
    if(!position || !company || !jobLocation) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const getAllJobs = async (req, res) => {
    const {search, status, jobType, sort} = req.query
    const queryObject = {
        createdBy: req.user.userId,
    }
    // add stuff based on conditions
    if(status && status !== 'all') {
        queryObject.status = status
    }
    if(jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }
    if(search) {
        queryObject.position = {$regex: search, $options: 'i'}
    }
    // NO AWAIT
    let result = Jobs.find(queryObject)
    // chain sort conditions
    if(sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if(sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if(sort === 'a-z') {
        result = result.sort('position')
    }
    if(sort === 'z-a') {
        result = result.sort('-position')
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const jobs = await result

    const totalJobs = await Jobs.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)

    res.status(StatusCodes.OK).json({jobs, totalJobs, numOfPages})
}

const deleteJob = async (req, res) => {
    const {id: jobId} = req.params
    const job = await Jobs.findOne({_id: jobId})
    if(!job) {
        throw new NotFoundError(`No job with id : ${jobId}`)
    }
    checkPermissions(req.user, job.createdBy)
    await job.remove()
    res.status(StatusCodes.OK).json({msg: 'Success! Job removed'})
}

const updateJob = async (req, res) => {
    const {id: jobId} = req.params
    const {position, company} = req.body
    if(!position || !company) {
        throw new BadRequestError('Please provide all values')
    }
    const job = await Jobs.findOne({_id: jobId})
    if(!job) {
        throw new NotFoundError(`Not found with id: ${jobId}`)
    }
    // checking of permission
    checkPermissions(req.user, job.createdBy)
    const updatedJobs = await Jobs.findOneAndUpdate({_id: jobId}, req.body, {
        new: true,
        runValidators: true
    })
    res.status(StatusCodes.OK).json({updatedJobs})
}

const showStats = async (req, res) => {
    let stats = await Jobs.aggregate([
        { $match: {createdBy: mongoose.Types.ObjectId(req.user.userId)} },
        { $group: {_id: '$status', count: {$sum: 1}} }
    ])

    stats = stats.reduce((accumulator, currentValue) => {
        const {_id: title, count} = currentValue
        accumulator[title] = count
        return accumulator
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }

    let monthlyApplications = await Jobs.aggregate([
        { $match: {createdBy: mongoose.Types.ObjectId(req.user.userId)} },
        { $group: {
            _id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
            count: {$sum: 1},
        }},
        {$sort: {'_id.year': -1, '_id.month': -1}},
        {$limit: 6},
    ])

    monthlyApplications = monthlyApplications.map((item) => {
        const {_id: {year, month}, count} = item
        const date = moment().month(month -1).year(year).format('MMM Y')
        return {date, count}
    }).reverse()

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}