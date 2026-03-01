'use client';

interface FormSectionHeaderProps {
  title: string;
  description?: string;
}

export default function FormSectionHeader({ title, description }: FormSectionHeaderProps) {
  return (
    <div className="text-white">
      <h2 className="mb-2.5 text-2xl font-semibold">{title}</h2>

      {description && (
        <p className="text-xs leading-none font-medium text-gray-500">{description}</p>
      )}
    </div>
  );
}
