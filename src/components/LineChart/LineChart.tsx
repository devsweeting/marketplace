import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { LineChart as Chart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { useLineChartStyles } from './LineChart.styles';

export const LineChart = ({ data }: any) => {
  const classes = useLineChartStyles();
  return (
    <Paper className={classes.chartContainer}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid container xs={6}>
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
          xs={6}
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
            <Typography component="span" className={classes.dateRangeButton}>
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
      <ResponsiveContainer width="100%" height={360}>
        <Chart data={data} margin={{ top: 30 }}>
          <Line type="monotone" dataKey="uv" stroke="#efefef" strokeWidth={30} dot={false} />
          <Line type="monotone" dataKey="uv" stroke="#000" strokeWidth={1} dot={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
        </Chart>
      </ResponsiveContainer>
    </Paper>
  );
};
