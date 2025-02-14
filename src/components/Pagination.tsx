import React from 'react';

interface PaginationProps {
    moviesPerPage: number;
    totalMovies: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ moviesPerPage, totalMovies, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center mt-4">
                {pageNumbers.map(number => (
                    <li key={number} className="mx-1">
                        <button
                            onClick={() => paginate(number)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
