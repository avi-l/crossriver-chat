import { create } from 'zustand';

interface IUserStore {
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
}
export const useUserStore = create<IUserStore>((set) => ({
  avatar: null,
  setAvatar: (avatar) => set({ avatar }),
  displayName: '',
  setDisplayName: (name) => set({ displayName: name }),
}));
