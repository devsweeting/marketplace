import { useProfileGradient } from '@/helpers/hooks/useProfileGradient';
import { useUser } from '@/helpers/hooks/useUser';
import Avatar from '@mui/material/Avatar';
import { ColorCircle, GRADIENT_COLORS } from './Gradients';

export const ProfileAvatar = () => {
  const user = useUser();
  const gradient = useProfileGradient();

  return (
    <div>
      {user ? (
        <ColorCircle
          sx={{
            background: GRADIENT_COLORS[gradient],
            width: 32,
            height: 32,
            margin: 0,
            '&:hover': { transform: 'none' },
          }}
        />
      ) : (
        <Avatar sx={{ width: 32, height: 32 }} />
      )}
    </div>
  );
};
