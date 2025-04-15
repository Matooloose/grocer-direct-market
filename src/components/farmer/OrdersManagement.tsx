
import { useState } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle, Package, Truck, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus } from '@/types/models';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-2023-0012",
    user: {
      id: "user123",
      name: "John Smith",
      email: "john@example.com"
    },
    items: [
      {
        id: "item1",
        product: {
          id: "1",
          name: "Organic Carrots",
          description: "Fresh organic carrots harvested weekly",
          price: 2.99,
          quantity: 100,
          unit: "bundle",
          category: "vegetables",
          images: ["https://images.unsplash.com/photo-1598170845058-c2b7a51db3f0?w=500&auto=format"],
          isOrganic: true,
          isFeatured: true,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-15"),
          updatedAt: new Date("2023-04-01"),
        },
        quantity: 2
      },
      {
        id: "item2",
        product: {
          id: "2",
          name: "Fresh Strawberries",
          description: "Sweet juicy strawberries, perfect for desserts",
          price: 4.50,
          quantity: 50,
          unit: "basket",
          category: "fruits",
          images: ["https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format"],
          isOrganic: true,
          isFeatured: false,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-20"),
          updatedAt: new Date("2023-03-28"),
        },
        quantity: 1
      }
    ],
    total: 10.48,
    status: "pending",
    shippingAddress: "123 Main St, Anytown, USA",
    paymentMethod: "Credit Card",
    paymentStatus: "completed",
    createdAt: new Date("2023-06-10T15:25:00"),
    updatedAt: new Date("2023-06-10T15:25:00")
  },
  {
    id: "ORD-2023-0011",
    user: {
      id: "user456",
      name: "Emily Johnson",
      email: "emily@example.com"
    },
    items: [
      {
        id: "item3",
        product: {
          id: "3",
          name: "Farm Fresh Eggs",
          description: "Free-range eggs from pasture-raised chickens",
          price: 5.99,
          quantity: 80,
          unit: "dozen",
          category: "dairy",
          images: ["https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=500&auto=format"],
          isOrganic: true,
          isFeatured: true,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-10"),
          updatedAt: new Date("2023-03-25"),
        },
        quantity: 1
      }
    ],
    total: 5.99,
    status: "processing",
    shippingAddress: "456 Oak Ave, Somewhere, USA",
    paymentMethod: "PayPal",
    paymentStatus: "completed",
    createdAt: new Date("2023-06-09T11:30:00"),
    updatedAt: new Date("2023-06-10T09:15:00")
  },
  {
    id: "ORD-2023-0010",
    user: {
      id: "user789",
      name: "Michael Brown",
      email: "michael@example.com"
    },
    items: [
      {
        id: "item4",
        product: {
          id: "1",
          name: "Organic Carrots",
          description: "Fresh organic carrots harvested weekly",
          price: 2.99,
          quantity: 100,
          unit: "bundle",
          category: "vegetables",
          images: ["https://images.unsplash.com/photo-1598170845058-c2b7a51db3f0?w=500&auto=format"],
          isOrganic: true,
          isFeatured: true,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-15"),
          updatedAt: new Date("2023-04-01"),
        },
        quantity: 3
      }
    ],
    total: 8.97,
    status: "shipped",
    shippingAddress: "789 Pine St, Nowhere, USA",
    paymentMethod: "Credit Card",
    paymentStatus: "completed",
    createdAt: new Date("2023-06-08T14:45:00"),
    updatedAt: new Date("2023-06-09T16:20:00")
  },
  {
    id: "ORD-2023-0009",
    user: {
      id: "user101",
      name: "Sarah Williams",
      email: "sarah@example.com"
    },
    items: [
      {
        id: "item5",
        product: {
          id: "2",
          name: "Fresh Strawberries",
          description: "Sweet juicy strawberries, perfect for desserts",
          price: 4.50,
          quantity: 50,
          unit: "basket",
          category: "fruits",
          images: ["https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format"],
          isOrganic: true,
          isFeatured: false,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-20"),
          updatedAt: new Date("2023-03-28"),
        },
        quantity: 2
      },
      {
        id: "item6",
        product: {
          id: "3",
          name: "Farm Fresh Eggs",
          description: "Free-range eggs from pasture-raised chickens",
          price: 5.99,
          quantity: 80,
          unit: "dozen",
          category: "dairy",
          images: ["https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=500&auto=format"],
          isOrganic: true,
          isFeatured: true,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-10"),
          updatedAt: new Date("2023-03-25"),
        },
        quantity: 1
      }
    ],
    total: 14.99,
    status: "delivered",
    shippingAddress: "101 Maple Dr, Elsewhere, USA",
    paymentMethod: "Credit Card",
    paymentStatus: "completed",
    createdAt: new Date("2023-06-05T09:10:00"),
    updatedAt: new Date("2023-06-07T12:30:00")
  },
  {
    id: "ORD-2023-0008",
    user: {
      id: "user222",
      name: "Jessica Lee",
      email: "jessica@example.com"
    },
    items: [
      {
        id: "item7",
        product: {
          id: "1",
          name: "Organic Carrots",
          description: "Fresh organic carrots harvested weekly",
          price: 2.99,
          quantity: 100,
          unit: "bundle",
          category: "vegetables",
          images: ["https://images.unsplash.com/photo-1598170845058-c2b7a51db3f0?w=500&auto=format"],
          isOrganic: true,
          isFeatured: true,
          farmer: {
            id: "f1",
            name: "Green Valley Farm",
            location: "Riverside County, CA",
            rating: 4.8,
          },
          createdAt: new Date("2023-03-15"),
          updatedAt: new Date("2023-04-01"),
        },
        quantity: 1
      }
    ],
    total: 2.99,
    status: "cancelled",
    shippingAddress: "222 Elm St, Somewhere Else, USA",
    paymentMethod: "PayPal",
    paymentStatus: "failed",
    createdAt: new Date("2023-06-04T16:40:00"),
    updatedAt: new Date("2023-06-05T10:15:00")
  }
];

