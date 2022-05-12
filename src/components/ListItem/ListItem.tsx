import React from 'react';
import { Grid } from '@mui/material';
import { useListItemStyles } from './ListItem.styles';
import { Card } from './components';
import { SingleListItem } from '../../domain/Items';

export type ListItems = SingleListItem[];

export const ListItem: React.FC<{ listItemData: ListItems }> = ({ listItemData }) => {
  const classes = useListItemStyles();
  return (
    <Grid container item xs={12} className={classes.wrapper}>
      {listItemData &&
        listItemData.map((item, index) => <Card item={item} key={`${item.name}${index}`} />)}
    </Grid>
  );
};
