import './App.css'
import {AuthProvider, type TRefreshTokenExpiredEvent} from 'react-oauth2-code-pkce';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './module/Dashboard';

const authConfig = {
    clientId: 'frontend-ui-client',
    authorizationEndpoint: 'http://auth-service/oauth2/authorize',
    tokenEndpoint: 'http://auth-service/oauth2/token',
    redirectUri: 'http://localhost:5173/callback',
    scope: 'openid profile email',
    onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => event.logIn(undefined, undefined, "popup"),
};

const App = () => {

  return (
      <BrowserRouter>
          <AuthProvider authConfig={authConfig}>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  )
};

export default App;
