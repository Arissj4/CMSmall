import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Alert, Col, ModalTitle } from 'react-bootstrap'
import {BrowserRouter, Outlet, Route, Routes, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar_Temp from './JSX/navbar'
import Loginform from './JSX/login';
import Managepage from './JSX/managepage';
import Createpage from './JSX/createpage';
import Main_content from './JSX/main';
import Allpages from './JSX/allpages';
import Editpage from './JSX/editpage';
import Content from './JSX/content';
import API from './API';

function App() {
  
  // Messages
  const [message1, setMessage1] = useState('');
  const [mypagemessage, setMypagemessage] = useState('');

  setTimeout(() => {
    setMessage1('');
  }, 10000);

  setTimeout(() => {
    setMypagemessage('');
  }, 10000);

  // ----------------------------------------------
  // Login and Logout functions and states

  const [loggedIn, setLoggedIn] = useState(false);
  const [userrole, setUserrole] = useState('');
  const [userinfo, setUserinfo] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      const a = await API.getUserInfo();
      setLoggedIn(true);
      setUserinfo(a);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const checkRole = async () => {
      const a = await API.getUserInfo();
      setUserrole(a.role);
    };
    checkRole();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUserinfo(user);
      setUserrole(user.role);
      setMessage1({msg: `Welcome, ${user.username}!`, type: 'success'});
    }catch(err) {
      setMessage1({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUserrole('');
    setMessage1('');
    <Navigate replace to='/' />
  };

  // ----------------------------------------------
  
  const [changemanagement, setChangemanagement] = useState(false);
  const [changemypage, setChangemypage] = useState(false);
  const [websitename, setWebsitename] = useState('');
  const [changewebname, setChangewebname] = useState(true);

  const [allpages, setAllpages] = useState([]);
  const [allcontents, setAllcontents] = useState([]);
  const [pubpages, setPubpages] = useState([]);
  const [indexedit, setIndexedit] = useState('');
  const [indexcontent, setIndexcontent] = useState('');
  const [typeofpage, setTypeofpage] = useState('pubpage');
  const [users, setUsers] = useState([]);

  const newpage = async (page) => {
    try {
      const newp = await API.createpage(page);
      setMypagemessage({msg: `Page created!`, type: 'success'});
      <Navigate replace to='/managepage/' />
    }catch(err) {
      setMypagemessage({msg: err, type: 'danger'});
    }
  };

  const getpics = async () => {
    try {
      const pics = await API.getpictures();
      return pics;
    }catch(err) {
      console.log(err);
    }
  };

  const getallpages = async () => {
    try {
      const pages = await API.getallpages();
      setAllpages(pages);
      convertallcontents(pages);
      return pages;
    }catch(err) {
      console.log(err);
    }
  };

  const getuserpages = async (username) => {
    try {
      const pages = await API.getpagesbyusername(username);
      setAllpages(pages);
      convertallcontents(pages);
      return pages;
    }catch(err) {
      console.log(err);
    }
  };

  const publishedpages = async () => {
    try {
      const pages = await API.getpublishedpages();
      return pages;
    }catch(err) {
      console.log(err);
    }
  };

  const delpage = async (id) => {
    try {
      const pages = await API.delpage(id);
      if (pages === "success") {
        setMypagemessage({msg: `Page deleted!`, type: 'success'});
      } else {
        setMypagemessage({msg: `Page not deleted!`, type: 'danger'});
      }
      return pages;
    }catch(err) {
      console.log(err);
    }
  };

  const uppage = async (page) => {
    try {
      const pages = await API.uppage(page);
      if (pages === "success") {
        setMypagemessage({msg: `Page updated!`, type: 'success'});
      } else {
        setMypagemessage({msg: `Page not updated!`, type: 'danger'});
      }
      return pages;
    }catch(err) {
      console.log(err);
    }
  };

  const convertallcontents = (pages) => {
    const a = [];
    for (let i = 0; i < pages.length; i++) {
      const contents = pages[i].content;
      let conv_contents = JSON.parse(contents);
      a.push(conv_contents);
    }
    setAllcontents(a);
  };

  const getusers = async () => {
    try {
      const users = await API.getUsers();
      setUsers(users);
      return users;
    }catch(err) {
      console.log(err);
    }
  };

  const getwebsitename = async () => {
    try {
      const name = await API.getwebsitename();
      setWebsitename(name);
      document.querySelector('title').innerText = name;
      return name;
    }catch(err) {
      console.log(err);
    }
  };

  if (changewebname === true) {
    getwebsitename();
    setChangewebname(false);
  }

  const updatewebsitename = async (name) => {
    try {
      const a = await API.updatewebsitename(name);
      return a;
    }catch(err) {
      console.log(err);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={
            <>
              <Container fluid className='maincontainer'>
              <Navbar_Temp loggedIn={loggedIn} handleLogout={handleLogout} userinfo={userinfo} userrole={userrole} getallpages={getallpages} getuserpages={getuserpages} websitename={websitename} message1={message1} publishedpages={publishedpages} setTypeofpage={setTypeofpage} /> 

              <Row style={{justifyContent: 'center'}}>
                {message1 && 
                  <Alert id="alert1" variant={message1.type} onClose={() => setMessage1('')} dismissible>
                    {message1.msg}
                  </Alert>
                }
              </Row>

              <Row style={{justifyContent: 'center'}}>
                {mypagemessage && 
                  <Alert id="alert3" variant={mypagemessage.type} onClose={() => setMypagemessage('')} dismissible>
                    {mypagemessage.msg}
                  </Alert>
                }
              </Row>

              <Outlet />
              </Container>
            </>
            }
          >

              <Route index element={<Main_content  setPubpages={setPubpages} publishedpages={publishedpages} setIndexcontent={setIndexcontent} />} />

              <Route path='/login' element={ loggedIn ? <Navigate replace to='/' /> : <Loginform login={handleLogin} />} />

              <Route path="managepage/" element={ loggedIn ? <Managepage setmessage1={setMessage1} allpages={allpages} allcontents={allcontents} delpage={delpage} getallpages={getallpages} setIndexedit={setIndexedit} getusers={getusers} changemanagement={changemanagement} setChangemanagement={setChangemanagement} setTypeofpage={setTypeofpage} websitename={websitename} setWebsitename={setWebsitename} setIndexcontent={setIndexcontent} setChangewebname={setChangewebname} updatewebsitename={updatewebsitename} /> : <Navigate replace to='/' />} />

              <Route path="createpage/" element={ loggedIn ? <Createpage userinfo={userinfo} newpage={newpage} setmessage1={setMessage1} mypagemessage={setMypagemessage} getpics={getpics} setChangemypage={setChangemypage} /> : <Navigate replace to='/' />} />

              <Route path='allpages/' element={ loggedIn ? <Allpages setmessage1={setMessage1} mypagemessage={setMypagemessage} allpages={allpages} allcontents={allcontents} delpage={delpage} getuserpages={getuserpages} setIndexedit={setIndexedit} getusers={getusers} changemypage={changemypage} setChangemypage={setChangemypage} userinfo={userinfo} setTypeofpage={setTypeofpage} setIndexcontent={setIndexcontent} getallpages={getallpages} /> : <Navigate replace to='/' />} />

              <Route path='editpage/' element={ loggedIn ? <Editpage userinfo={userinfo} newpage={newpage} setmessage1={setMessage1} mypagemessage={setMypagemessage} getpics={getpics} allpages={allpages} allcontents={allcontents} indexedit={indexedit} users={users} uppage={uppage} setChangemanagement={setChangemanagement} userrole={userrole} setTypeofpage={setTypeofpage} typeofpage={typeofpage} /> : <Navigate replace to='/' />} />

              <Route path=':title/' element={<Content indexcontent={indexcontent} allpages={allpages}typeofpage={typeofpage} pubpages={pubpages} />} />

              <Route path="*" element={
                <>
                  <Row>
                      <Col id="page">
                          <h1>Page Not Found</h1>
                      </Col>
                  </Row>
                </>
              } />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
