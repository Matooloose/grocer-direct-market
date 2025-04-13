
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import PageLayout from '@/components/layout/PageLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import DashboardSearch from '@/components/admin/DashboardSearch';
import { ImagesGallery } from '@/components/admin/ImagesGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploader } from '@/components/admin/ImageUploader';

// Mock data for images
const mockImages = [
  { 
    id: '1', 
    url: '/placeholder.svg', 
    name: 'Product Image 1',
    category: 'products',
    uploadedAt: new Date('2023-10-15'),
    size: '245KB'
  },
  { 
    id: '2', 
    url: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9', 
    name: 'Farmer Photo',
    category: 'farmers',
    uploadedAt: new Date('2023-09-23'),
    size: '412KB'
  },
  { 
    id: '3', 
    url: 'https://images.unsplash.com/photo-1574943320219-5c1ed8300b30', 
    name: 'Vegetables Banner',
    category: 'banners',
    uploadedAt: new Date('2023-11-02'),
    size: '856KB'
  },
  { 
    id: '4', 
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869', 
    name: 'Organic Food',
    category: 'products',
    uploadedAt: new Date('2023-10-05'),
    size: '325KB'
  },
  { 
    id: '5', 
    url: 'https://images.unsplash.com/photo-1455853828816-0c301a011711', 
    name: 'Farm Landscape',
    category: 'backgrounds',
    uploadedAt: new Date('2023-08-12'),
    size: '723KB'
  },
];

const AdminImages = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState(mockImages);
  const { toast } = useToast();

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(image => image.id !== id));
    toast({
      title: "Image deleted",
      description: "The image has been successfully deleted.",
    });
  };

  const handleEditImage = (id: string, updatedData: { name: string; category: string }) => {
    setImages(images.map(image => 
      image.id === id ? { ...image, ...updatedData } : image
    ));
    toast({
      title: "Image updated",
      description: "The image details have been successfully updated.",
    });
  };

  const handleAddImage = (newImage: any) => {
    const image = {
      id: String(Date.now()),
      url: newImage.url || '/placeholder.svg',
      name: newImage.name,
      category: newImage.category,
      uploadedAt: new Date(),
      size: newImage.size || '0KB'
    };
    
    setImages([image, ...images]);
    toast({
      title: "Image uploaded",
      description: "The image has been successfully uploaded.",
    });
  };

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <DashboardHeader 
              title="Image Management" 
              subtitle="Upload, edit, and manage all images for your marketplace" 
            />
            <div className="mt-4 md:mt-0">
              <DashboardSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
          </div>
          
          <Tabs 
            defaultValue="gallery" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-2">
              <TabsList className="grid grid-cols-2 gap-2">
                <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
                <TabsTrigger value="upload">Upload Images</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="gallery">
              <ImagesGallery 
                images={filteredImages} 
                onDelete={handleDeleteImage}
                onEdit={handleEditImage}
              />
            </TabsContent>
            
            <TabsContent value="upload">
              <ImageUploader onUpload={handleAddImage} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminImages;
