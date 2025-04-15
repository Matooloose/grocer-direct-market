
import { useState } from 'react';
import { Bell, ShoppingBag, Package, AlertTriangle, Info, CheckCheck, X, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

type NotificationType = 'order' | 'inventory' | 'system' | 'promotion';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
  actionText?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'order',
    title: 'New Order Received',
    description: 'Order #0012 for $32.50 has been placed.',
    timestamp: new Date('2023-06-10T09:15:00'),
    isRead: false,
    link: '/farmer?tab=orders',
    actionText: 'View Order',
  },
  {
    id: 'notif2',
    type: 'inventory',
    title: 'Low Stock Alert',
    description: 'Fresh Strawberries are running low (3 items remaining).',
    timestamp: new Date('2023-06-10T08:30:00'),
    isRead: false,
    link: '/farmer?tab=inventory',
    actionText: 'Update Inventory',
  },
  {
    id: 'notif3',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance on June 15th from 2:00 AM to 4:00 AM.',
    timestamp: new Date('2023-06-09T17:45:00'),
    isRead: true,
    link: '#',
    actionText: 'Learn More',
  },
  {
    id: 'notif4',
    type: 'order',
    title: 'Order Delivered',
    description: 'Order #0010 has been delivered successfully.',
    timestamp: new Date('2023-06-09T14:20:00'),
    isRead: true,
    link: '/farmer?tab=orders',
    actionText: 'View Details',
  },
  {
    id: 'notif5',
    type: 'promotion',
    title: 'Featured Farmer Opportunity',
    description: 'Your farm qualifies for a featured listing. Increase your visibility!',
    timestamp: new Date('2023-06-08T10:05:00'),
    isRead: false,
    link: '#',
    actionText: 'Learn More',
  },
  {
    id: 'notif6',
    type: 'inventory',
    title: 'Out of Stock',
    description: 'Farm Fresh Eggs are now out of stock.',
    timestamp: new Date('2023-06-08T08:15:00'),
    isRead: true,
    link: '/farmer?tab=inventory',
    actionText: 'Update Inventory',
  },
  {
    id: 'notif7',
    type: 'system',
    title: 'Account Verified',
    description: 'Your farm account has been verified. You can now sell products.',
    timestamp: new Date('2023-06-07T12:30:00'),
    isRead: true,
  },
];

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<'all' | NotificationType>('all');
  const { toast } = useToast();

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    return notification.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification Removed",
      description: "The notification has been removed.",
    });
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'inventory':
        return <Package className="h-5 w-5 text-amber-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-purple-500" />;
      case 'promotion':
        return <AlertTriangle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="h-[calc(100vh-18rem)]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with your farm activity</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as 'all' | NotificationType)}>
            <div className="border-b px-4">
              <TabsList className="mb-0">
                <TabsTrigger value="all" className="relative">
                  All
                  {unreadCount > 0 && (
                    <Badge className="ml-1 bg-market-primary hover:bg-market-primary">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="order">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="inventory">
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="system">
                  System
                </TabsTrigger>
                <TabsTrigger value="promotion">
                  Promotions
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-24rem)]">
              <TabsContent value="all" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={markAsRead} 
                  onDelete={deleteNotification}
                  getIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              </TabsContent>
              
              <TabsContent value="order" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={markAsRead} 
                  onDelete={deleteNotification}
                  getIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              </TabsContent>
              
              <TabsContent value="inventory" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={markAsRead} 
                  onDelete={deleteNotification}
                  getIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              </TabsContent>
              
              <TabsContent value="system" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={markAsRead} 
                  onDelete={deleteNotification}
                  getIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              </TabsContent>
              
              <TabsContent value="promotion" className="m-0">
                <NotificationList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={markAsRead} 
                  onDelete={deleteNotification}
                  getIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  getIcon: (type: NotificationType) => JSX.Element;
  formatTime: (date: Date) => string;
}

const NotificationList = ({ 
  notifications, 
  onMarkAsRead, 
  onDelete,
  getIcon,
  formatTime,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center p-4">
        <Bell className="h-10 w-10 text-gray-300 mb-2" />
        <p className="text-gray-500">No notifications yet</p>
      </div>
    );
  }

  const groupedByDate: Record<string, Notification[]> = {};
  
  notifications.forEach(notification => {
    const date = notification.timestamp.toLocaleDateString();
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(notification);
  });

  return (
    <div className="divide-y">
      {Object.entries(groupedByDate).map(([date, notifs]) => (
        <div key={date}>
          <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium">{date}</span>
            </div>
          </div>
          {notifs.map(notification => (
            <div 
              key={notification.id} 
              className={`px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className="mt-0.5 mr-3">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-black' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center ml-2">
                      <span className="text-xs text-gray-500 mr-2 whitespace-nowrap">
                        {formatTime(notification.timestamp)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(notification.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className={`text-sm mt-0.5 ${!notification.isRead ? 'text-gray-700' : 'text-gray-500'}`}>
                    {notification.description}
                  </p>
                  {notification.link && (
                    <div className="mt-2">
                      <a 
                        href={notification.link} 
                        className="text-market-primary hover:text-market-primary/90 text-sm font-medium inline-flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {notification.actionText || 'View'}
                      </a>
                    </div>
                  )}
                </div>
                {!notification.isRead && (
                  <div className="h-2 w-2 rounded-full bg-market-primary ml-2 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotificationsPanel;
