import axios from 'axios';

export function getExchangeRate(fromCurrency: any, toCurrency: any) {

  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      from_currency: fromCurrency,
      function: 'CURRENCY_EXCHANGE_RATE',
      to_currency: toCurrency
    },
    headers: {
      'X-RapidAPI-Key': 'fc7b4be1aamshd911c26a4b044b2p15297bjsn9b460f79437a',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };

  return axios.request(options)
    .then(res => { return res.data; })
    .catch((err) => { return err; })
}






