import React, { useEffect, useState, useCallback } from 'react'
import Paginator from 'paginator'
import * as PropTypes from 'prop-types'

import './style.scss'

let paginator

const Pagination = ({ currentPage, totalRecords, itemPerPage, onChangePage }) => {
  const [totalPages, setTotalPages] = useState(1)
  const [firstPage, setFirstPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const updatePagination = useCallback(() => {
    const paginationInfo = paginator.build(totalRecords, currentPage)

    setTotalPages(paginationInfo.total_pages)
    setFirstPage(paginationInfo.first_page)
    setLastPage(paginationInfo.last_page)
  }, [currentPage, totalRecords])

  const changePage = newPage => {
    onChangePage(newPage)
  }

  useEffect(() => {
    paginator = new Paginator(itemPerPage, 5)
    updatePagination()
  }, [itemPerPage, updatePagination])

  useEffect(() => {
    updatePagination()
  }, [currentPage, totalRecords, updatePagination])

  const renderPages = () => {
    const pages = []
    for (let i = firstPage; i <= lastPage; i += 1) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <a
            className="page-link"
            onClick={
              i === currentPage
                ? () => {
                    return false
                  }
                : () => changePage(i)
            }
          >
            {i}
          </a>
        </li>
      )
    }
    return pages
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {firstPage !== 1 ? (
          <li className="page-item">
            <a className="page-link" onClick={() => changePage(1)}>
              1
            </a>
          </li>
        ) : (
          ''
        )}

        {firstPage > 1 ? (
          <li className="page-item">
            <span className="page-link disabled">...</span>
          </li>
        ) : (
          ''
        )}

        {renderPages()}

        {lastPage < totalPages ? (
          <li className="page-item">
            <span className="page-link disabled">...</span>
          </li>
        ) : (
          ''
        )}

        {lastPage !== totalPages ? (
          <li className="page-item">
            <a className="page-link" onClick={() => changePage(totalPages)}>
              {totalPages}
            </a>
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalRecords: PropTypes.number,
  itemPerPage: PropTypes.number,
  onChangePage: PropTypes.func
}

Pagination.defaultProps = {
  currentPage: 1,
  totalRecords: 1,
  itemPerPage: 10,
  onChangePage: () => {}
}

export default Pagination
