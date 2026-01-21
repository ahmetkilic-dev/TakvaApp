-- Add tracking field for social media task
ALTER TABLE user_stats 
ADD COLUMN IF NOT EXISTS followed_social BOOLEAN DEFAULT FALSE;

-- Note: rated field already exists in the schema
