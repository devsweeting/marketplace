import * as React from 'react';
import { CategoryListViewPage } from '@/containers/CategoryListViewPage';
import { OpenGraph } from '@/components/OpenGraph';
import type { NextPage } from 'next';

const CategoryPage: NextPage = () => {
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <CategoryListViewPage />
    </>
  );
};

export default CategoryPage;
