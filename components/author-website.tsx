"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, Menu, X, Youtube } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { copy, type Language } from "@/content/site-copy";

const asset = "/figma/";
const logo = "/images/logo-white.png";
const email = "Bertinbertinnana@gmail.com";
const covers = { en: "/images/book-cover-en.jpg", fr: "/images/book-cover-fr.jpg" };
const navigation = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "books", href: "#books" },
  { key: "contact", href: "#contact" },
] as const;

const retailers = [
  ["Amazon Kindle", "kindle"],
  ["Google Play Books", "google"],
  ["Apple Books", "apple"],
  ["Barnes & Noble", "barnes"],
  ["Kobo", "kobo"],
];

const lenses = [
  { numeral: "I", en: ["Creation", "The book begins with the universe itself, asking how the laws of nature can inform a Christian understanding of creation."], fr: ["Création", "Le livre commence par l’univers lui-même et demande comment les lois de la nature éclairent une compréhension chrétienne de la création."] },
  { numeral: "II", en: ["Law", "Nana considers how physical law and moral law shape the way we understand the world and our responsibilities within it."], fr: ["Loi", "Nana examine comment la loi physique et la loi morale façonnent notre compréhension du monde et de nos responsabilités."] },
  { numeral: "III", en: ["Sacrifice", "The book turns to sacrifice as a way of understanding the Christian story and what it asks of human relationships."], fr: ["Sacrifice", "Le livre aborde le sacrifice comme une clé du récit chrétien et de ce qu’il demande aux relations humaines."] },
  { numeral: "IV", en: ["Grace", "Grace connects the book’s questions about faith with the possibility of forgiveness, kindness, and a different way of living."], fr: ["Grâce", "La grâce relie les questions du livre sur la foi à la possibilité du pardon, de la bonté et d’une autre manière de vivre."] },
];

const testimonials = [
  { name: "Mike Torello", image: "reader-mike.webp", en: "Nana brings Christian faith and mathematics into the same conversation. The questions stay with you after the last page.", fr: "Nana fait dialoguer la foi chrétienne et les mathématiques. Les questions restent après la dernière page." },
  { name: "Rick Wright", image: "reader-rick.webp", en: "A personal look at creation, love, and the universe. I kept returning to the chapters on physics and philosophy.", fr: "Un regard personnel sur la création, l’amour et l’univers. Je suis revenu aux chapitres de physique et de philosophie." },
  { name: "Devon Miles", image: "reader-devon.webp", en: "Clear and sincere. The book asks you to look at faith, reason, and human life from more than one direction.", fr: "Clair et sincère. Le livre invite à regarder la foi, la raison et la vie humaine dans plus d’une direction." },
];

