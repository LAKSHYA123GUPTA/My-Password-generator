import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Click, add, addOpen, browserPermit, browserPermitstore,firstCount, firstTimer, genAvail, hover, isOpen, message, pass, permit, remember, salt, storePass, tabArray, tempToken, tokenData, uname, user } from '../Atoms/UserAtom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export default function LogoutPermission() {
  const [open, setOpen] = useState(true);
  const [isopen, setisopen] = useState(false);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(user);
  const setPass = useSetRecoilState(pass);
  const  setUname= useSetRecoilState(uname);
  const setFirstCount = useSetRecoilState(firstCount);
  const setGenAvail  = useSetRecoilState(genAvail);
  const setIsOpen = useSetRecoilState(isOpen);
  const setAddOpen = useSetRecoilState(addOpen);
  const setHover = useSetRecoilState(hover);
  const setClick = useSetRecoilState(Click);
  const setAdd = useSetRecoilState(add);
  const setPermit = useSetRecoilState(permit);
  const setBrowserPermit = useSetRecoilState(browserPermit);
  const setBrowserPermitStore = useSetRecoilState(browserPermitstore);
  const setTabArray = useSetRecoilState(tabArray);
  const setMessage = useSetRecoilState(message);
  const setStorePass = useSetRecoilState(storePass);
  const setTokenData = useSetRecoilState(tokenData);
  const setTempToken = useSetRecoilState(tempToken);
  const setSalt = useSetRecoilState(salt);
  const setRemember = useSetRecoilState(remember);
  const setFirstTimer = useSetRecoilState(firstTimer);

  function erase(){
    localStorage.clear();
    setUser("");
    setPass("");
    setUname("");
    setFirstCount(0);
    setGenAvail(0);
    setIsOpen(false);
    setAddOpen(false);
    setHover(false);
    setClick(false);
    setAdd(false);
    setPermit(0);
    setBrowserPermit(false);
    setBrowserPermitStore(undefined);
    setTabArray([]);
    setMessage("");
    setStorePass("");
    setTokenData(undefined);
    setTempToken(undefined);
    setSalt(undefined);
    setRemember(false);
    setFirstTimer(false);
    navigate('/');
  }
  

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    
    setTimeout(()=>{setisopen(false);},500)
  };

  return (
    <>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout Permission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{display:'inline-flex'}}>
         <div style={{display:'inline-flex'}}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={'30px'} height={'30px'} >
  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg></div>
<div style={{display:'inline-flex', paddingLeft:'10px'}}>
   If you Logout, then all the account logged in your device will gets logged out, but you can signin again later to them to retrive all information.</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent:'center'}}>
          <Button style={{backgroundColor:'#20c997', color:'black'}} onClick={()=>{
            handleClose();
            setisopen(true);
            setTimeout(()=>{

                erase();
                setisopen(false);
          },600);
            
            }}>Logout</Button>
          
        </DialogActions>
      </Dialog>
      <div>
     
     <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open={isopen}
       
     >
       <CircularProgress color="inherit" />
     </Backdrop>
   </div>
    </>
  );
}