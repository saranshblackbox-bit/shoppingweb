'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, type Product } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  categoryId: z.string().min(1, 'Category is required'),
  imageId: z.string().min(1, 'Image is required'),
  stock: z.coerce.number().int().min(0, 'Stock must be a positive integer'),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductFormProps = {
  product?: Omit<Product, 'id'>;
  onSave: (data: ProductFormData) => void;
};

export function ProductForm({ product, onSave }: ProductFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
        ...product,
        stock: product.stock ?? 0,
    } : {
        price: 0,
        stock: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} />
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" {...register('price')} />
              {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" {...register('stock')} />
              {errors.stock && <p className="text-destructive text-sm">{errors.stock.message}</p>}
            </div>
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="categoryId">Category</Label>
                <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                )}
                />
                {errors.categoryId && <p className="text-destructive text-sm">{errors.categoryId.message}</p>}
            </div>
             <div className="grid gap-2">
                <Label htmlFor="imageId">Product Image</Label>
                 <Controller
                    name="imageId"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an image" />
                        </SelectTrigger>
                        <SelectContent>
                            {PlaceHolderImages.map((image) => (
                            <SelectItem key={image.id} value={image.id}>
                                {image.description}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                    />
                {errors.imageId && <p className="text-destructive text-sm">{errors.imageId.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Product'}
            </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
