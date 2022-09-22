import Grid from '@mui/material/Grid';
import { useFooterStyles } from './Footer.styles';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <Grid container item xs={12} className={classes.container} id="footer">
      <div className={classes.wrapper}>
        <div className={classes.socialsAndResources}>
          <Box className={classes.socials}>
            <Box className={classes.logo}>
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
              style={{ color: 'white', fontSize: 20, marginBottom: '15px' }}
            >
              {'NFT sport cards'}
            </Typography>
            <List
              style={{
                display: 'flex',
                listStyle: 'none',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 0,
                padding: 0,
                width: '100%',
              }}
            >
              <ListItem>
                <FacebookIcon style={{ color: 'white', fontSize: 24 }} />
              </ListItem>
              <ListItem>
                <InstagramIcon style={{ color: 'white', fontSize: 24 }} />
              </ListItem>
              <ListItem>
                <TwitterIcon style={{ color: 'white', fontSize: 24 }} />
              </ListItem>
              <ListItem>
                <GitHubIcon style={{ color: 'white', fontSize: 24 }} />
              </ListItem>
            </List>
          </Box>
          <div className={classes.resources}>
            <Box
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '33.33%',
                marginBottom: '20px',
              }}
            >
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'Jump'}
              </Typography>
              <List
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  margin: 0,
                  padding: 0,
                  width: '100%',
                }}
              >
                <ListItem className={classes.resourceText}>About us</ListItem>
                <ListItem className={classes.resourceText}>Careers</ListItem>
              </List>
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                width: '33.33%',
                marginBottom: '20px',
              }}
            >
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'Product'}
              </Typography>
              <List
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  margin: 0,
                  padding: 0,
                  width: '100%',
                }}
              >
                <ListItem className={classes.resourceText}>Marketplace</ListItem>
                <ListItem className={classes.resourceText}>Search</ListItem>
                <ListItem className={classes.resourceText}>PWCC</ListItem>
                <ListItem className={classes.resourceText}>Fractions</ListItem>
              </List>
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                marginBottom: '20px',
              }}
            >
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: 'white', fontSize: 20 }}
              >
                {'Resources'}
              </Typography>
              <List
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  margin: 0,
                  padding: 0,
                  width: '100%',
                }}
              >
                <ListItem className={classes.resourceText}>FAQ</ListItem>
                <ListItem className={classes.resourceText}>Help</ListItem>
                <ListItem className={classes.resourceText}>Blog</ListItem>
                <ListItem className={classes.resourceText}>Join our community</ListItem>
                <ListItem className={classes.resourceText}>Newsletter</ListItem>
              </List>
            </Box>
          </div>
        </div>
        <Divider
          sx={{
            backgroundColor: 'white',
            width: '97%',
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
          <Box className={classes.footer}>
            <Typography variant="body1" component="p" className={classes.text}>
              © 2022 Jump. All rights reserved.
            </Typography>
            <Box className={classes.termsAndPolicy}>
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
  );
};
