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
import { validateStartup, ValidationResponse } from '../lib/api'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FormData {
  businessIdea: string;
  experience: string;
  entrepreneurshipExperience: string;
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
    experience: "beginner",
    entrepreneurshipExperience: "",
  })
  const [validationResult, setValidationResult] = useState<ValidationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const steps: { title: string; description: string; fields: Field[] }[] = [
    {
      title: "Business Idea",
      description: "Tell us about your business concept",
      fields: [
        {
          id: "businessIdea",
          label: "Describe your business idea in 1-2 sentences",
          type: "textarea",
          placeholder: "e.g., A subscription box for eco-friendly household products...",
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
          id: "entrepreneurshipExperience",
          label: "Tell us more about your background - tech, non-tech, etc.",
          type: "textarea",
          placeholder: "e.g., Ex Startup Founder, Ex SWE at Google, MBA at Harvard, etc.",
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
      handleGenerateReport()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  const handleGenerateReport = async () => {
    console.log('Starting report generation...');
    setIsGeneratingReport(true);
    setError(null);

    try {
      const fullBackground = `Experience Level: ${formData.experience}. Additional Background: ${formData.entrepreneurshipExperience}`;
      console.log('Prepared background:', fullBackground);
      
      console.log('Calling validation API...');
      const result = await validateStartup(formData.businessIdea, fullBackground);
      console.log('Received validation result:', result);
      
      if (!result?.startup_validation_report) {
        throw new Error('Invalid response format from API');
      }
      
      setValidationResult(result);
      setShowReport(true);
    } catch (err) {
      console.error('Error generating report:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setIsGeneratingReport(false);
      console.log('Report generation process completed');
    }
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative">
      <div className="container relative w-full max-w-[1800px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-4 py-1.5 text-base text-primary">
              AI Validation Agent
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">Your AI Startup Validation Assistant</h2>
            <p className="max-w-[900px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Answer a few questions about your business idea and get a comprehensive validation report with market
              insights, competitor analysis, and financial projections.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-16">
          <motion.div
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {!showReport ? (
              <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
                <CardHeader className="bg-primary/5 border-b p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 p-2.5 rounded-full">
                        <Bot className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">ValidateAI Agent</CardTitle>
                        <CardDescription className="text-base">Analyzing your startup potential</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {steps.length}
                      </span>
                      <Progress value={progressPercentage} className="w-24" />
                    </div>
                  </div>
                </CardHeader>

                {isGeneratingReport ? (
                  <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-6">
                      <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0">
                          <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bot className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium">Generating Your Validation Report</h3>
                      <div className="space-y-2 max-w-md mx-auto">
                        <p className="text-base text-muted-foreground">
                          Our AI is analyzing your business idea and preparing a comprehensive validation report...
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-primary animate-pulse">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                          </span>
                          Analyzing market trends
                        </div>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{steps[currentStep].title}</h3>
                        <p className="text-lg text-muted-foreground">{steps[currentStep].description}</p>
                      </div>

                      <div className="space-y-5">
                        {steps[currentStep].fields.map((field) => (
                          <div key={field.id} className="space-y-3">
                            <Label htmlFor={field.id} className="text-lg font-bold block">{field.label}</Label>

                            {field.type === "textarea" && (
                              <Textarea
                                id={field.id}
                                placeholder={field.placeholder}
                                value={formData[field.id]}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                rows={4}
                                className="text-lg"
                              />
                            )}

                            {field.type === "input" && (
                              <Input
                                id={field.id}
                                placeholder={field.placeholder}
                                value={formData[field.id]}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className="text-lg h-12"
                              />
                            )}

                            {field.type === "radio" && field.options && (
                              <RadioGroup
                                value={formData[field.id]}
                                onValueChange={(value) => handleInputChange(field.id, value)}
                                className="space-y-0"
                              >
                                {field.options.map((option) => (
                                  <div key={option.value} className="flex items-center space-x-4">
                                    <RadioGroupItem 
                                      value={option.value} 
                                      id={`${field.id}-${option.value}`} 
                                      className="h-6 w-6 border-2 border-primary/50 data-[state=checked]:border-primary data-[state=checked]:border-4"
                                    />
                                    <Label htmlFor={`${field.id}-${option.value}`} className="text-lg">{option.label}</Label>
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
                  <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isGeneratingReport} className="text-base h-10 px-4">
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={isGeneratingReport} className="text-base h-10 px-4">
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
                <CardHeader className="bg-primary/5 border-b py-5">
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
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="market">Market Analysis</TabsTrigger>
                      <TabsTrigger value="competition">Competition</TabsTrigger>
                      <TabsTrigger value="financials">Financials</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4 space-y-4 px-6">
                      {validationResult?.startup_validation_report && (
                        <>
                          <div>
                            <h3 className="text-lg font-medium">Viability Score</h3>
                            <div className="mt-2">
                              <div className="text-3xl font-bold text-primary">
                                {validationResult.startup_validation_report.viability_score?.overall_score || 0}/100
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h4 className="font-medium mb-3">Scoring Weights</h4>
                              <div className="flex h-4 w-full rounded-full overflow-hidden">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="bg-primary/90 w-[30%]" />
                                    <TooltipContent>
                                      <p>Market Demand: 30%</p>
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger className="bg-primary/70 w-[25%]" />
                                    <TooltipContent>
                                      <p>Competitive Landscape: 25%</p>
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger className="bg-primary/50 w-[25%]" />
                                    <TooltipContent>
                                      <p>Financial Viability: 25%</p>
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger className="bg-primary/30 w-[10%]" />
                                    <TooltipContent>
                                      <p>Scalability: 10%</p>
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger className="bg-primary/20 w-[10%]" />
                                    <TooltipContent>
                                      <p>Risk Factors: 10%</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-primary/90" />
                                  <span>Market Demand</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                                  <span>Competition</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-primary/50" />
                                  <span>Financial</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                                  <span>Scalability</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                                  <span>Risk</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {Object.entries(validationResult.startup_validation_report.viability_score?.breakdown || {}).map(([key, value]) => (
                                <div key={key} className="space-y-2">
                                  <h4 className="font-medium capitalize">{key.replace('_', ' ')}</h4>
                                  <div className="flex items-center">
                                    <span className="text-primary font-medium">{value.score}/100</span>
                                  </div>
                                  <p className="text-muted-foreground">{value.explanation}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="market" className="mt-4 space-y-4 px-6">
                      {validationResult?.startup_validation_report && (
                        <>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-medium">Market Analysis</h3>
                              <div className="mt-4 space-y-6">
                                <div className="grid gap-4">
                                  <div>
                                    <h4 className="font-medium text-muted-foreground text-primary">Industry Overview</h4>
                                    <ul className="mt-2 space-y-2">
                                      <li><strong className="">Industry Size:</strong> {validationResult.startup_validation_report.market_analysis.industry_size}</li>
                                      <li><strong>Growth Trends:</strong> {validationResult.startup_validation_report.market_analysis.growth_trends}</li>
                                      <li><strong>Market Saturation:</strong> {validationResult.startup_validation_report.market_analysis.market_saturation_level}</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-muted-foreground text-primary">Customer Analysis</h4>
                                    <ul className="mt-2 space-y-2">
                                      <li><strong>Target Customers:</strong> {validationResult.startup_validation_report.market_analysis.target_customers}</li>
                                      <li><strong>Pain Points:</strong> {validationResult.startup_validation_report.market_analysis.customer_pain_points}</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-muted-foreground text-primary">Market Dynamics</h4>
                                    <ul className="mt-2 space-y-2">
                                      <li><strong>Key Market Shifts:</strong> {validationResult.startup_validation_report.market_analysis.key_market_shifts}</li>
                                      <li><strong>Distribution Channels:</strong> {validationResult.startup_validation_report.market_analysis.distribution_channels}</li>
                                      <li><strong>Regulatory Environment:</strong> {validationResult.startup_validation_report.market_analysis.regulatory_environment}</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-muted-foreground text-primary">Future Outlook</h4>
                                    <ul className="mt-2 space-y-2">
                                      <li><strong>Emerging Opportunities:</strong> {validationResult.startup_validation_report.market_analysis.emerging_opportunities}</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="competition" className="mt-4 space-y-4 px-6">
                      {validationResult?.startup_validation_report && (
                        <>
                          <div>
                          <h3 className="text-lg font-medium">Similar Companies Analysis</h3>
                            <div className="mt-4 space-y-6">
                              {validationResult.startup_validation_report.similar_companies.map((company, index) => (
                                <div key={index} className="border p-6 rounded-lg bg-card">
                                  <div className="flex justify-between items-start">
                                    <h5 className="text-xl font-semibold">{company.company_name}</h5>
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                      {company.similarity_score}% Similar
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 grid gap-4">
                                    <div>
                                      <h6 className="font-medium text-muted-foreground">Unique Selling Points</h6>
                                      <p className="mt-1">{company.key_features.unique_selling_points}</p>
                                    </div>
                                    
                                    <div>
                                      <h6 className="font-medium text-muted-foreground">Strengths</h6>
                                      <p className="mt-1">{company.key_features.strengths}</p>
                                    </div>
                                    
                                    <div>
                                      <h6 className="font-medium text-muted-foreground">Challenges</h6>
                                      <p className="mt-1">{company.key_features.challenges}</p>
                                    </div>
                                    
                                    <div>
                                      <h6 className="font-medium text-muted-foreground">Comparison to Your Idea</h6>
                                      <p className="mt-1">{company.comparison_to_business_idea}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-8">
                            <h4 className="font-medium">Competitive Landscape Summary</h4>
                            <div className="mt-2">
                              <p>{validationResult.startup_validation_report.viability_score.breakdown.competitive_landscape.explanation}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="financials" className="mt-4 space-y-4 px-6">
                      {validationResult?.startup_validation_report && (
                        <>
                          <div>
                          <h3 className="text-lg font-medium">Startup Costs</h3>
                            <div className="mt-2">
                              {Object.entries(validationResult.startup_validation_report.financial_projections.startup_costs).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-1">
                                  <span className="capitalize">{key.replace('_', ' ')}:</span>
                                  <span className="text-primary font-medium">${value.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Key Financial Metrics</h4>
                            <div className="mt-2">
                              <p>CAC: <span className="">${validationResult.startup_validation_report.financial_projections.key_financial_metrics.customer_acquisition_cost}</span></p>
                              <p>LTV: ${validationResult.startup_validation_report.financial_projections.key_financial_metrics.lifetime_value}</p>
                              <p>Churn Rate: {validationResult.startup_validation_report.financial_projections.key_financial_metrics.churn_rate}%</p>
                              <p>Average Subscription Length: {validationResult.startup_validation_report.financial_projections.key_financial_metrics.average_subscription_length} months</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Break Even Analysis</h4>
                            <div className="mt-2">
                              <p>Time to Profitability: {validationResult.startup_validation_report.financial_projections.break_even_point.time_to_profitability}</p>
                              <p>Revenue at Break Even: ${validationResult.startup_validation_report.financial_projections.break_even_point.total_revenue_at_breakeven.toLocaleString()}</p>
                              <p>Expenses at Break Even: ${validationResult.startup_validation_report.financial_projections.break_even_point.total_expenses_at_breakeven.toLocaleString()}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="recommendations" className="mt-4 space-y-4 px-6">
                      {validationResult?.startup_validation_report && (
                        <>
                          <h3 className="text-lg font-medium ">Strategic Recommendations</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-primary">Market Positioning</h4>
                              <p className="mt-1 text-muted-foreground">
                                {validationResult.startup_validation_report.actionable_recommendations.market_positioning}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-primary">Financial Improvements</h4>
                              <p className="mt-1 text-muted-foreground">
                                {validationResult.startup_validation_report.actionable_recommendations.financial_improvements}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-primary">Risk Mitigation</h4>
                              <p className="mt-1 text-muted-foreground">
                                {validationResult.startup_validation_report.actionable_recommendations.risk_mitigation}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-primary">Growth Strategy</h4>
                              <p className="mt-1 text-muted-foreground">
                                {validationResult.startup_validation_report.actionable_recommendations.growth_strategy}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>
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
      </div>
    </section>
  )
}
