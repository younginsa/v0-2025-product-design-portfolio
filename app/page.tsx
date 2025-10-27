"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isInTextArea, setIsInTextArea] = useState(false)
  const textAreaRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textAreaRef.current && isInTextArea) {
        const rect = textAreaRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isInTextArea])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center py-4 backdrop-blur-lg border-b border-border bg-background/80 px-4 md:px-6 mx-auto justify-between lg:px-20">
        <ThemeToggle />
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="#project"
            className="nav-link transition-colors text-base text-muted-foreground hover:text-foreground"
          >
            Work
          </Link>
          <Link
            href="#projects-intro"
            className="nav-link transition-colors text-base text-muted-foreground hover:text-foreground"
          >
            Projects
          </Link>
          <Link
            href="#blog"
            className="nav-link transition-colors text-base text-muted-foreground hover:text-foreground"
          >
            Connect
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="https://attachments.are.na/39370898/63cf2567bbc4526b91aca361575e5002.pdf?1757289697"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button flex items-center px-3 py-1.5 border border-border bg-transparent hover:text-foreground rounded-none text-sm text-muted-foreground font-normal"
          >
            Resume <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 max-w-[90rem] pt-10">
        {/* Featured Project Block */}
        <section id="featured-project" className="py-10 md:py-20 my-0 mt-20">
          <div className="flex flex-col md:flex-row justify-between gap-10 items-start mx-6">
            <div
              ref={textAreaRef}
              className="w-full md:w-2/5 relative transition-all duration-500"
              onMouseEnter={() => setIsInTextArea(true)}
              onMouseLeave={() => setIsInTextArea(false)}
            >
              {/* Background layer - lowest z-index */}
              <div className="absolute inset-0 bg-transparent z-0"></div>

              {/* Text content layer - middle z-index */}
              <div className="relative z-10 w-full max-w-md">
                <h2 className="mb-12 text-2xl text-muted-foreground font-light">Hello, I'm Young In Sa.</h2>
                <h2 className="font-light text-2xl mb-6 text-muted-foreground">
                  Designing <span className="cursor-pointer font-normal text-foreground">future mobility UX</span> at
                  Avikus (HD Hyundai),
                </h2>
                <h2 className="font-light mb-5 text-2xl text-muted-foreground">
                  <span className="cursor-pointer font-normal text-foreground">iF Design Award</span> winner.
                </h2>
              </div>

              {/* Gradient overlay - highest z-index, only affects text, hidden in dark mode */}
              {isInTextArea && mounted && theme !== "dark" && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20"
                  style={{
                    background: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, rgba(180, 255, 0, 0.4) 0%, rgba(45, 240, 158, 0.3) 40%, rgba(0, 0, 255, 0.2) 70%, transparent 100%)`,
                    mixBlendMode: "screen",
                  }}
                />
              )}
            </div>
            <div className="hidden md:block w-full md:w-3/5">
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Featured project thumbnail"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Works Section - 6 projects in 3 columns */}
        <section id="project" className="py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Project Card 1 */}
            <div className="project-card border-border cursor-pointer p-4 border-0">
              <div className="aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src="/images/fleet-cyber-security.jpg"
                  alt="Project thumbnail"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1 md:gap-0">
                  <h3 className="text-base text-foreground font-normal">Secure Network &amp; Management</h3>
                  <p className="text-base text-muted-foreground font-light">Avikus</p>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground font-light max-w-[80%]">
                  TLDR; Fleet management systems with real-time threat monitoring.
                </p>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="project-card border-border cursor-pointer p-4 border-0">
              <div className="aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src="/images/secure-network-management.jpg"
                  alt="Project thumbnail"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1 md:gap-0">
                  <h3 className="text-base font-normal text-foreground">Neuboat</h3>
                  <p className="text-base text-muted-foreground font-light">Avikus</p>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground font-light max-w-[80%]">
                  TLDR; Boat control &amp; navigation iOS app
                </p>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="project-card border-border cursor-pointer p-4 border-0">
              <div className="aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src="/images/secure-network-management-project.jpg"
                  alt="Project thumbnail"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1 md:gap-0">
                  <h3 className="text-base font-normal text-foreground">HiNAS Cloud</h3>
                  <p className="text-base text-muted-foreground font-light">Avikus</p>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground font-light max-w-[80%]">
                  TLDR; iF Design 2024 awareded!
                </p>
              </div>
            </div>

            {/* Project Card 4 - Second Row */}
            <div className="project-card border-border cursor-pointer p-4 border-0">
              <div className="aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Project thumbnail"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1 md:gap-0">
                  <h3 className="text-base font-normal text-foreground">Geard.ai</h3>
                  <p className="text-base text-muted-foreground font-light">Freelance</p>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground font-light max-w-[80%]">
                  TLDR; AI-powered platform for enhancing workflow.
                </p>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="project-card border-border cursor-pointer p-4 border-0">
              <div className="aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Project thumbnail"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1 md:gap-0">
                  <h3 className="text-base font-normal text-foreground">Project Five</h3>
                  <p className="text-base text-muted-foreground font-light">Company</p>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground font-light max-w-[80%]">
                  TLDR; Description of project five.
                </p>
              </div>
            </div>

            {/* Project Card 6 */}
            <div className="project-card border-border cursor-pointer p-4 border-0">
              <div className="aspect-[4/3] w-full overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Project thumbnail"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1 md:gap-0">
                  <h3 className="text-base font-normal text-foreground">Project Six</h3>
                  <p className="text-base text-muted-foreground font-light">Company</p>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground font-light max-w-[80%]">
                  TLDR; Description of project six.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Intro Section - Target for "Projects" menu link */}
        <section id="projects-intro" className="py-[70px] pt-32 pb-0 pl-6 pr-6">
          <div className="max-w-4xl">
            <h2 className="text-foreground text-2xl font-normal">
              I design by leveraging creativity and technology to achieve goal.
            </h2>
          </div>
        </section>

        {/* Projects Section - 3 projects in single row */}
        <section id="project-2" className="py-0 mt-6"></section>

        {/* Blog Section */}
        <section id="blog" className="py-10">
          <div className="grid md:grid-cols-3 gap-2">
            {/* Blog Card 1 */}
            <div className="border-border cursor-pointer group p-4 border-0 bg-transparent">
              <div className="aspect-video w-full overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Blog post thumbnail"
                  width={600}
                  height={400}
                  className="blog-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                  <h3 className="text-base leading-7 font-normal text-foreground">Compliance Checker Figma Plugin</h3>
                  <div className="flex items-center gap-1">
                    <Link
                      href="#"
                      className="nav-link text-muted-foreground hover:text-foreground transition-colors text-base font-normal"
                    >
                      Figma
                    </Link>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="border-border cursor-pointer group p-4 border-0 bg-transparent">
              <div className="aspect-video w-full overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Blog post thumbnail"
                  width={600}
                  height={400}
                  className="blog-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                  <h3 className="text-base leading-7 font-normal text-foreground">Figma to Google slide</h3>
                  <div className="flex items-center gap-1">
                    <Link
                      href="#"
                      className="nav-link text-muted-foreground hover:text-foreground transition-colors text-base"
                    >
                      GitHub
                    </Link>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="border-border cursor-pointer group p-4 border-0 bg-transparent">
              <div className="aspect-video w-full overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Blog post thumbnail"
                  width={600}
                  height={400}
                  className="blog-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                  <h3 className="text-base leading-7 font-normal text-foreground">Design System Template</h3>
                  <div className="flex items-center gap-1">
                    <Link
                      href="#"
                      className="nav-link text-muted-foreground hover:text-foreground transition-colors text-base"
                    >
                      Notion
                    </Link>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="max-w-4xl">
            <h2 className="text-foreground text-2xl font-normal mb-6 ml-6 mr-6">
              Open to share ideas and grow together.
            </h2>

            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-10 text-muted-foreground py-0 px-6">
              <Link
                href="https://attachments.are.na/39370898/63cf2567bbc4526b91aca361575e5002.pdf?1757289697"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link text-base font-light"
              >
                Resume
              </Link>
              <Link
                href="https://www.linkedin.com/in/young-in-sa-921b32176/"
                className="footer-link text-base font-light"
              >
                LinkedIn
              </Link>
              <Link href="https://dribbble.com/youngsah" className="footer-link text-base font-light">
                Dribbble
              </Link>
              <Link href="#" className="footer-link text-base font-light">
                Email
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <p className="text-center text-sm font-light text-muted-foreground">
            © 2025 SA YOUNG IN. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
