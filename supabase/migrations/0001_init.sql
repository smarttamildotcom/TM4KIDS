-- ============================================================================
-- Brand Quest — initial database schema
-- Tables: users, memberships, progress, certificates
-- Row Level Security is enabled on every table.
--
-- Design notes:
--   * `users.id` maps 1:1 to Supabase's `auth.users.id`, so RLS policies can
--     use `auth.uid()` to identify the current signed-in user.
--   * Admin access is granted via the `public.is_admin()` helper, which reads a
--     `role` claim from the JWT's app_metadata. The Supabase service_role key
--     bypasses RLS entirely, so server-side admin code using that key already
--     has full access without needing the claim.
-- ============================================================================

-- gen_random_uuid() is provided by pgcrypto (bundled with Supabase).
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- Helper: is the current request made by an administrator?
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ----------------------------------------------------------------------------
-- 1. users
-- ----------------------------------------------------------------------------
create table if not exists public.users (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text not null,
  email      text unique not null,
  school     text,
  country    text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. memberships
-- ----------------------------------------------------------------------------
create table if not exists public.memberships (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references public.users (id) on delete cascade,
  membership_type   text not null default 'Brand Quest Explorer',
  amount            decimal(10, 2) not null default 10.00,
  currency          text not null default 'SGD',
  payment_method    text,
  payment_reference text,
  payment_status    text not null default 'Pending',
  approved          boolean not null default false,
  approved_by       text,
  approved_at       timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists memberships_user_id_idx on public.memberships (user_id);

-- ----------------------------------------------------------------------------
-- 3. progress — one record per user per world
-- ----------------------------------------------------------------------------
create table if not exists public.progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users (id) on delete cascade,
  world_number integer not null,
  completed    boolean not null default false,
  score        integer not null default 0,
  xp           integer not null default 0,
  stars        integer not null default 0,
  completed_at timestamptz,
  constraint progress_user_world_unique unique (user_id, world_number)
);

create index if not exists progress_user_id_idx on public.progress (user_id);

-- ----------------------------------------------------------------------------
-- 4. certificates
-- ----------------------------------------------------------------------------
create table if not exists public.certificates (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.users (id) on delete cascade,
  certificate_number text unique,
  issued_at          timestamptz default now(),
  pdf_url            text
);

create index if not exists certificates_user_id_idx on public.certificates (user_id);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.users        enable row level security;
alter table public.memberships  enable row level security;
alter table public.progress     enable row level security;
alter table public.certificates enable row level security;

-- ---- users ----------------------------------------------------------------
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

create policy "Admins can delete users"
  on public.users for delete
  using (public.is_admin());

-- ---- memberships ----------------------------------------------------------
create policy "Users can view their own memberships"
  on public.memberships for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can create their own memberships"
  on public.memberships for insert
  with check (auth.uid() = user_id);

-- Users may edit their own membership, but approval fields are meant to be set
-- by admins (or server-side code using the service_role key).
create policy "Users can update their own memberships"
  on public.memberships for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "Admins can delete memberships"
  on public.memberships for delete
  using (public.is_admin());

-- ---- progress -------------------------------------------------------------
create policy "Users can view their own progress"
  on public.progress for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can create their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.progress for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "Admins can delete progress"
  on public.progress for delete
  using (public.is_admin());

-- ---- certificates ---------------------------------------------------------
-- Certificates are issued by the system/admins; users may only read their own.
create policy "Users can view their own certificates"
  on public.certificates for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins can issue certificates"
  on public.certificates for insert
  with check (public.is_admin());

create policy "Admins can update certificates"
  on public.certificates for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete certificates"
  on public.certificates for delete
  using (public.is_admin());
