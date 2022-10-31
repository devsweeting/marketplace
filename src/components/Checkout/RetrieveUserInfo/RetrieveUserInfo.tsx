import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { useCart } from '@/helpers/auth/CartContext';
import CloseIcon from '@mui/icons-material/Close';

const isoCountries = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: "Cote D'Ivoire",
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
};

export const RetrieveUserInfo = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const theme = useTheme();
  const { closeCart } = useCart();
  const [synapseInfo, setSynapseInfo] = useState({
    address_street: '',
    address_city: '',
    address_subdivision: '',
    address_country_code: '',
    address_postal_code: '',
  });

  function getKeyByValue(
    object: {
      [x: string]: string;
    },
    value: string,
  ) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return (
    <Box maxWidth="576px" width="100%">
      <Box
        sx={{
          height: '80px',
          padding: '24px',
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="xl"
          component="h2"
          sx={{ fontSize: '24px', lineHeight: '32px', fontWeight: '600' }}
        >
          Billing Info
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: '20px',
            right: '20px',
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}
          >
            <IconButton
              aria-label="remove from watchlist"
              onClick={() => {
                closeCart();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        height="max-content"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="1px"
      >
        <Box
          width="576px"
          height="max-content"
          maxWidth="520px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="0 24px"
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between" maxWidth="520px">
            <Box display="flex" flexDirection="column" width="50%" marginRight="20px">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="first-name">
                First Name
              </InputLabel>
              <OutlinedInput
                id="first-name"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
              />
            </Box>
            <Box display="flex" flexDirection="column" width="50%">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="last-name">
                Last Name
              </InputLabel>
              <OutlinedInput
                id="last-name"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="last-name">
              Phone Number
            </InputLabel>
            <OutlinedInput
              id="last-name"
              sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" maxWidth="520px">
            <Box display="flex" flexDirection="column" width="70%" marginRight="20px">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                Street Address
              </InputLabel>
              <OutlinedInput
                id="card-number"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
                defaultValue={synapseInfo.address_street}
                onChange={(e) => {
                  let updatedValue = {};
                  updatedValue = { address_street: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </Box>
            <Box display="flex" width="40%" flexDirection="column">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                Country
              </InputLabel>
              <Select
                value={synapseInfo.address_country_code}
                onChange={(e) => {
                  const updatedValue = { address_country_code: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
                margin="dense"
                size="small"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      '&::-webkit-scrollbar': {
                        backgroundColor: '#e5e5e5',
                        borderRadius: 8,
                        width: '10px',
                        height: '10px',
                      },

                      '&::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#8f9094',
                        minHeight: 8,
                      },
                    },
                  },
                  anchorOrigin: {
                    vertical: 'center',
                    horizontal: 'center',
                  },
                  transformOrigin: {
                    vertical: 'center',
                    horizontal: 'center',
                  },
                }}
              >
                {Object.values(isoCountries).map((countryName) => (
                  <MenuItem
                    key={getKeyByValue(isoCountries, countryName)}
                    value={getKeyByValue(isoCountries, countryName)}
                  >
                    {countryName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" maxWidth="520px">
            <Box display="flex" flexDirection="column" width="40%" marginRight="20px">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                City
              </InputLabel>
              <OutlinedInput
                id="card-number"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
              />
            </Box>
            <Box display="flex" flexDirection="column" width="25%" marginRight="20px">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                State/Territory
              </InputLabel>
              {synapseInfo.address_country_code === 'US'}
              <OutlinedInput
                id="card-number"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
                defaultValue={synapseInfo.address_subdivision}
                onChange={(e) => {
                  const updatedValue = { address_subdivision: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" width="25%">
              <InputLabel style={{ fontSize: '14px', lineHeight: '20px' }} htmlFor="card-number">
                Zip/Postal Code
              </InputLabel>
              <OutlinedInput
                id="card-number"
                sx={{ width: '100%', borderRadius: '8px', height: '40px', margin: '4px 8px 8px 0' }}
                defaultValue={synapseInfo.address_postal_code}
                onChange={(e) => {
                  const updatedValue = { address_postal_code: e.target.value };
                  setSynapseInfo((synapseInfo) => ({ ...synapseInfo, ...updatedValue }));
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box display="flex" width="100%" maxWidth="520px" padding="10px 24px">
          <Button
            sx={{
              '&.MuiButtonBase-root': {
                color: 'white',
                backgroundColor: theme.palette.primary.main,
                height: '52px',
                padding: '12px 32px',
                width: '100%',
                margin: '8px 0',
                fontSize: '16px',
                lineHeight: '24px',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.secondary.main,
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px auto',
                },
              },
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Confirm Info
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
