import * as React from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSetRecoilState } from 'recoil';
import {browserPermitstore, permit } from '../Atoms/UserAtom';
import deviceIDFetcher from './deviceIdFetch';

export default function PermissionBanner() {
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const setPermit = useSetRecoilState(permit);
  const setBrowserPermit = useSetRecoilState(browserPermitstore);
  const closeBanner = () => {
    setBannerOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <TrapFocus open disableAutoFocus disableEnforceFocus>
        <Fade appear={false} in={bannerOpen}>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-label="Cookie banner"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              p: 2,
              borderWidth: 0,
              borderTopWidth: 1,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              gap={2}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography fontWeight="bolder" fontSize={'20px'}>This website collects your browser&apos;s virtual info</Typography>
                <Typography variant="body2" fontStyle={'italic'} letterSpacing={'0.1px'}>
                  
                 This website relies on your browser&apos;s info collection to make your password manager, more secured and invulnerable to hackers and also provide features like auto login only if you accept it to do so. 
                </Typography>
              </Box>
              <Stack
                gap={2}
                direction={{
                  xs: 'row-reverse',
                  sm: 'row',
                }}
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-end', sm: 'center' },
                }}
              >
                <Button size="small" onClick={()=>{
                    closeBanner();
                    deviceIDFetcher().then(visitorId => {
                        // console.log(visitorId);
                        setPermit(true);
                        setBrowserPermit(visitorId);
                     }).catch(error => {
                         console.error('Error fetching device ID:', error);
                     });
                     

                } } variant="contained">
                  Allow all
                </Button>
                <Button size="small" onClick={()=>{
                    closeBanner();
                    setPermit(false);
                    
                        
                    
                } }>
                  Reject all
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </React.Fragment>
  );
}