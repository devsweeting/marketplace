import React, { useState, useEffect, useRef, createRef, useCallback } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useFaqPageStyles } from '@/styles/FaqTopicPage.styles';
import { Accordion } from '@/components/Accordion';
import { AccordionTextItem } from '@/components/Accordion/components/AccordionTextItem';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { SelectInput } from '@/components/SelectInput';

export interface Article {
  category: string;
  name: string;
  cta: string;
  description: string;
  questions: { question: string; answer: string }[];
}

export interface Articles {
  items: Article[];
}

const FaqTopicPage = ({ articles }: { articles: Article[] }) => {
  const [activeTopic, setActiveTopic] = useState<Article>(articles[0]);
  const [mobileAnchor, setMobileAnchor] = useState<number>(0);
  const [showFixedDropdown, setShowFixedDropdown] = useState<boolean>(false);
  const router = useRouter();
  const urlParam = router.query.topic;
  const classes = useFaqPageStyles();
  const myRefs = useRef<any>([]);

  myRefs.current = articles.map((articles, i) => myRefs.current[i] ?? createRef());

  const setRouterPath = (param: string) =>
    router.push(`/faq/${param}`, undefined, { shallow: true });

  const findAnchorIndexMobile = (param: string) => {
    const refIndex = myRefs.current.findIndex((el: any) => el?.current.id === param);
    return refIndex;
  };

  const handleSelectChangeOnMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    findAnchorIndexMobile(value);
    setRouterPath(value);
    const topic = findTopicOnDesktop(value);
    topic && setActiveTopic(topic);
  };

  const changeTopicOnDekstop = (e: React.SyntheticEvent) => {
    const { id } = e.target as Element;
    setRouterPath(id);
  };

  const findTopicOnDesktop = useCallback(
    (urlParam: string | string[]) => {
      const topic = articles.filter((t) => t.category === urlParam);
      return topic[0];
    },
    [articles],
  );

  useEffect(() => {
    const newAnchorIndex = findAnchorIndexMobile(urlParam as string);
    setMobileAnchor(newAnchorIndex);
  }, [urlParam]);

  useEffect(() => {
    const elementOffset = myRefs.current[mobileAnchor].current.offsetTop;
    window.scrollTo({ top: elementOffset - 50, behavior: 'smooth' });
  }, [mobileAnchor]);

  useEffect(() => {
    if (urlParam) {
      const topic = findTopicOnDesktop(urlParam);
      topic && setActiveTopic(topic);
    }
  }, [urlParam, findTopicOnDesktop]);

  useEffect(() => {
    const isFixedDropdownVisible = () => {
      if (window.pageYOffset >= 255) {
        setShowFixedDropdown(true);
      } else {
        setShowFixedDropdown(false);
      }
    };

    window.addEventListener('scroll', isFixedDropdownVisible);
    return () => window.removeEventListener('scroll', isFixedDropdownVisible);
  }, []);

  return (
    <>
      {showFixedDropdown && (
        <Box
          className={classes.showOnMobile}
          sx={{ position: 'fixed', top: '0px', left: '0', zIndex: '10' }}
        >
          <SelectInput
            options={articles.map((a) => ({ name: a.name, id: a.category }))}
            handleSelectChangeOnMobile={handleSelectChangeOnMobile}
            fixedType={true}
            activeTopic={activeTopic}
          />
        </Box>
      )}
      <Box>
        <Grid mt={0} container>
          <Grid className={classes.leftColumn} container item md={3} xs={12}>
            <Grid item xs={12}>
              <Box className={classes.showOnMobile}>
                <SelectInput
                  options={articles.map((a) => ({ name: a.name, id: a.category }))}
                  handleSelectChangeOnMobile={handleSelectChangeOnMobile}
                  activeTopic={activeTopic}
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
                        key={a.category}
                        className={classNames(
                          classes.topicLinkWrapper,
                          a.category === urlParam && classes.active,
                        )}
                      >
                        <Typography
                          className={classes.topicLink}
                          variant="h5"
                          component="h4"
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
                      <div key={a.category} id={a.category} ref={myRefs.current[i]}>
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
                        </Box>
                      </div>
                    );
                  })}
              </Box>

              <Box className={classes.showOnDesktop}>
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
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

FaqTopicPage.layout = 'faqPages';
export default FaqTopicPage;

export async function getServerSideProps() {
  // mocked fetching to be replaced with cms source
  try {
    const res = await fetch(`http://localhost:3000/api/faq/topics`);
    const data: Articles = await res.json();
    return {
      props: {
        articles: data.items,
      },
    };
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
  }
}
