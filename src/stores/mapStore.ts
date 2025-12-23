import { create } from 'zustand';

type Coordinates = {
  location: null | string;
  longitude: null | number;
  latitude: null | number;
};

type LocationUpdateAction = (
  nweLocation: string | null,
  longitude: number | null,
  latitude: number | null,
) => void;
type EventTypeUpdateAction = (type: string) => void;

type MapStore = {
  location: Coordinates;
  eventType: null | string;
  locationUpdate: LocationUpdateAction;
  eventTypeUpdate: EventTypeUpdateAction;
};

export const useMapStore = create<MapStore>((set) => ({
  location: {
    location: null,
    longitude: null,
    latitude: null,
  },
  eventType: null,
  locationUpdate: (nweLocation, newLongitude, newLatitude) => {
    set(() => ({
      location: {
        location: nweLocation,
        longitude: newLongitude,
        latitude: newLatitude,
      },
    }));
  },
  eventTypeUpdate: (type) => {
    set(() => ({ eventType: type }));
  },
}));
