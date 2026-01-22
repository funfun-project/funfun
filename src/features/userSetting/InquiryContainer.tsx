'use client';

import React, { useEffect, useState } from 'react';
import UserSettingHeader from './components/UserSettingHeader';
import { contactsAPI, Inquiry } from '@/libs/api/contacts/contactsAPI';
import { Plus, X } from 'lucide-react';

const InquiryItem = ({ inquiry }: { inquiry: Inquiry }) => {
  const date = new Date(inquiry.createdAt).toLocaleDateString();
  const isAnswered = inquiry.status === 'ANSWERED';

  return (
    <div className="flex items-center justify-between border-b border-[#323232] py-4">
      <div className="flex items-center space-x-4 overflow-hidden">
        <span
          className={`text-body4 rounded-full px-3 py-1 whitespace-nowrap text-white ${
            isAnswered ? 'bg-[#505050]' : 'bg-[#E33939]'
          }`}
        >
          {isAnswered ? '답변완료' : '대기중'}
        </span>
        <p className="text-body1 truncate text-white">{inquiry.title}</p>
      </div>
      <span className="text-body2 ml-2 text-base whitespace-nowrap text-[#919191]">{date}</span>
    </div>
  );
};

// Simple Modal for Writing Inquiry
const WriteInquiryModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (title: string, content: string) => Promise<void>;
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(title, content);
      onClose();
    } catch (error) {
      console.error(error);
      alert('문의 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1E1E1E] p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">문의하기</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full rounded-lg bg-[#323232] p-3 text-white placeholder-gray-400 focus:ring-1 focus:ring-[#E33939] focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="문의 내용을 입력하세요"
            rows={5}
            className="w-full resize-none rounded-lg bg-[#323232] p-3 text-white placeholder-gray-400 focus:ring-1 focus:ring-[#E33939] focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="hover:bg-opacity-90 mt-2 w-full rounded-lg bg-[#E33939] py-3 font-bold text-white disabled:opacity-50"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

const InquiryContainer = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const fetchInquiries = async () => {
    try {
      const data = await contactsAPI.getInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchInquiries();
  }, []);

  const handleCreateInquiry = async (title: string, content: string) => {
    await contactsAPI.createInquiry({ title, content });
    await fetchInquiries(); // Refresh list
    alert('문의가 등록되었습니다.');
  };

  return (
    <section className="bg-bg-main relative flex min-h-screen flex-col text-white">
      <UserSettingHeader title="문의 내역" />
      <main className="grow px-6 pb-20">
        {isLoading ? (
          <div className="flex h-60 items-center justify-center">Loading...</div>
        ) : inquiries.length > 0 ? (
          <div>
            {inquiries.map((inquiry) => (
              <InquiryItem key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        ) : (
          <div className="flex h-60 items-center justify-center">
            <p className="text-[#919191]">문의 내역이 없습니다.</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsWriteModalOpen(true)}
        className="hover:bg-opacity-90 fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E33939] shadow-lg transition-transform active:scale-95"
      >
        <Plus size={28} color="white" />
      </button>

      {isWriteModalOpen && (
        <WriteInquiryModal
          onClose={() => setIsWriteModalOpen(false)}
          onSubmit={handleCreateInquiry}
        />
      )}
    </section>
  );
};

export default InquiryContainer;
