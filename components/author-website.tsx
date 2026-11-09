"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, Menu, X, Youtube } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { copy } from "@/content/site-copy";

const asset = "/figma/";
const logo = "/images/logo-white.png";
const email = "Bertinbertinnana@gmail.com";
const order = "mailto:" + email + "?subject=" + encodeURIComponent("How God Sees the World — order inquiry");
const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Books", href: "#books" },
  { label: "Contact", href: "#contact" },
];

const retailers = [
  ["Amazon Kindle", "kindle"],
  ["Google Play Books", "google"],
  ["Apple Books", "apple"],
  ["Barnes & Noble", "barnes"],
  ["Kobo", "kobo"],
];

const lenses = [
  { numeral: "I", title: "Creation", text: "The book begins with the universe itself, asking how the laws of nature can inform a Christian understanding of creation." },
  { numeral: "II", title: "Law", text: "Nana considers how physical law and moral law shape the way we understand the world and our responsibilities within it." },
  { numeral: "III", title: "Sacrifice", text: "The book turns to sacrifice as a way of understanding the Christian story and what it asks of human relationships." },
  { numeral: "IV", title: "Grace", text: "Grace connects the book’s questions about faith with the possibility of forgiveness, kindness, and a different way of living." },
];

const testimonials = [
  { name: "Mike Torello", image: "reader-mike.webp", quote: "Nana brings Christian faith and mathematics into the same conversation. The questions stay with you after the last page." },
  { name: "Rick Wright", image: "reader-rick.webp", quote: "A personal look at creation, love, and the universe. I kept returning to the chapters on physics and philosophy." },
  { name: "Devon Miles", image: "reader-devon.webp", quote: "Clear and sincere. The book asks you to look at faith, reason, and human life from more than one direction." },
];

const articles = [
  {
    title: "UX review presentations",
    category: "Design",
    description: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: "blog-design.webp",
    avatar: "blog-olivia.webp",
  },
  {
    title: "Migrating to Linear 101",
    category: "Product",
    description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.",
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    image: "blog-product.webp",
    avatar: "blog-phoenix.webp",
  },
  {
    title: "Building your API Stack",
    category: "Software Engineering",
    description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: "Lana Steiner",
    date: "18 Jan 2022",
    image: "blog-engineering.webp",
    avatar: "blog-lana.webp",
  },
];

function Cover({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src={asset + "book-cover.webp"}
      width={528}
      height={792}
      alt="How God Sees the World by Bertin Nana"
      sizes="(max-width: 640px) 52vw, 28vw"
      preload={preload}
      className={className}
    />
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function OrderButton({ children = "Order now" }: { children?: ReactNode }) {
  return <a className="gold-button" href={order}>{children}</a>;
}

function BookActions() {
  return (
    <div className="book-actions">
      <OrderButton />
      <a className="outline-button" href="#vision">Enter the vision</a>
    </div>
  );
}

function InquiryForm({ compact = false }: { compact?: boolean }) {
  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Hello Bertin,",
      "",
      compact ? "I’d like to ask about the e-book edition of How God Sees the World." : "I’d like to hear about How God Sees the World and future updates.",
      "",
      ...(!compact ? ["Name: " + String(data.get("name"))] : []),
      "Email: " + String(data.get("email")),
      ...(data.get("phone") ? ["Phone: " + String(data.get("phone"))] : []),
    ];
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(compact ? "E-book inquiry" : "Book updates") + "&body=" + encodeURIComponent(lines.join("\n"));
  }

  return (
    <form className={compact ? "ebook-form" : "footer-form-fields"} onSubmit={openEmail}>
      {!compact && <input name="name" aria-label="Full name" autoComplete="name" placeholder="Full Name" required />}
      <input type="email" name="email" aria-label="Email address" autoComplete="email" placeholder="Email Address" required />
      <input type="tel" name="phone" aria-label="Phone number" autoComplete="tel" placeholder="Phone Number" />
      <button type="submit">{compact ? "Submit" : "Submit now"}</button>
    </form>
  );
}

