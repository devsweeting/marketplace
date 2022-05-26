import React, { useState, useEffect, useRef, createRef } from 'react';
import Link from 'next/link';
import { Grid, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useFaqPageStyles } from '@/styles/FaqTopicPage.styles';
import { Accordion } from '@/components/Accordion';
import { AccordionTextItem } from '@/components/Accordion/components/AccordionTextItem';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import FaqCta from '@/components/FaqCta';
import SelectInput from '@/components/SelectInput';

interface Article {
  category: string;
  name: string;
  questions: { question: string; answer: string }[];
}

const FaqTopicPage = ({ articles }: { articles: Article[] }) => {
  const [activeTopicOnDesktop, setActiveTopicOnDesktop] = useState<Article>(articles[0]);
  const [mobileAnchor, setMobileAnchor] = useState<number>(0);

  const router = useRouter();
  const urlParam = router.query.topic;
  const classes = useFaqPageStyles();
  const myRefs = useRef<any>([]);

  // co zamiast any ?
  myRefs.current = articles.map((article, i) => myRefs.current[i] ?? createRef());

  const setRouterPath = (param: string) =>
    router.push(`/faq/${param}`, undefined, { shallow: true });

  const findAnchorIndexMobile = (param: string) => {
    const refIndex = myRefs.current.findIndex((el: any) => el?.current.id === param);
    return refIndex;
  };

  const handleSelectChangeMobile = (param: string) => {
    findAnchorIndexMobile(param);
    setRouterPath(param);
  };

  const changeTopicOnDekstop = (e: React.SyntheticEvent) => {
    const { id } = e.target as Element;
    setRouterPath(id);
  };

  const findTopicOnDesktop = (urlParam: string | string[]) => {
    const topic = articles.filter((t) => t.category === urlParam);
    return topic[0];
  };

  useEffect(() => {
    const newAnchorIndex = findAnchorIndexMobile(urlParam as string);
    setMobileAnchor(newAnchorIndex);
  }, [urlParam]);

  useEffect(() => {
    myRefs.current[mobileAnchor].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [mobileAnchor]);

  useEffect(() => {
    if (urlParam) {
      const topic = findTopicOnDesktop(urlParam);
      topic && setActiveTopicOnDesktop(topic);
    }
  }, [urlParam]);

  return (
    <Box>
      <Grid mt={0} container>
        <Grid className={classes.leftColumn} container item md={3} xs={12}>
          <Grid item xs={12}>
            <Box className={classes.showOnMobile}>
              <SelectInput
                options={articles.map((a) => ({ name: a.name, id: a.category }))}
                handleSelectChangeMobile={handleSelectChangeMobile}
              />
            </Box>
            <Box className={classes.showOnDesktop}>
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
                        onClick={changeTopicOnDekstop}
                      >
                        {a.name}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
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
            <Box className={classes.showOnMobile}>
              {articles &&
                articles.map((a, i) => {
                  return (
                    <div id={a.category} ref={myRefs.current[i]}>
                      <Typography variant="h2" component="h1" className={classes.topicTitle}>
                        {a.name}
                      </Typography>
                      <Box className={classes.accordionWrapper}>
                        <Accordion>
                          <>
                            {a.questions.map((q) => {
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

                        <FaqCta />
                      </Box>
                    </div>
                  );
                })}
            </Box>

            <Box className={classes.showOnDesktop}>
              {activeTopicOnDesktop && (
                <Box>
                  <Typography variant="h2" component="h1" className={classes.topicTitle}>
                    {activeTopicOnDesktop.name}
                  </Typography>
                  <Box className={classes.accordionWrapper}>
                    <Accordion>
                      <>
                        {activeTopicOnDesktop.questions.map((q) => {
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
            </Box>
          </Grid>

          <Box className={classes.showOnDesktop}>
            <FaqCta />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

FaqTopicPage.layout = 'faqPages';
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
