// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

// Care Service Types
export type CareServiceType =
  | 'basic-cleaning'
  | 'deep-cleaning'
  | 'unyellowing'
  | 'repaint'
  | 'reglue'
  | 'leather-treatment';

export type CareBookingStatus =
  | 'booking-submitted'
  | 'booking-confirmed'
  | 'shoes-received'
  | 'in-progress'
  | 'quality-control'
  | 'ready'
  | 'completed';

export interface CareService {
  id: string;
  name: string;
  type: CareServiceType;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface ShoeInfo {
  brand: string;
  model: string;
  color: string;
  size: string;
  condition: string;
  notes: string;
}

export interface CareBooking {
  id: string;
  userId: string;
  shoeInfo: ShoeInfo;
  serviceType: CareServiceType;
  serviceName: string;
  servicePrice: number;
  deliveryMethod: 'pickup' | 'dropoff';
  bookingDate: string;
  status: CareBookingStatus;
  createdAt: string;
  updatedAt: string;
  address?: Address;
  notes?: string;
}

// User Types
export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  address?: Address;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  activeBookings: number;
  monthlyRevenue: { month: string; amount: number }[];
}
