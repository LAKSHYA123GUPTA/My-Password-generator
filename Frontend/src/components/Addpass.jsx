import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { useRecoilState, useSetRecoilState } from "recoil";
import { add, addOpen, message, storePass } from "../Atoms/UserAtom";
import TextField from "@mui/material/TextField";
export default function Addpass() {
  const [open, setOpen] = useRecoilState(addOpen);
  //   const [click, setClick] = useRecoilState(Click);

  const setadd = useSetRecoilState(add);
  const setMessage = useSetRecoilState(message);
  const setStorePass = useSetRecoilState(storePass);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      //   setClick(true);
    }
  };

  return (
    <div style={{ zIndex: "9999" }}>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Store the password</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "grid", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                // onChange={handleChange}
                // onClick={handleMenuOpen}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                variant="outlined"
                label="Website name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                type="password"
                onChange={(e) => {
                  setStorePass(e.target.value);
                }}
                // onClick={handleMenuOpen}
                variant="outlined"
                label="Password"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              setadd(true);
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
