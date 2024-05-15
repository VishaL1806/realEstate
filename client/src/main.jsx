import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Auth0Provider} from '@auth0/auth0-react'
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
    <Auth0Provider
    domain='dev-xse3ybixd373p5fy.us.auth0.com'
    clientId='KmqXsgNvnZmaUTwdNuw0JAnGZvuBx5Tl'
    authorizationParams={{
      redirect_uri :"http://localhost:5173/"
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
    cacheLocation="localstorage"
    >
    <App />
    </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
)
