# useFilters hook and the explore and search pages

The useFilters hook makes the browsers url the source of truth for the asset requests by checking which key value pairs have been applied. Its used on the explore and search page by importing the hook and using its values:

```typescript
import { useFilters } from '@/helpers/hooks/useFilters';
// then inside of a component calling the hook and getting the methods
const {
  checkedFilters,
  rangeFilters,
  brandFilters,
  clearTrendingFilter,
  updateBrandFilters,
  sortByOrder,
} = useFilters();

// then pass these values in to the query builder function in function that makes the call to the api for assets
const loadAssets = useCallback(
  async (page = 1, signal?: AbortSignal | undefined) => {
    if (isReady) {
      const queryString = await queryBuilder({
        page,
        sortType: sortByOrder,
        checkedFilters,
        rangeFilters,
      });

      if (queryString) {
        const { meta, items }: { meta: IMeta; items: IAsset[] } = await loadListAssetByPage({
          queryString,
          signal,
        });
        return { currentMeta: meta, assets: items };
      }
    }
  },
  [checkedFilters, isReady, rangeFilters, sortByOrder],
);

// updating the brand filter in a function like so
const handleApplyBrandFilter = (filter: string, brand: IMarket) => {
  if (Object.keys(filter).length) {
    const filterValue = filter.split('=')?.[1];
    if (
      !brandFilters.some((filter) => filter.filterId === filterValue) &&
      !brandFilters.some((filter) => filter.categoryId === 'brand')
    ) {
      void updateBrandFilters([{ filterId: filterValue, categoryId: 'brand' }]);
      setActiveBrandCard(brand.brand);
    }
    clearTrendingFilter(filterValue)
      ?.then(() => setActiveBrandCard(''))
      .catch(() => {
        return;
      });
  }
  return;
};
```

The hook works by parsing and stripping key value pairs off of the query if there is one. It then determines if it is a checked filter or a range filter. The process is nearly identical for the brand filters

```typescript
for (const [key, value] of Object.entries(query)) {
  if (key.startsWith('attr_eq')) {
    const strippedKey = getAttrFromKey(key);
    const parsedValue = getArrayFromQuery(value);

    if (strippedKey) {
      checkedFilters.push(
        ...parsedValue.map((item: string) => ({ categoryId: strippedKey, filterId: item })),
      );
    }
  }

  if (key.startsWith('attr_gte')) {
    const strippedKey = getAttrFromKey(key);
    const minValue = getStringFromQuery(value);
    const maxValue = getStringFromQuery(query[`attr_lte[${strippedKey}]`]);

    if (strippedKey && minValue && maxValue) {
      rangeFiltersObj[strippedKey] = { min: minValue, max: maxValue };
    }
  }

  if (key && key.startsWith('order') && !!value) {
    sortByType.length = 0;
    sortByType.push(value as string);
  }
}
```

Then the results are memoized

```typescript
const checkedFiltersMemo = useMemo(
  () => checkedFilters,
  [checkedFilters.map((item) => `${item.categoryId}-${item.filterId}`).join('')],
);

const brandFiltersMemo = useMemo(
  () => brandFilters,
  [brandFilters.map((item) => `${item.categoryId}-${item.filterId}`).join('')],
);
const rangeFiltersMemo = useMemo(() => {
  return rangeFiltersObj;
}, [
  Object.entries(rangeFiltersObj)
    .map(([key, value]) => `${key}-${value.min}-${value.max}`)
    .join(''),
]);

const sortTypeMemo = useMemo(() => {
  return sortByType;
}, [sortByType.map((item) => item)]);
```

Lastly the values are updated via these methods, after the update functions are defined there are also the clear methods which can be called from the search and explore pages to reset the query or update the query value and fetch new data

