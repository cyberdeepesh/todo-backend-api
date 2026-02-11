-- Enable extension for UUID generation
create extension if not exists "pgcrypto";

-- Create todos table
create table public.todos (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  completed boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.todos enable row level security;


-- Policies for allow full CRUD
create policy "Allow all inserts"
on public.todos
for insert
to public
with check (true);

create policy "Allow all selects"
on public.todos
for select
to public
using (true);

create policy "Allow all updates"
on public.todos
for update
to public
using (true);

create policy "Allow all deletes"
on public.todos
for delete
to public
using (true);
