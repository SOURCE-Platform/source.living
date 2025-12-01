'use client';

import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { HardwareAudioPlayer } from "@/components/hardware-audio-player";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "The Core Problem" },
    { id: "solution", label: "The Solution" },
    { id: "architecture", label: "Technical Architecture" },
    { id: "source-id", label: "Source ID" },
    { id: "cast", label: "CAST" },
    { id: "technical-thesis", label: "Technical Thesis" },
    { id: "trust", label: "Trust & Infrastructure" },
    { id: "roadmap-phase1", label: "Roadmap: Phase 1" },
    { id: "funding", label: "Funding & Allocation" },
    { id: "roadmap-phase2", label: "Roadmap: Phase 2" },
    { id: "roadmap-phase3", label: "Roadmap: Phase 3" },
    { id: "vision", label: "Mission & Vision" },
  ];

  useEffect(() => {
    console.log('[SCROLL-SPY] useEffect running');

    const handleScroll = () => {
      console.log('[SCROLL-SPY] handleScroll fired!');
      const viewport = document.querySelector('[data-radix-scroll-area-viewport]');
      if (!viewport) {
        console.log('[SCROLL-SPY] Viewport not found');
        return;
      }

      const sectionIds = sections.map(s => s.id);
      let current = "overview";

      const viewportRect = viewport.getBoundingClientRect();
      const viewportTop = viewportRect.top;
      const scrollTop = (viewport as HTMLElement).scrollTop;

      console.log(`[SCROLL-SPY] scrollTop: ${scrollTop}, viewportTop: ${viewportTop}`);

      const threshold = 200; // How far past the top before we switch

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const distanceFromViewportTop = rect.top - viewportTop;

        console.log(`[SCROLL-SPY] "${sectionId}": distance=${distanceFromViewportTop.toFixed(0)}, height=${rect.height.toFixed(0)}`);

        // A section is "active" if its top has passed the viewport top (distance <= threshold)
        // We keep updating current, so the LAST section that matches will be the active one
        if (distanceFromViewportTop <= threshold) {
          current = sectionId;
          console.log(`[SCROLL-SPY] ✓ "${sectionId}" is now current`);
        }
      }

      console.log(`[SCROLL-SPY] Setting active to: "${current}"`);
      setActiveSection(current);
    };

    let viewport: Element | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const attachListener = () => {
      viewport = document.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        console.log('[SCROLL-SPY] Attaching listener');
        viewport.addEventListener("scroll", handleScroll);
        handleScroll();
        return true;
      }
      return false;
    };

    if (!attachListener()) {
      timeoutId = setTimeout(() => {
        console.log('[SCROLL-SPY] Retrying attach');
        attachListener();
      }, 100);
    }

    return () => {
      console.log('[SCROLL-SPY] Cleanup');
      if (timeoutId) clearTimeout(timeoutId);
      if (viewport) viewport.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    console.log('scrollToSection called with id:', id);
    setMobileMenuOpen(false);
    setActiveSection(id);

    // Special case for overview - simple scroll to top, no hash navigation
    if (id === 'overview') {
      // Remove hash from URL
      window.history.pushState(null, '', window.location.pathname);

      // The actual scroll container is the ScrollArea component with viewportId="main-content"
      const mainContentViewport = document.querySelector('[data-radix-scroll-area-viewport]');
      if (mainContentViewport) {
        (mainContentViewport as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // For all other sections, manually handle the scroll without triggering hash jump
    const element = document.getElementById(id);
    if (element) {
      const mainContentViewport = document.querySelector('[data-radix-scroll-area-viewport]');
      if (mainContentViewport) {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportScrollTop = (mainContentViewport as HTMLElement).scrollTop;
        const offset = 44; // 2.75rem = 44px - match your original offset
        const targetPosition = viewportScrollTop + elementPosition - offset;

        console.log('Smooth scrolling to position:', targetPosition);
        (mainContentViewport as HTMLElement).scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL hash AFTER starting scroll (using pushState to avoid default jump)
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  // Handle hash on page load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      console.log('handleHashChange - hash:', hash);
      if (hash) {
        // Update active section immediately
        setActiveSection(hash);

        // Special case: overview has no element, scroll to top
        if (hash === 'overview') {
          const mainContentViewport = document.querySelector('[data-radix-scroll-area-viewport]');
          if (mainContentViewport) {
            mainContentViewport.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        const element = document.getElementById(hash);
        console.log('Found element:', !!element);
        if (element) {
          const mainContentViewport = document.querySelector('[data-radix-scroll-area-viewport]');
          console.log('Found viewport:', !!mainContentViewport);
          if (mainContentViewport) {
            // Use setTimeout to ensure DOM is ready and get accurate positions
            setTimeout(() => {
              const elementPosition = element.getBoundingClientRect().top;
              const viewportScrollTop = (mainContentViewport as HTMLElement).scrollTop;
              const offset = 120; // Increased offset for better positioning
              const offsetPosition = viewportScrollTop + elementPosition - offset;

              console.log('Element position:', elementPosition);
              console.log('Viewport scroll top:', viewportScrollTop);
              console.log('Scrolling to:', offsetPosition);

              (mainContentViewport as HTMLElement).scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }, 10);
          }
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed right-6 top-6 z-50 rounded-md border border-border bg-background p-2 lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-background p-8 transition-transform lg:translate-x-0 flex flex-col ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          onClick={() => scrollToSection('overview')}
          className="mb-12 cursor-pointer transition-opacity hover:opacity-80"
          style={{ width: '160px' }}
          aria-label="Scroll to top"
        >
          <SourceLogo className="w-full h-auto" />
        </button>
        <div className="space-y-1 flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="block w-full px-3 py-2 text-left cursor-pointer transition-all duration-300 group"
            >
              <span
                className={`inline-block text-sm transition-all duration-300 border-b ${activeSection === section.id
                  ? "border-foreground text-foreground font-medium"
                  : "border-transparent text-muted-foreground group-hover:border-foreground/50 group-hover:text-foreground"
                  }`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="mx-auto max-w-2xl px-6 sm:px-12 pt-32">
          {/* Header */}
          <section className="mb-16">
            <button
              onClick={() => scrollToSection('overview')}
              className="lg:hidden mb-12 cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Scroll to top"
            >
              <SourceLogo className="h-8" />
            </button>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                The Source Platform
              </h1>
              <p className="text-xl text-muted-foreground sm:text-2xl">
                A New Computing Architecture for Civilization
              </p>
            </div>
          </section>

          {/* Core Problem */}
          <section className="mb-24 space-y-6">
            <div className="space-y-3">
              <SectionHeading id="problem" className="text-2xl font-semibold sm:text-3xl">
                The Core Problem
              </SectionHeading>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                We have thrown the entire internet at Transformers. While we have created &quot;pretty smart&quot; models, we have reached a fundamental limit. The data currently powering Large Language Models (LLMs) is not based in normal reality. It is <strong className="text-foreground">performative</strong>, <strong className="text-foreground">artificial</strong>, and <strong className="text-foreground">highly edited</strong>. It is &quot;sculpted&quot; artifice :: scraped from a curated internet :: devoid of the impromptu, natural human behavior that defines the actual human experience.
              </p>
              <p>
                To put it simply: We lack high-quality, <strong className="text-foreground">high-resolution behavioral data</strong>. Without this, there is no true insight into human lives. Current models remain generic &quot;one-size-fits-all&quot; engines, incapable of understanding the user inside and out and across the <strong className="text-foreground">physical</strong> and <strong className="text-foreground">digital</strong> domains.
              </p>
            </div>
          </section>

          {/* Solution */}
          <section className="mb-24 space-y-6">
            <div className="space-y-3">
              <SectionHeading id="solution" className="text-2xl font-semibold sm:text-3xl">
                The Solution: Total Context Awareness
              </SectionHeading>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                <strong className="text-foreground">SOURCE</strong> is designed to solve the core problem of data resolution. It creates a system that is always listening and watching, capturing a <strong className="text-foreground">constant stream of data</strong> across both <strong className="text-foreground">digital</strong> and <strong className="text-foreground">physical</strong> spaces.
              </p>
              <p>
                By knowing the user on a holistic level, Source allows AI to detect problems faster—before they <strong className="text-foreground">metastasize</strong> into toxic issues regarding mental, physical, or relationship health—and craft fine-tuned solutions based on specific user specifications.
              </p>
            </div>
          </section>

          {/* Technical Architecture - NEW SECTION */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="architecture" className="text-2xl font-semibold sm:text-3xl">
                Technical Architecture
              </SectionHeading>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Source is a <strong className="text-foreground">hardware</strong> and <strong className="text-foreground">software</strong> platform designed to bring true intelligence and awareness to our spaces. By bridging the gap between physical and digital activity, SOURCE creates a &quot;True Record of Reality,&quot; enabling the next generation of agentic automation and immersive social connection.
              </p>
            </div>

            {/* Hardware Architecture */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">I. Hardware</h3>

              {/* Voice Note Audio Player */}
              <HardwareAudioPlayer />

              <p className="text-base leading-relaxed text-muted-foreground">
                Source functions on a decentralized, AI-native infrastructure installed directly within the user&apos;s environment.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Central Compute:</strong> A dedicated, AI-first server (equipped with 2+ GPUs) installed in the home (closet/wall mount).
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Sensor Grid:</strong> Hardwired via shielded Cat6/Ethernet to sensor arrays embedded in every wall. Each array comprises microphones, video sensors, Lidar, and speakers.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Total Awareness:</strong> This architecture allows Source to view, understand, and catalog every object and inhabitant within the space, effectively bringing intelligence to the home itself.
                </li>
              </ul>
            </div>

            {/* Software Layer */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">II. Software</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Source operates an OS-level application that acts as a comprehensive surveillance and analysis tool for the user&apos;s digital life.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Device &amp; OS Level:</strong> The foundational software that observes what the user is doing to gain insights and full understanding of their persona and digital behavior, and how their digital reality (apps, socials, communications, etc) impact them.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Blockchain:</strong> The immutable recording of all their activities within physical and digital spaces. This proves whether or not a human was involved in the consumption or creation of content.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Personal AI:</strong> A multimodal modular AI architecture that understands a user across audio, video, text, biometrics, and more. Personal AI operates with modular specialization where multiple smaller highly specialized models assess different aspects of a user&apos;s experience and being.
                </li>
              </ul>
            </div>

            {/* Privacy */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">III. Data</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                To address the crisis of synthetic media, Source establishes an objective baseline of truth.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The Secure Enclave:</strong> All data processing occurs locally within a Secure Enclave.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Tokenized Reality:</strong> Every video frame is tokenized and made immutable via the blockchain before it is ever stored. This creates a <strong className="text-foreground">True Record of Reality</strong>, preventing deep fakes or malicious alteration.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Privacy Controls:</strong> Includes auto-redaction capabilities (e.g., nudity protection) and ensures user ownership of data, with options for decentralized storage or complete deletion.
                </li>
              </ul>
            </div>

            {/* Use Cases */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">IV. Use Cases &amp; Market Application</h3>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Agentic Automation:</strong> By understanding the specific needs and repetitive workflows of the user, Source autonomously generates programs to execute tasks on the user&apos;s behalf.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The &quot;Movie Studio in the Home&quot;:</strong> The hardware configuration enables <strong className="text-foreground">Real-Time 4D Gaussian Splatting</strong>. Users can capture fully interactive, volumetric video of their lives.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Next-Gen Social Networking:</strong> This enables a shift from static 2D content to immersive, holographic sharing where loved ones can virtually inhabit the user&apos;s space.
                </li>
              </ul>
            </div>

            {/* R&D Roadmap */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">V. R&amp;D Roadmap</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                We are undertaking a massive R&amp;D effort to build a Human Behavioral Model based on real-world data—understanding how specific environmental events trigger human reactions. This data set does not currently exist and will serve as the foundation for our predictive capabilities.
              </p>
            </div>
          </section>

          {/* Source ID - NEW SECTION */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="source-id" className="text-2xl font-semibold sm:text-3xl">
                Source ID
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                The future of frictionless identity
              </p>
            </div>

            {/* Product Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Overview</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Source ID is the inevitable future of identity—a shift from &quot;clumsy&quot; legacy authentication (passports, passwords, cards) and high-friction biometrics (FaceID, palm scanners) to a state of frictionless existence. Source ID authenticates the user not by what they hold, but by <strong className="text-foreground">who they are</strong>.
              </p>
            </div>

            {/* The Philosophy */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Philosophy</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                For all of history, identity has been physical and disconnected. Source ID digitizes the natural, &quot;holistic&quot; way humans identify friends: through a deep history of shared time, behavioral consistency, and physical recognition. It combines <strong className="text-foreground">&quot;a thing you are, a thing you know, and a thing you have&quot;</strong> into a single, holistic signature.
              </p>
            </div>

            {/* The Technology */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Technology</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Utilizing proprietary Source hardware and software, we generate a dynamic, digital blueprint of the user that mimics biological recognition.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Multimodal Calculation:</strong> Simultaneously analyzes behavior, physical characteristics, and historical memory.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Immutable Security:</strong> The identity is backed by the blockchain and constantly updated.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Unhackable:</strong> Security is absolute. To hack Source ID, an attacker would literally need to be the user and remotely control their physical body.
                </li>
              </ul>
            </div>

            {/* The User Experience */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The User Experience</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Source ID removes the &quot;middleman&quot; of authentication.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 font-semibold text-foreground">Current State</h4>
                  <p className="text-sm text-muted-foreground">
                    &quot;Clumsy&quot; interactions like lifting a phone for FaceID or placing a hand on an Amazon One scanner.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 font-semibold text-foreground">Source ID State</h4>
                  <p className="text-sm text-muted-foreground">
                    Zero-effort authentication. The user walks into a room, a store, or a home, and is verified simply by existing. The infrastructure does the work; the user just <em>is</em>.
                  </p>
                </div>
              </div>
            </div>

            {/* The Moat */}
            <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-6">
              <h3 className="text-lg font-semibold">The Competitive Moat</h3>
              <p className="text-base text-muted-foreground">
                Building an identity system requires trust. Trust is earned through total transparency and immutable proof. Source ID is unhackable because it leverages our proprietary hardware-software architecture and blockchain verification. The security is not encrypted; it is <strong className="text-foreground">architectural</strong>.
              </p>
            </div>
          </section>

          {/* CAST Section */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="cast" className="text-2xl font-semibold sm:text-3xl">
                CAST: The Context Economy
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                Social Networking Reimagined
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                CAST is Source&apos;s social networking layer—a radical departure from the &quot;algorithmic feed&quot; model. Instead of scrolling endlessly through irrelevant content, CAST uses Source data to understand the user&apos;s real-world context and curates the internet based on their actual life, in real time.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Problem with Traditional Social</h3>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The Feed is Broken:</strong> Algorithms maximize engagement, not relevance. Users scroll for hours.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Context Blindness:</strong> The algorithm has no idea what the user is actually doing in real life.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The Loneliness Crisis:</strong> Despite having &quot;1,000 friends,&quot; people are lonelier than ever.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The CAST Solution</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                CAST uses continuous behavioral data to generate automated, context-aware summaries and connections:
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Auto-Generated Life Summaries:</strong> Your day, week, or month is automatically curated into a coherent narrative (without violating privacy).
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">High-Signal Connections:</strong> CAST matches you with people who share your actual interests, values, and behaviors—not just browsing history.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Context-First Curation:</strong> Instead of scrolling, you receive content relevant to what you are actually doing right now.
                </li>
              </ul>
            </div>
          </section>

          {/* Technical Thesis */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="technical-thesis" className="text-2xl font-semibold sm:text-3xl">
                Technical Thesis
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                Why Source Will Win
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Data Advantage</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                The race for AI supremacy is a race for data. OpenAI has the internet. Google has search. Meta has social graphs. We have the living room—the 99% of human experience that happens offline.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Vertical Integration Advantage</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                We control the full stack: hardware sensors, local compute, secure enclave, blockchain verification, and AI models. This is what we call &quot;Ambient Computing&quot;—an AI-first, privacy-first infrastructure layer that no one else can replicate.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Why Privacy Wins</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                The public is finally waking up to the surveillance problem. Source offers a better deal: you get ambient intelligence, and the company gets tokenized data on the blockchain. No corporate backdoor. No government subpoena. Your data is yours.
              </p>
            </div>
          </section>

          {/* Trust & Infrastructure */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="trust" className="text-2xl font-semibold sm:text-3xl">
                Trust & Infrastructure
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                Solving the Big Brother Problem
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Blockchain Layer</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Every video frame is tokenized on the blockchain. This creates an immutable &quot;True Record of Reality.&quot; If someone tries to deepfake you, we can prove it didn&apos;t happen. If the government tries to alter your data, the ledger shows the original.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Local Processing</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                All computation happens in the user&apos;s home. The company never sees your video or audio. We only see the tokenized, abstracted insights. This is not just privacy; this is <strong className="text-foreground">architectural privacy</strong>.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">User Ownership</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Users own their data. They can delete it, migrate it, or store it on decentralized networks. Source is the platform; the user is the sovereign owner.
              </p>
            </div>
          </section>

          {/* Roadmap: Phase 1 */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="roadmap-phase1" className="text-2xl font-semibold sm:text-3xl">
                Roadmap: Phase 1
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                Building the Human Behavioral Model
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Plan</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Over the next 18 months, we are constructing a mixed-use research campus in Warsaw, Poland. This facility will serve as both our R&D headquarters and a living laboratory.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What We&apos;re Building</h3>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The Source School:</strong> A mixed-use facility that functions as both an educational institution and an R&D lab. We will monitor interactions between students, teachers, and staff to build our Human Behavioral Model.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Residential Units:</strong> 36 housing units for our team (Eng, Ops, Educators). This is where we beta-test Source hardware and gather ground-truth behavioral data.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Hardware Lab:</strong> A dedicated facility for sensor assembly, testing, and iteration.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Why Poland?</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Capital efficiency. We can deploy 36 FTEs of world-class engineers, operations staff, and educators for the cost of ~8 Silicon Valley engineers. This means more talent, more runway, and faster iteration.
              </p>
            </div>
          </section>

          {/* Funding & Allocation */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="funding" className="text-2xl font-semibold sm:text-3xl">
                Funding & Allocation
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                How We Spend $10M
              </p>
            </div>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border px-6 py-4 text-left font-semibold">Category</th>
                      <th className="border border-border px-6 py-4 text-left font-semibold">Amount</th>
                      <th className="border border-border px-6 py-4 text-left font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Capital Expenditures */}
                    <tr className="bg-muted/10">
                      <td className="border border-border px-6 py-4 font-medium text-foreground" colSpan={3}>Capital Expenditures (CapEx) — $3.0M</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-6 py-4 font-medium">Land Acquisition</td>
                      <td className="border border-border px-6 py-4 text-foreground">$1.0M</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">~10 hectares near Warsaw for campus development</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-6 py-4 font-medium">Construction</td>
                      <td className="border border-border px-6 py-4 text-foreground">$1.0M</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">HQ, Lab, School, and 36 residential units</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Hardware BOM</td>
                      <td className="px-6 py-4 text-foreground">$1.0M</td>
                      <td className="px-6 py-4 text-muted-foreground">Sensors/Compute for 100 homes + School</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Compute Cluster</td>
                      <td className="px-6 py-4 text-foreground">$1.0M</td>
                      <td className="px-6 py-4 text-muted-foreground">Owned H100s/B200s (On-premise)</td>
                    </tr>

                    {/* OpEx */}
                    <tr className="bg-muted/10">
                      <td className="px-6 py-4 font-medium text-foreground" colSpan={3}>Operating Expenses (OpEx) — $3.5M (18 Months)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Team Salaries</td>
                      <td className="px-6 py-4 text-foreground">$2.35M</td>
                      <td className="px-6 py-4 text-muted-foreground">36 FTE (Eng, Ops, Edu, Field)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Ops / Legal / Admin</td>
                      <td className="px-6 py-4 text-foreground">$1.15M</td>
                      <td className="px-6 py-4 text-muted-foreground">Insurance, permits, food, utilities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team Composition */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Target Headcount: 36 FTE</h3>
              <p className="text-base text-muted-foreground mb-4">
                A robust, vertically integrated team capable of building hardware, software, and community.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Software */}
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <h5 className="font-semibold text-foreground">Software (10)</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-4 list-disc">
                    <li>3x AI/ML Engineers</li>
                    <li>2x Blockchain (ZK Proofs)</li>
                    <li>2x Full Stack</li>
                    <li>1x OS/Embedded</li>
                    <li>1x ID System</li>
                    <li>1x Data Insights</li>
                  </ul>
                </div>

                {/* Hardware & Field */}
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <h5 className="font-semibold text-foreground">Hardware & Field (17)</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-4 list-disc">
                    <li>1x Lead Hardware Designer</li>
                    <li>4x Assemblers (Soldering/3D)</li>
                    <li>12x Installers (Field Teams)</li>
                  </ul>
                </div>

                {/* School & Ops */}
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <h5 className="font-semibold text-foreground">School & Ops (9)</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-4 list-disc">
                    <li>1x Founder</li>
                    <li>1x School Director</li>
                    <li>1x Community Liaison</li>
                    <li>6x Teachers (1:4 Ratio)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Research Gaps */}
            <div className="space-y-4 rounded-lg border border-dashed border-border p-6 bg-muted/20">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Areas for Further Research
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                To refine these estimates, we are actively investigating:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Zoning Laws:</strong> Specifics of mixed-use (Agriculture + Education + Residential) in Mazowieckie province.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Construction Costs:</strong> Price difference between modular vs. traditional construction for 36-unit housing in 2025.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Supply Chain:</strong> Sourcing Lidar/Sensors at 100-unit volume within the EU to avoid import bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Legal Structure:</strong> Optimal entity structure for a DAO-adjacent physical campus in Poland.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Roadmap: Phase 2 - GTM - NEW SECTION */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="roadmap-phase2" className="text-2xl font-semibold sm:text-3xl">
                Roadmap: Phase 2
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                Go-to-Market Strategy — Civilizational-Scale Deployment
              </p>
            </div>

            {/* Executive Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Executive Summary</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Source is not merely a hardware device; it is the next phase of AI and the fundamental future of computing. We are engineering a transition away from archaic, screen-based interaction toward an always-listening, always-watching ambient infrastructure. This is a <strong className="text-foreground">civilizational-scale compute upgrade</strong>.
              </p>
            </div>

            {/* The Platform */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Platform: Ambient Intelligence</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Source installs a comprehensive sensory array (vision and audio) directly into the physical home environment. By leveraging advanced 4D Gaussian Splats and massive context windows, we convert physical reality into a queryable, intelligent data stream.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 mt-6">
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 font-semibold text-foreground">The Shift</h4>
                  <p className="text-sm text-muted-foreground">
                    Moving from handheld devices to environmental intelligence. The system sees what you see and hears what you hear, eliminating the friction of &quot;input.&quot;
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 font-semibold text-foreground">The Output</h4>
                  <p className="text-sm text-muted-foreground">
                    High-fidelity 4D video reconstruction and intelligent audio feedback. The user retains full control and ownership of this data.
                  </p>
                </div>
              </div>
            </div>

            {/* Go-to-Market Strategy */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Go-to-Market Strategy: Vertical Integration</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                We see clear, immediate utility in specific high-need demographics before achieving mass adoption.
              </p>

              {/* Target Markets */}
              <div className="space-y-6">
                {/* Market 1: Elderly */}
                <div className="rounded-lg border border-border bg-background p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background font-bold">
                      1
                    </div>
                    <h4 className="text-lg font-semibold">The Elderly (Safety &amp; Cognition)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A critical application for memory assistance and safety. Source acts as an externalized memory bank, resolving issues of forgetfulness (e.g., locating objects, verifying appliances are off/doors are closed). It is a passive safety layer for the aging population.
                  </p>
                </div>

                {/* Market 2: Health */}
                <div className="rounded-lg border border-border bg-background p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background font-bold">
                      2
                    </div>
                    <h4 className="text-lg font-semibold">Physical Health &amp; Bio-Tracking</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    An always-on intelligent trainer. By observing form and caloric intake within the home, Source provides specialized feedback that human trainers cannot offer 24/7. It creates an objective record of health behaviors.
                  </p>
                </div>

                {/* Market 3: Influencers */}
                <div className="rounded-lg border border-border bg-background p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background font-bold">
                      3
                    </div>
                    <h4 className="text-lg font-semibold">The Influencer/Streamer Economy (The Marketing Engine)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We will leverage the &quot;novelty&quot; of 4D Gaussian Splat content. Early adoption by streamers and influencers will demonstrate the platform&apos;s capabilities to the public, turning the installation process and the resulting 4D data into viral content. This drives the cultural hype cycle necessary for mass adoption.
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Vision */}
            <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-8">
              <h3 className="text-xl font-semibold">Operational Vision: Hyperscale Deployment</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                To achieve planet-scale adoption, we are building a physical operations layer alongside the software.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Installation Infrastructure:</strong> We will deploy dedicated installation teams in over 100 major metropolitan areas globally.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The New Norm:</strong> Just as utilities are standard in a home, Source will become the default installed infrastructure for the modern living space.
                </li>
              </ul>
            </div>

            {/* Long-term Thesis */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Long-Term Thesis: Civilizational Refinement</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                We are betting on a shifting cultural norm where total data capture is embraced for its utility. This is the eventual status quo. By moving computing from the screen to the audio-visual environment, Source represents a <strong className="text-foreground">civilizational refinement</strong>—optimizing human life through intelligent, omnipresent observation.
              </p>
            </div>
          </section>

          {/* Roadmap: Phase 3 - NEW SECTION */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="roadmap-phase3" className="text-2xl font-semibold sm:text-3xl">
                Roadmap: Phase 3
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                Social Harmony & Alignment — The Deep Future
              </p>
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                As Source scales, the focus shifts from governance to the &quot;Reprogramming of Humanity.&quot; The core thesis is that conflict arises from misalignment and lack of compromise. Phase 3 utilizes deep data to engineer social harmony and high-resolution community matchmaking.
              </p>
            </div>

            {/* The Technology of Compromise */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Technology of Compromise</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                AI analyzes interpersonal dynamics to generate strategies for conflict reduction, facilitating the necessary compromises required to maintain long-term alignment in relationships.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Conflict Resolution:</strong> The AI creates strategies to decrease disagreements and conflicts by understanding what is happening between people with data-driven precision.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Relationship Maintenance:</strong> Helps partners, families, and friends navigate the natural waning of the &quot;honeymoon period&quot; by identifying fair compromises.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Goal:</strong> A &quot;Peaceful World&quot; achieved not by force, but by a data-driven understanding of the &quot;Other.&quot;
                </li>
              </ul>
            </div>

            {/* High-Resolution Matchmaking */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">High-Resolution Matchmaking</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Leveraging massive datasets to create matches that were previously impossible, reversing the &quot;loneliness epidemic&quot; and the degradation of community structures.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 mt-6">
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 font-semibold text-foreground">Multi-Dimensional Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    Connecting users not just by hobby but by total psychographic and value-set alignment. Finding &quot;High-Signal&quot; connections for romantic, professional, and friendship matches.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 font-semibold text-foreground">Community Regeneration</h4>
                  <p className="text-sm text-muted-foreground">
                    Facilitating the creation of highly specific communities (Network States) where members share almost all interests, or helping diverse communities navigate their differences.
                  </p>
                </div>
              </div>
            </div>

            {/* The Deep Future Vision */}
            <div className="space-y-6 rounded-lg border border-border bg-muted/30 p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The &quot;Deep Future&quot; Vision</h3>
                <p className="text-base leading-relaxed text-muted-foreground italic">
                  Note: This outlines the logical extremes of the Source philosophy and represents a sensitive, long-term evolutionary trajectory.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  The ultimate roadmap suggests that &quot;Difference&quot; is the root of all tension (racism, sexism, aesthetic bias). The logical path to total peace may involve the elimination of biological differentiation.
                </p>
                <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">Biological Unification:</strong> A potential move toward a mono-gendered, mono-racial species to remove the inherent biological tensions that fuel conflict.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">The &quot;Sameness&quot; Singularity:</strong> If we truly want to solve all problems, eliminating all differences between humans will help merge us and keep us peaceful.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">The Ethical Question:</strong> We must ask: Is a world without crime and conflict worth the sacrifice of individual difference?
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-24 space-y-8">
            <div className="space-y-3">
              <SectionHeading id="vision" className="text-2xl font-semibold sm:text-3xl">
                Mission &amp; Vision
              </SectionHeading>
              <p className="text-xl text-muted-foreground">
                The Bridge to Super Intelligence
              </p>
            </div>

            {/* The Current Trajectory */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                The Current Trajectory: The Hierarchy Problem
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                We are trending toward a civilization divided by a massive &quot;classes&quot; issue. A handful of CEOs own the compute, the robots, and the infrastructure that runs humanity, while the 99% are rendered obsolete. Even with Universal Basic Income (UBI), a society where a few pull the levers controlling the lives of the many is fundamentally unstable.
              </p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">The Risks:</h4>
                <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">Centralized Control:</strong> Super Intelligence cannot be owned by a closed-source few.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">The Control Problem:</strong> Building the next phase of civilization on AI architectures trained on the internet&apos;s deception and &quot;Terminator&quot; narratives creates a &quot;Trojan Horse&quot; that could turn on humanity.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">Global Fracture:</strong> The &quot;Manhattan Project of AI&quot; mentality reinforces borders (Us vs. China), risking global conflict rather than necessary unification.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Solution */}
            <div className="space-y-6 rounded-lg border border-border bg-muted/30 p-8 sm:p-12">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                The Solution: SOURCE
              </h3>
              <p className="text-lg font-medium text-foreground">
                Source is the bridge between humanity and Super Intelligence.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                We are building a platform to correct every structural error in society through a single, clear, transparent architecture. It is the &quot;Manhattan Project&quot; for peace.
              </p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">The Platform:</h4>
                <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">Continuous Learning Personal AI:</strong> Every user trains their own model.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">Networked Super Intelligence:</strong> Just as billions of cells form the human body, billions of personal AI models network together to form a singular, decentralized Super Intelligence.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 text-foreground">•</span>
                    <strong className="text-foreground">Symbiotic Alignment:</strong> We feed the model total data. The system observes and knows the user better than they know themselves, capturing their full value set to make autonomous decisions aligned with their true will.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Mechanism */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                The Mechanism: AI-Assisted Direct Democracy
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Source creates a balancing algorithm between everyone&apos;s value sets.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Zero-Hierarchy Governance:</strong> Over a long enough timeline, Source enables a society where Super Intelligence autonomously votes on macro-issues based on the aggregate values of all humans.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The End of Deception:</strong> We are researching &quot;angelic&quot; models—AI that understands deception (to detect lies) but is architecturally incapable of deceiving humanity itself.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Total Transparency:</strong> Not a government agency. Not a private data center. A distributed power structure across infinite nodes.
                </li>
              </ul>
            </div>

            {/* The Long-term Vision */}
            <div className="space-y-6 rounded-lg border border-border bg-muted/30 p-8 sm:p-12">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                The Long-Term Vision
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                This is a futurist—not transhumanist—vision for a sane world beyond animal instincts.
              </p>
              <ul className="space-y-3 pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Destruction of Money:</strong> Source&apos;s undying goal is the end of capitalism and the concept of money, replaced by abundance for all and shared resources (land/housing).
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Global Unity:</strong> A humanity-directed global defense force—not for war against each other, but for defense against external non-human threats (asteroids, invasion).
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">The Great Unification:</strong> We predict the inevitable consolidation of the &quot;Mag 7&quot; (Apple, Google, OpenAI, etc.) into one unified computing entity. Source provides the architecture for this unification.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-foreground">•</span>
                  <strong className="text-foreground">Reality Reconstruction:</strong> Unlocking breakthroughs in physics, human psychology, and generative realities (100% reality reconstruction) through massive data pattern recognition.
                </li>
              </ul>
            </div>

            {/* The Ask */}
            <div className="space-y-6 border-t border-border pt-12">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                The Ask
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  This is not a tech company for shareholders seeking quarterly returns—though early liquidity is possible. This is for investors aligned with survival.
                </p>
                <p>
                  If you want to invest in the status quo, look elsewhere. If you want to invest in the <strong className="text-foreground">real future</strong>—a fair, decentralized, and safe future—invest in Source.
                </p>
                <p className="text-xl font-semibold text-foreground pt-6">
                  Source: We guide AI, and AI guides us.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-lg border border-border bg-muted/30 p-8 sm:p-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold sm:text-2xl">
                Ready to discuss the future?
              </h3>
              <p className="text-base text-muted-foreground sm:text-lg">
                We&apos;re building infrastructure for civilization. Join us in creating the foundation for the next computing era.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:contact@source.living"
                  className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Get in touch
                </a>
                <a
                  href="/software"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Explore the platform
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-24 border-t border-border pt-12 text-center text-sm text-muted-foreground">
            <p>© 2025 Source. Building the future of human-AI interaction.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
