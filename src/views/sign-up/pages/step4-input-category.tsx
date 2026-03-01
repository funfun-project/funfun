'use client';

import React, { useState } from 'react';
import { usePostSignUp } from '@/libs/hook/use-sign-up/useSignUpHook';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { SignUpPayload } from '@/types/signUpPayLoad.types';
import { convertToSignUpPayload } from '@/libs/hook/use-sign-up/useConvertSignUp';
import SignUpMultiSelect from '../components/SignUpMultiSelect';
import { joinCategoryList, wantCategoryList } from '../data/categoryList';
import FormSectionHeader from '../components/FormSectionHeader';
import { showToast } from '@/views/toast/showToast';

export default function StepInputCategory() {
  const { step, setStep, form, setForm, reset } = useSignUpStore();
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const { mutate } = usePostSignUp();

  const handleSignUp = () => {
    if (!form.joinCategory?.length || !form.wantCategory?.length) {
      showToast('카테고리를 선택해 주세요');
      return;
    }

    if (!form.email || !form.password || !form.name) {
      return;
    }

    const payload: SignUpPayload = convertToSignUpPayload(form);

    mutate(payload, {
      onSuccess: () => {
        reset();
        setStep(step + 1);
      },
      onError: () => {},
    });
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
          title="카테고리를 선택해 주세요"
          description="취향에 알맞는 컨텐츠를 추천해 드려요"
        />
        <div>
          <SignUpMultiSelect
            placeholder="모임 카테고리를 선택해 주세요"
            value={form.joinCategory || []}
            options={joinCategoryList}
            onChange={(selected) => setForm({ joinCategory: selected })}
            inputStyle={inputStyle}
          />
        </div>

        {isCategorySelect && (
          <SignUpMultiSelect
            placeholder="컨텐츠 카테고리를 선택해 주세요"
            value={form.wantCategory || []}
            options={wantCategoryList}
            onChange={(selected) => setForm({ wantCategory: selected })}
            inputStyle={inputStyle}
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {!isCategorySelect && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.joinCategory?.length > 0 ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={form.joinCategory.length === 0}
            onClick={() => setIsCategorySelect(true)}
          >
            다음
          </button>
        )}

        {isCategorySelect && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.wantCategory.length > 0 ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={form.wantCategory.length === 0}
            onClick={handleSignUp}
          >
            회원가입 완료
          </button>
        )}
      </div>
    </>
  );
}
