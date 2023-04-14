import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionFaq } from '../Faq.styles';
import { Body, Section, Title, Header, LineBreak } from '../PWCCFaq';

export const ShippingDrawer = () => {
  return (
    <AccordionFaq square disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreRounded color="primary" />}>
        <Title>Shipping</Title>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '600px', overflow: 'scroll' }}>
        <Section>
          <Body>
            <Header>What can I expect when shipping items from the Vault?</Header>
            <LineBreak />
            <div>
              PWCC clients can expect all fulfillments to be pulled and packed within 1-2 business
              days after they pay the fulfillment invoice. PWCC packs all items with care to ensure
              they arrive in the same shape as their listing. PWCC ships items using either FedEx or
              USPS depending on the size, weight, value, and destination of any given shipment. All
              options are estimates and are subject to change. Final prices are posted on the
              shipping invoice.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Shipping Standards (Domestic)</Header>
            <LineBreak />
            <div>
              All items/shipments mailed by PWCC will include their full insurance value to comply
              with PWCC’s insurance policy.
            </div>
            <LineBreak />
            <div>
              <b>Small Packages (12 standard-sized cards or less):</b>
            </div>
            <LineBreak />
            <ul>
              <li>
                Insured Value: $1 to $749
                <ul>
                  <li>Shipped via USPS (no signature required)</li>
                </ul>
              </li>
            </ul>

            <ul>
              <li>
                Insured Value: $750-$999
                <ul>
                  <li>Shipped via USPS (signature required)</li>
                </ul>
              </li>
            </ul>

            <ul>
              <li>
                Insured Value: $1,000+
                <ul>
                  <li>Shipped Via FedEx (signature required), unless shipped to a PO Box</li>
                </ul>
              </li>
            </ul>

            <ul>
              <li>
                Insured Value: $10,000+ for PO Boxes
                <ul>
                  <li>Shipped via USPS Registered Mail (signature required)</li>
                </ul>
              </li>
            </ul>

            <ul>
              <li>
                Insured Value: $17,000+
                <ul>
                  <li>Shipped via FedEx priority overnight (signature required)</li>
                </ul>
              </li>
            </ul>

            <LineBreak />
            <div>
              <b>Larger Packages (12+ cards and all wax boxes):</b>
            </div>

            <ul>
              <li>
                All larger packages of 12 cards or more, memorabilia, or any package containing one
                or more wax boxes will be shipped via FedEx unless the address provided for the
                shipment is a PO Box.
              </li>
              <li>
                All larger packages with insurance values over $750 will have signature
                requirements, but size and total weight of the package may affect the expediency of
                delivery.
              </li>
            </ul>

            <LineBreak />
            <div>
              <b>Shipping Standards (International)</b>
            </div>
            <ul>
              <li>
                For international shipments, PWCC primarily uses FedEx and highly recommends
                international clients set their mailing address to an address FedEx can deliver to
                (non PO Box address).
              </li>
              <li>
                All the couriers PWCC employs require that addresses use English characters. Please
                ensure you write your mailing address in English to simplify your shipping process.
              </li>
              <li>
                Please update your contact information in case a courier needs to contact you
                regarding any potential issues regarding your shipment.
              </li>
              <li>International shipments valued over $300 USD require a signature.</li>
              <li>
                The size and weight of a given shipment may affect the timeframe for international
                delivery.
              </li>
              <li>Taxes and/or duties may apply to international shipments.</li>
              <li>
                All items/shipments mailed by PWCC will be listed for their full insurance value to
                comply with our insurance policy.
              </li>
            </ul>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>
              Can my items be held by PWCC if I will not be available on their current delivery
              date?
            </Header>
            <LineBreak />
            <div>
              PWCC does not have the capacity to hold onto shipments following a payment. After a
              purchase and payment, PWCC ships items within 1-2 business days.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>What happens if there is an issue delivering my package?</Header>
            <LineBreak />
            <div>
              If for any reason a delivery service is unable to deliver your package, your package
              will be returned to sender per FedEx and USPS policy. Clients will need to make
              arrangements with PWCC to have their shipment resent. Additional shipping charges will
              apply.
            </div>
          </Body>
        </Section>

        <Section>
          <Body>
            <Header>Shipping Chart</Header>
            <LineBreak />
            <div>For more information, we invite you to review PWCC’s shipping charges.</div>
            <LineBreak />
            <div>
              <a href="https://www.pwccmarketplace.com/shipping-charges">
                https://www.pwccmarketplace.com/shipping-charges
              </a>
            </div>
          </Body>
        </Section>
      </AccordionDetails>
    </AccordionFaq>
  );
};
