import { Container, } from '@mui/material'
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { NotFound } from '../pages/NotFound';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Container maxWidth="md">
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
    );
}

export default App;
