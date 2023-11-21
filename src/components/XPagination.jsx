import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Link as NavLink } from 'react-router-dom';

export const XPagination = ({ count, page, handlePagination }) => {
    return (
        <Pagination
            sx={{ margin: '20px', display: 'flex', justifyContent: "center" }}
            count={count}
            page={page}
            color="primary"
            showLastButton
            showFirstButton
            onChange={handlePagination}
            renderItem={(item) => (
                <PaginationItem
                    component={NavLink}
                    to={`/?page=${item.page}`}
                    {...item}
                />
            )}
        />
    )
}
