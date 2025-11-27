export default async function GatheringDetailPage({
  params,
}: {
  params: Promise<{ gatheringId: string }>;
}) {
  const { gatheringId } = await params;

  return <div>Gathering Detail Page for {gatheringId}</div>;
}