interface OrderDetailDialogProps {
  order: Order;
  onUpdateStatus: (id: string, newStatus: OrderStatus) => void;
}

const OrderDetailDialog = ({ order, onUpdateStatus }: OrderDetailDialogProps) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  
  const handleStatusUpdate = () => {
    onUpdateStatus(order.id, status);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'processing': return <Package className="h-4 w-4 text-blue-500" />;
      case 'shipped': return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Order Details - {order.id}</DialogTitle>
        <DialogDescription>
          Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Customer Information</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <p><span className="font-medium">Name:</span> {order.user.name}</p>
            <p><span className="font-medium">Email:</span> {order.user.email}</p>
            <p><span className="font-medium">Shipping Address:</span> {order.shippingAddress}</p>
            <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
            <p><span className="font-medium">Payment Status:</span> 
              <Badge className={`ml-2 ${
                order.paymentStatus === "completed" ? "bg-green-100 text-green-800" : 
                order.paymentStatus === "pending" ? "bg-amber-100 text-amber-800" : 
                "bg-red-100 text-red-800"
              }`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Order Status</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-2 text-sm font-medium capitalize">{order.status}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Update Status</label>
              <Select value={status} onValueChange={(value) => setStatus(value as OrderStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                className="w-full" 
                onClick={handleStatusUpdate}
                disabled={status === order.status}
              >
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium mb-2">Order Items</h3>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                        {item.product.images.length > 0 && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${item.product.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                <TableCell className="text-right font-bold">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Print Order</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const { toast } = useToast();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = orders.filter(order => order.status === 'pending').length;
  const processingCount = orders.filter(order => order.status === 'processing').length;
  const shippedCount = orders.filter(order => order.status === 'shipped').length;
  const deliveredCount = orders.filter(order => order.status === 'delivered').length;
  const cancelledCount = orders.filter(order => order.status === 'cancelled').length;

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === id 
        ? { ...order, status: newStatus, updatedAt: new Date() } 
        : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order ${id} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              {pendingCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-500" />
              {processingCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Truck className="h-5 w-5 mr-2 text-purple-500" />
              {shippedCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              {deliveredCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <XCircle className="h-5 w-5 mr-2 text-red-500" />
              {cancelledCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage and track customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger 
                  value="all" 
                  onClick={() => setStatusFilter('all')}
                >
                  All Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger 
                  value="processing" 
                  onClick={() => setStatusFilter('processing')}
                >
                  Processing
                </TabsTrigger>
                <TabsTrigger 
                  value="shipped" 
                  onClick={() => setStatusFilter('shipped')}
                >
                  Shipped
                </TabsTrigger>
                <TabsTrigger 
                  value="delivered" 
                  onClick={() => setStatusFilter('delivered')}
                >
                  Delivered
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <OrdersTable 
                orders={filteredOrders} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <OrdersTable 
                orders={filteredOrders} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </TabsContent>
            
            <TabsContent value="processing" className="mt-0">
              <OrdersTable 
                orders={filteredOrders} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </TabsContent>
            
            <TabsContent value="shipped" className="mt-0">
              <OrdersTable 
                orders={filteredOrders} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </TabsContent>
            
            <TabsContent value="delivered" className="mt-0">
              <OrdersTable 
                orders={filteredOrders} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const OrdersTable = ({ 
  orders, 
  onUpdateStatus 
}: { 
  orders: Order[], 
  onUpdateStatus: (id: string, newStatus: OrderStatus) => void 
}) => {
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-gray-500 text-xs">{order.user.email}</p>
                  </div>
                </TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  {getStatusBadge(order.status)}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <OrderDetailDialog 
                      order={order} 
                      onUpdateStatus={onUpdateStatus} 
                    />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No orders found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersManagement;
