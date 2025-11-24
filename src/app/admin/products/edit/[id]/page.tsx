'use client';
import { ProductForm } from '@/components/admin/product-form';
import type { Product } from '@/lib/data';
import { useFirestore, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();
    const { id } = params;

    const productDocRef = useMemoFirebase(
        () => (firestore ? doc(firestore, 'products', id) : null),
        [firestore, id]
    );
    const { data: product, isLoading } = useDoc<Product>(productDocRef);

    const handleSave = async (data: Omit<Product, 'id'>) => {
        if (!firestore || !product) return;
        
        const docRef = doc(firestore, 'products', product.id);
        await setDocumentNonBlocking(docRef, data, { merge: true });

        toast({
            title: "Product Updated",
            description: `${data.name} has been successfully updated.`,
        });

        router.push('/admin/products');
    }
    
    if (isLoading) {
        return <div>Loading product...</div>
    }

    if (!product) {
        return <div>Product not found.</div>
    }

    return (
        <ProductForm product={product} onSave={handleSave} />
    )
}
