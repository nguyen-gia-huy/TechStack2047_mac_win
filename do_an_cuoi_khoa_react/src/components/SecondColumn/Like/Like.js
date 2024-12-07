import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'; // Import biểu tượng like

const Like = () => {
  return (
    <div style={{ marginTop: '10px', marginRight: '20px' }}>
      <button style={{ border:'none',borderRadius:'8px',display: 'flex', backgroundColor:'#1890FF',color:'white',alignItems: 'center', gap: '5px', height:'45px', padding:'0px 15px' }}>
        <FaThumbsUp style={{color:'white'}}/> Like
      </button>
    </div>
  )
}

export default Like;
