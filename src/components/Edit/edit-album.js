import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import { Delete } from 'styled-icons/typicons/Delete';
import EditFields from './edit-fields';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ButtonToggle, Button } from "reactstrap";
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import auth0Client from "../../Auth";
import { useAuth0 } from "../../react-auth0-spa";
import {Auth0Context} from "../../react-auth0-spa"
import { Auth0Provider } from "../../react-auth0-spa";
import Profile from '../Profile';
import { withRouter } from "react-router";
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
let other;
let secondClickSongs;


class EditAlbum extends Component {
  constructor(props) {
    super(props);
 
    // this.handleClick = this.handleClick.bind(this);
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
    this.deleteClick = this.deleteClick.bind(this);
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
      songsList2: null,
      albums: {title:"", date:"", description:""},
      album: {},
      afterSlice: [],
      image: {},
    };
 
  }


onChange(event) {
    console.log(event.target.files[0])
    this.setState({
      file: event.target.files[0],
      image: event.target.files[0], 
      beforeImageSave: URL.createObjectURL(event.target.files[0]),
      loaded: 0,
    });
    console.log(this.state.file)
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
    const { match: { params} } = this.props;
    let album = this.state.album;
    fetch(`http://localhost:8000/albums/${params.albumId}`)
    .then((response) =>
      response.json())
    .then((data) => {
          this.setState({ album : data[0], afterSlice: data.slice(1), image: `http://localhost:8000/${data[0].path}` });
          console.log(this.state.afterSlice);
          // console.log(this.state.afterSlice)
        }).catch((error) => {
            console.log("Error " + error)
          })
    // let album = this.state.album;
    // other = this.state.album.slice(1);
    // console.log(other);
    // console.log(album);
    // if(this.state.album.length > 0){
    //   console.log(album);
    //   other = this.state.album.slice(1);
    //   console.log(other)
    // }
    // if(this.state.album.length > 0){
    //   console.log(this.state.album);
    //   other = this.state.album.slice(1);
    //   console.log(other)
    // }

  }

  

componentDidUpdate() {
console.log(this.state.songList);

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
   album: {...prevState.album, [name]: value}
   }));

  }


 
changeCursor = (e) => {
    e.target.style.background = 'red';
  }
 

// handleClick = event => {
  
//   // Helper code to read file and return promise
//   const readFile = (file) => {
 
//     // const fileList = [];
 
//     const fileReader = new FileReader();
 
//     // create the promise and return it
//     return new Promise((resolve, reject) => {
 
//       // if file reader has an error, report it
//       fileReader.onerror = (error) => {
//         reject({ error })
//       }
 
//       // if success, resolve the promise
//       fileReader.onload = (e) => {
//         resolve({
//           name: file.name.replace( /_|\.mp3/gi, " "),
//           id: id++,
         
//         })
//       }
 
//       // start reading the file
//       fileReader.readAsDataURL(file);
 
//     })
//   }

 
 
//   // create all the file reader promises
//   // create an array from the files list and use map to generate
//   // an array of promises
//   const allReaders = Array.from(event.target.files).map(readFile)

//   const other = event.target.files;

//   console.log(other);

// //   // console.log(other);
// //   var promise = new Promise(function(resolve, reject) {
// //   // do a thing, possibly async, then…

// //   if (1 === 1) {
// //     resolve("Stuff worked!");
// //   }
// //   else {
// //     reject(Error("It broke"));
// //   }
// // });

// // promise.then(() => {this.setState({songsList : other})
// // }).then(()=> {
// // console.log(this.state.songList)
// //  }).catch((error) => {
// //   console.log(error);
// //  })
   

 
  
 
//   // Now handle the array of promises we just created
//   Promise.all(allReaders)
//     .then(fileList => {

//       // set the state that we have all the files
//      this.setState(prevState => ({ ...prevState, afterSlice: [...prevState.afterSlice,  ...fileList ]}));
//       // this.setState({ afterSlice: fileList });
       
//     })
//     .catch(error => {
//        console.error(error)
//     });
    
// }



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

//   const songs = event.target.files;

// Promise.resolve().then(() => {
//   this.setState({ songList: songs });
// }).then(()=> {
// console.log(this.state.songList)
//  }).catch((error) => {
//   console.log(error);
//  })
   

other = event.target.files;

console.log(other);

Promise.resolve().then(() => {this.setState({songsList : other})
}).then(()=> {
console.log(this.state.songList)
 }).catch((error) => {
  console.log(error);
 })
   

 
  // Now handle the array of promises we just created
  Promise.all(allReaders)
    .then(fileList => {
      console.log(this.state.files)
      // set the state that we have all the files
       this.setState({ afterSlice: fileList });
    })
    .catch(error => {
       console.error(error)
    });
    
    clicked = true;
    console.log("clicked = true");
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

secondClickSongs = event.target.files;

console.log(secondClickSongs);



