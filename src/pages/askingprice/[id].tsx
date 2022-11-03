import { getAssetById } from '@/api/endpoints/assets';
import { AskingPriceComponent } from '@/components/AskingPriceComponent/AskingPriceComponent';
import type { IAsset } from '@/types/assetTypes';
import type { ParsedUrlQuery } from 'querystring';

const AskingPage = ({ initialAsset }: { initialAsset: IAsset }) => {
  return (
    <>
      <AskingPriceComponent asset={initialAsset} />
    </>
  );
};
export default AskingPage;

export const getServerSideProps = async ({ query }: { query: ParsedUrlQuery }) => {
  try {
    const { id } = query;

    if (!id) {
      return { props: { initialAsset: null } };
    }

    const asset = await getAssetById(id as string);

    if (!asset)
      return {
        props: { initialAsset: null },
      };

    return {
      props: { initialAsset: asset },
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
