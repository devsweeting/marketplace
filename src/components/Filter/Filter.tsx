import React from 'react';
import { Typography } from '@mui/material';
// import { useFilterStyles } from './Filter.styles';

export const Filter = () =>
  // top = 5,
  // left = 5,
  // bottom = 0,
  // right = 0,
  // borderImage = '/images/detail_page.png',
  // borderImage = null,
  {
    // const classes = useFilterStyles();
    return (
      // <Box
      //   className={classes.container}
      //   sx={{
      //     borderTop: top,
      //     borderBottom: bottom,
      //     borderLeft: left,
      //     borderRight: right,
      //     borderImageSource: `url(${borderImage})`,
      //   }}
      // >
      <Typography variant="h3" component="p">
        Filter
      </Typography>
      // </Box>
    );
  };
