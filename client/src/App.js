import fileDownload from "js-file-download";
import Dropzone from "react-dropzone";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Success from "./components/Success";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="App mx-auto my-auto px-4 py-4 max-w-2xl min-w-min h-screen">
      <Navbar />
      <div className="flex flex-col items-center h-2/3 space-y-6">
        <div className="w-3/4 h1/4 p-2 m-2">
          <p className="text-base font-medium text-center">
            End cumbersome process of creating a terminology.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-500 shadow rounded-lg w-3/4 h-full cursor-pointer">
          <Dropzone
            accept=".txt"
            maxFiles={1}
            maxSize={4000}
            onDrop={(acceptedFile) => {
              if (acceptedFile.length > 0) {
                setLoading(true);
                var formdata = new FormData();
                var fileName = acceptedFile[0].name.split(" ").join("_");
                formdata.append("file", acceptedFile[0], fileName);

                var requestOptions = {
                  method: "POST",
                  body: formdata,
                  redirect: "follow",
                };

                fetch("/api/", requestOptions)
                  .then((response) => response.blob())
                  .then((result) => {
                    setLoading(false);
                    fileDownload(
                      result,
                      `${fileName.replace(".txt", "_terminology")}.xlsx`
                    );
                    setSuccess(true);
                    setTimeout(() => {
                      setSuccess(false);
                    }, 5000);
                  })
                  .catch((error) => console.log("error", error));
              } else {
                setError(true);
                setTimeout(() => {
                  setError(false);
                }, 5000);
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="h-full">
                <div
                  {...getRootProps({
                    className:
                      "flex flex-col items-center justify-center h-full",
                  })}
                >
                  <input {...getInputProps({ className: "h-full" })} />
                  <p className="p-3">
                    Drag and drop a text file (".txt") here, or click to select
                    one.
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {error && <Error />}
        {loading && <Loading />}
        {success && <Success />}
        <div className="text-indigo-600 font-medium hover:underline">
          <a
            href="https://atakanzengin.me"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made with <span className="text-red-500">&#9829;</span> by Atakan
            Zengin
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
