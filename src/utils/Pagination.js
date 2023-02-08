import React, { useState } from 'react'
import Pagination from "@mui/material/Pagination";

const TPagination = ({transactions}) => {

    
  return (
    <div>
        <Pagination   onChange={handleChangePage}
            count={pageCount}/>
    </div>
  )
}

export default TPagination