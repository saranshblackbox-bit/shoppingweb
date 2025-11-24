'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories, type Product, type Category } from '@/lib/data';
import { Search, Gem, Home, Shirt, Glasses } from 'lucide-react';

const iconMap = {
  Shirt,
  Gem,
  Home,
  Glasses,
};

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryId === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

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
          {categories.map((category) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
    </div>
  );
}
