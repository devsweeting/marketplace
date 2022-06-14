import type { NextApiRequest, NextApiResponse } from 'next';

const data = {
  items: [
    {
      category: 'selling',
      name: 'Selling',
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
      category: 'about-vault',
      name: 'About vault',
      questions: [
        {
          question: 'Vault: What is the biggest advantage of selling my items with PWCC?',
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
      name: 'Safety',
      questions: [
        {
          question: 'Safety: What is the biggest advantage of selling my items with PWCC?',
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
      name: 'Buying',
      questions: [
        {
          question: 'Buying: What is the biggest advantage of selling my items with PWCC?',
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
      category: 'how-to-get-started',
      name: 'How to get started?',
      questions: [
        {
          question: 'Get started: What is the biggest advantage of selling my items with PWCC?',
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

const apiData = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json(data);
};

export default apiData;
