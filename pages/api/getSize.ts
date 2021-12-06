import getSizeHook from '../../src/hooks/useGetSize';

export default async function getSize(_: any, res: any) {
  let response = await getSizeHook();

  res.status(200).json({ data: response });
}
