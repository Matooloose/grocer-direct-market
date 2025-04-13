
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

const AdminGalleryPage = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate('/admin/images');
  };

  return (
    <PageLayout>
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Admin Image Management System</h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to the image management portal. Access the admin panel to upload, edit, and manage all images for your marketplace.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-market-primary/10 p-6 rounded-full">
                <ImageIcon className="h-16 w-16 text-market-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Image Management Features</h2>
            <ul className="text-left max-w-md mx-auto mb-8 space-y-2">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                <span>Upload new images with drag-and-drop support</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                <span>Edit image details and categories</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                <span>Browse the image gallery with search functionality</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                <span>Delete images as needed</span>
              </li>
            </ul>
            
            <Button 
              onClick={handleNavigateToAdmin} 
              size="lg" 
              className="bg-market-primary hover:bg-market-primary/90"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              Access Image Management
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Note: This portal is for authorized administrators only.</p>
            <p>All changes made to images will be reflected across the marketplace.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminGalleryPage;
