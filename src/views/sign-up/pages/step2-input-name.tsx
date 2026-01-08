'use client';

import { useSignUpStore } from '@/stores/useSignUpStore';
import React, { useState } from 'react';

import toast from 'react-hot-toast';
import SignUpPasswordInput from '../components/PasswordInput';
import SignUpInput from '../components/SignUpInput';
import { useVerifyNickname } from '@/libs/hook/use-sign-up/useSignUpHook';

export default function Step1InputName() {
  const { step, form, setForm, setStep } = useSignUpStore();

  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const { mutateAsync: verifyNickname } = useVerifyNickname();
  const [isNameInput, setIsNameInput] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [isPasswordInput2, setIsPasswordInput2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toastStyle = {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '16px',
    marginBottom: '80px',
  };

  const handleCheckNickname = async (): Promise<void> => {
    const nickname = form.name || '';

    const handleValidateNickname = (nickname: string): boolean => {
      const nicknameRegex = /^[a-z0-9가-힣]{1,8}$/;
      return nicknameRegex.test(nickname);
    };

    if (!handleValidateNickname(nickname)) {
      setNicknameError('소문자·한글·숫자로만 구성된 8자 이내로 입력해 주세요.');
      toast.error('닉네임 형식을 확인해주세요', {
        position: 'bottom-center',
        style: toastStyle,
      });
      return;
    }

    try {
      const { isDuplicate } = await verifyNickname(nickname);

      if (isDuplicate) {
        setNicknameError('중복된 닉네임입니다.');
        toast.error('중복된 닉네임입니다.', {
          position: 'bottom-center',
          style: toastStyle,
        });
        return;
      }

      setNicknameError('');
      toast.success('사용 가능한 닉네임입니다.', {
        position: 'bottom-center',
        style: toastStyle,
      });

      setIsNameInput(true);
      setIsPasswordInput(true);
    } catch {
      toast.error('닉네임 확인 중 오류가 발생했습니다.', {
        position: 'bottom-center',
        style: toastStyle,
      });
    }
  };

  ///비밀번호 설정

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;

  const handlePasswordNext = () => {
    const password = form.password || '';
    if (!passwordRegex.test(password)) {
      setPasswordError('소문자·숫자·특수문자를 포함한 8~16자를 입력해 주세요.');
      toast.error('비밀번호 형식을 확인하세요', {
        position: 'bottom-center',
        style: toastStyle,
      });
      return;
    }
    setPasswordError('');
    setIsPasswordInput2(true);
  };

  //비밀번호 일치검사

  const handlePasswordMatch = () => {
    const password = form.password || '';
    const confirmPassword = form.confirmPassword || '';

    if (confirmPassword === '') {
      setPasswordMatch('비밀번호를 입력해 주세요');
    }
    if (password === confirmPassword) {
      setPasswordError('');
      toast.success('비밀번호가 일치합니다!', {
        position: 'bottom-center',
        style: toastStyle,
      });
      setStep(step + 1);
    } else {
      setPasswordMatch('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>계정을 설정해주세요</h2>
          <p>닉네임과 비밀번호를 설정해 주세요</p>
        </div>

        <div className="mt-5">
          <SignUpInput
            label="소문자·한글·숫자로만 구성된 8자 이내"
            value={form.name || ''}
            onChange={(v) => setForm({ name: v })}
            error={nicknameError}
          />
          {nicknameError && <p className="mt-1 text-sm text-[#FF5126]">{nicknameError}</p>}
        </div>
        <div className="mt-5">
          {isPasswordInput && (
            <SignUpPasswordInput
              label="비밀번호"
              value={form.password || ''}
              onChange={(v) => setForm({ password: v })}
              error={passwordError}
            />
          )}
          {passwordError && <p className="mt-1 text-sm text-[#FF5126]">{passwordError}</p>}
        </div>
        <div>
          {isPasswordInput2 && (
            <SignUpPasswordInput
              label="비밀번호 확인"
              value={form.confirmPassword || ''}
              onChange={(v) => setForm({ confirmPassword: v })}
              error={passwordMatch}
            />
          )}
        </div>
      </div>

      <div>
        {!isNameInput && (
          <button
            className={`w-full rounded-md py-4 text-white ${
              form.name ? 'cursor-pointer bg-[#FF5126]' : 'bg-gray-600'
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
              form.password ? 'cursor-pointer bg-[#FF5126]' : 'bg-gray-600'
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
              form.confirmPassword ? 'cursor-pointer bg-[#FF5126]' : 'bg-gray-600'
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
