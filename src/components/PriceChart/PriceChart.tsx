import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import classNames from 'classnames';
import { Area, XAxis, ResponsiveContainer, Line, ComposedChart, Scatter } from 'recharts';

import { usePriceChartStyles } from './PriceChart.styles';

export const PriceChart = ({ data }: { data: any }) => {
  const classes = usePriceChartStyles();
  return (
    <Box className={classes.wrapper}>
      <Box my={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider />
      </Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginBottom: { xs: 2, md: 3 }, color: '#000' }}
      >
        Description
      </Typography>

      <Paper className={classes.chartContainer}>
        <Grid container xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            columnSpacing={2}
          >
            <Grid item xs={6}>
              <Box className={classes.flexContainer}>
                <Typography component="h5" className={classes.soldPriceLabel}>
                  LAST SOLD PRICE:
                </Typography>
              </Box>
              <Box className={classes.flexContainer}>
                <img
                  src={`/images/nftDetail/cryptoCurencies/etherum.svg`}
                  alt={'etherum icon'}
                  width={'15px'}
                  height={'auto'}
                />
                <Typography
                  variant="h3"
                  component="span"
                  sx={{
                    fontSize: '16px',
                    lineHeight: '20px',
                  }}
                  my={1}
                  mx={1}
                >
                  2.1
                </Typography>
                <Typography
                  variant="h3"
                  component="span"
                  sx={{
                    fontFamily: 'Rubik',
                    fontSize: '12px',
                    lineHeight: '14px',
                    letterSpacing: '1px',
                    color: 'rgba(0,0,0,0.87)',
                    fontWeight: 400,
                    paddingLeft: '50px',
                  }}
                >
                  ($6234.33)
                </Typography>
              </Box>
            </Grid>

            <Grid container item xs={6} direction="row" justifyContent="flex-end">
              <Grid item>
                <Typography component="span" className={classes.dateRangeButton}>
                  1W
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" className={classes.dateRangeButton}>
                  1M
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  component="span"
                  className={classNames(classes.dateRangeButton, classes.active)}
                >
                  3M
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" className={classes.dateRangeButton}>
                  1Y
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" className={classes.dateRangeButton}>
                  YTD
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.tabelWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14 }}
                padding={{ left: 0, right: 0 }}
              />
              <Area type="monotone" dataKey="pv" stroke="#FFF" fill="#fff" stackId="1" />
              <Area type="monotone" dataKey="uv" stroke="#FFF" fill="#E5E5E5" stackId="1" />
              <Line type="monotone" dataKey="amt" stroke="#000" strokeWidth={1} dot={false} />
              {/* <Scatter dataKey="cnt" fill="#3070CE" /> */}
            </ComposedChart>
          </ResponsiveContainer>
        </Grid>
      </Paper>
    </Box>
  );
};
