import getList from '../../src/hooks/useGetList';
import convertCurrency from '../../src/hooks/useGetValueCurrency';

export default async function getFisheryList(req: any, res: any) {
  let response = await getList();
  let currencyValue = await convertCurrency({ from: 'IDR', to: 'USD' });

  let province = req.query.province;
  let city = req.query.city;
  let commodity = req.query.commodity;
  let size = req.query.size;

  let listFishery = response
    .filter((item: FisheryItem) => item.uuid)
    .filter((item: FisheryItem) =>
      province ? province === item.area_provinsi : true
    )
    .filter((item: FisheryItem) => (city ? city === item.area_kota : true))
    .filter((item: FisheryItem) =>
      commodity ? commodity === item.komoditas : true
    )
    .filter((item: FisheryItem) => (size ? size === item.size : true))
    .map((item: FisheryItem) => ({
      ...item,
      usd_price: currencyValue ? Number(item.price) * currencyValue : 0,
    }));

  res.status(200).json({ list: listFishery });
}
