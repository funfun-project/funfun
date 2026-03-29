-- Enable PostGIS extension for distance calculations
create extension if not exists postgis schema extensions;

-- Create custom types
create type user_role as enum ('USER', 'ADMIN', 'GUEST');
create type user_status as enum ('ACTIVE', 'SUSPENDED', 'DELETED');
create type group_status as enum ('RECRUITING', 'CLOSED', 'COMPLETED', 'CANCELED');
create type participant_status as enum ('PENDING', 'APPROVED', 'REJECTED', 'KICKED', 'LEFT');
create type participant_role as enum ('LEADER', 'MEMBER');
create type chat_room_type as enum ('PERSONAL', 'GROUP');

-- 1. users table (extends auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  nickname text unique not null,
  birth_date date,
  gender text,
  address text,
  latitude double precision,
  longitude double precision,
  location extensions.geography(point), -- PostGIS Point
  profile_image_url text,
  introduction text,
  role user_role default 'USER'::user_role,
  status user_status default 'ACTIVE'::user_status,
  suspension_end_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- update point location when lat/lng change
create or replace function public.sync_user_location() returns trigger as $$
begin
  if new.latitude is not null and new.longitude is not null then
    new.location := extensions.st_point(new.longitude, new.latitude);
  end if;
  return new;
end;
$$ language plpgsql;

create trigger sync_user_location_trigger
  before insert or update on public.users
  for each row execute function public.sync_user_location();

-- trigger to create a user profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, nickname)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'nickname', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. user_preferences table
create table public.user_preferences (
  user_id uuid references public.users(id) on delete cascade primary key,
  preferences jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. follows table
create table public.follows (
  follower_id uuid references public.users(id) on delete cascade not null,
  following_id uuid references public.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- 4. contents table
create table public.contents (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description_image_url text,
  category text,
  address text,
  latitude double precision,
  longitude double precision,
  location extensions.geography(point), -- PostGIS Point
  age_limit text,
  fee_info jsonb,
  reservation_link text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger sync_content_location_trigger
  before insert or update on public.contents
  for each row execute function public.sync_user_location();

-- 5. groups table
create table public.groups (
  id uuid default gen_random_uuid() primary key,
  leader_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  short_description text,
  description text,
  content_id uuid references public.contents(id) on delete set null,
  category text,
  max_people integer,
  event_date timestamptz,
  duration text, -- e.g., '1h30m' or interval
  status group_status default 'RECRUITING'::group_status,
  latitude double precision,
  longitude double precision,
  location extensions.geography(point),
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger sync_group_location_trigger
  before insert or update on public.groups
  for each row execute function public.sync_user_location();

-- 6. group_participants table
create table public.group_participants (
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  status participant_status default 'PENDING'::participant_status,
  role participant_role default 'MEMBER'::participant_role,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (group_id, user_id)
);

-- 7. chat_rooms & chat_messages tables
create table public.chat_rooms (
  id uuid default gen_random_uuid() primary key,
  type chat_room_type not null,
  group_id uuid references public.groups(id) on delete cascade,
  created_at timestamptz default now()
);

create table public.chat_room_members (
  room_id uuid references public.chat_rooms(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  joined_at timestamptz default now(),
  last_read_at timestamptz default now(),
  primary key (room_id, user_id)
);

create table public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.chat_rooms(id) on delete cascade not null,
  sender_id uuid references public.users(id) on delete set null,
  content text not null,
  created_at timestamptz default now()
);

-- 8. calendars (schedules) table
create table public.calendars (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  content_id uuid references public.contents(id) on delete cascade,
  group_id uuid references public.groups(id) on delete cascade,
  event_date timestamptz not null,
  created_at timestamptz default now()
);

-- 9. notifications table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  type text, -- e.g., 'GROUP_INVITE', 'NOTICE', 'SYSTEM'
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 10. Customer Support tables (contacts, faqs, notices, reports)
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  category text not null, -- 'GENERAL', 'REPORT'
  title text not null,
  content text not null,
  status text default 'PENDING', -- 'PENDING', 'ANSWERED'
  answer text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.faqs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.notices (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
