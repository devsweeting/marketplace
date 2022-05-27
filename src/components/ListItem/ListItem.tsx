import React from 'react';
import { Grid } from '@mui/material';
import { useListItemStyles } from './ListItem.styles';
import { Card } from './components';
import { IAsset } from 'src/types';

interface ListItemProps {
  listItemData: Array<IAsset>;
}

export const ListItem: React.FC<ListItemProps> = ({ listItemData }: ListItemProps) => {
  const classes = useListItemStyles();
  return (
    <Grid container item xs={12} className={classes.wrapper}>
      {listItemData.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </Grid>
  );
};
