import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { motion, useCycle } from 'framer-motion';

export function CopyButton() {
  const [icon, toggleIcon] = useCycle(0, 1);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toggleIcon();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const icons = [
    <ContentCopyRoundedIcon
      key="share-icon"
      fontSize="large"
      onClick={() => void copyLink()}
      component={motion.svg}
      initial={{ opacity: 0, color: 'black' }}
      animate={{
        transition: {
          type: 'spring',
          stiffness: 25,
          mass: 5,
        },
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    />,
    <DoneOutlineRoundedIcon
      key="check-icon"
      fontSize="large"
      color="success"
      component={motion.svg}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      onAnimationComplete={() => setTimeout(() => toggleIcon(), 500)}
      transition={{
        type: 'spring',
        stiffness: 50,
      }}
      exit={{ opacity: 0 }}
    />,
  ];

  return <div>{icons[icon]}</div>;
}
