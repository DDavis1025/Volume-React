import React from 'react';
import {NavLink} from 'react-router-dom'


const Navbar = (props) => (

 
 <div className="sidenav"> 
 <ul>
	<li><NavLink className="sidenav-li" activeClassName="activate" exact to="/feed">Home</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/album/create">Upload</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/actors">New Music</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/notifications">Notifications</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/library">Library</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/films">Messages</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/profile-page">Profile</NavLink></li>
	</ul>
  </div>



	);

export default Navbar;