import { getAssetById } from '@/api/endpoints/assets';
import { AskingPriceComponent } from '@/components/AskingPriceComponent/AskingPriceComponent';
import type { IAsset } from '@/types/assetTypes';
import type { ParsedUrlQuery } from 'querystring';

const AskingPage = ({ initialAsset, id }: { initialAsset: IAsset; id: string }) => {
  return (
    <>
      <AskingPriceComponent asset={initialAsset} id={id} />
    </>
  );
};
export default AskingPage;

export const getServerSideProps = async ({ query }: { query: ParsedUrlQuery }) => {
  try {
    const { id } = query;

    if (!id) {
      return { props: { initialAsset: null, id: null } };
    }

    const asset = await getAssetById(id as string);

    if (!asset)
      return {
        props: { initialAsset: null, id: null },
      };

    return {
      props: { initialAsset: asset, id: id },
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
