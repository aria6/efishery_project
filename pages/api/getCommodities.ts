import useGetList from '../../src/hooks/useGetList';

export default async function getCommodities(req: any, res: any) {
  let response = await useGetList();

  let commodities = response
    .filter((item: FisheryItem) => item.uuid)
    .reduce((prev: Array<Option>, cur: FisheryItem) => {
      return prev.some((item: Option) => item.value === cur.komoditas)
        ? prev
        : [...prev, { value: cur.komoditas, label: cur.komoditas }];
    }, []);

  //   TODO : Use middleware instead
  res.set('Cache-Control', 'max-age=86400');
  res.status(200).json({ data: commodities });
}
