export interface DetailInfo {
  title: string;
  local: string;
  category: string;
  imageURL?: string;
  time: string;
  date: string[];
  age?: string;
  tickets?: string[];
}
export type DetailProps = {
  data: DetailInfo;
  className?: string;
};
