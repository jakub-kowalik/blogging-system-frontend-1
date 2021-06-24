import './App.css';
import {Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import Header from "./components/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditBlogEntry from "./components/new_post/EditBlogEntry";
import BlogEntryPage from "./components/entry/BlogEntryPage";
import EditBlogEntryPage from "./components/new_post/EditBlogEntryPage";
import UsersPage from "./components/usersManagement/UsersPage";
import MyEntriesPage from "./components/redactor_entries/MyEntriesPage";
import {Container, Col, Row} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container className={"mx-xl-5"}>
                <Row>
                    <Col className={"col-12"}>
                        <Router>
                            <Route path={"/register"}>
                                <RegisterPage/>
                            </Route>
                            <Route path={"/login"}>
                                <LoginPage/>
                            </Route>
                            <Route path={"/home"}>
                                <Redirect to="/" />
                            </Route>
                            <Route exact path={"/"}>
                                <HomePage/>
                            </Route>
                            <Route path={"/admin/users"}>
                                <UsersPage/>
                            </Route>
                            <Route path={"/newblogentry"}>
                                <EditBlogEntry/>
                            </Route>
                            <Route path={"/editblogentry/:id"} component={EditBlogEntryPage}></Route>
                            <Route path={"/post/:id"} component={BlogEntryPage}></Route>
                            <Route path={"/myblogentries"}>
                                <MyEntriesPage/>
                            </Route>
                        </Router>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
