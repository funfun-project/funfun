import { useCreateGatheringStore } from '@/stores/useCreateGatheringStore';

const useUpdateStore = (type: string, value: string | Date | number) => {
  const setForm = useCreateGatheringStore((state) => state.setForm);
  switch (type) {
    case 'title':
      setForm({ title: value as string });
      break;
    case 'category':
      setForm({ category: value as string });
      break;
    case 'address':
      setForm({ address: value as string });
      break;
    case 'date':
      setForm({ groupDate: value as string });
      break;
    case 'maxPeople':
      setForm({ maxPeople: value as number });
      break;
    case 'during':
      setForm({ during: value as number });
      break;
    case 'explain':
      setForm({ explain: value as string });
      break;
  }
};

export default useUpdateStore;
