"use client"
import { motion } from "framer-motion"
import { Brain, DollarSign, Search, Target, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function Features() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Idea Validation",
      description: "AI-powered analysis to validate your business concept and identify potential pitfalls.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Market Research",
      description: "Comprehensive market analysis to identify trends, opportunities, and target audience.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Competitor Analysis",
      description: "Detailed insights into your competitors' strengths, weaknesses, and market positioning.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Financial Projections",
      description: "Generate realistic financial forecasts based on market data and industry benchmarks.",
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Customer Persona",
      description: "Create detailed customer personas to better understand your target audience.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Growth Strategy",
      description: "Develop a data-driven growth strategy tailored to your business model.",
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need to Validate Your Startup
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered platform provides comprehensive tools to validate your business idea from every angle.
            </p>
          </div>
        </div>
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

