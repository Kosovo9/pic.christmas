-- EXTENSIONS
create extension if not exists "uuid-ossp";
-- TABLES
create table users (
    id uuid primary key default uuid_generate_v4(),
    clerk_id text unique not null,
    email text not null,
    full_name text,
    created_at timestamptz default now()
);
-- 10x Feature: User Credits
alter table users
add column credits int default 3;
create table images (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    storage_path text not null,
    is_unlocked boolean default false,
    unlocked_at timestamptz,
    expires_at timestamptz,
    upscaled_path text,
    video_path text,
    credits_cost int default 1,
    created_at timestamptz default now()
);
create table sales (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id),
    gateway text check (gateway in ('paypal', 'mercadopago')),
    external_id text,
    -- PayPal OrderID o MP preference_id
    amount_usd numeric(10, 2) not null,
    status text check (status in ('pending', 'paid', 'refunded')),
    created_at timestamptz default now()
);
create table affiliates (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid unique references users(id),
    code text unique not null,
    clicks int default 0,
    conversions int default 0,
    commission_usd numeric(10, 2) default 0
);
create table donations (
    id uuid primary key default uuid_generate_v4(),
    sale_id uuid references sales(id),
    amount_usd numeric(10, 2) not null,
    created_at timestamptz default now()
);
-- INDEXES
create index idx_sales_user on sales(user_id);
create index idx_affiliates_code on affiliates(code);
-- TRIGGER FOR DONATIONS
create or replace function fn_donate() returns trigger as $$ begin
insert into donations (sale_id, amount_usd)
values (NEW.id, NEW.amount_usd * 0.03);
return NEW;
end;
$$ language plpgsql;
create trigger trg_donate
after
insert on sales for each row execute function fn_donate();