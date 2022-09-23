import { formatNumber } from '@/helpers/formatNumber';
import { Card, CardActionArea, lighten, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

export const PortfolioAssetCard = ({ onClick, assetData }: { onClick: any; assetData: any }) => {
  const handleKeyDownOnCard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  const theme = useTheme();

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
              {assetData.media && assetData.media[0] && assetData.media[0].file.absoluteUrl && (
                <Image
                  placeholder="blur"
                  blurDataURL={`/_next/image?url=${assetData.media[0].file.absoluteUrl}&w=16&q=1`}
                  src={assetData.media[0].file.absoluteUrl}
                  alt={assetData.media[0].title}
                  width={200}
                  height={340}
                  style={{ textAlign: 'center', lineHeight: '60px', maxWidth: '100px' }}
                ></Image>
              )}
            </Box>
            <Box
              sx={{
                padding: '40px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
                [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <Box
                sx={{
                  width: '40%',
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
                    fontWeight: 700,
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
                  <Typography>{assetData.attributes.year[0]}</Typography>
                  <Typography>#xxx</Typography>
                  <Typography>Set Topps</Typography>
                  <Typography>
                    {assetData.attributes['grading service'][0]} {assetData.attributes['grade'][0]}
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  minWidth: '40%',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',

                  [theme.breakpoints.down('md')]: {
                    flexDirection: '100%',
                    flexWrap: 'wrap',
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: '100px',
                    margin: '0 25px',
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.down('md')]: {
                      minWidth: 'auto',
                      margin: '5px',
                      flexWrap: 'wrap',
                    },
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: 'Montserrat',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}
                  >
                    Valuation
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: '36px',
                      [theme.breakpoints.down('md')]: {
                        fontSize: '24px',
                      },
                    }}
                  >
                    {'$' +
                      formatNumber((assetData.fractionPriceCents * assetData.fractionQty) / 100)}
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
                  <Typography>Unit Price</Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: '36px',
                      [theme.breakpoints.down('md')]: {
                        fontSize: '24px',
                      },
                    }}
                  >
                    {'$' + assetData.fractionPriceCents / 100}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    minWidth: '100px',
                    margin: '0 25px',
                    [theme.breakpoints.down('md')]: {
                      margin: '5px',
                      minWidth: '33%',
                    },
                  }}
                >
                  <Typography>Total Units</Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: '36px',
                      [theme.breakpoints.down('md')]: {
                        fontSize: '24px',
                      },
                    }}
                  >
                    {assetData.fractionQty}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
};
