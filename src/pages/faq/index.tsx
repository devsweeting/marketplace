import { mockFaqs } from '@/__mocks__/mockApiData';
import { PageContainer } from '@/styles/FaqPage.styles';
import { Faq } from '@/components/Faq';

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
      <Faq faqs={mockFaqs} />
    </PageContainer>
  );
};

export default FaqPage;
