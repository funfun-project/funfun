'use client';

import { useSignUpStore } from '@/stores/useSignUpStore';
import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

import SignUpInput from '../components/SignUpInput';
import SignUpSelect from '../components/SignUpSelect';
import AddressSearch from '@/common/AddressSearch';
import FormSectionHeader from '../components/FormSectionHeader';
import { showToast } from '@/views/toast/showToast';

export default function StepInputProfile() {
  const { step, setStep, setForm, form } = useSignUpStore();
  const [birthError, setBirthError] = useState('');
  const [adressError, setAdressError] = useState('');

  const [isBirthInput, setIsBirthInput] = useState(false);
  const [isGenderSelect, setIsGenderSelect] = useState(false);
  const [isAdressInput, setIsAdressInput] = useState(false);
  const [gender, setGender] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === '남성' || value === '여성') {
      setForm({ gender: value });
    }
  };

  const handleCheckBirth = () => {
    const birth = form.birth || '';
    const birthRegex = /^\d{8}$/;

    if (!birthRegex.test(birth)) {
      setBirthError('YYYYMMDD 형식에 맞춰 입력해 주세요');
      showToast('생년월일 형식을 확인해 주세요');
      return;
    }

    const year = Number(birth.slice(0, 4));
    const month = Number(birth.slice(4, 6));
    const day = Number(birth.slice(6, 8));

    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;

    if (!isValidDate) {
      setBirthError('유효하지 않은 날짜입니다. 다시 확인해 주세요.');
      showToast('생년월일 형식을 확인해 주세요');
      return;
    }

    setBirthError('');
    setIsBirthInput(true);
    setIsGenderSelect(true);
  };

  const handleCheckAdress = () => {
    const adress = form.adress;

    if (!adress || adress.trim() === '') {
      setAdressError('주소를 입력해주세요');
      showToast('유효하지 않은 주소 정보 입니다');
      return;
    }

    setAdressError('');
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
        <FormSectionHeader
          title="프로필 정보를 입력해 주세요"
          description="생년월일 · 성별 · 주소를 입력해주세요"
        />

        <div>
          <div className="mt-5">
            <SignUpInput
              value={form.birth || ''}
              onChange={(v) => setForm({ birth: v })}
              error={birthError}
              placeholder="생년월일 (YYYYMMDD)"
            />
          </div>
        </div>

        <div>
          {isGenderSelect && (
            <SignUpSelect
              value={form.gender || ''}
              options={['남성', '여성']}
              onChange={(v) => setForm({ gender: v })}
            />
          )}
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
