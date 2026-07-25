-- ============================================================
-- Fennr Studio — leads table
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  interests   text[],
  budget      text,
  timeline    text,
  message     text,
  source      text,                       -- 'brief' | 'free-preview' | 'contact'
  status      text not null default 'new' -- new | contacted | quoted | won | lost
);

-- Keep the table locked down: only the server (service-role key) can touch it.
alter table public.leads enable row level security;
-- (No policies added on purpose — with RLS on and no policy, the anon/public
--  key is fully blocked. The server uses the service-role key, which bypasses RLS.)

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
