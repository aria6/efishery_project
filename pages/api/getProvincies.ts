import useGetAddress from '../../src/hooks/useGetAddress';

export default async function getProvincies(req: any, res: any) {
  let response = await useGetAddress({ type: 'provincies' });

  //   TODO : Use middleware instead
  res.set('Cache-Control', 'max-age=86400');
  res.status(200).json({ data: response });
}
