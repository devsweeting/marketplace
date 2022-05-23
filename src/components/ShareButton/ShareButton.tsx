import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { useShareButtonStyles } from './ShareButton.styles';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Paper } from '@mui/material';

export default function ShareButton() {
  const { asPath } = useRouter();
  const URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`;
  const classes = useShareButtonStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popper' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box aria-describedby={id} onClick={handleClick} className={classes.buttonWrapper}>
          <Typography component="p" variant="body1" className={classes.shareButton}>
            share <ShareIcon sx={{ fontSize: '16px', transform: 'translateY(3px)' }} />
          </Typography>
        </Box>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Paper className={classes.iconsList}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
                  <FacebookShareButton url={URL} quote={'Hey, take a look at this awesome item!'}>
                    <FacebookIcon size={35} borderRadius={16} />
                  </FacebookShareButton>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
                  <TwitterShareButton url={URL}>
                    <TwitterIcon size={35} borderRadius={16} />
                  </TwitterShareButton>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
                  <LinkedinShareButton url={URL}>
                    <LinkedinIcon size={35} borderRadius={16} />
                  </LinkedinShareButton>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
                  <WhatsappShareButton url={URL}>
                    <WhatsappIcon size={35} borderRadius={16} />
                  </WhatsappShareButton>
                </motion.div>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
