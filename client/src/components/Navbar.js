import React from 'react'

function Navbar() {
    return (
        <nav className="bg-white pb-4">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-black border-b-2 border-gray-100">
                <div className="flex items-center">
                        <span className="font-semibold text-xl tracking-tight"><a href="/"><span className='text-indigo-600'>term</span>inolator</a></span>
                </div>
                    <span className="font-light text-base font-mono hover:underline"><a href="https://github.com/ataknz/terminolator.web" rel='noopener noreferrer' target='_blank'>github-repo</a></span>
            </div>
            </div>
        </nav>
    )
}

export default Navbar
