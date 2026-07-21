// Updated interface with sender info
export interface Message {
  id: string;
  dealId: string;
  senderId: string;
  senderName?: string;
  content: string;
  status: string;
  createdAt: string;
}

// Messages array with different senders
export const messages: Message[] = [
  {
    id: "1",
    dealId: "deal-123",
    senderId: "user-456",
    senderName: "John Doe",
    content: "Hello. How are you today?",
    status: "read",
    createdAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "2",
    dealId: "deal-123",
    senderId: "current-user",
    senderName: "Me",
    content: "I'm doing well, thank you!",
    status: "delivered",
    createdAt: "2024-01-15T11:05:00Z",
  },
  {
    id: "3",
    dealId: "deal-123",
    senderId: "user-456",
    senderName: "John Doe",
    content: "Great to hear that!",
    status: "read",
    createdAt: "2024-01-15T11:10:00Z",
  },
  {
    id: "4",
    dealId: "deal-123",
    senderId: "current-user",
    senderName: "Me",
    content: "Would you like to discuss the deal details?",
    status: "sent",
    createdAt: "2024-01-15T11:15:00Z",
  },
];