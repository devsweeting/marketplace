import { useNavLinkStyles } from '../NavLink/NavLink.styles';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { LoginModal } from '@/components/LoginModal';
import { useModal } from '@/helpers/hooks/useModal';

export const Login = () => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const classes = useNavLinkStyles();

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <a style={{ textDecoration: 'none' }} onClick={handleOpen}>
        <Typography variant="h4" component="span" className={classNames(classes.navLink)}>
          Login
        </Typography>
      </a>
      <LoginModal open={isModalOpen} />
    </div>
  );
};
