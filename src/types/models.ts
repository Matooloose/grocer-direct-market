
export type UserRole = 'buyer' | 'farmer' | 'logistics' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  imageUrl?: string;
  address?: string;
  phone?: string;
  createdAt: Date;
}

export type ProductCategory = 
  | 'vegetables' 
  | 'fruits' 
  | 'dairy' 
  | 'meat' 
  | 'grains' 
  | 'herbs' 
  | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: ProductCategory;
  images: string[];
  isOrganic: boolean;
  isFeatured: boolean;
  farmer: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface Order {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  product: {
    id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
}
