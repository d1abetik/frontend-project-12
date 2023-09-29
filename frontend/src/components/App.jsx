import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from '../routes.js';
import Auth from './Auth/Auth.jsx';
import useAuth from './Auth/hookAuth.js';
import Chat from './ChatPage/Chat.jsx';
import ErrorPage from './ErrorPage.jsx';
import Header from './Header.jsx';
import Login from './LoginPage/Login.jsx';
import SignUp from './SignUpPage/Signup.jsx';

const PrivateRoute = ({ children }) => {
  const authDat = useAuth();
  const location = useLocation();
  return (
    authDat.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <Auth>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
              <Route path={routes.login()} element={<Login />} />
              <Route path={routes.signup()} element={<SignUp />} />
              <Route path="*" element={<ErrorPage />} />
              <Route
                path={routes.chat()}
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                )}
              />
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
      </Auth>
    </div>
  </div>
);

export default App;
