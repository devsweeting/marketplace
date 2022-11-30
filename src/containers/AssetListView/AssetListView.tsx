import { AssetCard } from '@/components/AssetCard';
import type { IAssetListView } from './IAssetListView';
import { Container } from './AssetListView.styles';
import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '@/api/endpoints/watchlist';
import { useUser } from '@/helpers/hooks/useUser';
import { useLocalWatchlist } from '@/helpers/hooks/useLocalWatchlist';
import { useModalContext } from '@/helpers/auth/ModalContext';

export const AssetListView = ({ assets, handleDrawer, activeCardId }: IAssetListView) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const user = useUser();
  const { addToLocalWatchlist, removeFromLocalWatchlist } = useLocalWatchlist();
  const { dispatch } = useModalContext();

  const watchlistAdd = async (e: MouseEvent<HTMLElement>, asset: IAsset) => {
    e.stopPropagation();

    if (!watchlist.includes(asset.id)) {
      addToLocalWatchlist(asset.id);

      if (user) {
        const { isSuccessful } = await addToWatchlist(asset.id);

        if (isSuccessful) setWatchlist((prev) => [...prev, asset.id]);
      } else {
        dispatch({ type: 'login', visible: true });
      }
    }
  };

  const watchlistRemove = async (e: MouseEvent<HTMLElement>, asset: IAsset) => {
    e.stopPropagation();

    if (watchlist.includes(asset.id)) {
      removeFromLocalWatchlist(asset.id);

      if (user) {
        const { isSuccessful } = await removeFromWatchlist(asset.id);

        if (isSuccessful) setWatchlist((prev) => prev.filter((id) => id !== asset.id));
      }
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      const data = await getWatchlist();

      if (!data) return [];

      return data.items.map((asset) => asset.id);
    };

    fetchWatchlist()
      .then((watchlist) => setWatchlist(watchlist))
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>
      {assets &&
        assets.map((asset) => (
          <AssetCard
            key={asset.id}
            assetData={asset}
            activeCardId={activeCardId}
            onClick={() => {
              handleDrawer(asset);
            }}
            watched={watchlist.includes(asset.id)}
            watchlistAdd={watchlistAdd}
            watchlistRemove={watchlistRemove}
          />
        ))}
    </Container>
  );
};
