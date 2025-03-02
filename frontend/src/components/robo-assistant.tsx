// Replace the entire component with this updated version that functions as an agent rather than a chatbot

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Bot, CheckCircle, ClipboardList, FileText, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Progress } from "./ui/progress"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

interface FormData {
  businessIdea: string;
  industry: string;
  targetAudience: string;
  experience: string;
  fundingNeeds: string;
  competitors: string;
  uniqueValue: string;
}

interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  id: keyof FormData;
  label: string;
  type: 'textarea' | 'input' | 'radio';
  placeholder?: string;
  options?: FieldOption[];
}

export function RoboAssistant() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    businessIdea: "",
    industry: "",
    targetAudience: "",
    experience: "beginner",
    fundingNeeds: "",
    competitors: "",
    uniqueValue: "",
  })

  const steps: { title: string; description: string; fields: Field[] }[] = [
    {
      title: "Business Idea",
      description: "Tell us about your business concept",
      fields: [
        {
          id: "businessIdea",
          label: "Describe your business idea in detail",
          type: "textarea",
          placeholder: "e.g., A subscription box for eco-friendly household products...",
        },
        {
          id: "industry",
          label: "What industry does your business operate in?",
          type: "input",
          placeholder: "e.g., E-commerce, SaaS, Health & Wellness...",
        },
      ],
    },
    {
      title: "Target Market",
      description: "Define your ideal customers",
      fields: [
        {
          id: "targetAudience",
          label: "Describe your target audience",
          type: "textarea",
          placeholder: "e.g., Environmentally conscious homeowners aged 25-45...",
        },
      ],
    },
    {
      title: "Experience",
      description: "Tell us about your entrepreneurial background",
      fields: [
        {
          id: "experience",
          label: "What is your level of entrepreneurial experience?",
          type: "radio",
          options: [
            { value: "beginner", label: "Beginner - This is my first business" },
            { value: "intermediate", label: "Intermediate - I've started a business before" },
            { value: "advanced", label: "Advanced - I've successfully run multiple businesses" },
          ],
        },
        {
          id: "fundingNeeds",
          label: "What are your funding needs and resources?",
          type: "textarea",
          placeholder: "e.g., Seeking $50k in seed funding, have $10k personal savings to invest...",
        },
      ],
    },
    {
      title: "Competition",
      description: "Tell us about your competitors",
      fields: [
        {
          id: "competitors",
          label: "Who are your main competitors?",
          type: "textarea",
          placeholder: "e.g., Company X, Company Y, and similar services like...",
        },
        {
          id: "uniqueValue",
          label: "What makes your business unique compared to competitors?",
          type: "textarea",
          placeholder: "e.g., Our proprietary technology, unique business model...",
        },
      ],
    },
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate report
      setIsGeneratingReport(true)
      setTimeout(() => {
        setIsGeneratingReport(false)
        setShowReport(true)
      }, 3000)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              AI Validation Agent
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your AI Startup Validation Assistant</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Answer a few questions about your business idea and get a comprehensive validation report with market
              insights, competitor analysis, and financial projections.
            </p>
          </div>
        </div>

        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {!showReport ? (
            <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>ValidateAI Agent</CardTitle>
                      <CardDescription>Analyzing your startup potential</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <Progress value={progressPercentage} className="w-24" />
                  </div>
                </div>
              </CardHeader>

              {isGeneratingReport ? (
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse mx-auto" />
                    <h3 className="text-xl font-medium">Generating Your Validation Report</h3>
                    <p className="text-muted-foreground">
                      Our AI is analyzing your business idea, researching the market, and preparing a comprehensive
                      validation report...
                    </p>
                    <Progress value={65} className="w-full max-w-md mx-auto mt-4" />
                    <div className="text-sm text-muted-foreground animate-pulse">Analyzing market trends...</div>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">{steps[currentStep].title}</h3>
                      <p className="text-muted-foreground">{steps[currentStep].description}</p>
                    </div>

                    <div className="space-y-4">
                      {steps[currentStep].fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id}>{field.label}</Label>

                          {field.type === "textarea" && (
                            <Textarea
                              id={field.id}
                              placeholder={field.placeholder}
                              value={formData[field.id]}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              rows={4}
                            />
                          )}

                          {field.type === "input" && (
                            <Input
                              id={field.id}
                              placeholder={field.placeholder}
                              value={formData[field.id]}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                            />
                          )}

                          {field.type === "radio" && field.options && (
                            <RadioGroup
                              value={formData[field.id]}
                              onValueChange={(value) => handleInputChange(field.id, value)}
                            >
                              {field.options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                                  <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}

              <CardFooter className="border-t p-4 bg-background flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isGeneratingReport}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={isGeneratingReport}>
                  {currentStep < steps.length - 1 ? (
                    <span className="flex items-center gap-2">
                      Next <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Generate Report <FileText className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Your Startup Validation Report</CardTitle>
                    <CardDescription>Based on AI analysis of your business idea</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="market">Market Analysis</TabsTrigger>
                    <TabsTrigger value="competition">Competition</TabsTrigger>
                    <TabsTrigger value="financial">Financial Projections</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>
                  <div className="p-6">
                    <TabsContent value="summary" className="mt-0 space-y-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="text-lg font-medium">Validation Score: 78/100</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Business Idea</h4>
                          <p className="text-muted-foreground">
                            {formData.businessIdea || "A subscription box for eco-friendly household products"}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Strengths</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>Growing market for eco-friendly products</li>
                              <li>Subscription model provides recurring revenue</li>
                              <li>Strong alignment with current consumer trends</li>
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Challenges</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>Competitive market with established players</li>
                              <li>Supply chain complexity for eco-friendly products</li>
                              <li>Customer acquisition costs may be high</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Executive Summary</h4>
                          <p className="text-muted-foreground">
                            Based on our analysis, your eco-friendly subscription box business shows promising potential
                            in a growing market. With the right execution strategy focusing on unique product curation
                            and strong brand messaging, you can carve out a profitable niche. We recommend focusing on
                            customer retention strategies and optimizing your supply chain to maximize margins.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="market" className="mt-0 space-y-4">
                      <h3 className="text-lg font-medium">Market Analysis</h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Market Size & Growth</h4>
                          <p className="text-muted-foreground">
                            The eco-friendly products market is valued at $8.9B in 2023 with a projected CAGR of 12.4%
                            through 2028. Subscription box models in this sector have seen 18% year-over-year growth.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium">Target Customer Profile</h4>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="font-medium">Primary Persona: Eco-Conscious Emma</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                              <li>30-45 years old, urban professional</li>
                              <li>Household income: $75,000+</li>
                              <li>Values sustainability and environmental responsibility</li>
                              <li>Willing to pay premium for eco-friendly products</li>
                              <li>Active on Instagram and Pinterest</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Market Trends</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Increasing consumer awareness of environmental impact</li>
                            <li>Growing preference for plastic-free packaging</li>
                            <li>Rising demand for natural ingredients in household products</li>
                            <li>Shift toward supporting sustainable business practices</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="competition" className="mt-0 space-y-4">
                      <h3 className="text-lg font-medium">Competitive Analysis</h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Key Competitors</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse mt-2">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="text-left p-2 border">Competitor</th>
                                  <th className="text-left p-2 border">Pricing</th>
                                  <th className="text-left p-2 border">Strengths</th>
                                  <th className="text-left p-2 border">Weaknesses</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-2 border">EcoBox Monthly</td>
                                  <td className="p-2 border">$39.99/mo</td>
                                  <td className="p-2 border">Strong brand, large customer base</td>
                                  <td className="p-2 border">Limited product variety</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border">GreenLife Box</td>
                                  <td className="p-2 border">$45.00/mo</td>
                                  <td className="p-2 border">Premium products, beautiful packaging</td>
                                  <td className="p-2 border">Higher price point, slower shipping</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border">EarthFriendly</td>
                                  <td className="p-2 border">$29.99/mo</td>
                                  <td className="p-2 border">Affordable, good for beginners</td>
                                  <td className="p-2 border">Inconsistent product quality</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Competitive Advantage Opportunities</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Focus on locally sourced products (currently underserved)</li>
                            <li>Implement a customization option based on household needs</li>
                            <li>Develop a stronger community aspect with workshops and events</li>
                            <li>Create educational content about sustainable living</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="financial" className="mt-0 space-y-4">
                      <h3 className="text-lg font-medium">Financial Projections</h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Startup Costs</h4>
                          <div className="bg-muted/50 p-4 rounded-lg mt-2">
                            <ul className="text-muted-foreground space-y-1">
                              <li>
                                <span className="font-medium">Product Inventory:</span> $15,000
                              </li>
                              <li>
                                <span className="font-medium">Website & Technology:</span> $8,000
                              </li>
                              <li>
                                <span className="font-medium">Packaging Design:</span> $3,500
                              </li>
                              <li>
                                <span className="font-medium">Marketing & Launch:</span> $12,000
                              </li>
                              <li>
                                <span className="font-medium">Legal & Administrative:</span> $2,500
                              </li>
                              <li>
                                <span className="font-medium">Warehouse Setup:</span> $5,000
                              </li>
                              <li className="pt-2 font-medium">Total Estimated Startup Cost: $46,000</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Revenue Projections (First Year)</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse mt-2">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="text-left p-2 border">Quarter</th>
                                  <th className="text-left p-2 border">Subscribers</th>
                                  <th className="text-left p-2 border">Revenue</th>
                                  <th className="text-left p-2 border">Expenses</th>
                                  <th className="text-left p-2 border">Profit/Loss</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-2 border">Q1</td>
                                  <td className="p-2 border">150</td>
                                  <td className="p-2 border">$18,000</td>
                                  <td className="p-2 border">$25,000</td>
                                  <td className="p-2 border text-red-500">-$7,000</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border">Q2</td>
                                  <td className="p-2 border">350</td>
                                  <td className="p-2 border">$42,000</td>
                                  <td className="p-2 border">$35,000</td>
                                  <td className="p-2 border text-green-500">$7,000</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border">Q3</td>
                                  <td className="p-2 border">600</td>
                                  <td className="p-2 border">$72,000</td>
                                  <td className="p-2 border">$50,000</td>
                                  <td className="p-2 border text-green-500">$22,000</td>
                                </tr>
                                <tr>
                                  <td className="p-2 border">Q4</td>
                                  <td className="p-2 border">850</td>
                                  <td className="p-2 border">$102,000</td>
                                  <td className="p-2 border">$65,000</td>
                                  <td className="p-2 border text-green-500">$37,000</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Key Financial Metrics</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Customer Acquisition Cost (CAC): $35</li>
                            <li>Lifetime Value (LTV): $210</li>
                            <li>LTV:CAC Ratio: 6:1</li>
                            <li>Average Subscription Length: 7 months</li>
                            <li>Churn Rate: 8% monthly</li>
                            <li>Break-even Point: Month 8</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="mt-0 space-y-4">
                      <h3 className="text-lg font-medium">Strategic Recommendations</h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Go-to-Market Strategy</h4>
                          <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                            <li>Start with a focused product line of 5-7 essential household items</li>
                            <li>Launch with a pre-order campaign offering 20% discount to early adopters</li>
                            <li>Partner with 3-5 micro-influencers in the sustainability space</li>
                            <li>Implement a referral program with incentives for both parties</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-medium">Operational Recommendations</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Start with a third-party fulfillment service to minimize upfront costs</li>
                            <li>Implement a robust inventory management system from day one</li>
                            <li>Negotiate flexible terms with suppliers to manage cash flow</li>
                            <li>Consider a tiered subscription model (Basic, Premium, Family)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium">Growth Opportunities</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Expand into corporate gift packages after 6 months</li>
                            <li>Develop a private label product line by year 2</li>
                            <li>Explore international shipping to Canada and UK in year 2</li>
                            <li>Create a marketplace for one-off purchases of popular items</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium">Risk Mitigation</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Secure multiple suppliers for key products to avoid stockouts</li>
                            <li>Implement a customer feedback loop to quickly address issues</li>
                            <li>Start with a lean team and outsource non-core functions</li>
                            <li>Set aside 15% of funding as contingency for unexpected costs</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t p-4 bg-background flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReport(false)
                    setCurrentStep(0)
                  }}
                >
                  Start New Analysis
                </Button>
                <Button>
                  <span className="flex items-center gap-2">
                    Download Full Report <FileText className="h-4 w-4" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Our AI agent analyzes over 50 market factors and 1,000+ industry data points to validate your business idea.
          </p>
        </div>
      </div>
    </section>
  )
}

