import Grid from '@mui/material/Grid';
import { useFooterStyles } from './Footer.styles';
import { Box, Divider, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <Grid container item xs={12} flexDirection={'row'} justifyContent={'center'} id="footer">
      <Grid item className={classes.container}>
        <div
          style={{
            width: '96%',
            maxWidth: '96%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '96%',
              height: '350px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                height: '170px',
                marginBottom: 70,
              }}
            >
              <Box style={{ position: 'relative', width: '113px', height: '56px' }}>
                <Image
                  src={'/images/logoJump.svg'}
                  alt="Logo"
                  layout="fill"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'NFT sport cards'}
              </Typography>
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 0,
                  padding: 0,
                  width: '250px',
                }}
              >
                <li>
                  <FacebookIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
                <li>
                  <InstagramIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
                <li>
                  <TwitterIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
                <li>
                  <GitHubIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
              </ul>
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'Jump'}
              </Typography>
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  margin: 0,
                  padding: 0,
                  width: '250px',
                }}
              >
                <li style={{ color: 'white', fontSize: 16 }}>About us</li>
                <li style={{ color: 'white', fontSize: 16 }}>Careers</li>
              </ul>
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'Product'}
              </Typography>
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  margin: 0,
                  padding: 0,
                  width: '250px',
                }}
              >
                <li style={{ color: 'white', fontSize: 16 }}>Marketplace</li>
                <li style={{ color: 'white', fontSize: 16 }}>Search</li>
                <li style={{ color: 'white', fontSize: 16 }}>PWCC</li>
                <li style={{ color: 'white', fontSize: 16 }}>Fractions</li>
              </ul>
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'NFT sport cards'}
              </Typography>
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: 0,
                  padding: 0,
                  width: '250px',
                }}
              >
                <li>
                  <FacebookIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
                <li>
                  <InstagramIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
                <li>
                  <TwitterIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
                <li>
                  <GitHubIcon style={{ color: 'white', fontSize: 24 }} />
                </li>
              </ul>
            </Box>
          </div>
          <Divider
            sx={{
              backgroundColor: 'white',
              width: '96%',
              height: '2px',
              margin: '10px 0',
              opacity: '0.3',
              borderRadius: '2px',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '96%',
              }}
            >
              <Typography variant="body1" component="p" className={classes.text}>
                © 2022 Jump. All rights reserved.
              </Typography>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '20%',
                }}
              >
                <Typography variant="body1" component="p" className={classes.text}>
                  {'Privacy Policy'}
                </Typography>
                <Typography variant="body1" component="p" className={classes.text}>
                  {'Terms & Conditions'}
                </Typography>
              </Box>
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
