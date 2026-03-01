'use client';

import { useSignUpStore } from '@/stores/useSignUpStore';
import React, { useState } from 'react';
import SignUpPasswordInput from '../components/PasswordInput';
import SignUpInput from '../components/SignUpInput';
import { useVerifyNickname } from '@/libs/hook/use-sign-up/useSignUpHook';
import FormSectionHeader from '../components/FormSectionHeader';
import { showToast } from '@/views/toast/showToast';

export default function Step1InputName() {
  const { step, form, setForm, setStep } = useSignUpStore();

  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const { mutateAsync: verifyNickname } = useVerifyNickname();

  const [isNameInput, setIsNameInput] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [isPasswordInput2, setIsPasswordInput2] = useState(false);

  const handleCheckNickname = async (): Promise<void> => {
    const nickname = form.name || '';

    const handleValidateNickname = (nickname: string): boolean => {
      const nicknameRegex = /^[a-z0-9가-힣]{1,8}$/;
      return nicknameRegex.test(nickname);
    };

    if (!handleValidateNickname(nickname)) {
      setNicknameError('소문자·한글·숫자로만 구성된 8자 이내로 입력해 주세요.');
      showToast('닉네임 형식을 확인해주세요');
      return;
    }

    try {
      const { isDuplicate } = await verifyNickname(nickname);

      if (isDuplicate) {
        setNicknameError('중복된 닉네임입니다.');
        showToast('중복된 닉네임입니다.');
        return;
      }

      setNicknameError('');
      showToast('중복 확인이 완료 됐습니다 ');
      setIsNameInput(true);
      setIsPasswordInput(true);
    } catch {
      showToast('닉네임 형식을 확인해 주세요');
    }
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;

  const handlePasswordNext = () => {
    const password = form.password || '';

    if (!passwordRegex.test(password)) {
      setPasswordError('소문자·숫자·특수문자를 포함한 8~16자를 입력해 주세요.');
      return;
    }

    setPasswordError('');
    setIsPasswordInput2(true);
  };

  const handlePasswordMatch = () => {
    const password = form.password || '';
    const confirmPassword = form.confirmPassword || '';

    if (confirmPassword === '') {
      setPasswordMatch('비밀번호를 입력해 주세요');
      return;
    }

    if (password === confirmPassword) {
      setPasswordError('');
      showToast('비밀번호가 일치합니다!');
      setStep(step + 1);
    } else {
      setPasswordMatch('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <div className="flex-1 space-y-3">
        <FormSectionHeader
          title="계정을 설정해 주세요"
          description="닉네임과 비밀번호를 설정해 주세요"
        />

        <div className="mt-5">
          <SignUpInput
            value={form.name || ''}
            onChange={(v) => setForm({ name: v })}
            error={nicknameError}
            placeholder="소문자·한글·숫자로만 구성된 8자 이내"
          />
        </div>

        <div className="mt-5">
          {isPasswordInput && (
            <SignUpPasswordInput
              value={form.password || ''}
              onChange={(v) => setForm({ password: v })}
              error={passwordError}
              placeholder="비밀번호를 입력해 주세요"
            />
          )}
        </div>

        <div>
          {isPasswordInput2 && (
            <SignUpPasswordInput
              value={form.confirmPassword || ''}
              onChange={(v) => setForm({ confirmPassword: v })}
              error={passwordMatch}
              placeholder="비밀번호를 다시 입력해 주세요"
            />
          )}
        </div>
      </div>

      <div>
        {!isNameInput && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.name ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.name}
            onClick={() => void handleCheckNickname()}
          >
            닉네임 인증
          </button>
        )}

        {isPasswordInput && !isPasswordInput2 && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.password ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.password}
            onClick={handlePasswordNext}
          >
            다음
          </button>
        )}

        {isPasswordInput2 && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.confirmPassword ? 'bg-[#FF5126]' : 'bg-gray-600'
            }`}
            disabled={!form.confirmPassword}
            onClick={handlePasswordMatch}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
