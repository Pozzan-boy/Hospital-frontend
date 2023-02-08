import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import  './pagination.scss';



export const Pagination = ({ currentPage, onChangePage, pageCount}) => (
    
  <ReactPaginate
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pageCount}
    forcePage={currentPage - 1}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}
  />
);