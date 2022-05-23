import Container from '@mui/material/Container';
import Link from 'next/link';
import { Routes } from '@/domain/Routes';
import OpenGraph from '@/components/OpenGraph';

const Homepage = () => {
  return (
    <>
      <OpenGraph title={'Home page'} description={'Home page description'} />

      <Container maxWidth="xl">
        <h1 style={{ paddingTop: 150 }}>
          <Link href={Routes[1].path}>
            <a>NFT Detail View</a>
          </Link>
        </h1>
        <h1>
          <Link href={Routes[0].path}>
            <a>List View</a>
          </Link>
        </h1>
      </Container>
    </>
  );
};

export default Homepage;
