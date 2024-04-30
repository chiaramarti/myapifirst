import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const MyPagination = ({ totalPages, activePage, onPageChange }) => {
    return (
        <div className="mt-4 d-flex justify-content-center">
            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === activePage}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default MyPagination;
