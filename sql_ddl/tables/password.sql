create table if not exists password (
	user_id int primary key,
	password text,
	foreign key (user_id) references user(id)
);