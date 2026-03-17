"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    num: "01",
    title: "Credit Card Customer Segmentation",
    desc: "K-Means clustering pipeline to segment users by spending behavior and digital engagement. Optimized cluster count via the Elbow Method; integrated Random Forest & KNN for predictive classification with cross-validation.",
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
    link: "#",
  },
  {
    num: "02",
    title: "Train Platform Allotment System",
    desc: "Greedy scheduling algorithm in C++ using a Min-Heap Priority Queue to compute the minimum platforms required. Paired with an interactive web UI for real-time input validation and allocation display.",
    stack: ["C++", "STL", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/DivyaSharma",
  },
  {
    num: "03",
    title: "Population Analysis Dashboard",
    desc: "Excel-native BI dashboard built with PivotTables, Power Query, dynamic arrays, and XLOOKUP. Enabled real-time filtering via slicers and conditional formatting to surface actionable trends.",
    stack: ["Excel", "Power Query", "PivotTables", "Data Viz"],
    link: "#",
  },
  {
    num: "04",
    title: "Zerodha Clone",
    desc: "Full-stack trading platform clone built during Apna College training. Live stock data views, portfolio management, and simulated buy/sell execution through an interactive trading dashboard.",
    stack: ["React", "Node.js", "Bootstrap", "MongoDB"],
    link: "https://github.com/DivyaSharma",
  },
];

const SKILLS = {
  Languages: ["C++", "Python", "JavaScript"],
  "Web & Frameworks": ["React", "Node.js", "HTML & CSS", "Bootstrap"],
  "Data & ML": ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
  "Tools & Platforms": ["MySQL", "Git", "GitHub", "Jupyter Notebook", "VSCode", "Excel"],
};

const CERTIFICATES = [
  { title: "Python Programming", issuer: "CodeChef", year: "Sep 2025" },
  { title: "UX for Web Developers", issuer: "CodeChef", year: "Aug 2025" },
  { title: "Introduction to Generative AI", issuer: "Coursera", year: "Feb 2024" },
  { title: "Databases & SQL for Data Science", issuer: "Coursera", year: "Jan 2024" },
];

