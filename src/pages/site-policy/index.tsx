import { Button } from '@/components/Button';
import { PageContainer, PageLinks } from '@/styles/SitePolicy/SitePolicy.styles';
import Link from 'next/link';

function SitePolicy() {
  return (
    <PageContainer>
      <PageLinks>
        <Link href="/site-policy/refunds-returns">
          <Button variant="text">Refunds & Returns</Button>
        </Link>
        <Link href="/site-policy/privacy-policy">
          <Button variant="text">Privacy Policy</Button>
        </Link>
        <Link href="/site-policy/terms-of-service">
          <Button variant="text">Terms of Service</Button>
        </Link>
      </PageLinks>
    </PageContainer>
  );
}

export default SitePolicy;
