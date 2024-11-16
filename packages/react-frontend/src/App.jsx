import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UserLogin from './LoginForm';
import UserSignup from './SignUpPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLogin />} />   {/* Login page */}
                <Route path="/home" element={<HomePage />} />  {/* Home page */}
                <Route path="/signup" element={<UserSignup/>}/> {/*Signup page */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;