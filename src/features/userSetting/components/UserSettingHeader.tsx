import { ChevronLeft } from 'lucide-react';

interface UserSettingHeaderProps {
  title: string;
}

export default function UserSettingHeader({ title }: UserSettingHeaderProps) {
  return (
    <header className="text-text-default relative flex items-center justify-center p-4">
      <button className="absolute left-4">
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-body1">{title}</h1>
    </header>
  );
}
