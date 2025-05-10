export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage?: number;
  discountedTotal?: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}