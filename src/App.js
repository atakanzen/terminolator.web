import './App.css';
import Dropzone from 'react-dropzone'


function App() {
  return (
    <div className="App">
      <Dropzone accept=".txt" maxFiles={1} maxSize={5 * 1024 * 1024} onDrop={acceptedFile => {
        var formdata = new FormData();
        formdata.append("file", acceptedFile[0], acceptedFile[0].name);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("/api/", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps({className: "dropzone"})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
    </div>
  );
}

export default App;
