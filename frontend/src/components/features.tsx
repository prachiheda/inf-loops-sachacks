"use client"

import { motion } from "framer-motion"
import { Brain, DollarSign, Search, Target, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: <Brain className="h-11 w-11 text-primary" />,
      title: "Idea Validation",
      description: "AI-powered analysis to validate your business concept and identify potential pitfalls using our Business Analyst agent.",
    },
    {
      icon: <Search className="h-11 w-11 text-primary" />,
      title: "Market Research",
      description: "Comprehensive market analysis by our Market Researcher agent to identify trends, opportunities, and target audience.",
    },
    {
      icon: <Users className="h-11 w-11 text-primary" />,
      title: "Competitor Analysis",
      description: "Detailed insights into your competitors' strengths, weaknesses, and market positioning from our Market Researcher agent.",
    },
    {
      icon: <DollarSign className="h-11 w-11 text-primary" />,
      title: "Financial Projections",
      description: "Generate realistic financial forecasts based on market data and industry benchmarks using our Financial Forecaster agent.",
    },
    {
      icon: <Target className="h-11 w-11 text-primary" />,
      title: "Customer Persona",
      description: "Create detailed customer personas to better understand your target audience, powered by our Market Researcher insights.",
    },
    {
      icon: <TrendingUp className="h-11 w-11 text-primary" />,
      title: "Growth Strategy",
      description: "Develop a data-driven growth strategy tailored to your business model, combining insights from all our AI agents.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="w-full py-14 md:py-20 lg:py-28 bg-muted/30">
      <div className="container px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3.5 py-1.5 text-base text-primary font-medium">Features</div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Everything You Need to Validate Your Startup
            </h2>
            <p className="max-w-[800px] mx-auto text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Our AI-powered platform provides comprehensive tools to validate your business idea from every angle, powered by specialized AI agents.
            </p>
          </div>
        </div>
        <motion.div
          className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-14"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full max-w-sm mx-auto transition-all hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="pb-2 p-6">
                  <div className="p-2.5 w-fit rounded-lg bg-primary/10 mb-5">{feature.icon}</div>
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-xl text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Powered by our trio of AI agents: Business Analyst, Market Researcher, and Financial Forecaster
          </p>
        </div>
      </div>
    </section>
  )
}

