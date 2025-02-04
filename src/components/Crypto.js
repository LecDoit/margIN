import React, { useState, useEffect } from "react";

const API_KEY = "ercrr9r41lv7unre1fmx"; // Replace this with your actual API key
// const API_URL = "https://cors-anywhere.herokuapp.com/https://freecryptoapi.com/api/v1/cryptocurrency/list";
const API_URL = "https://freecryptoapi.com/api/v1/cryptocurrency/list";

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCryptoData(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      <ul>
        {cryptoData.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol}): ${coin.price_usd}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crypto;
