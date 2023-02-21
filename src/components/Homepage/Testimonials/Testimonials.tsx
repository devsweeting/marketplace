import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Container, TextContainer, Slider, CardContainer, Card } from './Testimomials.styles';

export const Testimonials = () => {
  const mockTestimonies = [
    {
      name: 'The Real Scott Kveton',
      image: '/images/testimonials/scott_k.png',
      company: 'Jump',
      testimonial:
        "I've been collecting NFTs for years, but this physical-based NFT collector marketplace takes it to the next level. The quality of the products is amazing, and the attention to detail is unparalleled. I love being able to display my NFTs in a physical form, and the marketplace makes it easy to do so. I highly recommend this marketplace to any serious NFT collector out there.",
    },
    {
      name: 'Skeletor Keldor',
      image: '/images/testimonials/skeletor.png',
      company: 'Overlord of Evil',
      testimonial:
        'This physical-based NFT collector marketplace is a game-changer for the NFT industry. The ability to own a physical representation of my favorite digital assets is truly unique, and the products are of the highest quality. I also appreciate the level of transparency in the production process, which gives me even more confidence in my purchases. I highly recommend this marketplace to anyone looking to take their NFT collection to the next level.',
    },
    {
      name: 'Kylian Mbappe',
      image: '/images/testimonials/avatar.png',
      company: 'Paris Saint-Germain ',
      testimonial:
        "This online trading card marketplace is a game-changer! I was able to find rare cards that I've been searching for for years. The platform is reliable and secure, and the customer service is top-notch. I highly recommend this marketplace to anyone looking for high-quality trading cards.",
    },
  ];

  return (
    <Container>
      <TextContainer>
        <Typography variant="xl5" fontWeight={800}>
          What our collectors say
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Typography>
      </TextContainer>
      <Slider container>
        <CardContainer>
          {mockTestimonies.map((testimony, index) => (
            <Card key={index}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginBottom: '20px',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60px',
                    height: '60px',
                    position: 'relative',
                    borderRadius: '30px',
                    backgroundColor: 'black',
                    overflow: 'hidden',
                    marginRight: '20px',
                  }}
                >
                  <Image
                    src={testimony.image}
                    fill
                    alt={'in quia occaecati nihil'}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Box>
                  <Typography variant="lg" component="h2">
                    {testimony.name}
                  </Typography>
                  <Typography variant="subtitle1" component="h2" style={{ color: 'black' }}>
                    {testimony.company}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" component="p">
                {testimony.testimonial}
              </Typography>
            </Card>
          ))}
        </CardContainer>
      </Slider>
    </Container>
  );
};
