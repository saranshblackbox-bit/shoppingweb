'use client';
import { ProductForm } from '@/components/admin/product-form';
import type { Product } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/context/product-context';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const { id } = params;
    const { getProductById, updateProduct } = useProducts();

    const product = getProductById(id);

    const handleSave = (data: Omit<Product, 'id'>) => {
        updateProduct({ id, ...data });
        toast({
            title: "Product Updated",
            description: `${data.name} has been successfully updated.`,
        });
        router.push('/admin/products?role=admin');
    }
    
    if (!product) {
        return <div>Product not found.</div>
    }

    return (
        <ProductForm product={product} onSave={handleSave} />
    )
}
