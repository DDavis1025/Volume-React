import React from 'react';
import { Link } from 'react-router-dom';




class DownloadTest extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.inputRef = React.createRef();

    this.state = {
      files: [],
      audio: '',
    };

  }



handleClick = event => {

  // Helper code to read file and return promise
  const readFile = (file) => {

    const fileList = [];

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
          name: file.name,
          link: e.target.result
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
      console.log(fileList)
      // set the state that we have all the files
      this.setState({ files: fileList });
    })
    .catch(error => { 
       console.error(error)
    });


}




  render() {

    return (
      <div className="downloadMusic">
      <div className="input">
        <input
          onChange={this.handleClick}
          id="upload-file"
          className="inputName"
          type="file"
          multiple
          ref={this.inputRef}
        />
        </div>
        <div className="audio-player">
       
       <audio
       controls
       autoPlay
       type="audio/mpeg"
       src={this.state.audio}
        />
         </div>

        <div>
         <ul ref={this.ulRef}>
            {this.state.files.map((file, index) => (
              <li key={index} onClick={() => {
                  
                  this.setState({ audio: file.link })
          
                   }}>
                  <a href={file.link}>{file.name}</a>
              </li>
            ))}
          </ul>

        </div>

      </div>
    

    );

  }
}



export default DownloadTest;