// ─── Hook: reveal on scroll ───────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.65s cubic-bezier(.4,0,.2,1), transform 0.65s cubic-bezier(.4,0,.2,1)";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-sm text-white/40 tracking-widest uppercase">
          divya<span className="text-white">.dev</span>
        </span>
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-sm text-white/40 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          download
          className="text-xs font-mono border border-white/20 text-white/60 hover:text-white hover:border-white/60 px-4 py-2 transition-all duration-200 tracking-widest uppercase"
        >
          Resume ↓
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 pt-24 pb-16">
      <div className="space-y-6">
        <p
          className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase"
          style={{ animationDelay: "0.1s" }}
        >
          B.Tech CSE · Data Science &amp; Cloud · LPU
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] tracking-tight">
          Divya
          <br />
          <span className="text-white/30">Sharma</span>
        </h1>
        <p className="max-w-xl text-white/50 text-base md:text-lg leading-relaxed font-light">
          Third-year CS student building at the intersection of data science,
          machine learning, and full-stack web. Currently sharpening DSA and
          shipping projects that solve real problems.
        </p>
        <div className="flex gap-4 pt-2">
          <a
            href="#projects"
            className="text-sm text-white bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 px-6 py-3 transition-all duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-6 py-3 transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Ambient grid lines */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
      <div data-reveal className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <p className="font-mono text-xs text-white/25 tracking-[0.25em] uppercase mb-4">
            About
          </p>
          <h2 className="text-3xl font-light text-white">Who I am</h2>
        </div>
        <div className="space-y-5 text-white/50 text-base leading-relaxed font-light">
          <p>
            I'm Divya Sharma, a 3rd-year B.Tech student in Computer Science &amp;
            Engineering at Lovely Professional University, Phagwara — specializing
            in Data Science and Cloud Computing.
          </p>
          <p>
            I work across the full stack: from designing clustering pipelines in
            Python to building interactive trading dashboards in React. I care
            about writing clean, purposeful code and building things that
            actually work in production.
          </p>
          <p>
            Outside of projects, I stay consistent on competitive programming —
            100+ problems on LeetCode and CodeChef, CodeChef rating 824 (Div 4).
            I believe the fundamentals matter.
          </p>

          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "100+", label: "Problems Solved" },
              { num: "3", label: "Major Projects" },
              { num: "6.96", label: "CGPA" },
              { num: "4", label: "Certifications" },
            ].map((s) => (
              <div key={s.label} className="border border-white/[0.08] p-4">
                <div className="text-2xl font-light text-white mb-1">{s.num}</div>
                <div className="text-xs text-white/30 tracking-wide font-mono uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
      <div data-reveal className="mb-12">
        <p className="font-mono text-xs text-white/25 tracking-[0.25em] uppercase mb-4">
          Projects
        </p>
        <h2 className="text-3xl font-light text-white">Selected Work</h2>
      </div>

      <div className="space-y-px">
        {PROJECTS.map((p, i) => (
          <div
            key={p.num}
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
            className="group border border-white/[0.06] hover:border-white/20 p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.02] cursor-default"
          >
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-xs text-white/20">{p.num}</span>
                  <h3 className="text-white font-normal text-lg group-hover:text-white/90 transition-colors">
                    {p.title}
                  </h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-2xl font-light">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-white/25 border border-white/[0.08] px-2 py-1 tracking-widest uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={p.link}
                className="text-white/20 group-hover:text-white/60 text-xl transition-all duration-200 flex-shrink-0 mt-1"
              >
                ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
      <div data-reveal className="mb-12">
        <p className="font-mono text-xs text-white/25 tracking-[0.25em] uppercase mb-4">
          Skills
        </p>
        <h2 className="text-3xl font-light text-white">Toolkit</h2>
      </div>

      <div data-reveal className="grid md:grid-cols-2 gap-8">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat}>
            <p className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase mb-3 border-b border-white/[0.06] pb-2">
              {cat}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span
                  key={s}
                  className="text-sm text-white/50 hover:text-white border border-white/[0.08] hover:border-white/30 px-3 py-1.5 transition-all duration-200 cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates */}
      <div data-reveal className="mt-16">
        <p className="font-mono text-xs text-white/25 tracking-[0.25em] uppercase mb-6">
          Certificates
        </p>
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.04]">
          {CERTIFICATES.map((c) => (
            <div key={c.title} className="bg-[#0a0a0a] p-5 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
              <div>
                <p className="text-white/70 text-sm group-hover:text-white transition-colors">{c.title}</p>
                <p className="text-white/25 text-xs font-mono mt-1">{c.issuer}</p>
              </div>
              <span className="font-mono text-[10px] text-white/20 flex-shrink-0 mt-0.5">{c.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
      <div data-reveal className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <p className="font-mono text-xs text-white/25 tracking-[0.25em] uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl font-light text-white">Say hello</h2>
        </div>
        <div className="space-y-6">
          <p className="text-white/40 text-base leading-relaxed font-light max-w-lg">
            Open to internships, collaborations, and interesting projects. Feel
            free to reach out — I usually respond within a day.
          </p>
          <div className="space-y-3">
            {[
              { label: "Email", value: "divya.sharma2765@gmail.com", href: "mailto:divya.sharma2765@gmail.com" },
              { label: "LinkedIn", value: "linkedin.com/in/divya2765sharma", href: "https://linkedin.com/in/divya2765sharma" },
              { label: "GitHub", value: "github.com/DivyaSharma", href: "https://github.com/DivyaSharma" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-white/[0.08] hover:border-white/25 p-4 group transition-all duration-200 hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase w-16">{item.label}</span>
                  <span className="text-white/50 group-hover:text-white text-sm transition-colors">{item.value}</span>
                </div>
                <span className="text-white/20 group-hover:text-white/60 transition-colors">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
      <span className="font-mono text-xs text-white/20 tracking-widest uppercase">
        Divya Sharma · 2025
      </span>
      <span className="font-mono text-xs text-white/15">
        B.Tech CSE · LPU · Phagwara
      </span>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useReveal();

  return (
    <main className="bg-[#0a0a0a] min-h-screen relative" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      {/* Google font import — add to layout.tsx or globals.css in real project */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400&family=DM+Mono:wght@300;400&display=swap');
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
