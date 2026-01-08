'use client';

import { SignUpInputProps } from '@/types/signUp-input-types';
import { TextField } from '@mui/material';

export default function SignUpInput({
  label,
  value,
  onChange,
  error,
  type = 'text',
  enterSubmit,
}: SignUpInputProps) {
  const inputStyle = {
    input: { color: 'white' },
    label: { color: 'gray' },
    '& label.Mui-focused': {
      color: '#ff5126',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'gray' },
      '&:hover fieldset': { borderColor: '#FF5126' },
      '&.Mui-focused fieldset': { borderColor: '#FF5126' },
    },
  };

  return (
    <div className="mt-5">
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        sx={inputStyle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && enterSubmit) {
            enterSubmit();
          }
        }}
      />
      {error && <p className="mt-1 text-sm text-[#FF5126]">{error}</p>}
    </div>
  );
}
