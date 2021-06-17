import './App.css';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import Header from "./components/header/Header";
import BlogEntry from "./components/new_post/BlogEntry";


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
            </Router>

        </div>
    );
}

export default App;
