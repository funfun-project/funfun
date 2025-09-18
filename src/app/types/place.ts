export interface PlaceItem {
  id: string;
  placeURL: string;
}

export type PlaceProps = {
  items: PlaceItem[];
  className?: string;
  likeButton?: boolean;
};
