import { fetchAPI } from '../helpers';

import { CURRCONV_API_KEY, CURRCONV_HOST } from '../constants/api';

type Props = {
  from: string;
  to: string;
};

export default async function useGetValueCurrency(props: Props) {
  let { from, to } = props;

  let fromCurrency = encodeURIComponent(from);
  let toCurrency = encodeURIComponent(to);
  let query = fromCurrency + '_' + toCurrency;

  let response = await fetchAPI(
    `${CURRCONV_HOST}/convert?q=${query}&compact=ultra&apiKey=${CURRCONV_API_KEY}`
  );

  return response[query];
}
