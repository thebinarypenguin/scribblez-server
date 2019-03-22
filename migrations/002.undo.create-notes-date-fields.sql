DROP TRIGGER IF EXISTS notes_updated_at ON notes;

DROP FUNCTION IF EXISTS set_updated_at;

ALTER TABLE IF EXISTS notes DROP COLUMN created_at;

ALTER TABLE IF EXISTS notes DROP COLUMN updated_at;
