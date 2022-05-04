import Container from '@mui/material/Container';
import Link from 'next/link';

const Homepage = () => {
  return (
    <Container maxWidth="xl">
      <h1 style={{ paddingTop: 150 }}>
        <Link href="/token-detail/0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185/920d16d7-208f-4955-98c2-f41bee527f08">
          <a>NFT Detail View</a>
        </Link>
      </h1>
      <h1>
        <Link href="/list/someCategoryListing">
          <a>List View</a>
        </Link>
      </h1>
    </Container>
  );
};

export default Homepage;
