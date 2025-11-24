'use client';

import { useState } from 'react';
import { useFirestore, setDocumentNonBlocking } from '@/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { products, categories } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function SeedPage() {
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Idle');

  const seedDatabase = async () => {
    if (!firestore) {
      setStatus('Firestore not initialized');
      return;
    }

    setLoading(true);
    setStatus('Seeding...');

    try {
      const batch = writeBatch(firestore);

      // Seed categories
      const categoriesCollection = collection(firestore, 'categories');
      categories.forEach((category) => {
        const { icon, ...categoryData } = category;
        const categoryRef = doc(categoriesCollection, category.id);
        batch.set(categoryRef, categoryData);
      });

      // Seed products
      const productsCollection = collection(firestore, 'products');
      products.forEach((product) => {
        const productRef = doc(productsCollection, product.id);
        batch.set(productRef, product);
      });

      await batch.commit();
      setStatus('Successfully seeded database!');
    } catch (error) {
      console.error('Error seeding database: ', error);
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Seed Firestore Database</h1>
      <p className="mb-4">
        Click the button below to populate the Firestore database with initial
        product and category data. You only need to do this once.
      </p>
      <Button onClick={seedDatabase} disabled={loading}>
        {loading ? 'Seeding...' : 'Seed Database'}
      </Button>
      <p className="mt-4">Status: {status}</p>
    </div>
  );
}
