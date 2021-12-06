import getList from '../../src/hooks/useGetList';

export default async function getCommodities(req: any, res: any) {
  let response = await getList();

  let commodities = response
    .filter((item: FisheryItem) => item.uuid)
    .reduce((prev: Array<Option>, cur: FisheryItem) => {
      return prev.some((item: Option) => item.value === cur.komoditas)
        ? prev
        : [...prev, { value: cur.komoditas, label: cur.komoditas }];
    }, []);

  res.status(200).json({ data: commodities });
}
