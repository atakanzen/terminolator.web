import fileDownload from 'js-file-download'
import Dropzone from 'react-dropzone'
import Navbar from './components/Navbar'
import {useState} from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="App mx-auto my-auto px-4 py-4 max-w-2xl min-w-min h-screen">
      <Navbar />
      <div className='flex flex-col items-center h-2/3 space-y-6'>
        <div className="w-3/4 h1/4 p-2 m-2">
          <p className="text-base font-medium ">the great tool for ending cumbersome process of creating a terminology.</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-500 shadow rounded-lg w-3/4 h-full cursor-pointer">
      <Dropzone accept=".txt" maxFiles={1} maxSize={5 * 1024 * 1024} onDrop={acceptedFile => {
        setLoading(true)
        var formdata = new FormData();
        formdata.append("file", acceptedFile[0], acceptedFile[0].name);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("/api/", requestOptions)
          .then(response => response.blob())
          .then(result => {
            setLoading(false)
            fileDownload(result, `${acceptedFile[0].name.replace('.txt', '_terminology')}.xlsx`)
          })
          .catch(error => console.log('error', error));
      }}>
      {({getRootProps, getInputProps}) => (
        <section className="h-full">
                <div {...getRootProps({className:"flex flex-col items-center justify-center h-full"})}>
            <input {...getInputProps({className:"h-full"})} />
            <p>Drag and drop a text file here, or click to select one.</p>
          </div>
        </section>
      )}
          </Dropzone></div>
          {loading ? (
        <div className="text-indigo-300 font-medium font-mono">creating terminology, please wait...</div>
        ) : ("")}
        <div className="text-indigo-600 font-medium hover:underline"><a href="https://atakanzengin.me" target="_blank" rel="noreferrer noopener">Made with <span className="text-red-500">&#9829;</span> by Atakan Zengin</a></div>
      </div>
      </div>
  );
}

export default App;
