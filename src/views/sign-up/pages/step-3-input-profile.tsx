'use client';

import { useSignUpStore } from '@/stores/useSignUpStore';
import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

import toast from 'react-hot-toast';
import SignUpInput from '../components/SignUpInput';
import SignUpSelect from '../components/SignUpSelect';
import AddressSearch from '@/common/AddressSearch';

export default function StepInputProfile() {
  const { step, setStep, setForm, form } = useSignUpStore();
  const [birthError, setBirthError] = useState('');
  const [adressError, setAdressError] = useState('');

  const [isBirthInput, setIsBirthInput] = useState(false);
  const [isGenderSelect, setIsGenderSelect] = useState(false);
  const [isAdressInput, setIsAdressInput] = useState(false);
  const [gender, setGender] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    //    setGender(event.target.value);
    const value = event.target.value;
    if (value === '남성' || value === '여성') {
      setForm({ gender: value });
    }
  };

  const toastStyle = {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '16px',
    marginBottom: '80px',
  };

  const handleCheckBirth = () => {
    const birth = form.birth || '';
    const birthRegex = /^\d{8}$/;

    if (!birthRegex.test(birth)) {
      setBirthError('YYYYMMDD 형식에 맞춰 입력해 주세요');
      toast.error('생년월일 형식을 확인해주세요.', {
        position: 'bottom-center',
        style: toastStyle,
      });
      return;
    }

    //birth 확인
    const year = Number(birth.slice(0, 4));
    const month = Number(birth.slice(4, 6));
    const day = Number(birth.slice(6, 8));

    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;

    if (!isValidDate) {
      setBirthError('유효하지 않은 날짜입니다. 다시 확인해 주세요.');
      toast.error('올바른 생년월일을 입력해주세요.', {
        position: 'bottom-center',
        style: toastStyle,
      });
      return;
    }
    setBirthError('');
    toast.success('생년월일이 확인되었습니다.', {
      position: 'bottom-center',
      style: toastStyle,
    });

    setIsBirthInput(true);
    setIsGenderSelect(true);
  };

  //주소확인

  const handleCheckAdress = () => {
    const adress = form.adress;

    if (!adress || adress.trim() === '') {
      setAdressError('주소를 입력해주세요');
      toast.error('주소를 입력해주세요', {
        position: 'bottom-center',
        style: toastStyle,
      });
      return;
    }
    setAdressError('');
    toast.success('주소가 확인되었습니다.', {
      position: 'bottom-center',
      style: toastStyle,
    });
    setStep(step + 1);
  };

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
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>프로필 정보를 입력해주세요</h2>
          <p>생년월일 · 성별 · 주소를 입력해주세요</p>
        </div>
        <div>
          <div className="mt-5">
            <SignUpInput
              label="생년월일 (YYYYMMDD)"
              value={form.birth || ''}
              onChange={(v) => setForm({ birth: v })}
              error={birthError}
            />
            {/* <TextField
              fullWidth
              label="생년월일 (YYYYMMDD)"
              variant="outlined"
              value={form.birth || ""}
              onChange={(e) => setForm({ birth: e.target.value })}
              sx={inputStyle}
            />
            {birthError && (
              <p className="text-[#FF5126] text-sm mt-1 ">{birthError}</p>
            )} */}
          </div>
        </div>

        <div>
          {isGenderSelect && (
            <SignUpSelect
              label="gender"
              value={form.gender || ''}
              options={['남성', '여성']}
              onChange={(v) => setForm({ gender: v })}
            />
          )}
          {/* {isGenderSelect && (
            <FormControl sx={{ width: "100%", ...inputStyle }}>
              <InputLabel id="demo-simple-select-helper-label">
                gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={form.gender || ""}
                label="gender"
                onChange={handleChange}nnpm 
                sx={{ color: "white" }}
              >
                <MenuItem value={"남성"}>남성</MenuItem>
                <MenuItem value={"여성"}>여성</MenuItem>
              </Select>
            </FormControl>
          )} */}
        </div>

        {isAdressInput && (
          <AddressSearch
            value={form.adress}
            onSelect={(selectedAddress) => setForm({ adress: selectedAddress })}
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {!isGenderSelect && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.birth ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.birth}
            onClick={handleCheckBirth}
          >
            다음
          </button>
        )}

        {isGenderSelect && !isAdressInput && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.gender ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.gender}
            onClick={() => setIsAdressInput(true)}
          >
            다음
          </button>
        )}

        {isAdressInput && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.adress ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.adress}
            onClick={handleCheckAdress}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
