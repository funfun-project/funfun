type Props = {
  onSubmit: () => void;
  onToggle: () => void;
};

export default function SubmitButton({ onSubmit, onToggle }: Props) {
  return (
    <>
      <button
        onClick={() => {
          onSubmit();
          onToggle();
        }}
        className="text-text-default bg-main mt-[18px] h-[52px] w-[calc(100%)] rounded-[3px] text-center text-[18px] leading-[52px] font-semibold"
      >
        선택 완료
      </button>
    </>
  );
}
