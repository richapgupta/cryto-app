import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { ExchangeRateUI } from "./ExchangeRateUI";
import { cryptocurrencies, fiatCurrencies } from "./currencies";
import { getExchangeRate } from "./fetchData/fetchData";

function ExchangeRate() {
  const [fromCurrency, setFromCurrency] = useState(cryptocurrencies[0].value);
  const [toCurrency, setToCurrency] = useState(fiatCurrencies[0].value);
  const [currencySymbol, setCurrencySymbol] = useState("Bitcoin");

  const handleFromCurrencyChange = (e: any) => {
    const indexOfSeletedItem = cryptocurrencies.findIndex((crypto) => crypto.value === e.target.value);
    console.log("Index of indexOfSeletedItem:", indexOfSeletedItem);
    setFromCurrency(cryptocurrencies[indexOfSeletedItem].value);
  };

  const handleToCurrencyChange = (e: any) => {
    const indexOfSelectedItem = fiatCurrencies.findIndex((crypto) => crypto.value === e.target.value);
    setToCurrency(fiatCurrencies[indexOfSelectedItem].value);
  };


  useEffect(() => {
    const fromCurrencyLabel = cryptocurrencies.find(currency => currency.value === fromCurrency)?.label;
    const indexOfSelectedItem = cryptocurrencies.findIndex((crypto) => crypto.label === fromCurrencyLabel);
    setCurrencySymbol(cryptocurrencies[indexOfSelectedItem].label);
  }, [fromCurrency]);

  const dependencies = {
    fromCurrency: fromCurrency,
    toCurrency: toCurrency
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["exchangeRate", dependencies],
    queryFn: () => getExchangeRate(fromCurrency, toCurrency),
    staleTime: 1000 * 60,
    retry: 1,
    retryDelay: 60000
  });


  return (
    <div>
      <h1 style={{ color: "#4d4add" }}>Exchange Rate</h1>
      <p> Get the latest exchange rate of cryptocurrencies in your favorite
        currency</p>

      <section style={{ display: "flex", marginTop: "1rem", gap: "1rem", justifyContent: "space-around" }}>
        <select className="form-select" value={fromCurrency} onChange={handleFromCurrencyChange} >
        {cryptocurrencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>

        <select className="form-select" value={toCurrency} onChange={handleToCurrencyChange}>
        {fiatCurrencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>

      </section>
      <br />
      <section style={{ marginTop: '1rem' }}>
        {isLoading ? (
          < div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
            </div>
        ) : isError ? (
            <div>
              Error : {}
            </div>
        ) : (
          <div>

                <div>
                  <ExchangeRateUI
                    price={data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}
                    dataObj={dependencies}
                    currencySymbol={currencySymbol} />
                </div>
          </div>
        )}
      </section>

    </div>
  )
}

export default ExchangeRate;
