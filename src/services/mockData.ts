
import { Product, User, Order, CartItem, Review } from '@/types/models';

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Fresh Broccoli',
    description: 'Locally grown organic broccoli harvested within the last 24 hours. Rich in vitamins and antioxidants.',
    price: 3.99,
    quantity: 50,
    unit: 'lb',
    category: 'vegetables',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: true,
    isFeatured: true,
    farmer: {
      id: '101',
      name: 'Green Valley Farms',
      location: 'Portland, OR',
      rating: 4.8,
    },
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    description: 'Sweet and juicy strawberries picked at peak ripeness. Perfect for desserts or eating fresh.',
    price: 4.99,
    quantity: 30,
    unit: 'basket',
    category: 'fruits',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: true,
    isFeatured: true,
    farmer: {
      id: '102',
      name: 'Berry Good Farms',
      location: 'Salem, OR',
      rating: 4.7,
    },
    createdAt: new Date('2024-04-03'),
    updatedAt: new Date('2024-04-04'),
  },
  {
    id: '3',
    name: 'Farm Fresh Eggs',
    description: 'Free-range eggs from pasture-raised hens. Rich yellow yolks and superior flavor.',
    price: 5.99,
    quantity: 40,
    unit: 'dozen',
    category: 'dairy',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: true,
    isFeatured: false,
    farmer: {
      id: '103',
      name: 'Happy Hen Farm',
      location: 'Eugene, OR',
      rating: 4.9,
    },
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-04-02'),
  },
  {
    id: '4',
    name: 'Grass-fed Ground Beef',
    description: 'Premium ground beef from grass-fed, pasture-raised cattle. No hormones or antibiotics.',
    price: 7.99,
    quantity: 25,
    unit: 'lb',
    category: 'meat',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: false,
    isFeatured: true,
    farmer: {
      id: '104',
      name: 'Green Pastures Ranch',
      location: 'Bend, OR',
      rating: 4.6,
    },
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-03'),
  },
  {
    id: '5',
    name: 'Organic Carrots',
    description: 'Sweet and crunchy organic carrots. Great for snacking, cooking, or juicing.',
    price: 2.99,
    quantity: 60,
    unit: 'lb',
    category: 'vegetables',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: true,
    isFeatured: false,
    farmer: {
      id: '101',
      name: 'Green Valley Farms',
      location: 'Portland, OR',
      rating: 4.8,
    },
    createdAt: new Date('2024-04-04'),
    updatedAt: new Date('2024-04-04'),
  },
  {
    id: '6',
    name: 'Artisanal Goat Cheese',
    description: 'Creamy, tangy goat cheese made in small batches from our own goat milk.',
    price: 6.99,
    quantity: 20,
    unit: '8 oz',
    category: 'dairy',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: false,
    isFeatured: true,
    farmer: {
      id: '105',
      name: 'Mountain Goat Dairy',
      location: 'Ashland, OR',
      rating: 4.9,
    },
    createdAt: new Date('2024-03-30'),
    updatedAt: new Date('2024-03-30'),
  },
  {
    id: '7',
    name: 'Organic Apples',
    description: 'Crisp and sweet organic apples. Perfect for snacking or baking.',
    price: 3.49,
    quantity: 45,
    unit: 'lb',
    category: 'fruits',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: true,
    isFeatured: false,
    farmer: {
      id: '106',
      name: 'Orchard Hills',
      location: 'Hood River, OR',
      rating: 4.7,
    },
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-04-02'),
  },
  {
    id: '8',
    name: 'Heirloom Tomatoes',
    description: 'Colorful mix of heirloom tomato varieties. Each has its unique flavor and texture.',
    price: 4.99,
    quantity: 35,
    unit: 'lb',
    category: 'vegetables',
    images: ['/placeholder.svg', '/placeholder.svg'],
    isOrganic: true,
    isFeatured: true,
    farmer: {
      id: '101',
      name: 'Green Valley Farms',
      location: 'Portland, OR',
      rating: 4.8,
    },
    createdAt: new Date('2024-04-03'),
    updatedAt: new Date('2024-04-03'),
  },
];

// Mock User Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Buyer',
    email: 'john@example.com',
    role: 'buyer',
    isVerified: true,
    imageUrl: '/placeholder.svg',
    address: '123 Main St, Portland, OR',
    phone: '555-123-4567',
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '2',
    name: 'Sarah Farmer',
    email: 'sarah@greenvalley.com',
    role: 'farmer',
    isVerified: true,
    imageUrl: '/placeholder.svg',
    address: '456 Farm Road, Portland, OR',
    phone: '555-987-6543',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    name: 'Mike Admin',
    email: 'mike@grocerdirect.com',
    role: 'admin',
    isVerified: true,
    imageUrl: '/placeholder.svg',
    address: '789 Office Blvd, Portland, OR',
    phone: '555-456-7890',
    createdAt: new Date('2024-01-10'),
  },
];

// Mock Cart Items
export const mockCartItems: CartItem[] = [
  {
    id: '1',
    product: mockProducts[0],
    quantity: 2,
  },
  {
    id: '2',
    product: mockProducts[2],
    quantity: 1,
  },
  {
    id: '3',
    product: mockProducts[5],
    quantity: 3,
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'John Buyer',
      email: 'john@example.com',
    },
    items: [
      {
        id: '1',
        product: mockProducts[0],
        quantity: 2,
      },
      {
        id: '2',
        product: mockProducts[3],
        quantity: 1,
      },
    ],
    total: 19.97,
    status: 'delivered',
    shippingAddress: '123 Main St, Portland, OR',
    paymentMethod: 'Credit Card',
    paymentStatus: 'completed',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-22'),
  },
  {
    id: '2',
    user: {
      id: '1',
      name: 'John Buyer',
      email: 'john@example.com',
    },
    items: [
      {
        id: '3',
        product: mockProducts[1],
        quantity: 2,
      },
      {
        id: '4',
        product: mockProducts[4],
        quantity: 3,
      },
    ],
    total: 18.95,
    status: 'processing',
    shippingAddress: '123 Main St, Portland, OR',
    paymentMethod: 'PayPal',
    paymentStatus: 'completed',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05'),
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'John Buyer',
      imageUrl: '/placeholder.svg',
    },
    product: {
      id: '1',
      name: 'Organic Fresh Broccoli',
    },
    rating: 5,
    comment: 'Extremely fresh and delicious! Will definitely order again.',
    createdAt: new Date('2024-03-25'),
  },
  {
    id: '2',
    user: {
      id: '1',
      name: 'John Buyer',
      imageUrl: '/placeholder.svg',
    },
    product: {
      id: '3',
      name: 'Farm Fresh Eggs',
    },
    rating: 5,
    comment: 'These eggs are amazing. The yolks are so orange and flavorful!',
    createdAt: new Date('2024-03-28'),
  },
];

// Simple service functions to retrieve mock data
export const getProducts = (category?: string, search?: string) => {
  let filteredProducts = mockProducts;
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower) ||
      product.farmer.name.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredProducts;
};

export const getProductById = (id: string) => {
  return mockProducts.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return mockProducts.filter(product => product.isFeatured);
};

export const getProductReviews = (productId: string) => {
  return mockReviews.filter(review => review.product.id === productId);
};

export const getCartItems = () => {
  return mockCartItems;
};

export const getCartTotal = () => {
  return mockCartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const getOrders = () => {
  return mockOrders;
};
