import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { Container, TextContainer, FaqContainer, FaqSection } from './Faq.styles';

type Faq = {
  question: string;
  answer: string;
};

type Topic = {
  name: string;
  faqs: Faq[];
};

type FaqProps = {
  faqs?: Faq[];
  topics?: Topic[];
};

export function Faq({ faqs, topics }: FaqProps) {
  return (
    <Container>
      <TextContainer>
        <Typography variant="xl6" fontWeight={700} textAlign="center">
          Frequently asked questions
        </Typography>
      </TextContainer>
      <FaqContainer>
        {topics &&
          topics.length > 0 &&
          topics.map((topic, index) => (
            <FaqSection key={index} id={topic.name}>
              <Typography variant="xl3" fontWeight={700}>
                {index + 1}. {topic.name}
              </Typography>
              {topic.faqs.map((faq, index) => (
                <div key={index}>
                  <Accordion square disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
                      <Typography variant="lg" fontWeight={500}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="lg" lineHeight="32px">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Divider />
                </div>
              ))}
            </FaqSection>
          ))}
        {faqs && (
          <>
            <Divider />
            {faqs.length > 0 &&
              faqs.map((faq, index) => (
                <div key={index}>
                  <Accordion square disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
                      <Typography variant="lg" fontWeight={500}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="lg" lineHeight="32px">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Divider />
                </div>
              ))}
          </>
        )}
      </FaqContainer>
    </Container>
  );
}
