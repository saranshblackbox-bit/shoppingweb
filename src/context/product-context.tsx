'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

const getInitialProducts = (): Product[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const item = window.localStorage.getItem('products');
        // If no item in localStorage, initialize with mock data
        if (item === null) {
            window.localStorage.setItem('products', JSON.stringify(mockProducts));
            return mockProducts;
        }
        return item ? JSON.parse(item) : mockProducts;
    } catch (error) {
        console.warn(`Error reading localStorage key “products”:`, error);
        return mockProducts;
    }
};


export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(getInitialProducts());
    setIsLoading(false);
  }, []);

  useEffect(() => {
     if (typeof window !== 'undefined' && !isLoading) {
        try {
            window.localStorage.setItem('products', JSON.stringify(products));
        } catch (error) {
            console.warn(`Error setting localStorage key “products”:`, error);
        }
    }
  }, [products, isLoading]);

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
      // Since products are now loaded in an effect, we need to find from the state
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
