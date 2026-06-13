-- =====================================================
-- Voice of Kenya - Supabase Database Setup
-- Run this entire file in your Supabase SQL Editor
-- =====================================================

-- COUNTIES (47 Kenyan counties)
CREATE TABLE IF NOT EXISTS public.counties (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  code TEXT
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT
);

-- ISSUES
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_number TEXT NOT NULL UNIQUE,
  tracking_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id INTEGER REFERENCES public.categories(id),
  county_id INTEGER REFERENCES public.counties(id),
  sub_county TEXT,
  ward TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  images TEXT[] DEFAULT '{}',
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  support_count INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  reporter_ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issues_status ON public.issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_county ON public.issues(county_id);
CREATE INDEX IF NOT EXISTS idx_issues_category ON public.issues(category_id);
CREATE INDEX IF NOT EXISTS idx_issues_created ON public.issues(created_at DESC);

-- COMMENTS
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SUPPORTS (de-duped by IP hash + issue)
CREATE TABLE IF NOT EXISTS public.supports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (issue_id, ip_hash)
);

-- STATUS UPDATES
CREATE TABLE IF NOT EXISTS public.status_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  note TEXT,
  updated_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ADMINS
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS but rely on service role (server-only) for all access
ALTER TABLE public.counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Seed categories
INSERT INTO public.categories (name, slug, icon) VALUES
  ('Roads', 'roads', 'road'),
  ('Water', 'water', 'droplet'),
  ('Health', 'health', 'heart-pulse'),
  ('Education', 'education', 'graduation-cap'),
  ('Environment', 'environment', 'leaf'),
  ('Waste Management', 'waste', 'trash-2'),
  ('Electricity', 'electricity', 'zap'),
  ('Public Safety', 'safety', 'shield'),
  ('Corruption', 'corruption', 'alert-octagon'),
  ('Infrastructure', 'infrastructure', 'building-2'),
  ('Agriculture', 'agriculture', 'wheat'),
  ('Transport', 'transport', 'bus'),
  ('Youth Affairs', 'youth', 'users'),
  ('Womens Affairs', 'women', 'user-round'),
  ('Housing', 'housing', 'home'),
  ('Public Services', 'public-services', 'landmark'),
  ('Other', 'other', 'more-horizontal')
ON CONFLICT (slug) DO NOTHING;

-- Seed all 47 Kenyan counties
INSERT INTO public.counties (name, slug, code) VALUES
  ('Mombasa','mombasa','001'),('Kwale','kwale','002'),('Kilifi','kilifi','003'),
  ('Tana River','tana-river','004'),('Lamu','lamu','005'),('Taita-Taveta','taita-taveta','006'),
  ('Garissa','garissa','007'),('Wajir','wajir','008'),('Mandera','mandera','009'),
  ('Marsabit','marsabit','010'),('Isiolo','isiolo','011'),('Meru','meru','012'),
  ('Tharaka-Nithi','tharaka-nithi','013'),('Embu','embu','014'),('Kitui','kitui','015'),
  ('Machakos','machakos','016'),('Makueni','makueni','017'),('Nyandarua','nyandarua','018'),
  ('Nyeri','nyeri','019'),('Kirinyaga','kirinyaga','020'),('Murang''a','muranga','021'),
  ('Kiambu','kiambu','022'),('Turkana','turkana','023'),('West Pokot','west-pokot','024'),
  ('Samburu','samburu','025'),('Trans Nzoia','trans-nzoia','026'),('Uasin Gishu','uasin-gishu','027'),
  ('Elgeyo-Marakwet','elgeyo-marakwet','028'),('Nandi','nandi','029'),('Baringo','baringo','030'),
  ('Laikipia','laikipia','031'),('Nakuru','nakuru','032'),('Narok','narok','033'),
  ('Kajiado','kajiado','034'),('Kericho','kericho','035'),('Bomet','bomet','036'),
  ('Kakamega','kakamega','037'),('Vihiga','vihiga','038'),('Bungoma','bungoma','039'),
  ('Busia','busia','040'),('Siaya','siaya','041'),('Kisumu','kisumu','042'),
  ('Homa Bay','homa-bay','043'),('Migori','migori','044'),('Kisii','kisii','045'),
  ('Nyamira','nyamira','046'),('Nairobi','nairobi','047')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- STORAGE BUCKET: create a PUBLIC bucket named 'issue-photos'
-- In Supabase Dashboard -> Storage -> New bucket
--   Name: issue-photos
--   Public: ON
-- =====================================================

-- =====================================================
-- CREATE YOUR ADMIN ACCOUNT
-- After running everything above, create your admin user by
-- visiting /admin/setup ONE TIME in the app.
-- =====================================================
