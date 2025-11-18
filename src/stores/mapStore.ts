import { create } from 'zustand';

type MapStore = {
  location: null | string;
  eventType: null | string;
  // startTimeUpdate: (time: string) => void;
  // endTimeUpdate: (time: string) => void;
  // locationUpdate: () => void;
  // eventTypeUpdate: () => void;
};

export const useMapStore = create<MapStore>((set, get) => ({
  location: null,
  eventType: null,
}));
