"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight, FileText, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container relative w-full max-w-[1800px]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
          <div className="flex flex-col justify-center space-y-6 py-8 lg:py-12">
            <div className="inline-block rounded-lg bg-muted px-4 py-1.5 text-base w-fit mb-6">
              <span className="font-medium">Introducing InnovaAI</span>
            </div>

            <motion.h1
              className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Validate Your Startup Idea with <span className="text-primary">InnovaAI's Agents</span>
            </motion.h1>

            <motion.p
              className="max-w-[700px] text-xl text-muted-foreground md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stop guessing. Start validating. InnovaAI's advanced agents analyze your business idea and generates comprehensive
              reports with market insights, competitor analysis, and financial projections.
            </motion.p>

            <div className="flex flex-col gap-3 min-[400px]:flex-row mt-10">
              <Button
                size="lg"
                className="group relative overflow-hidden text-lg h-14 px-8"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Your Report
                  <ArrowRight
                    className={`h-6 w-6 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  />
                </span>
                <span
                  className={`absolute inset-0 bg-primary/20 transition-transform duration-300 ${isHovered ? "translate-x-0" : "-translate-x-full"}`}
                ></span>
              </Button>
              <Button variant="outline" size="lg" className="text-lg h-14 px-8">
                <span className="flex items-center gap-2">
                  Watch Demo <ChevronRight className="h-6 w-6" />
                </span>
              </Button>
            </div>

            <div className="flex items-center space-x-4 mt-10">
              <div className="flex -space-x-3">
                
              </div>
              
            </div>
          </div>


          <motion.div
            className="flex items-center justify-center lg:h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[700px] aspect-[16/10] rounded-xl overflow-hidden border bg-background/50 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/20"></div>
              <div className="absolute top-0 left-0 right-0 h-16 bg-background/90 border-b flex items-center px-6">
                <div className="flex space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-base font-medium">InnovaAI Report Generator</div>
              </div>
              <div className="pt-20 p-8 h-full flex flex-col">
                <div className="flex-1 space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg max-w-[80%]">
                    <p className="text-base md:text-lg">Tell me about your business idea so I can validate it for you.</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-base md:text-lg">I want to launch a subscription box for eco-friendly products.</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg max-w-[80%]">
                    <p className="text-base md:text-lg">
                      Great! Let me ask you a few questions to generate a comprehensive validation report...
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-base md:text-lg font-medium">Generating Validation Report</span>
                  </div>
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

