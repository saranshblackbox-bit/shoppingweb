'use client';

import { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Product, Category } from '@/lib/data';
import { Search, Gem, Home, Shirt, Glasses } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const iconMap = {
  Shirt,
  Gem,
  Home,
  Glasses,
};

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const firestore = useFirestore();

  const categoriesCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'categories') : null),
    [firestore]
  );
  const { data: categories, isLoading: isLoadingCategories } = useCollection<Category>(categoriesCollection);

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;

    let q = collection(firestore, 'products');

    if (selectedCategory) {
      return query(q, where('categoryId', '==', selectedCategory));
    }

    return q;
  }, [firestore, selectedCategory]);

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (searchTerm) {
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return products;
  }, [products, searchTerm]);


  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight sm:text-5xl">
          Discover Our Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore authentic, handcrafted Indian products for every occasion.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <Button
            variant={selectedCategory === null ? 'secondary' : 'ghost'}
            onClick={() => handleCategoryClick(null)}
          >
            All
          </Button>
          {categories && categories.map((category) => {
            const Icon = iconMap[category.iconName as keyof typeof iconMap];
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                onClick={() => handleCategoryClick(category.id)}
              >
                {Icon && <Icon className="mr-2 h-4 w-4 text-accent" />}
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
      {isLoadingProducts || isLoadingCategories ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <div className="h-[225px] w-full rounded-xl bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-[250px] bg-muted animate-pulse rounded-md" />
                <div className="h-4 w-[200px] bg-muted animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
