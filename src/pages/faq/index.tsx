import React from 'react';
import { Grid, Box } from '@mui/material';

const PostPage = ({ articles }: { articles: any }) => (
  <Box>
    <Grid mt={15} container>
      <h2>FAQ</h2>
      {articles &&
        articles.map((a: any) => {
          return <p key={a.category}>{a.name}</p>;
        })}
    </Grid>
  </Box>
);

PostPage.getInitialProps = async () => {
  const res = await fetch(`http://localhost:3000/api/faq/topics`);
  const json = await res.json();
  return { articles: json.items };
};

export default PostPage;
