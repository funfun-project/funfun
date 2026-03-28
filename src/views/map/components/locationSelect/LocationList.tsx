import { seoulDistrictList } from '@/libs/utils/locationSelect';
import ListItem from './ListItem';

export default function LocationList({ location, setLocation }: LocationState) {
  return (
    <>
      <ul className="scrollbar h-[calc(100%-112px)] max-h-[calc(100%-70px)] w-full overflow-y-auto">
        {seoulDistrictList.map((el) => {
          return (
            <ListItem key={el.name} name={el.name} location={location} setLocation={setLocation} />
          );
        })}
      </ul>
    </>
  );
}
