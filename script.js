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

            bilan: `J’ai compris le fonctionnement d’un audit de communication numérique et les différentes étapes nécessaires pour analyser une marque. J’ai également mieux compris comment une communication digitale se construit.`,

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

            bilan: `Ce projet m’a permis de comprendre comment construire une stratégie de communication digitale complète, de l’audit jusqu’à la recommandation. J’ai également mieux appréhendé la logique d’un plan de communication et la manière de concevoir des actions cohérentes et adaptées à un événement ainsi qu’à ses différents publics.`,

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

            bilan: `J’ai développé une démarche de création graphique en autonomie, de la recherche à la finalisation. J’ai également affirmé mes choix visuels, structuré une direction artistique et conçu une affiche cohérente et lisible pour un événement.`,

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

            link: "https://youtu.be/UfZKlMR53IY?si=tXJBs7CRhrxyK8AW",

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

            bilan: `J’ai compris les différentes étapes de production d’un contenu audiovisuel, de la préparation au tournage. J’ai également développé mon sens du travail en équipe et appris à utiliser du matériel professionnel pour transmettre un message de sensibilisation.`,

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

            bilan: `J’ai compris les étapes de création d’un site web, de l’idée à la mise en forme. J’ai également développé mon autonomie, ma logique de structuration des pages et ma compréhension de l’expérience utilisateur.`,

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

            bilan: `J’ai compris comment gérer un projet de communication numérique de A à Z. J’ai également amélioré mon organisation, mon travail en équipe et ma capacité à concevoir une stratégie de communication cohérente pour valoriser un territoire.`,

            tools: [
                ["CapCut", "img/CapCut.png"],
                ["Google Docs", "img/Google_Docs.png"],
                ["Canva", "img/Canva.png"]
            ]
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

            bilan: `J’ai compris les étapes de création d’un podcast, de l’écriture à l’organisation d’une émission audio. J’ai également amélioré mon expression orale, appris à structurer un discours et à travailler en équipe sur un projet créatif lié à la culture numérique.`,

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


        function openProject(key) {

            const project = projectData[key];

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

            modalImage.src =
                project.image;

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


            if (project.link) {

                modalLink.href =
                    project.link;

                modalLink.style.display =
                    "inline-flex";

            } else {

                modalLink.style.display =
                    "none";

            }


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