export default function AuthorWebsite() {
  const siteRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewStart, setReviewStart] = useState(0);
  const [detail, setDetail] = useState<{ title: string; text: string; category: string } | null>(null);
  const reviewOrder = testimonials.map((_, index) => testimonials[(index + reviewStart) % testimonials.length]);

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
    <div className="figma-site" ref={siteRef}>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="figma-header" id="home">
        <div className="frame-width header-layout">
          <a href="#home" aria-label="How God Sees the World home">
            <Image src={logo} width={145} height={120} className="header-logo" alt="How God Sees the World" />
          </a>
          <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? "main-nav menu-open" : "main-nav"}>
            {navigation.map(({ label, href }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <OrderButton />
          </nav>
          <button type="button" className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="frame-width hero-layout">
            <div className="hero-copy">
              <SectionLabel>A book by Bertin Nana</SectionLabel>
              <h1 id="hero-title">How <em>God</em><br />sees the<br />world</h1>
              <p className="italic-copy">What if the equations that describe the universe</p>
              <BookActions />
            </div>
            <div className="hero-art">
              <Image className="hero-glow" src={asset + "book-glow.webp"} width={984} height={984} alt="" />
              <Cover className="hero-cover" preload />
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
            <SectionLabel>The book</SectionLabel>
            <h2 id="vision-title">A vision written in<br /><em>stars &amp; scripture</em></h2>
            <div className="italic-copy">
              <p>What if the equations that describe the universe and the stories that describe our salvation were never in conflict — but two languages for the same truth?</p>
              <p>How God Sees the World invites the reader to step back far enough to see creation as its Author might: a cosmos bound by gravity and light, and a humanity bound by law, sacrifice, and grace.</p>
            </div>
            <BookActions />
          </div>
        </section>

        <section className="equation" aria-label="The equation">
          <div className="frame-width equation-inner" data-reveal>
            <SectionLabel>The equation</SectionLabel>
            <p className="formula" aria-label="Einstein’s field equations">
              <span>G<sub>μν</sub> + g<sub>μν</sub>Λ =</span>
              <em><span className="fraction"><span>8πG</span><span>c⁴</span></span> T<sub>μν</sub></em>
            </p>
            <SectionLabel>Einstein&apos;s field equations · 1915</SectionLabel>
          </div>
        </section>

        <section className="lenses" aria-labelledby="lenses-title">
          <div className="frame-width" data-reveal>
            <SectionLabel>Four lenses</SectionLabel>
            <h2 id="lenses-title">Seeing the world<br /><em>from above</em></h2>
            <div className="lens-grid">
              {lenses.map((lens) => (
                <button key={lens.title} type="button" onClick={() => showDetail(lens.title, lens.text, "Four lenses")}>
                  <span>{lens.numeral}</span>{lens.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="books" className="book-section" aria-labelledby="book-title">
          <div className="frame-width book-layout" data-reveal>
            <div>
              <SectionLabel>The book</SectionLabel>
              <h2 id="book-title">How <em>God</em> sees<br />the world</h2>
              <p className="italic-copy">Bring home a journey across the heavens and through the pages of Scripture. Ask the author about print and digital editions.</p>
              <div className="book-actions">
                <OrderButton>Buy now</OrderButton>
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
              <SectionLabel>The author</SectionLabel>
              <h2 id="author-title"><em>Bertin</em> Nana</h2>
              <p className="italic-copy">{copy.en.authorText}</p>
              <blockquote className="italic-copy">“{copy.en.authorQuote}”</blockquote>
            </div>
          </div>
        </section>

        <section className="ebook" aria-labelledby="ebook-title">
          <div className="ebook-inner" data-reveal>
            <Cover className="ebook-cover" />
            <div>
              <h2 id="ebook-title">Ask about my <em>E-Book</em></h2>
              <p>Contact Bertin Nana to ask about the digital edition of <i>How God Sees the World</i>.</p>
              <InquiryForm compact />
            </div>
          </div>
        </section>

        <section className="reviews" aria-labelledby="reviews-title">
          <div className="reviews-inner" data-reveal>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 id="reviews-title"><em>What readers</em> say</h2>
            <div className="reviews-grid" aria-live="polite">
              {reviewOrder.map((review) => (
                <figure className="review-card" key={review.name}>
                  <Image src={asset + review.image} width={82} height={82} alt="" />
                  <blockquote>{review.quote}</blockquote>
                  <figcaption>{review.name}</figcaption>
                </figure>
              ))}
            </div>
            <div className="review-controls">
              <button type="button" aria-label="Previous testimonial" onClick={() => setReviewStart((reviewStart + 2) % 3)}><ArrowLeft size={17} /></button>
              <button type="button" aria-label="Next testimonial" onClick={() => setReviewStart((reviewStart + 1) % 3)}><ArrowRight size={17} /></button>
            </div>
          </div>
        </section>

        <section id="blogs" className="blogs" aria-labelledby="blogs-title">
          <div className="blog-inner" data-reveal>
            <SectionLabel>Insights and inspiration for authors</SectionLabel>
            <h2 id="blogs-title"><em>Blogs</em></h2>
            <div className="blog-grid">
              {articles.map((article) => (
                <article className="blog-card" key={article.title}>
                  <Image className="blog-image" src={asset + article.image} width={360} height={240} alt="" />
                  <p className="blog-category">{article.category}</p>
                  <h3><button type="button" onClick={() => showDetail(article.title, article.description, article.category)}>{article.title}<ArrowUpRight size={17} /></button></h3>
                  <p className="blog-description">{article.description}</p>
                  <div className="blog-byline">
                    <Image src={asset + article.avatar} width={40} height={40} alt="" />
                    <div>{article.author}<span>{article.date}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="figma-footer">
        <div className="footer-grid" data-reveal>
          <div className="footer-about">
            <a href="#home"><Image src={logo} width={190} height={158} alt="How God Sees the World" /></a>
            <p>Faith, mathematics, and the questions that shape our lives. Get in touch with Bertin Nana about the book.</p>
            <a className="footer-email" href={"mailto:" + email}>{email}</a>
            <a className="footer-phone" href="tel:+13255753237">+1 (325) 575-3237</a>
            <div className="social-marks" aria-label="Social icons from the design">
              {[Facebook, Instagram, Youtube, Linkedin, Mail].map((Icon, index) => <span key={index} aria-hidden="true"><Icon size={12} /></span>)}
            </div>
          </div>
          <div className="footer-nav">
            <h2>Short Links</h2>
            <nav aria-label="Footer navigation">
              {[...navigation.slice(0, 3), { label: "Blogs", href: "#blogs" }, navigation[3]].map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
            </nav>
            <Image className="payment-marks" src={asset + "payment-marks.webp"} width={304} height={32} alt="" />
          </div>
          <div className="footer-form">
            <h2>Sign up for exclusive content, emails &amp; updates</h2>
            <p>Send a request to the author by email.</p>
            <InquiryForm />
          </div>
        </div>
        <div className="copyright">howgodseestheworld © copyright</div>
      </footer>

      <dialog className="detail-dialog" ref={dialogRef} aria-labelledby="detail-title">
        <div className="detail-content">
          <button className="detail-close" type="button" aria-label="Close details" onClick={() => dialogRef.current?.close()}><X size={22} /></button>
          {detail && <><SectionLabel>{detail.category}</SectionLabel><h2 id="detail-title">{detail.title}</h2><p>{detail.text}</p></>}
        </div>
      </dialog>
    </div>
  );
}