const page = {
  en: {
    home: "Home", about: "About", books: "Books", contact: "Contact", blogs: "Blogs",
    order: "Order now", enter: "Enter the vision", buy: "Buy now",
    heroKicker: "A book by Bertin Nana", heroLine: "What if the equations that describe the universe",
    visionKicker: "The book", visionTitleA: "A vision written in", visionTitleB: "stars & scripture",
    visionP1: "What if the equations that describe the universe and the stories that describe our salvation were never in conflict, but two languages for the same truth?",
    visionP2: "How God Sees the World invites the reader to step back far enough to see creation as its Author might: a cosmos bound by gravity and light, and a humanity bound by law, sacrifice, and grace.",
    equation: "The equation", equationNote: "Einstein's field equations · 1915",
    lensesKicker: "Four lenses", lensesTitleA: "Seeing the world", lensesTitleB: "from above",
    bookLine: "Bring home a journey across the heavens and through the pages of Scripture. Ask the author about print and digital editions.",
    authorKicker: "The author",
    ebookA: "Ask about my", ebookB: "E-Book",
    ebookBefore: "Contact Bertin Nana to ask about the digital edition of", ebookName: "How God Sees the World",
    name: "Full name", email: "Email address", phone: "Phone number",
    namePlaceholder: "Full Name", emailPlaceholder: "Email Address", phonePlaceholder: "Phone Number",
    submit: "Submit", submitNow: "Submit now",
    reviewsKicker: "Testimonials", reviewsA: "What readers", reviewsB: "say",
    prev: "Previous testimonial", next: "Next testimonial",
    blogKicker: "Insights and inspiration for authors",
    footer: "Faith, mathematics, and the questions that shape our lives. Get in touch with Bertin Nana about the book.",
    shortLinks: "Short Links", footerNav: "Footer navigation",
    signup: "Sign up for exclusive content, emails & updates",
    signupNote: "Send a request to the author by email.",
    close: "Close details", menuOpen: "Open navigation", menuClose: "Close navigation", language: "Language",
    coverAlt: "How God Sees the World by Bertin Nana",
    hello: "Hello Bertin,",
    inquiryCompact: "I’d like to ask about the e-book edition of How God Sees the World.",
    inquiryFull: "I’d like to hear about How God Sees the World and future updates.",
    subjectEbook: "E-book inquiry", subjectUpdates: "Book updates",
    backKicker: "A book by Bertin Nana",
  },
  fr: {
    home: "Accueil", about: "L’auteur", books: "Livres", contact: "Contact", blogs: "Blogs",
    order: "Commander", enter: "Entrer dans la vision", buy: "Acheter",
    heroKicker: "Un livre de Bertin Nana", heroLine: "Et si les équations qui décrivent l’univers",
    visionKicker: "Le livre", visionTitleA: "Une vision écrite dans", visionTitleB: "les étoiles et l’Écriture",
    visionP1: "Et si les équations qui décrivent l’univers et les récits qui décrivent notre salut n’avaient jamais été en conflit, mais deux langues pour une même vérité ?",
    visionP2: "Comment Dieu voit le monde invite le lecteur à prendre assez de recul pour voir la création comme son Auteur pourrait la voir : un cosmos lié par la gravité et la lumière, et une humanité liée par la loi, le sacrifice et la grâce.",
    equation: "L’équation", equationNote: "Les équations de champ d’Einstein · 1915",
    lensesKicker: "Quatre regards", lensesTitleA: "Voir le monde", lensesTitleB: "d’en haut",
    bookLine: "Emportez un voyage à travers les cieux et les pages de l’Écriture. Demandez à l’auteur les éditions papier et numérique.",
    authorKicker: "L’auteur",
    ebookA: "Demandez mon", ebookB: "e-book",
    ebookBefore: "Contactez Bertin Nana pour demander l’édition numérique de", ebookName: "Comment Dieu voit le monde",
    name: "Nom complet", email: "Adresse e-mail", phone: "Téléphone",
    namePlaceholder: "Nom complet", emailPlaceholder: "Adresse e-mail", phonePlaceholder: "Téléphone",
    submit: "Envoyer", submitNow: "Envoyer",
    reviewsKicker: "Témoignages", reviewsA: "Ce que disent", reviewsB: "les lecteurs",
    prev: "Témoignage précédent", next: "Témoignage suivant",
    blogKicker: "Idées et inspiration",
    footer: "La foi, les mathématiques et les questions qui façonnent nos vies. Écrivez à Bertin Nana au sujet du livre.",
    shortLinks: "Liens rapides", footerNav: "Navigation du pied de page",
    signup: "Inscrivez-vous pour du contenu exclusif, des e-mails et des nouvelles",
    signupNote: "Envoyez une demande à l’auteur par e-mail.",
    close: "Fermer", menuOpen: "Ouvrir le menu", menuClose: "Fermer le menu", language: "Langue",
    coverAlt: "Comment Dieu voit le monde, Bertin Nana",
    hello: "Bonjour Bertin,",
    inquiryCompact: "Je souhaite me renseigner sur l’édition numérique de Comment Dieu voit le monde.",
    inquiryFull: "Je souhaite recevoir des nouvelles de Comment Dieu voit le monde.",
    subjectEbook: "Demande d’e-book", subjectUpdates: "Nouvelles du livre",
    backKicker: "Un livre de Bertin Nana",
  },
} as const;

const SiteLanguage = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: "en", setLanguage: () => {} });

function useSite() {
  const { language, setLanguage } = useContext(SiteLanguage);
  return { language, setLanguage, text: page[language], words: copy[language] };
}

