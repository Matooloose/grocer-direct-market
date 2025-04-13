
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (imageData: any) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (PNG, JPG, JPEG, GIF)');
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    
    // Extract file name without extension for the image name
    const fileName = file.name.split('.').slice(0, -1).join('.');
    setName(fileName);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setName('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }
    
    if (!name) {
      setError('Please provide a name for the image');
      return;
    }
    
    if (!category) {
      setError('Please select a category for the image');
      return;
    }
    
    // In a real app, you would upload the file to your server/cloud storage here
    // For this demo, we'll just pass the file info to the parent component
    
    onUpload({
      file: selectedFile,
      name: name,
      category: category,
      url: previewUrl,
      size: formatFileSize(selectedFile.size)
    });
    
    // Clear form after upload
    clearSelection();
    setCategory('');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Image</CardTitle>
        <CardDescription>
          Drag and drop or click to upload images. Supported formats: PNG, JPG, JPEG, GIF.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-64 relative
              ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50'}
              ${selectedFile ? 'border-green-500 bg-green-50' : ''}
              ${error ? 'border-red-500 bg-red-50' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            
            {selectedFile && previewUrl ? (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="h-40 object-contain" 
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={clearSelection}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              </div>
            ) : (
              <>
                <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-center mb-2">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG, GIF up to 5MB</p>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-4"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select File
                </Button>
              </>
            )}
            
            {error && (
              <p className="mt-2 text-sm text-red-600 absolute bottom-2">{error}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Image Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter image name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
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
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!selectedFile || !name || !category}
          >
            Upload Image
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
