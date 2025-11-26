interface PageProps {
  params: {
    eventPlaceId: string;
  };
}

export default function EventPlaceDetailPage({ params }: PageProps) {
  return <div>Event Place Detail Page for {params.eventPlaceId}</div>;
}
