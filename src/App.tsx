import React, { useState } from 'react';
import { 
  Shield, 
  Cpu, 
  Layers, 
  Globe, 
  ChevronRight, 
  Command, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  FileText, 
  Building2, 
  Lock, 
  Scale, 
  Database, 
  Network, 
  ExternalLink, 
  Calendar, 
  Users, 
  Check, 
  Award,
  Zap,
  TrendingUp,
  Inbox,
  AlertCircle
} from 'lucide-react';

// Exact image assets generated in the workspace
const HERO_IMAGE_URL = "/src/assets/images/korix_hero_banner_1781099714297.png";
const AI_CONSULTING_IMAGE_URL = "/src/assets/images/ai_consulting_section_1781099730129.png";
const WEB_DEV_IMAGE_URL = "/src/assets/images/web_dev_section_1781099744584.png";

// Process steps for "Define. Design. Deliver."
const PROCESS_STEPS = [
  {
    phase: "01",
    title: "Define",
    slogan: "Uncover requirements, compliance constraints, and strict operational goals.",
    details: "Our multidisciplinary team maps out the initial landscape, identifies federal compliance protocols (e.g., NIST AI-RMF, FedRAMP), and defines performance scope and data governance structures.",
    icon: Command,
    deliverables: ["Comprehensive Compliance Roadmap", "System Integration Architecture", "Detailed Budget & Phase Estimation"]
  },
  {
    phase: "02",
    title: "Design",
    slogan: "Architect ultra-secure, highly resilient, and modern system models.",
    details: "We translate user and compliance needs into physical database schemas, beautiful designs, private model deployment diagrams, and enterprise-grade software specifications.",
    icon: Layers,
    deliverables: ["Interactive Prototypes & Wireframes", "Database & System Blueprints", "Threat Matrix & Risk Assessment Report"]
  },
  {
    phase: "03",
    title: "Deliver",
    slogan: "Deploy robust, hardened production environments on secure clouds.",
    details: "Our web specialists build, test, and release clean code, setting up CI/CD pipelines, and integrating real-time telemetry systems under maximum security configurations.",
    icon: Globe,
    deliverables: ["Production-Ready Scale Platforms", "Lighthouse & Security Audit Compliance", "Post-Deployment Support & System Runbooks"]
  }
];

