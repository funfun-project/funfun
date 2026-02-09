'use client';
import StepProgressBar from '@/common/StepProgressBar';
import { useCreateGatheringStore } from '@/stores/useCreateGatheringStore';
import Step1 from './page/Step1-input-title';
import Step2 from './page/Step2-input-date';
import Step3 from './page/Step3-input-info';
import Step4 from './page/Step4-complete';
import { useState } from 'react';
import { cn } from '@/libs/utils/twMerge';
export default function GatheringCreate() {
  // const step = useCreateGatheringStore((state) => state.step);
  const [step, setStep] = useState(3);

  return (
    <div className="flex justify-center bg-black">
      <div
        className={cn(
          'flex h-screen w-full flex-col bg-black pt-20',
          step === 3 ? 'px-none pb-none' : 'px-4 pb-8',
        )}
      >
        {/* <h2 className="text-white text-xl flex justify-center items-center py-2">
            회원가입
          </h2> */}
        <div className={cn(step === 3 ? 'px-4' : 'px-0')}>
          <StepProgressBar step={step} total={3} activeColor="#FF5126" inactiveColor="#3A3A3A" />
        </div>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>
    </div>
  );
}
