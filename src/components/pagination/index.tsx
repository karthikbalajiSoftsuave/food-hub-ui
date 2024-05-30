import { FC } from 'react';
import './style.scss';

interface IProps {
  currentPage: number;
  onHandleChange: (_page: number) => void;
  totalCount: number;
}

const Pagination: FC<IProps> = ({
  onHandleChange,
  totalCount,
  currentPage,
}) => {
  const isNextDisabled = totalCount / (currentPage * 10) < 1;
  return (
    <div className="common_pagination_container">
      <div className="row_content_decider">
        {/* <p className="rows_page">Rows per Page {`${perPage}`}</p> */}
      </div>
      <nav>
        <ul className="common_pagination_ul">
          {currentPage > 1 && (
            <li>
              <button
                className={`common_pagination_button`}
                type="button"
                onClick={() => {
                  onHandleChange(currentPage ? currentPage - 1 : 1);
                }}>
                Prev
              </button>
            </li>
          )}
          <li>
            <button
              className={`common_pagination_button common_pagination_selected`}
              type="button">
              {currentPage}
            </button>
          </li>
          {!isNextDisabled && (
            <li>
              <button
                className={`common_pagination_button`}
                type="button"
                onClick={() => {
                  onHandleChange(currentPage ? currentPage + 1 : 1);
                }}>
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
