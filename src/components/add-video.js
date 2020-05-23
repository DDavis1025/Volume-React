import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import { Delete } from 'styled-icons/typicons/Delete';
import Downloaded from './downloaded';
import VideoFields from './videoFields'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ButtonToggle } from "reactstrap";
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import auth0Client from "../Auth";
import { useAuth0 } from "../react-auth0-spa";
import {Auth0Context} from "../react-auth0-spa"
import { Auth0Provider } from "../react-auth0-spa";
import Profile from './Profile';
import { withRouter } from "react-router";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
// import auth0 from 'auth0-js';

 
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
 
  return result;
};
 
const grid = 3;
 
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
 
  background: isDragging ? "blue" : "white",
 
  ...draggableStyle
});
 
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightgrey" : "lightgrey",
  padding: grid,
  width: 700,
});
 
const Handle = styled.div`
width: 20px;
height: 20px;
margin-top: 7.5px;
background-color: gray;
border-radius: 4px;
float: left;
`
const LIDelete = styled(Delete)`
width: 20px;
height: 20px;
color: gray;
float: right;
margin-top: -50px;
`

let id = 0;
let clicked = false;
let imageReplaced = false;


class AddVideo extends Component {
  constructor(props) {
    super(props);
 
    this.handleClick = this.handleClick.bind(this);
    this.replaceClick = this.replaceClick.bind(this);
    // this.save = this.save.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.secondInputClick = this.secondInputClick.bind(this);
    this.clickFileInput = this.clickFileInput.bind(this);
    this.replaceInput = this.replaceInput.bind(this);
    this.clickAddFiles = this.clickAddFiles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.downloadChange = this.downloadChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.capture = this.capture.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save2 = this.save2.bind(this);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    // this.handleAuthentication = this.handleAuthentication.bind(this);
    
    
    this.replaceInputRef = React.createRef();
    this.fileRef = React.createRef();
    this.inputRef = React.createRef();
    this.addFiles = React.createRef();
    this.resetFile = this.resetFile.bind(this);
    this.removeItem = this.removeItem.bind(this);


 
    this.state = {
      beforeImageSave: null,
      file: null,
      files: [],
      isLoading: false,
      video: {},
      fileContent: null,
      songsList: null,
      videoSelected: false,
      albums: {title:"", date:"", description:""},
    };
 
  }


  onChange(event) {
    console.log(event.target.files[0])
    this.setState({
      beforeImageSave: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
      loaded: 0,
    });
    console.log(this.state.file)
    imageReplaced = true;
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }

  onClickHandler = () => {
    const data = new FormData()

    
    data.append('file', this.state.file)
    // if (this.state.file !== null && this.state.file.length !== 0) {
    // console.log(this.state.file)
      axios.post("http://localhost:3000/albums", data, { 
     }).then(res => { // then print response status
      console.log(res.statusText)
 })



console.log("2");
  }

  componentDidMount() {
    let value = this.context;
  // auth0Client.handleAuthentication();
    console.log(value);
    console.log(this.props.myHookValue);
   
  }

  componentDidUpdate() {
     {this.context.user && console.log(this.context.user.sub)}
  // {this.state.user.sub !== undefined &&
  // console.log(this.context.user.sub)}
  
}



downloadChange (event) {
   const { name, value } = event.target;
   this.setState(prevState => ({
   albums: {...prevState.albums, [name]: value}
   }));

  }


 
changeCursor = (e) => {
    e.target.style.background = 'red';
  }
 

handleClick = event => {
  this.setState({ videoSelected: true })
  if (event.target.value.length != 0) {
  this.setState({ isLoading: true });
  console.log("it worked handle")
  }

  // Helper code to read file and return promise
  const readFile = (file) => {
 
    // const fileList = [];
 
    const fileReader = new FileReader();
 
    // create the promise and return it
    return new Promise((resolve, reject) => {
 
      // if file reader has an error, report it
      fileReader.onerror = (error) => {
        reject({ error })
      }
 
      // if success, resolve the promise
      fileReader.onload = (e) => {
        resolve( this.setState({ video: {
          name: file.name.replace( /_|\.mp3/gi, " "),
          id: id++,
         }
        }),
        this.setState({ fileContent: e.target.result}),
        this.setState({ isLoading: false }),
        console.log("FILE" + JSON.stringify(e.target.result))

      )}
 
      // start reading the file
      fileReader.readAsDataURL(file);
 
    })
  };

  
 
 
  // create all the file reader promises
  // create an array from the files list and use map to generate
  // an array of promises
  const allReaders = Array.from(event.target.files).map(readFile)

  const other = event.target.files;

  console.log(other);

  // console.log(other);
  var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (1 === 1) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});

