import Container from '@mui/material/Container';
import { OpenGraph } from '@/components/OpenGraph';
import { Typography } from '@mui/material';

const Homepage = () => {
  return (
    <>
      <OpenGraph title={'Home page'} description={'Home page description'} />

      <Container maxWidth="xl">
        <Typography variant="h1" component="h1" sx={{ marginTop: 15 }}>
          Home page
        </Typography>
      </Container>
    </>
  );
};

export default Homepage;
