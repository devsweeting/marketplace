import type { NextApiRequest, NextApiResponse } from 'next';

const data = {
  items: [
    {
      category: 'selling',
      subcategory: 'selling',
      questions: [
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
      ],
    },
    {
      category: 'selling',
      questions: [
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
      ],
    },
    {
      category: 'About vault',
      questions: [
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
      ],
    },
    {
      category: 'safety',
      questions: [
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
      ],
    },
    {
      category: 'buying',
      questions: [
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
      ],
    },
    {
      category: 'How to get started?',
      questions: [
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
        {
          question: 'What is the biggest advantage of selling my items with PWCC?',
          answer:
            "PWCC offers the largest auction venue specifically targeted to trading cards worldwide with thousands of unique users participating in every auction. PWCC's strong reputation in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace generally garner higher sale prices when compared with prices from other venues. Finally, PWCC’s fees are lower than many other venues and lower in many cases than selling individually.",
        },
      ],
    },
  ],
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json(data);
};
