-- Enable uuid extention to generate primary uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE PRODUCT_TYPE AS ENUM ('single', 'album');

CREATE TABLE IF NOT EXISTS products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title VARCHAR(255) NOT NULL,
	type PRODUCT_TYPE NOT NULL,
	artists VARCHAR(255)[],
	coverUri VARCHAR(300),
	genre VARCHAR(80),
	lyrics TEXT,
	duration INT,
	releaseDate TIMESTAMP DEFAULT NOW(),
	price NUMERIC(6, 2) NOT NULL,
	discount INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stocks (
	count INT,
	product_id uuid REFERENCES products(id)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
);

INSERT INTO products (title, type, artists, coverUri, genre, price)
VALUES
	('BIGFOOT', 'album', '{Сидоджи Дубоshit}', 'https://https://avatars.yandex.net/get-music-content/5235336/f4e0aaf4.a.17442733-1/400x400', 'rusrap', 0.99),
	('Trip At Knight', 'album', '{Trippie Redd}', 'https://avatars.yandex.net/get-music-content/4388221/536f8668.a.17494173-1/400x400', 'foreignrap', 0.99),
	('Long Term Effects of SUFFERING', 'album', '{$uicideBoy$}', 'https://avatars.yandex.net/get-music-content/4401814/3d09999c.a.16561636-1/400x400', 'foreignrap', 0.99),
	('Она тебя любит', 'single', '{SLAVA MARLOW, The Limba, Элджей}', 'https://avatars.yandex.net/get-music-content/5234847/60884c02.a.17528910-1/400x400', 'rusrap', 0.99),
	('HELLA PLAYERS', 'single', '{OBLADAET, JEEMBO}', 'https://avatars.yandex.net/get-music-content/4388221/4c207a27.a.17585959-1/400x400', 'rusrap', 0.99),
	('Don’t Go', 'single', '{Justin Bieber, Skrillex, Don Toliver}', 'https://avatars.yandex.net/get-music-content/4399834/35581025.a.17593581-1/400x400', 'dance', 0.99),
	('Вредные привычки', 'single', '{Markul}', 'https://avatars.yandex.net/get-music-content/5309210/adf56b61.a.17393870-2/400x400', 'rusrap', 0.99),
	('Хентай', 'single', '{The Limba, Rakhim}', 'https://avatars.yandex.net/get-music-content/5282321/90ebd930.a.17525259-1/400x400', 'rusrap', 0.99),
	('papercuts', 'single', '{Machine Gun Kelly}', 'https://avatars.yandex.net/get-music-content/4446014/f4625e55.a.17357034-2/400x400', 'rock', 0.99),
	('Цыгане из Парижа', 'single', '{Скриптонит, RODIONIS}', 'https://avatars.yandex.net/get-music-content/4446014/8ad430a8.a.17557622-1/400x400', 'rusrap', 0.99),
	('PIKACHU', 'single', '{БИЛИК}', 'https://avatars.yandex.net/get-music-content/5280749/89739065.a.17276959-1/400x400', 'rusrap', 0.99),
	('ШОРТ ЛАВ', 'single', '{LOVV66}', 'https://avatars.yandex.net/get-music-content/4388221/1608143d.a.17554329-1/400x400', 'rusrap', 0.99),
	('glow', 'album', '{LILDRUGHILL}', 'https://avatars.yandex.net/get-music-content/5207413/68c880bc.a.17437704-1/400x400', 'rusrap', 0.99),
	('Cheers to the Best Memories', 'album', '{Ty Dolla $ign, dvsn}', 'https://avatars.yandex.net/get-music-content/4399834/e274b861.a.17566215-1/400x400', 'foreignrap', 0.99),
	('Madden NFL 22 Soundtrack', 'album', '{EA Sports Madden NFL, Swae Lee, J.I.D}', 'https://avatars.yandex.net/get-music-content/5234929/d4535f65.a.17381351-1/400x400', 'foreignrap', 0.99),
	('Run It Up', 'single', '{Sheff G, Sleepy Hallow, A Boogie Wit da Hoodie}', 'https://avatars.yandex.net/get-music-content/5282321/5b13921f.a.17367505-1/400x400', 'foreignrap', 0.99),
	('ГВАТЕМАЛА', 'single', '{МАЛЬБЭК, SQWOZ BAB}', 'https://avatars.yandex.net/get-music-content/5309210/a8c11f33.a.17393591-1/400x400', 'rusrap', 0.99),
	('Ой да на рейве', 'single', '{Ильич да Софья, SLAVA MARLOW}', 'https://avatars.yandex.net/get-music-content/5236179/e0c43458.a.17439869-1/400x400', 'ruspop', 0.99),
	('Oh Lord', 'single', '{Bizzarachi Big Mo Biz J.A.P.A.N The indu$try Boss, Lil Wayne, Mannie Fresh, Uncle Murda, 2.17 Manami Kanzaki}', 'https://avatars.yandex.net/get-music-content/5282321/20f82fb2.a.17520508-1/400x400', 'foreignrap', 0.99),
	('Hella Girls', 'single', '{Fendi P, Juicy J}', 'https://avatars.yandex.net/get-music-content/4399834/826c8cb4.a.17284577-1/400x400', 'foreignrap', 0.99),
	('Заманчивая', 'single', '{MATRANG}', 'https://avatars.yandex.net/get-music-content/5280749/83fb96f4.a.17438606-1/400x400', 'rusrap', 0.99),
	('Прадо', 'single', '{Archi}', 'https://avatars.yandex.net/get-music-content/5280749/91a22c33.a.17486801-1/400x400', 'rusrap', 0.99),
	('Chasing Stars', 'single', '{Alesso, Marshmello, James Bay}', 'https://avatars.yandex.net/get-music-content/4382102/61f3e53f.a.17494227-1/400x400', 'pop', 0.99),
	('Summer', 'single', '{Jaden}', 'https://avatars.yandex.net/get-music-content/4382102/eaab18c1.a.17494137-1/400x400', 'foreignrap', 0.99);