```typescript
const updateSortByOrder = (sortBy: string) => {
  const updatedQuery = { ...query };
  for (const key of Object.keys(updatedQuery)) {
    if (key.startsWith('order')) {
      delete updatedQuery[key];
    }
  }
  const index = sortByType.indexOf(sortBy);
  if (index === -1) {
    sortByType.length = 0;
    sortByType.push(sortBy);
  }
  sortByType[index] = sortBy;

  updatedQuery['order'] = sortByType[index];

  return router.push(
    {
      pathname: router.pathname,
      query: updatedQuery,
    },
    undefined,
    { shallow: true },
  );
};

const updateCheckedFilters = async (newCheckedFilters: IFilter[]) => {
  const updatedQuery = { ...query };
  for (const key of Object.keys(updatedQuery)) {
    if (key.startsWith('attr_eq')) {
      delete updatedQuery[key];
    }
  }
  for (const filter of newCheckedFilters) {
    const key = `attr_eq[${filter.categoryId}]`;

    const currentFilters = updatedQuery[key];
    const filters = [filter.filterId];

    if (Array.isArray(currentFilters)) {
      filters.push(...currentFilters);
    }

    updatedQuery[key] = filters;
  }

  return router.push(
    {
      pathname: router.pathname,
      query: updatedQuery,
    },
    undefined,
    { shallow: true },
  );
};

const updateBrandFilters = async (newBrandFilters: IFilter[]) => {
  const updatedQuery = { ...query };

  for (const key of Object.keys(updatedQuery)) {
    if (key.startsWith('attr_eq[brand]')) {
      delete updatedQuery[key];
    }
  }

  for (const filter of newBrandFilters) {
    const key = `attr_eq[${filter.categoryId}]`;

    const currentFilters = updatedQuery[key];
    const filters = [filter.filterId];

    if (Array.isArray(currentFilters)) {
      filters.push(...currentFilters);
    }

    updatedQuery[key] = filters;
  }
  return router.push(
    {
      pathname: router.pathname,
      query: updatedQuery,
    },
    undefined,
    { shallow: true },
  );
};

const clearTrendingFilter = (filterValue: string) => {
  const updatedQuery = { ...query };
  if (Object.keys(updatedQuery).length > 0) {
    for (const [key, value] of Object.entries(updatedQuery)) {
      if (key.startsWith('attr_eq[brand]') && value === filterValue) {
        delete updatedQuery[key];
        return router.push(
          {
            pathname: router.pathname,
            query: updatedQuery,
          },
          undefined,
          { shallow: true },
        );
      }
    }
  }
};

const clearRangeFilters = (filterId: any) => {
  const updatedQuery = { ...query };
  for (const key of Object.keys(updatedQuery)) {
    if (key.startsWith('attr_gte') && key.indexOf(filterId) !== -1) {
      delete updatedQuery[key];
    }

    if (key.startsWith('attr_lte') && key.indexOf(filterId) !== -1) {
      delete updatedQuery[key];
    }
  }

  void router.push(
    {
      pathname: router.pathname,
      query: updatedQuery,
    },
    undefined,
    { shallow: true },
  );
};

const updateRangeFilters = async (newRangeFilters: RangeFilters) => {
  const updatedQuery = { ...query };

  if (newRangeFilters === null) {
    return;
  }
  if (newRangeFilters) {
    for (const [key, range] of Object.entries(newRangeFilters)) {
      updatedQuery[`attr_gte[${key}]`] = range.min;
      updatedQuery[`attr_lte[${key}]`] = range.max;
    }
  }

  return router.push(
    {
      pathname: router.pathname,
      query: updatedQuery,
    },
    undefined,
    { shallow: true },
  );
};

const clearQueryFilters = () => {
  const updatedQuery = { ...query };
  updateCheckedFilters([]).catch(() => {
    void router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true },
    );
  });

  updateRangeFilters({}).catch(() => {
    void router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true },
    );
  });
  void router.push(
    {
      pathname: router.pathname,
      query: '',
    },
    undefined,
    { shallow: true },
  );
};
```
