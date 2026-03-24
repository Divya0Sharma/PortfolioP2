"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    num: "01",
    title: "Tele-Law Services in India - Data Analysis & Visualization",
    desc: `A data-driven analysis of legal aid accessibility across states, districts, social categories, and genders in India.`,
    points: [
      "Analyzed state-wise and district-wise trends in Tele-Law case registrations",
      "Examined gender-based legal advice patterns and social category representation (General, OBC, SC, ST)",
      "Evaluated CSC (Common Service Centers) performance in delivering legal advice",
      "Implemented predictive analysis and visualizations using Pandas, Seaborn, and Matplotlib"
    ],
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib", "Data Analysis"],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7316841611781410816/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    num: "02",
    title: "Train Platform Allotment System",
    desc: `A greedy scheduling algorithm implementation to optimize train platform allocation and prevent congestion.`,
    points: [
      "Implemented Min-Heap Priority Queue to compute minimum platforms required for train schedules",
      "Developed interactive web UI with real-time input validation and allocation display",
      "Applied greedy algorithm approach to handle overlapping train schedules efficiently",
      "Strengthened understanding of data structures and algorithm optimization"
    ],
    stack: ["C++", "STL", "HTML", "CSS", "JavaScript", "Data Structures"],
    link: "https://system-nine-beta.vercel.app/",
    image: "/tp.jpg",
  },
  {
    num: "03",
    title: "Travel Analytics Dashboard - Power BI",
    desc: `An interactive business intelligence dashboard transforming travel data into actionable insights.`,
    points: [
      "Built dynamic KPI cards tracking total travelers, flights, hotel nights, and revenue metrics",
      "Analyzed monthly flight trends, booking patterns, and demographic segmentation by company, gender, and age",
      "Implemented hotel analytics including stay duration, pricing analysis, and location-based insights",
      "Applied data cleaning, modeling, and DAX measures to create intuitive visual storytelling"
    ],
    stack: ["Power BI", "Power Query", "DAX", "Data Modeling", "Dashboard Design"],
    link: "https://sites.google.com/view/travel2019powerbidashboard/home?pli=1",
    image: "/ds.jpg",
  },
];

const SKILLS = {
  Languages: [
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  ],
  "Web & Frameworks": [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "HTML & CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  ],
  "Data & ML": [
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
    { name: "Matplotlib", icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
    { name: "Seaborn", icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
  ],
  "Tools & Platforms": [
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    { name: "VSCode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Excel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/excel/excel-original.svg" },
  ],
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

// ─── Theme Context ────────────────────────────────────────────────────────────

type Theme = "dark" | "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light", savedTheme === "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  return { theme, toggleTheme };
}

// ─── Particle Effect Component ───────────────────────────────────────────────

function ParticleEffect({ theme }: { theme: Theme }) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const particles = document.querySelector('.particles');
      if (!particles) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle cursor-particle';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      const size = Math.random() * 50 + 10;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = duration + 's';
      particles.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`particles ${theme === "light" ? "opacity-20" : ""}`}>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </div>
  );
}

// ─── Infographics Component ───────────────────────────────────────────────────

