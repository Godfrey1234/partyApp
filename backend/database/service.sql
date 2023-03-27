-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_name text COLLATE pg_catalog."default",
    user_lastname text COLLATE pg_catalog."default",
    account text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    user_email text COLLATE pg_catalog."default",
    profilepic text COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default",
    province text COLLATE pg_catalog."default",
    street text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default",
    area text COLLATE pg_catalog."default",
    service text COLLATE pg_catalog."default",
    price money,
    rating numeric,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;