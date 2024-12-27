export interface ProductProps {
  id: string;
  category: string;
  content: string;
  description: string;
  is_enabled: 0 | 1;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  imageUrl: string;
  imagesUrl: string[];
}
