import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { PageContainer, TextContainer } from './AssetErrorPage.styles';

export function AssetErrorPage() {
  return (
    <PageContainer>
      <TextContainer>
        <Typography variant="xl3">Failed to retrieve the asset</Typography>
        <Typography variant="xl6" sx={{ marginBottom: '2rem' }}>
          Sorry we couldn&lsquo;t find this asset. Feel free to explore our other assets available.
        </Typography>
        <Link href="/explore">
          <Button variant="text" sx={{ display: 'block' }}>
            Explore other assets
          </Button>
        </Link>
      </TextContainer>
    </PageContainer>
  );
}
