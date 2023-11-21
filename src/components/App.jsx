import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
    Container,
    TextField,
    Link,
    Stack,
} from '@mui/material'
import { XPagination } from './XPagination'



const BASE_URL = 'http://hn.algolia.com/api/v1/search?'
const App = () => {
    const [query, setQuery] = useState('react');
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [pageQty, setPageQty] = useState(0);


    useEffect(() => {
        axios.get(BASE_URL + `query=${query} + &page=${page - 1}`)
            .then(({ data }) => {
                console.log(data);
                setPosts(data.hits);
                setPageQty(data.nbPages)
                if (data.nbPages < page) {
                    setPage(1);
                }
            })

    }, [query, page]);

    const handlePagination = (_, num) => {
        setPage(num)
    }
    return (
        <Container maxWidth="md">

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
                            hred={post.url}
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
        </Container>
    );
}

export default App;
