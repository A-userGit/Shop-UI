import './App.css'
import {AuthProvider, type TRefreshTokenExpiredEvent} from 'react-oauth2-code-pkce';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './module/Dashboard';
import ShopNavbar from "./module/ShopNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./module/Signup.tsx";
import ProtectedRoute from "./module/ProtectedRoute";
import Cart from "./module/Cart";
import Orders from "./module/Orders";
import Profile from "./module/Profile.tsx";

const authConfig = {

    clientId: 'frontend-ui-client',
    authorizationEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
    tokenEndpoint: import.meta.env.VITE_AUTH_TOKEN_ENDPOINT,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    scope: 'openid profile email offline_access',
    autoLogin: false,
    onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => event.logIn(undefined, undefined, "popup"),
};

const App = () => {

  return (
      <div className="App">
          <AuthProvider authConfig={authConfig}>
            <BrowserRouter>
                <ShopNavbar/>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/register" element={<SignUp/>}/>
                  <Route element = {<ProtectedRoute/>}>
                      <Route path="/cart" element={<Cart/>}/>
                      <Route path="/orders" element={<Orders/>}/>
                      <Route path="/profile" element={<Profile/>}/>
                  </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
      </div>
  )
};

export default App;
