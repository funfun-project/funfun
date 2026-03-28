'use client';

import { AddressSearchProps } from '@/types/Address.types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddressSearch({ value, onSelect }: AddressSearchProps) {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toastStyle = {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '16px',
    marginBottom: '80px',
  };

  const handleClickAddressSearch = () => {
    if (!window.daum?.Postcode) {
      toast.error('주소검색 모듈이 아직 로드되지 않았습니다.', {
        position: 'bottom-center',
        style: toastStyle,
      });
      return;
    }

    const postcode = new window.daum.Postcode({
      oncomplete: (data) => {
        const fullAddress = data.address;
        const region = data.sido ?? data.region_1depth_name ?? '';

        if (region !== '서울') {
          setError('서울 이외의 지역은 선택할 수 없습니다.');
          onSelect('');
          toast.error('서울 지역만 선택 가능합니다.', {
            position: 'bottom-center',
            style: toastStyle,
          });
          return;
        }

        setError('');
        onSelect(fullAddress);
        toast.success('주소가 확인되었습니다!', {
          position: 'bottom-center',
          style: toastStyle,
        });
      },
    });

    postcode.open();
  };

  return (
    <div>
      <input
        type="text"
        value={value ?? ''}
        readOnly
        placeholder="주소를 검색하려면 클릭하세요"
        onClick={handleClickAddressSearch}
        className="w-full cursor-pointer rounded-md border-white bg-gray-600 px-2 py-5 text-xl text-white"
      />
      {error && <p className="mt-1 text-sm font-medium text-[#FF5126]">{error}</p>}
    </div>
  );
}