const articles = [
  {
    author: "Olivia Rhye",
    image: "blog-design.webp",
    avatar: "blog-olivia.webp",
    en: { title: "UX review presentations", category: "Design", description: "How do you create compelling presentations that wow your colleagues and impress your managers?", date: "20 Jan 2022" },
    fr: { title: "Présentations de revues UX", category: "Design", description: "Comment créer des présentations convaincantes qui impressionnent vos collègues et vos responsables ?", date: "20 janv. 2022" },
  },
  {
    author: "Phoenix Baker",
    image: "blog-product.webp",
    avatar: "blog-phoenix.webp",
    en: { title: "Migrating to Linear 101", category: "Product", description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.", date: "19 Jan 2022" },
    fr: { title: "Migrer vers Linear 101", category: "Produit", description: "Linear simplifie les projets logiciels, les sprints, les tâches et le suivi des bugs. Voici comment commencer.", date: "19 janv. 2022" },
  },
  {
    author: "Lana Steiner",
    image: "blog-engineering.webp",
    avatar: "blog-lana.webp",
    en: { title: "Building your API Stack", category: "Software Engineering", description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.", date: "18 Jan 2022" },
    fr: { title: "Construire votre pile d’API", category: "Génie logiciel", description: "L’essor des API REST s’est accompagné d’une multiplication des outils pour les créer, les tester et les gérer.", date: "18 janv. 2022" },
  },
];

function Cover({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  const { language, text } = useSite();
  return (
    <Image
      src={covers[language]}
      width={528}
      height={792}
      alt={text.coverAlt}
      sizes="(max-width: 640px) 52vw, 28vw"
      preload={preload}
      className={className}
    />
  );
}

function FlipCover({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  const { language, text, words } = useSite();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`book-flip${open ? " is-open" : ""} ${className}`}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        setOpen((value) => !value);
      }}
    >
      <div className="book-flip-inner">
        <div className="book-face book-front">
          <Image
            key={language}
            src={covers[language]}
            alt={text.coverAlt}
            fill
            sizes="(max-width: 640px) calc(100vw - 40px), 28vw"
            preload={preload}
          />
        </div>
        <div className="book-face book-back">
          <p className="book-back-kicker">{text.backKicker}</p>
          {language === "en" ? <h3>How <em>God</em> sees the world</h3> : <h3>Comment <em>Dieu</em> voit le monde</h3>}
          <div className="book-back-copy">
            <p>{words.bookText}</p>
            <p>{words.bookText2}</p>
          </div>
          <OrderButton />
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function OrderButton({ children }: { children?: ReactNode }) {
  const { text } = useSite();
  const href = "mailto:" + email + "?subject=" + encodeURIComponent(text.order + " — " + text.ebookName);
  return <a className="gold-button" href={href}>{children ?? text.order}</a>;
}

function BookActions() {
  const { text } = useSite();
  return (
    <div className="book-actions">
      <OrderButton />
      <a className="outline-button" href="#vision">{text.enter}</a>
    </div>
  );
}

function LanguageSwitch() {
  const { language, setLanguage, text } = useSite();
  return (
    <div className="lang-switch" role="group" aria-label={text.language}>
      {(["en", "fr"] as const).map((code) => (
        <button key={code} type="button" aria-pressed={language === code} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>
      ))}
    </div>
  );
}

function InquiryForm({ compact = false }: { compact?: boolean }) {
  const { text } = useSite();
  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      text.hello,
      "",
      compact ? text.inquiryCompact : text.inquiryFull,
      "",
      ...(!compact ? [text.name + ": " + String(data.get("name"))] : []),
      text.email + ": " + String(data.get("email")),
      ...(data.get("phone") ? [text.phone + ": " + String(data.get("phone"))] : []),
    ];
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(compact ? text.subjectEbook : text.subjectUpdates) + "&body=" + encodeURIComponent(lines.join("\n"));
  }

  return (
    <form className={compact ? "ebook-form" : "footer-form-fields"} onSubmit={openEmail}>
      {!compact && <input name="name" aria-label={text.name} autoComplete="name" placeholder={text.namePlaceholder} required />}
      <input type="email" name="email" aria-label={text.email} autoComplete="email" placeholder={text.emailPlaceholder} required />
      <input type="tel" name="phone" aria-label={text.phone} autoComplete="tel" placeholder={text.phonePlaceholder} />
      <button type="submit">{compact ? text.submit : text.submitNow}</button>
    </form>
  );
}

