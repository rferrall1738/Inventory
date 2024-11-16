import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UserLogin from './LoginForm';
import Item from './Item';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLogin />} />   {/* Login page */}
                <Route path="/home" element={<HomePage />} />  {/* Home page */}
                <Route path="/item/:id" element={<Item />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;