export default async function EventPlaceDetailPage({
  params,
}: {
  params: Promise<{ eventPlaceId: string }>;
}) {
  const { eventPlaceId } = await params;
  return <div>Event Place Detail Page for {eventPlaceId}</div>;
}
