import getList from '../../src/hooks/useGetList';
import convertCurrency from '../../src/hooks/useGetValueCurrency';

export default async function getFisheryList(_: any, res: any) {
  let response = await getList();
  let currencyValue = await convertCurrency({ from: 'IDR', to: 'USD' });

  let listFishery = response
    .filter((item: FisheryItem) => item.uuid)
    .map((item: FisheryItem) => ({
      ...item,
      usd_price: currencyValue ? Number(item.price) * currencyValue : 0,
    }));

  res.status(200).json({ list: listFishery });
}
