
import { useState } from 'react';
import { Bell, ShoppingCart, AlertTriangle, CheckCircle, Clock, Info, Star, X, Filter, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'system' | 'review';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-2023-0012 has been placed by John Smith.',
    timestamp: new Date('2023-06-10T15:25:00'),
    isRead: false,
    link: '/farmer/orders',
  },
  {
    id: 'notif2',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Your Fresh Strawberries inventory is running low (3 items remaining).',
    timestamp: new Date('2023-06-10T12:30:00'),
    isRead: false,
    link: '/farmer/inventory',
  },
  {
    id: 'notif3',
    type: 'order',
    title: 'Order Status Update',
    message: 'Order #ORD-2023-0010 has been delivered to the customer.',
    timestamp: new Date('2023-06-09T16:20:00'),
    isRead: true,
    link: '/farmer/orders',
  },
  {
    id: 'notif4',
    type: 'system',
    title: 'System Maintenance',
    message: 'The system will undergo maintenance on June 15th from 2:00 AM to 4:00 AM.',
    timestamp: new Date('2023-06-09T10:15:00'),
    isRead: true,
  },
  {
    id: 'notif5',
    type: 'review',
    title: 'New Product Review',
    message: 'Sarah Williams left a 5-star review for your Farm Fresh Eggs.',
    timestamp: new Date('2023-06-08T14:45:00'),
    isRead: true,
    link: '/farmer/sales',
  },
  {
    id: 'notif6',
    type: 'inventory',
    title: 'Out of Stock Alert',
    message: 'Your Farm Fresh Eggs are now out of stock.',
    timestamp: new Date('2023-06-08T09:30:00'),
    isRead: true,
    link: '/farmer/inventory',
  },
  {
    id: 'notif7',
    type: 'system',
    title: 'Account Security',
    message: 'Your account password was changed successfully.',
    timestamp: new Date('2023-06-07T16:50:00'),
    isRead: true,
  },
  {
    id: 'notif8',
    type: 'order',
    title: 'Order Cancelled',
    message: 'Order #ORD-2023-0008 has been cancelled by the customer.',
    timestamp: new Date('2023-06-05T10:15:00'),
    isRead: true,
    link: '/farmer/orders',
  },
];

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true,
    })));
    
    toast({
      title: "All notifications marked as read",
      description: "You've marked all notifications as read.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    
    toast({
      title: "All notifications cleared",
      description: "You've cleared all your notifications.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'inventory':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-purple-500" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" /> 
                Notifications 
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-market-primary">{unreadCount} unread</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Stay updated on orders, inventory, and system notices
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={clearAllNotifications}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span>Clear All Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && (
                  <Badge className="ml-2">{notifications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge className="ml-2">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="order">Orders</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="review">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification}
                getIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="unread" className="mt-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification}
                getIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="order" className="mt-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification}
                getIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="inventory" className="mt-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification}
                getIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="system" className="mt-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification}
                getIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="review" className="mt-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification}
                getIcon={getNotificationIcon}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  getIcon: (type: string) => React.ReactNode;
}

const NotificationsList = ({ notifications, onMarkAsRead, onDelete, getIcon }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-md">
        <Bell className="h-10 w-10 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No notifications</h3>
        <p className="mt-1 text-sm text-gray-500">
          You're all caught up! There are no notifications in this category.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border rounded-lg relative ${
              !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
            }`}
          >
            {!notification.isRead && (
              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-market-primary" />
            )}
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <time dateTime={notification.timestamp.toISOString()}>
                    {new Date(notification.timestamp).toLocaleString()}
                  </time>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Mark as read
                    </Button>
                  )}
                  
                  {notification.link && (
                    <Button variant="outline" size="sm">
                      View details
                    </Button>
                  )}
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex-shrink-0" 
                onClick={() => onDelete(notification.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationsPanel;
