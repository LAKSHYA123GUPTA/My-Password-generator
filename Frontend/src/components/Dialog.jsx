import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { genAvail, uname } from "../Atoms/UserAtom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "#222", 
  color: "#fff", 
};

export default function Dialog() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);
  const pname = useRecoilValue(uname);
  const setGenAvail = useSetRecoilState(genAvail);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#fff" }}
          >
            Auto Login Permission
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to login as &apos;
            <span
              style={{
                color: "#6666ff",
                fontWeight: "600",
                fontFamily: "monospace",
                fontStyle: "italic",
              }}
            >
              {pname}
            </span>
            &apos; ?
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                handleClose();
                setGenAvail((c) => c + 1);
              }}
              autoFocus
              sx={{ mt: 2, backgroundColor: "#888888", color: "green" }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              sx={{ mt: 2 }}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
