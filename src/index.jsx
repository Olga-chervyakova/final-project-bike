import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App.jsx";
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
