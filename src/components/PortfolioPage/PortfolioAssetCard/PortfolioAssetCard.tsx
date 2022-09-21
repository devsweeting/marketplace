import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
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
  const details = parseAssetAttributes(assetData.attributes);

  return (
    <Card
      style={{
        cursor: 'pointer',
        borderRadius: '0px',
        borderBottom: '1px solid ' + lighten(theme.palette.primary.main, 0.85),
      }}
      sx={{
        ['@media (max-width:900px)']: {
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
            style={{
              display: 'flex',
              width: '100%',

              [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap',
              },
            }}
          >
            <Box
              style={{
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
            <Box sx={{ width: '100%' }}>
              <Box style={{ display: 'flex', width: '100%' }}>
                <Box style={{ padding: `${theme.spacing(3)} ${theme.spacing(2)}`, width: '100%' }}>
                  <Typography
                    style={{
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: '18px',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {assetData.name}
                  </Typography>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box>
                      <Typography>{details.year}</Typography>
                      <Typography>#xxx</Typography>
                      <Typography>Set Topps</Typography>
                      <Typography>
                        {details.grading} {details.grading_service}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignSelf: 'end',
                        marginLeft: 'auto',
                        [theme.breakpoints.down('md')]: {
                          flexDirection: 'column-reverse',
                        },
                      }}
                    >
                      <Box
                        style={{
                          minWidth: '100px',
                          margin: '0 25px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '0px',
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
                          style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '36px' }}
                        >
                          {'$' +
                            formatNumber(
                              (assetData.fractionPriceCents * assetData.fractionQty) / 100,
                            )}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          minWidth: '100px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '0px',
                          },
                        }}
                      >
                        <Typography>Unit Price</Typography>
                        <Typography
                          style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '36px' }}
                        >
                          {'$' + assetData.fractionPriceCents / 100}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          minWidth: '100px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '0px',
                          },
                        }}
                      >
                        <Typography>Total Units</Typography>
                        <Typography
                          style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '36px' }}
                        >
                          {assetData.fractionQty}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
};
