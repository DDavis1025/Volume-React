import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import { Delete } from 'styled-icons/typicons/Delete';
import Downloaded from './downloaded';
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


class AddAlbum extends Component {
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
    this.onChange = this.onChange.bind(this);
    this.save2 = this.save2.bind(this);
    // this.handleAuthentication = this.handleAuthentication.bind(this);
    
    
    this.replaceInputRef = React.createRef();
    this.fileRef = React.createRef();
    this.inputRef = React.createRef();
    this.addFiles = React.createRef();
    this.resetFile = this.resetFile.bind(this);
    this.removeItem = this.removeItem.bind(this)

 
    this.state = {
      beforeImageSave: null,
      file: null,
      files: [],
      songsList: null,
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

  //   axios.put(`http://localhost:3000/albums/${params.albumId}/upload`, data, {

  //   }).then(res => {
  //     console.log(res.statusText)
  //   })
  // }

  //   if (this.state.file === null) {
  //     axios.delete(`http://localhost:3000/albums/${params.albumId}/upload`)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
    // }

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

  
//   componentDidMount() {
//   const { match: { params} } = this.props;
//   console.log('COMPONENT HAS MOUNTED');
//   let files = this.state.files;
//   let albums = this.state.albums;
//   let file = this.state.file;
//   fetch(`http://localhost:3000/albums/${params.albumId}/songs`)
//     .then((response) =>
//       response.json())
//     .then((data) => {
//           this.setState({ files : data });
//         }).catch((error) => {
//             console.log("Error " + error)
//           })

//     fetch(`http://localhost:3000/albums/${params.albumId}`)
//     .then((response) =>
//       response.json())
//     .then((data) => {

//           if (data.length != 0) {
//           this.setState({albums: data});
//         }
         
//         }).catch((error) => {
//             console.log("Error " + error)
//           })


//     fetch(`http://localhost:3000/albums/${params.albumId}/images`)
//     .then((response) =>
//       response.json())
//     .then((data) => {
//           this.setState({ file : data });
//         }).catch((error) => {
//             console.log("Error " + error)
//           })

// }

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
      fileReader.readAsArrayBuffer(file);
 
    })
  }

 
 
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


// save(event) {
//    event.preventDefault();
//    console.log(this.state.files)
//    let files = this.state.files;
  
//    let songData;
  
//    const { match: { params} } = this.props;

//    let p = new Promise((resolve, reject) => {
//     resolve('Success');
//    })

// .then(() => {
//    // if(clicked === true) {
//     console.log("replace click");
//     clicked = false;
//     let dltRequest = new Request(`http://localhost:3000/albums/${params.albumId}/songs/`, {
//     method: 'DELETE',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//   });

//     fetch(dltRequest)
//       .then((response) =>
//         response.json())
//           .then((data) => {
//           })
//           .catch((error) => {
//             console.log(error)
//           })
//   // }
// }).then(() => {
//    songData = files.map(( { name }, index, album_id ) => ({ name, index : index}));
    
//     let request = new Request(`http://localhost:3000/albums/${params.albumId}/songs`, {
//     method: 'POST',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     body: JSON.stringify(songData),
//     });


//     fetch(request)
//       .then((response) =>
//         response.json())
//           .then((data) => {
//           })
//           .catch((error) => {
//             console.log(error)
//           })

//   for (var i = 0; i < this.state.files.length; i++) {
//   const id = this.state.files[i].id
//     let putRequest = new Request(`http://localhost:3000/songs/${id}`, {
//     method: 'PUT',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     body: JSON.stringify(songData)
//   });

//     fetch(putRequest)
//       .then((response) =>
//         response.json())
//           .then((data) => {
//           })
//           .catch((error) => {
//             console.log(error)
//           })



// }
    

// })

// }





// onSubmit = (e) => {
//   e.preventDefault();
//   let albums = this.state.albums;
//   let state = this.state;
//   let albumData;
//   const { match: { params} } = this.props;

//   albumData = albums.map(album => ({ title : album.title, date: album.date, description: album.description }));

