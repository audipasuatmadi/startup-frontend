import React from 'react'
import axios from '../apis/Index'

interface Props {
  
}

const tes = (props: Props) => {

  const handleTest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('otw');
    let response;
    try {
      response = await axios.post("/tes")
    } catch (e) {
      console.log(response);
    }
    console.log(response);
  }

  return (
    <div className="mt-64 bg-red-900">
      <p>deputy</p>
      <button onClick={handleTest}>
        lup
      </button>
    </div>
  )
}

export default tes
