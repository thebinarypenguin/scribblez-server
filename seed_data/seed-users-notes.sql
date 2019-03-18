
-- bcrypt('password', 10) => $2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty

INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Homer Simpson',  'homer@example.com',  'homer',  '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Marge Simpson',  'marge@example.com',  'marge',  '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Bart Simpson',   'bart@example.com',   'bart',   '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Lisa Simpson',   'lisa@example.com',   'lisa',   '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Maggie Simpson', 'maggie@example.com', 'maggie', '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Patty Bouvier',  'patty@example.com',  'patty',  '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Selma Bouvier',  'selma@example.com',  'selma',  '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Ned Flanders',   'ned@example.com',    'ned',    '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Maude Flanders', 'maude@example.com',  'maude',  '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Rod Flanders',   'rod@example.com',    'rod',    '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Todd Flanders',  'todd@example.com',   'todd',   '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Lenny Leonard',  'lenny@example.com',  'lenny',  '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Carl Carlson',   'carl@example.com',   'carl',   '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');
INSERT INTO users (real_name, email_address, username, password_hash) VALUES ('Moe Szyslak',    'moe@example.com',    'moe',    '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty');

INSERT INTO notes (owner_id, body, visibility) VALUES (1, 'Note alpha',    'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (1, 'Note bravo',    'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (1, 'Note charlie',  'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (2, 'Note delta',    'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (2, 'Note echo',     'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (2, 'Note foxtrot',  'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (3, 'Note golf',     'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (3, 'Note hotel',    'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (3, 'Note india',    'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (4, 'Note juliet',   'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (4, 'Note kilo',     'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (4, 'Note lima',     'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (5, 'Note mike',     'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (5, 'Note november', 'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (5, 'Note oscar',    'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (6, 'Note papa',     'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (7, 'Note quebec',   'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (7, 'Note romeo',    'private');
INSERT INTO notes (owner_id, body, visibility) VALUES (8, 'Note sierra',   'public');
INSERT INTO notes (owner_id, body, visibility) VALUES (9, 'Note tango',    'public');
