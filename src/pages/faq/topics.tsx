import React from 'react';
import Link from 'next/link';
import { Grid, Box } from '@mui/material';

const PostPage = ({ article }: { article: any }) => (
  <Box>
    <Grid
      mt={15}
      container
      // columnSpacing={4}
    >
      <h1>{article.category}</h1>
      <p>{article.category}</p>
    </Grid>
  </Box>
);

PostPage.getInitialProps = async () => {
  const res = await fetch(`http://localhost:3000/api/faq/topics`);
  const json = await res.json();
  return { article: json.items[0] };
};

export default PostPage;
