import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

const Analysis4 = () => {
  const [show, setShow] = useState(false);
  return(
    <>
      <button onClick={() => setShow(prev => !prev)}>Click</button>
      {show && <Box>This is your component</Box>}
    </>
  );
}

export default Analysis4
