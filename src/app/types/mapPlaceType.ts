type Category = '행사' | '모임' | '장소';

type Place = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: Category;
};
