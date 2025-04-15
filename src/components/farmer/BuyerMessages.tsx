
import { useState } from 'react';
import { Search, User, Plus, MessageCircle, Send, MoreVertical, Paperclip, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isSentByMe: boolean;
}

interface Conversation {
  id: string;
  customer: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    customer: {
      id: "user123",
      name: "John Smith",
      email: "john@example.com",
    },
    messages: [
      {
        id: "msg1",
        senderId: "user123",
        senderName: "John Smith",
        content: "Hi, are your strawberries in season right now?",
        timestamp: new Date("2023-06-10T14:25:00"),
        isRead: true,
        isSentByMe: false,
      },
      {
        id: "msg2",
        senderId: "farm1",
        senderName: "Green Valley Farm",
        content: "Yes, our strawberries are currently in season and very fresh!",
        timestamp: new Date("2023-06-10T15:10:00"),
        isRead: true,
        isSentByMe: true,
      },
      {
        id: "msg3",
        senderId: "user123",
        senderName: "John Smith",
        content: "Great! Do you offer bulk pricing? I'm planning a large event.",
        timestamp: new Date("2023-06-10T15:25:00"),
        isRead: false,
        isSentByMe: false,
      },
    ],
    lastMessage: {
      id: "msg3",
      senderId: "user123",
      senderName: "John Smith",
      content: "Great! Do you offer bulk pricing? I'm planning a large event.",
      timestamp: new Date("2023-06-10T15:25:00"),
      isRead: false,
      isSentByMe: false,
    },
    unreadCount: 1,
  },
  {
    id: "conv2",
    customer: {
      id: "user456",
      name: "Emily Johnson",
      email: "emily@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    messages: [
      {
        id: "msg4",
        senderId: "user456",
        senderName: "Emily Johnson",
        content: "Do you have any organic carrots available this week?",
        timestamp: new Date("2023-06-09T11:30:00"),
        isRead: true,
        isSentByMe: false,
      },
      {
        id: "msg5",
        senderId: "farm1",
        senderName: "Green Valley Farm",
        content: "Yes, we have fresh organic carrots available. They were harvested yesterday!",
        timestamp: new Date("2023-06-09T12:15:00"),
        isRead: true,
        isSentByMe: true,
      },
      {
        id: "msg6",
        senderId: "user456",
        senderName: "Emily Johnson",
        content: "Perfect! I'll place an order soon. Thanks!",
        timestamp: new Date("2023-06-09T12:30:00"),
        isRead: true,
        isSentByMe: false,
      },
    ],
    lastMessage: {
      id: "msg6",
      senderId: "user456",
      senderName: "Emily Johnson",
      content: "Perfect! I'll place an order soon. Thanks!",
      timestamp: new Date("2023-06-09T12:30:00"),
      isRead: true,
      isSentByMe: false,
    },
    unreadCount: 0,
  },
  {
    id: "conv3",
    customer: {
      id: "user789",
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    messages: [
      {
        id: "msg7",
        senderId: "user789",
        senderName: "Michael Brown",
        content: "What days do you deliver to the downtown area?",
        timestamp: new Date("2023-06-08T14:45:00"),
        isRead: true,
        isSentByMe: false,
      },
    ],
    lastMessage: {
      id: "msg7",
      senderId: "user789",
      senderName: "Michael Brown",
      content: "What days do you deliver to the downtown area?",
      timestamp: new Date("2023-06-08T14:45:00"),
      isRead: true,
      isSentByMe: false,
    },
    unreadCount: 0,
  },
];

const BuyerMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const filteredConversations = conversations.filter(conversation => 
    conversation.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = (conversationId: string) => {
    setConversations(conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          unreadCount: 0,
          messages: conversation.messages.map(message => ({
            ...message,
            isRead: true,
          })),
        };
      }
      return conversation;
    }));
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    markAsRead(conversation.id);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "farm1",
      senderName: "Green Valley Farm",
      content: newMessage,
      timestamp: new Date(),
      isRead: true,
      isSentByMe: true,
    };

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === activeConversation.id) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMsg],
          lastMessage: newMsg,
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, newMsg],
      lastMessage: newMsg,
    });
    setNewMessage('');

    toast({
      title: "Message sent",
      description: "Your message has been sent to the customer.",
    });
  };

  const handleDeleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter(
      conversation => conversation.id !== conversationId
    );
    setConversations(updatedConversations);
    
    if (activeConversation?.id === conversationId) {
      setActiveConversation(updatedConversations.length > 0 ? updatedConversations[0] : null);
    }

    toast({
      title: "Conversation deleted",
      description: "The conversation has been deleted.",
    });
  };

  return (
    <div className="h-[700px]">
      <Card className="h-full">
        <CardHeader className="pb-4">
          <CardTitle>Customer Messages</CardTitle>
          <CardDescription>Communicate with your customers</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 h-full">
            {/* Conversations List */}
            <div className="col-span-12 sm:col-span-4 border-r">
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <ScrollArea className="h-[540px]">
                  <div className="space-y-2">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-3 rounded-md cursor-pointer flex items-start space-x-3 ${
                            activeConversation?.id === conversation.id
                              ? 'bg-market-primary/10'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleSelectConversation(conversation)}
                        >
                          <div className="relative">
                            {conversation.customer.avatar ? (
                              <img
                                src={conversation.customer.avatar}
                                alt={conversation.customer.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-500" />
                              </div>
                            )}
                            {conversation.unreadCount > 0 && (
                              <span className="absolute -top-1 -right-1 bg-market-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{conversation.customer.name}</h4>
                              <span className="text-xs text-gray-500">
                                {new Date(conversation.lastMessage.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">
                              {conversation.lastMessage.isSentByMe ? 'You: ' : ''}
                              {conversation.lastMessage.content}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No conversations found.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="col-span-12 sm:col-span-8 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      {activeConversation.customer.avatar ? (
                        <img
                          src={activeConversation.customer.avatar}
                          alt={activeConversation.customer.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{activeConversation.customer.name}</h4>
                        <p className="text-xs text-gray-500">{activeConversation.customer.email}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeleteConversation(activeConversation.id)}>
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          <span className="text-red-500">Delete Conversation</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4 space-y-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSentByMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isSentByMe
                              ? 'bg-market-primary text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-right text-xs mt-1 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t mt-auto">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Textarea
                        placeholder="Type your message..."
                        className="min-h-[60px] resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageCircle className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                  <p className="text-sm max-w-md text-center">
                    Select a conversation from the list or start a new one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerMessages;
