interface Props {
  startTime: PickerValue;
  endTime: PickerValue;
}

export default function Button({ startTime, endTime }: Props) {
  function submitHandler() {
    console.log(startTime, endTime);
  }
  return (
    <>
      <button
        onClick={submitHandler}
        className="text-text-default bg-main h-[52px] w-full rounded-[3px] text-center text-[18px] leading-[52px] font-semibold"
      >
        완료
      </button>
    </>
  );
}
