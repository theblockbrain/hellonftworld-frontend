import "./PaginationNav.css";

const PaginationNav = (props) => {
  return (
    <div className="pagination-row">
      <div className="pagination">
        {props.currentPage > 1 && (
          <div
            className="pagination_item"
            onClick={() => props.onChangePage(0)}
          >
            1
          </div>
        )}
        {props.currentPage > 2 && <div className="pagination_dots">⋯</div>}
        {props.currentPage > 0 && (
          <div
            className="pagination_item"
            onClick={() => props.onChangePage(props.currentPage - 1)}
          >
            {props.currentPage}
          </div>
        )}
        <div className="pagination_item current">{props.currentPage + 1}</div>
        {props.currentPage + 1 < props.lastPage && (
          <div
            className="pagination_item"
            onClick={() => props.onChangePage(props.currentPage + 1)}
          >
            {props.currentPage + 2}
          </div>
        )}
        {props.currentPage + 1 < props.lastPage && (
          <div className="pagination_dots">⋯</div>
        )}
        {props.currentPage < props.lastPage && (
          <div
            className="pagination_item"
            onClick={() => props.onChangePage(props.lastPage)}
          >
            {props.lastPage + 1}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationNav;
