const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface StartupValidationRequest {
  startup_idea: string;
  entrepreneur_background: string;
}

export interface ValidationResponse {
  startup_validation_report: {
    business_idea: string;
    entrepreneur_background: string;
    viability_score: {
      overall_score: number;
      breakdown: {
        market_demand: {
          score: number;
          weight: number;
          explanation: string;
          factors: {
            market_size: string;
            growth_rate: string;
            consumer_interest: string;
          };
        };
        competitive_landscape: {
          score: number;
          weight: number;
          explanation: string;
          factors: {
            competitor_count: number;
            differentiation_level: string;
            barriers_to_entry: string;
          };
        };
        financial_viability: {
          score: number;
          weight: number;
          explanation: string;
          factors: {
            revenue_potential: string;
            cost_structure: string;
            profitability_timeline: string;
          };
        };
        scalability: {
          score: number;
          weight: number;
          explanation: string;
          factors: {
            growth_potential: string;
            automation_feasibility: string;
            market_expansion: string;
          };
        };
        risk_factors: {
          score: number;
          weight: number;
          explanation: string;
          factors: {
            legal_risks: string;
            technical_risks: string;
            operational_risks: string;
          };
        };
      };
    };
    market_analysis: {
        industry_size: string;
        growth_trends: string;
        target_customers: string;
        key_market_shifts: string;
        customer_pain_points: string; // Common problems customers face that this startup addresses
        market_saturation_level: string; // How crowded the market is with similar products/services
        distribution_channels: string; // How the product/service will be delivered to customers
        regulatory_environment: string; // Any legal or industry regulations affecting the business
        emerging_opportunities: string; // Potential trends or market gaps that can be leveraged
    };
    similar_companies: Array<{
      company_name: string;
      similarity_score: number;
      key_features: {
        unique_selling_points: string;
        challenges: string;
        strengths: string;
      };
      comparison_to_business_idea: string;
    }>;
    financial_projections: {
      startup_costs: {
        inventory: number;
        technology: number;
        marketing: number;
        legal: number;
        operations: number;
        total_startup_cost: number;
      };
      revenue_expense_forecast: {
        quarterly_projection: Array<{
          quarter: string;
          projected_revenue: number;
          projected_expenses: number;
        }>;
      };
      key_financial_metrics: {
        customer_acquisition_cost: number;
        lifetime_value: number;
        churn_rate: number;
        average_subscription_length: number;
      };
      break_even_point: {
        time_to_profitability: string;
        total_revenue_at_breakeven: number;
        total_expenses_at_breakeven: number;
      };
    };
    actionable_recommendations: {
      market_positioning: string;
      financial_improvements: string;
      risk_mitigation: string;
      growth_strategy: string;
    };
  };
}

export async function validateStartup(
  startupIdea: string, 
  entrepreneurBackground: string
): Promise<ValidationResponse> {
  console.log('Calling validateStartup API with:', { startupIdea, entrepreneurBackground });
  
  const response = await fetch(`${API_BASE_URL}/validate-startup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startup_idea: startupIdea,
      entrepreneur_background: entrepreneurBackground,
    }),
  });

  console.log('API Response status:', response.status);

  if (!response.ok) {
    console.error('API call failed with status:', response.status);
    throw new Error('Failed to validate startup');
  }

  const data = await response.json();
  console.log('Raw API Response:', data);
  return data;
} 