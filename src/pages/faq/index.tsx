import { PageContainer } from '@/styles/FaqPage.styles';
import { PWCCFaq } from '@/components/Faq/PWCCFaq';

export type FeatureQuestion = {
  question: string;
  answer: string;
};

export interface Faq {
  leftFaq?: FeatureQuestion[];
  rightFaq?: FeatureQuestion[];
}

const FaqPage = () => {
  return (
    <PageContainer>
      <PWCCFaq />
    </PageContainer>
  );
};

export default FaqPage;
