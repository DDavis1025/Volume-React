import React from 'react';
import {NavLink} from 'react-router-dom'


const Navbar = (props) => (

 
 <div className="sidenav"> 
 <ul>
	<li><NavLink className="sidenav-li" activeClassName="activate" exact to="/feed">Home</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/uploads">Upload</NavLink></li>
	<li><NavLink className="sidenav-li" activeClassName="activate" to="/albums">Profile</NavLink></li>
	</ul>
  </div>



	);

export default Navbar;