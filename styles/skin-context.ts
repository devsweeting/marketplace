import React from 'react';
export const skins = {
  jump: {
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
    logo: '/images/logoJump.svg',
    borderBoxBackground: '/images/detail_page.png',
    listItem: {
      backgroundImage: '/images/list/partnerBackgroundItem.svg',
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
    sortButton: {
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '29.21px',
      width: 280,
      height: 41,
      padding: '6px 16px',
      justifyContent: 'space-between',
    },
  },
  pwcc: {
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
    logo: '/images/logoPWCC.svg',
    borderBoxBackground: '',
    listItem: {
      backgroundImage: '',
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
    sortButton: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '22px',
      borderRadius: '4px',
      width: 280,
      height: 34,
      padding: '6px 16px',
      justifyContent: 'space-between',
    },
  },
};

export const SkinContext = React.createContext({
  skin: skins.pwcc,
  setSkin: (item: any) => {
    item;
  },
});
