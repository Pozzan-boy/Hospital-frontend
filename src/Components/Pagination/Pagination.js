import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import  './pagination.scss';



export const Pagination = ({ currentPage, onChangePage, pageCount}) => (
  

  <ReactPaginate
    nextLabel=">"
    previousLabel="<"

    forcePage={currentPage - 1}
    breakLabel="..."

    onPageChange={onChangePage}
    pageRangeDisplayed={5}
    pageCount={pageCount}
  
    renderOnZeroPageCount={null}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}
  />
);