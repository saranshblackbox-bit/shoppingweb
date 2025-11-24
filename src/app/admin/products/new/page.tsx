'use client';
import { ProductForm } from '@/components/admin/product-form';
import type { Product } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function NewProductPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSave = (data: Omit<Product, 'id'>) => {
        // In a real app, you'd save this to a data source.
        // Here we just log it, show a toast, and navigate.
        console.log('New product:', data);
        toast({
            title: "Product Created",
            description: `${data.name} has been successfully added.`,
        });
        router.push('/admin/products?role=admin');
    }

    return (
        <ProductForm onSave={handleSave} />
    )
}
