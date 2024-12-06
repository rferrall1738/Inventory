import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import UserLogin from './LoginForm'
import Item from './Item'
import UserSignup from './SignUpPage'
import ProtectedRoutes from './ProtectedRoutes'
import CreateItem from './CreateItem';
import Verification from './Verification';
import MyItems from './MyItems';

function App() {
    const isAuthenticated = localStorage.getItem('token') ? true:false;
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<UserLogin />} />   {/* Login page */}
                <Route path="/login" element={<UserLogin />} /> {/* page */}
                <Route path="/signup" element={<UserSignup />} /> {/*Signup page */}
                <Route path="/verify-email" element={<Verification />} /> {/* Verification page */}
                {/* Private Routes */}
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/items/:id" element={<Item />} />
                    <Route path="/create-item" element={<CreateItem/>}/>
                    <Route path = "/myItems" element={<MyItems/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