promise.then(() => {this.setState({songsList : other})
}).then(()=> {
console.log(this.state.songList)
 }).catch((error) => {
  console.log(error);
 })
   

 
  
 
  // Now handle the array of promises we just created
  Promise.all(allReaders)
    .then(fileList => {

      // set the state that we have all the files
      this.setState({ files: fileList });
       console.log(this.state.files)
    })
    .catch(error => {
       console.error(error)
    });
    
}



replaceClick = event => {
  if (event.target.value.length != 0) {
  this.setState({ isLoading: true });
  console.log("it worked replace")
  }
  const canvas = this.canvasRef.current;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  const readFile = (file) => {

 
    // const fileList = [];
 
    const fileReader = new FileReader();
 
    // create the promise and return it
    return new Promise((resolve, reject) => {
 
      // if file reader has an error, report it
      fileReader.onerror = (error) => {
        reject({ error })
      }
 
      // if success, resolve the promise
      fileReader.onload = (e) => {
        resolve(this.setState({ fileContent: e.target.result}))
        this.setState({ isLoading: false })

      }
 
      // start reading the file
      fileReader.readAsDataURL(file);
 
    })
  }

 
 
  // create all the file reader promises
  // create an array from the files list and use map to generate
  // an array of promises
  const allReaders = Array.from(event.target.files).map(readFile)

 
  // Now handle the array of promises we just created
  Promise.all(allReaders)
    .then(fileList => {
      console.log(this.state.files)
      // set the state that we have all the files
      this.setState({ files: fileList });
    })
    .catch(error => {
       console.error(error)
    });
    
    clicked = true;
}


secondInputClick = event => {
  // Helper code to read file and return promise
  const readFile = (file) => {
 
    // const fileList = [];
 
    const fileReader = new FileReader();
 
    // create the promise and return it
    return new Promise((resolve, reject) => {
 
      // if file reader has an error, report it
      fileReader.onerror = (error) => {
        reject({ error })
      }
 
      // if success, resolve the promise
      fileReader.onload = (e) => {
        resolve({
          name: file.name.replace( /_|\.mp3/gi, " "),
           id: id++,
        })
      }
 
      // start reading the file
      fileReader.readAsDataURL(file);
 
    })
  }

 
 
  // create all the file reader promises
  // create an array from the files list and use map to generate
  // an array of promises
  const allReaders = Array.from(event.target.files).map(readFile)
 
  // Now handle the array of promises we just created
  Promise.all(allReaders)
    .then(fileList => {
      console.log(this.state.files)
      // set the state that we have all the files
      this.setState(prevState => ({ ...prevState, files: [...prevState.files,  ...fileList ]}));
    })
    .catch(error => {
       console.error(error)
    });

 
}


