export const defaultUserProfile = {
  fullName: "John Doe",
  phone: "+123 567 89000",
  email: "johndoe@example.com",
  dateOfBirth: "",
};

let userProfile = { ...defaultUserProfile };
const listeners = new Set();

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const getUserProfile = () => ({ ...userProfile });

export const subscribeToUserProfile = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setUserProfile = (profile = {}) => {
  userProfile = {
    ...defaultUserProfile,
    ...profile,
  };
  notify();
};

export const updateUserProfile = (updates = {}) => {
  userProfile = {
    ...userProfile,
    ...updates,
  };
  notify();
};

export const userProfileState = () => userProfile;
