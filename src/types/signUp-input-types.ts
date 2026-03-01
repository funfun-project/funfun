import { SelectProps, SxProps, Theme } from '@mui/material';

export interface SignUpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;

  enterSubmit?: () => void;
}
export interface PassWordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}
export interface SelectInputProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}
export interface SignUpMultiSelectProps {
  value: string[];
  options: string[];
  max?: number;
  placeholder?: string;
  onChange: (value: string[]) => void;
  MenuProps?: SelectProps['MenuProps'];
  inputStyle?: SxProps<Theme>;
}
export interface VerifyNicknameResponse {
  isDuplicate: boolean;
}
