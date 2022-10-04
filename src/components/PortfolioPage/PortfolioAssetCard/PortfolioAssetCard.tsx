import { formatNumber } from '@/helpers/formatNumber';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import { Card, CardActionArea, lighten, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

export const PortfolioAssetCard = ({ onClick, assetData }: { onClick: any; assetData: any }) => {
  const details = parseAssetAttributes(assetData.attributes);

  const handleKeyDownOnCard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  const theme = useTheme();
  const classes = {
    textWrapper: {
      minWidth: '100px',
      margin: '0 25px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xl')]: {
        margin: '0 10px',
      },
      [theme.breakpoints.down('md')]: {
        minWidth: 'auto',
        margin: '5px',
        flexWrap: 'wrap',
      },
    },
    largeTypography: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '40px',
      display: 'flex',
      alignItems: 'flex-end',

      [theme.breakpoints.down(1649.95)]: {
        fontSize: '26px',
      },

      [theme.breakpoints.down('md')]: {
        fontSize: '24px',
      },
    },
    labelTypography: {},
    fineTypography: {
      ontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      marginLeft: '4px',
      marginBottom: '5px',
    },
    multiFontWrapper: {},
  };
  const formatLargeValues = (value: number) => {
    if (isNaN(value)) return value;

    if (value < 9999) {
      if (value % 1 === 0) {
        return value;
      }
      return formatNumber(value.toFixed(2) as unknown as number);
    } else if (value < 1000000) {
      return Math.round(value / 1000) + 'k';
    } else if (value < 10000000) {
      return (value / 1000000).toFixed(2) + 'm';
    } else if (value < 1000000000) {
      return Math.round(value / 1000000) + 'm';
    } else if (value < 1000000000000) {
      return Math.round(value / 1000000000) + 'b';
    }

    return '1T+';
  };
  return (
    <Card
      sx={{
        cursor: 'pointer',
        borderRadius: '0px',
        borderBottom: '1px solid ' + lighten(theme.palette.primary.main, 0.85),
        [theme.breakpoints.down('md')]: {
          maxWidth: '400px',
          borderRadius: '4px',
          margin: '10px 10px',
        },
      }}
      tabIndex={0}
      onKeyDown={handleKeyDownOnCard}
    >
      <Box sx={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
        <CardActionArea>
          <Box
            onClick={onClick}
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap',
              },
            }}
          >
            <Box
              sx={{
                maxWidth: '120px',
                backgroundColor: lighten(theme.palette.primary.main, 0.95),
                padding: theme.spacing(3),
                [theme.breakpoints.down('md')]: {
                  maxWidth: '100%',
                  margin: 'auto',
                },
              }}
            >
              {assetData.media && assetData.media[0] && assetData.media[0].absoluteUrl && (
                <Image
                  placeholder="blur"
                  blurDataURL={`/_next/image?url=${assetData.media[0].absoluteUrl}&w=16&q=1`}
                  src={assetData.media[0].absoluteUrl}
                  alt={assetData.media[0].title}
                  width={200}
                  height={340}
                  style={{ textAlign: 'center', lineHeight: '60px', maxWidth: '100px' }}
                />
              )}
            </Box>
            <Box
              sx={{
                padding: '40px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
                [theme.breakpoints.down('lg')]: {
                  padding: '10px',
                },
                [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <Box
                sx={{
                  width: '40%',
                  [theme.breakpoints.down('lg')]: {
                    minWidth: '30%',
                  },
                  [theme.breakpoints.down('md')]: {
                    width: '100%',
                    marginBottom: '20px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid black',
                  },
                }}
              >
                <Typography
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 600,
                    fontSize: '24px',
                    lineHeight: '32px',
                    overflowWrap: 'break-word',
                  }}
                >
                  {assetData.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '80%',
                    [theme.breakpoints.down('md')]: {
                      margin: '10px 0',
                      padding: '10px',
                    },
                  }}
                >
                  <Typography>{details.year}</Typography>
                  <Typography>#xxx</Typography>
                  <Typography>Set Topps</Typography>
                  <Typography>
                    {details.grading_service} {details.grading}
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  minWidth: '60%',
                  maxWidth: '100%',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  [theme.breakpoints.down('lg')]: {
                    minWidth: '70%',
                  },

                  [theme.breakpoints.down('md')]: {
                    flexDirection: '100%',
                    flexWrap: 'wrap',
                  },
                }}
              >
                <Box sx={classes.textWrapper}>
                  <Typography
                    sx={{
                      margin: 0,
                      padding: '0',
                      fontWeight: '600',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#6B7280',
                    }}
                  >
                    Ask price /unit
                  </Typography>
                  <Box display="flex" alignItems="flex-end">
                    <Typography sx={classes.largeTypography}>
                      {'$' + formatLargeValues((assetData.fractionPriceCents / 100) * 1.25)}{' '}
                    </Typography>
                    <Typography sx={classes.fineTypography}>@</Typography>
                    <Typography sx={classes.largeTypography}>
                      {'$' +
                        formatLargeValues(
                          (assetData.fractionPriceCents * 1.25 * assetData.fractionQty) / 100,
                        )}{' '}
                    </Typography>
                    <Typography sx={classes.fineTypography}>valuation</Typography>
                  </Box>
                </Box>
                <Box sx={classes.textWrapper}>
                  <Typography
                    sx={{
                      margin: 0,
                      padding: '0',
                      fontWeight: '600',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#6B7280',
                    }}
                  >
                    Valuation
                  </Typography>
                  <Typography sx={classes.largeTypography}>
                    {'$' +
                      formatLargeValues(
                        (assetData.fractionPriceCents * assetData.fractionQty) / 100,
                      )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    minWidth: '100px',
                    [theme.breakpoints.down('md')]: {
                      minWidth: '33%',
                      margin: '5px',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      margin: 0,
                      padding: '0',
                      fontWeight: '600',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#6B7280',
                    }}
                  >
                    Unit price paid
                  </Typography>
                  <Box display="flex" alignItems="flex-end">
                    <Typography sx={classes.largeTypography}>
                      {'$' + assetData.fractionPriceCents / 100}
                    </Typography>
                    <Typography style={classes.fineTypography}>
                      @{' '}
                      {formatLargeValues(
                        (assetData.fractionPriceCents * assetData.fractionQty) / 100,
                      )}{' '}
                      Valuation
                    </Typography>
                  </Box>
                </Box>
                <Box sx={classes.textWrapper}>
                  <Typography
                    sx={{
                      margin: 0,
                      padding: '0',
                      fontWeight: '600',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#6B7280',
                    }}
                  >
                    Total units
                  </Typography>
                  <Typography sx={classes.largeTypography}>{assetData.fractionQty}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
};
