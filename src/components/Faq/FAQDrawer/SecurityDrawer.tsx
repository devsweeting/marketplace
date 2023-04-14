import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionFaq } from '../Faq.styles';
import { Body, Section, Title, Header, LineBreak } from '../PWCCFaq';

export const SecurityDrawer = () => {
  return (
    <AccordionFaq square disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
        <Title>PWCC Marketplace Security</Title>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '600px', overflow: 'scroll' }}>
        <Section>
          <Body>
            <Header>Can PWCC clients bid on their own items?</Header>
            <LineBreak />
            <div>
              No. PWCC’s software prevents the PWCC user account that submitted an item from placing
              a bid on that item. PWCC prides itself on creating a culture of integrity and trust.
              We understand its importance to our company, the industry, and collectors. To achieve
              this goal, PWCC has implemented measures that ensure a fair and honest marketplace.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              What happens when a client places a bid on an item that they do not intend to honor?
            </Header>
            <LineBreak />
            <div>
              Our Marketplace Trust team is highly proactive in monitoring bidding to identify and
              address any instance of a bid placed without intention to follow through with the
              purchase. We have placed permanent blocks on bidders who do not adhere to the{' '}
              <a href="https://www.pwccmarketplace.com/marketplace-tenets">Marketplace Tenets</a>.
              Please refer to the Marketplace Tenets for more details on our monitoring procedures.
            </div>
            <LineBreak />
            <div>
              If PWCC identifies a user violating bidding policies, we block them from accessing the
              PWCC platform and permanently close their PWCC account. We also remove shill bids that
              occur through user collusion.{' '}
            </div>
            <LineBreak />
            <div>
              If a buyer does not pay for an item, PWCC does not list the sales price in our Sales
              History website tool and requires that the item be resold in an upcoming auction. We
              do not return unpaid items to the submitter. This step ensures that comps reflect
              actual sales.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Can PWCC employees bid on items in any PWCC Auction?</Header>
            <LineBreak />
            <div>
              No. All employees are prohibited from bidding on PWCC Auction items or buying items on
              the Fixed Price Marketplace. If an employee violates this company policy, it is
              grounds for termination. This step protects the integrity of the PWCC Auctions.
            </div>
            <LineBreak />
            <div>
              PWCC employees do not receive a discount on items because they cannot bid on or
              purchase items through PWCC.{' '}
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Why does PWCC hide the identity of buyers bidding on their Auction items?
            </Header>
            <LineBreak />
            <div>
              PWCC began this process in response to requests from buyers who wanted to protect
              their identity. This step ensures that successful investors’ card preferences are not
              made public to ensure a fair marketplace for all investors.{' '}
            </div>
            <LineBreak />
            <div>
              Please visit the Marketplace Security page on our website to learn about PWCC’s
              security measures.
            </div>
          </Body>
        </Section>
      </AccordionDetails>
    </AccordionFaq>
  );
};
