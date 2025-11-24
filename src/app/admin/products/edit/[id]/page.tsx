'use client';
import { ProductForm } from '@/components/admin/product-form';
import { products, type Product } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const { id } = params;

    const product = products.find(p => p.id === id);

    const handleSave = (data: Omit<Product, 'id'>) => {
        // In a real app, you'd update the data source.
        // Here we just show a toast and navigate away.
        console.log('Updated product:', { id, ...data });
        toast({
            title: "Product Updated",
            description: `${data.name} has been successfully updated.`,
        });
        router.push('/admin/products');
    }
    
    if (!product) {
        return <div>Product not found.</div>
    }

    return (
        <ProductForm product={product} onSave={handleSave} />
    )
}
