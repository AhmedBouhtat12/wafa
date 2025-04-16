import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import keycloak from './keycloak';

const root = ReactDOM.createRoot(document.getElementById('root'));

keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    redirectUri: `${window.location.origin}/App`
}).then(authenticated => {
    if (authenticated) {
        root.render(
            <React.StrictMode>
                <Navbar />
                <App />
            </React.StrictMode>
        );
    } else {
        keycloak.login();
    }
}).catch(err => {
    console.error("Keycloak initialization failed", err);
});
