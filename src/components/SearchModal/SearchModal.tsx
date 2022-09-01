import { Box, Divider, Modal, Typography } from '@mui/material';
import { SearchBox } from '@/components/SearchBox';
import { useSearchModalStyles } from './SearchModal.styles';

export interface ISearchModal {
  isOpen: boolean;
  onClose: () => void;
}
export const SearchModal = ({ isOpen, onClose }: ISearchModal) => {
  const classes = useSearchModalStyles();
  return (
    <Modal open={isOpen} onClose={onClose} sx={{ margin: '10px', top: '40%' }}>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: '10px' }}>
        <Typography variant="h3" component="h2" align="center" sx={{ lineHeight: '57px' }}>
          Search Assets
        </Typography>
        <Divider />
        <SearchBox
          borderRadius={true}
          reverseTextColor={false}
          className={classes.wrapper}
          placeholder="Sport, player, set..."
        />
      </Box>
    </Modal>
  );
};
