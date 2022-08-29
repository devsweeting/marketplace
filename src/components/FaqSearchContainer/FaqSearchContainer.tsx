import React from 'react';
import { Typography, Box, Stack, Chip } from '@mui/material';
import { useFaqSearchContainerStyles } from './FaqSearchContainer.styles';
import { SearchBox } from './components/SearchBox';
import type { Article } from '@/pages/faq/[topic]';
import Link from 'next/link';

export const FaqSearchContainer = ({ articles }: { articles: Article[] }) => {
  const classes = useFaqSearchContainerStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.innerWrapper}>
        <Typography variant="h2" component="h1" sx={{ lineHeight: '57px' }}>
          How can we help you?
        </Typography>
        <Box my={3} sx={{ width: '100%' }}>
          <SearchBox />
        </Box>

        <Stack className={classes.flexWrapper}>
          <Typography variant="body1" component="p" className={classes.topicsLegend}>
            Most viewed topics:
          </Typography>
          <>
            {articles &&
              articles.map((t) => {
                return (
                  <Box key={t.category}>
                    <Link href={`/faq/${t.category}`} className={classes.chipWrapper}>
                      <Chip
                        className={classes.chip}
                        label={t.name}
                        component="a"
                        variant="filled"
                        clickable
                      />
                    </Link>
                  </Box>
                );
              })}
          </>
        </Stack>
      </Box>
    </Box>
  );
};
