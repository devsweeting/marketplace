import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Grid, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useFaqPageStyles } from '@/styles/FaqTopicPage.styles';
import { Accordion } from '@/components/Accordion';
import { AccordionTextItem } from '@/components/Accordion/components/AccordionTextItem';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/Button';
import classNames from 'classnames';

interface Article {
  category: string;
  name: string;
  questions: { question: string; answer: string }[];
}

const FaqTopicPage = ({ articles }: { articles: Article[] }) => {
  const classes = useFaqPageStyles();

  const router = useRouter();
  const urlParam = router.query.topic;

  const [activeTopic, setActiveTopic] = useState<Article>(articles[0]);

  const changeTopic = (e: React.SyntheticEvent) => {
    const { id } = e.target as Element;
    router.push(`/faq/${id}`, undefined, { shallow: true });
  };

  const findTopic = (urlParam: string | string[]) => {
    const topic = articles.filter((t) => t.category === urlParam);
    return topic[0];
  };

  useEffect(() => {
    if (urlParam) {
      const topic = findTopic(urlParam);
      topic && setActiveTopic(topic);
    }
  }, [urlParam]);

  return (
    <Box>
      <Grid mt={15} container>
        <Grid className={classes.leftColumn} container item md={3} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" className={classes.menuTitle}>
              Topics
            </Typography>
            {articles &&
              articles.map((a) => {
                return (
                  <Box
                    className={classNames(
                      classes.topicLinkWrapper,
                      a.category === urlParam && classes.active,
                    )}
                  >
                    <Typography
                      className={classes.topicLink}
                      variant="h5"
                      component="h4"
                      key={a.category}
                      id={a.category}
                      onClick={changeTopic}
                    >
                      {a.name}
                    </Typography>
                  </Box>
                );
              })}
          </Grid>
        </Grid>
        <Grid container item md={9} xs={12} className={classes.rightColumn}>
          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {activeTopic && (
              <Box>
                <Typography variant="h2" component="h1" className={classes.topicTitle}>
                  {activeTopic.name}
                </Typography>
                <Box className={classes.accordionWrapper}>
                  <Accordion>
                    <>
                      {activeTopic.questions.map((q) => {
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
                </Box>
              </Box>
            )}
          </Grid>
          <Grid container item xs={12} mt={9} mb={9.5} className={classes.ctaWrapper}>
            <Typography variant="h3" component="p">
              Couldn’t find answer?
            </Typography>
            <Box sx={{ padding: '0 16px' }}>
              <Button variant="outlined" size="small" sx={{ marginRight: { md: '10px', sx: 0 } }}>
                YES
              </Button>
              <Button variant="outlined" size="small">
                NO
              </Button>
            </Box>
            <Box>
              <Typography variant="body1" component="p" className={classes.ctaDescription}>
                2 out of 15 found this helpful.
              </Typography>
              <Typography variant="body1" component="p" className={classes.ctaDescription}>
                Please{' '}
                <Link href="#">
                  <a>contact us</a>
                </Link>
                .
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FaqTopicPage;

export async function getServerSideProps() {
  try {
    const res = await fetch(`http://localhost:3000/api/faq/topics`);
    const data: any = await res.json();
    return {
      props: {
        articles: data.items,
      },
    };
  } catch (err) {
    console.error(err);
  }
}
