export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
  discountedTotal: number;
  quantity: number;
  total: number;
}