
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Camera, Loader2, Save } from 'lucide-react';
import { Product, ProductCategory } from '@/types/models';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Please provide a detailed description.' }),
  price: z.coerce.number().positive({ message: 'Price must be greater than 0.' }),
  quantity: z.coerce.number().int().nonnegative({ message: 'Quantity must be a positive number.' }),
  unit: z.string().min(1, { message: 'Please specify a unit (e.g., lb, kg, bunch).' }),
  category: z.string(),
  isOrganic: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

interface AddProductFormProps {
  onSubmit: (product: Product) => void;
  existingProduct?: Product | null;
  onCancel?: () => void;
}

const AddProductForm = ({ onSubmit, existingProduct, onCancel }: AddProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>(
    existingProduct?.images || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingProduct?.name || '',
      description: existingProduct?.description || '',
      price: existingProduct?.price || 0,
      quantity: existingProduct?.quantity || 0,
      unit: existingProduct?.unit || 'lb',
      category: existingProduct?.category || 'vegetables',
      isOrganic: existingProduct?.isOrganic || false,
      isFeatured: existingProduct?.isFeatured || false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProductImages([...productImages, imageUrl]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Create the product object with required fields
    const product: Product = {
      id: existingProduct?.id || `prod-${Date.now()}`,
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      unit: values.unit,
      category: values.category as ProductCategory,
      isOrganic: values.isOrganic,
      isFeatured: values.isFeatured,
      images: productImages.length > 0 ? productImages : ['https://images.unsplash.com/photo-1621954281845-b5e80a28a209?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'],
      farmer: existingProduct?.farmer || {
        id: 'f1',
        name: 'Green Valley Farm',
        location: 'Riverside County, CA',
        rating: 4.8,
      },
      createdAt: existingProduct?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(product);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="mb-6">
          <FormLabel>Product Images</FormLabel>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {productImages.map((img, index) => (
              <div 
                key={index} 
                className="h-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50"
              >
                <img src={img} alt={`Product ${index}`} className="h-full w-full object-cover" />
              </div>
            ))}
            
            <div className="h-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center relative">
              <Camera className="h-6 w-6 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload up to 5 images. First image will be the featured image.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your product in detail" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide information about growing practices, taste, and usage suggestions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <Input type="number" step="0.01" min="0" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Available</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="oz">Ounce (oz)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="each">Each</SelectItem>
                    <SelectItem value="bunch">Bunch</SelectItem>
                    <SelectItem value="basket">Basket</SelectItem>
                    <SelectItem value="dozen">Dozen</SelectItem>
                    <SelectItem value="pint">Pint</SelectItem>
                    <SelectItem value="quart">Quart</SelectItem>
                    <SelectItem value="gallon">Gallon</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="isOrganic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Organic</FormLabel>
                  <FormDescription>
                    This product is grown using organic farming practices.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured Product</FormLabel>
                  <FormDescription>
                    Feature this product prominently in the marketplace.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {existingProduct ? 'Update Product' : 'Add Product'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
