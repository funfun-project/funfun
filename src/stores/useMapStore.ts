import { create } from 'zustand';
import { searchCoordinateToAddress } from '@/libs/utils/naverMap';
import { extractDistrict } from '@/libs/utils/locationSelect';

type Coordinate = {
  longitude: number;
  latitude: number;
};

type PlaceName = string | null;

type SetPlaceNameAction = (name: PlaceName) => void;

type SetCoordinateAction = (longitude: number, latitude: number) => void;

type SetEventTypeAction = (type: string) => void;

type SetGatheringFilter = (filter: string | null) => void;

type MapStore = {
  placeName: PlaceName;
  coordinate: Coordinate;
  eventType: string | null;
  gatheringFilter: string | null; // 추가

  // Actions
  setPlaceName: SetPlaceNameAction;
  setCoordinate: SetCoordinateAction;
  setEventType: SetEventTypeAction;
  setGatheringFilter: SetGatheringFilter;

  fetchAndSetAddress: (lng: number, lat: number) => Promise<void>;
};

export const useMapStore = create<MapStore>((set) => ({
  placeName: null,
  coordinate: {
    //x
    longitude: 126.977,
    //y
    latitude: 37.594,
  },

  eventType: null,
  gatheringFilter: null,

  setPlaceName: (name) => set(() => ({ placeName: name })),

  setCoordinate: (longitude, latitude) =>
    set(() => ({
      coordinate: { longitude, latitude },
    })),

  setEventType: (type) =>
    set({
      eventType: type,
      gatheringFilter: null,
    }),
  setGatheringFilter: (filter) => set({ gatheringFilter: filter }),
  fetchAndSetAddress: async (lng, lat) => {
    try {
      // 1. 좌표로 주소 문자열 가져오기 (예: 카카오/구글 API 호출)
      const addressString = await searchCoordinateToAddress(lng, lat);

      // 2. 가져온 주소를 파라미터로 넣어 리턴값 받기 (가공 로직)
      const processedName = extractDistrict(addressString);

      // 3. 최종적으로 스토어 상태 업데이트
      set({
        // coordinate: { longitude: lng, latitude: lat },
        placeName: processedName,
      });
    } catch (error) {
      console.error('주소를 가져오는 데 실패했습니다.', error);
    }
  },
}));
