import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import './css/styles.css';
import Navbar from './components/navbar';
import Downloaded from './components/downloaded';
import DownloadTest from './components/downloadTest';
import ImageUpload from './components/image-upload';
import AddAlbum from './components/add-album';
import Album from './components/album';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar2 from "./components/NavBar2";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import Upload from "./components/upload";
import Feed from "./components/feed";
import EditAlbum from "./components/Edit/edit-album";
import { Spinner } from 'reactstrap';
import AddVideo from "./components/add-video"


function App() {

  const { loading } = useAuth0();

  if (loading) {
    return <div style={{height: '100vh', display: 'flex',  justifyContent:'center', alignItems:'center'}}><Spinner style={{ width: '3rem', height: '3rem' }} /></div>
  }
  
  return (
    <BrowserRouter>
      <div className="App">
      <Router history={history}>
      <NavBar2 />
      <Navbar title="Oscars 2019"/>
      <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      <Route exact path="/" render={() => <DownloadTest />} />
      <Route path="/download-test" component={DownloadTest} />
      <Route path="/image-upload" component={ImageUpload}/>
      <Route path="/add-album" component={AddAlbum}/>
      <Route path="/downloaded" component={Downloaded} />
      <Route path="/album/create" component={AddAlbum}/>
      <Route path="/video/create" component={AddVideo}/>
      <Route path="/album/:albumId" component={Album}/>
      <Route path="/upload" component={Upload}/>
      <Route path="/feed" component={Feed}/>
      <Route path="/:albumId/edit" component={EditAlbum}/>
      </Router>
      </div>
    </BrowserRouter>
  );

}

export default App;
