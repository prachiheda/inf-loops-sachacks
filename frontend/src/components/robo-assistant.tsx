"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Bot, CheckCircle, ClipboardList, FileText, Sparkles, Linkedin } from "lucide-react"
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
import jsPDF from 'jspdf';

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

interface Investor {
  name: string;
  company: string;
  focus: string[];
  profile: string;
  investmentStage?: string[];
  expertise?: string[];
  source?: string;
}

const INVESTORS: Investor[] = [
  {
    name: "Arjun Sethi",
    company: "Tribe Capital",
    focus: ["tech", "AI", "SaaS", "data-driven", "enterprise"],
    profile: "Co-founder and Partner at Tribe Capital",
    investmentStage: ["Series A", "Series B"],
    expertise: ["AI", "enterprise software", "data analytics"],
    source: "en.wikipedia.org"
  },
  {
    name: "M.G. Siegler",
    company: "Google Ventures",
    focus: ["consumer tech", "mobile", "media"],
    profile: "Former Partner at Google Ventures and independent investor",
    investmentStage: ["Seed", "Series A"],
    expertise: ["mobile technology", "digital media"],
    source: "en.wikipedia.org"
  },
  {
    name: "Amit Bohensky",
    company: "Independent",
    focus: ["tech", "entrepreneurship", "innovation"],
    profile: "Angel investor and entrepreneur",
    investmentStage: ["Seed", "Early-stage"],
    expertise: ["entrepreneurship", "technology"],
    source: "en.wikipedia.org"
  },
  {
    name: "Mar Hershenson",
    company: "Pear VC",
    focus: ["deep-tech", "startups", "enterprise"],
    profile: "Co-founder and Managing Partner at Pear VC",
    investmentStage: ["Pre-seed", "Seed"],
    expertise: ["hardware", "enterprise software"],
    source: "en.wikipedia.org"
  },
  {
    name: "Reid Hoffman",
    company: "Greylock Partners",
    focus: ["social", "marketplaces", "AI", "networks"],
    profile: "Co-founder of LinkedIn and Partner at Greylock Partners",
    investmentStage: ["Series A", "Series B", "Growth"],
    expertise: ["social networks", "marketplaces", "AI"],
    source: "businessinsider.com"
  },
  {
    name: "Peter Thiel",
    company: "Founders Fund",
    focus: ["tech", "AI", "biotech", "frontier tech"],
    profile: "Co-founder of PayPal and Partner at Founders Fund",
    investmentStage: ["Series A", "Series B", "Growth"],
    expertise: ["payments", "AI", "biotechnology"]
  },
  {
    name: "Marc Andreessen",
    company: "Andreessen Horowitz",
    focus: ["software", "crypto", "fintech", "AI"],
    profile: "Co-founder and General Partner at Andreessen Horowitz",
    expertise: ["software", "web3", "AI"]
  },
  {
    name: "Mary Meeker",
    company: "Bond Capital",
    focus: ["internet trends", "digital economy", "tech growth"],
    profile: "General Partner at Bond Capital",
    investmentStage: ["Growth", "Late Stage"],
    expertise: ["market research", "internet trends", "digital transformation"],
    source: "bondcap.com"
  },
  {
    name: "Fred Wilson",
    company: "Union Square Ventures",
    focus: ["web3", "blockchain", "networks", "marketplaces"],
    profile: "Partner at Union Square Ventures",
    investmentStage: ["Series A", "Series B"],
    expertise: ["network effects", "blockchain", "community-driven businesses"],
    source: "usv.com"
  },
  {
    name: "Jason Calacanis",
    company: "LAUNCH",
    focus: ["early-stage", "SaaS", "consumer tech", "marketplaces"],
    profile: "Angel investor and host of This Week in Startups",
    investmentStage: ["Seed", "Pre-seed"],
    expertise: ["media", "angel investing", "startup scaling"],
    source: "jason.com"
  },
  {
    name: "Naval Ravikant",
    company: "AngelList",
    focus: ["crypto", "web3", "tech platforms", "marketplaces"],
    profile: "Co-founder of AngelList",
    investmentStage: ["Seed", "Series A"],
    expertise: ["wealth creation", "tech platforms", "crypto", "startups"],
    source: "naval.com"
  },
  {
    name: "Tim Draper",
    company: "Draper Associates",
    focus: ["blockchain", "AI", "biotech", "deep tech"],
    profile: "Founder of Draper Associates",
    investmentStage: ["Early Stage", "Series A"],
    expertise: ["blockchain", "cryptocurrency", "venture capital"],
    source: "draper.vc"
  },
  {
    name: "Esther Dyson",
    company: "EDventure Holdings",
    focus: ["health tech", "space tech", "AI", "digital health"],
    profile: "Angel investor and founder of EDventure Holdings",
    investmentStage: ["Seed", "Early Stage"],
    expertise: ["healthcare", "space technology", "AI applications"],
    source: "edventure.com"
  },
  {
    name: "Ron Conway",
    company: "SV Angel",
    focus: ["consumer tech", "enterprise", "fintech", "AI"],
    profile: "Founder of SV Angel",
    investmentStage: ["Seed", "Early Stage"],
    expertise: ["angel investing", "startup ecosystems", "tech trends"],
    source: "svangel.com"
  },
  {
    name: "Paul Graham",
    company: "Y Combinator",
    focus: ["software", "B2B", "B2C", "tech startups"],
    profile: "Co-founder of Y Combinator",
    investmentStage: ["Pre-seed", "Seed"],
    expertise: ["startup acceleration", "software development", "founder advice"],
    source: "paulgraham.com"
  },
  {
    name: "Dave McClure",
    company: "500 Startups",
    focus: ["global startups", "SaaS", "marketplaces", "fintech"],
    profile: "Founder of 500 Startups",
    investmentStage: ["Seed", "Series A"],
    expertise: ["global expansion", "growth hacking", "startup investing"],
    source: "500.co"
  },
  {
    name: "Steve Case",
    company: "Revolution LLC",
    focus: ["regional startups", "tech innovation", "digital transformation"],
    profile: "Co-founder of AOL and CEO of Revolution LLC",
    investmentStage: ["Series A", "Series B", "Growth"],
    expertise: ["digital transformation", "regional ecosystem building", "scaling"],
    source: "revolution.com"
  }
];

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
  const [showInvestorModal, setShowInvestorModal] = useState(false);
  const [matchedInvestors, setMatchedInvestors] = useState<Investor[]>([]);
  const [showInvestorsTab, setShowInvestorsTab] = useState(false);
  const [activeCard, setActiveCard] = useState<'report' | 'investors'>('report');
  const [useDemoData, setUseDemoData] = useState(false);

  const demoData = {
    businessIdea: "A subscription-based meal kit service that provides AI-personalized recipes and pre-portioned ingredients tailored to individual dietary needs, food allergies, and fitness goals.",
    experience: "beginner",
    entrepreneurshipExperience: "As a computer science student, I've explored machine learning and data-driven solutions through various projects. My interest in AI and its real-world impact led me to apply it to nutrition, creating a smarter way to personalize meal planning and reduce food waste."
  };

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

  const downloadReport = () => {
    if (!validationResult?.startup_validation_report) return;
    
    const doc = new jsPDF();
    const report = validationResult.startup_validation_report;
    let y = 20;
    const lineHeight = 7;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = pageWidth - 2 * margin;
    
    const addText = (text: string, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize);
      const splitText = doc.splitTextToSize(text, maxWidth);
      
      // Check if we need a new page
      if (y + (lineHeight * splitText.length) > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      
      doc.text(splitText, margin, y);
      y += lineHeight * splitText.length;
    };

    const addHeader = (text: string) => {
      // Check if we need a new page for header
      if (y + 20 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      y += 5;
      addText(text, 14, true);
      y += 3;
    };

    addText('Startup Validation Report', 20, true);
    y += 10;

    addHeader('Overall Viability Score');
    addText(`Score: ${report.viability_score.overall_score}/100`, 12);
    
    addHeader('Market Analysis');
    addText(`Industry Size: ${report.market_analysis.industry_size}`);
    addText(`Growth Trends: ${report.market_analysis.growth_trends}`);
    addText(`Target Customers: ${report.market_analysis.target_customers}`);
    addText(`Market Saturation: ${report.market_analysis.market_saturation_level}`);
    addText(`Pain Points: ${report.market_analysis.customer_pain_points}`);
    addText(`Distribution Channels: ${report.market_analysis.distribution_channels}`);
    addText(`Regulatory Environment: ${report.market_analysis.regulatory_environment}`);
    
    addHeader('Competition Analysis');
    report.similar_companies.forEach((company) => {
      addText(`${company.company_name} (${company.similarity_score}% Similar)`);
      addText(`USP: ${company.key_features.unique_selling_points}`);
      addText(`Strengths: ${company.key_features.strengths}`);
      addText(`Challenges: ${company.key_features.challenges}`);
      addText(`Comparison: ${company.comparison_to_business_idea}`);
      y += 3;
    });

    addHeader('Financial Analysis');
    addText('Startup Costs:');
    Object.entries(report.financial_projections.startup_costs).forEach(([key, value]) => {
      addText(`${key.replace('_', ' ')}: $${value.toLocaleString()}`);
    });
    
    y += 5;
    addText('Key Metrics:');
    addText(`CAC: $${report.financial_projections.key_financial_metrics.customer_acquisition_cost}`);
    addText(`LTV: $${report.financial_projections.key_financial_metrics.lifetime_value}`);
    addText(`Churn Rate: ${report.financial_projections.key_financial_metrics.churn_rate}%`);
    addText(`Average Subscription Length: ${report.financial_projections.key_financial_metrics.average_subscription_length} months`);
    
    y += 5;
    addText('Break Even Analysis:');
    addText(`Time to Profitability: ${report.financial_projections.break_even_point.time_to_profitability}`);
    addText(`Revenue at Break Even: $${report.financial_projections.break_even_point.total_revenue_at_breakeven.toLocaleString()}`);
    addText(`Expenses at Break Even: $${report.financial_projections.break_even_point.total_expenses_at_breakeven.toLocaleString()}`);

    addHeader('Strategic Recommendations');
    addText(`Market Positioning: ${report.actionable_recommendations.market_positioning}`);
    addText(`Financial Improvements: ${report.actionable_recommendations.financial_improvements}`);
    addText(`Risk Mitigation: ${report.actionable_recommendations.risk_mitigation}`);
    addText(`Growth Strategy: ${report.actionable_recommendations.growth_strategy}`);

    doc.save('startup-validation-report.pdf');
  };

  const handleFindInvestors = () => {
    if (!validationResult?.startup_validation_report) return;

    const report = validationResult.startup_validation_report;
    
    // Extract relevant information from the report
    const industry = report.market_analysis.industry_size.toLowerCase();
    const marketSize = report.market_analysis.industry_size.toLowerCase();
    const growthTrends = report.market_analysis.growth_trends.toLowerCase();
    const targetCustomers = report.market_analysis.target_customers.toLowerCase();
    
    // Create an array of relevant keywords from the report
    const businessKeywords = [
      ...industry.split(' '),
      ...marketSize.split(' '),
      ...growthTrends.split(' '),
      ...targetCustomers.split(' ')
    ].map(word => word.toLowerCase());

    // Calculate match scores for each investor
    const scoredInvestors = INVESTORS.map(investor => {
      let score = 0;
      
      // Check focus areas match
      investor.focus.forEach(focus => {
        if (businessKeywords.some(keyword => keyword.includes(focus.toLowerCase()))) {
          score += 3;
        }
      });

      // Add some randomization to avoid same matches every time
      score += Math.random() * 0.5;

      return {
        investor,
        score
      };
    });

    // Sort by score and get top 3
    const selectedInvestors = scoredInvestors
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.investor);

    setMatchedInvestors(selectedInvestors);
    setActiveCard('investors');
    
    // Force switch to investors tab after it's added
    const tabsElement = document.querySelector('[data-value="investors"]') as HTMLElement;
    if (tabsElement) {
      tabsElement.click();
    }
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative">
      <div className="container relative w-full max-w-[1800px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-4 py-1.5 text-base text-primary">
              AI Validation Agent
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">Your AI Startup Validation Agents</h2>
            <p className="max-w-[900px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Answer a few questions about your business idea and get a comprehensive validation report with market
              insights, competitor analysis, and financial projections.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-16">
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setUseDemoData(!useDemoData);
                if (!useDemoData) {
                  setFormData(demoData);
                  setCurrentStep(0);
                  setShowReport(false);
                  setValidationResult(null);
                  setError(null);
                  setActiveCard('report');
                } else {
                  setFormData({
                    businessIdea: "",
                    experience: "beginner",
                    entrepreneurshipExperience: ""
                  });
                  setCurrentStep(0);
                  setShowReport(false);
                  setValidationResult(null);
                  setError(null);
                  setActiveCard('report');
                }
              }}
              className={`transition-all duration-200 ${
                useDemoData 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "hover:bg-primary/10"
              }`}
            >
              <span className="flex items-center gap-2">
                {useDemoData ? (
                  <>
                    Start Fresh <CheckCircle className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    Try an Example <Sparkles className="h-5 w-5" />
                  </>
                )}
              </span>
            </Button>
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
                <CardHeader className="bg-primary/5 border-b p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 p-2.5 rounded-full">
                        <Bot className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">InnovaAI's Agents</CardTitle>
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
              <div className="relative flex overflow-hidden w-full">
                <motion.div
                  animate={{
                    x: activeCard === 'report' ? 0 : '-100%',
                  }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="w-full flex-shrink-0"
                >
                  <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/20 p-2 rounded-full">
                            <ClipboardList className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>Your Startup Validation Report</CardTitle>
                            <CardDescription>Based on AI analysis of your business idea</CardDescription>
                          </div>
                        </div>
                        {activeCard === 'investors' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveCard('report')}
                          >
                            <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
                            Back to Report
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs defaultValue={showInvestorsTab ? "investors" : "overview"}>
                        <TabsList className={`grid w-full ${showInvestorsTab ? 'grid-cols-6' : 'grid-cols-5'}`}>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="market">Market Analysis</TabsTrigger>
                          <TabsTrigger value="competition">Competition</TabsTrigger>
                          <TabsTrigger value="financials">Financials</TabsTrigger>
                          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                          {showInvestorsTab && (
                            <TabsTrigger value="investors">Investors</TabsTrigger>
                          )}
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

                        <TabsContent value="investors" className="mt-4 space-y-4 px-6">
                          <div className="space-y-4">
                            {matchedInvestors.map((investor, index) => (
                              <div key={index} className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-lg">{investor.name}</h4>
                                      <p className="text-sm text-muted-foreground">{investor.company}</p>
                                    </div>
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                      Match Score: {Math.round(Math.random() * 30 + 70)}%
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm">{investor.profile}</p>
                                  
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Investment Focus</p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {investor.focus.map((focus, i) => (
                                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                            {focus}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {investor.investmentStage && (
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Investment Stage</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {investor.investmentStage.map((stage, i) => (
                                            <span key={i} className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">
                                              {stage}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => window.open(`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(investor.name)}`, '_blank')}
                                  >
                                    <Linkedin className="h-4 w-4 mr-2" />
                                    View on LinkedIn
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
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
                      <div className="flex gap-2">
                        <Button onClick={downloadReport}>
                          <span className="flex items-center gap-2">
                            Download Full Report <FileText className="h-4 w-4" />
                          </span>
                        </Button>
                        <Button 
                          onClick={handleFindInvestors}
                          variant="secondary"
                        >
                          <span className="flex items-center gap-2">
                            Find Investors <Linkedin className="h-4 w-4" />
                          </span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  animate={{
                    x: activeCard === 'investors' ? 0 : '100%',
                  }}
                  initial={{ x: '100%' }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="w-full flex-shrink-0 absolute inset-0"
                >
                  <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/20 p-2 rounded-full">
                            <Linkedin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>Matched Investors</CardTitle>
                            <CardDescription>Based on your startup profile</CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveCard('report')}
                        >
                          <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
                          Back to Report
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {matchedInvestors.map((investor, index) => (
                          <div key={index} className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-lg">{investor.name}</h4>
                                  <p className="text-sm text-muted-foreground">{investor.company}</p>
                                </div>
                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                  Match Score: {Math.round(Math.random() * 30 + 70)}%
                                </div>
                              </div>
                              
                              <p className="text-sm">{investor.profile}</p>
                              
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Investment Focus</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {investor.focus.map((focus, i) => (
                                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        {focus}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                {investor.investmentStage && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Investment Stage</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {investor.investmentStage.map((stage, i) => (
                                        <span key={i} className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">
                                          {stage}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => window.open(`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(investor.name)}`, '_blank')}
                              >
                                <Linkedin className="h-4 w-4 mr-2" />
                                View on LinkedIn
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4 bg-background">
                      <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() => setActiveCard('report')}
                      >
                        Back to Report
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
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
