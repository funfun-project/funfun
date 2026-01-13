export default function Tags({ name }: { name: string }) {
  return (
    <>
      <div className="bg-bg-button text-body3 mr-[10px] rounded-[5px] px-[15px] py-[5px] text-white">
        {name}
      </div>
    </>
  );
}
