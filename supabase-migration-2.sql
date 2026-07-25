-- ============================================================
-- Fennr Studio — leads table upgrade (run AFTER supabase-setup.sql)
-- Adds: phone, notes, updated_at (+ auto-bump trigger for stale detection)
-- Run in Supabase → SQL Editor → New query → paste → Run
-- ============================================================

alter table public.leads add column if not exists phone      text;
alter table public.leads add column if not exists notes      text;
alter table public.leads add column if not exists updated_at timestamptz not null default now();

-- Bump updated_at automatically whenever a row changes (status move, note, etc.)
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_touch_updated_at on public.leads;
create trigger leads_touch_updated_at
  before update on public.leads
  for each row execute function public.touch_updated_at();

create index if not exists leads_updated_at_idx on public.leads (updated_at desc);
