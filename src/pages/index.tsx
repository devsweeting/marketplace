import Container from '@mui/material/Container';
import Link from 'next/link';

const Homepage = () => {
  return (
    <Container maxWidth="xl">
      <h1 style={{ paddingTop: 150 }}>
        <Link href="/items/82191303-fa4d-4168-9cc8-96d82a291975/2019-panini-mosaic-pink-camo-rj-barrett-rookie-270-psa-10-gem-mint">
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
