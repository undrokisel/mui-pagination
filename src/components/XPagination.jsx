import React from 'react'
import { Pagination } from '@mui/material'

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
        />
    )
}
