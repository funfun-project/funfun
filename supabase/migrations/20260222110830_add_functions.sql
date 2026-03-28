-- Function to find nearby groups
-- Returns groups sorted by distance from a given point
create or replace function public.get_nearby_groups(
  user_lat double precision,
  user_lon double precision,
  max_distance_meters double precision default 10000,
  limit_count int default 20
) returns table (
  id uuid,
  title text,
  short_description text,
  latitude double precision,
  longitude double precision,
  distance_meters double precision
) language plpgsql as $$
begin
  return query
  select 
    g.id,
    g.title,
    g.short_description,
    g.latitude,
    g.longitude,
    extensions.st_distance(g.location, extensions.st_point(user_lon, user_lat)::extensions.geography) as distance_meters
  from public.groups g
  where 
    g.status = 'RECRUITING'::group_status
    and g.location is not null
    and extensions.st_dwithin(g.location, extensions.st_point(user_lon, user_lat)::extensions.geography, max_distance_meters)
  order by distance_meters asc
  limit limit_count;
end;
$$;

-- Function to find nearby contents
create or replace function public.get_nearby_contents(
  user_lat double precision,
  user_lon double precision,
  max_distance_meters double precision default 20000,
  limit_count int default 20
) returns table (
  id uuid,
  title text,
  category text,
  latitude double precision,
  longitude double precision,
  distance_meters double precision
) language plpgsql as $$
begin
  return query
  select 
    c.id,
    c.title,
    c.category,
    c.latitude,
    c.longitude,
    extensions.st_distance(c.location, extensions.st_point(user_lon, user_lat)::extensions.geography) as distance_meters
  from public.contents c
  where 
    c.is_active = true
    and c.location is not null
    and extensions.st_dwithin(c.location, extensions.st_point(user_lon, user_lat)::extensions.geography, max_distance_meters)
  order by distance_meters asc
  limit limit_count;
end;
$$;

-- Function to mark all notifications as read for a user
create or replace function public.read_all_notifications(
  user_id_param uuid
) returns void language plpgsql security definer as $$
begin
  update public.notifications
  set is_read = true
  where user_id = user_id_param and is_read = false;
end;
$$;
