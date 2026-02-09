'use client';

import { useCreateGatheringStore } from '@/stores/useCreateGatheringStore';
import SignUpInput from '@/views/sign-up/components/SignUpInput';
import SignUpMultiSelect from '@/views/sign-up/components/SignUpMultiSelect';
import { useState } from 'react';
import { joinCategoryList, wantCategoryList } from '@/views/sign-up/data/categoryList';
import toast from 'react-hot-toast';

export default function Step1InputTitle() {
  const [titleError, settitleError] = useState('');
  // 주스탄드 state 값 구조분해 x -> 분리해서 사용
  const { form, setForm } = useCreateGatheringStore();

  const handlePosttitleCode = () => {
    const title = form.title || '';
    const titleRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!titleRegex.test(title)) {
      settitleError('이메일 형식이 올바르지 않습니다.');
      return;
    }
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
          <h1 className="text-h2">모임을 설정해 주세요</h1>
        </div>
        <div>
          <h3 className="text-main mt-1.25 -mb-3.75">제목</h3>
          <SignUpInput
            label=""
            value={form.title || ''}
            onChange={(v) => setForm({ title: v })}
            error={titleError}
            enterSubmit={() => form.title && handlePosttitleCode()}
          />
        </div>

        <div className="mt-2.5">
          {/* 카테고리 */}
          <h3 className="text-main my-1.25">카테고리</h3>
          <SignUpMultiSelect
            label=""
            value={form.joinCategory || []}
            options={joinCategoryList}
            onChange={(selected) => setForm({ joinCategory: selected })}
            inputStyle={inputStyle}
            max={1}
          />
        </div>
      </div>
      <div>
        {/* {!istitleCodeInput && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.title ? 'cursor-pointer border-[#FF5126] bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.title}
            onClick={handlePosttitleCode}
          >
            {!isPending ? '인증 메일 전송' : '인증번호 전송 중'}
          </button>
        )}

        {istitleCodeInput && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.titleCode ? 'cursor-pointer bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.titleCode}
            onClick={handleCompletetitleCode}
          >
            {!isVerifying ? '메일 인증' : '인증 확인 중...'}
          </button>
        )} */}
      </div>
    </>
  );
}
