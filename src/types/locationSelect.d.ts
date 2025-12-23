type LocationState = {
  location: string;
  setLocation: (selected: string) => void;
};

type ListItemProps = {
  name: string;
} & LocationState;
