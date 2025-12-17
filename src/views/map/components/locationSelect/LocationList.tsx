import { seoulDistrictList } from '@/libs/utils/locationSelect';
import ListItem from './ListItem';
export default function LocationList({ location, setLocation }: LocationState) {
  return (
    <>
      <ul className="w-full">
        {seoulDistrictList.map((el) => {
          return (
            <ListItem key={el.name} name={el.name} location={location} setLocation={setLocation} />
          );
        })}
      </ul>
    </>
  );
}
