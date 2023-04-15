import { mockFaqs } from '@/__mocks__/mockApiData';
import { PageContainer } from '@/styles/FaqPage.styles';
import { Faq } from '@/components/Faq';
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
