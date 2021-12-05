import { fetchAPI } from '../helpers';

type Address = {
  province: string;
  city: string;
};

type Options = Array<Option>;

type Props = {
  type: 'provincies' | 'cities';
  selectedProvincies?: string;
};

async function useGetAddress({ type, selectedProvincies = '' }: Props) {
  let response = await fetchAPI(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area'
  );

  if (type === 'provincies') {
    return response.reduce((prev: Options, curr: Address) => {
      return prev.some((item) => item.value === curr.province)
        ? prev
        : [...prev, { value: curr.province, label: curr.province }];
    }, []);
  }

  if (type === 'cities') {
    return response
      .filter((item: Address) => item.province === selectedProvincies)
      .reduce((prev: Options, curr: Address) => {
        return prev.some((item) => item.value === curr.city)
          ? prev
          : [...prev, { value: curr.city, label: curr.city }];
      }, []);
  }

  return [];
}

export default useGetAddress;
