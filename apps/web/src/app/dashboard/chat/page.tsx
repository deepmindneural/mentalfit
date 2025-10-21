'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video,
  MoreVertical,
  Search,
  Plus,
  MessageCircle,
  Clock,
  CheckCheck,
  AlertCircle,
  Heart,
  Brain,
  Zap
} from 'lucide-react';

// Mock data for chat conversations
const mockConversations = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    title: 'Licensed Therapist',
    avatar: null,
    lastMessage: 'How are you feeling about the techniques we discussed?',
    timestamp: '2024-07-31T10:30:00',
    unread: 2,
    isOnline: true,
    type: 'professional',
  },
  {
    id: 2,
    name: 'Crisis Support',
    title: '24/7 Emergency Support',
    avatar: null,
    lastMessage: 'Hello! How can we help you today?',
    timestamp: '2024-07-30T20:15:00',
    unread: 0,
    isOnline: true,
    type: 'crisis',
  },
  {
    id: 3,
    name: 'Wellness Coach',
    title: 'Daily Check-in Bot',
    avatar: null,
    lastMessage: 'Time for your daily wellness check-in! 🌟',
    timestamp: '2024-07-31T09:00:00',
    unread: 1,
    isOnline: true,
    type: 'bot',
  },
  {
    id: 4,
    name: 'Dr. Michael Chen',
    title: 'Psychiatrist',
    avatar: null,
    lastMessage: 'Your prescription has been updated in the system.',
    timestamp: '2024-07-29T16:45:00',
    unread: 0,
    isOnline: false,
    type: 'professional',
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: 'Dr. Sarah Wilson',
    content: 'Hello John! How are you feeling today?',
    timestamp: '2024-07-31T10:15:00',
    type: 'text',
    isOwn: false,
  },
  {
    id: 2,
    senderId: 'me',
    senderName: 'You',
    content: 'Hi Dr. Wilson, I\'m doing better today. The breathing exercises you taught me really helped with my anxiety yesterday.',
    timestamp: '2024-07-31T10:16:00',
    type: 'text',
    isOwn: true,
  },
  {
    id: 3,
    senderId: 1,
    senderName: 'Dr. Sarah Wilson',
    content: 'That\'s wonderful to hear! I\'m so glad the breathing techniques are working for you. Have you been practicing them daily as we discussed?',
    timestamp: '2024-07-31T10:17:00',
    type: 'text',
    isOwn: false,
  },
  {
    id: 4,
    senderId: 'me',
    senderName: 'You',
    content: 'Yes, I\'ve been doing them every morning and whenever I feel stressed at work. It\'s becoming a habit now.',
    timestamp: '2024-07-31T10:18:00',
    type: 'text',
    isOwn: true,
  },
  {
    id: 5,
    senderId: 1,
    senderName: 'Dr. Sarah Wilson',
    content: 'How are you feeling about the techniques we discussed?',
    timestamp: '2024-07-31T10:30:00',
    type: 'text',
    isOwn: false,
  },
];

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: 'me',
        senderName: 'You',
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text',
        isOwn: true,
      };

      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response
        const response = {
          id: messages.length + 2,
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          content: "Thank you for sharing that with me. How does that make you feel?",
          timestamp: new Date().toISOString(),
          type: 'text',
          isOwn: false,
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case 'professional':
        return <Brain className="h-6 w-6 text-primary-600" />;
      case 'crisis':
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      case 'bot':
        return <Zap className="h-6 w-6 text-secondary-600" />;
      default:
        return <MessageCircle className="h-6 w-6 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <DashboardLayout title="Chat Support">
      <div className="h-[calc(100vh-12rem)] bg-white rounded-xl shadow-sm border border-gray-200 flex">
        {/* Sidebar - Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedConversation.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {getConversationIcon(conversation.type)}
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">
                          {formatDate(conversation.timestamp)}
                        </span>
                        {conversation.unread > 0 && (
                          <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-1">{conversation.title}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                <AlertCircle className="h-4 w-4 mr-2" />
                Crisis Support
              </button>
              <button className="w-full flex items-center justify-center px-3 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium">
                <Heart className="h-4 w-4 mr-2" />
                Wellness Check-in
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getConversationIcon(selectedConversation.type)}
                  </div>
                  {selectedConversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {selectedConversation.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.isOwn ? 'order-2' : 'order-1'
                }`}>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                    message.isOwn ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.isOwn && (
                      <CheckCheck className="h-3 w-3 ml-1 text-primary-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            {/* Quick Responses */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedConversation.type === 'professional' && (
                <>
                  <button 
                    onClick={() => setNewMessage("I'm feeling better today")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    I'm feeling better today
                  </button>
                  <button 
                    onClick={() => setNewMessage("Can we schedule a session?")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    Can we schedule a session?
                  </button>
                  <button 
                    onClick={() => setNewMessage("I need help with anxiety")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    I need help with anxiety
                  </button>
                </>
              )}
              
              {selectedConversation.type === 'crisis' && (
                <>
                  <button 
                    onClick={() => setNewMessage("I need immediate help")}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                  >
                    I need immediate help
                  </button>
                  <button 
                    onClick={() => setNewMessage("Can someone call me?")}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                  >
                    Can someone call me?
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}