save2(event) {
  event.preventDefault();

  let user_id;

  let image;
  
  let data;

  const { history } = this.props;

  Promise.resolve().then(()=>{

  user_id = this.context.user.sub;

  image = this.state.file;
  
  data = new FormData()

  data.append('file', this.state.file)


  console.log(data);
    
}).then(()=> {
  
  this.setState(prevState => ({
  files: prevState.files.map((file, index) => ({...file, index})
)}));
  let files = this.state.files;
   

   this.setState(prevState => ({
   albums: {...prevState.albums, files, user_id}
}))

   Array.from(this.state.songsList).forEach(song => {
    data.append('songs', song)
  })

  data.append('albums', JSON.stringify(this.state.albums))


}).then(()=> {
    axios.post("http://localhost:3000/albums", data, { 
  }).then(res => { // then print response status
    console.log(res.statusText)
 })
})
.then(()=> {
  const { match, location, history } = this.props;
  history.push('/feed');
  location.reload();

})
.catch((err)=> {console.log(err)});

}


  





 
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
 
    const files = reorder(
      this.state.files,
      result.source.index,
      result.destination.index
    );
 
    this.setState({
      files
    });
  }
 
 
  removeItem = (index) => {
    this.setState(({ files }) => ({
      files: files.filter((_, ind) => ind !== index) }));
  }


  clickFileInput() {
    this.inputRef.current.click();
  }

  replaceInput() {
    this.replaceInputRef.current.click();
  }

  clickAddFiles () {
    this.addFiles.current.click();
  }

  handleChange(index, event) {
    let files = this.state.files.slice();
    files[index].name = event.target.value;
    this.setState({ files: files });
  }

onClick(event) {
  let albums = this.state.albums;
  if(albums.date  === "" || albums.title  === "" || albums.description === "") {
    alert("ERROR: Fields Must Be Filled In Before You Save");
    } else {
  this.save2(event);
}
}

  capture() {
    const canvas = this.canvasRef.current;
    const video = this.videoRef.current;
    canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
}
  
  render() {
   console.log("video state" + JSON.stringify(this.state.video))
   console.log("fileContent" + this.state.fileContent)
    // var that = this;
    
    const filesExist = this.state.files;
    return (
 
      
      <div className="downloadMusic">


      <Container>
      <Row>
      <Col>
 <div>
      {this.state.videoSelected ? (
        <ButtonToggle onClick={this.replaceInput} color="secondary">Replace video
           </ButtonToggle>
           ) : (
            <ButtonToggle onClick={this.clickFileInput} color="secondary">Upload video
           </ButtonToggle> 
        )}
        </div>

        <div className="input">
          <input
            id="upload-file"
            onChange={this.handleClick}
            className="inputName"
            type="file"
            style={{display:"none"}}
            ref={this.inputRef}
          />
          

          <input
            id="upload-file"
            onChange={this.replaceClick}
            className="inputName"
            type="file"
            multiple
            style={{display:"none"}}
            ref={this.replaceInputRef}
          />
          
         
           

 </div>
</Col>
</Row>
     </Container>

     {this.state.videoSelected && 

<div>
      <Container>
          <Row>
          <Col>
                   {this.state.isLoading &&
                   <h4>Loading...</h4>
                   }
                   <div>
                   <video src={this.state.fileContent} width="520" height="400" ref={this.videoRef} controls></video>
                   </div>
                   <button onClick={this.capture}>Capture Thumbnail</button> <br/><br/>
                   <canvas width="320" height="240" style={{border: "1px solid black"}} id="canvas" ref={this.canvasRef}></canvas>

          </Col>
          </Row>
          </Container>
              
          <Container>                 
           <Row>
           <Col>
          <VideoFields
            file={this.state.file}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            key={this.state.albums.id}
            onClick={this.resetFile}
            album={this.state.albums}
            downloadChange={this.downloadChange}
          />
        </Col>
        </Row>
        </Container>

                  
                      <div className="delete">
                        </div>

      </div>   
                  
  }


        <Container>
        <Row>
        <Col>

        <div className="belowList">{this.state.files.length > 0 && <div>

           <ButtonToggle onClick={this.onClick} color="success">Save
           </ButtonToggle> 
</div>

}</div>

</Col>
</Row>
</Container>


 

</div>

 
      
    );
  }
}

export default AddVideo;