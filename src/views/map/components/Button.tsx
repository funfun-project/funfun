interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <>
      <button>{children}</button>
    </>
  );
}
