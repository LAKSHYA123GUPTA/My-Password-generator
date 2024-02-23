import Checkbox from '@mui/material/Checkbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { permit, remember } from '../Atoms/UserAtom';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
export default function CheckboxRemember() {
  const [rememberme, setRememberme] = useRecoilState(remember);
  const grey = useRef();
  const permited = useRecoilValue(permit);
  const handleChange = (event) => {
    setRememberme(event.target.checked);
  };
  useEffect(()=>{
    if(permited===true){
       grey.current.style.color='black'
    }
    else
    grey.current.style.color='grey'
  },[permited])
  return (
    <div>
    <Checkbox
      checked={rememberme}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'Remember this device' }}
      disabled={(permited!==0&&permited!==false)?false:true}
    /> 
    <Typography ref={grey} style={{display:'inline', paddingTop:'2px'}}>Remember this device</Typography>
    </div>
  );
}