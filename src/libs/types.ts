export type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city: string;
  state_province: string;
  postcode: string;
  country: string;
  website_url?: string;
  phone?: string;
  longitude?: number;
  latitude?: number;
};
