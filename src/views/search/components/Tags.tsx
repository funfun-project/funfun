import { Dispatch, SetStateAction } from 'react';

type Props = {
  name: string;
  setFilterTag: Dispatch<SetStateAction<string[]>>;
};
export default function Tags({ name, setFilterTag }: Props) {
  const removeTag = () => {
    setFilterTag((prev) => prev.filter((tag) => tag !== name));
  };
  return (
    <>
      <button
        onClick={removeTag}
        className="bg-bg-button text-body3 mr-[10px] rounded-[5px] px-[15px] py-[5px] text-white"
      >
        {name}
      </button>
    </>
  );
}
