"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Menu, Minus, Plus, X } from "lucide-react";
import { chapters, copy, excerpts, type Language } from "@/content/site-copy";

const email = "Bertinbertinnana@gmail.com";
const purchaseEmail = `mailto:${email}?subject=How%20God%20Sees%20the%20World%20%E2%80%94%20purchase%20inquiry`;
const reviewEmail = `mailto:${email}?subject=My%20reader%20review%20%E2%80%94%20How%20God%20Sees%20the%20World`;
const sections = ["top", "the-author", "the-book", "testimonials", "faq", "the-ideas", "chapters", "reading-room", "contact"];

function Background({ name, priority = false }: { name: string; priority?: boolean }) {
  return <div className="scene-background" aria-hidden="true"><Image src={`/images/${name}.png`} alt="" fill sizes="100vw" priority={priority} /><div className="scene-overlay" /></div>;
}
function Logo({ footer = false }: { footer?: boolean }) {
  return <Image src="/images/logo-white.png" alt="How God Sees the World — Bertin Nana" width={4106} height={3416} sizes={footer ? "180px" : "92px"} priority={!footer} className={footer ? "footer-logo" : "header-logo"} />;
}
function Section({ id, image, className = "", children, label }: { id: string; image: string; className?: string; children: ReactNode; label: string }) {
  return <section id={id} className={`scene ${className}`} aria-label={label}><Background name={image} priority={id === "top"} /><div className="scene-inner">{children}</div></section>;
}

