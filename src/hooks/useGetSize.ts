import { fetchAPI } from '../helpers';

type Size = { size: string };

export default async function useGetSize() {
  let response = await fetchAPI(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size'
  );

  return response.map((item: Size) => ({ value: item.size, label: item.size }));
}
