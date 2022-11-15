import { getAssetById } from '@/api/endpoints/assets';
import { getPurchaseById } from '@/api/endpoints/sellorders';
import { AskingPriceComponent } from '@/components/AskingPriceComponent/AskingPriceComponent';
import type { IAsset, IPurchaseInfo } from '@/types/assetTypes';
import type { ParsedUrlQuery } from 'querystring';

const AskingPage = ({
  initialAsset,
  purchaseInfo,
}: {
  initialAsset: IAsset;
  purchaseInfo: IPurchaseInfo[];
}) => {
  return (
    <>
      <AskingPriceComponent asset={initialAsset} purchaseInfo={purchaseInfo} />
    </>
  );
};
export default AskingPage;

export const getServerSideProps = async ({ query }: { query: ParsedUrlQuery }) => {
  try {
    const { id } = query;

    if (!id) {
      return { props: { initialAsset: null, purchaseInfo: null } };
    }

    const asset = await getAssetById(id as string);
    const assetPurchase = await getPurchaseById(id as string);

    if (!asset)
      return {
        props: { initialAsset: null, purchaseInfo: null },
      };

    return {
      props: { initialAsset: asset, purchaseInfo: assetPurchase },
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
