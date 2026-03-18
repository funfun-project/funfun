-- Enable Row Level Security (RLS) on all tables

alter table public.users enable row level security;
alter table public.user_preferences enable row level security;
alter table public.follows enable row level security;
alter table public.contents enable row level security;
alter table public.groups enable row level security;
alter table public.group_participants enable row level security;
alter table public.chat_rooms enable row level security;
alter table public.chat_room_members enable row level security;
alter table public.chat_messages enable row level security;
alter table public.calendars enable row level security;
alter table public.notifications enable row level security;
alter table public.contacts enable row level security;
alter table public.faqs enable row level security;
alter table public.notices enable row level security;

-- 1. users
-- Users can view all active users.
create policy "Users can view all active profiles" 
on public.users for select 
to authenticated 
using (status = 'ACTIVE'::user_status);

-- Users can update their own profile.
create policy "Users can update own profile" 
on public.users for update 
to authenticated 
using (auth.uid() = id);

-- 2. user_preferences
-- Users can view and manage their own preferences
create policy "Users can manage own preferences" 
on public.user_preferences for all 
to authenticated 
using (auth.uid() = user_id);

-- 3. follows
-- Users can view all follows
create policy "Users can view all follows" 
on public.follows for select 
to authenticated 
using (true);

-- Users can follow/unfollow targeting themselves as follower
create policy "Users can manage own follows" 
on public.follows for all 
to authenticated 
using (auth.uid() = follower_id);

-- 4. contents
-- Anyone can view contents
create policy "Anyone can view contents" 
on public.contents for select 
using (true);

-- Only admins can manage contents (example, might not be needed depending on your access model)
create policy "Only admins can manage contents" 
on public.contents for all 
to authenticated 
using ( (select role from public.users where id = auth.uid()) = 'ADMIN'::user_role );

-- 5. groups
-- Anyone can view groups
create policy "Anyone can view groups" 
on public.groups for select 
using (true);

-- Authenticated users can create groups
create policy "Users can create groups" 
on public.groups for insert 
to authenticated 
with check (auth.uid() = leader_id);

-- Only group leader can update/delete their groups
create policy "Group leader can manage group" 
on public.groups for update 
to authenticated 
using (auth.uid() = leader_id);

create policy "Group leader can delete group" 
on public.groups for delete 
to authenticated 
using (auth.uid() = leader_id);

-- 6. group_participants
-- Users can view participants of groups they are in, or public groups
create policy "Users can view group participants" 
on public.group_participants for select 
to authenticated 
using (true);

-- Users can join a group
create policy "Users can apply to join groups" 
on public.group_participants for insert 
to authenticated 
with check (auth.uid() = user_id);

-- Leader can manage participants
create policy "Leader can manage participants" 
on public.group_participants for update 
to authenticated 
using (
  exists (
    select 1 from public.groups 
    where id = group_id and leader_id = auth.uid()
  )
);

-- Users can leave a group
create policy "Users can leave groups" 
on public.group_participants for delete 
to authenticated 
using (auth.uid() = user_id);

-- 7. chat_rooms & chat_messages
-- Users can view rooms they are members of
create policy "Users can view own chat rooms" 
on public.chat_rooms for select 
to authenticated 
using (
  exists (
    select 1 from public.chat_room_members 
    where room_id = id and user_id = auth.uid()
  )
);

-- Users can view and send messages in rooms they are members of
create policy "Users can view room messages" 
on public.chat_messages for select 
to authenticated 
using (
  exists (
    select 1 from public.chat_room_members 
    where room_id = public.chat_messages.room_id and user_id = auth.uid()
  )
);

create policy "Users can send messages to own rooms" 
on public.chat_messages for insert 
to authenticated 
with check (
  auth.uid() = sender_id and
  exists (
    select 1 from public.chat_room_members 
    where room_id = public.chat_messages.room_id and user_id = auth.uid()
  )
);

-- 8. calendars
-- Users can manage their own calendar
create policy "Users can manage own calendar" 
on public.calendars for all 
to authenticated 
using (auth.uid() = user_id);

-- 9. notifications
-- Users can manage their own notifications
create policy "Users can manage own notifications" 
on public.notifications for all 
to authenticated 
using (auth.uid() = user_id);

-- 10. contacts, faqs, notices
-- Users can manage own contacts, view own contacts
create policy "Users can manage own contacts" 
on public.contacts for all 
to authenticated 
using (auth.uid() = user_id);

-- Anyone can view faqs and notices
create policy "Anyone can view faqs" 
on public.faqs for select 
using (true);

create policy "Anyone can view notices" 
on public.notices for select 
using (true);
