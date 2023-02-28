import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer.js'
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'
import { useAppContext } from '../context/AppContext.js'

const PageBtnContainer = () => {
    const {numOfPages, page, changePage} = useAppContext()

    const pages = Array.from({length: numOfPages}, (_, index) => {
        return index + 1
    })
    
    const prevPage = () => {
        let newPage = page - 1
        if(newPage < 1) {
            newPage = numOfPages
        }
        changePage(newPage)
    }
    
    const nextPage = () => {
        let newPage = page + 1
        if(newPage > numOfPages) {
            newPage = 1
        }
        changePage(newPage)
    }

  return (
    <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
            <HiChevronDoubleLeft />
            prev
        </button>
        <div className='btn-container'>
            {
                pages.map((pageNumber) => {
                    return (
                        <button type='button' className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={() => changePage(pageNumber)}>{pageNumber}</button>
                    )
                })
            }
        </div>
        <button className='next-btn' onClick={nextPage}>
            <HiChevronDoubleRight />
            next
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer