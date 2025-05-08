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
import SearchPage from './pages/SearchPage';
import SearchPractice from './pages/SearchPractice';
import UploadForm from './pages/Upload';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const LoginProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Navigate to="/" /> : children;
}

const LoginProtection = [
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  }
]
// Good way to optimize it 
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
          <Route path='/search' element={<UploadForm/>} />
          {LoginProtection.map((
            { path, element }
          ) => (
            <Route key={path} path={path} element={<LoginProtectedRoute>{element}</LoginProtectedRoute>} />
          ))}
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
