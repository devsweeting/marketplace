import React from 'react';
export const skins = {
  jump: {
    logo: '/images/logoJump.svg',
    borderBoxBackground: '/images/detail_page.png',
    headerBackground: '#fff',
    listItem: {
      backgroundImage: '/images/list/partnerBackgroundItem.svg',
      filterBackgroundColor: '#fff',
    },
  },
  pwcc: {
    logo: '/images/logoPWCC.svg',
    borderBoxBackground: '',
    headerBackground: '#000',
    listItem: {
      backgroundImage: '',
      filterBackgroundColor: 'rgba(255, 221, 0, 1)',
    },
  },
};

export const SkinContext = React.createContext({
  skin: skins.pwcc,
  setSkin: (item: any) => {
    item;
  },
});