//   if(albumData[0].date  === "" || albumData[0].title  === "" || albumData[0].description === "") {
//     alert("One Or More Album Fields Don't Have Values");
//   } else {
//     let albumRequest = new Request(`http://localhost:3000/albums/`, {
//     method: 'POST',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     body: JSON.stringify(albumData),
//     });
   

//     fetch(albumRequest)
//       .then((response) =>
//         response.json())
//           .then((data) => {
//           })
//           .catch((error) => {
//             console.log(error)
//           })

//     let albumPutRequest = new Request(`http://localhost:3000/albums/${params.albumId}`, {
//     method: 'PUT',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     body: JSON.stringify(albumData)
//   });

//     fetch(albumPutRequest)
//       .then((response) =>
//         response.json())
//           .then((data) => {
//           })
//           .catch((error) => {
//             console.log(error)
//           })
    
    
// }

// }

// handleAuthentication() {
//     return new Promise((resolve, reject) => {
//       this.auth0.parseHash((err, authResult) => {
//         if (err) return reject(err);
//         if (!authResult || !authResult.idToken) {
//           return reject(err);
//         }
//         this.idToken = authResult.idToken;
//         this.profile = authResult.idTokenPayload;
//         // set the time that the id token will expire at
//         this.expiresAt = authResult.idTokenPayload.exp * 1000;
//         console.log(authResult);
//         resolve();
//       });
//     })
//   }


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
  

  render() {
   
    // var that = this;
    
    const filesExist = this.state.files;
    return (
 
      
      <div className="downloadMusic">


      <Container>
      <Row>
      <Col>
 <div>
      {filesExist != 0 ? (
        <ButtonToggle onClick={this.replaceInput} color="secondary">Replace Music Files
           </ButtonToggle>
           ) : (
            <ButtonToggle onClick={this.clickFileInput} color="secondary">Upload Songs
           </ButtonToggle> 
        )}
        </div>

        <div className="input">
          <input
            accept="audio/*"
            id="upload-file"
            onChange={this.handleClick}
            className="inputName"
            type="file"
            multiple
            style={{display:"none"}}
            ref={this.inputRef}
          />
          

          <input
            accept="audio/*"
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
   
          <div>{this.state.files.length > 0 && 
          <Downloaded
            beforeImageSave={this.state.beforeImageSave}
            file={this.state.file}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            key={this.state.albums.id}
            onClick={this.resetFile}
            album={this.state.albums}
            downloadChange={this.downloadChange}
          />
        }</div>

         

          <Container>
          <Row>
          <Col>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.files.map((file, index) => (
                  <Draggable key={file.id.toString()} draggableId={file.id.toString()} index={index} style={{marginTop:"400px"}}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
 
                       
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                      
                      <div className="handle">
                      <Handle {...provided.dragHandleProps}/>
                      </div>
                    
                      
                      <div>
                      
                         <form>
                   
  <label>
   <p> &nbsp;<input type="text" value={file.name} onChange={this.handleChange.bind(this, index)} name="name" ref={this.fileRef} style={{width:'600px', height:'30px', fontSize: '16px'}} /></p>
  </label>

</form>

 
                      </div>  
                      
                  
                      <div className="delete">
                       <LIDelete onClick = {() => this.removeItem(index)}/>
                       </div>
                      
                     </div>
                     
                     
                    )}
                  </Draggable>
 
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
</Col>
</Row>
</Container>

<Container>

        <div className="belowList">{this.state.files.length > 0 && <div>
<Row>
<Col>

  <ButtonToggle onClick={this.clickAddFiles} color="secondary">Add More Files
           </ButtonToggle> 
       <input
            accept="audio/*"
            onChange={this.secondInputClick}
            id="second-input"
            className="inputName"
            type="file"
            multiple
            style={{display:"none"}}
            ref={this.addFiles}
            />
            </Col>
            </Row>
        


            
         

         <Row>
         <Col>
           <ButtonToggle onClick={this.onClick} color="success">Save
           </ButtonToggle> 
           </Col>
         </Row>
</div>

}</div>

</Container>


 

</div>

 
      
    );
  }
}
AddAlbum.contextType = Auth0Context;
 
export default AddAlbum;