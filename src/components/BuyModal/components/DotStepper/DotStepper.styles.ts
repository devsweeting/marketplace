import { makeStyles } from '@mui/styles';

export const useDotStepperStyles = makeStyles((theme) => ({
  ontoStepIconRoot: {
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  completedIcon: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  circleIcon: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));
