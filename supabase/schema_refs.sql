-- Existing tables (from previous steps) should exist here.
-- APPENDING NEW TABLES FOR VIRAL GROWTH
-- REFERRAL SYSTEM (BILATERAL)
create table if not exists refs (
    id uuid primary key default uuid_generate_v4(),
    from_user uuid references users(id),
    to_user uuid references users(id),
    code text unique not null,
    used boolean default false,
    created_at timestamptz default now()
);
-- Note: Policies usually need RLS enabled first. 
-- alter table refs enable row level security;
-- create policy "p_refs" on refs for all using (true);
-- INFLUENCERS TRACKING
create table if not exists influencers (
    handle text primary key,
    discount int default 20,
    clicks int default 0,
    created_at timestamptz default now()
);
-- GIFT CARDS
create table if not exists gift_cards (
    code text primary key,
    email text not null,
    amount int not null,
    used boolean default false,
    created_at timestamptz default now()
);
-- Adding free_credits column to users if not exists (required for referrals)
-- alter table users add column if not exists free_credits int default 0;