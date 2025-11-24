'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/lib/data';
import { products as mockProducts } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

type ProductContextType = {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => Product;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  isLoading: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: uuidv4(),
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    return newProduct;
  };
  
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
        prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  
  const getProductById = (productId: string) => {
      return products.find(p => p.id === productId);
  }

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    isLoading,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
