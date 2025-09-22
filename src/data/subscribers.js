// Simple in-memory storage for newsletter subscribers
// In production, you'd want to use a database like MongoDB, PostgreSQL, or a service like Mailchimp

let subscribers = [];

export const addSubscriber = (email) => {
  // Check if email already exists
  if (!subscribers.find(sub => sub.email === email)) {
    const newSubscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      id: Date.now().toString()
    };
    subscribers.push(newSubscriber);
    return { success: true, subscriber: newSubscriber };
  }
  return { success: false, message: 'Email already subscribed' };
};

export const getAllSubscribers = () => {
  return subscribers;
};

export const removeSubscriber = (email) => {
  const index = subscribers.findIndex(sub => sub.email === email);
  if (index > -1) {
    subscribers.splice(index, 1);
    return { success: true };
  }
  return { success: false, message: 'Email not found' };
};

export const getSubscriberCount = () => {
  return subscribers.length;
};
