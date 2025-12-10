import { create } from 'zustand';

type Coordinates = {
  longitude: null | number;
  latitude: null | number;
};

type LocationUpdateAction = (longitude: number | null, latitude: number | null) => void;
type EventTypeUpdateAction = (type: string) => void;

type MapStore = {
  location: Coordinates;
  eventType: null | string;
  locationUpdate: LocationUpdateAction;
  eventTypeUpdate: EventTypeUpdateAction;
};

export const useMapStore = create<MapStore>((set) => ({
  location: {
    longitude: null,
    latitude: null,
  },
  eventType: null,
  locationUpdate: (newLongitude, newLatitude) => {
    set(() => ({
      location: {
        longitude: newLongitude,
        latitude: newLatitude,
      },
    }));
  },
  eventTypeUpdate: (type) => {
    set(() => ({ eventType: type }));
  },
}));
