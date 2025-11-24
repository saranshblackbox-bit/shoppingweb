'use client';
import { ProductForm } from '@/components/admin/product-form';
import type { Product } from '@/lib/data';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function NewProductPage() {
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();

    const handleSave = async (data: Omit<Product, 'id'>) => {
        if (!firestore) return;
        
        const productsCollection = collection(firestore, 'products');
        await addDocumentNonBlocking(productsCollection, data);

        toast({
            title: "Product Created",
            description: `${data.name} has been successfully added.`,
        });

        router.push('/admin/products');
    }

    return (
        <ProductForm onSave={handleSave} />
    )
}
