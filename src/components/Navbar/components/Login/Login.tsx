import { useNavLinkStyles } from '../NavLink/NavLink.styles';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { CustomModal } from '@/components/Modals/CustomModal';
import { useModal } from '@/helpers/hooks/useModal';

export const Login = () => {
  const { isOpen, setIsOpen } = useModal();

  const classes = useNavLinkStyles();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <a style={{ textDecoration: 'none' }} onClick={handleOpen}>
        <Typography variant="h4" component="span" className={classNames(classes.navLink)}>
          Login
        </Typography>
      </a>
      <CustomModal open={isOpen} />
    </div>
  );
};
