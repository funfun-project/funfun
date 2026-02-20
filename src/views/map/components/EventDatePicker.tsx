'use client';
import BottomSheet from '@/common/BottomSheet';
import TimeWheel from '@/common/datetimePicker/components/TimeWheel';
import { useState } from 'react';
import { getNowTime } from '@/libs/utils/wheelDate';
import Button from '@/common/Button';
import { cn } from '@/libs/utils/twMerge';
import { X } from 'lucide-react';

export default function EventDatePicker({ showValue }: { showValue: boolean }) {
  const [show, setShow] = useState(showValue);

  const showHandler = () => {
    setShow(false);
  };

  const [startTime, setStartTime] = useState<PickerValue>({
    time: getNowTime(),
  });
  const [endTime, setEndTime] = useState<PickerValue>({
    time: getNowTime(),
  });
  return (
    <>
      <BottomSheet show={show} className="md:px-5">
        <div className="mt-[20px] flex w-full flex-col gap-2.5">
          <div className="flex justify-between">
            <h2 className="text-body2 text-text-default">title</h2>
            <X
              onClick={showHandler}
              fill="none"
              size={24}
              className="text-icon-default hover:text-icon-active cursor-pointer"
            />
          </div>
          <div className="text-icon-default flex flex-col gap-2.5">
            <p>2025.07.29 - 2025.08.31</p>
            <p>월요일 - 목요일 10:30 - 20:00</p>
          </div>
        </div>
        <div className="my-6.25 w-full rounded-[5px] bg-[#2E2D2D] py-5">
          <div className="flex w-full justify-between">
            <div className="flex w-[calc(50%-0.5px)] flex-col justify-around">
              <h3 className="text-text-default mb-[25px] text-center text-[16px]">시작 시간</h3>
              <TimeWheel value={startTime} setValue={setStartTime} />
            </div>
            <div className="w-[1px] bg-[#1F1F1F]"></div>
            <div className="flex w-[calc(50%-0.5px)] flex-col justify-around">
              <h3 className="text-text-default mb-[25px] text-center text-[16px]">종료 시간</h3>
              <TimeWheel value={endTime} setValue={setEndTime} />
            </div>
          </div>
        </div>
        <Button>완료</Button>
      </BottomSheet>
    </>
  );
}
