import styles from './pagination.module.scss'

import ArrowLeftIcon from '../UI/icons/ArrowLeftIcon'
import ArrowRightIcon from '../UI/icons/ArrowRightIcon'

interface IPaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (arg: number) => void
}

const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  
  let pages: number[] = []

  for (let i = 0; i < totalPages; i++) {
    pages = [...pages, i + 1]
  }

  return (
    <section className={styles.pagination}>
      <div className="container">
        <div className="wrap">
          <div
            className={
              1 !== currentPage
                ? styles.pagination__arrow + ' ' + styles.active
                : styles.pagination__arrow
            }
            onClick={() => 1 !== currentPage && setCurrentPage(currentPage - 1)}
          >
            <ArrowLeftIcon />
            <span>Prev</span>
          </div>
          <ul>
            {currentPage > 3 && <li onClick={() => setCurrentPage(1)}>1</li>}
            {pages.map(
              (page) =>
                currentPage - 2 < page &&
                page < 3 + currentPage && (
                  <li
                    className={page === currentPage ? styles.active : ''}
                    onClick={() => setCurrentPage(page)}
                    key={page}
                  >
                    {page}
                  </li>
                )
            )}
            {pages.length > 3 && pages.length > currentPage + 2 && (
              <li onClick={() => setCurrentPage(pages.length)}>
                <span>...</span>
                {pages.length}
              </li>
            )}
          </ul>
          <div
            className={
              totalPages !== currentPage
                ? styles.pagination__arrow + ' ' + styles.active
                : styles.pagination__arrow
            }
            onClick={() =>
              totalPages !== currentPage && setCurrentPage(currentPage + 1)
            }
          >
            <span>Next</span>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pagination
