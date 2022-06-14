import React from 'react';
import { CategoryListViewPage } from '@/containers/CategoryListViewPage';
import { OpenGraph } from '@/components/OpenGraph';
import { withUser } from '@/helpers/withUser';
import type { InferGetServerSidePropsType, NextPage } from 'next';

const CategoryPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
  test,
}) => {
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <CategoryListViewPage />
    </>
  );
};

export default CategoryPage;

export const getServerSideProps = withUser(async () => {
  return {
    props: {
      test: true,
    },
  };
});
