import { Typography } from '@mui/material';
import Link from 'next/link';
import { PageContainer, TextContainer } from './AssetErrorPage.styles';
import { Button } from '@/components/Button';

export function AssetErrorPage() {
  return (
    <PageContainer>
      <TextContainer>
        <Typography variant="xl6" fontWeight={800}>
          Failed to retrieve this asset
        </Typography>
        <Typography variant="xl3" sx={{ marginBottom: '2rem' }}>
          Sorry we couldn&lsquo;t find this asset. Feel free to explore our other assets available.
        </Typography>
        <Link href="/explore">
          <Button variant="outlined" sx={{ display: 'block' }}>
            Explore page
          </Button>
        </Link>
      </TextContainer>
    </PageContainer>
  );
}
