import { create } from 'zustand';

type Coordinate = {
  longitude: number | null;
  latitude: number | null;
};

type PlaceName = string | null;

type UpdatePlaceNameAction = (name: PlaceName) => void;

type UpdateCoordinateAction = (longitude: number | null, latitude: number | null) => void;

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

  coordinate: {
    longitude: null,
    latitude: null,
  },

  eventType: null,

  updatePlaceName: (name) => set(() => ({ placeName: name })),

  updateCoordinate: (longitude, latitude) =>
    set(() => ({
      coordinate: { longitude, latitude },
    })),

  updateEventType: (type) => set(() => ({ eventType: type })),
}));
