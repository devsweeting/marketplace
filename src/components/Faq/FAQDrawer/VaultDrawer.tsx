import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionFaq } from '../Faq.styles';
import { Body, Section, Title, Header, LineBreak } from '../PWCCFaq';

export const VaultDrawer = () => {
  return (
    <AccordionFaq square disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
        <Title>The Vault</Title>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '600px', overflow: 'scroll' }}>
        <Section>
          <Body>
            <Header>Is this an actual Vault?</Header>
            <LineBreak />
            <div>
              Yes. We spent a significant investment creating a bank-style vault for your trading
              cards. It is located in Tigard, Oregon.once received.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What kind of security is in place?</Header>
            <LineBreak />
            <div>
              The Vault was constructed using the guidelines established by the Underwriters
              Laboratory and we are proud that it received UL's highest classification of Class III.
              It is 2000 square feet and surrounded by 11 inches of concrete on all six sides. There
              are 140 security cameras, motion detection, security during business hours, and
              rigorous access control and security protocols.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do I submit my collection to the Vault?</Header>
            <LineBreak />
            <div>
              Please click <a href="https://members.pwccmarketplace.com/submissions/create">here</a>{' '}
              for detailed instructions.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              I just bought a card from a third-party auction site. How do I ship my cards directly
              to the Vault?
            </Header>
            <LineBreak />
            <div>
              Please click <a href="https://members.pwccmarketplace.com/submissions/create">here</a>{' '}
              for detailed instructions.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Can I view the location of my items in the Vault?</Header>
            <LineBreak />
            <div>
              For security purposes, at this time, only PWCC employees are allowed into the Vault.
              However, all your assets are available all the time, in high quality, digital
              photography, via your online Vault Portfolio.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Is there a fulfillment fee? What is the shipping going to be from my Vault?
            </Header>
            <LineBreak />
            <div>
              Standard shipping and insurance fees apply. There are no hidden fees for fulfillment.
              Items sold through PWCC Marketplace do not have fulfillment fees. A fulfillment fee of
              3% applies to items fulfilled in the first 90 days of storage, and a fee of only 1% is
              applied otherwise. Please see the{' '}
              <a href="https://www.pwccmarketplace.com/vault">Vault Pricing</a> page for costs
              associated with storing your collection in the Vault. International packages are
              subject to any duties and taxes as all packages are declared for the full value to
              remain in compliance with our insurance and{' '}
              <a href="https://www.pwccmarketplace.com/shipping-charges">shipping policies</a>.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do you handle the pricing for sets?</Header>
            <LineBreak />
            <div>Sets are processed and priced individually.</div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Will you handle the sale/exchange of funds for an item that I sell from the Vault?
            </Header>
            <LineBreak />
            <div>
              Yes, we can act as a fulfillment service for you as you buy and sell on multiple
              channels. We also offer a Fixed Price Marketplace. For more information on our Fixed
              Price Marketplace please see the Selling FAQ above or the Fixed Price page on our
              website.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Is there a minimum card value to place items in the vault?</Header>
            <LineBreak />
            <div>
              No, but the <a href="https://www.pwccmarketplace.com/vault">fee structure</a> is built
              for cards valued at $200 or more.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Do I get a price break if I send a card to the Vault directly from a PWCC auction?
            </Header>
            <LineBreak />
            <div>
              Yes. All items submitted to the Vault take advantage of Oregon’s 0% sales tax and
              there are no archival fees on any item sold or committed to an auction before the
              first day of the following month after being archived.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Do I receive a discount when I send items directly from my PWCC Vault to a PWCC
              auction?
            </Header>
            <LineBreak />
            <div>
              Yes, you receive a discount if you send the items before the first day of the
              following month that they entered your Vault. Otherwise, you do not receive a
              discount.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              If you give a market value less than what I paid for a card, can I use my owner value
              for the insured value?
            </Header>
            <LineBreak />
            <div>
              Yes. You can change the insured value when you log into My PWCC. Click on "Vault,"
              check the box or boxes of the items you wish to edit, click the Actions button and
              click "Edit Owner Value".
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do you determine market value for my item(s)?</Header>
            <LineBreak />
            <div>We use our algorithm and recent sales data to determine items’ market value.</div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Is my collection properly insured? Through who? For how much?</Header>
            <LineBreak />
            <div>
              Gallagher provides our insurance, the same provider for the Baseball Hall of Fame. The
              Vault is fully insured to 100% of the market value of the assets in possession. It
              protects against theft, fire, water, and all other losses.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What can I submit to my Vault Account?</Header>
            <LineBreak />
            <div>
              You can submit any professionally graded cards by PSA, BGS, BVG, SGC, CGC. You can
              also submit factory sealed or BBCE authenticated hobby/booster boxes and cases,
              factory sealed individual packs, authenticated memorabilia, graded comic books (CGC,
              CBCS) and video games, and ticket stubs.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Is the Vault temperature and lighting controlled?</Header>
            <LineBreak />
            <div>
              Yes, the Vault is temperature, humidity, and lighting controlled to ensure that your
              items remain in the same condition as when they were received.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Can I have a grading company send my items directly to my Vault address?
            </Header>
            <LineBreak />
            <div>
              Absolutely! Use your Vault mailing address found under the My PWCC tab, including your
              Vault ID number as the return location for your items and create a Vault submission
              through your account on our website once you have been given the tracking number from
              the grading company so that you can let our team know what should be in the
              submission. Your items will be processed directly into your Vault account once
              received.
            </div>
          </Body>
        </Section>
      </AccordionDetails>
    </AccordionFaq>
  );
};
