import { useState } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export default function Alert() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Your browser is not allowing virtual device-ID fetching, Sorry, you will have to Signin each time."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
