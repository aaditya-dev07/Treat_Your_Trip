import React, { useState, useEffect } from 'react';
import {
    Phone, Mail, MapPin, Download, Github, Linkedin,
    ExternalLink, GraduationCap, Briefcase, Code2,
    Gamepad2, BookOpen, Music, Pen, ChevronUp,
    User, Wrench, FolderOpen, Heart, Sparkles
} from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setShowScrollTop(window.scrollY > 400);
            const sections = ['hero', 'about', 'skills', 'projects', 'education', 'experience', 'interests', 'contact'];
            for (const s of [...sections].reverse()) {
                const el = document.getElementById(s);
                if (el && window.scrollY >= el.offsetTop - 250) {
                    setActiveSection(s);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const navItems = [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'education', label: 'Education' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <div className="resume-page">
            {/* ─── STICKY NAV ─── */}
            <nav className={`resume-nav ${scrollY > 60 ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <button className="nav-brand" onClick={() => scrollTo('hero')}>AT</button>
                    <ul className="nav-list">
                        {navItems.map(n => (
                            <li key={n.id}>
                                <button
                                    className={`nav-item ${activeSection === n.id ? 'active' : ''}`}
                                    onClick={() => scrollTo(n.id)}
                                >
                                    {n.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* ─── 1. HERO ─── */}
            <header id="hero" className="hero">
                <div className="hero-bg-accent" />
                <div className="hero-inner">
                    <img src="/profile-photo.png" alt="Aaditya Timilsina" className="hero-avatar-img" />
                    <h1 className="hero-name">Aaditya Timilsina</h1>
                    <p className="hero-title">Game Developer In Progress &nbsp;|&nbsp; CSE Student</p>
                    <p className="hero-tagline">"I build immersive stories and turn ideas into interactive worlds."</p>

                    <div className="hero-meta">
                        <span className="meta-chip"><MapPin size={14} /> Dhangadhi, Nepal / VIT Vellore, India</span>
                        <a href="tel:7275755735" className="meta-chip"><Phone size={14} /> 7275755735</a>
                        <a href="mailto:aadityatimilsina2024ind@gmail.com" className="meta-chip"><Mail size={14} /> aadityatimilsina2024ind@gmail.com</a>
                    </div>
                </div>
            </header>

            {/* ─── 2. ABOUT ─── */}
            <section id="about" className="section">
                <div className="section-inner">
                    <SectionHeading icon={<User size={18} />} title="About Me" />
                    <p className="about-text">
                        A passionate Computer Science student at VIT Vellore with a strong interest in game development
                        and software engineering. I have been deeply interested in technology since childhood and enjoy
                        building creative and meaningful digital experiences. Currently learning C++ and Unreal Engine
                        alongside academic studies. I believe games are not only entertaining but also powerful tools
                        for storytelling and education.
                    </p>
                </div>
            </section>

            {/* ─── 3. SKILLS ─── */}
            <section id="skills" className="section section-alt">
                <div className="section-inner">
                    <SectionHeading icon={<Wrench size={18} />} title="Skills" />
                    <div className="skills-categories">
                        <SkillCategory
                            label="Programming"
                            items={['C++', 'C', 'Basic Java', 'HTML', 'CSS', 'JavaScript']}
                        />
                        <SkillCategory
                            label="Tools & Technologies"
                            items={['Unreal Engine (learning)', 'Web Development']}
                        />
                        <SkillCategory
                            label="Core Strengths"
                            items={['Problem Solving', 'Creativity', 'Storytelling', 'Logical Thinking']}
                        />
                    </div>
                </div>
            </section>

            {/* ─── 4. PROJECTS ─── */}
            <section id="projects" className="section">
                <div className="section-inner">
                    <SectionHeading icon={<FolderOpen size={18} />} title="Projects" />
                    <div className="projects-grid">
                        <ProjectCard
                            title="Web Programming Project"
                            subtitle="Treat Your Trips"
                            description="Developed a functional website as part of academic coursework demonstrating understanding of front-end development concepts."
                            techs={['HTML', 'CSS', 'JavaScript']}
                            liveLink="/home"
                        />
                        <ProjectCard
                            title="Portfolio Website"
                            description="Personal resume-style portfolio website showcasing skills, projects, and career goals."
                            techs={['React', 'CSS', 'Vite']}
                        />
                    </div>
                </div>
            </section>

            {/* ─── 5. EDUCATION ─── */}
            <section id="education" className="section section-alt">
                <div className="section-inner">
                    <SectionHeading icon={<GraduationCap size={18} />} title="Education" />
                    <div className="timeline">
                        <TimelineItem
                            degree="B.Tech in Computer Science Engineering (Core)"
                            institution="VIT Vellore, India"
                            status="Currently Pursuing"
                        />
                        <TimelineItem
                            degree="Higher Secondary (+2)"
                            institution="Galaxy Secondary School, Nepal"
                        />
                        <TimelineItem
                            degree="Secondary Education (10th)"
                            institution="Aishwarya Vidya Niketan, Nepal"
                            isLast
                        />
                    </div>
                </div>
            </section>

            {/* ─── 6. EXPERIENCE ─── */}
            <section id="experience" className="section">
                <div className="section-inner">
                    <SectionHeading icon={<Briefcase size={18} />} title="Experience" />
                    <div className="experience-card">
                        <Sparkles size={20} className="exp-icon" />
                        <p>Currently focusing on academic learning and personal projects in game development and programming.</p>
                    </div>
                </div>
            </section>

            {/* ─── 7. INTERESTS ─── */}
            <section id="interests" className="section section-alt">
                <div className="section-inner">
                    <SectionHeading icon={<Heart size={18} />} title="Interests" />
                    <div className="interests-grid">
                        <InterestChip icon={<Gamepad2 size={20} />} label="Game Development" />
                        <InterestChip icon={<Pen size={20} />} label="Story Writing" />
                        <InterestChip icon={<Gamepad2 size={20} />} label="Playing Video Games" />
                        <InterestChip icon={<Music size={20} />} label="Listening to Music" />
                    </div>
                </div>
            </section>

            {/* ─── 8. FOOTER / CONTACT ─── */}
            <footer id="contact" className="footer-section">
                <div className="section-inner">
                    <SectionHeading icon={<Mail size={18} />} title="Get In Touch" light />
                    <div className="footer-grid">
                        <div className="footer-contact-col">
                            <a href="tel:7275755735" className="footer-link"><Phone size={16} /> 7275755735</a>
                            <a href="mailto:aadityatimilsina2024ind@gmail.com" className="footer-link"><Mail size={16} /> aadityatimilsina2024ind@gmail.com</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link"><Github size={16} /> GitHub</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link"><Linkedin size={16} /> LinkedIn</a>
                        </div>
                        <div className="footer-action-col">
                            <button className="download-btn"><Download size={16} /> Download Resume</button>
                        </div>
                    </div>
                    <div className="footer-copy">
                        <p>© 2026 Aaditya Timilsina — Built with React</p>
                    </div>
                </div>
            </footer>

            {/* Scroll to top */}
            {showScrollTop && (
                <button className="scroll-top-btn" onClick={() => scrollTo('hero')}>
                    <ChevronUp size={20} />
                </button>
            )}
        </div>
    );
};

/* ─── Sub-components ─── */
const SectionHeading = ({ icon, title, light }) => (
    <div className={`section-heading ${light ? 'light' : ''}`}>
        <span className="heading-icon">{icon}</span>
        <h2>{title}</h2>
        <div className="heading-line" />
    </div>
);

const SkillCategory = ({ label, items }) => (
    <div className="skill-category">
        <h4 className="skill-cat-label">{label}</h4>
        <div className="skill-tags">
            {items.map(item => <span key={item} className="skill-tag">{item}</span>)}
        </div>
    </div>
);

const ProjectCard = ({ title, subtitle, description, techs, liveLink }) => (
    <div className="project-card">
        <div className="project-card-top">
            <FolderOpen size={28} className="project-folder-icon" />
            {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-ext-link">
                    <ExternalLink size={18} />
                </a>
            )}
        </div>
        <h3 className="project-card-title">{title}</h3>
        {subtitle && (
            <a href={liveLink || '#'} target="_blank" rel="noopener noreferrer" className="project-card-subtitle">
                {subtitle}
            </a>
        )}
        <p className="project-card-desc">{description}</p>
        <div className="project-card-techs">
            {techs.map(t => <span key={t}>{t}</span>)}
        </div>
        {liveLink && (
            <a href={liveLink} className="view-project-btn">View Project <ExternalLink size={14} /></a>
        )}
    </div>
);

const TimelineItem = ({ degree, institution, status, isLast }) => (
    <div className={`timeline-item ${isLast ? 'last' : ''}`}>
        <div className="timeline-dot" />
        <div className="timeline-content">
            <h4>{degree}</h4>
            <p className="timeline-institution">{institution}</p>
            {status && <span className="timeline-status">{status}</span>}
        </div>
    </div>
);

const InterestChip = ({ icon, label }) => (
    <div className="interest-chip">
        {icon}
        <span>{label}</span>
    </div>
);

export default Portfolio;
