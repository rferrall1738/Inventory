import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UserLogin from './LoginForm';
import UserSignup from './SignUpPage';
import ProtectedRoutes from './ProtectedRoutes'


function App() {
    const isAuthenticated = localStorage.getItem('token') ? true:false;
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<UserLogin />} />   {/* Login page */}
                <Route path="/login" element={<UserLogin />} /> {/*Signup page */}
                <Route path="/signup" element={<UserSignup />} /> {/*Signup page */}
                {/* Private Routes */}
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;