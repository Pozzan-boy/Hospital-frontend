import React from 'react';
import ReactPaginate from 'react-paginate';

import './pagination.scss';

export const Pagination = ({ currentPage, onChangePage, pageCount, itemsPerPage, currentList }) => {

  const isLastItemDeleted = currentList.length === 0 ;
  React.useEffect(() => {
    if (isLastItemDeleted && currentPage>1) {
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