Promise.resolve().then(() => {this.setState({songsList2 : secondClickSongs})
}).then(()=> {
console.log(this.state.songList)
 }).catch((error) => {
  console.log(error);
 })
 
  // Now handle the array of promises we just created
  Promise.all(allReaders)
    .then(fileList => {
      console.log(this.state.files)
      // set the state that we have all the files
      this.setState(prevState => ({ ...prevState, afterSlice: [...prevState.afterSlice,  ...fileList ]}));
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
  const { match: { params} } = this.props;
  let data;

  console.log(this.state.afterSlice);

  Promise.resolve().then(()=>{
 if(clicked === true) {
  axios.delete(`http://localhost:8000/albums/${params.albumId}/songs`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

}).then(() => {
  let user_id = this.context.user.sub;
  
  
  console.log(params);

 // let user_id = this.context.user.sub;

  let image = this.state.image;
  
  data = new FormData();

    

  this.setState(prevState => ({
  afterSlice: prevState.afterSlice.map((file, index) => ({...file, index})
)}));
  let afterSlice = this.state.afterSlice;
  

   this.setState(prevState => ({
   album: {...prevState.album, afterSlice, user_id}
}))
 
//   const songObject = {...other, ...secondClickSongs};
//   console.log(songObject);
//   this.setState(prevState => ({
//    songList: {...other, ...secondClickSongs}
// }))
  // this.setState({songsList : other})
  // this.setState({songList : secondClickSongs})

   console.log(this.state.songList);
 }).then(()=> {
  console.log(other);
  console.log(secondClickSongs);

    if (other != null || other != undefined) {
    console.log("other if statement")
    Array.from(this.state.songsList).forEach(song => {
    data.append('songs', song);
  })
  }
}).then(()=> {
    if(secondClickSongs != null || secondClickSongs != undefined) {
    console.log("secondClickSongs if statement")
    Array.from(this.state.songsList2).forEach(song => {
    data.append('songs', song);
  })
}

// console.log(other);
// console.log(secondClickSongs);
// console.log(this.state.songList);

  

  data.append('album', JSON.stringify(this.state.album))


}).then(()=>{
  // let albums = this.state.albums;
  axios.post(`http://localhost:8000/albums/${params.albumId}`, data, { 
     }).then(res => { // then print response status
      console.log(res.statusText)
 })
}).then(()=> {

   data.delete('songs');

   data.append('file', this.state.image)

  axios.put(`http://localhost:8000/albums/${params.albumId}`, data, { 
     }).then(res => { // then print response status
      console.log(res.statusText)
 })

}).then(()=> {
  const { match, location, history } = this.props;
  history.push("/feed");
  }).catch(e => console.log(e));


}


  





 
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
 
    const afterSlice = reorder(
      this.state.afterSlice,
      result.source.index,
      result.destination.index
    );
 
    this.setState({
      afterSlice
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
    let afterSlice = this.state.afterSlice.slice();
    afterSlice[index].name = event.target.value;
    this.setState({ afterSlice });
  }

onClick(event) {
  
  // this.save(event);
  // this.onSubmit(event);
  this.save2(event);
  // this.onClickHandler();

}

deleteClick() {
  const { match, location, history } = this.props;
  const { match: { params} } = this.props;
  var c = window.confirm("Are You Sure You Want To Delete This Post?");
  if (c === true) {
  axios.delete(`http://localhost:8000/albums/${params.albumId}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push("/feed");
      })
    }
  }
  

  render() {
   
    // let album = this.state.album;
    // let other = this.state.album.slice(1);
    // console.log(other);
    // console.log(album);
    
    const filesExist = this.state.album;
    return (
    
     
      <div className="downloadMusic">
      {this.state.afterSlice.length > 0 &&
        <div>
  
      <div>
      <Container>
      <Row>
      <Col>
 
     
        <ButtonToggle onClick={this.replaceInput} color="secondary">Replace Music Files
           </ButtonToggle>
           

     

        <div className="input">

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
     </div>
   
   <div>
          
         
          <EditFields
            beforeImageSave={this.state.beforeImageSave}
            file={this.state.image}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            key={this.state.album.id}
            onClick={this.resetFile}
            album={this.state.album}
            downloadChange={this.downloadChange}
          />
       
        </div>
        <div> 
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
                {this.state.afterSlice.map((file, index) => (
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
</div>

<div>

<Container>

        <div className="belowList">
        <div>
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
            </div>


            
          </div>

         
         <Row>
         
           <ButtonToggle onClick={this.onClick} color="success">Save
           </ButtonToggle> 
          </Row>
          <Row>
           <Button color="danger" size="sm" onClick={this.deleteClick}>Delete</Button>

         </Row>
</Container>
      </div>
      </div>
}
</div>

      
    );
  }
}
EditAlbum.contextType = Auth0Context;
 
export default EditAlbum;