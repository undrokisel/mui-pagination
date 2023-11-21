import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
    TextField,
    Link,
    Stack,
} from '@mui/material'
import { XPagination } from '../components/XPagination'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

export const Home = () => {

    const location = useLocation();
    const navigate = useNavigate()

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(
        parseInt(location.search?.split('=')[1] || 1)
    );
    const [posts, setPosts] = useState([]);
    const [pageQty, setPageQty] = useState(0);


    useEffect(() => {
        axios.get(BASE_URL + `query=${query} + &page=${page - 1}`)
            .then(({ data }) => {
                setPosts(data.hits);
                setPageQty(data.nbPages)
                if (data.nbPages < page) {
                    setPage(1);
                    navigate('/?page=1',
                        { replace: true }
                    )
                }
            })

    }, [query, page, navigate]);

    const handlePagination = (_, num) => {
        setPage(num)
    }
    
    return (
        <>
            <TextField
                sx={{ mt: '20px', mb: "20px" }}
                label="query"
                fullWidth
                color="primary"
                value={query}
                onChange={(e) => { setQuery(e.target.value) }}
            />
            {!!pageQty && (
                <XPagination
                    count={pageQty}
                    page={page}
                    handlePagination={handlePagination}
                />
            )
            }
            <Stack spacing={2}>
                {
                    posts.length > 0 && posts.map(post => (
                        <Link
                            key={post.objectID}
                            href={post.url}
                            variant="body1">
                            {post.title || post.story_title}
                        </Link>
                    ))
                }
                {!!pageQty && (
                    <XPagination
                        count={pageQty}
                        page={page}
                        handlePagination={handlePagination}
                    />
                )
                }
            </Stack>
        </>
    )
}
