'use client';

import { useState } from 'react';
import { useUpdateProfile } from '@/libs/api/userInfos/hook/useUpdateProfile';
import { UserInfo, UpdateUserInfoPayload } from '@/libs/api/userInfos/types/userInfos';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface ProfileFormProps {
  userInfo: UserInfo;
}

export default function ProfileForm({ userInfo }: ProfileFormProps) {
  const { updateProfileMutation } = useUpdateProfile();

  const [nickname, setNickname] = useState(userInfo.nickname);
  const [introduction, setIntroduction] = useState(userInfo.bio || '');
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || '');
  const [image, setImage] = useState<File | null>(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(userInfo.profileImageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error('이미지 파일 크기는 3MB 이하여야 합니다.');
        return;
      }
      setImage(file);
      setImageChanged(true);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageChanged(true);
    setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdateUserInfoPayload = {
      nickname,
      introduction,
      phoneNumber,
      image,
      imageChanged,
    };

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('프로필이 수정되었습니다.');
      },
      onError: (error) => {
        toast.error('프로필 수정에 실패했습니다.');
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-bg-input relative h-24 w-24 overflow-hidden rounded-full">
          {previewUrl ? (
            <Image src={previewUrl} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="text-text-disabled flex h-full w-full items-center justify-center">
              No Image
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <label
            htmlFor="image-upload"
            className="bg-bg-button text-text-default hover:bg-opacity-80 cursor-pointer rounded-md px-4 py-2 text-sm"
          >
            이미지 변경
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleImageDelete}
            className="bg-bg-button text-text-support hover:bg-opacity-80 rounded-md px-4 py-2 text-sm"
          >
            삭제
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nickname" className="text-body2 text-text-support">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border-border bg-bg-input text-text-default focus:border-main rounded-md border p-3 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="introduction" className="text-body2 text-text-support">
          소개
        </label>
        <textarea
          id="introduction"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          rows={3}
          className="border-border bg-bg-input text-text-default focus:border-main rounded-md border p-3 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="text-body2 text-text-support">
          전화번호
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border-border bg-bg-input text-text-default focus:border-main rounded-md border p-3 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={updateProfileMutation.isPending}
        className="bg-main text-text-default hover:bg-opacity-90 mt-4 rounded-md py-3 font-bold transition-colors disabled:opacity-50"
      >
        {updateProfileMutation.isPending ? '수정 중...' : '저장하기'}
      </button>
    </form>
  );
}
