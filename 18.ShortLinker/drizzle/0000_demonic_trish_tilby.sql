CREATE TABLE `shorten_links` (
	`shorten` varchar(10) NOT NULL,
	`coin_symbol` varchar(25) NOT NULL,
	CONSTRAINT `unique_shorten_link` UNIQUE(`shorten`),
	CONSTRAINT `unique_link` UNIQUE(`coin_symbol`)
);
