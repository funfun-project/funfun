import { getGeocode } from '@/libs/utils/naverMap';

type GeocodeResult = { latitude: number; longitude: number };
type GeocodeV2 = naver.maps.Service.GeocodeResponse['v2'];
type GeocodeType = { x: string; y: string };

function isGeocodeV2(v: unknown): v is GeocodeV2 {
  return typeof v === 'object' && v !== null && 'addresses' in v && Array.isArray((v as any).addresses);
}

export async function fetchLatLngFromAddress(address: string): Promise<GeocodeResult | null> {
  const raw = await getGeocode(address);
  const v2 = raw as unknown;

  if (!isGeocodeV2(v2)) throw new Error('Invalid geocode response shape');

  const first = v2.addresses?.[0] as GeocodeType;
  if (!first) return null;

  const longitude = Number(first.x);
  const latitude = Number(first.y);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  return { latitude, longitude };
}