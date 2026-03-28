'use client';

import { SignUpMultiSelectProps } from '@/types/signUp-input-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import toast from 'react-hot-toast';

export default function SignUpMultiSelect({
  label,
  value,
  options,
  onChange,

  max = 3,
  inputStyle,
}: SignUpMultiSelectProps) {
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const val = e.target.value;
    const selected = typeof val === 'string' ? val.split(',') : val;

    if (selected.length > max) {
      toast.error(`최대 ${max}개까지만 선택 가능합니다.`);
      return;
    }

    onChange(selected);
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
    <FormControl sx={{ width: '100%', ...inputStyle }}>
      <InputLabel>{label}</InputLabel>

      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        sx={{ color: 'white' }}
      >
        {options.map((opt, index) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
