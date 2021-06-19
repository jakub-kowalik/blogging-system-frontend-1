import './App.css';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import Header from "./components/header/Header";
import BlogEntry from "./components/new_post/BlogEntry";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <div className="App">
            <Header/>
            <Router>
                <Route path={"/register"}>
                    <RegisterPage/>
                </Route>
                <Route path={"/login"}>
                    <LoginPage/>
                </Route>
                <Route path={"/home"}>
                    <HomePage/>
                </Route>
                <Route path={"/newblogentry"}>
                    <BlogEntry/>
                </Route>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            </Router>

        </div>
    );
}

export default App;
