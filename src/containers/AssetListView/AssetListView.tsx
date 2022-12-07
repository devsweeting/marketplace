import { AssetCard } from '@/components/AssetCard';
import type { IAssetListView } from './IAssetListView';
import { Container } from './AssetListView.styles';
import type { MouseEvent } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '@/api/endpoints/watchlist';
import { useUser } from '@/helpers/hooks/useUser';
import { useLocalWatchlist } from '@/helpers/hooks/useLocalWatchlist';
import { useModalContext } from '@/helpers/auth/ModalContext';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';

export const AssetListView = ({ assets, handleDrawer, activeCardId }: IAssetListView) => {
  const user = useUser();
  const { addToLocalWatchlist, removeFromLocalWatchlist } = useLocalWatchlist();
  const { dispatch } = useModalContext();

  const fetchWatchlist = async (signal?: AbortSignal | undefined) => {
    const data = await getWatchlist(signal);

    if (!data) return [];

    return data.items.map((asset) => asset.id);
  };

  const [watchlist, watchlistLoadingState, setWatchlist] = useEndpoint(
    (signal) => fetchWatchlist(signal),
    [],
  );
  if (!watchlist) {
    return null;
  }

  const watchlistAdd = async (e: MouseEvent<HTMLElement>, asset: IAsset) => {
    e.stopPropagation();

    if (!watchlist.includes(asset.id)) {
      addToLocalWatchlist(asset.id);

      if (user) {
        const { isSuccessful } = await addToWatchlist(asset.id);

        if (isSuccessful) setWatchlist(() => [...watchlist, asset.id]);
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

        if (isSuccessful) setWatchlist(() => watchlist.filter((id) => id !== asset.id));
      }
    }
  };

  return (
    <Container>
      {assets &&
        watchlistLoadingState === 'success' &&
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