export default function AuthorWebsite() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [activeGroup, setActiveGroup] = useState(0);
  const [openChapter, setOpenChapter] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [passage, setPassage] = useState(0);
  const [readerOpen, setReaderOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const readerTrigger = useRef<HTMLElement | null>(null);
  const t = copy[language];
  const L = (en: string, fr: string) => language === "en" ? en : fr;
  const coverSrc = language === "en" ? "/images/book-cover-en.jpg" : "/images/book-cover-fr.jpg";
  const coverAlt = language === "en" ? "How God Sees the World — Bertin Nana" : "Comment Dieu voit le monde — Bertin Nana";
  const navigation = [["the-author", L("The author", "L’auteur")], ["the-book", L("The book", "Le livre")], ["testimonials", L("Readers", "Lecteurs")], ["faq", "FAQ"]];
  const faqs = [
    [L("What is the book about?", "De quoi parle le livre ?"), L("Bertin Nana brings Christian faith into conversation with mathematics, philosophy, and cosmology. The book presents his personal perspectives on creation, love, goodness, and human existence.", "Bertin Nana fait dialoguer la foi chrétienne avec les mathématiques, la philosophie et la cosmologie. Il présente ses perspectives personnelles sur la création, l’amour, la bonté et l’existence humaine.")],
    [L("Who is it written for?", "À qui s’adresse-t-il ?"), L("Curious readers interested in Christianity, philosophy, mathematics, and the universe. The website’s chapter explorer helps you find a subject that speaks to you.", "Aux lecteurs curieux de christianisme, de philosophie, de mathématiques et de l’univers. L’explorateur de chapitres vous aide à trouver un sujet qui vous parle.")],
    [L("How can I buy a copy?", "Comment acheter un exemplaire ?"), L("Contact Bertin Nana by email to ask about availability, editions, pricing, and ordering. An online retailer link is not available yet.", "Contactez Bertin Nana par e-mail pour connaître la disponibilité, les éditions, les tarifs et les modalités de commande. Aucun lien de vente en ligne n’est encore disponible.")],
    [L("Can I read an excerpt first?", "Puis-je lire un extrait ?"), L("Yes. Open “Read an excerpt” to explore three selected passages from the manuscript. The French passages are editorial translations of the English text.", "Oui. Cliquez sur « Lire un extrait » pour découvrir trois passages du manuscrit. Les passages français sont des traductions éditoriales du texte anglais.")],
    [L("Is the book available in French?", "Le livre existe-t-il en français ?"), L("The English cover is shown here. Switch the site to French to see the original French cover. Please ask the author which editions are currently available to order.", "La couverture présentée est la couverture française originale. Un manuscrit anglais a été fourni pour ce site. Contactez l’auteur pour confirmer les éditions disponibles à la commande.")],
  ];

  useEffect(() => {
    try { const saved = localStorage.getItem("bertin-nana-language"); if (saved === "en" || saved === "fr") setLanguage(saved); } catch { /* Optional preference. */ }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { threshold: .55 });
    sections.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => { document.documentElement.lang = language; document.title = language === "en" ? "Bertin Nana — How God Sees the World" : "Bertin Nana — Comment Dieu voit le monde"; }, [language]);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);
  useEffect(() => {
    if (!readerOpen && !menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [readerOpen, menuOpen]);
  const changeLanguage = (next: Language) => { setLanguage(next); try { localStorage.setItem("bertin-nana-language", next); } catch { /* Optional preference. */ } };
  const openReader = () => { setMenuOpen(false); readerTrigger.current = document.activeElement as HTMLElement; dialogRef.current?.showModal(); setReaderOpen(true); };
  const selectGroup = (index: number) => { setActiveGroup(index); setOpenChapter(chapters.find((chapter) => chapter.group === index)?.number ?? null); };

  return (
    <div className={`site ${language === "fr" ? "language-fr" : ""}`}>
      <a href="#main" className="skip-link">{t.skip}</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="Bertin Nana — Home"><Logo /></a>
          <nav className="desktop-nav" aria-label={L("Main navigation", "Navigation principale")}>{navigation.map(([id, label]) => <a href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
          <div className="header-actions"><div className="language-switch"><button lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button><span>/</span><button lang="fr" aria-label="Français" aria-pressed={language === "fr"} onClick={() => changeLanguage("fr")}>FR</button></div><a href="#the-book" className="button header-buy">{L("Get the book", "Le livre")}<ArrowUpRight size={16} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? t.closeMenu : t.menu}>{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
        <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} inert={!menuOpen} aria-label={L("Mobile navigation", "Navigation mobile")}>{navigation.map(([id, label], index) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>)}<button onClick={openReader}>{t.read}<BookOpen size={20} /></button></nav>
      </header>

      <main id="main">
        <Section id="top" image="hero-mountains" className="hero-scene" label={L("A different perspective", "Un autre regard")}>
          <div className="hero-layout"><div className="hero-copy"><p className="eyebrow">{L("BERTIN NANA · AUTHOR & THINKER", "BERTIN NANA · AUTEUR & PENSEUR")}</p><h1>{language === "en" ? <>HOW GOD SEES <em>THE WORLD.</em></> : <>COMMENT DIEU VOIT <em>LE MONDE.</em></>}</h1><p className="hero-description">{L("Faith, science, and the questions that make us human. An invitation to look beyond the familiar.", "La foi, la science et les questions qui nous rendent humains. Une invitation à regarder au-delà du familier.")}</p><div className="actions"><a href="#the-book" className="button">{L("Discover the book", "Découvrir le livre")}<ArrowUpRight size={18} /></a><button className="text-button" onClick={openReader}><BookOpen size={17} />{t.read}</button></div></div><div className="hero-cover"><Image src={coverSrc} alt={coverAlt} width={1800} height={2700} priority loading="eager" sizes="(max-width: 760px) 220px, 520px" /><span>{t.coverCaption}</span></div></div>
          <a className="scroll-link" href="#the-author"><ArrowDown size={17} />{L("MEET THE AUTHOR", "RENCONTREZ L’AUTEUR")}</a>
        </Section>

        <Section id="the-author" image="author-library" className="author-scene" label={L("The mind behind the pages", "Derrière les mots")}>
          <div className="author-layout"><div className="author-copy"><p className="eyebrow">{L("ABOUT THE AUTHOR", "À PROPOS DE L’AUTEUR")}</p><h2>BERTIN <em>NANA.</em></h2><p className="section-lead">{L("A scientific mind. A deeply personal faith.", "Un esprit scientifique. Une foi profondément personnelle.")}</p><p>{t.authorText}</p><p>{t.authorText2}</p><a href={`mailto:${email}`} className="underlined-link">{L("Get in touch with Bertin", "Contacter Bertin")}<ArrowUpRight size={17} /></a></div><blockquote className="author-quote"><span aria-hidden="true">“</span><p>{t.authorQuote}</p><cite>{t.authorQuoteLabel}</cite></blockquote></div>
        </Section>

        <Section id="the-book" image="book-pedestal" className="buy-scene" label={L("The book", "Le livre")}>
          <div className="buy-layout"><figure className="buy-cover"><Image src={coverSrc} alt={coverAlt} width={1800} height={2700} loading="eager" sizes="(max-width: 760px) 220px, 320px" /><figcaption>{L("BERTIN NANA · 25 CHAPTERS", "BERTIN NANA · 25 CHAPITRES")}</figcaption></figure><div className="buy-copy"><p className="eyebrow">{L("GET YOUR COPY", "VOTRE EXEMPLAIRE")}</p><h2>{language === "en" ? <>A BOOK FOR <em>THE CURIOUS.</em></> : <>POUR LES <em>ESPRITS CURIEUX.</em></>}</h2><p>{t.bookText}</p><dl className="book-details"><div><dt>{L("Author", "Auteur")}</dt><dd>Bertin Nana</dd></div><div><dt>{L("Explores", "Thèmes")}</dt><dd>{L("Faith · Philosophy · Science", "Foi · Philosophie · Science")}</dd></div></dl><div className="actions"><a href={purchaseEmail} className="button">{L("Enquire about a copy", "Demander un exemplaire")}<ArrowUpRight size={18} /></a><button onClick={openReader} className="text-button">{t.read}<ArrowRight size={16} /></button></div><p className="fine-print">{L("Contact the author for available editions, pricing, and ordering.", "Contactez l’auteur pour les éditions, les tarifs et les commandes.")}</p></div></div>
        </Section>

        <Section id="testimonials" image="ocean-horizon" className="reviews-scene" label={L("Reader perspectives", "Regards de lecteurs")}>
          <div className="review-content"><p className="eyebrow">{L("TESTIMONIALS / READER PERSPECTIVES", "TÉMOIGNAGES / REGARDS DE LECTEURS")}</p><span className="review-quotation" aria-hidden="true">“</span><h2>{language === "en" ? <>EVERY READER. <em>A NEW PERSPECTIVE.</em></> : <>CHAQUE LECTEUR. <em>UN NOUVEAU REGARD.</em></>}</h2><p>{L("Read something that stayed with you? Share the question, passage, or idea that made you pause.", "Une lecture vous a marqué ? Partagez la question, le passage ou l’idée qui vous a fait réfléchir.")}</p><a href={reviewEmail} className="button button-outline">{L("Share your reading experience", "Partager votre expérience")}<ArrowUpRight size={18} /></a><div className="review-status">{L("Reader testimonials will appear here as they become available.", "Les témoignages seront publiés ici lorsqu’ils seront disponibles.")}</div></div>
        </Section>

        <Section id="faq" image="cathedral-light" className="faq-scene" label={L("A few answers", "Quelques réponses")}>
          <div className="faq-layout"><div><p className="eyebrow">{L("FREQUENTLY ASKED QUESTIONS", "QUESTIONS FRÉQUENTES")}</p><h2>{language === "en" ? <>BEFORE <em>YOU BEGIN.</em></> : <>AVANT DE <em>COMMENCER.</em></>}</h2><p className="faq-intro">{L("A little context for the journey ahead.", "Quelques repères avant de commencer.")}</p><a href={`mailto:${email}`} className="underlined-link">{L("Ask another question", "Poser une autre question")}<ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={index}><h3><button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span className="faq-number">0{index + 1}</span>{question}{openFaq === index ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`faq-answer-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></div>)}</div></div>
        </Section>

        <Section id="the-ideas" image="earth-orbit" className="ideas-scene" label={L("Three ways of seeing", "Trois façons de voir")}>
          <div className="ideas-heading"><p className="eyebrow">{L("THE BIGGER PICTURE", "UNE VISION D’ENSEMBLE")}</p><h2>{language === "en" ? <>ONE WORLD. <em>THREE PERSPECTIVES.</em></> : <>UN MONDE. <em>TROIS PERSPECTIVES.</em></>}</h2></div><div className="ideas-grid">{t.ideas.map((idea, index) => <article className="idea" key={index}><span className="idea-number">0{index + 1}</span><h3>{idea.title}</h3><p className="idea-subtitle">{idea.subtitle}</p><p>{idea.description}</p><a href="#chapters" onClick={() => selectGroup(idea.group)}>{t.exploreIdea}<ArrowUpRight size={18} /></a></article>)}</div>
        </Section>

        <Section id="chapters" image="author-library" className="chapters-scene" label={L("A map of the book", "Le parcours du livre")}>
          <div className="chapters-layout"><div><p className="eyebrow">{L("THE CHAPTER EXPLORER", "L’EXPLORATEUR DE CHAPITRES")}</p><h2>25 {L("CHAPTERS.", "CHAPITRES.")} <em>{L("COUNTLESS QUESTIONS.", "TANT DE QUESTIONS.")}</em></h2><p className="chapter-intro">{t.chaptersIntro}</p><div className="chapter-groups" aria-label={L("Chapter themes", "Thèmes des chapitres")}>{t.groups.map((group, index) => <button key={index} aria-pressed={activeGroup === index} onClick={() => selectGroup(index)}><span>0{index + 1}</span>{group}<ArrowRight size={15} /></button>)}</div></div><div className="chapter-panel"><div className="chapter-panel-top"><span>{t.groups[activeGroup]}</span><span>{chapters.filter((chapter) => chapter.group === activeGroup).length} {L("chapters", "chapitres")}</span></div><div className="chapter-list" aria-live="polite">{chapters.filter((chapter) => chapter.group === activeGroup).map((chapter) => <div className="chapter-item" key={chapter.number}><h3><button aria-expanded={openChapter === chapter.number} aria-controls={`chapter-${chapter.number}`} onClick={() => setOpenChapter(openChapter === chapter.number ? null : chapter.number)}><span>{String(chapter.number).padStart(2, "0")}</span>{chapter[language][0]}{openChapter === chapter.number ? <Minus size={16} /> : <Plus size={16} />}</button></h3><div id={`chapter-${chapter.number}`} hidden={openChapter !== chapter.number}><p>{chapter[language][1]}</p></div></div>)}</div><p className="fine-print">{t.chapterNote}</p></div></div>
        </Section>

        <Section id="reading-room" image="cathedral-light" className="reading-scene" label={L("The reading room", "L’espace de lecture")}>
          <div className="reading-layout"><div><p className="eyebrow">{L("THE READING ROOM", "L’ESPACE DE LECTURE")}</p><h2>{language === "en" ? <>SLOW DOWN. <em>READ A LITTLE.</em></> : <>PRENEZ LE TEMPS. <em>LISEZ UN PEU.</em></>}</h2><p>{L("A moment away from the noise. Step into the introduction and discover the questions behind the book.", "Un moment loin du bruit. Entrez dans l’introduction et découvrez les questions à l’origine du livre.")}</p><button className="button" onClick={openReader}>{t.read}<BookOpen size={18} /></button></div><div className="reading-page"><span className="page-label">{L("FROM THE INTRODUCTION", "EXTRAIT DE L’INTRODUCTION")}</span><blockquote>{t.quote}</blockquote><div className="page-signature"><span>Bertin Nana</span><span>01 — 03</span></div><p className="fine-print">{L("Selected passages from the manuscript", "Passages traduits du manuscrit anglais")}</p></div></div>
        </Section>
      </main>

      <footer id="contact" className="scene footer-scene"><Background name="ocean-horizon" /><div className="scene-inner footer-inner"><div className="footer-top"><a href="#top" aria-label="Bertin Nana — Home"><Logo footer /></a><span>{L("FAITH. REASON. HUMANITY.", "FOI. RAISON. HUMANITÉ.")}</span></div><div className="footer-main"><div><p className="eyebrow">{L("CONTINUE THE CONVERSATION", "POURSUIVONS LA CONVERSATION")}</p><h2>{language === "en" ? <>IT STARTS WITH <em>A QUESTION.</em></> : <>TOUT COMMENCE <em>PAR UNE QUESTION.</em></>}</h2><a href={`mailto:${email}`} className="footer-email">{email}<ArrowUpRight size={23} /></a><a href="tel:+13255753237" className="footer-phone">+1 (325) 575-3237</a></div><nav className="footer-navigation" aria-label={L("Footer navigation", "Navigation de bas de page")}>{[...navigation, ["the-ideas", L("The ideas", "Les idées")], ["chapters", L("Chapters", "Chapitres")], ["reading-room", L("Reading room", "Espace de lecture")]].map(([id, label]) => <a key={id} href={`#${id}`}>{label}<ArrowUpRight size={15} /></a>)}</nav></div><div className="footer-bottom"><span>© 2026 Bertin Nana. {t.rights}</span><div className="language-switch"><button aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>English</button><span>/</span><button aria-pressed={language === "fr"} onClick={() => changeLanguage("fr")}>Français</button></div><a href="#top">{t.backTop} ↑</a></div></div></footer>

      <dialog ref={dialogRef} className="reader-dialog" aria-labelledby="reader-title" onClose={() => { setReaderOpen(false); readerTrigger.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}><div className="reader-content"><div className="reader-top"><p className="eyebrow">{t.readerLabel}</p><button onClick={() => dialogRef.current?.close()} aria-label={t.close}><X size={22} /></button></div><h2 id="reader-title">{t.readerHeading}</h2><div className="reader-tabs">{t.readerTabs.map((label, index) => <button key={index} aria-pressed={passage === index} onClick={() => setPassage(index)}>{label}</button>)}</div><div className="reader-passage"><h3>{t.readerTabs[passage]}</h3>{excerpts[language][passage].map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><p className="fine-print">{t.excerptNote}</p><div className="reader-pagination"><button aria-label={t.readerPrev} disabled={passage === 0} onClick={() => setPassage(passage - 1)}><ArrowLeft size={18} /></button><span>0{passage + 1} / 03</span><button aria-label={t.readerNext} disabled={passage === 2} onClick={() => setPassage(passage + 1)}><ArrowRight size={18} /></button></div></div></dialog>
    </div>
  );
}
