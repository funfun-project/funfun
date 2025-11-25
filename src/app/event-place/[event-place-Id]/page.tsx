export default function EventPlaceDetailPage({ params }: { params: { 'event-place-Id': string } }) {
  return <div>Event Place Detail Page for {params['event-place-Id']}</div>;
}
