import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN, DOMAIN_SOCKET } from './util/settings/config';
import * as signalR from '@aspnet/signalr'
import './i18next'

const root = ReactDOM.createRoot(document.getElementById('root'));
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN_SOCKET}DatVeHub`).configureLogging(signalR.LogLevel.Information).build()
connection.start().then(() => {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}).catch(err => {
  console.log(err)
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
