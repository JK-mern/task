import React from 'react'

function SucessComponent({message}) {
  return (
    <div role="alert" className="alert alert-success  animate-bounce mt-5 rounded-md p-3 ">
    <span className="text-left  ">{message}</span>
  </div>
  )
}

export default SucessComponent