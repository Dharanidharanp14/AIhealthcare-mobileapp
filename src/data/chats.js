const conversations = [
  {
    id: "olivia-turner",
    name: "Dr. Olivia Turner",
    specialty: "Dermatology",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    lastMessage: "When did the irritation first appear?",
    time: "10:42 AM",
    unreadCount: 2,
    messages: [
      {
        id: "olivia-1",
        sender: "them",
        text: "Hello, how can I help you today?",
        time: "10:30 AM",
      },
      {
        id: "olivia-2",
        sender: "me",
        text: "I have had some skin irritation on my arm.",
        time: "10:36 AM",
      },
      {
        id: "olivia-3",
        sender: "them",
        text: "When did the irritation first appear?",
        time: "10:42 AM",
      },
    ],
  },
  {
    id: "alexander-bennett",
    name: "Dr. Alexander Bennett",
    specialty: "Dermatology",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    lastMessage: "I have shared the preparation details.",
    time: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "alexander-1",
        sender: "me",
        text: "Is there anything I should bring to the consultation?",
        time: "Yesterday",
      },
      {
        id: "alexander-2",
        sender: "them",
        text: "Please bring a list of your current medications and any previous test results.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "sophia-martinez",
    name: "Dr. Sophia Martinez",
    specialty: "Skin care consultation",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    lastMessage: "Thank you, that answers my question.",
    time: "Mon",
    unreadCount: 0,
    messages: [
      {
        id: "sophia-1",
        sender: "them",
        text: "What would you like to discuss during your consultation?",
        time: "Mon",
      },
      {
        id: "sophia-2",
        sender: "me",
        text: "I would like to review a daily skin care routine.",
        time: "Mon",
      },
      {
        id: "sophia-3",
        sender: "them",
        text: "We can go over your current routine and your goals.",
        time: "Mon",
      },
    ],
  },
];

const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const getConversations = () =>
  conversations.map((conversation) => ({
    ...conversation,
    messages: conversation.messages.map((message) => ({ ...message })),
  }));

export const subscribeToConversations = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const markConversationRead = (conversationId) => {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation || conversation.unreadCount === 0) return;

  conversation.unreadCount = 0;
  notifyListeners();
};

export const addMessageToConversation = (conversationId, text, time) => {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) return;

  const message = {
    id: `${conversationId}-${Date.now()}`,
    sender: "me",
    text,
    time,
  };

  conversation.messages.push(message);
  conversation.lastMessage = text;
  conversation.time = time;
  conversation.unreadCount = 0;
  notifyListeners();
};

export default conversations;
