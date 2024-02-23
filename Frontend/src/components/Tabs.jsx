import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {Button} from '@mui/material/'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRecoilState, useRecoilValue } from 'recoil';
import { add, message, storePass, tabArray } from '../Atoms/UserAtom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Creator from './SpAvatar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));


export default function Tabs() {
    const webname=useRecoilValue(message);
    const webPass=useRecoilValue(storePass);
    
    const [array,setArray] = useRecoilState(tabArray);
    const [added,setAdded] = useRecoilState(add);
    React.useEffect(()=>{
        if(added&&webname!==""){
    //         let arr=[];
    //       arr=(array && array.map(element=>{
    //         return element;
    //     })) 
    //    arr.push({message:webname,password:webPass}) 
        setArray([...array,{message:webname,password:webPass}])
        setAdded(false)
        }
    },[added])
    
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      {array.length===0?<Typography style={{display:"flex", justifyContent:"center", alignItems:'center', height:'100vh', color:'grey'}}>Your Password store is Empty.</Typography> :null}
      {array.map((element)=>{
        if(array.length!==0&& element!==""){
            // console.log(array);
        return (
            // eslint-disable-next-line react/jsx-key
            <Item
            sx={{
              my: 1,
              mx: 'auto',
              p: 2,
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <Stack>
                <Creator message={element.message} />
              </Stack>
              <Stack sx={{ minWidth: 0 }}>
                <Typography style={{display:'flex', justifyContent:'left'}} variant='h4' noWrap>Title: {element.message}</Typography>
                <div style={{display:'flex', justifyContent:'left'}} >
                <Typography style={{display:'inline'}} variant='h6' >Password:  </Typography>
                <Typography  style={{ display:'inline', paddingTop:5, paddingRight:'30px'}} noWrap>{element.password && (element.password.replace(/./g, '✲'))}</Typography>
                <IconButton 
                onClick={async ()=>{
                    try {
                        await navigator.clipboard.writeText(element.password);
                        
                
                        
                      } catch (error) {
                        console.log("Failed to copy the text.    " + error);
                      }
                }}
                aria-label="delete" size="small" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', backgroundColor:'#ffff88'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={'20px'} height={'20px'}>
      <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
    </svg>
    
          </IconButton>
                </div>
              </Stack>
            </Stack>
          </Item>
          )}
        return null;
      })}
      
    </Box>
  );
}