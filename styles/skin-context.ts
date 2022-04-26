import React from 'react';

export const skins = {
  jump: {
    logo: {
      image: '/images/logoJump.svg',
      width: 112,
      height: 52,
    },
    sidebar: {
      borderRight: 4,
    },
    header: {
      searchTextColor: '#000 !important',
      searchIconColor: '#000',
      searchInconBorderRadius: '4px !important',
      headerBackground: '#fff',
      navLink: {
        fontSize: '24px',
        fontWeight: '400',
      },
    },

    borderBoxBackground: '/images/detail_page.png',
    listItem: {
      backgroundImage: '/images/list/partnerBackgroundItem.svg',
      backgroundDecoration: '/images/list/gallery-background.svg',
      filterBackgroundColor: '#fff',
      cryptoValue: {
        fontSize: '24px',
        lineHeight: '32px',
      },
      dollarValue: {
        fontSize: '12px',
        lineHeight: '14px',
        letterSpacing: '1px',
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  pwcc: {
    logo: {
      image: '/images/logoPWCC.svg',
      width: 134,
      height: 33,
    },
    sidebar: {
      borderRight: 0,
    },
    header: {
      accentColor: '#FFDD00',
      searchTextColor: '#fff !important',
      searchIconColor: '#fff',
      searchInconBorderRadius: '50px !important',
      headerBackground: '#000',
      navLink: {
        fontSize: '16px',
        fontWeight: '700',
      },
    },
    borderBoxBackground: '',
    listItem: {
      backgroundImage: '',
      backgroundDecoration: '',
      filterBackgroundColor: 'rgba(255, 221, 0, 1)',
      cryptoValue: {
        fontSize: '18px',
        lineHeight: '27px',
      },
      dollarValue: {
        fontFamily: 'Montserrat',
        fontSize: '12px',
        lineHeight: '21px',
        letterSpacing: '0.15px',
        color: '#00',
      },
    },
  },
};

export const SkinContext = React.createContext({
  skin: skins.pwcc,
  setSkin: (item: any) => {
    item;
  },
});