export default function AuthorWebsite() {
  const siteRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguageState] = useState<Language>("en");
  const [reviewStart, setReviewStart] = useState(0);
  const [detail, setDetail] = useState<{ title: string; text: string; category: string } | null>(null);
  const text = page[language];
  const words = copy[language];
  const reviewOrder = testimonials.map((_, index) => testimonials[(index + reviewStart) % testimonials.length]);

  useEffect(() => {
    const saved = window.localStorage.getItem("bertin-language");
    if (saved === "fr" || saved === "en") setLanguageState(saved);
  }, []);

  function setLanguage(next: Language) {
    setLanguageState(next);
    window.localStorage.setItem("bertin-language", next);
    document.documentElement.lang = next;
  }

  useEffect(() => {
    const root = siteRef.current;
    if (!root || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("entered");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    root.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  function showDetail(title: string, text: string, category: string) {
    setDetail({ title, text, category });
    dialogRef.current?.showModal();
  }

  return (
    <SiteLanguage.Provider value={{ language, setLanguage }}>
    <div className="figma-site" ref={siteRef}>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="figma-header" id="home">
        <div className="frame-width header-layout">
          <a href="#home" aria-label="How God Sees the World home">
            <Image src={logo} width={145} height={120} className="header-logo" alt="How God Sees the World" />
          </a>
          <div className="header-actions">
          <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? "main-nav menu-open" : "main-nav"}>
            {navigation.map(({ key, href }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{text[key]}</a>
            ))}
            <OrderButton />
          </nav>
          <LanguageSwitch />
          <button type="button" className="menu-toggle" aria-label={menuOpen ? text.menuClose : text.menuOpen} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="frame-width hero-layout">
            <div className="hero-copy">
              <SectionLabel>{text.heroKicker}</SectionLabel>
              {language === "en"
                ? <h1 id="hero-title">How <em>God</em><br />sees the<br />world</h1>
                : <h1 id="hero-title">Comment <em>Dieu</em><br />voit<br />le monde</h1>}
              <p className="italic-copy">{text.heroLine}</p>
              <BookActions />
            </div>
            <div className="hero-art">
              <Image className="hero-glow" src={asset + "book-glow.webp"} width={984} height={984} alt="" />
              <FlipCover className="hero-cover" preload />
            </div>
          </div>
        </section>

        <div className="retail-strip" aria-label="Bookseller marks from the design">
          {retailers.map(([label, file]) => (
            <Image key={file} src={asset + file + ".webp"} width={260} height={90} alt={label} />
          ))}
        </div>

        <section id="vision" className="vision" aria-labelledby="vision-title">
          <div className="frame-width vision-inner" data-reveal>
            <SectionLabel>{text.visionKicker}</SectionLabel>
            <h2 id="vision-title">{text.visionTitleA}<br /><em>{text.visionTitleB}</em></h2>
            <div className="italic-copy">
              <p>{text.visionP1}</p>
              <p>{text.visionP2}</p>
            </div>
            <BookActions />
          </div>
        </section>

        <section className="equation" aria-label="The equation">
          <div className="frame-width equation-inner" data-reveal>
            <SectionLabel>{text.equation}</SectionLabel>
            <p className="formula" aria-label={text.equationNote}>
              <span>G<sub>μν</sub> + g<sub>μν</sub>Λ =</span>
              <em><span className="fraction"><span>8πG</span><span>c⁴</span></span> T<sub>μν</sub></em>
            </p>
            <SectionLabel>{text.equationNote}</SectionLabel>
          </div>
        </section>

        <section className="lenses" aria-labelledby="lenses-title">
          <div className="frame-width" data-reveal>
            <SectionLabel>{text.lensesKicker}</SectionLabel>
            <h2 id="lenses-title">{text.lensesTitleA}<br /><em>{text.lensesTitleB}</em></h2>
            <div className="lens-grid">
              {lenses.map((lens) => (
                <button key={lens.numeral} type="button" onClick={() => showDetail(lens[language][0], lens[language][1], text.lensesKicker)}>
                  <span>{lens.numeral}</span>{lens[language][0]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="books" className="book-section" aria-labelledby="book-title">
          <div className="frame-width book-layout" data-reveal>
            <div>
              <SectionLabel>{text.visionKicker}</SectionLabel>
              {language === "en"
                ? <h2 id="book-title">How <em>God</em> sees<br />the world</h2>
                : <h2 id="book-title">Comment <em>Dieu</em> voit<br />le monde</h2>}
              <p className="italic-copy">{text.bookLine}</p>
              <div className="book-actions">
                <OrderButton>{text.buy}</OrderButton>
                <Image className="book-kindle" src={asset + "kindle.webp"} width={235} height={52} alt="Amazon Kindle" />
              </div>
            </div>
            <Cover className="shop-cover" />
          </div>
        </section>

        <section id="about" className="author-section" aria-labelledby="author-title">
          <div className="frame-width author-layout" data-reveal>
            <div className="author-art">
              <Image className="author-halo" src={asset + "author-glow.webp"} width={1028} height={1028} alt="" />
              <Image className="author-photo" src={asset + "author-portrait.webp"} width={578} height={744} alt="Bertin Nana" />
            </div>
            <div>
              <SectionLabel>{text.authorKicker}</SectionLabel>
              <h2 id="author-title"><em>Bertin</em> Nana</h2>
              <p className="italic-copy">{words.authorText}</p>
              <blockquote className="italic-copy">“{words.authorQuote}”</blockquote>
            </div>
          </div>
        </section>

        <section className="ebook" aria-labelledby="ebook-title">
          <div className="ebook-inner" data-reveal>
            <Cover className="ebook-cover" />
            <div>
              <h2 id="ebook-title">{text.ebookA} <em>{text.ebookB}</em></h2>
              <p>{text.ebookBefore} <i>{text.ebookName}</i>.</p>
              <InquiryForm compact />
            </div>
          </div>
        </section>

        <section className="reviews" aria-labelledby="reviews-title">
          <div className="reviews-inner" data-reveal>
            <SectionLabel>{text.reviewsKicker}</SectionLabel>
            <h2 id="reviews-title"><em>{text.reviewsA}</em> {text.reviewsB}</h2>
            <div className="reviews-grid" aria-live="polite">
              {reviewOrder.map((review) => (
                <figure className="review-card" key={review.name}>
                  <Image src={asset + review.image} width={82} height={82} alt="" />
                  <blockquote>{review[language]}</blockquote>
                  <figcaption>{review.name}</figcaption>
                </figure>
              ))}
            </div>
            <div className="review-controls">
              <button type="button" aria-label={text.prev} onClick={() => setReviewStart((reviewStart + 2) % 3)}><ArrowLeft size={17} /></button>
              <button type="button" aria-label={text.next} onClick={() => setReviewStart((reviewStart + 1) % 3)}><ArrowRight size={17} /></button>
            </div>
          </div>
        </section>

        <section id="blogs" className="blogs" aria-labelledby="blogs-title">
          <div className="blog-inner" data-reveal>
            <SectionLabel>{text.blogKicker}</SectionLabel>
            <h2 id="blogs-title"><em>{text.blogs}</em></h2>
            <div className="blog-grid">
              {articles.map((article) => {
                const post = article[language];
                return (
                <article className="blog-card" key={article.en.title}>
                  <Image className="blog-image" src={asset + article.image} width={360} height={240} alt="" />
                  <p className="blog-category">{post.category}</p>
                  <h3><button type="button" onClick={() => showDetail(post.title, post.description, post.category)}>{post.title}<ArrowUpRight size={17} /></button></h3>
                  <p className="blog-description">{post.description}</p>
                  <div className="blog-byline">
                    <Image src={asset + article.avatar} width={40} height={40} alt="" />
                    <div>{article.author}<span>{post.date}</span></div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="figma-footer">
        <div className="footer-grid" data-reveal>
          <div className="footer-about">
            <a href="#home"><Image src={logo} width={190} height={158} alt="How God Sees the World" /></a>
            <p>{text.footer}</p>
            <a className="footer-email" href={"mailto:" + email}>{email}</a>
            <a className="footer-phone" href="tel:+13255753237">+1 (325) 575-3237</a>
            <div className="social-marks" aria-label="Social icons from the design">
              {[Facebook, Instagram, Youtube, Linkedin, Mail].map((Icon, index) => <span key={index} aria-hidden="true"><Icon size={12} /></span>)}
            </div>
          </div>
          <div className="footer-nav">
            <h2>{text.shortLinks}</h2>
            <nav aria-label={text.footerNav}>
              {[...navigation.slice(0, 3), { key: "blogs" as const, href: "#blogs" }, navigation[3]].map(({ href, key }) => <a key={href} href={href}>{text[key]}</a>)}
            </nav>
            <Image className="payment-marks" src={asset + "payment-marks.webp"} width={304} height={32} alt="" />
          </div>
          <div className="footer-form">
            <h2>{text.signup}</h2>
            <p>{text.signupNote}</p>
            <InquiryForm />
          </div>
        </div>
        <div className="copyright">howgodseestheworld © copyright</div>
      </footer>

      <dialog className="detail-dialog" ref={dialogRef} aria-labelledby="detail-title">
        <div className="detail-content">
          <button className="detail-close" type="button" aria-label={text.close} onClick={() => dialogRef.current?.close()}><X size={22} /></button>
          {detail && <><SectionLabel>{detail.category}</SectionLabel><h2 id="detail-title">{detail.title}</h2><p>{detail.text}</p></>}
        </div>
      </dialog>
    </div>
    </SiteLanguage.Provider>
  );
}
