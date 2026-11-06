document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       NAVBAR — disparition au scroll
    ================================================== */

    const nav = document.querySelector(".nav");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (nav) {
            nav.classList.toggle(
                "hide",
                currentScroll > lastScroll && currentScroll > 100
            );
        }

        lastScroll = Math.max(currentScroll, 0);
    });


    /* ==================================================
       FILTRES DES PROJETS
    ================================================== */

    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project-tile");

    filters.forEach(button => {
        button.addEventListener("click", () => {

            filters.forEach(filter => {
                filter.classList.remove("is-active");
            });

            button.classList.add("is-active");

            const selectedFilter = button.dataset.filter;

            projects.forEach(project => {

                const categories =
                    project.dataset.category?.split(" ") || [];

                const shouldShow =
                    selectedFilter === "all" ||
                    categories.includes(selectedFilter);

                if (shouldShow) {

                    project.classList.remove("is-hidden");

                    project.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(20px) scale(.97)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0) scale(1)"
                            }
                        ],
                        {
                            duration: 450,
                            easing: "cubic-bezier(.2,.8,.2,1)"
                        }
                    );

                } else {
                    project.classList.add("is-hidden");
                }
            });
        });
    });


    /* ==================================================
       ANIMATIONS D'APPARITION AU SCROLL
    ================================================== */

    const animatedElements = document.querySelectorAll(
        ".section, .project-tile, .edu-row, .skill-list > div, .tools, .facts > div"
    );

    animatedElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });
        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ==================================================
       BARRE DE PROGRESSION
    ================================================== */

    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    function updateProgress() {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? window.scrollY / documentHeight
                : 0;

        progressBar.style.transform =
            `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();


    /* ==================================================
       SECTION ACTIVE DANS LE MENU
    ================================================== */

    const navigationLinks =
        [...document.querySelectorAll('.nav nav a[href^="#"]')];

    const sections = navigationLinks
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navigationLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ==================================================
       BOUTON RETOUR EN HAUT
    ================================================== */

    let backToTop = document.querySelector(".back-top");

    if (!backToTop) {
        backToTop = document.createElement("button");
        backToTop.className = "back-top";
        backToTop.innerHTML = "↑";
        backToTop.setAttribute("aria-label", "Retour en haut");
        document.body.appendChild(backToTop);
    }

    window.addEventListener("scroll", () => {

        backToTop.classList.toggle(
            "show",
            window.scrollY > 650
        );

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ==================================================
       PARALLAXE DU HERO
    ================================================== */

    const blobA = document.querySelector(".blob-a");
    const blobB = document.querySelector(".blob-b");

    window.addEventListener("mousemove", event => {

        if (
            window.innerWidth < 900 ||
            !blobA ||
            !blobB
        ) return;

        const x =
            event.clientX / window.innerWidth - 0.5;

        const y =
            event.clientY / window.innerHeight - 0.5;

        blobA.style.translate =
            `${x * 22}px ${y * 16}px`;

        blobB.style.translate =
            `${x * -18}px ${y * -12}px`;

    });


    /* ==================================================
       EFFET MAGNÉTIQUE
    ================================================== */

    document.querySelectorAll(".pill, .filter")
        .forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });

        });


    /* ==================================================
       CURSEUR PERSONNALISÉ
    ================================================== */

    let cursor = document.querySelector(".cursor-dot");

    if (
        window.matchMedia("(pointer: fine)").matches &&
        cursor
    ) {

        window.addEventListener("mousemove", event => {

            cursor.style.transform =
                `translate(${event.clientX}px, ${event.clientY}px)`;

        });

        document
            .querySelectorAll("a, button, .project-tile")
            .forEach(element => {

                element.addEventListener(
                    "mouseenter",
                    () => cursor.classList.add("hover")
                );

                element.addEventListener(
                    "mouseleave",
                    () => cursor.classList.remove("hover")
                );

            });
    }


    /* ==================================================
       LOGOS DES APPLICATIONS
    ================================================== */

    document.querySelectorAll(".tool")
        .forEach(tool => {

            tool.addEventListener("mouseenter", () => {

                const image = tool.querySelector("img");

                if (image) {
                    image.style.transform =
                        "translateY(-7px) scale(1.08)";
                }

            });

            tool.addEventListener("mouseleave", () => {

                const image = tool.querySelector("img");

                if (image) {
                    image.style.transform = "";
                }

            });

        });


    /* ==================================================
       SCROLL DOUX
    ================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const id = link.getAttribute("href");

                if (!id || id === "#") return;

                const target =
                    document.querySelector(id);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* ==================================================
       DONNÉES DES PROJETS
    ================================================== */

    const projectData = {
noskip: {"number": "13", "title": "Noskip Festival", "category": "Projet personnel · Vidéo de concert", "subtitle": "PROJET PERSONNEL · CAPTATION VIDÉO", "image": "img/noskip.png", "link": null, "context": "Dans le cadre d’un projet personnel, j’ai obtenu une accréditation pour filmer des artistes pendant le Noskip Festival à Saint-Brieuc. Mon objectif était de capturer leurs prestations et de retranscrire l’ambiance des concerts en vidéo. L’affiche du festival est présentée ici à titre d’illustration ; mon travail porte sur la captation vidéo.", "missions": ["Captation vidéo des artistes sur scène", "Recherche de cadrages pour mettre en valeur leurs prestations", "Adaptation aux mouvements des artistes et aux conditions du concert"], "skills": ["Cadrage", "Prise de vue", "Réactivité", "Autonomie"], "bilan": "Cette expérience m’a permis de pratiquer la vidéo dans les conditions réelles d’un festival. J’ai appris à réagir rapidement pour saisir les moments qui me semblaient les plus intéressants.", "tools": []},
wingrow: {"number": "14", "title": "Wingrow Festival", "category": "Projet personnel · Vidéo de concert", "subtitle": "PROJET PERSONNEL · CAPTATION VIDÉO", "image": "img/wingrow.png", "link": null, "context": "Grâce à une accréditation obtenue dans le cadre de ma démarche personnelle, j’ai réalisé des vidéos d’artistes lors du Wingrow Festival à Saint-Brieuc. Je souhaitais garder une trace de leurs performances et proposer mon regard sur l’événement. L’affiche du festival est présentée ici à titre d’illustration ; mon travail porte sur la captation vidéo.", "missions": ["Réalisation de prises de vue pendant les concerts", "Variation des plans et des angles pour montrer les artistes en scène", "Attention portée aux gestes, aux expressions et à l’énergie des prestations"], "skills": ["Captation vidéo", "Composition de l’image", "Observation", "Adaptabilité"], "bilan": "Ce projet m’a permis de développer mon regard et de gagner en aisance pour filmer des concerts. Il m’a aussi donné envie de poursuivre la création vidéo dans le milieu musical.", "tools": []},

        duralex: {
            number: "01",
            category: "COMMUNICATION · AUDIT",
            title: "Duralex",
            subtitle: "AUDIT DE COMMUNICATION NUMÉRIQUE",
            image: "img/duralex.png",

            context: `J’ai réalisé ce projet dans le cadre de l’audit d’une communication numérique. Mon objectif était d’analyser la communication digitale de Duralex, marque française emblématique de vaisselle en verre trempé, afin d’évaluer son image de marque, sa cohérence éditoriale et l’expérience utilisateur proposée en ligne.`,

            missions: [
                "Analyse du contexte et du positionnement de la marque",
                "Audit de la communication numérique (site web et réseaux sociaux)",
                "Analyse sémiotique des visuels, des textes et du récit de marque",
                "Étude de l’architecture de l’information et des parcours utilisateurs",
                "Audit ergonomique et comparatif concurrentiel",
                "Rédaction d’un rapport d’audit structuré et argumenté"
            ],

            skills: [
                "Analyse",
                "Compréhension de la communication digitale",
                "Esprit critique",
                "Organisation"
            ],

            bilan: `J’ai appris à analyser la communication numérique d’une marque. Ce projet a développé mon esprit critique et ma capacité à structurer un audit.`,

            tools: [
                ["Google Docs", "img/Google_Docs.png"],
                ["Canva", "img/Canva.png"],
                ["Google Sheets", "img/sheets.png"]
            ]
        },


        westfest: {
            number: "02",
            category: "COMMUNICATION DIGITALE",
            title: "À l’West Fest",
            subtitle: "RECOMMANDATION DE COMMUNICATION DIGITALE",
            image: "img/a l'west fest 2.png",

            context: `J’ai réalisé ce projet dans le cadre de la recommandation de communication numérique. Mon objectif était de concevoir un plan de communication digital pour le festival MMI A l’West Fest, un événement visant à valoriser les projets et les compétences des étudiants MMI auprès des étudiants, des futurs candidats et des partenaires.`,

            missions: [
                "Analyse du positionnement et des objectifs du festival",
                "Réalisation d’un audit et d’une analyse concurrentielle",
                "Définition des cibles et création de persona",
                "Élaboration d’une stratégie de communication digitale",
                "Création d’une charte éditoriale et iconographique",
                "Conception d’un plan d’action (avant, pendant et après l’événement)",
                "Proposition de contenus, formats et canaux de diffusion",
                "Rédaction de prototypes de mails et contenus réseaux sociaux"
            ],

            skills: [
                "Créativité",
                "Réflexion stratégique",
                "Adaptation aux publics",
                "Travail en équipe"
            ],

            bilan: `J’ai appris à construire une stratégie de communication adaptée à un événement et à ses publics. Ce projet m’a aidé à relier les objectifs aux actions proposées.`,

            tools: [
                ["Google Docs", "img/Google_Docs.png"],
                ["Canva", "img/Canva.png"],
                ["CapCut", "img/CapCut.png"]
            ]
        },


        affiche: {
            number: "03",
            category: "CRÉATION GRAPHIQUE",
            title: "Affiche de À L’West Fest",
            subtitle: "CRÉATION GRAPHIQUE",
            image: "img/affiche 2.png",

            context: `J’ai réalisé ce projet dans le cadre d’un dossier d’agence. Mon objectif était de concevoir une affiche de communication pour le festival étudiant A l’West Fest, en proposant une identité visuelle personnelle, cohérente et adaptée à un événement multimédia.`,

            missions: [
                "Analyse de l’existant et des affiches de festivals",
                "Recherches graphiques personnelles",
                "Création de plusieurs concepts visuels",
                "Conception de maquettes d’affiche",
                "Choix et justification d’une direction artistique",
                "Réalisation de la version finale de l’affiche"
            ],

            skills: [
                "Créativité visuelle",
                "Sens esthétique",
                "Autonomie",
                "Prise de décision"
            ],

            bilan: `J’ai développé une démarche de création graphique, de la recherche à la finalisation. J’ai appris à affirmer mes choix pour concevoir une affiche cohérente et lisible.`,

            tools: [
                ["Pinterest", "img/Pinterest.png"],
                ["Photoshop", "img/Photoshop.png"],
                ["Canva", "img/Canva.png"]
            ]
        },


        cyber: {
            number: "04",
            category: "PRODUCTION AUDIOVISUELLE",
            title: "Le cyberharcèlement",
            subtitle: "PRODUCTION AUDIOVISUELLE",

            // GRANDE IMAGE affichée dans la fiche projet
            image: "img/cyberharcelement 2.jpg",

            link: "img/1B1 equipe8 FR.mp4",

            context: `J’ai réalisé ce projet dans le cadre de la production d’un contenu audio et vidéo. Mon objectif était de concevoir un court film de sensibilisation sur le thème du cyberharcèlement, destiné à un public jeune, afin de montrer l’impact réel des violences en ligne. Mon rôle était de faire la gestion du son.`,

            missions: [
                "Participation à l’écriture du scénario et à la note d’intention",
                "Élaboration du storyboard et de la shotlist",
                "Préparation du tournage (repérages, matériel, organisation)",
                "Prise de son lors du tournage",
                "Participation au suivi de production et à la cohérence du projet"
            ],

            skills: [
                "Créativité",
                "Sens du récit",
                "Travail en équipe",
                "Organisation"
            ],

            bilan: `J’ai découvert les étapes d’une production audiovisuelle et le rôle du son dans le récit. Ce projet m’a appris à utiliser du matériel professionnel en équipe.`,

            tools: [
                ["DaVinci Resolve", "img/DaVinci_Resolve.png"],
                ["CapCut", "img/CapCut.png"],
                ["Google Docs", "img/Google_Docs.png"]
            ]
        },


        pokemon: {
            number: "05",
            category: "WEB · UI/UX",
            title: "Site web Pokémon",
            subtitle: "PRODUCTION D’UN SITE WEB",
            image: "img/site pokemon.png",
            link: "https://pratbernoul1-hue.github.io/site_pok-slay",

            context: `J’ai réalisé ce projet dans le cadre de la production d’un site web. Mon objectif était de concevoir un site web fonctionnel autour de l’univers Pokémon, en travaillant à la fois l’univers visuel, l’organisation des pages et l’expérience utilisateur.`,

            missions: [
                "Définition du concept et de l’univers visuel du site",
                "Création de moodboards et recherches graphiques",
                "Conception des wireframes et maquettes sur Figma",
                "Organisation de la navigation et des pages du site",
                "Création des pages (accueil, collection, fiche Pokémon, connexion)",
                "Intégration du contenu et cohérence visuelle globale"
            ],

            skills: [
                "Créativité",
                "Organisation",
                "Autonomie",
                "Logique web"
            ],

            bilan: `J’ai appris à organiser les pages d’un site et à construire un univers visuel cohérent. Ce projet a renforcé mon autonomie et ma compréhension de l’expérience utilisateur.`,

            tools: [
                ["Figma", "img/Figma.png"],
                ["Visual Studio Code", "img/visualcode.png"],
                ["FileZilla", "img/FileZilla.png"]
            ]
        },


        bulat: {
            number: "06",
            category: "COMMUNICATION NUMÉRIQUE",
            title: "Bulat-Pestivien",
            subtitle: "GESTION DE PROJET DE COMMUNICATION NUMÉRIQUE",
            image: "img/bulat.png",

            context: `J’ai réalisé ce projet dans le cadre de la gestion d’un projet de communication numérique. Mon objectif était de concevoir un projet de valorisation touristique et culturelle pour la commune de Bulat-Pestivien, en mettant en avant ses fontaines historiques et ses légendes locales, dans une logique de communication à l’international.`,

            missions: [
                "Analyse du territoire et des éléments à valoriser",
                "Définition des objectifs et des publics cibles",
                "Conception d’un concept de parcours immersif",
                "Élaboration d’un cahier des charges détaillé",
                "Définition des moyens de communication (site web, réseaux sociaux, QR codes)",
                "Création d’un plan d’action et d’un planning prévisionnel",
                "Travail collaboratif et suivi du projet"
            ],

            skills: [
                "Organisation",
                "Travail en équipe",
                "Créativité",
                "Gestion de projet"
            ],

            bilan: `J’ai appris à structurer un projet de communication pour valoriser un territoire. Ce travail a renforcé mon organisation et ma capacité à collaborer.`,

            tools: [
                ["CapCut", "img/CapCut.png"],
                ["Google Docs", "img/Google_Docs.png"],
                ["Canva", "img/Canva.png"]
            ]
        },


        bonbons: {
            "number": "08",
            "title": "Les Bon-Bons",
            "subtitle": "CONCEPTION WEB · UI/UX",
            "category": "Web · UI/UX",
            "image": "img/bonbons.jpg",
            "context": "J’ai réalisé ce projet en binôme dans le cadre de la SAÉ 203, consacrée à la conception d’un site web avec une source de données. Notre objectif était de concevoir l’interface d’un site pour Les Bon-Bons, une entreprise de confiseries biologiques utilisant des ingrédients locaux. Nous avons travaillé sur un univers visuel gourmand et accueillant, ainsi que sur les parcours des clients et du gérant.",
            "missions": [
                "Analyse de l’entreprise, de son activité et de ses valeurs",
                "Recherche de plusieurs univers graphiques à travers des planches d’inspiration",
                "Choix d’une direction visuelle et réalisation de planches de style",
                "Conception des wireframes pour organiser les contenus et la navigation",
                "Réalisation des maquettes sur Figma",
                "Conception des interfaces du catalogue, des fiches produits, du panier et de l’espace de gestion"
            ],
            "skills": [
                "Conception d’interface",
                "Organisation des contenus",
                "Cohérence graphique",
                "Expérience utilisateur",
                "Travail en binôme"
            ],
            "bilan": `J’ai appris à concevoir des interfaces adaptées aux besoins des clients et du gérant. Ce projet m’a permis de relier l’identité de la marque à l’organisation des pages.`,
            "tools": [
                [
                    "Visual Studio Code",
                    "img/visualcode.png"
                ],
                [
                    "Figma",
                    "img/Figma.png"
                ],
                [
                    "Google Docs",
                    "img/Google_Docs.png"
                ]
            ]
        },
        depliant: {
            "number": "09",
            "title": "Dépliant du BUT MMI",
            "subtitle": "CRÉATION GRAPHIQUE",
            "category": "Création graphique",
            "image": "img/depliant.jpg",
            link: "img/deplient mmi final.pdf",


            "context": "J’ai réalisé ce projet dans le cadre de la production graphique. Mon objectif était de concevoir un dépliant présentant le BUT Métiers du Multimédia et de l’Internet de l’IUT de Lannion. Ce support devait permettre de découvrir la formation, ses spécialisations, ses débouchés et les modalités de candidature, dans une présentation claire et attractive.",
            "missions": [
                "Organisation des informations sur les différents volets du dépliant",
                "Création d’un univers graphique coloré aux formes arrondies",
                "Choix des typographies et hiérarchisation des titres et des textes",
                "Mise en page des informations sur la formation et les débouchés",
                "Intégration des photographies, des logos, des coordonnées et d’un QR code",
                "Harmonisation du recto et du verso pour assurer une continuité visuelle"
            ],
            "skills": [
                "Mise en page",
                "Hiérarchie de l’information",
                "Composition graphique",
                "Typographie",
                "Communication visuelle"
            ],
            "bilan": `J’ai appris à hiérarchiser de nombreuses informations sur les volets d’un dépliant. Ce projet m’a aidé à associer textes et images dans une mise en page cohérente.`,
            "tools": [
                [
                    "Pinterest",
                    "img/Pinterest.png"
                ],
                [
                    "Google Docs",
                    "img/Google_Docs.png"
                ],
                [
                    "Adobe InDesign",
                    "img/indesign.png"
                ]
            ]
        },
        lastel: {
            "number": "10",
            "title": "Logo Lastel",
            "subtitle": "IDENTITÉ VISUELLE",
            "category": "Identité visuelle",
            "image": "img/lastel.jpg",
            "context": "J’ai réalisé ce projet dans le cadre de la ressource R2.08 en production graphique. Mon objectif était de proposer un logo pour l’entreprise Lastel. J’ai conçu une identité typographique sobre, associant une écriture manuscrite fine à la mention « Paris », pour créer une signature visuelle élégante.",
            "missions": [
                "Conception d’un logo centré sur le nom de l’entreprise",
                "Travail sur les formes des lettres et l’équilibre de la composition",
                "Association du lettrage manuscrit à une typographie plus simple pour la mention « Paris »",
                "Réalisation d’une version noire sur fond blanc et d’une version blanche sur fond sombre",
                "Présentation de la proposition finale sur une planche"
            ],
            "skills": [
                "Création de logo",
                "Typographie",
                "Composition",
                "Identité visuelle",
                "Sens du détail"
            ],
            "bilan": `J’ai appris à travailler la typographie et l’équilibre d’un logo. Les deux versions m’ont permis de mieux comprendre le rôle du contraste dans sa lisibilité.`,
            "tools": [
                [
                    "Pinterest",
                    "img/Pinterest.png"
                ],
                [
                    "Google Docs",
                    "img/Google_Docs.png"
                ],
                [
                    "Adobe Illustrator",
                    "img/Illustrator.png"
                ]
            ]
        },
        rochejagu: {
            "number": "11",
            "title": "Le milieu forestier de la Roche-Jagu",
            "subtitle": "INFOGRAPHIE",
            "category": "Infographie",
            "image": "img/rochejagu.jpg",
            "context": "J’ai réalisé ce projet dans le cadre de la transition écologique et sociale. Mon objectif était de concevoir une infographie sur le milieu forestier du parc départemental de la Roche-Jagu. Ce support présente la biodiversité du site, les fonctions écologiques de la forêt et les menaces auxquelles elle est confrontée.",
            "missions": [
                "Synthèse des informations sur le site et son milieu forestier",
                "Organisation des contenus en rubriques thématiques",
                "Présentation de la faune, de la flore et des fonctions écologiques de la forêt",
                "Mise en valeur des menaces et des actions de préservation du domaine",
                "Intégration de photographies, d’illustrations et d’un schéma explicatif",
                "Création d’une composition dans des tons verts en lien avec le sujet"
            ],
            "skills": [
                "Synthèse",
                "Sensibilisation environnementale",
                "Mise en page",
                "Hiérarchie de l’information",
                "Communication visuelle"
            ],
            "bilan": `J’ai appris à synthétiser les enjeux de préservation d’un milieu forestier. Ce projet m’a permis de rendre un sujet environnemental accessible grâce aux textes et aux images.`,
            "tools": [
                [
                    "Adobe Photoshop",
                    "img/Photoshop.png"
                ],
                [
                    "Pinterest",
                    "img/Pinterest.png"
                ]
            ]
        },
        vinyle: {
            number: "12",
            category: "Web · Design d’information",
            title: "Le retour du vinyle",
            subtitle: "PRÉSENTATION WEB INTERACTIVE",

            image: "img/vinyle.svg",
            link: "https://pratbernoul1-hue.github.io/le-retour-du-vinyle/#/vinyle-centre",

            context: `J’ai réalisé une présentation web interactive consacrée au retour du disque vinyle. Mon objectif était d’expliquer son fonctionnement, sa fabrication et les raisons de son succès face au numérique, à travers un parcours visuel animé.`,

            missions: [
                "Définition du sujet, de l’angle et des informations à présenter",
                "Écriture d’un storyboard pour organiser le parcours et les transitions",
                "Conception d’un univers graphique autour du disque et de ses pochettes",
                "Intégration de la présentation en HTML et CSS",
                "Création de visuels en SVG et d’un graphique comparant les ventes de vinyles et de CD",
                "Mise en place de la navigation et des transitions avec impress.js"
            ],

            skills: [
                "Design d’information",
                "Synthèse",
                "HTML / CSS",
                "SVG",
                "Animation et navigation"
            ],

            bilan: `J’ai appris à transformer un sujet documentaire en une présentation web interactive. Ce projet m’a permis de travailler la narration visuelle et les transitions pour guider la découverte du contenu.`,

            tools: [
                ["Visual Studio Code", "img/visualcode.png"],
                ["Google Docs", "img/Google_Docs.png"]
            ]
        },

        balite: {
            number: "07",
            category: "Audiovisuel",
            title: "Balité",
            subtitle: "PRODUCTION AUDIOVISUELLE",
            image: "img/balite.png",
            link: "img/1A1_Balite_Pratbernou_V2_FR.mp4",
            context: `J’ai réalisé ce projet en groupe dans le cadre de la SAÉ 202 du semestre 2. Notre objectif était de concevoir une publicité pour le batteur Balité, autour du slogan « Avec Balité, vos rêves deviennent réalité ». Le film met en scène Nathalie, une mère débordée dont le quotidien devient plus simple grâce à l’apparition du produit. Mon rôle principal était celui de cadreur.`,
            missions: [
                "Participation à l’écriture en proposant des idées pour le scénario",
                "Recherche des plans et choix des cadrages avec le groupe",
                "Captation des scènes en tant que caméraman",
                "Attention portée à la composition des images et aux détails pendant le tournage",
                "Réalisation de mon montage à partir des images filmées"
            ],
            skills: ["Cadrage", "Prise de vue", "Montage vidéo", "Travail en équipe", "Sens du détail"],
            bilan: `J’ai appris à mieux cadrer les plans et à soigner les détails au tournage. Réaliser mon montage m’a permis de donner forme aux images que j’avais filmées.`,
            tools: [["Canva", "img/Canva.png"], ["Google Docs", "img/Google_Docs.png"], ["DaVinci Resolve", "img/DaVinci_Resolve.png"]]
        },


        artfact: {
            number: "07",
            category: "PODCAST · CULTURE NUMÉRIQUE",
            title: "Art&Fact",
            subtitle: "CRÉATION ET RÉALISATION D’UNE ÉMISSION AUDIO",
            image: "img/art&fact.png",
            link: null,

            context: `J’ai réalisé ce projet dans le cadre de la culture numérique. Mon objectif était de concevoir et scénariser un podcast autour d’une question liée à l’art et au numérique. Le thème abordé portait sur la mode et le luxe à l’ère des nouvelles technologies, à travers la problématique : « Le luxe a-t-il sa place dans le numérique ? »`,

            missions: [
                "Choix du thème, de l’angle et de la problématique",
                "Écriture du scénario de l’émission",
                "Création du script et du conducteur radio",
                "Préparation des questions et du débat",
                "Rôle de présentateur principal prévu pour l’émission",
                "Travail collaboratif sur la structure et le contenu du podcast"
            ],

            skills: [
                "Créativité",
                "Expression orale",
                "Travail en équipe",
                "Organisation"
            ],

            bilan: `J’ai appris à structurer et à scénariser une émission audio. Ce projet a renforcé mon expression orale et ma capacité à travailler en équipe.`,

            tools: [
                ["Google Docs", "img/Google_Docs.png"]
            ]
        }
    };


    /* ==================================================
       MODAL PROJETS
       On utilise celle qui existe déjà dans ton HTML
    ================================================== */

    const modal = document.querySelector("#project-modal");

    if (modal) {

        const modalPanel =
            modal.querySelector(".project-modal-panel");

        const modalNumber =
            modal.querySelector("#project-modal-number");

        const modalType =
            modal.querySelector("#project-modal-type");

        const modalTitle =
            modal.querySelector("#project-modal-title");

        const modalImage =
            modal.querySelector("#project-modal-image");

        const modalBody =
            modal.querySelector("#project-modal-body");

        const modalTools =
            modal.querySelector("#project-modal-tools");

        const modalLink =
            modal.querySelector("#project-modal-link");


        function createList(items) {

            return `
                <ul>
                    ${items
                    .map(item => `<li>${item}</li>`)
                    .join("")}
                </ul>
            `;

        }


        let currentProject = null;
        document.addEventListener("portfolio-language-change", () => {
            if (currentProject && modal.classList.contains("is-open")) openProject(currentProject);
        });

        function openProject(key) {
            currentProject = key;

            const original = projectData[key];
            const project = original && window.portfolioI18n.project(key, original);

            if (!project) {
                console.warn(
                    `Projet "${key}" introuvable dans projectData`
                );
                return;
            }


            modalNumber.textContent =
                project.number;

            modalType.textContent =
                project.subtitle;

            modalTitle.textContent =
                project.title;


            /*
            IMPORTANT :
            c'est CETTE image qui est utilisée
            dans la grande fiche.
            */

            const detail = modal.querySelector(".project-detail");
            detail.classList.toggle("balite-portrait", key === "balite");
            detail.classList.remove("image-portrait", "image-landscape");
            modalImage.onload = () => {
                const landscape = key !== "balite" && modalImage.naturalWidth >= modalImage.naturalHeight;
                detail.classList.toggle("image-landscape", landscape);
                detail.classList.toggle("image-portrait", !landscape);
            };
            modalImage.src = project.image;
            if (modalImage.complete && modalImage.naturalWidth) modalImage.onload();

            modalImage.alt =
                project.title;


            modalBody.innerHTML = `

                <section>

                    <h3>Contexte</h3>

                    <p>
                        ${project.context}
                    </p>

                </section>


                <section>

                    <h3>
                        Missions / travail réalisé
                    </h3>

                    ${createList(project.missions)}

                </section>


                <section>

                    <h3>
                        Compétences mobilisées / développées
                    </h3>

                    <div class="project-skill-tags">

                        ${project.skills
                    .map(skill =>
                        `<span>${skill}</span>`
                    )
                    .join("")}

                    </div>

                </section>


                <section>

                    <h3>Bilan personnel</h3>

                    <p>
                        ${project.bilan}
                    </p>

                </section>
            `;


            modalTools.parentElement.style.display = project.tools.length || project.equipment ? "" : "none";
            modalTools.innerHTML =
                project.tools
                    .map(([name, src]) => `

                        <div
                            class="detail-tool"
                            data-name="${name}"
                        >

                            <img
                                src="${src}"
                                alt="${name}"
                            >

                            <span>
                                ${name}
                            </span>

                        </div>

                    `)
                    .join("");


            if (project.equipment) {
                modalTools.parentElement.querySelector("p").textContent = "Matériel de tournage";
                const equipment = document.createElement("p");
                equipment.textContent = project.equipment;
                modalTools.appendChild(equipment);
            } else {
                modalTools.parentElement.querySelector("p").textContent = "Outils utilisés";
            }

            if (project.link) {

                modalLink.href =
                    project.link;

                modalLink.style.display =
                    "inline-flex";

            } else {

                modalLink.style.display =
                    "none";

            }


            window.portfolioI18n.translate(modal);
            modal.classList.add("is-open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );


            if (modalPanel) {
                modalPanel.scrollTop = 0;
            }

        }


        function closeProject() {

            modal.classList.remove(
                "is-open"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        /* ==================================================
           OUVERTURE DES PROJETS
        ================================================== */

        projects.forEach(project => {

            const key =
                project.dataset.project;

            const openButton =
                project.querySelector(".project-open");

            const projectMeta =
                project.querySelector(".project-meta");


            if (openButton) {

                openButton.addEventListener(
                    "click",
                    () => openProject(key)
                );

            }


            if (projectMeta) {

                projectMeta.style.cursor =
                    "pointer";

                projectMeta.addEventListener(
                    "click",
                    () => openProject(key)
                );

            }

        });


        /* ==================================================
           FERMETURE
        ================================================== */

        modal
            .querySelectorAll("[data-close-project]")
            .forEach(element => {

                element.addEventListener(
                    "click",
                    closeProject
                );

            });


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains("is-open")
                ) {
                    closeProject();
                }

            }
        );
    }


    /* ==================================================
       ACCESSIBILITÉ
    ================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }

});