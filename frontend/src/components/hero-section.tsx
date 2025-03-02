"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight, FileText, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm w-fit mb-6">
              <span className="font-medium">Introducing ValidateAI</span>
            </div>

            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Validate Your Startup Idea with <span className="text-primary">AI-Powered Reports</span>
            </motion.h1>

            <motion.p
              className="max-w-[600px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stop guessing. Start validating. Our AI agent analyzes your business idea and generates comprehensive
              reports with market insights, competitor analysis, and financial projections.
            </motion.p>

            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Your Report
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  />
                </span>
                <span
                  className={`absolute inset-0 bg-primary/20 transition-transform duration-300 ${isHovered ? "translate-x-0" : "-translate-x-full"}`}
                ></span>
              </Button>
              <Button variant="outline" size="lg">
                <span className="flex items-center gap-2">
                  Watch Demo <ChevronRight className="h-4 w-4" />
                </span>
              </Button>
            </div>

            <div className="flex items-center space-x-4 mt-6">
              <div className="flex -space-x-2">
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="/placeholder.svg?height=32&width=32"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="/placeholder.svg?height=32&width=32"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="/placeholder.svg?height=32&width=32"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">2,000+</span> entrepreneurs
              </div>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden border bg-background/50 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/20"></div>
              <div className="absolute top-0 left-0 right-0 h-12 bg-background/90 border-b flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm font-medium">ValidateAI Report Generator</div>
              </div>
              <div className="pt-16 p-6 h-full flex flex-col">
                <div className="flex-1 space-y-4">
                  <div className="bg-muted/50 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Tell me about your business idea so I can validate it for you.</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-sm">I want to launch a subscription box for eco-friendly products.</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">
                      Great! Let me ask you a few questions to generate a comprehensive validation report...
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Generating Validation Report</span>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

