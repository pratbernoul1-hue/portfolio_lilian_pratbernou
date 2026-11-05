(() => {
'use strict';
const pairs = {
'cyberharcèlement':'cyberbullying', 'Bio':'About', 'Parcours':'Education', 'Compétences':'Skills', 'Projets':'Projects', 'Mon CV ↗':'My CV ↗',
'Découvrir mon profil ↓':'Explore my profile ↓',
'✦ Recherche stage · Avril à juin 2027 · + alternance à partir de septembre 2027':'✦ Seeking an internship · April–June 2027 · + work-study placement from September 2027',
'01 — BIO':'01 — ABOUT', '02 — PARCOURS':'02 — EDUCATION', '03 — COMPÉTENCES':'03 — SKILLS', '04 — PROJETS':'04 — PROJECTS',
'2ᵉ':'2nd', 'année BUT MMI':'year of BUT MMI', 'domaines créatifs':'creative fields', 'stage + alternance recherchés':'seeking internship + work-study placement',
'2025 — Aujourd’hui':'2025 — Present', 'BUT Métiers du Multimédia et de l’Internet':'BUT degree in Multimedia and Internet Professions', 'Baccalauréat STMG · Mention':'STMG Baccalaureate · With honours',
'Graphisme & Design':'Graphic Design', 'Audiovisuel':'Audiovisual Production', 'Développement web':'Web Development', 'Gestion de projet':'Project Management',
'Audit · stratégie · plan d’actions · charte éditoriale · contenus':'Audit · strategy · action plan · editorial guidelines · content',
'Veille · identité visuelle · affiches · UI/UX · composition':'Research · visual identity · posters · UI/UX · composition',
'Scénario · captation · son · montage · récit visuel':'Scriptwriting · filming · sound · editing · visual storytelling',
'HTML · CSS · maquettes · intégration · mise en ligne':'HTML · CSS · mockups · implementation · deployment',
'Besoins · objectifs · cahier des charges · planification':'Requirements · goals · specifications · planning',
'Mes outils':'My tools', 'Mes réalisations':'My work', 'Tous':'All',
'Communication · Audit':'Communication · Audit', 'Communication digitale':'Digital communication', 'Création graphique':'Graphic design', 'Affiche festival':'Festival poster',
'Le cyberharcèlement':'Cyberbullying', 'Site Pokémon':'Pokémon website', 'Site web Pokémon':'Pokémon website', 'Dépliant du BUT MMI':'BUT MMI brochure', 'Logo Lastel':'Lastel logo',
'Identité visuelle':'Visual identity', 'Infographie':'Infographic', 'Le milieu forestier de la Roche-Jagu':'The forest ecosystem of La Roche-Jagu', 'Le retour du vinyle':'The return of vinyl', 'Web · Design d’information':'Web · Information design',
'UN STAGE ? UNE ALTERNANCE ? UN PROJET ?':'AN INTERNSHIP? A WORK-STUDY PLACEMENT? A PROJECT?', 'Me contacter →':'Get in touch →', 'Téléphone':'Phone',
'Outils utilisés':'Tools used', 'Voir le projet ↗':'View project ↗', 'Fermer':'Close', 'Retour en haut':'Back to top', 'Filtrer les projets':'Filter projects',
'Contexte':'Context', 'Missions / travail réalisé':'Tasks / work completed', 'Compétences mobilisées / développées':'Skills applied / developed', 'Bilan personnel':'Personal reflection', 'Matériel de tournage':'Filming equipment',
'COMMUNICATION · AUDIT':'COMMUNICATION · AUDIT', 'AUDIT DE COMMUNICATION NUMÉRIQUE':'DIGITAL COMMUNICATION AUDIT', 'COMMUNICATION DIGITALE':'DIGITAL COMMUNICATION', 'RECOMMANDATION DE COMMUNICATION DIGITALE':'DIGITAL COMMUNICATION STRATEGY', 'CRÉATION GRAPHIQUE':'GRAPHIC DESIGN', 'PRODUCTION AUDIOVISUELLE':'AUDIOVISUAL PRODUCTION', 'PRODUCTION D’UN SITE WEB':'WEBSITE PRODUCTION', 'COMMUNICATION NUMÉRIQUE':'DIGITAL COMMUNICATION', 'GESTION DE PROJET DE COMMUNICATION NUMÉRIQUE':'DIGITAL COMMUNICATION PROJECT MANAGEMENT', 'CONCEPTION WEB · UI/UX':'WEB DESIGN · UI/UX', 'IDENTITÉ VISUELLE':'VISUAL IDENTITY', 'INFOGRAPHIE':'INFOGRAPHIC', 'PRÉSENTATION WEB INTERACTIVE':'INTERACTIVE WEB PRESENTATION', 'Affiche de À L’West Fest':'À L’West Fest poster', 'PODCAST · CULTURE NUMÉRIQUE':'PODCAST · DIGITAL CULTURE', 'CRÉATION ET RÉALISATION D’UNE ÉMISSION AUDIO':'AUDIO SHOW WRITING AND PRODUCTION'
};
const sections = {
'.hero-copy':'A <strong>BUT MMI student</strong> at IUT de Lannion. I create digital experiences across communication, design, audiovisual production and the web.',
'.about-copy h2':'Create, experiment,<br><em>tell stories.</em>',
'.about-copy > p:nth-of-type(1)':"Hi, I’m Lilian Pratbernou. When I got my first iPod, I spent hours exploring content on screens and figuring out how everything worked. I felt as though I was stepping through to the other side, a little like Alice through the looking glass. That’s what inspired me to study MMI (Multimedia and Internet Professions), to learn how to create things myself.",
'.about-copy > p:nth-of-type(2)':"In MMI, I’m developing skills in audiovisual production, design, communication and web development. I’ve already edited videos and created social media content. I enjoy experimenting, trying out ideas and turning inspiration into real projects.",
'.about-copy > p:nth-of-type(3)':"Music, photography, video, social media, concerts, travel and dance are my main sources of inspiration. Everything I see and experience influences the way I create.",
'.about-copy > p:nth-of-type(4)':"I enjoy working in a group, sharing ideas and committing to projects. In the future, I’d like to work in digital media or content creation, a field where I can keep learning and creating.",
'.about-copy > p:nth-of-type(5)':'<strong>Welcome to my portfolio.</strong>',
'.contact h2':'Shall we create<br>something <em>cool?</em> ✦'
};
const projects = {
duralex: {
context:'I completed this project as part of a digital communication audit. My goal was to analyse the digital communication of Duralex, an iconic French tempered-glass tableware brand, to assess its brand image, editorial consistency and online user experience.',
missions:['Analysis of the brand’s context and positioning','Audit of digital communication across the website and social media','Semiotic analysis of visuals, copy and brand storytelling','Study of information architecture and user journeys','Usability audit and competitive benchmarking','Writing a structured, evidence-based audit report'],
skills:['Analysis','Understanding digital communication','Critical thinking','Organisation'],
bilan:'I learned to analyse a brand’s digital communication. This project developed my critical thinking and my ability to structure an audit.'},
westfest:{
context:'I completed this project as part of a digital communication strategy assignment. My goal was to design a digital communication plan for MMI A l’West Fest, an event showcasing MMI students’ projects and skills to students, prospective applicants and partners.',
missions:['Analysis of the festival’s positioning and objectives','Audit and competitor analysis','Definition of target audiences and creation of personas','Development of a digital communication strategy','Creation of editorial and visual guidelines','Design of an action plan before, during and after the event','Proposals for content, formats and distribution channels','Drafting sample emails and social media content'],
skills:['Creativity','Strategic thinking','Adapting to audiences','Teamwork'],
bilan:'I learned to build a communication strategy tailored to an event and its audiences. This project helped me connect objectives with proposed actions.'},
affiche:{
context:'I completed this project as part of an agency portfolio assignment. My goal was to design a promotional poster for the A l’West Fest student festival, with a personal, consistent visual identity suited to a multimedia event.',
missions:['Review of existing material and festival posters','Personal visual research','Creation of several visual concepts','Design of poster mockups','Selection and justification of an art direction','Production of the final poster'],skills:['Visual creativity','Aesthetic judgement','Independence','Decision-making'],
bilan:'I developed a graphic design process from research through to completion. I learned to stand by my design choices to produce a consistent, readable poster.'},
cyber:{
context:'I completed this project as part of an audio and video production assignment. My goal was to create a short awareness film about cyberbullying for young audiences, showing the real impact of online abuse. I was responsible for sound.',
missions:['Contribution to the script and statement of intent','Development of the storyboard and shot list','Shoot preparation: location scouting, equipment and organisation','Sound recording during filming','Contribution to production coordination and overall consistency'],skills:['Creativity','Storytelling','Teamwork','Organisation'],
bilan:'I discovered the stages of audiovisual production and the role of sound in storytelling. This project taught me to use professional equipment as part of a team.'},
pokemon:{
context:'I completed this project as part of a website production assignment. My goal was to design a functional website around the Pokémon universe, working on its visual identity, page organisation and user experience.',
missions:['Definition of the website’s concept and visual identity','Creation of moodboards and visual research','Design of wireframes and mockups in Figma','Organisation of navigation and website pages','Creation of pages: home, collection, Pokémon details and login','Content integration and overall visual consistency'],skills:['Creativity','Organisation','Independence','Web logic'],
bilan:'I learned to organise website pages and build a consistent visual identity. This project strengthened my independence and understanding of user experience.'},
bulat:{
context:'I completed this project as part of a digital communication project management assignment. My goal was to design a tourism and cultural promotion project for Bulat-Pestivien, highlighting its historic fountains and local legends for an international audience.',
missions:['Analysis of the area and features to highlight','Definition of objectives and target audiences','Design of an immersive visitor route concept','Development of detailed project specifications','Definition of communication channels: website, social media and QR codes','Creation of an action plan and provisional schedule','Collaborative work and project monitoring'],skills:['Organisation','Teamwork','Creativity','Project management'],
bilan:'I learned to structure a communication project to promote a destination. This work strengthened my organisational and collaboration skills.'},
bonbons:{
context:'I worked in a pair on this project as part of SAÉ 203, which focused on designing a website connected to a data source. Our goal was to design the interface for Les Bon-Bons, an organic confectionery company using local ingredients. We developed a welcoming, appetising visual identity and user journeys for customers and the manager.',
missions:['Analysis of the company, its business and values','Exploration of several visual directions through moodboards','Selection of a visual direction and creation of style tiles','Design of wireframes to organise content and navigation','Production of mockups in Figma','Design of catalogue, product detail, basket and management interfaces'],skills:['Interface design','Content organisation','Visual consistency','User experience','Working in a pair'],
bilan:'I learned to design interfaces tailored to customers’ and the manager’s needs. This project helped me connect brand identity with page organisation.'},
depliant:{
context:'I completed this project as part of a graphic production assignment. My goal was to design a brochure presenting the BUT degree in Multimedia and Internet Professions at IUT de Lannion. It introduces the course, its specialisations, career opportunities and application process in a clear, appealing format.',
missions:['Organisation of information across the brochure panels','Creation of a colourful visual identity with rounded shapes','Selection of typefaces and hierarchy for headings and body text','Layout of course information and career opportunities','Integration of photographs, logos, contact details and a QR code','Harmonisation of front and back for visual continuity'],skills:['Layout','Information hierarchy','Graphic composition','Typography','Visual communication'],
bilan:'I learned to prioritise a large amount of information across brochure panels. This project helped me combine text and images in a consistent layout.'},
lastel:{
context:'I completed this project as part of the R2.08 graphic production module. My goal was to propose a logo for Lastel. I designed a restrained typographic identity, combining delicate handwritten lettering with the word “Paris” to create an elegant visual signature.',
missions:['Design of a logo centred on the company name','Refinement of letterforms and compositional balance','Pairing handwritten lettering with simpler typography for “Paris”','Creation of a black version on white and a white version on a dark background','Presentation of the final proposal on a design board'],skills:['Logo design','Typography','Composition','Visual identity','Attention to detail'],
bilan:'I learned to refine the typography and balance of a logo. The two versions helped me better understand how contrast affects readability.'},
rochejagu:{
context:'I completed this project as part of an ecological and social transition assignment. My goal was to design an infographic about the forest ecosystem in the La Roche-Jagu departmental park. It presents the site’s biodiversity, the forest’s ecological functions and the threats it faces.',
missions:['Synthesis of information about the site and its forest ecosystem','Organisation of content into thematic sections','Presentation of wildlife, plants and the forest’s ecological functions','Highlighting threats and conservation initiatives','Integration of photographs, illustrations and an explanatory diagram','Creation of a composition in green tones reflecting the subject'],skills:['Synthesis','Environmental awareness','Layout','Information hierarchy','Visual communication'],
bilan:'I learned to summarise forest conservation issues. This project helped me make an environmental topic accessible through text and images.'},
vinyle:{
context:'I created an interactive web presentation about the return of vinyl records. My goal was to explain how they work, how they are manufactured and why they remain successful alongside digital media, through an animated visual journey.',
missions:['Definition of the topic, angle and information to present','Writing a storyboard to organise the journey and transitions','Design of a visual identity inspired by records and album sleeves','Implementation of the presentation in HTML and CSS','Creation of SVG visuals and a chart comparing vinyl and CD sales','Implementation of navigation and transitions using impress.js'],skills:['Information design','Synthesis','HTML / CSS','SVG','Animation and navigation'],
bilan:'I learned to turn a documentary topic into an interactive web presentation. This project helped me develop visual storytelling and transitions to guide visitors through the content.'},
balite:{
context:'I worked on this group project as part of SAÉ 202 in semester 2. Our goal was to create an advertisement for the Balité hand mixer around the slogan “With Balité, your dreams become reality”. The film follows Nathalie, an overwhelmed mother whose everyday life becomes easier when the product appears. My main role was camera operator.',
missions:['Contribution of ideas to the script','Research into shots and selection of framing with the group','Filming scenes as camera operator','Attention to composition and details during filming','Creation of my own edit from the recorded footage'],skills:['Framing','Camera operation','Video editing','Teamwork','Attention to detail'],
bilan:'I learned to frame shots more effectively and pay attention to details on set. Creating my own edit allowed me to give shape to the footage I had filmed.'},
artfact:{
context:'I completed this project as part of a digital culture assignment. My goal was to design and script a podcast exploring art and digital technology. The topic was fashion and luxury in the age of new technologies, asking: “Does luxury have a place in the digital world?”',
missions:['Selection of the theme, angle and central question','Writing the show’s scenario','Creation of the script and radio running order','Preparation of questions and discussion','Planned role as the show’s lead presenter','Collaborative work on the podcast’s structure and content'],skills:['Creativity','Public speaking','Teamwork','Organisation'],
bilan:'I learned to structure and script an audio show. This project strengthened my speaking skills and ability to work in a team.'}
};
const normalise = text => text.replace(/\s+/g,' ').trim();
let language = 'fr';
try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'fr'; } catch {}
const originals = new WeakMap();
const attrOriginals = new WeakMap();
function translate(root) {
 const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
 while (walker.nextNode()) {
  const node=walker.currentNode;
  if (node.parentElement.closest('script,style,.language-toggle,[data-translated-section]')) continue;
  if (!originals.has(node)) originals.set(node,node.nodeValue);
  const source=originals.get(node), key=normalise(source);
  node.nodeValue=language==='en' && pairs[key] ? source.replace(source.trim(),pairs[key]) : source;
 }
 root.querySelectorAll('[aria-label],img[alt]').forEach(el=>{
  if (!attrOriginals.has(el)) attrOriginals.set(el, {label:el.getAttribute('aria-label'),alt:el.getAttribute('alt')});
  const source=attrOriginals.get(el);
  for (const [attr,value] of [['aria-label',source.label],['alt',source.alt]]) {
   if(value===null) continue;
   let translated=pairs[normalise(value)] || value;
   if(language==='en') {
    const match=value.match(/^(Découvrir le projet |Découvrir l’affiche |Découvrir le site )(.*)$/);
    if(match) translated=({'Découvrir le projet ':'Explore project: ','Découvrir l’affiche ':'Explore poster: ','Découvrir le site ':'Explore website: '}[match[1]])+(pairs[match[2]]||match[2]);
   }
   el.setAttribute(attr,language==='en'?translated:value);
  }
 });
}
const sectionOriginals = new Map();
function apply() {
 document.documentElement.lang=language;
 for(const [selector,english] of Object.entries(sections)) {
  const el=document.querySelector(selector);
  if(!el) continue;
  if(!sectionOriginals.has(el)) {sectionOriginals.set(el,el.innerHTML);el.dataset.translatedSection='true';}
  el.innerHTML=language==='en'?english:sectionOriginals.get(el);
 }
 translate(document.body);
 const button=document.querySelector('.language-toggle');
 button.textContent=language.toUpperCase();
 button.lang=language==='fr'?'en':'fr';
 button.setAttribute('aria-label',language==='fr'?'Switch to English':'Passer en français');
 const meta=document.querySelector('meta[name="description"]');
 meta.content=language==='en'?"Lilian Pratbernou’s portfolio, BUT MMI student at IUT de Lannion.":"Portfolio de Lilian Pratbernou, étudiant en BUT MMI à l'IUT de Lannion.";
}
window.portfolioI18n={translate, project(key,original){
 const project=language==='en'?{...original,...projects[key]}:{...original};
 if(language==='en') for(const field of ['title','subtitle','category']) project[field]=pairs[normalise(project[field]||'')]||project[field];
 return project;
}};
document.addEventListener('DOMContentLoaded',()=>{
 apply();
 document.querySelector('.language-toggle').addEventListener('click',()=>{
  language=language==='fr'?'en':'fr';
  try {localStorage.setItem('portfolio-language',language);} catch {}
  apply();
  document.dispatchEvent(new Event("portfolio-language-change"));
 });
});
})();
