import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import React from 'react'

const AppPagination = ({resultLimit, productsCount}) => {

    const [currentPage, setCurrentPage] = useState();

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        
        if(searchParams.has('page')) {
            searchParams.set('page', pageNumber);
        } else {
            searchParams.append('page', pageNumber);
        }
        const pagePath = window.location.pathname + '?' + searchParams.toString();
        navigate(pagePath)
    }

    return (
        <div className="flex justify-center">
            {productsCount > resultLimit && (<Pagination 
            activePage={currentPage} 
            itemsCountPerPage={resultLimit} 
            totalItemsCount={productsCount} 
            pageRangeDisplayed={5} 
            onChange={changePage} 
            nextPageText={"Next"} 
            prevPageText={"Prev"} 
            firstPageText={"First"} 
            lastPageText={"Last"} 
            itemClass="page-item" 
            linkClass="page-link"/>)}
        </div>
    )
}

export default AppPagination
