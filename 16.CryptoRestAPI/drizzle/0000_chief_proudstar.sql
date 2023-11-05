CREATE TABLE `coins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`coin_symbol` varchar(25) NOT NULL,
	CONSTRAINT `coins_id` PRIMARY KEY(`id`),
	CONSTRAINT `coin_symbols_idx` UNIQUE(`coin_symbol`)
);
--> statement-breakpoint
CREATE TABLE `market_prices` (
	`price` decimal(20,10) NOT NULL,
	`fetch_date` datetime,
	`coin_id` int,
	`market_id` int
);
--> statement-breakpoint
CREATE TABLE `markets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`market_name` varchar(50) NOT NULL,
	CONSTRAINT `markets_id` PRIMARY KEY(`id`),
	CONSTRAINT `market_name_idx` UNIQUE(`market_name`)
);
--> statement-breakpoint
ALTER TABLE `market_prices` ADD CONSTRAINT `market_prices_coin_id_coins_id_fk` FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `market_prices` ADD CONSTRAINT `market_prices_market_id_markets_id_fk` FOREIGN KEY (`market_id`) REFERENCES `markets`(`id`) ON DELETE no action ON UPDATE no action;