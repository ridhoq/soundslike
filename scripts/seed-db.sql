--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: soundslike-user
--

INSERT INTO users (id, username, email, password_hash, member_since, created) VALUES (1, 'kawhi', 'kleonard@spurs.com', 'pbkdf2:sha1:1000$vCpj28co$c9e2436dec2b6bc0548903cf1873ec90875b6ab8', '2017-03-17 07:02:01.226202', '2017-03-17 07:02:01.194882');
INSERT INTO users (id, username, email, password_hash, member_since, created) VALUES (2, 'indie', 'indie@soundslike.io', 'pbkdf2:sha1:1000$vv8N9m7p$951dce107ec42fcf36347c5f565d898dbdd0186f', '2017-03-17 07:02:01.831405', '2017-03-17 07:02:01.194882');
INSERT INTO users (id, username, email, password_hash, member_since, created) VALUES (3, 'hiphop', 'hiphop@soundslike.io', 'pbkdf2:sha1:1000$3FN9NwrN$7a98ef8fbb6fab7777285f7f9fceb9306ced3c38', '2017-03-17 07:02:01.832521', '2017-03-17 07:02:01.194882');
INSERT INTO users (id, username, email, password_hash, member_since, created) VALUES (4, 'edm', 'edm@soundslike.io', 'pbkdf2:sha1:1000$OA8JRWBM$6b9c326db8c4acb41e4d53b9415d19162162a67f', '2017-03-17 07:02:01.833605', '2017-03-17 07:02:01.194882');
INSERT INTO users (id, username, email, password_hash, member_since, created) VALUES (36, 'test', 'test@test.test', 'pbkdf2:sha1:1000$Nw15WGo7$6c32ff7cd0b725cd5cf014d5a496acf86d865cff', '2017-04-17 00:07:07.692243', '2017-04-16 22:15:36.846571');


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: soundslike-user
--

INSERT INTO songs (id, title, url, artist, created, user_id) VALUES (1, 'i know there''s gonna be (good times) ft. young thug, popcaan', 'https://www.youtube.com/watch?v=bjlbb-tma84', 'jamie xx', '2017-03-17 07:02:01.847842', 2);
INSERT INTO songs (id, title, url, artist, created, user_id) VALUES (2, '1901', 'https://www.youtube.com/watch?v=HL548cHH3OY', 'Phoenix', '2017-03-17 07:02:01.848004', 2);
INSERT INTO songs (id, title, url, artist, created, user_id) VALUES (3, 'Best Friend', 'https://www.youtube.com/watch?v=Tz6OUIjtM6E', 'Young Thug', '2017-03-17 07:02:01.860961', 3);
INSERT INTO songs (id, title, url, artist, created, user_id) VALUES (4, 'We the People....', 'https://www.youtube.com/watch?v=vO2Su3erRIA', 'A Tribe Called Quest', '2017-03-17 07:02:01.861105', 3);
INSERT INTO songs (id, title, url, artist, created, user_id) VALUES (5, 'Never Be Like You feat. Kai', 'https://www.youtube.com/watch?v=-KPnyf8vwXI', 'Flume', '2017-03-17 07:02:01.870592', 4);
INSERT INTO songs (id, title, url, artist, created, user_id) VALUES (6, 'GLOWED UP (feat. Anderson .Paak)', 'https://www.youtube.com/watch?v=yaWesK-nWts', 'Kaytranada', '2017-03-17 07:02:01.870736', 4);


--
-- Data for Name: song_relations; Type: TABLE DATA; Schema: public; Owner: soundslike-user
--

INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (1, 3, 4, '2017-03-17 07:02:01.965494', 3);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (2, 4, 1, '2017-03-17 07:02:02.025351', 3);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (3, 2, 1, '2017-03-17 07:02:02.090243', 2);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (4, 2, 3, '2017-03-17 07:02:02.186138', 2);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (5, 5, 3, '2017-03-17 07:02:02.26824', 4);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (6, 5, 6, '2017-03-17 07:02:02.461878', 4);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (7, 5, 4, '2017-03-17 07:02:02.62495', 3);
INSERT INTO song_relations (id, song1_id, song2_id, created, user_id) VALUES (8, 5, 1, '2017-03-17 07:02:02.717038', 3);


--
-- Data for Name: song_relation_votes; Type: TABLE DATA; Schema: public; Owner: soundslike-user
--

INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (1, 1, 3, '2017-03-17 07:02:01.977942');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (2, 2, 3, '2017-03-17 07:02:02.034837');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (3, 3, 2, '2017-03-17 07:02:02.099769');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (4, 3, 3, '2017-03-17 07:02:02.136881');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (5, 4, 2, '2017-03-17 07:02:02.196561');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (8, 6, 4, '2017-03-17 07:02:02.474999');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (9, 6, 3, '2017-03-17 07:02:02.517043');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (10, 6, 2, '2017-03-17 07:02:02.574082');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (11, 7, 3, '2017-03-17 07:02:02.634576');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (12, 7, 2, '2017-03-17 07:02:02.674341');
INSERT INTO song_relation_votes (id, song_relation_id, user_id, created) VALUES (13, 8, 3, '2017-03-17 07:02:02.732987');


--
-- Name: song_relation_votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: soundslike-user
--

SELECT pg_catalog.setval('song_relation_votes_id_seq', 13, true);


--
-- Name: song_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: soundslike-user
--

SELECT pg_catalog.setval('song_relations_id_seq', 8, true);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: soundslike-user
--

SELECT pg_catalog.setval('songs_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: soundslike-user
--

SELECT pg_catalog.setval('users_id_seq', 36, true);


--
-- PostgreSQL database dump complete
--

