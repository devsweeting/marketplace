import * as React from 'react';
import { CategoryListViewPage } from '@/containers/CategoryListViewPage';
import { OpenGraph } from '@/components/OpenGraph';
import { getServerSidePropsWithUser } from '@/helpers/withUser';
import type { InferGetServerSidePropsType, NextPage } from 'next';

const CategoryPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <CategoryListViewPage />
    </>
  );
};

export default CategoryPage;

export const getServerSideProps = getServerSidePropsWithUser(async () => {
  return {
    props: {
      test: true,
    },
  };
});
