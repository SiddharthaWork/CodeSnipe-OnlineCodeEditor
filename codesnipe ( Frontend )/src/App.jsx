import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Code from './pages/Code';
import MainNavbar from './components/MainNavbar';
import TopNavbar from './pages/TopNavbar';
import EditorNavbar from './pages/EditorNavbar';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};
function AppWrapper() {
  const location = useLocation();
  const isEditorPage = location.pathname.startsWith('/editor/');

  return (
      <div className="min-h-screen flex flex-col">
        <header className='w-full h-fit z-50 '>
          <MainNavbar />
          {isEditorPage ? <EditorNavbar /> : <TopNavbar />}
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
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}

export default App
