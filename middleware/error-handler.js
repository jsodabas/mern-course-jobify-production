import { StatusCodes } from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong. Please try again later'
    }
    if(err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    }
    if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: defaultError.msg})
}

export default errorHandler