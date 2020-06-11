import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import auth0Client from "../../Auth";
import { useAuth0 } from "../../react-auth0-spa";
import {Auth0Context} from "../../react-auth0-spa"
import { Auth0Provider } from "../../react-auth0-spa";
import { Container, Row, Col } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody, CardDeck,
  CardTitle, CardSubtitle, CardLink, Button
} from 'reactstrap';
import {
 BrowserRouter as Router,
 Switch,
 Route
} from "react-router-dom";
import ProfileBar from '../profile-bar';


class ProfileVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {},
    };

  }


  componentDidMount() {
    let user_id = this.context.user.sub;
    console.log("user_id" + user_id)
    console.log('COMPONENT HAS MOUNTED');
    let video = this.state.video;
    fetch(`http://localhost:8000/artist/video/${user_id}`)
    .then((response) =>
      response.json())
    .then((data) => {
      console.log("data" + data)
      this.setState({ video : data });

    }).catch((error) => {
      console.log("Error " + error)
    })

  }




  render() {
    return (
 <div>
       <div>
        <ProfileBar />
        </div>

<div>
      <ul>
      <CardDeck>

      {this.state.video.length && this.state.video.map((video,index) => {
        return ( 

          <div key={index}> 
          <Link to={`/${video.id}/video/edit`}>
          <Card style={{width: "250px", height:"250px", marginBottom: "15px", marginTop: "15px", borderColor: "darkgrey"}}>
          <CardImg style={{width: "240px", height:"135px", display: "block",
          marginLeft: "auto",
          marginTop: "4px",
          marginRight: "auto",
          border:"1px solid lightgrey"}} src={video.path} />
          <CardBody>
          <CardTitle style={{whiteSpace: "nowrap",
          color: "black",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "13px"}}>
          <b>
          {video.title}
          </b>
          </CardTitle>
          <CardText style={{whiteSpace: "nowrap",
          overflow: "hidden",
          color: "black",
          textOverflow: "ellipsis", 
          fontSize: "11px"}}>
          {video.description}
          </CardText>
          </CardBody>
          </Card>
          </Link>
          </div>

        )})}
        </CardDeck>

        </ul>
        </div>
        </div>
      
        )
      }
    };
ProfileVideos.contextType = Auth0Context;

export default ProfileVideos;