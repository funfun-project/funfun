'use client';

import { SelectInputProps } from '@/types/signUp-input-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SignUpSelect({ label, value, options, onChange, error }: SelectInputProps) {
  const inputStyle = {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF5126' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FF5126',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#FF5126' },
  };
  const MenuProps = {
    PaperProps: {
      sx: {
        bgcolor: '#292929',
        color: 'gray',

        '& .MuiMenuItem-root': {
          color: 'gray',
        },

        '&.MuiMenuItem-root:hover': {
          color: '#FF5126',
        },

        '& .Mui-selected': {
          color: '#FF5126',
          bgcolor: '#444',
        },
      },
    },
  };
  return (
    <div className="mt-5">
      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: 'gray',
            '&.Mui-focused': { color: '#FF5126' },
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
          sx={inputStyle}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && <p className="mt-1 text-sm text-[#FF5126]">{error}</p>}
    </div>
  );
}
