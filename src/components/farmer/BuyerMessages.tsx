
import { useState } from 'react';
import { Send, Search, Clock, CheckCircle2, UserCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

type Message = {
  id: string;
  from: 'buyer' | 'farmer';
  userName: string;
  userImage?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
};

type Conversation = {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerImage?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
  productInquiry?: {
    productId: string;
    productName: string;
    productImage: string;
  };
  orderInquiry?: {
    orderId: string;
  };
};

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    buyerId: 'buyer1',
    buyerName: 'John Smith',
    buyerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format',
    lastMessage: 'Are the strawberries available for pickup tomorrow?',
    lastMessageTime: new Date('2023-06-10T10:30:00'),
    unreadCount: 2,
    messages: [
      {
        id: 'msg1',
        from: 'buyer',
        userName: 'John Smith',
        userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format',
        content: 'Hi there, I was wondering about the Fresh Strawberries I saw on your page.',
        timestamp: new Date('2023-06-10T10:15:00'),
        isRead: true,
      },
      {
        id: 'msg2',
        from: 'farmer',
        userName: 'Green Valley Farm',
        content: 'Hello John! Yes, we have strawberries available. How can I help?',
        timestamp: new Date('2023-06-10T10:20:00'),
        isRead: true,
      },
      {
        id: 'msg3',
        from: 'buyer',
        userName: 'John Smith',
        userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format',
        content: 'Are the strawberries available for pickup tomorrow?',
        timestamp: new Date('2023-06-10T10:30:00'),
        isRead: false,
      },
    ],
    productInquiry: {
      productId: '2',
      productName: 'Fresh Strawberries',
      productImage: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=150&auto=format',
    },
  },
  {
    id: 'conv2',
    buyerId: 'buyer2',
    buyerName: 'Emily Johnson',
    buyerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format',
    lastMessage: 'Thank you for the quick delivery of my order!',
    lastMessageTime: new Date('2023-06-09T14:45:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'msg4',
        from: 'buyer',
        userName: 'Emily Johnson',
        userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format',
        content: 'I received my order today. Thank you for the quick delivery of my order!',
        timestamp: new Date('2023-06-09T14:45:00'),
        isRead: true,
      },
      {
        id: 'msg5',
        from: 'farmer',
        userName: 'Green Valley Farm',
        content: "Wonderful! We're glad everything arrived safely. Enjoy your farm-fresh products!",
        timestamp: new Date('2023-06-09T15:00:00'),
        isRead: true,
      },
    ],
    orderInquiry: {
      orderId: 'ORD-2023-0010',
    },
  },
  {
    id: 'conv3',
    buyerId: 'buyer3',
    buyerName: 'Michael Brown',
    lastMessage: 'Do you sell organic tomatoes as well?',
    lastMessageTime: new Date('2023-06-08T09:15:00'),
    unreadCount: 1,
    messages: [
      {
        id: 'msg6',
        from: 'buyer',
        userName: 'Michael Brown',
        content: "Hello, I'm interested in your organic carrots. Do you sell organic tomatoes as well?",
        timestamp: new Date('2023-06-08T09:15:00'),
        isRead: false,
      },
    ],
    productInquiry: {
      productId: '1',
      productName: 'Organic Carrots',
      productImage: 'https://images.unsplash.com/photo-1598170845058-c2b7a51db3f0?w=150&auto=format',
    },
  },
];

const BuyerMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredConversations = conversations.filter(
    conv => conv.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadConversations = conversations.filter(conv => conv.unreadCount > 0);
  const readConversations = conversations.filter(conv => conv.unreadCount === 0);

  const handleConversationSelect = (conversation: Conversation) => {
    // Mark messages as read when conversation is selected
    const updatedConversation = {
      ...conversation,
      unreadCount: 0,
      messages: conversation.messages.map(msg => ({
        ...msg,
        isRead: true,
      })),
    };

    setActiveConversation(updatedConversation);
    
    // Update the conversations list
    setConversations(
      conversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      from: 'farmer',
      userName: 'Green Valley Farm',
      content: newMessage,
      timestamp: new Date(),
      isRead: true,
    };

    const updatedConversation = {
      ...activeConversation,
      lastMessage: newMessage,
      lastMessageTime: new Date(),
      messages: [...activeConversation.messages, newMsg],
    };

    setActiveConversation(updatedConversation);
    
    // Update the conversations list
    setConversations(
      conversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
    
    // Clear the input
    setNewMessage('');
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the buyer.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-24rem)]">
      {/* Conversations List */}
      <Card className="md:col-span-1 flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle>Messages</CardTitle>
          <CardDescription>Communicate with buyers</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
                {unreadConversations.length > 0 && (
                  <Badge className="ml-1 bg-market-primary hover:bg-market-primary">
                    {unreadConversations.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <TabsContent value="all" className="m-0">
                {filteredConversations.length > 0 ? (
                  <div className="divide-y">
                    {filteredConversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        className={`px-4 py-3 flex items-start cursor-pointer hover:bg-gray-100 ${
                          activeConversation?.id === conversation.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                          {conversation.buyerImage ? (
                            <AvatarImage src={conversation.buyerImage} alt={conversation.buyerName} />
                          ) : (
                            <AvatarFallback>
                              {conversation.buyerName.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{conversation.buyerName}</p>
                            <span className="text-xs text-gray-500">
                              {formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                          {conversation.productInquiry && (
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs">
                                Product Inquiry
                              </Badge>
                            </div>
                          )}
                          {conversation.orderInquiry && (
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs">
                                Order #{conversation.orderInquiry.orderId.split('-').pop()}
                              </Badge>
                            </div>
                          )}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 bg-market-primary hover:bg-market-primary">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations found
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                {unreadConversations.length > 0 ? (
                  <div className="divide-y">
                    {unreadConversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        className={`px-4 py-3 flex items-start cursor-pointer hover:bg-gray-100 ${
                          activeConversation?.id === conversation.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                          {conversation.buyerImage ? (
                            <AvatarImage src={conversation.buyerImage} alt={conversation.buyerName} />
                          ) : (
                            <AvatarFallback>
                              {conversation.buyerName.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{conversation.buyerName}</p>
                            <span className="text-xs text-gray-500">
                              {formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        </div>
                        <Badge className="ml-2 bg-market-primary hover:bg-market-primary">
                          {conversation.unreadCount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No unread messages
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      {/* Conversation Detail */}
      <Card className="md:col-span-2 flex flex-col h-full">
        {activeConversation ? (
          <>
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {activeConversation.buyerImage ? (
                    <AvatarImage src={activeConversation.buyerImage} alt={activeConversation.buyerName} />
                  ) : (
                    <AvatarFallback>
                      <UserCircle className="h-6 w-6" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{activeConversation.buyerName}</CardTitle>
                  <CardDescription>
                    {activeConversation.productInquiry && (
                      <span>Inquiry about {activeConversation.productInquiry.productName}</span>
                    )}
                    {activeConversation.orderInquiry && (
                      <span>Regarding Order #{activeConversation.orderInquiry.orderId.split('-').pop()}</span>
                    )}
                  </CardDescription>
                </div>
              </div>

              {activeConversation.productInquiry && (
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 mr-2">
                    <img
                      src={activeConversation.productInquiry.productImage}
                      alt={activeConversation.productInquiry.productName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
              <ScrollArea className="flex-1 px-4 py-2">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.from === 'farmer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-start max-w-[80%]">
                        {message.from === 'buyer' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            {message.userImage ? (
                              <AvatarImage src={message.userImage} alt={message.userName} />
                            ) : (
                              <AvatarFallback>
                                {message.userName.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        )}
                        
                        <div className={`rounded-lg p-3 ${
                          message.from === 'farmer' 
                            ? 'bg-market-primary text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <div className={`text-xs mt-1 flex items-center ${
                            message.from === 'farmer' ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                            {message.from === 'farmer' && (
                              <span className="ml-1 flex items-center">
                                {message.isRead ? (
                                  <CheckCircle2 className="h-3 w-3 ml-1" />
                                ) : (
                                  <Clock className="h-3 w-3 ml-1" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} className="flex-shrink-0 self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-center p-6">
            <div>
              <UserCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="text-gray-500 mt-2">
                Select a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BuyerMessages;
