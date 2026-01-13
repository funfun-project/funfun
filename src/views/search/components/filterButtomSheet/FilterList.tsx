import { Dispatch, SetStateAction } from 'react';
import ListItem from './ListItem';

type Props = {
  items: string[];
  toggle?: null | string;
  setToggle?: Dispatch<SetStateAction<string>>;
};

export default function FilterList({ items, toggle, setToggle }: Props) {
  return (
    <>
      <ul className="scrollbar w-full overflow-y-auto">
        {items.map((el) => {
          return <ListItem key={el} name={el} toggle={toggle} setToggle={setToggle} />;
        })}
      </ul>
    </>
  );
}
