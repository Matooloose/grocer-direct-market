
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Download, Info, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Image {
  id: string;
  url: string;
  name: string;
  category: string;
  uploadedAt: Date;
  size: string;
}

interface ImagesGalleryProps {
  images: Image[];
  onDelete: (id: string) => void;
  onEdit: (id: string, data: { name: string; category: string }) => void;
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ images, onDelete, onEdit }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', category: '' });

  const handleEditClick = (image: Image) => {
    setSelectedImage(image);
    setEditForm({
      name: image.name,
      category: image.category
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (image: Image) => {
    setSelectedImage(image);
    setIsDeleteDialogOpen(true);
  };

  const handleDetailsClick = (image: Image) => {
    setSelectedImage(image);
    setIsDetailsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedImage) {
      onDelete(selectedImage.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const confirmEdit = () => {
    if (selectedImage) {
      onEdit(selectedImage.id, editForm);
      setIsEditDialogOpen(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No images found. Upload some images to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="group relative rounded-md overflow-hidden border border-gray-200">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{image.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{image.category}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1">
                      <Button 
                        onClick={() => handleEditClick(image)} 
                        size="icon" 
                        variant="secondary"
                        className="rounded-full"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDeleteClick(image)} 
                        size="icon" 
                        variant="destructive"
                        className="rounded-full"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => downloadImage(image.url, image.name)} 
                        size="icon" 
                        variant="secondary"
                        className="rounded-full"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDetailsClick(image)} 
                        size="icon" 
                        variant="secondary"
                        className="rounded-full"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedImage?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            {selectedImage && (
              <img 
                src={selectedImage.url} 
                alt={selectedImage.name} 
                className="h-40 object-contain rounded-md" 
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Update the details for this image
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            {selectedImage && (
              <img 
                src={selectedImage.url} 
                alt={selectedImage.name} 
                className="h-40 object-contain rounded-md" 
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Image Name</Label>
              <Input 
                id="name" 
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={editForm.category}
                onValueChange={(value) => setEditForm({...editForm, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="farmers">Farmers</SelectItem>
                  <SelectItem value="banners">Banners</SelectItem>
                  <SelectItem value="backgrounds">Backgrounds</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center my-4">
            {selectedImage && (
              <img 
                src={selectedImage.url} 
                alt={selectedImage.name} 
                className="h-40 object-contain rounded-md" 
              />
            )}
          </div>
          {selectedImage && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{selectedImage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium">{selectedImage.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Upload Date:</span>
                <span className="font-medium">{selectedImage.uploadedAt.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span className="font-medium">{selectedImage.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">URL:</span>
                <span className="font-medium truncate max-w-[200px]">{selectedImage.url}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