function Infographics({ theme }: { theme: Theme }) {
  const stats = [
    { label: "Projects Completed", value: "3+", icon: "📊", color: "from-purple-500 to-pink-500" },
    { label: "Problems Solved", value: "100+", icon: "💻", color: "from-blue-500 to-purple-500" },
    { label: "Certifications", value: "4", icon: "📜", color: "from-green-500 to-teal-500" },
    { label: "Tech Skills", value: "15+", icon: "⚙️", color: "from-orange-500 to-red-500" },
  ];

  const contributions = [
    { label: "LeetCode", value: "50+", icon: "⚡", color: "from-yellow-500 to-orange-500" },
    { label: "CodeChef", value: "50+", icon: "🍜", color: "from-brown-500 to-amber-500" },
    { label: "GitHub Commits", value: "100+", icon: "📈", color: "from-gray-500 to-gray-700" },
  ];

  return (
    <div className="py-12">
      {/* Main Stats Grid */}
      <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 ${
              theme === "dark"
                ? "bg-gradient-to-br from-[#9F05F7]/10 to-[#DBA5FA]/10 border border-[#9F05F7]/20 hover:border-[#DBA5FA]/40"
                : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-400 shadow-lg"
            }`}
          >
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl bg-gradient-to-r ${stat.color} opacity-20`}></div>
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className={`text-3xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className={`text-sm font-medium ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Contribution Stats */}
      <div data-reveal className="grid grid-cols-3 gap-4 mb-12">
        {contributions.map((contrib, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-5 text-center transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#9F05F7]/5 border border-[#9F05F7]/20"
                : "bg-gradient-to-br from-gray-50 to-purple-50 border border-purple-200"
            }`}
          >
            <div className="text-2xl mb-2">{contrib.icon}</div>
            <div className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              {contrib.value}
            </div>
            <div className={`text-xs font-medium ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
              {contrib.label}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Proficiency Bars */}
      <div data-reveal className="mb-8">
        <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          Core Competencies
        </h3>
        <div className="space-y-3">
          {[
            { name: "Data Analysis", level: 85 },
            { name: "Machine Learning", level: 75 },
            { name: "Web Development", level: 80 },
            { name: "Data Structures & Algorithms", level: 85 },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === "dark" ? "text-white/70" : "text-gray-700"}>{skill.name}</span>
                <span className={theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}>{skill.level}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-white/10" : "bg-gray-200"}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#9F05F7] to-[#DBA5FA] transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Distribution */}
      <div data-reveal>
        <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          Technology Stack Distribution
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Python", percentage: 30, color: "from-blue-500 to-cyan-500" },
            { name: "C++", percentage: 25, color: "from-blue-600 to-indigo-600" },
            { name: "JavaScript", percentage: 20, color: "from-yellow-500 to-orange-500" },
            { name: "SQL", percentage: 15, color: "from-green-500 to-emerald-500" },
            { name: "Other", percentage: 10, color: "from-purple-500 to-pink-500" },
          ].map((tech) => (
            <div key={tech.name} className="flex-1 min-w-[100px]">
              <div className={`text-xs text-center mb-1 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                {tech.name}
              </div>
              <div className={`h-20 rounded-lg overflow-hidden bg-gradient-to-b ${tech.color} relative group`}>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10"
                  style={{ height: `${100 - tech.percentage}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? theme === "dark" 
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#9F05F7]/20" 
            : "bg-white/95 backdrop-blur-md border-b border-purple-200 shadow-sm"
          : theme === "dark" ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`font-mono text-sm tracking-widest uppercase ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
          divya<span className={`font-bold ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>.dev</span>
        </span>
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`text-sm transition-colors duration-200 tracking-wide font-medium ${
                  theme === "dark" 
                    ? "text-white/50 hover:text-[#DBA5FA]" 
                    : "text-gray-600 hover:text-[#9F05F7]"
                }`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "dark" 
                ? "border border-[#9F05F7]/30 hover:bg-[#9F05F7]/20 text-[#DBA5FA]" 
                : "border border-purple-300 hover:bg-purple-100 text-[#9F05F7]"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a
            href="/re.pdf"
            download="Divya_Sharma_Resume.pdf"
            className={`text-xs font-mono border px-4 py-2 transition-all duration-200 tracking-widest uppercase ${
              theme === "dark"
                ? "border-[#9F05F7]/30 text-[#DBA5FA] hover:text-white hover:bg-[#9F05F7]/20 hover:border-[#DBA5FA]"
                : "border-purple-300 text-[#9F05F7] hover:text-white hover:bg-[#9F05F7] hover:border-[#9F05F7]"
            }`}
          >
            Resume ↓
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ theme }: { theme: Theme }) {
  return (
    <section className={`min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 pt-24 pb-16 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gradient-to-br from-gray-50 via-white to-purple-50"}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left side - Text Content */}
        <div className="space-y-6 flex-1">
          <p
            className={`font-mono text-sm tracking-[0.3em] uppercase font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}
            style={{ animationDelay: "0.1s" }}
          >
            B.Tech CSE · Data Science & Cloud · LPU
          </p>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight">
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Divya</span>
            <br />
            <span className="bg-gradient-to-r from-[#9F05F7] via-[#DBA5FA] to-[#9F05F7] bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Sharma
            </span>
          </h1>
          <p className={`max-w-xl text-lg md:text-xl leading-relaxed font-medium ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
            Third-year CS student building at the intersection of data science,
            machine learning, and full-stack web. Currently sharpening DSA and
            shipping projects that solve real problems.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="text-sm font-semibold text-white bg-gradient-to-r from-[#9F05F7] to-[#DBA5FA] hover:from-[#8A04D5] hover:to-[#C894F0] px-8 py-4 transition-all duration-200 shadow-lg shadow-[#9F05F7]/25 hover:shadow-[#DBA5FA]/40 transform hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={`text-sm font-semibold border-2 px-8 py-4 transition-all duration-200 transform hover:-translate-y-1 ${
                theme === "dark"
                  ? "text-white/80 hover:text-white border-[#9F05F7]/30 hover:border-[#DBA5FA]"
                  : "text-gray-600 hover:text-[#9F05F7] border-gray-300 hover:border-[#9F05F7]"
              }`}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right side - Photo with professional frame */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#9F05F7] via-[#DBA5FA] to-[#9F05F7] rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient bg-[length:200%_200%]"></div>
            
            {/* Main image container */}
            <div className={`relative p-1 rounded-2xl ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/IMG_20260324_195242.jpg"
                  alt="Divya Sharma"
                  className="w-72 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem] object-cover object-top rounded-xl transform transition-all duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center 20%" }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-r from-[#9F05F7]/20 to-[#DBA5FA]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="absolute -top-3 -left-3 w-24 h-24 bg-gradient-to-r from-[#DBA5FA]/20 to-[#9F05F7]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              </div>
            </div>
            
            {/* Professional frame accent lines */}
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-[#9F05F7] rounded-tl-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-[#DBA5FA] rounded-br-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Ambient grid lines with purple glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(159,5,247,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(159,5,247,0.03)_1px,transparent_1px)] bg-[size:80px_80px]`} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#9F05F7]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#DBA5FA]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
}

function About({ theme }: { theme: Theme }) {
  return (
    <section id="about" className={`max-w-6xl mx-auto px-6 py-24 border-t ${theme === "dark" ? "border-[#9F05F7]/20" : "border-gray-200"} relative`}>
      <div data-reveal className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <p className={`font-mono text-sm tracking-[0.25em] uppercase mb-4 font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>
            About
          </p>
          <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Who I am</h2>
        </div>
        <div className={`space-y-5 text-lg leading-relaxed font-medium ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
          <p>
            I'm Divya Sharma, a 3rd-year B.Tech student in Computer Science & 
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

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "100+", label: "Problems Solved" },
              { num: "3", label: "Major Projects" },
              { num: "6.96", label: "CGPA" },
              { num: "4", label: "Certifications" },
            ].map((s) => (
              <div key={s.label} className={`border p-5 hover:border-[#DBA5FA]/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                theme === "dark" 
                  ? "border-[#9F05F7]/20 bg-gradient-to-br from-[#9F05F7]/5 to-transparent hover:shadow-[#9F05F7]/20" 
                  : "border-gray-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-purple-200"
              }`}>
                <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#9F05F7] to-[#DBA5FA] bg-clip-text text-transparent">{s.num}</div>
                <div className={`text-xs tracking-wide font-mono uppercase font-medium ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ theme }: { theme: Theme }) {
  const updatedProjects = [
    {
      num: "01",
      title: "Tele-Law Services in India - Data Analysis & Visualization",
      desc: `A data-driven analysis of legal aid accessibility across states, districts, social categories, and genders in India.`,
      points: [
        "Analyzed state-wise and district-wise trends in Tele-Law case registrations",
        "Examined gender-based legal advice patterns and social category representation (General, OBC, SC, ST)",
        "Evaluated CSC (Common Service Centers) performance in delivering legal advice",
        "Implemented predictive analysis and visualizations using Pandas, Seaborn, and Matplotlib"
      ],
      stack: ["Python", "Pandas", "Seaborn", "Matplotlib", "Data Analysis"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7316841611781410816/",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      num: "02",
      title: "Train Platform Allotment System",
      desc: `A greedy scheduling algorithm implementation to optimize train platform allocation and prevent congestion.`,
      points: [
        "Implemented Min-Heap Priority Queue to compute minimum platforms required for train schedules",
        "Developed interactive web UI with real-time input validation and allocation display",
        "Applied greedy algorithm approach to handle overlapping train schedules efficiently",
        "Strengthened understanding of data structures and algorithm optimization"
      ],
      stack: ["C++", "STL", "HTML", "CSS", "JavaScript", "Data Structures"],
      link: "https://system-nine-beta.vercel.app/",
      image: "/tp.jpg",
    },
    {
      num: "03",
      title: "Travel Analytics Dashboard - Power BI",
      desc: `An interactive business intelligence dashboard transforming travel data into actionable insights.`,
      points: [
        "Built dynamic KPI cards tracking total travelers, flights, hotel nights, and revenue metrics",
        "Analyzed monthly flight trends, booking patterns, and demographic segmentation by company, gender, and age",
        "Implemented hotel analytics including stay duration, pricing analysis, and location-based insights",
        "Applied data cleaning, modeling, and DAX measures to create intuitive visual storytelling"
      ],
      stack: ["Power BI", "Power Query", "DAX", "Data Modeling", "Dashboard Design"],
      link: "https://sites.google.com/view/travel2019powerbidashboard/home?pli=1",
      image: "/ds.jpg",
    },
  ];

  return (
    <section id="projects" className={`max-w-6xl mx-auto px-6 py-24 border-t ${theme === "dark" ? "border-[#9F05F7]/20" : "border-gray-200"}`}>
      <div data-reveal className="mb-12">
        <p className={`font-mono text-sm tracking-[0.25em] uppercase mb-4 font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>
          Projects
        </p>
        <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Selected Work</h2>
      </div>

      <div className="space-y-6">
        {updatedProjects.map((p, i) => (
          <div
            key={p.num}
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
            className={`group border transition-all duration-500 hover:bg-gradient-to-r overflow-hidden relative ${
              theme === "dark"
                ? "border-[#9F05F7]/20 hover:border-[#DBA5FA] hover:from-[#9F05F7]/5 hover:to-transparent"
                : "border-gray-200 hover:border-[#9F05F7] hover:from-purple-50/50 hover:to-transparent"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8">
              {/* Project Image */}
              <div className="md:w-1/3 w-full overflow-hidden rounded-lg">
                <img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Project Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-sm text-[#9F05F7] font-bold">{p.num}</span>
                  <h3 className={`font-bold text-xl group-hover:text-[#DBA5FA] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {p.title}
                  </h3>
                </div>
                <p className={`text-base leading-relaxed font-medium mb-3 ${theme === "dark" ? "text-white/70" : "text-gray-700"}`}>
                  {p.desc}
                </p>
                <ul className={`space-y-1.5 mb-4 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                  {p.points.map((point, idx) => (
                    <li key={idx} className="text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-[#9F05F7] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-[#DBA5FA] border border-[#9F05F7]/30 bg-[#9F05F7]/10 px-3 py-1.5 tracking-widest uppercase font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Link Arrow */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9F05F7] group-hover:text-[#DBA5FA] text-2xl transition-all duration-200 flex-shrink-0 mt-1 font-bold transform group-hover:translate-x-1 group-hover:-translate-y-1"
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

function Skills({ theme }: { theme: Theme }) {
  return (
    <section id="skills" className={`max-w-6xl mx-auto px-6 py-24 border-t ${theme === "dark" ? "border-[#9F05F7]/20" : "border-gray-200"}`}>
      <div data-reveal className="mb-12">
        <p className={`font-mono text-sm tracking-[0.25em] uppercase mb-4 font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>
          Skills
        </p>
        <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Toolkit</h2>
      </div>

      <div data-reveal className="grid md:grid-cols-2 gap-8">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat} className={`p-6 border transition-all duration-300 transform hover:-translate-y-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#9F05F7]/5 to-transparent border-[#9F05F7]/20 hover:border-[#DBA5FA]/40"
              : "bg-gradient-to-br from-purple-50/50 to-white border-gray-200 hover:border-[#9F05F7]/40"
          }`}>
            <p className={`font-mono text-sm tracking-[0.2em] uppercase mb-4 border-b pb-2 font-bold ${
              theme === "dark" 
                ? "text-[#DBA5FA] border-[#9F05F7]/20" 
                : "text-[#9F05F7] border-gray-200"
            }`}>
              {cat}
            </p>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <div
                  key={skill.name}
                  className={`group flex items-center gap-2 font-medium px-4 py-2 transition-all duration-200 cursor-default ${
                    theme === "dark"
                      ? "text-white bg-[#9F05F7]/10 hover:bg-[#9F05F7]/20 border border-[#9F05F7]/30 hover:border-[#DBA5FA]"
                      : "text-gray-700 bg-gray-100 hover:bg-purple-100 border border-gray-200 hover:border-[#9F05F7]"
                  }`}
                >
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Infographics Section */}
      <Infographics theme={theme} />

      {/* Training Section */}
      <div data-reveal className="mt-16">
        <p className={`font-mono text-sm tracking-[0.25em] uppercase mb-6 font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>
          Training
        </p>
        <div className="grid md:grid-cols-1 gap-4">
          <div className={`border p-6 transition-all duration-300 group transform hover:-translate-y-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#9F05F7]/5 to-transparent border-[#9F05F7]/20 hover:border-[#DBA5FA]"
              : "bg-gradient-to-br from-purple-50/50 to-white border-gray-200 hover:border-[#9F05F7]"
          }`}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Certificate Preview - Full size visible */}
              <div className="md:w-2/5 w-full">
                <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gray-100">
                  <img
                    src="/lpu.jpg"
                    alt="Logical Building, Programming and Data Structures Certificate"
                    className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                    style={{ maxHeight: "300px" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              {/* Certificate Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`font-bold text-xl group-hover:text-[#DBA5FA] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Logical Building, Programming and Data Structures
                    </p>
                    <p className="text-[#DBA5FA] text-base font-medium mt-2">Lovely Professional University</p>
                    <p className={`text-sm font-medium mt-1 ${theme === "dark" ? "text-white/40" : "text-gray-500"}`}>
                      Completed Training Program
                    </p>
                  </div>
                  <a
                    href="/lpu.jpg"
                    download="LPU_Training_Certificate.jpg"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-[#9F05F7]/20 hover:bg-[#9F05F7]/30 text-[#DBA5FA] border border-[#9F05F7]/30"
                        : "bg-purple-100 hover:bg-purple-200 text-[#9F05F7] border border-purple-300"
                    }`}
                  >
                    <span>Download Certificate</span>
                    <span>↓</span>
                  </a>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#9F05F7]/10 text-[#DBA5FA] border border-[#9F05F7]/30">
                    Programming Fundamentals
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#9F05F7]/10 text-[#DBA5FA] border border-[#9F05F7]/30">
                    Data Structures
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#9F05F7]/10 text-[#DBA5FA] border border-[#9F05F7]/30">
                    Logical Building
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div data-reveal className="mt-16">
        <p className={`font-mono text-sm tracking-[0.25em] uppercase mb-6 font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>
          Certificates
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Certificate 1 - Cloud Computing NPTEL */}
          <div className={`border p-6 transition-all duration-300 group transform hover:-translate-y-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#9F05F7]/5 to-transparent border-[#9F05F7]/20 hover:border-[#DBA5FA]"
              : "bg-gradient-to-br from-purple-50/50 to-white border-gray-200 hover:border-[#9F05F7]"
          }`}>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center" style={{ minHeight: "280px" }}>
                <img
                  src="/np.jpg"
                  alt="Cloud Computing Certificate"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                  style={{ maxHeight: "280px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`font-bold text-lg group-hover:text-[#DBA5FA] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Cloud Computing
                    </p>
                    <p className="text-[#DBA5FA] text-sm font-medium mt-1">NPTEL</p>
                  </div>
                  <a
                    href="/np.jpg"
                    download="NPTEL_Cloud_Computing.jpg"
                    className={`text-xs px-3 py-1 rounded transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-[#9F05F7]/20 hover:bg-[#9F05F7]/30 text-[#DBA5FA]"
                        : "bg-purple-100 hover:bg-purple-200 text-[#9F05F7]"
                    }`}
                  >
                    Download ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate 2 - Full Stack Web Development Apna College */}
          <div className={`border p-6 transition-all duration-300 group transform hover:-translate-y-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#9F05F7]/5 to-transparent border-[#9F05F7]/20 hover:border-[#DBA5FA]"
              : "bg-gradient-to-br from-purple-50/50 to-white border-gray-200 hover:border-[#9F05F7]"
          }`}>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center" style={{ minHeight: "280px" }}>
                <img
                  src="/a.jpg"
                  alt="Full Stack Web Development Certificate"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                  style={{ maxHeight: "280px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`font-bold text-lg group-hover:text-[#DBA5FA] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Full Stack Web Development
                    </p>
                    <p className="text-[#DBA5FA] text-sm font-medium mt-1">Apna College</p>
                  </div>
                  <a
                    href="/a.jpg"
                    download="Apna_College_Full_Stack.jpg"
                    className={`text-xs px-3 py-1 rounded transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-[#9F05F7]/20 hover:bg-[#9F05F7]/30 text-[#DBA5FA]"
                        : "bg-purple-100 hover:bg-purple-200 text-[#9F05F7]"
                    }`}
                  >
                    Download ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate 3 - Databases and SQL for Data Science with Python */}
          <div className={`border p-6 transition-all duration-300 group transform hover:-translate-y-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#9F05F7]/5 to-transparent border-[#9F05F7]/20 hover:border-[#DBA5FA]"
              : "bg-gradient-to-br from-purple-50/50 to-white border-gray-200 hover:border-[#9F05F7]"
          }`}>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center" style={{ minHeight: "280px" }}>
                <img
                  src="/py.jpg"
                  alt="Databases and SQL Certificate"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                  style={{ maxHeight: "280px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`font-bold text-lg group-hover:text-[#DBA5FA] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Databases and SQL for Data Science with Python
                    </p>
                    <p className="text-[#DBA5FA] text-sm font-medium mt-1">Coursera</p>
                  </div>
                  <a
                    href="/py.jpg"
                    download="Coursera_SQL_Data_Science.jpg"
                    className={`text-xs px-3 py-1 rounded transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-[#9F05F7]/20 hover:bg-[#9F05F7]/30 text-[#DBA5FA]"
                        : "bg-purple-100 hover:bg-purple-200 text-[#9F05F7]"
                    }`}
                  >
                    Download ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate 4 - C Programming CodeChef */}
          <div className={`border p-6 transition-all duration-300 group transform hover:-translate-y-1 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#9F05F7]/5 to-transparent border-[#9F05F7]/20 hover:border-[#DBA5FA]"
              : "bg-gradient-to-br from-purple-50/50 to-white border-gray-200 hover:border-[#9F05F7]"
          }`}>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center" style={{ minHeight: "280px" }}>
                <img
                  src="/c.jpg"
                  alt="C Programming Certificate"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                  style={{ maxHeight: "280px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9F05F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`font-bold text-lg group-hover:text-[#DBA5FA] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      C Programming
                    </p>
                    <p className="text-[#DBA5FA] text-sm font-medium mt-1">CodeChef</p>
                  </div>
                  <a
                    href="/c.jpg"
                    download="CodeChef_C_Programming.jpg"
                    className={`text-xs px-3 py-1 rounded transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-[#9F05F7]/20 hover:bg-[#9F05F7]/30 text-[#DBA5FA]"
                        : "bg-purple-100 hover:bg-purple-200 text-[#9F05F7]"
                    }`}
                  >
                    Download ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ theme }: { theme: Theme }) {
  return (
    <section id="contact" className={`max-w-6xl mx-auto px-6 py-24 border-t ${theme === "dark" ? "border-[#9F05F7]/20" : "border-gray-200"}`}>
      <div data-reveal className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <p className={`font-mono text-sm tracking-[0.25em] uppercase mb-4 font-medium ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>
            Contact
          </p>
          <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Say hello</h2>
        </div>
        <div className="space-y-6">
          <p className={`text-lg leading-relaxed font-medium max-w-lg ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
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
                className={`flex items-center justify-between border p-5 group transition-all duration-200 transform hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-[#9F05F7]/20 hover:border-[#DBA5FA] bg-gradient-to-r from-transparent to-transparent hover:from-[#9F05F7]/5 hover:to-transparent"
                    : "border-gray-200 hover:border-[#9F05F7] hover:bg-purple-50"
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className={`font-mono text-xs tracking-widest uppercase w-16 font-bold ${theme === "dark" ? "text-[#DBA5FA]" : "text-[#9F05F7]"}`}>{item.label}</span>
                  <span className={`text-base font-medium transition-colors ${theme === "dark" ? "text-white/70 group-hover:text-white" : "text-gray-600 group-hover:text-[#9F05F7]"}`}>{item.value}</span>
                </div>
                <span className={`text-xl transition-colors font-bold transform group-hover:translate-x-1 ${theme === "dark" ? "text-[#9F05F7] group-hover:text-[#DBA5FA]" : "text-[#9F05F7]"}`}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ theme }: { theme: Theme }) {
  return (
    <footer className={`border-t max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4 ${theme === "dark" ? "border-[#9F05F7]/20" : "border-gray-200"}`}>
      <span className={`font-mono text-sm tracking-widest uppercase font-medium ${theme === "dark" ? "text-white/40" : "text-gray-400"}`}>
        Divya Sharma · 2025
      </span>
      <span className={`font-mono text-sm font-medium ${theme === "dark" ? "text-[#DBA5FA]/40" : "text-gray-400"}`}>
        B.Tech CSE · LPU · Phagwara
      </span>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useReveal();
  const { theme, toggleTheme } = useTheme();

  return (
    <main className={`min-h-screen relative overflow-x-hidden ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gradient-to-br from-gray-50 via-white to-purple-50"}`} style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      {/* Google font import — add to layout.tsx or globals.css in real project */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');
        
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; border-radius: 0; }
          100% { transform: translateY(-1000px) rotate(720deg); opacity: 0; border-radius: 50%; }
        }

        .animate-gradient {
          animation: gradient 6s ease infinite;
          background-size: 200% 200%;
        }

        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          display: block;
          list-style: none;
          width: 20px;
          height: 20px;
          background: rgba(159, 5, 247, 0.15);
          animation: float 25s linear infinite;
          bottom: -150px;
          border-radius: 50%;
          filter: blur(1px);
        }

        .particle.cursor-particle {
          background: rgba(219, 165, 250, 0.3);
          filter: blur(2px);
        }

        .particle:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
        .particle:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
        .particle:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
        .particle:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
        .particle:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
        .particle:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
        .particle:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
        .particle:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
        .particle:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
        .particle:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }

        /* Light mode adjustments */
        .light .particle {
          background: rgba(159, 5, 247, 0.08);
        }
      `}</style>

      <ParticleEffect theme={theme} />
      
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Hero theme={theme} />
        <About theme={theme} />
        <Projects theme={theme} />
        <Skills theme={theme} />
        <Contact theme={theme} />
        <Footer theme={theme} />
      </div>
    </main>
  );
}