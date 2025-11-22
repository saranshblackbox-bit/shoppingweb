import type { LucideIcon } from 'lucide-react';
import { Gem, Home, Shirt } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { id: 'apparel', name: 'Apparel', icon: Shirt },
  { id: 'jewelry', name: 'Jewelry', icon: Gem },
  { id: 'home-decor', name: 'Home Decor', icon: Home },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageId: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Handcrafted Silk Saree',
    description: 'A beautiful Banarasi silk saree with intricate gold zari work, perfect for weddings and festive occasions.',
    price: 150.0,
    categoryId: 'apparel',
    imageId: 'saree',
    stock: 15,
  },
  {
    id: 'prod-2',
    name: 'Embroidered Men\'s Kurta',
    description: 'Elegant linen-cotton blend kurta with fine chikankari embroidery. Comfortable and stylish for any event.',
    price: 75.0,
    categoryId: 'apparel',
    imageId: 'kurta',
    stock: 30,
  },
  {
    id: 'prod-3',
    name: 'Gold Jhumka Earrings',
    description: 'Traditional 22k gold plated jhumka earrings with pearl accents. A timeless piece of Indian jewelry.',
    price: 95.0,
    categoryId: 'jewelry',
    imageId: 'earrings',
    stock: 25,
  },
  {
    id: 'prod-4',
    name: 'Kundan Necklace Set',
    description: 'Exquisite Kundan choker necklace set with matching earrings, crafted with semi-precious stones.',
    price: 220.0,
    categoryId: 'jewelry',
    imageId: 'necklace',
    stock: 10,
  },
  {
    id: 'prod-5',
    name: 'Hand-Painted Terracotta Vases',
    description: 'Set of three terracotta vases, hand-painted with traditional Warli art. A rustic charm for your home.',
    price: 45.0,
    categoryId: 'home-decor',
    imageId: 'vase',
    stock: 40,
  },
  {
    id: 'prod-6',
    name: 'Madhubani Art Wall Hanging',
    description: 'Vibrant Madhubani painting on canvas, depicting a traditional folklore scene. Adds a splash of color and culture.',
    price: 60.0,
    categoryId: 'home-decor',
    imageId: 'wall-hanging',
    stock: 22,
  },
];

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Customer';
  avatarId: string;
  registeredAt: string;
};

export const users: User[] = [
    { id: 'user-1', name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Admin', avatarId: 'admin-avatar-1', registeredAt: '2023-01-15' },
    { id: 'user-2', name: 'Rohan Mehta', email: 'rohan.mehta@example.com', role: 'Admin', avatarId: 'admin-avatar-2', registeredAt: '2023-02-20' },
    { id: 'user-3', name: 'Aarav Patel', email: 'aarav.p@example.com', role: 'Customer', avatarId: 'admin-avatar-2', registeredAt: '2023-03-05' },
    { id: 'user-4', name: 'Saanvi Gupta', email: 'saanvi.g@example.com', role: 'Customer', avatarId: 'admin-avatar-1', registeredAt: '2023-04-10' },
];

export type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
};

export const orders: Order[] = [
    { id: 'ord-001', customerName: 'Aarav Patel', customerEmail: 'aarav.p@example.com', date: '2024-05-20', total: 225.00, status: 'Delivered'},
    { id: 'ord-002', customerName: 'Saanvi Gupta', customerEmail: 'saanvi.g@example.com', date: '2024-05-22', total: 95.00, status: 'Shipped'},
    { id: 'ord-003', customerName: 'Aarav Patel', customerEmail: 'aarav.p@example.com', date: '2024-05-28', total: 60.00, status: 'Pending'},
    { id: 'ord-004', customerName: 'Saanvi Gupta', customerEmail: 'saanvi.g@example.com', date: '2024-06-01', total: 45.00, status: 'Pending'},
    { id: 'ord-005', customerName: 'Rohan Mehta', customerEmail: 'rohan.mehta@example.com', date: '2024-06-02', total: 150.00, status: 'Cancelled'},
]
