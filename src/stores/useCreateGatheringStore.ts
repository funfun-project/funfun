import { create } from 'zustand';

interface CreateGatheringForm {
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  category: string;
  joinCategory: string[];
  maxPeople: number;
  latitude: number;
  longitude: number;
  image: File | null;
  hashTags: string[];
  during: number;
}

interface CreateGatheringStore {
  form: CreateGatheringForm;
  step: number;
  setForm: (data: Partial<CreateGatheringForm>) => void;
  setStep: (num: number) => void;
  reset: () => void;
}

const initialForm: CreateGatheringForm = {
  title: '',
  explain: '',
  simpleExplain: '',
  placeName: '',
  groupDate: '',
  address: '',
  category: '',
  joinCategory: [],
  maxPeople: 2,
  latitude: 0,
  longitude: 0,
  image: null,
  hashTags: [],
  during: 0,
};

export const useCreateGatheringStore = create<CreateGatheringStore>((set) => ({
  form: initialForm,
  step: 1,
  setForm: (data) => set((state) => ({ form: { ...state.form, ...data } })),
  setStep: (num) => set({ step: num }),
  reset: () => set({ form: initialForm, step: 1 }),
}));
