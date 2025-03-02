"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"

export function PricingSection() {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for testing the waters",
      price: annual ? 19 : 29,
      features: [
        "Basic idea validation",
        "Limited market research",
        "5 competitor analyses per month",
        "Basic financial projections",
        "Email support",
      ],
      popular: false,
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      description: "For serious entrepreneurs",
      price: annual ? 49 : 69,
      features: [
        "Advanced idea validation",
        "Comprehensive market research",
        "Unlimited competitor analyses",
        "Detailed financial projections",
        "Customer persona creation",
        "Growth strategy recommendations",
        "Priority support",
      ],
      popular: true,
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "For established businesses",
      price: annual ? 99 : 129,
      features: [
        "Everything in Pro",
        "Custom market research",
        "Industry-specific insights",
        "Advanced financial modeling",
        "Multiple business ideas",
        "Dedicated account manager",
        "API access",
      ],
      popular: false,
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container relative w-full max-w-[1800px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-4 py-1.5 text-base text-primary">Pricing</div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">Choose the Right Plan for Your Journey</h2>
            <p className="max-w-[900px] text-xl text-muted-foreground md:text-2xl">
              Flexible options to support you at every stage of your entrepreneurial journey.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <Label htmlFor="billing-toggle" className={!annual ? "text-foreground" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={annual} onCheckedChange={setAnnual} />
            <Label htmlFor="billing-toggle" className={annual ? "text-foreground" : "text-muted-foreground"}>
              Annual <span className="text-xs text-primary">(Save 20%)</span>
            </Label>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.popular ? "Get Started" : "Choose Plan"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}

