import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionFaq } from '../Faq.styles';
import { Section, Title, Body, Header, LineBreak } from '../PWCCFaq';

export const BuyingDrawer = () => {
  return (
    <AccordionFaq square disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
        <Title>Buying</Title>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '600px', overflow: 'scroll' }}>
        <Section>
          <Body>
            <Header>How can I pay for my purchases?</Header>
            <LineBreak />
            <div>
              You can pay through our website with a credit card for invoices up to $10,000. You may
              also use funds held in your PWCC account to pay for your purchases. We also accept
              wires, ACH bank transfers, checks, money orders, and various forms of cryptocurrency
              using BitPay, including Bitcoin, Bitcoin Cash, Dogecoin, Ethereum, WBTC, and stable
              coins (DAI, PAX, USDC, GUSD, and BUSD). PWCC will apply sales tax to your invoice
              based on your delivery address. Buyers may also use{' '}
              <a href="https://www.pwccmarketplace.com/capital">PWCC Capital services</a> such as an
              advance on an auction submission or a loan on their Vault portfolio. Credit cards are
              not accepted for any item purchased in the Premier Auction. Please contact us if you
              need financing assistance.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do I apply to bid in the Premier Auction?</Header>
            <LineBreak />
            <div>
              All bidders must be approved to participate in the Premier Auction. To apply, submit a
              brief application and two references if applicable. Our team will review your
              application, contact you within 24 hours if additional information is needed, and
              notify you of your approval. This process can take several days, so please submit your
              application early. Applications are reviewed more quickly on the final day of the
              auction, so please still submit your application even on the final day of the auction
              and we will do our best to review it in time for you to place a bid before closing.
              After you receive approval to bid in the Premier Auction, there is no limit on your
              purchases as a new bidder.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Do I need to refresh the page to see the most recent bid in an Auction?</Header>
            <LineBreak />
            <div>
              No. The website will automatically refresh when a new bid is placed. You will also be
              able to follow the header image on the site to see the five most recent bids in the
              auction.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How does Premier Auction and Weekly Auction bidding work?</Header>
            <LineBreak />
            <div>
              Approved bidders can start to bid as soon as the auction is live and the bidding tool
              is activated. All bids are entered using the maximum bid model. Bids will be submitted
              in fixed increments only. Bids will be accepted until 7:00 p.m. PT on the closing
              night of the auction. Then, at 7:00 p.m. PT, extended bidding will start (see details
              below). If you are the only bidder on an item when the auction closes, you will be
              declared the winner.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do maximum bids work?</Header>
            <LineBreak />
            <div>
              All bids are placed using the "maximum bid" model, which typically represents the
              highest price the bidder is willing to pay for an item. When a bidder places a maximum
              bid, the bid will automatically increase competitively, up to but never over, the
              maximum bid amount. You will be notified if you are the highest bidder, if you've been
              outbid, and if you've won the item. Maximum bids are private and are only viewable by
              the client that submitted the bid. PWCC does not have access to this information and
              cannot view bidders’ maximum bids. Maximum bid information is managed on dedicated IT
              infrastructure and is contractually monitored by an external IT firm. Third-party
              management of maximum bids ensures the privacy and confidentiality of maximum bid
              amounts. The IT firm audits access to the data to confirm that no PWCC personnel ever
              have access to this information.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What are the bid increments?</Header>
            <LineBreak />
            <div>
              All items will be sold to the highest bidder when the auction timer expires. All
              maximum bids will be placed in the following increments: Premier Auction Bid
              Increments
            </div>
            <LineBreak />
            <ul>
              <li>$0 - $30,000 is a $1,000 bid increment </li>
              <li>$30,000 - $50,000 is a $2,000 bid increment</li>
              <li>$50,000 - $100,000 is a $5,000 bid increment </li>
              <li>$100,000 - $200,000 is a $10,000 bid increment </li>
              <li>$200,000 - $500,000 is a $20,000 bid increment </li>
              <li>$500,000 - $1,500,000 is a $50,000 bid increment </li>
              <li>$1,500,000 + is a $100,000 bid increment</li>
            </ul>
            <LineBreak />
            <div>Weekly Auction Bid Increments</div>
            <LineBreak />
            <ul>
              <li>$5 - $50 is a $1 bid increment</li>
              <li>$50 - $100 is a $2 bid increment</li>
              <li>$100 - $200 is a $5 bid increment</li>
              <li>$200 - $500 is a $10 bid increment</li>
              <li>$500 - $2,000 is a $25 bid increment</li>
              <li>$2,000 - $5,000 is a $100 bid increment</li>
              <li>$5,000 - $10,000 is a $250 bid increment</li>
              <li>$10,000 - $30,000 is a $500 bid increment</li>
              <li>$30,000 - $50,000 is a $2,000 bid increment</li>
              <li>$50,000+ is a $5,000 bid increment</li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is Premier Auction half-bidding?</Header>
            <LineBreak />
            <div>
              During the last extended bidding increment, all bid increments will be halved. During
              that time period bids may be placed in the following increments:
            </div>
            <ul>
              <li>$0 - $30,000 is a $500 bid increment</li>
              <li>$30,000 - $50,000 is a $1,000 bid increment</li>
              <li>$50,000 - $100,000 is a $2,500 bid increment</li>
              <li>$100,000 - $200,000 is a $5,000 bid increment</li>
              <li>$200,000 - $500,000 is a $10,000 bid increment</li>
              <li>$500,000 - $1,500,000 is a $25,000 bid increment</li>
              <li>$1,500,000 + is a $50,000 bid increment</li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How does Premier Auction extended bidding work?</Header>
            <LineBreak />
            <div>Each Premier Auction will close with an extended bidding period.</div>
            <LineBreak />
            <div>Extended bidding starts at 7:00 p.m. PT on the closing night of the auction.</div>
            <LineBreak />
            <div>All registered PWCC users in good standing can take part in Extended Bidding.</div>
            <LineBreak />
            <div>
              From 7:00 - 8:00 p.m., bids are extended for 5 minutes. Each time a new bid is placed,
              the 5-minute timer will reset.
            </div>
            <LineBreak />
            <div>
              The extended bidding timer is accelerated twice, after 8:00 p.m. and again after 8:30
              p.m.. When the first bid is placed after 8:00 p.m., the timer will reset to 2 minutes,
              and when the first bid is placed after 8:30 p.m., the timer will reset to 1 minute.
              Each time a new bid is placed, the timer will reset.
            </div>
            <LineBreak />
            <div>
              When no new bids are placed on any item, and the timer expires, the entire auction
              will end.
            </div>
            <LineBreak />
            <div>
              IMPORTANT: If any item receives a bid during the extended period, the entire auction
              extends.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is the buyer's premium?</Header>
            <LineBreak />
            <div>
              A buyer's premium equal to 20% of the winning bid amount will be added to the final
              sale price. Therefore, the price you pay for an item will be equal to your winning bid
              plus 20% of that winning bid, plus applicable taxes and shipping costs. The buyer's
              premium is not reflected in the maximum bid in the auction bidding tool.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Do I need a PWCC account to participate in the Weekly Auction?</Header>
            <LineBreak />
            <div>
              Yes. Click <a href="https://www.pwccmarketplace.com/join">here</a> to register. All
              members must provide a valid first and last name, address, email address, and phone
              number to become a member. We require that all members verify their email address and
              phone number.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is extended bidding?</Header>
            <LineBreak />
            The Weekly Auction uses an extended bidding model (patent pending) that allows you to
            participate in a fast-paced, competitive, and friendly auction-closing experience.
            Extended bidding ensures that the bidder willing to pay the most wins while closing the
            auction as quickly as possible to keep the experience secure and professional.
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How does the Weekly Auction extended bidding experience work?</Header>
            <LineBreak />
            <div>
              All registered PWCC users currently in good standing are eligible to participate in
              extended bidding. Extended bidding begins at 7:00 p.m. PT.
            </div>
            <LineBreak />
            <div>
              The first bidding window occurs from 7:00-7:30 p.m. PST. Any asset that does not
              receive a bid from 7:00-7:30 p.m. will close promptly at 7:30 p.m. Any asset still
              active after 7:30 p.m. PST will close if it does not receive a bid within 5 minutes,
              and any asset still active after 8:00 p.m. PST will close if it does not receive a bid
              within 1 minute.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Can I use a third-party sniping service in the PWCC Weekly Auction?</Header>
            <LineBreak />
            <div>
              No, we do not permit third-party sniping services, but do allow maximum bids to be
              placed throughout the course of the auction. If you place a max bid, it will also
              carry over into extended bidding as long it remains above the highest current bid. You
              may also place a max bid during extended bidding. Max bids are kept strictly
              confidential with third-party IT firewalling and encryption and additional third-party
              cybersecurity monitoring and process auditing. Maximum bids placed with PWCC leverage
              the most secure software system in the market.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What are the benefits of participating in the Weekly Auction?</Header>
            <LineBreak />
            <div>
              The Weekly Auction provides many benefits to buyers and sellers, including but not
              limited to accurate item descriptions, high-resolution images, a low $5 initial bid,
              outstanding customer service, and a trusted marketplace. Also, if you use the PWCC
              Vault, you will not pay shipping costs, and sales tax will be Oregon’s 0% rate on your
              purchases.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How can I pay for my purchases?</Header>
            <LineBreak />
            <div>
              You can pay through our website with a credit card for invoices up to $10,000. You may
              also use funds held in your PWCC account to pay for your purchases. We also accept
              wires, ACH bank transfers, checks, money orders, and various forms of cryptocurrency
              using BitPay, including Bitcoin, Bitcoin Cash, Dogecoin, Ethereum, WBTC, and stable
              coins (DAI, PAX, USDC, GUSD, and BUSD). PWCC will apply sales tax to your invoice
              based on your delivery address. Buyers may also use{' '}
              <a href="https://www.pwccmarketplace.com/capital">PWCC Capital services</a> such as an
              advance on an auction submission or a loan on their Vault portfolio. Credit cards are
              not accepted for any item purchased in the Premier Auction. Please contact us if you
              need financing assistance.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How long do I have to make payment?</Header>
            <LineBreak />
            <div>
              <b>Premier Auction</b>: Buyers should remit payment after receiving an invoice. Please
              contact us if you have an extenuating circumstance and need additional time.
            </div>
            <LineBreak />
            <div>
              <b>Weekly Auction</b>: Once you have a final invoice, please remit payment promptly
              before the stated payment deadline.
            </div>
            <LineBreak />
            <div>
              <b>Fixed Price</b>: Buyers have 10 days to remit payment after receiving an invoice.
              Items you purchase within a 72 hour time frame will be combined into a single invoice.
            </div>
          </Body>
        </Section>
      </AccordionDetails>
    </AccordionFaq>
  );
};
