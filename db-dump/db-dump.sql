PGDMP                      {            schedule    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16425    schedule    DATABASE     �   CREATE DATABASE schedule WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE schedule;
                postgres    false            �            1259    16426    lessons    TABLE     :  CREATE TABLE public.lessons (
    teacher character varying(30) NOT NULL,
    lesson character varying(25) NOT NULL,
    link character varying(128) NOT NULL,
    "group" character varying(10) NOT NULL,
    id integer NOT NULL,
    "time" integer NOT NULL,
    day integer NOT NULL,
    period integer NOT NULL
);
    DROP TABLE public.lessons;
       public         heap    postgres    false            �            1259    16429    lessons_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lessons_id_seq;
       public          postgres    false    215            �           0    0    lessons_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;
          public          postgres    false    216            �            1259    16430    notes    TABLE     (  CREATE TABLE public.notes (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    link character varying(128) NOT NULL,
    content character varying(256) NOT NULL,
    lesson character varying(30) NOT NULL,
    type integer NOT NULL,
    login character varying(25) NOT NULL
);
    DROP TABLE public.notes;
       public         heap    postgres    false            �            1259    16433    notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notes_id_seq;
       public          postgres    false    217            �           0    0    notes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
          public          postgres    false    218            �            1259    16434    tokens    TABLE     �   CREATE TABLE public.tokens (
    id character varying(50) NOT NULL,
    login character varying(25) NOT NULL,
    token character varying(50) NOT NULL
);
    DROP TABLE public.tokens;
       public         heap    postgres    false            �            1259    16437    users    TABLE     �   CREATE TABLE public.users (
    login character varying(25) NOT NULL,
    password character varying(25) NOT NULL,
    email character varying(25),
    secret character varying(10),
    admin boolean NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            '           2604    16440 
   lessons id    DEFAULT     h   ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);
 9   ALTER TABLE public.lessons ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            (           2604    16441    notes id    DEFAULT     d   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �          0    16426    lessons 
   TABLE DATA           Z   COPY public.lessons (teacher, lesson, link, "group", id, "time", day, period) FROM stdin;
    public          postgres    false    215   N       �          0    16430    notes 
   TABLE DATA           N   COPY public.notes (id, title, link, content, lesson, type, login) FROM stdin;
    public          postgres    false    217   k       �          0    16434    tokens 
   TABLE DATA           2   COPY public.tokens (id, login, token) FROM stdin;
    public          postgres    false    219   �       �          0    16437    users 
   TABLE DATA           F   COPY public.users (login, password, email, secret, admin) FROM stdin;
    public          postgres    false    220   �       �           0    0    lessons_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.lessons_id_seq', 42, true);
          public          postgres    false    216            �           0    0    notes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.notes_id_seq', 27, true);
          public          postgres    false    218            *           2606    16443    notes notes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
       public            postgres    false    217            ,           2606    16445    tokens tokens_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.tokens DROP CONSTRAINT tokens_pkey;
       public            postgres    false    219            .           2606    16447    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (login);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     