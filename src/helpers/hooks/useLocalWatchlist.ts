const WATCHLIST = 'watchList' as string;

export function useLocalWatchlist() {
  const inLocalWatchlist = (id: string): boolean => {
    const localWatchlist = getLocalWatchlist();

    return localWatchlist.includes(id);
  };

  const addToLocalWatchlist = (id: string): void => {
    const localWatchlist = getLocalWatchlist();

    localStorage.setItem(WATCHLIST, JSON.stringify([...localWatchlist, id]));
  };

  const removeFromLocalWatchlist = (id: string): void => {
    const localWatchlist = getLocalWatchlist();
    const watchlist = localWatchlist.filter((assetId) => assetId !== id);

    localStorage.setItem(WATCHLIST, JSON.stringify(watchlist));
  };

  const getLocalWatchlist = (): string[] => {
    const localWatchlist = localStorage.getItem(WATCHLIST);

    return localWatchlist ? JSON.parse(localWatchlist) : [];
  };

  return {
    inLocalWatchlist,
    addToLocalWatchlist,
    removeFromLocalWatchlist,
    getLocalWatchlist,
  };
}
