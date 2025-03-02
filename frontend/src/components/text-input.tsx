import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

function ChatbotAgent() {
  const [idea, setIdea] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:5000/validate", {
        idea,
        industry,
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error fetching validation:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Startup Validator</h1>
      <input
        type="text"
        placeholder="Enter your startup idea"
        className="border p-2 w-full max-w-md mb-2"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter industry"
        className="border p-2 w-full max-w-md mb-4"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Validating..." : "Validate Startup"}
      </Button>
      {response && (
        <div className="mt-6 p-4 border rounded-md w-full max-w-md">
          <h2 className="text-lg font-semibold">Validation Report</h2>
          <p><strong>Market Analysis:</strong> {response.analysis}</p>
          <p><strong>Competitor Insights:</strong> {response.research}</p>
          <p><strong>Financial Projections:</strong> {response.financials}</p>
          <p><strong>Viability Score:</strong> {response.viability_score}/100</p>
        </div>
      )}
    </div>
  );
}

export default ChatbotAgent;