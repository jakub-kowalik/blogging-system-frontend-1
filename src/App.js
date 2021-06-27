import './App.css';
import {Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterPage from "./components/register_page/RegisterPage";
import LoginPage from "./components/login_page/LoginPage";
import HomePage from "./components/home_page/HomePage";
import Header from "./components/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditBlogEntry from "./components/edit_post/EditBlogEntry";
import BlogEntryPage from "./components/entry/BlogEntryPage";
import EditBlogEntryPage from "./components/edit_post/EditBlogEntryPage";
import UsersPage from "./components/users_management/UsersPage";
import MyEntriesPage from "./components/entries_pages/MyEntriesPage";
import {Container, Col, Row} from "react-bootstrap";
import AdminEntriesPage from "./components/entries_pages/AdminEntriesPage";

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
                            <Route path={"/admin/allentries"}>
                                <AdminEntriesPage/>
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
