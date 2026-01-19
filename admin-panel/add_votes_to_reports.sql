-- Add upvotes and downvotes columns to user_reports table
ALTER TABLE user_reports 
ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS downvotes INTEGER DEFAULT 0;

-- Create a function to safely increment votes (atomic update)
CREATE OR REPLACE FUNCTION increment_vote(row_id INT, vote_type TEXT)
RETURNS VOID AS $$
BEGIN
  IF vote_type = 'up' THEN
    UPDATE user_reports SET upvotes = upvotes + 1 WHERE id = row_id;
  ELSIF vote_type = 'down' THEN
    UPDATE user_reports SET downvotes = downvotes + 1 WHERE id = row_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
