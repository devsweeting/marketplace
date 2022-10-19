import { LoginModal } from '@/components/LoginModal';
import { useModal } from '@/helpers/hooks/useModal';

import { NavText } from '../NavLink/NavLink.styles';

export const Login = () => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <a style={{ textDecoration: 'none' }} onClick={handleOpen}>
        <NavText variant="nav">Login</NavText>
      </a>
      <LoginModal open={isModalOpen} />
    </div>
  );
};
