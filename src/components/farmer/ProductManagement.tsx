
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Tag, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/models';
import AddProductForm from './AddProductForm';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    description: 'Fresh organic carrots harvested weekly',
    price: 2.99,
    quantity: 100,
    unit: 'bundle',
    category: 'vegetables',
    images: ['https://images.unsplash.com/photo-1598170845058-c2b7a51db3f0?w=500&auto=format'],
    isOrganic: true,
    isFeatured: true,
    farmer: {
      id: 'f1',
      name: 'Green Valley Farm',
      location: 'Riverside County, CA',
      rating: 4.8,
    },
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-04-01'),
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    description: 'Sweet juicy strawberries, perfect for desserts',
    price: 4.50,
    quantity: 50,
    unit: 'basket',
    category: 'fruits',
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format'],
    isOrganic: true,
    isFeatured: false,
    farmer: {
      id: 'f1',
      name: 'Green Valley Farm',
      location: 'Riverside County, CA',
      rating: 4.8,
    },
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-28'),
  },
  {
    id: '3',
    name: 'Farm Fresh Eggs',
    description: 'Free-range eggs from pasture-raised chickens',
    price: 5.99,
    quantity: 80,
    unit: 'dozen',
    category: 'dairy',
    images: ['https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=500&auto=format'],
    isOrganic: true,
    isFeatured: true,
    farmer: {
      id: 'f1',
      name: 'Green Valley Farm',
      location: 'Riverside County, CA',
      rating: 4.8,
    },
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-25'),
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been successfully removed.",
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddDrawerOpen(true);
  };

  const handleAddProduct = (newProduct: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      });
    } else {
      // Add new product
      setProducts([...products, newProduct]);
      toast({
        title: "Product added",
        description: "The new product has been successfully added.",
      });
    }
    setIsAddDrawerOpen(false);
    setEditingProduct(null);
  };

  const openAddDrawer = () => {
    setEditingProduct(null);
    setIsAddDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your farm's product listings</CardDescription>
            </div>
            <Drawer open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
              <DrawerTrigger asChild>
                <Button onClick={openAddDrawer}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DrawerTrigger>
              <DrawerContent className="p-4 md:p-6">
                <DrawerHeader>
                  <DrawerTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DrawerTitle>
                </DrawerHeader>
                <AddProductForm 
                  onSubmit={handleAddProduct} 
                  existingProduct={editingProduct} 
                  onCancel={() => setIsAddDrawerOpen(false)}
                />
              </DrawerContent>
            </Drawer>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search products by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                            {product.images.length > 0 && (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                              <Badge variant="outline" className="capitalize">
                                {product.category}
                              </Badge>
                              {product.isOrganic && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  Organic
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">R{product.price.toFixed(2)}</span>
                        <span className="text-gray-500 text-xs">/{product.unit}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`${
                          product.quantity > 20 
                            ? 'text-green-600' 
                            : product.quantity > 5 
                              ? 'text-amber-600' 
                              : 'text-red-600'
                        } font-medium`}>
                          {product.quantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        {product.quantity > 0 ? (
                          <div className="flex items-center">
                            <CheckCircle2 className="text-green-500 h-4 w-4 mr-1" />
                            <span className="text-green-600 text-sm">In Stock</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="text-red-500 h-4 w-4 mr-1" />
                            <span className="text-red-600 text-sm">Out of Stock</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-red-500 hover:text-red-600" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No products found. Add your first product to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
