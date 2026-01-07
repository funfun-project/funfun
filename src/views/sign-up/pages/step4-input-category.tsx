'use client';

import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { usePostSignUp } from '@/libs/hook/use-sign-up/useSignUpHook';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { SignUpPayload } from '@/types/signUpPayLoad.types';
import { convertToSignUpPayload } from '@/libs/hook/use-sign-up/useConvertSignUp';
import SignUpMultiSelect from '../components/SignUpMultiSelect';
import { joinCategoryList, wantCategoryList } from '../data/categoryList';

export default function StepInputCategory() {
  const { step, setStep, form, setForm, reset } = useSignUpStore();
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const { mutate } = usePostSignUp();

  const handleSignUp = () => {
    if (!form.email || !form.password || !form.name) {
      toast.error('필수 정보가 누락되었습니다.');
      return;
    }
    console.log('회원가입 요청 데이터:', form);

    const payload: SignUpPayload = convertToSignUpPayload(form);
    mutate(payload, {
      onSuccess: (data) => {
        console.log('회원가입 성공:', data);
        toast.success('회원가입이 완료되었습니다!');
        reset();
        setStep(step + 1);
      },
      onError: (err: Error) => {
        console.error('회원가입 실패:', err);
        toast.error('회원가입 중 오류가 발생했습니다.');
      },
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
        <div className="text-white">
          <h2>카테고리를 선택해 주세요</h2>
          <p>취향에 알맞는 컨텐츠를 추천해 드려요</p>
        </div>
        <div>
          <SignUpMultiSelect
            label="카테고리"
            value={form.joinCategory || []}
            options={joinCategoryList}
            onChange={(selected) => setForm({ joinCategory: selected })}
            inputStyle={inputStyle}
          />
          {/* <FormControl sx={{ width: "100%", ...inputStyle }}>
            <InputLabel id="join-category-label">카테고리</InputLabel>

            <Select
              labelId="join-category-label"
              id="join-category"
              multiple
              value={form.joinCategory || []}
              onChange={(e) => {
                const value = e.target.value;
                const selected =
                  typeof value === "string" ? value.split(",") : value;

                if (selected.length > 3) {
                  toast.error("최대 3개까지만 선택 가능합니다.");
                  console.log("지금 선택한 값:", selected);
                  return;
                }

                setForm({ joinCategory: selected });
              }}
              input={<OutlinedInput label="카테고리" />}
              MenuProps={MenuProps}
              sx={{ color: "white" }}
            >
              {joinCategoryList.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </div>
        {isCategorySelect && (
          <SignUpMultiSelect
            label="관심 카테고리"
            value={form.wantCategory || []}
            options={wantCategoryList}
            onChange={(selected) => setForm({ wantCategory: selected })}
            inputStyle={inputStyle}
          />
        )}
        {/* {isCategorySelect && (
          <FormControl sx={{ width: "100%", ...inputStyle, mt: 3 }}>
            <InputLabel id="want-category-label">관심 카테고리</InputLabel>

            <Select
              labelId="want-category-label"
              id="want-category"
              multiple
              value={form.wantCategory || []}
              onChange={(e) => {
                const value = e.target.value;
                const selected =
                  typeof value === "string" ? value.split(",") : value;

                if (selected.length > 3) {
                  toast.error("최대 3개까지만 선택 가능합니다.");
                  console.log("지금 선택한 값:", selected);
                  return;
                }
                setForm({ wantCategory: selected });
              }}
              input={<OutlinedInput label="관심 카테고리" />}
              MenuProps={MenuProps}
              sx={{ color: "white" }}
            >
              {wantCategoryList.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )} */}
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
// const MenuProps = {
//   PaperProps: {
//     sx: {
//       bgcolor: "gr",
//       color: "gray",
//       "& .MuiMenuItem-root": {
//         color: "gray",
//       },

//       "& .MuiMenuItem-root:hover": {
//         color: "white",
//         bgcolor: "#FF5126",
//       },
//       "& .Mui-selected": {
//         color: "white",
//         bgcolor: "#333 !important",
//         fontWeight: "bold",
//       },
//     },
//   },
// };
