type ObjectKey<T = any> = { [key: string]: T };
type Option = { value: string; label: string };

type FisheryItem = {
  uuid: string;
  komoditas: string;
  area_provinsi: string;
  area_kota: string;
  size: string;
  price: string;
  tgl_parsed?: Date;
  timestamp: string;
  usd_price?: string;
};
