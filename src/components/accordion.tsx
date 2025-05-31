import { useState } from "react";

const data = [
  {
    id: 1,
    q: "What is a cryptocurrency exchange?",
    a: "Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. The Binance exchange is the largest crypto exchange by trade volume.",
  },
  {
    id: 2,
    q: "What products does Binance provide?",
    a: "Binance is the world's leading cryptocurrency exchange, catering to 235 million registered users in over 180 countries. With low fees and over 350 cryptocurrencies to trade, Binance is the preferred exchange to trade Bitcoin, Altcoins, and other virtual assets.",
  },
  {
    id: 3,
    q: "How to buy Bitcoin and other cryptocurrencies on Binance",
    a: "There are several ways to buy cryptocurrencies on Binance. You can use a credit/debit card, cash balance, or Apple Pay/Google Pay to purchase crypto on Binance. Before getting started, please make sure you’ve completed Identity Verification for your Binance account.",
  },
  {
    id: 4,
    q: "How to track cryptocurrency prices",
    a: "The easiest way to track the latest cryptocurrency prices, trading volumes, trending altcoins, and market cap is the Binance Cryptocurrency Directory. Click on the coins to know historical coin prices, 24-hour trading volume, and the price of cryptocurrencies like Bitcoin, Ethereum, BNB and others in real-time.",
  },
  {
    id: 5,
    q: "How to trade cryptocurrencies on Binance",
    a: "You can trade hundreds of cryptocurrencies on Binance via the Spot, Margin, Futures, and Options markets. To begin trading, users need to register an account, complete identity verification, buy/deposit crypto, and start trading.",
  },
  {
    id: 6,
    q: "How to earn from crypto on Binance",
    a: "Users can earn rewards on more than 180+ cryptocurrencies by using one of the products offered on Binance Earn. Our platform offers dozens of digital assets like Bitcoin, Ethereum, and stablecoins.",
  },
];

const Accordion = () => {
  const [accordionData, setAccordionData] = useState(data);
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="space-y-4 mt-8">
      {accordionData.map(({ id, q, a }) => (
        <div key={id} className="border rounded-lg overflow-hidden">
          <button
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            onClick={() => toggleAccordion(id)}
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-500">{id}</span>
              <span className="text-left font-medium">{q}</span>
            </div>
            <span className="text-xl">{activeId === id ? "-" : "+"}</span>
          </button>

          {activeId === id && (
            <div className="p-4 bg-white">
              <p className="text-gray-600">{a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
