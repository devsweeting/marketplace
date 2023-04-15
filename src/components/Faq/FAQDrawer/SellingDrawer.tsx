import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionFaq } from '../Faq.styles';
import { Body, Section, Title, Header, LineBreak } from '../PWCCFaq';

export const SellersDrawer = () => {
  return (
    <AccordionFaq square disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
        <Title>Selling</Title>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '600px', overflow: 'scroll' }}>
        <Section>
          <Body>
            <Header>How can I sell items on the PWCC platform?</Header>
            <LineBreak />
            <div>There are currently three ways to sell items on the PWCC platform.</div>
            <ol>
              <li>
                <b>Weekly Sunday Auction:</b> You can sell items in the PWCC Weekly Auction by
                mailing them to us by using our Submission form. You can also sell them directly
                from the PWCC Vault through our website or mobile app with the click of a button
                after you create a PWCC account and store your items in the Vault. The Submission
                Process section on our website contains more information about our Weekly Auction.
              </li>
              <LineBreak />
              <li>
                <b>Weekly Sunday Flash:</b> Submit items to the Weekly Sunday Auction that you want
                to list within 24 hours. You must submit items by Wednesday at 11:59 p.m. PT for
                them to be included in the next Sunday closing. Items must be in your Vault
                portfolio to be eligible.
              </li>
              <LineBreak />
              <li>
                <b>Fixed Price Listings:</b> After you store items in the Vault and PWCC finishes
                processing them, you can list them for sale on our Fixed Price Marketplace. You can
                decide if you want to list each item with an option that “Allows Offers” or only as
                a Fixed Price without negotiation from the buyer. Enter your Portfolio, click the
                “List Now” button, and follow the directions to list on the Fixed Price Marketplace.
              </li>
              <LineBreak />
              <li>
                <b>Premier Auction:</b> Items sold through the Premier Auction must have an
                estimated market value of at least $25,000. Any asset submitted with an estimated
                value less than $25,000 will require staff approval. You can submit items to sell in
                the Premier Auction through your PWCC Vault or you can ship your items to us. If you
                choose the shipping option, please email PWCC’s client services at{' '}
                <a>cs@pwccmarketplace.com</a>
                for shipping details.
              </li>
            </ol>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is the biggest advantage of selling my items with PWCC?</Header>
            <LineBreak />
            <div>
              PWCC offers the largest auction venue specifically targeted to trading cards worldwide
              with thousands of unique users participating in every auction. PWCC&apos;s strong
              reputation in the market causes buyers to bid with confidence. Items sold on the PWCC
              Marketplace generally garner higher sale prices when compared with prices from other
              venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases
              than selling individually.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What types of items can I submit to Auction?</Header>
            <LineBreak />
            <div>We currently accept:</div>
            <ul>
              <li>
                Authenticated Trading Cards and Small Slabbed Assets from PSA, SGC, BGS, BVG, BCCG,
                CGC, CSG
              </li>
              <li>
                Non-Authenticated (Raw) Trading Cards when using one of our Authentication Partners
              </li>
              <li>
                Authenticated coins and currency from PCGS, NGC, ANACS, PMG, PCGS Banknote, PCGS
                Currency, Legacy Currency
              </li>
              <li>Authenticated Comics from CGC, CBCS</li>
              <li>Authenticated Video Games from WATA, CGC</li>
              <li>Authenticated Oversize Slabbed Items from PSA, BGS, CGC, CBCS, WATA, VGA</li>
              <li>Authenticated Vintage Wax from BBCE, GAI, PSA & Factory Sealed Modern Wax</li>
              <li>
                Baseballs, hockey pucks, or other small-sized memorabilia authenticated by UDA,
                Steiner, or any other reputable third-party authenticator
              </li>
              <li>
                Authenticated Memorabilia from MeiGray, Resolution, Davious, RGU or any other
                reputable third party authenticator
              </li>
              <li>Authenticated Wax Cases from BBCE & Factory Sealed Wax Cases</li>
            </ul>

            <LineBreak />
            <div>We currently accept:</div>
            <ul>
              <li>
                Non-authenticated Vintage Wax Boxes or Packs, Memorabilia, Coins, Comics, or Video
                Games
              </li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is the biggest advantage of selling my items with PWCC?</Header>
            <LineBreak />
            <ul>
              <li>
                You can send any raw cards to PWCC for MBA authentication. We recommend only sending
                cards with a minimum value of $25.
              </li>
              <li>
                It costs $6 per card, which includes authentication and ingestion in the PWCC Vault.
              </li>
              <li>
                Each card will be professionally photographed (front and back) and video recorded
                for a few seconds. The video will show the front and back of the card.
              </li>

              <li>
                PWCC will send each card to MBA for authentication. The authentication process will
                confirm the authenticity of the card and include an authentication certification if
                it passes the process. Cards will not be graded, but they will be placed in a top
                loader with an MBA sticker sealing them to prevent tampering. PWCC will title each
                card and include an MBA report on its condition. PWCC will then place each card in
                your PWCC Vault where you can sell it wherever it qualifies to be sold in the PWCC
                Marketplace.
              </li>

              <li>
                You can search for MBA authenticated cards by using the filter feature on the PWCC
                website.
              </li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Why don’t I see my Weekly Auction submission in my Member Dashboard?</Header>
            <LineBreak />
            <div>
              We mark submissions as received on our clients’ accounts within two days of receiving
              a submission and send you an email notifying you that we received it. We process each
              submission, including imaging, titling, and prepping for sale. We mark your items as
              processing, which you can view in the Member Dashboard and on the mobile app. Item
              images, titles, and descriptions will be visible a minimum of two days leading up to
              the start of the Weekly Auction. We will notify you when your items are available for
              review.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do I fix an error in my listings?</Header>
            <LineBreak />
            <div>
              We will provide you an opportunity to request edits through your Member Dashboard or
              the mobile app before the Auction begins. Our Asset Control team will approve the
              request or provide you feedback.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Are there additional costs beyond the stated auction fees?</Header>
            <LineBreak />
            <div>
              For all Marketplaces, you will net precisely the sale price and your seller’s
              commission. There are small additional fees for special items like wax and
              memorabilia. Offers and asking prices on the Fixed Price Marketplace include the
              buyer&apos;s premium.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Why do PWCC-listed Auction items often sell for higher prices?</Header>
            <LineBreak />
            <div>
              Items listed through PWCC often sell for higher prices for various reasons: the
              high-resolution images that help buyers bid with confidence, the quality of offerings
              that attract more buyers, the reliable customer service and safe shipping process, the
              effective marketing that PWCC invests in to attract buyers to items for sale, and the
              trust that PWCC has earned among thousands of loyal customers through the years.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>When do auctions begin?</Header>
            <LineBreak />
            <div>
              Please review our <a href="https://www.pwccmarketplace.com/">homepage</a> to see a
              detailed schedule for our current auction and tentative start and end dates for
              upcoming auctions.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Does PWCC set a reserve for Auction items?</Header>
            <LineBreak />
            <div>
              All of the items in the Weekly Auction start with an opening bid of $5. Premier
              Auction items begin with an opening bid of $1,000.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What happens if my Weekly Auction items go unpaid or unsold?</Header>
            <LineBreak />
            <div>
              If an item goes unpaid for it will be relisted in the next Weekly Auction. If a
              submitted item fails to receive the opening $5 bid, PWCC will not charge a sales
              commission, but the item will be removed from your Vault and forfeited to PWCC to
              avoid the complexity of relisting and/or return shipping. To avoid this process, we
              encourage you to submit items that you believe will sell for $5 or more. After
              submitting an item to an Auction, it cannot be removed from the Auction process and
              will have to be relisted per our Submission terms.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What are the deadlines for submission?</Header>
            <LineBreak />
            <div>
              Our Premier Auction submission deadlines are posted on our homepage. There are no
              deadlines for the Weekly Sunday as we accept submissions on a rolling basis. Weekly
              Sunday Flash must be submitted by 11:59 p.m. PT to be included in the next Sunday
              closing.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Can I bid on my items to ensure a reserve price or to watch my items?</Header>
            <LineBreak />
            <div>
              Clients bidding on their own items is strictly prohibited as it is a violation of our{' '}
              <a href="https://www.pwccmarketplace.com/marketplace-tenets">Marketplace Tenets</a>.
              Our Marketplace software is designed to restrict bidding by a client on an item they
              submitted.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How much does shipping cost?</Header>
            <LineBreak />
            <div>
              Shipping is free for items purchased in the Premier and Weekly Auction or through our
              Fixed Price listings that are sent directly to the PWCC Vault. You also benefit from
              Oregon&apos;s 0% sales tax. If you would like items shipped directly to you, please
              read our <a href="https://www.pwccmarketplace.com/shipping-charges">shipping chart</a>{' '}
              for more information.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>I see my submission has been delivered. Do you have it?</Header>
            <LineBreak />
            <div>
              Although a package will show it as being delivered to our facility our team has to
              process the submission and record it in our database. There may be a delay of a few
              days between package delivery and the package showing up in your Vault, especially if
              it is eligible for an Eye Appeal review. You will receive an email confirmation when
              the package is successfully processed.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Does PWCC pay for my shipping when I send a submission?</Header>
            <LineBreak />
            <div>
              The cost associated with sending a submission is the responsibility of the submitter,
              but PWCC can assist with the shipping process by generating a full-insured label.
              Please contact our client services team at cs@pwccmarketplace.com for more
              information.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How should I pack my items for shipping to PWCC?</Header>
            <LineBreak />
            <div>
              You can send your package using your preferred shipping carrier. However, we recommend
              that you mail your items in a box with proper padding to protect the items. For more
              valuable items it may be advantageous to double-box them to ensure safe delivery. We
              also ask that you send the package with signature confirmation. For submissions of
              high value that are difficult to insure through standard carriers, PWCC can assist
              with a fully insured shipping label. Please contact PWCC to request a label.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What are the Premier Auction seller&apos;s fees?</Header>
            <LineBreak />
            <div>
              There is no seller&apos;s fee for the Premier Auction for cards with an estimated
              value over $25,000, but there is a buyer&apos;s premium. Sellers also receive a
              seller&apos;s commission based on the value of the item at the end of the Auction. A
              minimum of $2,000 of the price realized is always paid to PWCC on each Premier Auction
              lot.
            </div>
            <ul>
              <li>
                The hammer price refers to the maximum winning bid, excluding the 20% buyer&apos;s
                premium. If an item sells for $250,000 or lower, the seller receives 110% of the
                hammer price.
              </li>
              <li>
                If an item sells for $250,001 - $1,000,000, the seller receives 112.5% of the hammer
                price.
              </li>
              <li>
                If an item sells for $1,000,001 or higher, the seller receives 115% of the hammer
                price.
              </li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Is the auction fee calculated on the total value of my submission?</Header>
            <LineBreak />
            <div>
              Auction fees are applied based on the sale price of each individual item, and not
              based on the sum total of the submission overall.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>When will I receive payment for sold items?</Header>
            <LineBreak />
            <ul>
              <li>
                <b>Weekly Sunday/Weekly Sunday Flash:</b> After the auction has closed, buyers have
                two weeks to remit payment. PWCC processes accounting and pays sellers as quickly as
                possible thereafter. PWCC issues payments on a Tuesday as a credit to sellers&apos;
                PWCC Marketplace Accounts. Sellers can use funds for PWCC invoices or elect to have
                funds issued through a payout request made from their account. Please note client
                will need to initiate this request. PWCC does not create an automatic payout for
                clients.
              </li>
              <LineBreak />
              <li>
                <b>Fixed Price:</b> PWCC pays Fixed Price sellers within a few days after the buyer
                remits payment. The proceeds minus fees will appear in your Marketplace Account.
                After the sale has been made, we go through a collections process and buyers have 10
                days to remit payment. PWCC processes accounting and sellers are paid roughly seven
                to ten days later. Payments are issued as a credit to sellers&apos; PWCC Marketplace
                Accounts. Sellers can use funds for PWCC invoices or elect to have funds issued
                through a payout request made from their account. Please note client will need to
                initiate this request. PWCC does not create an automatic payout for clients.
              </li>
              <LineBreak />
              <li>
                <b>Premier Auction:</b> After the auction has closed, buyers have two weeks to remit
                payment. PWCC processes accounting and pays sellers about 4-5 weeks after the
                Premier Auction closes. PWCC issues payments as a credit to sellers&apos; PWCC
                Marketplace Accounts. Sellers can use funds for PWCC invoices or elect to have funds
                issued through a payout request made from their account. Clients need to initiate
                this request. PWCC does not create an automatic payout for clients.
              </li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What are Weekly Sunday Flash listings?</Header>
            <LineBreak />
            <div>
              Flash listed items join the currently active Weekly Sunday Auction in progress and end
              in accordance with that Weekly Sunday Auction. You must submit items before 11:59 p.m.
              PT on Wednesday to be included in the Weekly Sunday Auction closing on Sunday.
              Otherwise, your item will close in the following Weekly Sunday Auction.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What are the benefits of the Weekly Sunday Flash?</Header>
            <LineBreak />
            <div>
              Flash auctioning allows members maximum timeline control for the selling process. If
              you want to capitalize on an event (e.g., an NBA player winning a title), Flash allows
              you to list an item for sale immediately.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>How do I Flash my items via Weekly Sunday Auction?</Header>
            <LineBreak />
            <div>
              From your PWCC Vault, select the items you want to sell and choose the “Sell” option.
              The next screen will ask you to select the marketplace for your item (e.g., Weekly
              Sunday, Weekly Sunday Flash, Monthly Premier, or Fixed Price). Select the “Weekly
              Sunday Flash” option and follow the on-screen directions.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Can I mail items to PWCC to list in the Weekly Sunday Flash?</Header>
            <LineBreak />
            <div>
              You can only submit items from your Vault. You can mail items to your Vault and then
              list them in the Auction after we curate them.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What kind of items can I sell in the Weekly Sunday Flash?</Header>
            <LineBreak />
            <div>
              You can submit any items in your Vault that are eligible for the Weekly Sunday
              Auction.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              How long does it take for my items to appear in the Weekly Sunday Flash?
            </Header>
            <LineBreak />
            <div>
              Items appear in the Auction within 24 hours but will likely appear much sooner.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What is the Weekly Sunday Flash Auction deadline?</Header>
            <LineBreak />
            <div>
              You must submit items to the Flash by Wednesday at 11:59 p.m. PT for them to be
              included in the Sunday closing. They will appear in the Weekly Sunday Auction within
              24 hours, usually much sooner.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>When will I get paid for items sold via flash?</Header>
            <LineBreak />
            <div>
              The payment process for Flash is the same as the Weekly Sunday Auction. After the
              auction has closed, buyers have two weeks to remit payment. PWCC processes accounting
              and pays sellers as quickly as possible thereafter. PWCC issues payments on a Tuesday
              as a credit to sellers’ PWCC Marketplace Accounts. Sellers can use funds for PWCC
              invoices or elect to have funds issued through a payout request made from their
              account, which you will need to initiate. PWCC does not create an automatic payout for
              clients.
            </div>
          </Body>
        </Section>
      </AccordionDetails>
    </AccordionFaq>
  );
};
