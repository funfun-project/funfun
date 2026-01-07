'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { usePostLogin } from '@/libs/hook/user-login/useLoginMutation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const { mutate, isPending, error } = usePostLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        email,
        password: pw,
        rememberMe: true,
      },
      {
        onSuccess: () => {
          router.replace('/');
        },
        onError: () => {
          toast.error('이메일 및 비밀번호가 일치하지 않습니다.', {
            id: 'login-error',
          });
        },
      },
    );
  };

  //style

  const loginBtn =
    'flex w-full items-center justify-center gap-2 rounded-md py-4 font-semibold transition hover:brightness-110 active:brightness-95';
  const loginInput =
    'h-11 w-full rounded-md bg-[#1f1f1f] px-3 ring-1 ring-transparent outline-none placeholder:text-neutral-500 focus:ring-orange-600';

  return (
    <main className="flex min-h-dvh w-full justify-center bg-neutral-900">
      <section className="relative w-full max-w-[750px] px-4 pt-4 pb-10 text-white">
        <header className="flex h-10 items-center">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="-ml-1 rounded p-1 hover:bg-white/10"
          >
            <IoIosArrowBack size={22} />
          </button>
        </header>

        <div className="my-28 flex w-full items-center justify-center">
          <img src="/img/Login_logo.png" alt="funfun 로고" className="h-[150px] w-[200px]" />
        </div>

        <form className="space-y-4" autoComplete="off" noValidate onSubmit={handleLogin}>
          <div>
            <label className="mb-1 block text-sm text-orange-500">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 작성해 주세요"
              className={loginInput}
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm text-orange-500">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호를 작성해 주세요"
              className={loginInput}
              required
            />
          </div>

          <button type="submit" className={`${loginBtn} bg-orange-600 text-white`}>
            로그인
          </button>
        </form>

        {/* 소셜 로그인 */}
        <div className="mt-4 space-y-3">
          <button type="button" className={`${loginBtn} bg-white text-black`}>
            <FcGoogle className="text-xl" />
            Google로 시작하기
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-neutral-400">
          아직 FUNFUN의 회원이 아니신가요?
          <Link href={'/signup'} className="ml-5 font-semibold text-orange-500 hover:underline">
            회원가입
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            로그인 시 서비스의 개인정보 처리방침과
            <br />
            위치정보 서비스 이용약관에 동의한 것으로 간주 됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
