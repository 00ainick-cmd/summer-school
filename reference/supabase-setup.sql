-- ============================================================
--  Family Learning - Supabase setup
--  Run this once in your Supabase project:
--  Dashboard  ->  SQL Editor  ->  New query  ->  paste  ->  Run.
-- ============================================================

-- 1) The results table. One row per student + subject + day.
create table if not exists public.lesson_results (
  id          bigint generated always as identity primary key,
  student     text not null,
  subject     text not null,
  day         text not null default 'd1',
  status      text,
  best        int  default 0,
  attempts    int  default 0,
  points      int  default 0,
  time_ms     bigint default 0,
  wrong_count int  default 0,
  wrong       jsonb default '[]'::jsonb,
  feedback    jsonb,
  updated_at  timestamptz default now(),
  unique (student, subject, day)
);

-- 2) Turn on row-level security (nothing is allowed until a policy says so).
alter table public.lesson_results enable row level security;

-- 3) The kids' lesson pages may WRITE results, using the public anon key.
--    Insert plus update together allow the "upsert" the lessons send,
--    so a retaken lesson updates its row instead of making duplicates.
drop policy if exists "anon insert results" on public.lesson_results;
create policy "anon insert results"
  on public.lesson_results for insert to anon
  with check (true);

drop policy if exists "anon update results" on public.lesson_results;
create policy "anon update results"
  on public.lesson_results for update to anon
  using (true) with check (true);

-- 4) READ access for the admin console. Pick ONE option.
--
--    OPTION A (default, simplest): the admin reads with the same public
--    anon key. Easiest to set up. Tradeoff: anyone who has the page source
--    (which contains the anon key) could read the results. The data is only
--    first names plus quiz scores, so for a private family tool this is a
--    common, acceptable choice. This is the option wired in the cloud admin.
drop policy if exists "anon read results" on public.lesson_results;
create policy "anon read results"
  on public.lesson_results for select to anon
  using (true);

--    OPTION B (private): require the admin to sign in to read. Comment out
--    Option A above (the "anon read results" policy) and uncomment this one.
--    You would then add a sign-in step to the admin page (ask me and I will
--    build the authenticated version).
-- drop policy if exists "authed read results" on public.lesson_results;
-- create policy "authed read results"
--   on public.lesson_results for select to authenticated
--   using (true);

-- Done. The table is ready. Next: copy your Project URL and anon public key
-- from  Project Settings -> API,  and paste them into the lessons + admin.
