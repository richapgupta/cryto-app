
export function ExchangeRateUI(props: { price: any; dataObj: any; currencySymbol: any; }) {
  const { price, dataObj, currencySymbol } = props;

  const toCurrency = dataObj.toCurrency;
  let value = Number(price);
  let currencyCode = toCurrency;

  let currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });

  let formattedCurrency = currency.format(value);

  return (
    <div className="exchange-rate-ui">
      <div className="card" style={{  backgroundColor: "#4d4add", color: "#fff" }}>
        <div className="card-header">
          <p>{currencySymbol}  </p>
        </div>
        <div className="card-body">
          <h2 style={{ color: "#fff" }} > {formattedCurrency} </h2>
        </div>
      </div>
    </div>
  );
}

