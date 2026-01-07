import { create } from 'zustand';

type Coordinate = {
  longitude: number;
  latitude: number;
};

type PlaceName = string | null;

type UpdatePlaceNameAction = (name: PlaceName) => void;

type UpdateCoordinateAction = (longitude: number, latitude: number) => void;

type UpdateEventTypeAction = (type: string) => void;

type MapStore = {
  placeName: PlaceName;
  coordinate: Coordinate;
  eventType: string | null;

  updatePlaceName: UpdatePlaceNameAction;
  updateCoordinate: UpdateCoordinateAction;
  updateEventType: UpdateEventTypeAction;
};

export const useMapStore = create<MapStore>((set) => ({
  placeName: null,
  // 37.5665, 126.978
  coordinate: {
    longitude: 126.978,
    latitude: 37.5665,
  },

  eventType: null,

  updatePlaceName: (name) => set(() => ({ placeName: name })),

  updateCoordinate: (longitude, latitude) =>
    set(() => ({
      coordinate: { longitude, latitude },
    })),

  updateEventType: (type) => set(() => ({ eventType: type })),
}));
