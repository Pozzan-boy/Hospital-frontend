// import React from 'react';
// import ReactPaginate from 'react-paginate';
// import { useSelector } from 'react-redux';

// import  './pagination.scss';



// export const Pagination = ({ currentPage, onChangePage, pageCount}) => (
  

//   <ReactPaginate
//     nextLabel=">"
//     previousLabel="<"

//     forcePage={currentPage - 1}
//     breakLabel="..."

//     onPageChange={onChangePage}
//     pageRangeDisplayed={5}
//     pageCount={pageCount}
  
//     renderOnZeroPageCount={null}
//     containerClassName={"paginationBttns"}
//     previousLinkClassName={"previousBttn"}
//     nextLinkClassName={"nextBttn"}
//     disabledClassName={"paginationDisabled"}
//     activeClassName={"paginationActive"}
//   />
// );
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import './pagination.scss';

export const Pagination = ({ currentPage, onChangePage, pageCount, itemsPerPage, totalItemsCount }) => {
  const lastItemIndex = currentPage * itemsPerPage - 1;
  const isLastItemDeleted = lastItemIndex >= totalItemsCount;

  // if the last item on the current page is deleted, go to the previous page
  React.useEffect(() => {
    if (isLastItemDeleted && currentPage > 1) {
      onChangePage({ selected: currentPage - 2 });
    }
  }, [isLastItemDeleted]);

  return (
    <ReactPaginate
      nextLabel=">"
      previousLabel="<"
      forcePage={currentPage - 1}
      breakLabel="..."
      onPageChange={onChangePage}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      containerClassName={'paginationBttns'}
      previousLinkClassName={'previousBttn'}
      nextLinkClassName={'nextBttn'}
      disabledClassName={'paginationDisabled'}
      activeClassName={'paginationActive'}
    />
  );
};
