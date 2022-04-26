import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import classNames from 'classnames';

import { Area, XAxis, ResponsiveContainer, Line, ComposedChart, Scatter } from 'recharts';

import { usePriceChartStyles } from './PriceChart.styles';

export const PriceChart = ({ data }: { data: any }) => {
  const classes = usePriceChartStyles();
  return (
    <Box>
      <Box mb={6}>
        <Divider />
      </Box>
      <Typography variant="h4" component="h2" mb={3} sx={{ color: '#000' }}>
        Price history
      </Typography>

      <Paper className={classes.chartContainer}>
        <Grid
          className={classes.labelsContainer}
          //  xs={12}
          container
        >
          <Grid container item xs={6}>
            <Grid item>
              <Typography component="h5" className={classes.soldPriceLabel}>
                LAST SOLD PRICE
              </Typography>
              <Typography component="p" className={classes.soldPriceValue}>
                $93.98
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            columnSpacing={2}
          >
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
        <Grid container sx={{ width: '100%', height: 300 }}>
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
                padding={{ left: 30, right: 30 }}
              />
              <Area type="monotone" dataKey="pv" stroke="#FFF" fill="#fff" stackId="1" />
              <Area type="monotone" dataKey="uv" stroke="#FFF" fill="#E5E5E5" stackId="1" />
              <Line type="monotone" dataKey="amt" stroke="#000" strokeWidth={1} dot={false} />
              <Scatter dataKey="cnt" fill="#3070CE" />
            </ComposedChart>
          </ResponsiveContainer>
        </Grid>
      </Paper>
    </Box>
  );
};
