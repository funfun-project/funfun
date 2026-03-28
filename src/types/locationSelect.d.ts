type LocationState = {
  location: string | null;
  setLocation: (selected: string) => void;
};

type ListItemProps = {
  name: string;
} & LocationState;
