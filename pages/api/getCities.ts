import getAddress from '../../src/hooks/useGetAddress';

export default async function getCities(req: any, res: any) {
  let response = await getAddress({ type: 'cities', selectedProvincies: req.query.province });

  res.status(200).json({ data: response });
}