// Mock compliance guidelines database for the Interactive Assessor
const COMPLIANCE_SECTORS = {
  federal: {
    label: "Federal & State Agencies",
    recommendations: [
      { id: "fed-1", title: "NIST SP 800-53 Rev. 5 Compliance", desc: "Security controls applicable for federal information systems.", critical: true },
      { id: "fed-2", title: "FedRAMP Security Authorization", desc: "Crucial for cloud services and scalable web hosting deployments.", critical: true },
      { id: "fed-3", title: "NIST Artificial Intelligence Risk Management (AI RMF)", desc: "Essential for deployments using deep learning or LLMs.", critical: true },
      { id: "fed-4", title: "Presidential Executive Order 14110 Alignment", desc: "Safety, security, and trustworthy implementation of AI technologies.", critical: false }
    ]
  },
  enterprise: {
    label: "High-Scale Enterprise Commercial",
    recommendations: [
      { id: "ent-1", title: "SOC 2 Type II Attestation", desc: "Verifies organizational controls over security, availability, and confidentiality.", critical: true },
      { id: "ent-2", title: "ISO/IEC 42001 (AI Management System)", desc: "International standard for trustworthy governance of raw AI systems.", critical: false },
      { id: "ent-3", title: "NIST Cybersecurity Framework v2.0", desc: "Strategic guardrails for defense, threat detection, and swift response.", critical: true },
      { id: "ent-4", title: "GDPR / CCPA Data Isolation Protocols", desc: "Ensures user private token handling complies with state policies.", critical: true }
    ]
  },
  defense: {
    label: "Defense & Aerospace",
    recommendations: [
      { id: "def-1", title: "CMMC Level 2 Validation", desc: "Required safeguard structure for defense industrial base ecosystem contractors.", critical: true },
      { id: "def-2", title: "ITAR & Export Control Restrictive Pipelines", desc: "Strict logic filtering to operate on US soil without foreign transit.", critical: true },
      { id: "def-3", title: "NIST SP 800-171 Compliance", desc: "Protection of Controlled Unclassified Information (CUI) in non-federal systems.", critical: true },
      { id: "def-4", title: "Air-Gapped Private Model Deployment", desc: "Hosting intelligent weights strictly with no outbound public network interfaces.", critical: true }
    ]
  },
  healthcare: {
    label: "Healthcare & Fintech",
    recommendations: [
      { id: "med-1", title: "HIPAA Security Rule Verification", desc: "Administrative, physical, and technical safeguards for Protected Health Information (PHI).", critical: true },
      { id: "med-2", title: "PCI DSS v4.0 Strict Compliance", desc: "Highly secure transaction logs, tokens, and vaulted data components.", critical: true },
      { id: "med-3", title: "NIST SP 800-66 Rev. 1 Alignment", desc: "Guidance for implementing the HIPAA Security Rule through NIST standards.", critical: false },
      { id: "med-4", title: "HITRUST Common Security Framework", desc: "Extensive harmonized structure combining HIPAA, NIST, ISO, and state laws.", critical: true }
    ]
  }
};

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProcessTab, setActiveProcessTab] = useState(0);

  // Strategy Compliance Assessor States
  const [selectedSector, setSelectedSector] = useState<"federal" | "enterprise" | "defense" | "healthcare">("federal");
  const [customAIUsage, setCustomAIUsage] = useState(true);
  const [includeWebHosting, setIncludeWebHosting] = useState(true);
  const [systemThreatLevel, setSystemThreatLevel] = useState<"standard" | "critical">("standard");

  // Contact / Secure Intake Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orgName: "",
    phone: "",
    sector: "commercial-enterprise",
    projectScope: "",
    securityLevel: "standard",
    authorizedToDisclose: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Pre-determined mock briefing timeslots
  const MOCK_DATETIMES = [
    "June 15, 2026 - 10:00 AM EST",
    "June 15, 2026 - 2:00 PM EST",
    "June 16, 2026 - 11:00 AM EST",
    "June 16, 2026 - 4:00 PM EST",
    "June 17, 2026 - 9:00 AM EST"
  ];

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.orgName) {
      alert("Please fill in all primary information fields.");
      return;
    }
    setFormSubmitted(true);
  };

  const handleBookingConfirm = () => {
    if (!selectedTimeSlot) {
      alert("Please select a convenient timeslot to confirm.");
      return;
    }
    setBookingConfirmed(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      orgName: "",
      phone: "",
      sector: "commercial-enterprise",
      projectScope: "",
      securityLevel: "standard",
      authorizedToDisclose: false
    });
    setFormSubmitted(false);
    setSelectedTimeSlot("");
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-red selection:text-white">
      {/* SECTION 1: STICKY NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/95 border-b border-slate-200 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Name */}
            <a href="#" className="flex items-center space-x-3 group" id="nav-brand-logo">
              {/* Custom High-Contract Military & Aerospace Inspired Tech Circle Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-blue overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-brand-blue-dark opacity-40"></div>
                {/* SVG representing Rocket Core, Patriotic Orbit & Star */}
                <svg className="w-7 h-7 text-white relative z-10 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.38m6 3.41a14.96 14.96 0 01-6.15 6.15m-1.57-1.57h.008v.008H7.91v-.008zm-2.4 2.4h.008v.008H5.51v-.008zm-2.4 2.4h.008v.008H3.11v-.008zM12 12a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                {/* Decorative glowing red arc inside logo icon */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-red rounded-full border-2 border-white"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-brand-blue">
                    KORIX
                  </span>
                  <span className="font-display font-bold text-lg text-brand-red tracking-wider">
                    LLC
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase -mt-1.5 font-semibold">
                  Focus. Execute. Win.
                </span>
              </div>
            </a>

            {/* Desktop Navigation Link Targets */}
            <nav className="hidden md:flex space-x-8 items-center font-medium" id="nav-menu-desktop">
              <a href="#services" className="text-slate-600 hover:text-brand-blue border-b-2 border-transparent hover:border-brand-blue py-1 transition-all">
                Services
              </a>
              <a href="#slogan-process" className="text-slate-600 hover:text-brand-blue border-b-2 border-transparent hover:border-brand-blue py-1 transition-all">
                Our Methodology
              </a>
              <a href="#compliance-assessor" className="text-slate-600 hover:text-brand-blue border-b-2 border-transparent hover:border-brand-blue py-1 transition-all">
                Compliance Engine
              </a>
              <a href="#procurement-details" className="text-slate-600 hover:text-brand-blue border-b-2 border-transparent hover:border-brand-blue py-1 transition-all">
                Contracting Codes
              </a>
              <a href="#about-agency" className="text-slate-600 hover:text-brand-blue border-b-2 border-transparent hover:border-brand-blue py-1 transition-all">
                Corporate Core
              </a>
              <a 
                href="#secure-briefing" 
                className="bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md hover:glow-btn-red text-center flex items-center space-x-2"
              >
                <span>Request Briefing</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </nav>

            {/* Mobile Menu Action Trigger Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-brand-blue focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-50 border-b border-slate-200 px-4 py-6 space-y-3 animate-fadeIn">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-slate-700 hover:bg-white hover:text-brand-blue font-medium"
            >
              Services
            </a>
            <a 
              href="#slogan-process" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-slate-700 hover:bg-white hover:text-brand-blue font-medium"
            >
              Our Methodology
            </a>
            <a 
              href="#compliance-assessor" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-slate-700 hover:bg-white hover:text-brand-blue font-medium"
            >
              Compliance Engine
            </a>
            <a 
              href="#procurement-details" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-slate-700 hover:bg-white hover:text-brand-blue font-medium"
            >
              Contracting Codes
            </a>
            <a 
              href="#about-agency" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-slate-700 hover:bg-white hover:text-brand-blue font-medium"
            >
              Corporate Core
            </a>
            <a 
              href="#secure-briefing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-brand-red text-white py-3 px-4 rounded-lg font-bold shadow-sm"
            >
              Request Briefing Securely
            </a>
          </div>
        )}
      </header>

      {/* SECTION 2: HERO SECTION WITH THE CORE SERVICES & MODERN TYPOGRAPHY */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-slate-200" id="hero-core-section">
        {/* Subtle decorative dot grids with the brand-blue color */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#002147_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 pointer-events-none skew-x-12"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Editorial Government contracting capability indicator tag */}
              <div className="inline-flex items-center space-x-2 bg-brand-blue text-white px-3 py-1 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                <Shield className="w-4 h-4 text-brand-red animate-pulse" />
                <span>GOVERNMENT CONTRACTOR · NAICS 541511</span>
              </div>

              <h1 className="font-display font-black italic text-5xl sm:text-6xl lg:text-[76px] leading-[0.95] text-brand-blue tracking-tighter">
                Define. Design.<br/>
                <span className="text-brand-red">Deliver.</span>
              </h1>

              <p className="text-lg text-slate-605 max-w-2xl leading-relaxed">
                Driving mission-critical transformation through high-fidelity technology solutions and institutional strategy. Korix LLC bridges high-tech engineering precision and cyber-safety protocols for federal agencies and forward-thinking enterprises.
              </p>

              {/* Slogan highlight inside Hero Section with strong editorial style */}
              <div className="bg-slate-50 border-l-4 border-brand-red p-6 max-w-xl">
                <p className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase font-black">CORE PHILOSOPHY</p>
                <p className="text-2xl font-display font-black text-brand-blue mt-1.5 italic">
                  &ldquo;Focus. Execute. Win.&rdquo;
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Our rigorous architectural process guarantees absolute system resilience, complete regulatory alignment, and defense-grade operational integrity.</p>
              </div>

              {/* Hero Call To Actions: Sharp, uppercase, tracking-widest */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#services" 
                  className="bg-brand-blue hover:bg-brand-red text-white font-bold text-xs uppercase tracking-widest py-4 px-8 shadow-sm transition-colors text-center flex items-center justify-center space-x-2"
                >
                  <span>View Services Matrix</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="#secure-briefing" 
                  className="bg-transparent hover:bg-slate-50 text-brand-blue font-bold text-xs uppercase tracking-widest py-4 px-8 border-2 border-brand-blue transition-colors text-center"
                >
                  Request Technical Briefing
                </a>
              </div>

              {/* Trust signals */}
              <div className="pt-2 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-xl">
                <div>
                  <p className="text-2xl font-display font-bold text-brand-blue">100%</p>
                  <p className="text-xs font-medium text-slate-500">Secure Sovereign Code</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-brand-blue">NIST</p>
                  <p className="text-xs font-medium text-slate-500">Security Standard Base</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-brand-blue">Active</p>
                  <p className="text-xs font-medium text-slate-500">SAM.gov Workspace Registrant</p>
                </div>
              </div>
            </div>

            {/* Hero Right Column: High Visual Impact Graphic with exact colors applied */}
            <div className="lg:col-span-5 relative" id="hero-graphic-card">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-transparent opacity-10 rounded-2xl blur-xl"></div>
              
              {/* Outer frame matching corporate deep blue */}
              <div className="relative bg-white border-2 border-brand-blue/10 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                
                {/* Header elements imitating a tactical visual system */}
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                  <div className="flex space-x-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-brand-red"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-brand-blue"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-300"></span>
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
                    SYS-INTEL // ACTIVE // EST. 2026
                  </span>
                </div>

                {/* Generated High Quality Corporate Image Asset */}
                <div className="overflow-hidden rounded-lg border border-slate-100 aspect-video mb-6 relative group bg-slate-900">
                  <img 
                    src={HERO_IMAGE_URL} 
                    alt="Korix High Tech Control Center Network Grid" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs font-mono tracking-widest text-brand-red font-bold uppercase">DIGITAL STRATOSPHERE</p>
                    <p className="text-sm font-display font-bold leading-tight mt-0.5">Tactical Enterprise Grid Infrastructure</p>
                  </div>
                </div>

                {/* Technical specifications dashboard */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-150 text-xs text-slate-600">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <p className="font-mono text-slate-400 uppercase text-[9px] font-bold">CAGE Code (Simulation)</p>
                    <p className="font-mono font-bold text-slate-800 text-sm mt-0.5">9X4K2</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <p className="font-mono text-slate-400 uppercase text-[9px] font-bold">SAM Unique Entity ID</p>
                    <p className="font-mono font-bold text-slate-800 text-xs mt-0.5 mt-1">UEI-KORIX102600</p>
                  </div>
                </div>

                {/* Interactive Status Indicator bar */}
                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-slate-500 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-slate-800">Operational Integrity Secured</span>
                  </div>
                  <a href="#compliance-assessor" className="text-brand-blue hover:text-brand-red flex items-center space-x-1 decoration-dotted underline">
                    <span>Scan Stack Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: TWO DISTINCT SERVICE SECTIONS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Section title */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <h2 className="text-xs font-mono tracking-widest text-brand-red uppercase font-bold">
              Core Capabilities Broad Matrix
            </h2>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue">
              Engineered Defensibility. Intelligent Scale.
            </h3>
            <p className="text-slate-600 text-base">
              Korix LLC deploys senior architectural groups specialized to analyze vulnerability scopes, automate processing bottlenecks with AI models, and secure massive public web interactions.
            </p>
          </div>

          <div className="space-y-24">
            
            {/* SERVICE BLOCK A: AI Consulting & Integration */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="service-ai-consulting">
              {/* Graphic side (Order-last on mobile, first on desktop) */}
              <div className="lg:col-span-5 order-last lg:order-first relative">
                <div className="absolute -inset-1.5 bg-brand-red/10 rounded-2xl blur-lg"></div>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
                  
                  {/* Neural Net Compliance Asset */}
                  <div className="aspect-square bg-slate-50 rounded-xl mb-6 overflow-hidden border border-slate-100 flex items-center justify-center relative">
                    <img 
                      src={AI_CONSULTING_IMAGE_URL} 
                      alt="Neural Network and Federal Regulation Interface" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-brand-blue text-white px-3 py-1 rounded-md font-mono text-[9px] font-bold tracking-widest uppercase">
                      INTELLIGENCE DEPLOYED
                    </div>
                  </div>

                  {/* Bullet checklist highlights */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2.5">
                      <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">Private Vector Database Enclaves</p>
                        <p className="text-xs text-slate-500">Prevent intellectual data exhaust and token exfiltration.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">NIST SP 800-226 Alignment audits</p>
                        <p className="text-xs text-slate-500">Standardized verification for federal model integration.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Copy / Strategy detail side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-brand-red/5 text-brand-red px-3 py-1 rounded-md text-xs font-mono font-bold uppercase">
                  <Cpu className="w-4 h-4 text-brand-red" />
                  <span>DECENTRALIZED ARTIFICIAL INTELLIGENCE STRATEGY</span>
                </div>

                <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-blue">
                  AI Consulting & Integration
                </h4>

                <p className="text-slate-600 leading-relaxed">
                  Navigating the dual challenges of operational optimization and compliance safety requires seasoned technical vision. Korix LLC acts as your lead strategy partner, auditing your legacy telemetry architectures and designing custom agentic workflows that respect maximum privacy boundary principles.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  We specialize in taking the absolute highest security frameworks (such as the White House Executive Orders on AI and HIPAA data silos) and transforming them into robust, functional code pipelines.
                </p>

                {/* Enterprise/Federal Solutions List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-blue/30 transition-all">
                    <div className="flex items-center space-x-2 text-brand-blue mb-2">
                      <Scale className="w-5 h-5" />
                      <h5 className="font-bold font-display text-sm">Compliance & Governance</h5>
                    </div>
                    <p className="text-xs text-slate-500">Establishing clean logging matrices, bias detection, and compliance pipelines aligning with federal safety parameters.</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-blue/30 transition-all">
                    <div className="flex items-center space-x-2 text-brand-blue mb-2">
                      <Lock className="w-5 h-5" />
                      <h5 className="font-bold font-display text-sm">On-Premises / Private Weights</h5>
                    </div>
                    <p className="text-xs text-slate-500">Configuring isolated model execution loops, keeping private proprietary knowledge strictly inside your local network bounds.</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-blue/30 transition-all">
                    <div className="flex items-center space-x-2 text-brand-blue mb-2">
                      <Network className="w-5 h-5" />
                      <h5 className="font-bold font-display text-sm">Intelligent Data Pipelines</h5>
                    </div>
                    <p className="text-xs text-slate-500">Extracting unformatted system logs, PDFs, or satellite tracking data into searchable indexes with RAG vector enclaves.</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-blue/30 transition-all">
                    <div className="flex items-center space-x-2 text-brand-blue mb-2">
                      <Zap className="w-5 h-5" />
                      <h5 className="font-bold font-display text-sm">Agentic Process Automation</h5>
                    </div>
                    <p className="text-xs text-slate-500">Removing routine coordination bottlenecks by letting sandboxed agent units resolve tasks securely.</p>
                  </div>
                </div>

                <div className="pt-4 flex">
                  <a 
                    href="#compliance-assessor" 
                    className="inline-flex items-center space-x-2 text-brand-red font-bold hover:text-brand-red-dark hover:underline transition-all text-sm group"
                  >
                    <span>Use compliance model selector</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* SERVICE BLOCK B: Web Development Agency */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-slate-200" id="service-web-development">
              
              {/* Copy / Strategy detail side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-brand-blue/5 text-brand-blue px-3 py-1 rounded-md text-xs font-mono font-bold uppercase">
                  <Globe className="w-4 h-4 text-brand-blue" />
                  <span>HIGH-AVAILABILITY CLOUD STACK INFRASTRUCTURE</span>
                </div>

                <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-blue">
                  Scalable Web Platforms & Enterprise Databases
                </h4>

                <p className="text-slate-600 leading-relaxed">
                  Web development for government-contracting compliance and enterprise scale is not about compiling simple sites. It is about architectural correctness, optimal data normalization, load balancing, and extreme availability constraints.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  At Korix LLC, we build custom web installations backed by relational architectures, real-time message brokers, and elegant client views. Whether deploying headless portals with React and Next.js, or complex administrative dashboards, security is baked-in.
                </p>

                {/* Web Capabilities List */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 text-white bg-brand-blue rounded-md shrink-0 mt-1">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm font-display">SQL Normalized Relational Models</p>
                      <p className="text-xs text-slate-500">Perfect table design, precise indexes, custom telemetry hooks, and high-performance querying that never bogs down on millions of records.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1 text-white bg-brand-blue rounded-md shrink-0 mt-1">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm font-display">Zero-Trust Authentication Integrations</p>
                      <p className="text-xs text-slate-500">Enforcing multi-factor, single sign-on (SSO), secure session cookie storage, and advanced OAuth verification loops protecting external administrative entry points.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1 text-white bg-brand-blue rounded-md shrink-0 mt-1">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm font-display">High-Throughput RESTful & GraphQL APIs</p>
                      <p className="text-xs text-slate-500">Strictly structured JSON/protobuf interfaces complete with rate-limiting, comprehensive automatic CORS configuration, and real-time validation layers.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#secure-briefing" 
                    className="inline-flex items-center space-x-2 text-brand-blue font-bold hover:text-brand-blue-dark hover:underline transition-all text-sm group"
                  >
                    <span>Request technical stack blueprint consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Graphic side (Order-last or right side) */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-1.5 bg-brand-blue/10 rounded-2xl blur-lg"></div>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform hover:translate-y-1">
                  
                  {/* Web Architecture Asset */}
                  <div className="aspect-square bg-slate-50 rounded-xl mb-6 overflow-hidden border border-slate-100 flex items-center justify-center relative">
                    <img 
                      src={WEB_DEV_IMAGE_URL} 
                      alt="Scalable Enterprise Web Architecture Display Layout" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1 rounded-md font-mono text-[9px] font-bold tracking-widest uppercase">
                      SECURE DESIGN MODEL
                    </div>
                  </div>

                  {/* Bullet checklist highlights */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2.5">
                      <Check className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">Extreme Server Integrity</p>
                        <p className="text-xs text-slate-500">Continuous vulnerability scans and zero-dependency base logic.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">Dynamic Performance Caching</p>
                        <p className="text-xs text-slate-500">Lightning-fast content propagation with state-of-the-art edge servers.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: THE SLOGAN "DEFINE. DESIGN. DELIVER." INTERACTIVE STEPPER MODULE */}
      <section className="py-20 bg-white border-b border-slate-200" id="slogan-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-xs font-mono tracking-widest text-brand-red uppercase font-bold">
              The Engine of Delivery
            </h3>
            <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue">
              Define. Design. Deliver.
            </h4>
            <p className="text-slate-600 text-sm sm:text-base">
              A comprehensive system lifecycle designed to eliminate failure points, reduce overhead, and deploy mission-critical architectures with total certainty. Explore our interactive development sprints.
            </p>
          </div>

          {/* Stepper Tabs Navigation (Interactive) */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-slate-150 rounded-xl space-y-2 md:space-y-0 md:space-x-2 border border-slate-200">
              {PROCESS_STEPS.map((step, idx) => {
                const IconComp = step.icon;
                const isSelected = activeProcessTab === idx;
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveProcessTab(idx)}
                    className={`flex items-center space-x-2.5 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isSelected 
                        ? 'bg-brand-blue text-white shadow-md' 
                        : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isSelected ? 'text-brand-red' : 'text-slate-400'}`} />
                    <span className="font-display tracking-wide">{step.title}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-brand-red/20 text-brand-red font-bold' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step.phase}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Stepper Content Box with high-fidelity corporate layout */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            {/* Background elements signifying active process state */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/3 rounded-full blur-2xl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Stepper Details Area */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center space-x-2 text-brand-red font-mono text-xs font-bold tracking-widest uppercase">
                  <span>PHASE {PROCESS_STEPS[activeProcessTab].phase} ACTIVATED</span>
                </div>

                <h5 className="font-display font-extrabold text-3xl text-brand-blue">
                  {PROCESS_STEPS[activeProcessTab].title} Phase
                </h5>

                <p className="text-lg font-semibold text-brand-blue/90 leading-tight">
                  &ldquo;{PROCESS_STEPS[activeProcessTab].slogan}&rdquo;
                </p>

                <p className="text-slate-600 leading-relaxed text-sm">
                  {PROCESS_STEPS[activeProcessTab].details}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-mono tracking-wider text-slate-400 uppercase font-bold mb-3">Key Output Deliverables</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PROCESS_STEPS[activeProcessTab].deliverables.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-start space-x-2 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-slate-700 leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphical Process Tracker side */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                
                {/* Visual flowchart track */}
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold mb-4">Milestone Progress Pipeline</p>
                
                <div className="space-y-4">
                  {PROCESS_STEPS.map((milestone, mIdx) => {
                    const isPassedOrActive = mIdx <= activeProcessTab;
                    const isActive = mIdx === activeProcessTab;
                    return (
                      <div key={milestone.title} className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {/* Dot step tracker */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
                            isActive 
                              ? 'bg-brand-red text-white border-brand-red' 
                              : isPassedOrActive 
                                ? 'bg-brand-blue text-white border-brand-blue' 
                                : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}>
                            {milestone.phase}
                          </div>
                          <div>
                            <p className={`text-sm font-bold font-display ${isPassedOrActive ? 'text-brand-blue font-extrabold' : 'text-slate-400'}`}>
                              {milestone.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {isActive ? 'Active Review' : isPassedOrActive ? 'Pre-Cleared' : 'Planned Launch'}
                            </p>
                          </div>
                        </div>

                        {/* Status tag */}
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          isActive 
                            ? 'bg-brand-red/10 text-brand-red animate-pulse' 
                            : isPassedOrActive 
                              ? 'bg-emerald-50 text-emerald-600' 
                              : 'bg-slate-100 text-slate-400'
                        }`}>
                          {isActive ? 'In Sprint' : isPassedOrActive ? 'Complete' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/50 p-3 rounded-lg flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Current Flow Velocity:</span>
                  <span className="font-bold text-slate-800">4.5 Weeks / Sprint</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* WIDGET: INTERACTIVE STRATEGY & COMPLIANCE ASSESSMENT ENGINE */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="compliance-assessor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand-red/15 text-brand-red px-3 py-1 rounded-full text-xs font-mono font-bold uppercase">
              <Shield className="w-3.5 h-3.5 font-bold" />
              <span>Korix Security Compliance Engine v1.0</span>
            </div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue">
              Audit Your Digital Architecture Requirements
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Use this real-time tool to calculate which federal, commercial, or military compliance standards apply to your tech stack based on sector-level guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <h4 className="font-display font-bold text-lg text-brand-blue border-b border-slate-100 pb-3">
                1. System Parameters
              </h4>

              {/* Selector Sector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Operating Sector / Domain
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(COMPLIANCE_SECTORS).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSector(key as "federal" | "enterprise" | "defense" | "healthcare")}
                      className={`text-xs text-left p-3 rounded-lg font-semibold border transition-all ${
                        selectedSector === key 
                          ? 'bg-brand-blue text-white border-brand-blue' 
                          : 'bg-slate-50 text-slate-700 border-slate-250 hover:bg-slate-100'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Custom AI Models Usage */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Advanced Technology Features
                </label>

                <div className="space-y-2.5">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all select-none">
                    <input 
                      type="checkbox" 
                      checked={customAIUsage} 
                      onChange={(e) => setCustomAIUsage(e.target.checked)}
                      className="w-4 h-4 text-brand-red focus:ring-brand-red rounded border-slate-300"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Employs Artificial Intelligence (AI)</p>
                      <p className="text-[10px] text-slate-500">LLM, custom reasoning, weights, private fine-tuning.</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all select-none">
                    <input 
                      type="checkbox" 
                      checked={includeWebHosting} 
                      onChange={(e) => setIncludeWebHosting(e.target.checked)}
                      className="w-4 h-4 text-brand-red focus:ring-brand-red rounded border-slate-300"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Has Public Facing Web Applications</p>
                      <p className="text-[10px] text-slate-500">Includes login systems, database integrations, state registries.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Critical Level selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Threat Matrix Tolerance Target
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setSystemThreatLevel("standard")}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      systemThreatLevel === "standard" 
                        ? 'bg-slate-800 text-white border-slate-800' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Standard Commercial
                  </button>
                  <button
                    type="button"
                    onClick={() => setSystemThreatLevel("critical")}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      systemThreatLevel === "critical"
                        ? 'bg-brand-red text-white border-brand-red font-bold' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    High-Resilience / Gov
                  </button>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 font-mono text-center">
                *Outputs calculated live using NIST Cybersecurity Framework databases.
              </div>
            </div>

            {/* Right Display Results Column */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-red"></div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Evaluation Result</p>
                  <h4 className="font-display font-extrabold text-xl text-brand-blue mt-0.5">
                    Strategic Compliance Report
                  </h4>
                </div>
                {/* Sector short badge */}
                <span className="bg-brand-blue/5 text-brand-blue border border-brand-blue/15 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase">
                  {COMPLIANCE_SECTORS[selectedSector].label}
                </span>
              </div>

              {/* Recommended requirements list */}
              <div className="space-y-4">
                {COMPLIANCE_SECTORS[selectedSector].recommendations.map((rec) => {
                  // Determine if the item is triggered
                  // Some items depend on custom AI or web options
                  const isAIspecific = rec.title.toLowerCase().includes("artificial intelligence") || rec.title.toLowerCase().includes("ai") || rec.title.toLowerCase().includes("model");
                  const isWebspecific = rec.title.toLowerCase().includes("cloud") || rec.title.toLowerCase().includes("web") || rec.title.toLowerCase().includes("transaction");

                  if (isAIspecific && !customAIUsage) return null;
                  if (isWebspecific && !includeWebHosting) return null;

                  return (
                    <div key={rec.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-white transition-all space-y-2">
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0" />
                          <h5 className="font-display font-bold text-sm text-brand-blue">
                            {rec.title}
                          </h5>
                        </div>
                        {rec.critical || systemThreatLevel === "critical" ? (
                          <span className="bg-brand-red/10 text-brand-red border border-brand-red/20 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                            MANDATORY
                          </span>
                        ) : (
                          <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded text-[9px] font-mono uppercase">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {rec.desc}
                      </p>
                    </div>
                  );
                })}

                {/* No filters remaining fallback */}
                {!customAIUsage && !includeWebHosting && (
                  <div className="flex items-center space-x-3 p-6 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Minimal Stack Parameters Selected</p>
                      <p className="text-xs mt-0.5">Please re-toggle AI Systems or Web Application variables above to evaluate detailed strategy checkpoints.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom strategic call action */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-slate-800">Need immediate C-Suite or Federal alignment?</p>
                  <p className="text-xs text-slate-500">Claim a written architectural proposal within 24 working hours.</p>
                </div>
                <a 
                  href="#secure-briefing" 
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow hover:glow-btn-blue shrink-0"
                >
                  Download Formal PDF Matrix
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: GOV CAPABILITIES & PROCUREMENT CODES */}
      <section className="py-20 bg-white border-b border-slate-200" id="procurement-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-blue/5 text-brand-blue px-3 py-1 rounded-md text-xs font-mono font-bold uppercase">
                <Award className="w-4 h-4 text-brand-blue" />
                <span>GOVERNMENT CONTRACT VEHICLE PROVISIONS</span>
              </div>

              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue leading-tight">
                Government Capabilities & Procurement Cheat Sheet
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Korix LLC is structured to operate with state and federal Contracting Officers. We offer agile development cycles while satisfying the defense logistics reporting requirements of military acquisitions formats.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex space-x-3">
                  <div className="p-1.5 bg-brand-red/10 text-brand-red rounded-lg h-9 w-9 shrink-0 flex items-center justify-center">
                    <Building2 className="w-5 h-5 font-bold" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm font-display">System for Award Management (SAM.gov)</p>
                    <p className="text-xs text-slate-500">Fully registered entity. Actively mapped for direct awards, micro-purchasing limits, or subcontract agreements.</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="p-1.5 bg-brand-red/10 text-brand-red rounded-lg h-9 w-9 shrink-0 flex items-center justify-center">
                    <FileText className="w-5 h-5 font-bold" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm font-display">Strict NIST Compliance Verification</p>
                    <p className="text-xs text-slate-500">Operational structures designed specifically around the NIST SP 800-171 framework protecting Controlled Unclassified Information.</p>
                  </div>
                </div>
              </div>

              {/* Slogan highlight again */}
              <div className="pt-4 text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                Motto: <span className="text-brand-blue">Define.</span> <span className="text-brand-red">Design.</span> <span className="text-brand-blue">Deliver.</span>
              </div>
            </div>

            {/* Right Information Matrix Table Column */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h4 className="font-display font-bold text-lg text-brand-blue border-b border-slate-200 pb-3 mb-4">
                Core Acquisition Coordinates
              </h4>

              <div className="space-y-4">
                {/* Registrant details */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200 text-xs">
                  <div>
                    <span className="block font-mono text-slate-400 text-[10px] uppercase font-bold">DUNS Reference</span>
                    <span className="font-mono font-bold text-slate-800 text-[13px] mt-0.5 block">11-893-10260</span>
                  </div>
                  <div>
                    <span className="block font-mono text-slate-400 text-[10px] uppercase font-bold">SAM CAGE ID (Mock)</span>
                    <span className="font-mono font-bold text-slate-800 text-[13px] mt-0.5 block">9X4K2</span>
                  </div>
                </div>

                {/* Primary NAICS codes table */}
                <div>
                  <span className="block font-mono text-slate-400 text-[10px] uppercase font-bold mb-2">Primary Operating Industrial NAICS Codes</span>
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase font-bold">
                        <tr>
                          <th className="px-3 py-2 text-left">Code</th>
                          <th className="px-3 py-2 text-left">NAICS Sector Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="px-3 py-2.5 font-mono font-bold text-brand-blue">541511</td>
                          <td className="px-3 py-2.5">Custom Computer Programming Services (Primary)</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2.5 font-mono font-bold text-brand-blue">541512</td>
                          <td className="px-3 py-2.5">Computer Systems Design Services</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2.5 font-mono font-bold text-brand-blue">541519</td>
                          <td className="px-3 py-2.5">Other Computer Related Services</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2.5 font-mono font-bold text-brand-blue">541690</td>
                          <td className="px-3 py-2.5">Other Scientific & Technical Consulting Services</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Contract suitability metrics */}
                <div className="pt-2">
                  <span className="block font-mono text-slate-400 text-[10px] uppercase font-bold mb-2">Familiarized Platforms</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded text-[10px]">W9 Government Portal</span>
                    <span className="bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded text-[10px]">GSA schedule 70</span>
                    <span className="bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded text-[10px]">SBIR Phase 1 & 2 Eligible</span>
                    <span className="bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded text-[10px]">ITAR restrictiveness</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: CORPORATE ABOUT / VALUES BRIEFING */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="about-agency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Grid stats layout (Order first on mobile) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-2 hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-brand-red mx-auto" />
                <p className="font-display font-extrabold text-2xl text-brand-blue">NIST 800-53</p>
                <p className="text-xs text-slate-500 font-semibold font-mono uppercase">Hardening Baseline</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-2 hover:shadow-md transition-shadow">
                <Globe className="w-8 h-8 text-brand-blue mx-auto" />
                <p className="font-display font-extrabold text-2xl text-brand-blue">Sovereign</p>
                <p className="text-xs text-slate-500 font-semibold font-mono uppercase">US-Owned Agency</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-2 hover:shadow-md transition-shadow">
                <Users className="w-8 h-8 text-brand-blue mx-auto" />
                <p className="font-display font-extrabold text-2xl text-brand-blue">Senior-Only</p>
                <p className="text-xs text-slate-500 font-semibold font-mono uppercase">Technical Staff</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-2 hover:shadow-md transition-shadow">
                <Award className="w-8 h-8 text-brand-red mx-auto" />
                <p className="font-display font-extrabold text-2xl text-brand-blue">Est. 2026</p>
                <p className="text-xs text-slate-500 font-semibold font-mono uppercase">Built for Future Tech</p>
              </div>
            </div>

            {/* Corporate culture description copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono tracking-widest text-brand-red uppercase font-bold">
                Who We Stand For
              </span>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue">
                Focus. Execute. Win.
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Korix LLC was founded to solve a critical engineering gap: the general lack of rigorous compliance attention among modern high-output computer systems. Traditional web agencies deliver visual shells without security infrastructure, while classic defense legacy contractors struggle to match modern interactive styling speeds.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We bridge both domains. We combine rapid iteration and extreme security. Our core developers originate from complex financial networks and aerospace organizations, aligning your tactical workflows behind beautiful responsive designs.
              </p>

              {/* Slogan badge inline display */}
              <div className="border border-slate-200 bg-white p-4 rounded-xl flex items-center space-x-4">
                <div className="text-brand-red text-2xl font-mono shrink-0">★</div>
                <p className="text-slate-800 text-xs sm:text-sm">
                  Our engineering team guarantees zero commercial outsource transit. Every single line of TypeScript, CSS, and system config generated is fully validated on US soil.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: INTERACTIVE BRIEFING SCHEDULER & SECURE CONTACT INTAKE */}
      <section className="py-20 bg-white" id="secure-briefing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h3 className="text-xs font-mono tracking-widest text-brand-red uppercase font-bold">
              Secure Operations Portal
            </h3>
            <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue">
              Initiate Technical Consultation
            </h4>
            <p className="text-slate-600 text-sm sm:text-base">
              Submit your project constraints below and reserve an available briefing date with our engineering director. All files and scopes submitted are compartmentalized.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            {/* Dynamic form submission container */}
            {!formSubmitted ? (
              <form onSubmit={handleIntakeSubmit} className="space-y-6" id="corporate-intake-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Scope name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Full Legal Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  {/* Email address */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Corporate/Government Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="j.doe@agency.gov"
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  {/* Organization name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Company / Department *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      placeholder="Dept of Science or Lockheed Corp."
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  {/* Sector select input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Applicable Sector
                    </label>
                    <select 
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-slate-700"
                    >
                      <option value="commercial-enterprise">Commercial Enterprise</option>
                      <option value="federal-civilian">Federal Civilian Department</option>
                      <option value="mil-defense">Military / Aerospace Defense</option>
                      <option value="state-local">State / Local Government</option>
                      <option value="critical-infrastructure">Critical Infrastructure / Medical</option>
                    </select>
                  </div>
                </div>

                {/* Project Scope details text area */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Primary Technology Challenge or Scope Overview
                  </label>
                  <textarea 
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    rows={4}
                    placeholder="Describe compliance standards requested, database scale, current legacy tech stack, or strategic deadlines..."
                    className="w-full bg-white border border-slate-300 rounded-lg p-4 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  />
                </div>

                {/* Grid for check safety details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Requested Safeguard Clearance Target
                    </label>
                    <div className="flex space-x-2">
                      {["Standard (NDA)", "Strict (CUI Base)", "Full ITAR Enclave"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFormData({ ...formData, securityLevel: lvl })}
                          className={`flex-1 py-2 px-1 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                            formData.securityLevel === lvl 
                              ? 'bg-slate-800 text-white border-slate-800' 
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-start space-x-2 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        required
                        checked={formData.authorizedToDisclose}
                        onChange={(e) => setFormData({ ...formData, authorizedToDisclose: e.target.checked })}
                        className="w-4.5 h-4.5 mt-0.5 text-brand-red focus:ring-brand-red rounded border-slate-300"
                      />
                      <span className="text-[11px] text-slate-500 leading-tight">
                        I authorize Korix LLC to process these specifications under direct corporate privacy constraints. *
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit trigger button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-bold py-4 px-6 rounded-lg transition-all text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:glow-btn-red flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4 text-white" />
                    <span>Proceed to Interactive Briefing Schedule</span>
                  </button>
                </div>

              </form>
            ) : (
              /* Success intake Form page, displaying interactive Calendar scheduling logic! */
              <div className="space-y-8 animate-fadeIn" id="schedule-booking-panel">
                
                {/* Visual Checkmark indicator */}
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <Check className="w-8 h-8 text-emerald-600 font-bold" />
                  </div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Secure Intake Handshake Compeleted</p>
                  <h5 className="font-display font-extrabold text-2xl text-brand-blue">
                    Select Your Available Briefing Timeslot
                  </h5>
                  <p className="text-slate-600 text-sm max-w-xl mx-auto">
                    Outstanding, <span className="font-bold text-slate-800">{formData.fullName}</span> representing <span className="font-bold text-slate-800">{formData.orgName}</span>. Your technology variables have been securely registered. To lock in your consultation, select a briefing block below:
                  </p>
                </div>

                {/* Actual timeslot booking chooser selector */}
                {!bookingConfirmed ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {MOCK_DATETIMES.map((tSlot) => {
                        const isChosen = selectedTimeSlot === tSlot;
                        return (
                          <button
                            key={tSlot}
                            onClick={() => setSelectedTimeSlot(tSlot)}
                            className={`p-4 rounded-xl text-xs font-bold border transition-all text-center flex flex-col justify-center items-center space-y-2 cursor-pointer ${
                              isChosen 
                                ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
                                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/40 hover:bg-slate-50'
                            }`}
                          >
                            <Calendar className={`w-5 h-5 ${isChosen ? 'text-brand-red' : 'text-slate-400'}`} />
                            <span>{tSlot}</span>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                              isChosen ? 'bg-brand-red/20 text-brand-red' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {isChosen ? 'Selected Choice' : 'Available Slot'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-slate-200 p-5 rounded-xl gap-4">
                      <div className="text-center sm:text-left">
                        <p className="text-xs text-slate-400 uppercase font-mono font-bold">Selected Coordinate</p>
                        <p className="font-display font-bold text-slate-800 text-sm mt-0.5">
                          {selectedTimeSlot || "Ninguna selección activa"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:underline"
                        >
                          Modify Intake details
                        </button>
                        <button
                          onClick={handleBookingConfirm}
                          disabled={!selectedTimeSlot}
                          className={`px-6 py-2.5 text-xs font-bold uppercase rounded-lg transition-all ${
                            selectedTimeSlot 
                              ? 'bg-brand-red hover:bg-brand-red-dark text-white hover:glow-btn-red cursor-pointer' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Confirm & Seal Briefing Slot
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* Briefing sealed block output */
                  <div className="bg-slate-900 text-white rounded-2xl p-6 border border-brand-blue-light/20 shadow-lg space-y-5 animate-scaleUp">
                    
                    <div className="flex items-center space-x-3 text-brand-red font-mono text-xs font-bold tracking-widest">
                      <Lock className="w-4.5 h-4.5 text-brand-red" />
                      <span>SECURE CONFERENCE ROOM PRE-PROVISIONED</span>
                    </div>

                    <h6 className="font-display font-bold text-lg">
                      Briefing Confirmed successfully !
                    </h6>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      A secured, cryptographically isolated Google Meet code has been generated and pre-booked for <span className="font-bold text-white text-base font-display block sm:inline">{selectedTimeSlot}</span>. The encrypted agenda and operational access details have been securely routed to <span className="font-mono text-brand-red-light font-bold underline">{formData.email}</span>.
                    </p>

                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-750 font-mono text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400">
                      <div>
                        <span>Host Coordinator:</span>
                        <span className="text-white block font-sans font-bold mt-0.5">Director of Compliance Engineering</span>
                      </div>
                      <div>
                        <span>Security Enclave ID:</span>
                        <span className="text-white block mt-0.5 opacity-90">KOR-6010-F82B</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-start">
                      <button
                        onClick={resetForm}
                        className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-4 py-2 rounded text-xs uppercase"
                      >
                        Submit another operational request
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 8: CUSTOMERS BRIEF / REPUTATIONAL ACCREDITATION */}
      <section className="py-12 bg-slate-50 border-t border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold mb-6">
            Supported Enterprise Architectural Integrations
          </p>
          {/* Mock integration names */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all">
            <span className="font-display font-bold text-lg sm:text-xl text-slate-500 tracking-tight">Vercel sovereign</span>
            <span className="font-display font-extrabold text-lg sm:text-xl text-slate-500 tracking-normal text-brand-blue">Drizzle-ORM</span>
            <span className="font-mono text-sm sm:text-base text-slate-500 font-bold">NEXT_CLOUD_SEC</span>
            <span className="font-display font-bold text-base sm:text-lg text-slate-500 italic">Kubernetes / Fed</span>
            <span className="font-display font-extrabold text-sm sm:text-base text-slate-500 tracking-widest">NIST_FRAMEWORK</span>
          </div>
        </div>
      </section>

      {/* SECTION 9: PROFESSIONAL AND DETAILED CORPORATE FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t font-sans" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 text-sm">
          
          {/* Logo, registration details and description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white mb-1">
                KORIX
              </span>
              <span className="font-display font-bold text-lg text-brand-red tracking-wider">
                LLC
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Korix LLC provides defense-grade strategy alignment, advanced secure web platform development, and robust data pipeline integration under full ITAR controls and US executive standard compliance guidelines.
            </p>

            <div className="text-[11px] font-mono text-slate-500 space-y-1">
              <p>DUNS Identifier: <span className="text-slate-400 font-semibold">11-893-10260</span></p>
              <p>CAGE Logistics Code: <span className="text-slate-400 font-semibold">9X4K2</span></p>
              <p>State Entity: <span className="text-slate-400 font-semibold">Active Registrant</span></p>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Services</p>
            <ul className="space-y-2">
              <li><a href="#service-ai-consulting" className="hover:text-brand-red-light transition-colors">AI Consulting</a></li>
              <li><a href="#service-ai-consulting" className="hover:text-brand-red-light transition-colors">Federal Trust Analysis</a></li>
              <li><a href="#service-web-development" className="hover:text-brand-red-light transition-colors">Web Development</a></li>
              <li><a href="#service-web-development" className="hover:text-brand-red-light transition-colors">Secure DB Architect</a></li>
              <li><a href="#compliance-assessor" className="hover:text-brand-red-light transition-colors">Automated Security Audits</a></li>
            </ul>
          </div>

          {/* Stepper process links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Methodology</p>
            <ul className="space-y-2">
              <li><a href="#slogan-process" className="hover:text-brand-red-light transition-colors">01. Define Stage</a></li>
              <li><a href="#slogan-process" className="hover:text-brand-red-light transition-colors">02. Design Stage</a></li>
              <li><a href="#slogan-process" className="hover:text-brand-red-light transition-colors">03. Deliver Stage</a></li>
              <li><a href="#slogan-process" className="hover:text-brand-red-light transition-colors">Sprint Parameters</a></li>
            </ul>
          </div>

          {/* Location and secure channels information */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Corporate Headquarters</p>
            
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">Austin Operations Center</p>
              <p>100 Congress Avenue, Suite 2000<br />Austin, Texas 78701</p>
              <p>Secure Voice Line: <span className="font-mono text-white">+1 (800) 555-KORX</span></p>
              <p>Cryptographic Intake: <a href="mailto:secure@korix.net" className="hover:text-brand-red-light underline decoration-dotted font-mono">secure@korix.net</a></p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
              <Shield className="w-4 h-4 text-brand-red" />
              <span>FedRAMP Sovereign Environment</span>
            </div>
          </div>

        </div>

        {/* Outer bottom copyright alignment block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-slate-800 text-xs text-slate-500 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Korix LLC. All sovereign rights reserved. Designed in accordance with regional security benchmarks and executive digital compliance guidelines.</p>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Corporate Governance</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Silo Policy</a>
            <a href="#" className="hover:text-white transition-colors">NIST Status Disclosure</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
