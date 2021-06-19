import './App.css';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import Header from "./components/header/Header";


function App() {
    return (
        <div className="App">
            <Header/>
            <div className="container mx-xl-5">
                <div className="row">
                    <div className="col-12">
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
                            <Route path={"/post/:id"}>
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
                    <div className="col">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
