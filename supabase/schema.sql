-- À exécuter dans Supabase > SQL Editor
create table if not exists public.newsletter_subscribers(id uuid primary key default gen_random_uuid(),email text unique not null,created_at timestamptz default now());
create table if not exists public.contact_messages(id uuid primary key default gen_random_uuid(),name text not null,email text not null,subject text,message text not null,created_at timestamptz default now());
create table if not exists public.profiles(id uuid primary key references auth.users on delete cascade,full_name text,created_at timestamptz default now());
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.profiles enable row level security;
create policy "insert newsletter" on public.newsletter_subscribers for insert to anon,authenticated with check (true);
create policy "insert contact" on public.contact_messages for insert to anon,authenticated with check (true);
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid()=id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid()=id);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,full_name) values(new.id,new.raw_user_meta_data->>'full_name'); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
