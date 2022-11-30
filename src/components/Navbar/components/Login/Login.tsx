import { useModalContext } from '@/helpers/auth/ModalContext';

import { NavText } from '../NavLink/NavLink.styles';

export const Login = () => {
  const { dispatch } = useModalContext();

  const handleOpen = () => {
    dispatch({ type: 'login', visible: true });
  };

  return (
    <div>
      <a style={{ textDecoration: 'none' }} onClick={handleOpen}>
        <NavText variant="nav">Login</NavText>
      </a>
    </div>
  );
};
