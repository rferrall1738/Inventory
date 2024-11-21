import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UserLogin from './LoginForm';
import Item from './Item';
import UserSignup from './SignUpPage';
import ProtectedRoutes from './ProtectedRoutes'

function App() {
    const isAuthenticated = localStorage.getItem('token') ? true:false;
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<UserLogin />} />   {/* Login page */}
                <Route path="/login" element={<UserLogin />} /> {/* page */}
                <Route path="/signup" element={<UserSignup />} /> {/*Signup page */}
                {/* Private Routes */}
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/items/:id" element={<Item />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
