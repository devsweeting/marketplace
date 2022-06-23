import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useFaqPageStyles } from '@/styles/FaqTopicPage.styles';
import { FaqBox } from '@/components/FaqBox';
import { Accordion } from '@/components/Accordion';
import { AccordionTextItem } from '@/components/Accordion/components/AccordionTextItem';
import { v4 as uuidv4 } from 'uuid';
import { FaqSearchContainer } from '@/components/FaqSearchContainer';
import type { Article } from './[topic]';

export type FeatureQuestion = {
  question: string;
  answer: string;
};

export interface Faq {
  leftFaq?: FeatureQuestion[];
  rightFaq?: FeatureQuestion[];
}

const FaqPage = ({
  articles,
  featureQuestions,
}: {
  articles: Article[];
  featureQuestions: FeatureQuestion[];
}) => {
  const classes = useFaqPageStyles();
  const [faq, setFaq] = useState<Faq>({ leftFaq: undefined, rightFaq: undefined });

  useEffect(() => {
    setFaq({ leftFaq: featureQuestions.slice(0, 6), rightFaq: featureQuestions.slice(6, 12) });
  }, [featureQuestions]);

  return (
    <>
      <Box className={classes.wrapper}>
        <Grid sx={{ marginTop: { xs: 10, md: 15 } }} container>
          <Grid container item>
            <Grid item md={12}>
              <FaqSearchContainer articles={articles} />
            </Grid>
          </Grid>
          <Grid container item mt={{ md: 12, xs: 0 }}>
            <Grid item md={3} xs={12} mb={3}>
              <Typography variant="h3" component="h3" className={classes.sectionHeading}>
                Topics
              </Typography>
            </Grid>
            <Grid
              container
              item
              md={9}
              xs={12}
              direction="row"
              justifyContent={{ md: 'flex-start', xs: 'center' }}
              alignItems="flex-start"
              spacing={5}
            >
              {articles &&
                articles.map((a) => {
                  return (
                    <Grid item key={a.category}>
                      <FaqBox item={a} />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>{' '}
        </Grid>
      </Box>
      <Grid container item mt={12} className={classes.blackContainer}>
        <Grid item md={12}>
          <Typography variant="h3" component="h3" className={classes.heading}>
            Frequently asked questions
          </Typography>
        </Grid>

        <Grid container item columnSpacing={{ md: 5, xs: 0 }} mt={6}>
          <Grid item md={6}>
            <Box className={classes.accordionBox}>
              {faq.leftFaq && (
                <Accordion>
                  <>
                    {faq.leftFaq.map((q) => {
                      return (
                        <Box key={uuidv4()}>
                          <AccordionTextItem title={q.question} isExpanded={false}>
                            {q.answer}
                          </AccordionTextItem>
                        </Box>
                      );
                    })}
                  </>
                </Accordion>
              )}
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className={classes.accordionBox}>
              {faq.rightFaq && (
                <Accordion>
                  <>
                    {faq.rightFaq.map((q: any) => {
                      return (
                        <Box key={uuidv4()}>
                          <AccordionTextItem title={q.question} isExpanded={false}>
                            {q.answer}
                          </AccordionTextItem>
                        </Box>
                      );
                    })}
                  </>
                </Accordion>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FaqPage;

export async function getStaticProps() {
  // mocked fetching to be replaced with cms source
  const [articlesRes, featureQuestionsRes] = await Promise.all([
    fetch('http://localhost:3000/api/faq/topics'),
    fetch('http://localhost:3000/api/faq/featureQuestions'),
  ]);

  const [articles, featureQuestions] = await Promise.all([
    articlesRes.json(),
    featureQuestionsRes.json(),
  ]);

  return { props: { articles: articles.items, featureQuestions } };
}
