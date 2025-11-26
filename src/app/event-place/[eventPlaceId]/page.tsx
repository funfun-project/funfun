export default function EventPlaceDetailPage({ params }: { params: { eventPlaceId: string } }) {
  return <div>Event Place Detail Page for {params['eventPlaceId']}</div>;
}
