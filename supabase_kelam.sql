-- 1. Create kelam_videos table
CREATE TABLE IF NOT EXISTS public.kelam_videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id TEXT REFERENCES public.profiles(id) NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    title TEXT,
    description TEXT,
    duration FLOAT4,
    views_count INT8 DEFAULT 0,
    likes_count INT8 DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create kelam_likes table
CREATE TABLE IF NOT EXISTS public.kelam_likes (
    user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES public.kelam_videos(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, video_id)
);

-- 3. Function to increment views
CREATE OR REPLACE FUNCTION public.increment_kelam_views(video_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.kelam_videos
  SET views_count = views_count + 1
  WHERE id = video_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Enable RLS
ALTER TABLE public.kelam_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kelam_likes ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view videos
CREATE POLICY "Public Videos are viewable by everyone" ON public.kelam_videos FOR SELECT USING (true);

-- Allow authenticated users to upload (Comparing text IDs)
CREATE POLICY "Creators can insert videos" ON public.kelam_videos FOR INSERT WITH CHECK (auth.uid()::text = creator_id);

-- Allow liking videos
CREATE POLICY "Users can like videos" ON public.kelam_likes FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY "Everyone can see likes" ON public.kelam_likes FOR SELECT USING (true);

