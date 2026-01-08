'use client';

import StepProgressBar from '@/common/StepProgressBar';
import { useSignUpStore } from '@/stores/useSignUpStore';
import Step1InputEmail from './pages/step1-input-email';
import Step1InputName from './pages/step2-input-name';
import StepInputProfile from './pages/step-3-input-profile';
import StepInputCategory from './pages/step4-input-category';
import StepSignUpComplete from './pages/step5-input-complete';

export default function SignUpContainer() {
  const { step } = useSignUpStore();

  return (
    <div className="flex justify-center bg-black">
      <div className="flex h-screen w-[700px] flex-col bg-black p-4 pt-20 pb-8">
        {/* <h2 className="text-white text-xl flex justify-center items-center py-2">
          회원가입
        </h2> */}
        <StepProgressBar step={step} total={4} activeColor="#FF5126" inactiveColor="#3A3A3A" />
        {step === 1 && <Step1InputEmail />}
        {step === 2 && <Step1InputName />}
        {step === 3 && <StepInputProfile />}
        {step === 4 && <StepInputCategory />}
        {step === 5 && <StepSignUpComplete />}
      </div>
    </div>
  );
}
