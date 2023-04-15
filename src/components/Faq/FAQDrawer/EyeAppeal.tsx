import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionFaq } from '../Faq.styles';
import { Body, Section, Title, Header, LineBreak } from '../PWCCFaq';

export const EyeAppealDrawer = () => {
  return (
    <AccordionFaq square disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
        <Title>Eye Appeal</Title>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '600px', overflow: 'scroll' }}>
        <Section>
          <Body>
            <Header>What is PWCC-A, -E, and -S?</Header>
            <LineBreak />
            <div>
              These are special designations that PWCC provides based on our opinion of the eye
              appeal of the card relative to other examples of that card in that grade. Please refer
              to the{' '}
              <a href="https://www.pwccmarketplace.com/about-the-marketplace#eyeAppeal">
                Eye Appeal
              </a>{' '}
              section on our website to learn more.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is the difference between Eye Appeal and a technical grade?</Header>
            <LineBreak />
            <div>
              The technical grade assigned by the grading companies is determined by a number of
              factors including surface and corner wear, surface presentation, centering, and
              others. Within each factor there is a range of acceptable conditions to earn a
              particular grade. For example, according to PSA&apos;s stated standards, a NM-MT 8 can
              tolerate centering registration of 65/35 or better; as such, cards centered both 50/50
              and 65/35 are eligible to receive a technical grade of NM-MT 8.
            </div>
            <LineBreak />
            <div>
              {' '}
              <a href="https://www.pwccmarketplace.com/about-the-marketplace#eyeAppeal">
                Eye Appeal
              </a>{' '}
              refers to a card&apos;s visual presentation–or how attractive the card is to the eye.
              Using the example described above, while a card with 65/35 centering and 50/50
              centering are both eligible to earn a grade of NM-MT 8, the card with 50/50 centering
              is more visually attractive than the card with 65/35 centering.
            </div>
          </Body>
          <div>
            How does a card get reviewed for these designations, and how is the determination made?
          </div>
          <LineBreak />
          <div>
            Each vintage card (pre-1987) that is submitted to PWCC Marketplace and PWCC Vault with
            an estimated value of over $250 is reviewed by our team for the eye appeal designation.
          </div>
          <LineBreak />
          <div>
            A key component to this program is that PWCC makes the determination without bias. PWCC
            does not charge submitters for this review service. The potential for any bias is
            further removed by doing the eye appeal review after all auction items are sorted by
            sport, issue, and year which shields the review team from any submitter information
            ensuring that the evaluation be based on visual presentation only.
          </div>
        </Section>

        <Section>
          <Body>
            <Header>
              Does PWCC charge for the review or charge different auction fees for eye
              appeal-designated cards?
            </Header>
            <LineBreak />
            <div>
              Absolutely not. PWCC does not charge for this service, offer a different fee
              structure, or any other benefit for the service that could cause our assessment to be
              biased. It is critical that these designations be consistently awarded to cards
              strictly on their visual presentation with no other influence.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What training does PWCC have to assess eye appeal?</Header>
            <LineBreak />
            <div>
              Because PWCC sells 30,000+ items each month, our team sees more graded cards than any
              other auction broker. This affords us a unique and comprehensive perspective on the
              range of visual presentation for each issue.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              How does PWCC address the variance with a grade (e.g., the range of a PSA 6)?
            </Header>
            <LineBreak />
            <div>
              Although eye appeal has been a concept discussed in the market since its inception,
              PWCC has taken the lead in quantifying it and adding predictability to the variance in
              market value resulting from eye appeal range. Eye Appeal within a grade can vary
              depending on several factors, including centering, surface color, etc. It especially
              applies for cards in sets that present significant centering, color, etc. challenges.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Did the third-party grading companies give PWCC permission to designate cards with an
              Eye Appeal sticker? What was their involvement in the creation of these designations?
            </Header>
            <LineBreak />
            <div>
              PWCC Marketplace relies heavily on the expertise of the professional grading companies
              PSA, SGC, and Beckett. PWCC sought counsel from all three companies independently
              surrounding eye appeal and its long-standing effect on market value. Their awareness
              of this venture was a prerequisite to our willingness to create the Eye Appeal Scale
              and unveil the designations.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Can a card get all stickers?</Header>
            <LineBreak />
            <div>
              No. Cards with above-average eye appeal will earn a PWCC-A designation, cards with
              exceptional eye appeal will earn an E designation, and cards with superior eye appeal
              will earn a S designation. A card wouldn&apos;t be issued all designations.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              How did PWCC estimate the distribution of eye appeal across the population?
            </Header>
            <LineBreak />
            <div>
              Although these figures will always be estimates and there is an inherently qualitative
              nature to the analysis, the distribution of visual presentation was estimated based on
              PWCC&apos;s extensive knowledge of the market and exposure to more graded cards than
              any other venue.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Do the PWCC-A, -E, and -S and designations impact the registries?</Header>
            <LineBreak />
            <div>
              No. These designations are simply intended to call attention to cards with excellent
              eye appeal to facilitate investors participation in the marketplace.
            </div>
          </Body>
        </Section>
      </AccordionDetails>
    </AccordionFaq>
  );
};
