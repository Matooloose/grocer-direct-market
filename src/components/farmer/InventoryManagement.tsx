
import { useState } from 'react';
import { Edit2, AlertTriangle, TrendingUp, TrendingDown, Search, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/models';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
    quantity: 3,
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
    quantity: 0,
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
  {
    id: '4',
    name: 'Heirloom Tomatoes',
    description: 'Colorful variety of heirloom tomatoes',
    price: 3.99,
    quantity: 45,
    unit: 'lb',
    category: 'vegetables',
    images: ['https://images.unsplash.com/photo-1558818498-28c1e002b655?w=500&auto=format'],
    isOrganic: true,
    isFeatured: false,
    farmer: {
      id: 'f1',
      name: 'Green Valley Farm',
      location: 'Riverside County, CA',
      rating: 4.8,
    },
    createdAt: new Date('2023-03-12'),
    updatedAt: new Date('2023-03-30'),
  },
];

interface InventoryUpdateDialogProps {
  product: Product;
  onUpdate: (id: string, quantity: number, price: number) => void;
}

const InventoryUpdateDialog = ({ product, onUpdate }: InventoryUpdateDialogProps) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = () => {
    onUpdate(product.id, quantity, price);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Inventory - {product.name}</DialogTitle>
        <DialogDescription>
          Update the available quantity and price for this product.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Available Quantity
          </label>
          <Input
            id="quantity"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price (${product.price.toFixed(2)}/{product.unit})
          </label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={() => {}}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const InventoryManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(product => product.quantity <= 5 && product.quantity > 0);
  const outOfStockProducts = products.filter(product => product.quantity === 0);

  const handleUpdateInventory = (id: string, quantity: number, price: number) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, quantity, price, updatedAt: new Date() } 
        : product
    ));
    
    toast({
      title: "Inventory updated",
      description: "Product inventory has been successfully updated.",
    });
  };

  const handleBulkRestock = () => {
    // Simulate a bulk restock operation
    const updatedProducts = products.map(product => {
      if (product.quantity < 10) {
        return { ...product, quantity: product.quantity + 50, updatedAt: new Date() };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    
    toast({
      title: "Bulk restock completed",
      description: "Low stock items have been restocked.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
            <p className="text-sm text-gray-500 mt-1">Across {new Set(products.map(p => p.category)).size} categories</p>
          </CardContent>
        </Card>
        
        <Card className={lowStockProducts.length > 0 ? "border-amber-200 bg-amber-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingDown className={`h-5 w-5 mr-2 ${lowStockProducts.length > 0 ? "text-amber-500" : "text-gray-400"}`} />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{lowStockProducts.length}</div>
            <p className="text-sm text-gray-500 mt-1">Items with 5 or fewer in stock</p>
          </CardContent>
        </Card>
        
        <Card className={outOfStockProducts.length > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className={`h-5 w-5 mr-2 ${outOfStockProducts.length > 0 ? "text-red-500" : "text-gray-400"}`} />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{outOfStockProducts.length}</div>
            <p className="text-sm text-gray-500 mt-1">Products currently unavailable</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Update stock quantities and pricing</CardDescription>
            </div>
            <Button onClick={handleBulkRestock} className="bg-market-primary hover:bg-market-primary/90">
              <RefreshCw className="h-4 w-4 mr-2" />
              Bulk Restock
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search inventory..."
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
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
                            <Badge variant="outline" className="mt-1 capitalize">
                              {product.category}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                        <span className="text-gray-500 text-xs">/{product.unit}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          product.quantity === 0 
                            ? 'text-red-600' 
                            : product.quantity <= 5 
                              ? 'text-amber-600' 
                              : 'text-green-600'
                        }`}>
                          {product.quantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        {product.quantity === 0 ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Out of Stock
                          </Badge>
                        ) : product.quantity <= 5 ? (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            In Stock
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-500 text-sm">
                          {product.updatedAt.toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4 mr-2" />
                              Update
                            </Button>
                          </DialogTrigger>
                          <InventoryUpdateDialog 
                            product={product} 
                            onUpdate={handleUpdateInventory} 
                          />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No products found.
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

export default InventoryManagement;
