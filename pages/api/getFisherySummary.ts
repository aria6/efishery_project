import getList from '../../src/hooks/useGetList';

type MinAndMaxData = {
  maxPrice: 0;
  minPrice: 0;
  maxSize: 0;
  minSize: 0;
};

type PercentilParams = 'size' | 'price';

export default async function getFisherySummary(req: any, res: any) {
  let response = await getList();
  let listFishery = response.filter((item: FisheryItem) => item.uuid);

  let province = req.query.province;
  let city = req.query.city;
  let commodity = req.query.commodity;
  let percentileParams: PercentilParams = req.query.percentile_param || 'size';

  let filteredList = listFishery
    .filter((item: FisheryItem) =>
      province ? province === item.area_provinsi : true
    )
    .filter((item: FisheryItem) => (city ? city === item.area_kota : true))
    .filter((item: FisheryItem) =>
      commodity ? commodity === item.komoditas : true
    );

  let percentileData = filteredList
    .map((item: FisheryItem) => Number(item[percentileParams]))
    .sort((a: number, b: number) => a - b);

  let percentile = Array.from({ length: 99 }, (_, i) => 1 + i).map(
    (p: number) => {
      let index = (p * (percentileData.length + 1)) / 100;
      let intIndex = Math.trunc(index);
      let floatIndex = Number(index - intIndex).toFixed(2);

      let curIndex = intIndex <= 0 ? 0 : intIndex - 1;
      let nextIndex =
        intIndex >= percentileData.length
          ? percentileData.length - 1
          : intIndex;

      return (
        percentileData[curIndex] +
        Number(floatIndex) *
          (percentileData[nextIndex] - percentileData[curIndex])
      );
    }
  );

  let minAndMaxData = filteredList.reduce(
    (prev: MinAndMaxData, cur: FisheryItem) => {
      return {
        maxPrice:
          prev.maxPrice > Number(cur.price) ? prev.maxPrice : Number(cur.price),
        minPrice:
          prev.minPrice < Number(cur.price) ? prev.minPrice : Number(cur.price),
        maxSize:
          prev.maxSize > Number(cur.size) ? prev.maxSize : Number(cur.size),
        minSize:
          prev.minSize < Number(cur.size) ? prev.minSize : Number(cur.size),
      };
    },
    {
      maxPrice: 0,
      minPrice: 0,
      maxSize: 0,
      minSize: 0,
    }
  );

  res.status(200).json({
    ...minAndMaxData,
    totalData: filteredList.length,
    percentile,
    percentileLength: percentileData.length,
  });
}
