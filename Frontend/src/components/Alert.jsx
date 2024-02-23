import { useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function Alert() {
  const [open, setOpen] = useState(true);

  
  const handleClose = () => {
    setOpen(false);
  };
 setTimeout(()=>{
 setOpen(false);
 },3000)
  return (
    <Box sx={{ width: 500 }}>
     
      <Snackbar
        open={open}
        onClose={handleClose}
        message="I love snacks"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
