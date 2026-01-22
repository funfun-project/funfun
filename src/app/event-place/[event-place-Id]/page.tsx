export default async function EventPlaceDetailPage({
  params,
}: {
  params: Promise<{ 'event-place-Id': string }>;
}) {
  const { 'event-place-Id': eventPlaceId } = await params;
  return <div>Event Place Detail Page for {eventPlaceId}</div>;
}
