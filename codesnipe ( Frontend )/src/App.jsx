import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Code from './pages/Code';
import MainNavbar from './components/MainNavbar';
import TopNavbar from './pages/TopNavbar';

// Protected Route component
// Create a Protected Route Improve the code reuse and optimizing
// Create a Protected Route Componente to protect the routes and Improve the code reuse and optimizing
// Create a Protected Route Componente to protect the routes and Improve the code optimizing and reuse
// Some changes in the Protected Routes and the UI of the Website
// Changes in the Protected Routes Sections
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <header className='w-full h-fit z-50 '>
          <MainNavbar />
          <TopNavbar />
        </header>
        
        <main className='flex-1 w-full overflow-x-hidden mt-4'>
          <Routes> 
            <Route path='/' element={<Home />} />            
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route 
              path='/code' 
              element={
                <ProtectedRoute>
                  <Code />
                </ProtectedRoute>
              } 
            />
            <Route path='/editor/:projectid' element={<Editor />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
