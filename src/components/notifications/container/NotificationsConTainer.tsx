import { alarm } from '../../notifications/notificationsList/notificationsListData';

export default function NotificationsConTainer() {
  const read = 'text-gray-500';
  const unread = 'text-white';

  if (alarm.length === 0) {
    return <div className="flex items-center justify-center">알람이 없습니다.</div>;
  }

  return (
    <div className="mt-12 text-white">
      {alarm?.map((bell) => (
        <div key={bell.id} className="flex flex-col gap-7 border-b border-gray-700 pt-5 pb-7">
          <div className="flex justify-between">
            <p>{bell.title}</p>
            <p className={!bell.isRead ? read : unread}>
              {bell.isRead === false ? '읽음' : '안읽음'}
            </p>
          </div>
          <p>{`${bell.day.getFullYear()}년 ${
            bell.day.getMonth() + 1
          }월 ${bell.day.getDate()}년 `}</p>
        </div>
      ))}
    </div>
  );
}
