
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Camera, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  farmName: z.string().min(2, { message: 'Farm name must be at least 2 characters.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  contactEmail: z.string().email({ message: 'Please enter a valid email.' }),
  contactPhone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  description: z.string().optional(),
  produceTypes: z.array(z.string()).min(1, { message: 'Select at least one product type.' }),
});

type ProduceType = 'vegetables' | 'fruits' | 'dairy' | 'meat' | 'grains' | 'herbs' | 'other';

const produceOptions: { value: ProduceType; label: string }[] = [
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'dairy', label: 'Dairy Products' },
  { value: 'meat', label: 'Meat & Poultry' },
  { value: 'grains', label: 'Grains & Cereals' },
  { value: 'herbs', label: 'Herbs & Spices' },
  { value: 'other', label: 'Other Products' },
];

const FarmerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduceTypes, setSelectedProduceTypes] = useState<ProduceType[]>(['vegetables']);
  const [farmImage, setFarmImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: "Green Valley Farm",
      location: "Riverside County, California",
      contactEmail: "contact@greenvalleyfarm.com",
      contactPhone: "(555) 123-4567",
      description: "Family-owned organic farm specializing in seasonal vegetables and fruits. We use sustainable farming practices and no artificial pesticides.",
      produceTypes: ['vegetables', 'fruits'],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your farm profile has been successfully updated.",
      });
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFarmImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProduceTypeChange = (type: ProduceType) => {
    setSelectedProduceTypes((current) => {
      if (current.includes(type)) {
        return current.filter(item => item !== type);
      } else {
        return [...current, type];
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Farm Profile</CardTitle>
          <CardDescription>
            Update your farm information and details that buyers will see.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Farm Image Upload */}
                <div className="mb-6">
                  <FormLabel>Farm Image or Logo</FormLabel>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-40 w-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                        {farmImage ? (
                          <img src={farmImage} alt="Farm preview" className="h-full w-full object-cover" />
                        ) : (
                          <Camera className="h-10 w-10 text-gray-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="farm-image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  <FormDescription className="text-center mt-2">
                    Upload a photo of your farm or your logo.
                  </FormDescription>
                </div>

                {/* Farm Details */}
                <FormField
                  control={form.control}
                  name="farmName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter farm name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
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
                      <FormLabel>Farm Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell buyers about your farm and growing practices" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Types */}
                <div>
                  <Label className="mb-2 block">Products You Sell</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                    {produceOptions.map((option) => (
                      <div 
                        key={option.value}
                        className={`
                          border rounded-md px-4 py-3 cursor-pointer transition-colors
                          ${selectedProduceTypes.includes(option.value) 
                            ? 'bg-market-primary/10 border-market-primary text-market-primary font-medium' 
                            : 'border-gray-200 hover:border-market-primary/50'}
                        `}
                        onClick={() => handleProduceTypeChange(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                  <FormDescription className="mt-2">
                    Select all that apply to your farm.
                  </FormDescription>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerProfile;
