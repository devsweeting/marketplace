import React from 'react';
import CategoryListViewPage from '@/containers/CategoryListViewPage';
import { OpenGraph } from '@/components/OpenGraph';

const CategoryPage = () => {
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <CategoryListViewPage />
    </>
  );
};

export default CategoryPage;
