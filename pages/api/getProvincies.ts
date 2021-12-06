import getAddress from '../../src/hooks/useGetAddress';

export default async function getProvincies(req: any, res: any) {
  let response = await getAddress({ type: 'provincies' });

  res.status(200).json({ data: response });
}
