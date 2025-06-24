
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Eye, Plus } from 'lucide-react';

const ProductManagement = () => {
  const products = [
    {
      id: "1",
      name: "Organic Tomatoes",
      price: 25.50,
      stock: 45,
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=100&h=100&fit=crop",
      status: "active"
    },
    {
      id: "2",
      name: "Fresh Lettuce",
      price: 18.00,
      stock: 3,
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=100&h=100&fit=crop",
      status: "low_stock"
    },
    {
      id: "3",
      name: "Sweet Carrots",
      price: 22.75,
      stock: 28,
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=100&h=100&fit=crop",
      status: "active"
    },
    {
      id: "4",
      name: "Organic Spinach",
      price: 32.00,
      stock: 0,
      category: "Leafy Greens",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop",
      status: "out_of_stock"
    }
  ];

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-800', label: 'Out of Stock' };
    if (stock <= 5) return { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' };
    return { color: 'bg-green-100 text-green-800', label: 'In Stock' };
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your products and inventory</CardDescription>
        </div>
        <Button className="bg-market-primary hover:bg-market-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm font-medium text-market-primary">R{product.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{product.stock} units</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
