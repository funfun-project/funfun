import '@/assets/styles/spinner.css';

export default function Spinner() {
  return (
    <>
      <div className="spinner-container h-12.5 w-12.5">
        <div className="spinner z-10"></div>
        <div className="spinner delay-one z-20"></div>
        <div className="spinner delay-two z-30"></div>
      </div>
    </>
  );
}
