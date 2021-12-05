import useGetAddress from '../../src/hooks/useGetAddress';

export default async function getCities(req: any, res: any) {
  let response = await useGetAddress({ type: 'cities', selectedProvincies: req.query.province });

  //   TODO : Use middleware instead
  res.set('Cache-Control', 'max-age=86400');
  res.status(200).json({ data: response });
}
