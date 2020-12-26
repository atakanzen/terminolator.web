import React from 'react'

function Loading() {
    return (
        <div className="w-3/4 h-1/4 bg-blue-200 border-l-4 border-blue-500 text-blue-500 p-3" role="alert">
            <p className="font-bold">Uploading File</p>
            <p>Please wait, your terminology is being created.</p>
        </div>
    )
}

export default Loading
