import toast from 'react-hot-toast';

export const showToast = (message: string) => {
  toast.custom(
    (t) => (
      <div
        className={`animate-slideUp /* 🔥 버튼보다 위로 */ fixed bottom-28 left-1/2 z-[9999] w-[90%] max-w-md -translate-x-1/2 rounded-md border-t-4 border-[#FF5126] bg-[#2B2B2B] px-6 py-4 text-center text-white shadow-lg`}
      >
        {message}
      </div>
    ),
    {
      duration: 2500,
    },
  );
};
