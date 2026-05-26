# Backend setup: shared progress across devices

This wires every lesson to send its result to one shared database (Supabase),
so the admin console can show all three children from any device. Lessons still
work fully offline; the cloud sync is best-effort on top.

You do this once. It takes about 10 minutes. The only part I cannot do for you
is create the account and copy the two keys, because that is your login.

---

## Step 1 - Create a free Supabase project (you)

1. Go to supabase.com and sign in (free tier is fine).
2. Click **New project**. Give it a name like `family-learning`. Pick any region
   close to you. Set a database password (save it somewhere; you will not need it
   for this).
3. Wait about a minute for it to finish provisioning.

## Step 2 - Create the table (you, paste my script)

1. In the project, open **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open `supabase-setup.sql` (included), copy all of it, paste it in, click **Run**.
4. You should see "Success. No rows returned." The table `lesson_results` now exists
   with the right security rules.

## Step 3 - Copy your two public values (you)

1. Open **Project Settings** (gear icon) -> **API**.
2. Copy the **Project URL** (looks like `https://abcdwxyz.supabase.co`).
3. Copy the **anon public** key (a long string, labeled "anon" / "public").

These two are safe to share and are meant to live in the web pages. (Do **not**
copy the `service_role` key. That one is secret. We never use it.)

## Step 4 - Plug them in (me, or you)

Two ways:

**Easiest:** paste those two values to me here, and I will bake them into all
ten lessons and the cloud admin and hand the files back ready to use.

**Or do it yourself:** in each lesson HTML and in `Admin - Cloud Progress.html`,
find this near the top of the script:

```
var SUPA_URL='', SUPA_KEY='';
```

and fill it in:

```
var SUPA_URL='https://abcdwxyz.supabase.co', SUPA_KEY='your-anon-key';
```

(The lessons keep working with these blank; sync simply stays off until filled.)

## Step 5 - Test it

1. Open any lesson, finish it.
2. Open `Admin - Cloud Progress.html`, make sure the toggle is on **Cloud**, press
   **Refresh**. The result should appear.
3. Open the same admin on a different device. The result is still there. That is the
   whole point: it is no longer tied to one tablet.

---

## How it works

- Each lesson, on finish and on feedback, sends one row to the table: student,
  subject, score, attempts, points, time on task, missed questions, and how it felt.
- It is an **upsert**: retaking a lesson updates that lesson's row instead of piling
  up duplicates. The admin always sees the latest.
- The kids' pages can only **write**. They cannot read each other's data.
- The admin reads everything (see the security note below).

## Security note (read this)

The setup script uses the simple read option: the admin reads with the same public
anon key the lessons carry. Easiest to run, and fine for a private family tool whose
data is only first names plus quiz scores. The tradeoff is that the anon key is
visible in the page source, so in principle anyone who has a page could read the
results. If you would rather lock reading behind a sign-in (only you, after logging
in, can read), say so and I will switch the script to the private option and add a
quick sign-in to the cloud admin.

## What this does not change

- Hosting is separate. You still need somewhere to open the pages (GitHub Pages is
  the plan) so the kids have URLs. The backend works regardless of where the pages
  are served from. We can host next, in either order.
- The local `Admin - Progress Report.html` still works for same-device checks. The
  new `Admin - Cloud Progress.html` is the cross-device one.
