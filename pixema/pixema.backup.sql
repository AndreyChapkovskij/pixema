PGDMP     /    '                {            pixema    15.0    15.0 ,    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    16555    pixema    DATABASE     z   CREATE DATABASE pixema WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE pixema;
                postgres    false            ?            1259    25339    countryMovies    TABLE     ?   CREATE TABLE public."countryMovies" (
    "movieId" integer NOT NULL,
    "moviesCountryId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."countryMovies";
       public         heap    postgres    false            ?            1259    25305    genresMovies    TABLE     ?   CREATE TABLE public."genresMovies" (
    "movieId" integer NOT NULL,
    "moviesGenreId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."genresMovies";
       public         heap    postgres    false            ?            1259    25294    movies    TABLE     ?  CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    rating character varying(255) DEFAULT '0'::character varying,
    img character varying(255) NOT NULL,
    imdb character varying(255) NOT NULL,
    duration integer DEFAULT 0,
    description character varying(255) NOT NULL,
    year integer DEFAULT 0,
    trends integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.movies;
       public         heap    postgres    false            ?            1259    25092    movies_countries    TABLE     ?   CREATE TABLE public.movies_countries (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public.movies_countries;
       public         heap    postgres    false            ?            1259    25091    movies_countries_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.movies_countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.movies_countries_id_seq;
       public          postgres    false    217            3           0    0    movies_countries_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.movies_countries_id_seq OWNED BY public.movies_countries.id;
          public          postgres    false    216            ?            1259    25056    movies_genres    TABLE     ?   CREATE TABLE public.movies_genres (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public.movies_genres;
       public         heap    postgres    false            ?            1259    25055    movies_genres_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.movies_genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.movies_genres_id_seq;
       public          postgres    false    215            4           0    0    movies_genres_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.movies_genres_id_seq OWNED BY public.movies_genres.id;
          public          postgres    false    214            ?            1259    25293    movies_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public          postgres    false    219            5           0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
          public          postgres    false    218            ?            1259    25321    movies_infos    TABLE     ?  CREATE TABLE public.movies_infos (
    id integer NOT NULL,
    released character varying(255) NOT NULL,
    boxoffice character varying(255) NOT NULL,
    production character varying(255) NOT NULL,
    actors character varying(255) NOT NULL,
    director character varying(255) NOT NULL,
    writers character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "infoId" integer,
    "movieId" integer
);
     DROP TABLE public.movies_infos;
       public         heap    postgres    false            ?            1259    25320    movies_infos_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.movies_infos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.movies_infos_id_seq;
       public          postgres    false    222            6           0    0    movies_infos_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.movies_infos_id_seq OWNED BY public.movies_infos.id;
          public          postgres    false    221            ~           2604    25297 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            }           2604    25095    movies_countries id    DEFAULT     z   ALTER TABLE ONLY public.movies_countries ALTER COLUMN id SET DEFAULT nextval('public.movies_countries_id_seq'::regclass);
 B   ALTER TABLE public.movies_countries ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            |           2604    25059    movies_genres id    DEFAULT     t   ALTER TABLE ONLY public.movies_genres ALTER COLUMN id SET DEFAULT nextval('public.movies_genres_id_seq'::regclass);
 ?   ALTER TABLE public.movies_genres ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            ?           2604    25324    movies_infos id    DEFAULT     r   ALTER TABLE ONLY public.movies_infos ALTER COLUMN id SET DEFAULT nextval('public.movies_infos_id_seq'::regclass);
 >   ALTER TABLE public.movies_infos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            ,          0    25339    countryMovies 
   TABLE DATA           a   COPY public."countryMovies" ("movieId", "moviesCountryId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   c8       )          0    25305    genresMovies 
   TABLE DATA           ^   COPY public."genresMovies" ("movieId", "moviesGenreId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   <:       (          0    25294    movies 
   TABLE DATA           }   COPY public.movies (id, title, rating, img, imdb, duration, description, year, trends, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   	=       &          0    25092    movies_countries 
   TABLE DATA           N   COPY public.movies_countries (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   ?D       $          0    25056    movies_genres 
   TABLE DATA           K   COPY public.movies_genres (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   E       +          0    25321    movies_infos 
   TABLE DATA           ?   COPY public.movies_infos (id, released, boxoffice, production, actors, director, writers, "createdAt", "updatedAt", "infoId", "movieId") FROM stdin;
    public          postgres    false    222   ?E       7           0    0    movies_countries_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.movies_countries_id_seq', 5, true);
          public          postgres    false    216            8           0    0    movies_genres_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.movies_genres_id_seq', 6, true);
          public          postgres    false    214            9           0    0    movies_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.movies_id_seq', 32, true);
          public          postgres    false    218            :           0    0    movies_infos_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.movies_infos_id_seq', 32, true);
          public          postgres    false    221            ?           2606    25343     countryMovies countryMovies_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public."countryMovies"
    ADD CONSTRAINT "countryMovies_pkey" PRIMARY KEY ("movieId", "moviesCountryId");
 N   ALTER TABLE ONLY public."countryMovies" DROP CONSTRAINT "countryMovies_pkey";
       public            postgres    false    223    223            ?           2606    25309    genresMovies genresMovies_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public."genresMovies"
    ADD CONSTRAINT "genresMovies_pkey" PRIMARY KEY ("movieId", "moviesGenreId");
 L   ALTER TABLE ONLY public."genresMovies" DROP CONSTRAINT "genresMovies_pkey";
       public            postgres    false    220    220            ?           2606    25097 &   movies_countries movies_countries_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.movies_countries
    ADD CONSTRAINT movies_countries_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.movies_countries DROP CONSTRAINT movies_countries_pkey;
       public            postgres    false    217            ?           2606    25061     movies_genres movies_genres_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.movies_genres
    ADD CONSTRAINT movies_genres_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.movies_genres DROP CONSTRAINT movies_genres_pkey;
       public            postgres    false    215            ?           2606    25328    movies_infos movies_infos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.movies_infos
    ADD CONSTRAINT movies_infos_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.movies_infos DROP CONSTRAINT movies_infos_pkey;
       public            postgres    false    222            ?           2606    25304    movies movies_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_pkey;
       public            postgres    false    219            ?           2606    25344 (   countryMovies countryMovies_movieId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."countryMovies"
    ADD CONSTRAINT "countryMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."countryMovies" DROP CONSTRAINT "countryMovies_movieId_fkey";
       public          postgres    false    219    3208    223            ?           2606    25349 0   countryMovies countryMovies_moviesCountryId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."countryMovies"
    ADD CONSTRAINT "countryMovies_moviesCountryId_fkey" FOREIGN KEY ("moviesCountryId") REFERENCES public.movies_countries(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public."countryMovies" DROP CONSTRAINT "countryMovies_moviesCountryId_fkey";
       public          postgres    false    223    3206    217            ?           2606    25310 &   genresMovies genresMovies_movieId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."genresMovies"
    ADD CONSTRAINT "genresMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."genresMovies" DROP CONSTRAINT "genresMovies_movieId_fkey";
       public          postgres    false    219    220    3208            ?           2606    25315 ,   genresMovies genresMovies_moviesGenreId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."genresMovies"
    ADD CONSTRAINT "genresMovies_moviesGenreId_fkey" FOREIGN KEY ("moviesGenreId") REFERENCES public.movies_genres(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."genresMovies" DROP CONSTRAINT "genresMovies_moviesGenreId_fkey";
       public          postgres    false    215    220    3204            ?           2606    25329 %   movies_infos movies_infos_infoId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.movies_infos
    ADD CONSTRAINT "movies_infos_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.movies_infos DROP CONSTRAINT "movies_infos_infoId_fkey";
       public          postgres    false    219    3208    222            ?           2606    25334 &   movies_infos movies_infos_movieId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.movies_infos
    ADD CONSTRAINT "movies_infos_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.movies_infos DROP CONSTRAINT "movies_infos_movieId_fkey";
       public          postgres    false    3208    219    222            ,   ?  x???In%1@ןSd?
2?????????R?Y???^
z???g?O????????O?~??u???S|#˻Ћ'ѳI?U[":?L???/;q?EQ?d?1ۤ?]$1?b
?"YG??????????2?l??=?ԩ?mpb:?L??9?i?%PK??C@%???o??,?C@ߨO%?̂G@qUd???eQ?0ZVM(?̮G@jU?&H???G[=k}?Z?Ue?7JT??z???ZcT?\??Luh????<i?G@-&\רb?,?C[???G??Z??ph??֧j\:???V?!??t??y{?ju?BT+{??&??8.????~К?%<??x??%?:W?dZ??u ?E?f???!?x-l?????dS=????TŖ?G[my?ƃa}մ?J?ȣ???U??k?uX99????e???HazB??nN??=Lz?W?c??6?g:|! |4??g      )   ?  x???K?\!E??V?yԈ???%?_Gp?E???]??#?m0?GyDӗ_1?
m?0bs??o??
?>???yo2??#??>b?????h?;??f??Cs??ٕ\S?i?׽Y?&Dk43F[??.??O??	U1??C???u?Z??{EӄܚM??h?m??'????i????ᬼ?i??Z͊Ѧ?}??r?$??	?͵*V?A??<rt??h?;?f|?P??1Z??w?k?h???لz??1E???̽?Q?X?x?*lU淍\??^bV??;??c]S????j{?UȰ]??fUq?e??ƥ?L?X=?7??Y???à?BP._?X=?7?Z?Jp▉U??$b?dW??V?`?4?w?k?@????jU+\?=?Z?T?X]??Tت6,Ne??򔔈UخB?\;t]gNn??/U[U V?8v??Oj???????i?7a?zc???z?G?y?=+?D???r?K???f?n4v?=?MW?X]{??Z???!(ʎ??,Bvm"N8J??SN?7`mO??i???F4|w?+??X?*ޜ?*?*kUq????·PT&?D?B??Uت??????U????UXծBq?*N5j?sCZqb2lW!`?????(???U?&?
?1?i?IE???o!`?,????Z>U???<??̵???W!???smAW???҃fA?B?v???\Y???]??٥	)      (   ~  x??Y?n?H]?????q??]?N?L'?`?A??T??lud1M??d??5̈D???a]?"??y?%??????hg?餗RG^?<'#O??x絪Y?ż????;Ť???0?????a??S;ޗ???!?x??S{_C;???O??q,C??p???C????x???p????˹?Oml?x,?q???Cy*?/=ǡMe|.?t??s??y?@ߕ??:??;??č???\H?t+?^Ƚ?K???f?(???ǈ?gn? 蔭?WO???2O6$?m?TTJX/X???b?X?,?^?^??t??G?f?F?ӯq8????h;?ӯ'ŉ?䡳??.?y'?u3$??E4?`????^Ҏ?_Ac6j???ﾔ?i?}??8?%7?:,?<8@AQ[??9?+a?PHZ.??ډ? ɏ?ư?]d@?]̚??8????E???TAS]?p??.?p{)v&???2i,{?w????x(h ?????nE???<?L<??U9*g.p?	?M
???h??9??x?G?cﻂO?0?;??<v?MkQ?~?v6???,׵ ?r?8ȥTh@W`x?4??ý??x?ZI`?!?X?S?$??%??C??M??Z?f?h?Z*????v???GM`??C:?T
?^1??EZ??F?Cf??!sT|??#?j.??\ь???Z??????????%??Ē??/p?`?H?I??E6??tK$??b??Q#%?<???^?TB????[???=l??8?Q!???F?&???~?????????????n?ᙫ$UIpU*D??\W???Z|?W? ?f?p?\?0??r?٨????????U(rC??RU??$?pYw?g??Z`??H?K%?܅?????)????~?djdM/?RHW(!?iZ[????J'??*??? x?ro?΋??G|??????RA??,??R?r?p??[?\?????͖Ե??x❠????$?_??]??{<???????%?)??ʵ?hh"??x?ҧTc???2??6????sk25???? TX&?%HǕ???Y?+*k?Y?"?W??(?&???˘Av?J?٨??+C>???p???29#?{5ePty???<[?D?Z??W????2k???Y?J֘??{d??c<?3???J?R??? ?%??j??:Q??`'46I?e'??d?^?e?(?>??????!????ʐ?*%?L???%????]?*P'???Uk	K@P????z?F?dOq??%Py?s??L6?%ϓ#??Yg????t?B?-*??s1bj!N???|Ԡۼ>?\`??2?Bp??0c????>Y????t??E?X9?3r?h???GP|?T?=?1,	B???J셖?P,G???(??5]O?~i????rĨ??N???G?"??~(ݗK?.?????J?S ??k8K?)?ګ?x`?Ɇb????q@????G
??????7}?t8^j?ϩB'GgC???q???>?K?? Q[?d?????????55ʲ_??>??????B?V;?-?(N-Vl_?]I^$c?? z?? R.v????i?Ɨ٨A??؟θ?s???:r>????Ք???,)O?bs??8})֫?Ȧ.???UU,Ӈq{?Z?5??F???3??f??|??A?C?:?#???b,/?.:'?jW???A<քՃ!P?8^&???2< ??? &F????p??/?2H?NZ]??.?????d6]???Nvʬm?l?h??q8}?־>?i????a??a)(??????_-I?IW@??f??{{8??^???6??8iP??į?1N?ex*G?UͲr2k???ը???????;???lj~?<???/?s_N{??U֛Q??????X.??D?	"?+??(s???5AXrն?f?hܞ?N??=p,?{3j~?5M?'?i?P      &   g   x?3???,IMQ???KO???4202?50?52V04?24?26ѳ40?60?#?e??Y??SI?nc?#A?.R?d?b??V????J?vSN?ԜĢRr?????? ??F"      $   f   x???1? @ѹ???`??F??? F!?h????C???-PlG-??Cm?v??i?aA?????r?W??B???Nj??\??Yx???+?#lT]R?J???O?      +   ?  x?ՙ=o?0?gݯ?Э?;~???4h???u???j+T?
?	?ߣ??2???????w/e???OKO?{?N?????bw???Ǘ?üλ???<?_?ǿO?????Ǘ]?u<?S{ZϪ{???=?#?yY?C7?X?]???????Ӟ;Lg?汻??}?i:/?????????Ϗ?e???q???v??#M?F??CҘ(?a????a?@O-?3&?????m=??#0bדe\B??????dO??U?j???v\a??Y	?
???΁??!{:9???6??ڳB??0??Y?H5???CC?DC7@(6n?$I?6Y???hC
]?(??T???,Q?"?"
?v?U4?!Z?,???^U?4Ր,??2-HVD?"i'M4^N?od?
eI4?#H?j>??1^
?`???4MLΨFZ(@??Np3?&?C???W??$`??x???rh?*??Q???,?IS???BC?DYr ,???????ƌ?P??QrK
?-????T?,?ʌ????,?`?~?????D?ڒ?9?F??Uk?\@EJ"-M??	?\#?*RI??????ӊ?5?T$%-?͊3?y?]?"??	5?%??I???*??8U?4_Z?q????*??????d9?VS???$7????c??V(p?YIڅ??>?<?V?B??????tҚ?/
?6?oK?&???y??ٶ?-bI?`????R????j?lK?o
 ?:]?     