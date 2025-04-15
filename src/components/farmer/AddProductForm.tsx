
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, ProductCategory } from '@/types/models';
import { Camera, Plus, X, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  quantity: z.coerce.number().int().nonnegative({ message: 'Quantity must be a non-negative integer.' }),
  unit: z.string().min(1, { message: 'Unit is required.' }),
  category: z.string() as z.ZodType<ProductCategory>,
  isOrganic: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

interface AddProductFormProps {
  onSubmit: (product: Product) => void;
  existingProduct?: Product | null;
  onCancel: () => void;
}

const AddProductForm = ({ onSubmit, existingProduct, onCancel }: AddProductFormProps) => {
  const [images, setImages] = useState<string[]>(existingProduct?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: existingProduct ? {
      name: existingProduct.name,
      description: existingProduct.description,
      price: existingProduct.price,
      quantity: existingProduct.quantity,
      unit: existingProduct.unit,
      category: existingProduct.category,
      isOrganic: existingProduct.isOrganic,
      isFeatured: existingProduct.isFeatured,
    } : {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      unit: 'each',
      category: 'vegetables',
      isOrganic: false,
      isFeatured: false,
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newProduct: Product = {
        id: existingProduct?.id || Math.random().toString(36).substr(2, 9),
        ...values,
        images: images,
        farmer: {
          id: 'f1',
          name: 'Green Valley Farm',
          location: 'Riverside County, CA',
          rating: 4.8,
        },
        createdAt: existingProduct?.createdAt || new Date(),
        updatedAt: new Date(),
      };
      
      onSubmit(newProduct);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages([...images, result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Product Images */}
        <div className="space-y-2">
          <FormLabel>Product Images</FormLabel>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-2">
            {images.map((image, index) => (
              <div key={index} className="relative h-24 rounded-md overflow-hidden bg-gray-50">
                <img src={image} alt={`Product ${index}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            <label className="h-24 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <Camera className="h-8 w-8 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Add Image</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </label>
          </div>
          <FormDescription>
            Upload up to 4 images of your product. First image will be used as the main image.
          </FormDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Organic Carrots" {...field} />
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your product, growing methods, etc." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
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
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="each">Each</SelectItem>
                        <SelectItem value="lb">Pound (lb)</SelectItem>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="oz">Ounce (oz)</SelectItem>
                        <SelectItem value="bunch">Bunch</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                        <SelectItem value="pint">Pint</SelectItem>
                        <SelectItem value="quart">Quart</SelectItem>
                        <SelectItem value="gallon">Gallon</SelectItem>
                        <SelectItem value="basket">Basket</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 pt-4">
              <FormField
                control={form.control}
                name="isOrganic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Organic</FormLabel>
                      <FormDescription>
                        Product grown without synthetic pesticides
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Featured Product</FormLabel>
                      <FormDescription>
                        Show prominently in featured sections
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {existingProduct ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
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
