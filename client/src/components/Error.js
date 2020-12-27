import React from "react";

function Error() {
  return (
    <div
      className="w-3/4 h-1/4 bg-red-200 border-l-4 border-red-500 text-red-500 p-3"
      role="alert"
    >
      <p className="font-bold">Upload Failed</p>
      <p>
        Please make sure you are using a file with ".txt" extension. <br /> Max
        file size is 5Kb (1000~ words)
      </p>
    </div>
  );
}

export default Error;
