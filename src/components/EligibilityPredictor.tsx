import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { 
  Calculator, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  IndianRupee
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const EligibilityPredictor = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(5000);
  const [cibilScore, setCibilScore] = useState(700);
  const [loanAmount, setLoanAmount] = useState(500000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<null | {
    eligible: boolean;
    maxEligible: number;
    probability: number;
    suggestions: string[];
  }>(null);

  const calculateEligibility = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // FOIR (Fixed Obligation to Income Ratio) calculation
      const foir = existingEMI / monthlyIncome;
      const availableForEMI = monthlyIncome * (0.5 - foir); // 50% max FOIR
      
      // Rough loan eligibility (assuming 10% interest, 5 years)
      const maxEligible = Math.max(0, availableForEMI * 50);
      
      // Probability based on CIBIL and FOIR
      let probability = 0;
      if (cibilScore >= 750) probability += 40;
      else if (cibilScore >= 700) probability += 30;
      else if (cibilScore >= 650) probability += 20;
      else probability += 10;

      if (foir <= 0.3) probability += 40;
      else if (foir <= 0.4) probability += 30;
      else if (foir <= 0.5) probability += 20;
      else probability += 5;

      if (monthlyIncome >= 50000) probability += 20;
      else if (monthlyIncome >= 30000) probability += 15;
      else probability += 10;

      const eligible = probability >= 60 && loanAmount <= maxEligible;
      
      const suggestions: string[] = [];
      if (cibilScore < 700) suggestions.push("Improve CIBIL score above 700");
      if (foir > 0.4) suggestions.push("Reduce existing EMI obligations");
      if (loanAmount > maxEligible) suggestions.push(`Consider reducing loan to ₹${(maxEligible/100000).toFixed(1)}L`);

      setResult({
        eligible,
        maxEligible,
        probability: Math.min(100, probability),
        suggestions,
      });
      
      setIsCalculating(false);
      
      toast({
        title: eligible ? "Good News!" : "Eligibility Check Complete",
        description: eligible 
          ? "You're likely eligible for this loan amount" 
          : "You may need to adjust some parameters",
      });
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Eligibility Predictor</h2>
          <p className="text-sm text-muted-foreground">AI-powered loan assessment</p>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {/* Monthly Income */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Monthly Income</span>
            <span className="text-sm font-semibold text-primary">
              {formatCurrency(monthlyIncome)}
            </span>
          </div>
          <Slider
            value={[monthlyIncome]}
            onValueChange={(v) => setMonthlyIncome(v[0])}
            min={15000}
            max={500000}
            step={5000}
          />
        </div>

        {/* Existing EMI */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Existing EMI</span>
            <span className="text-sm font-semibold text-secondary">
              {formatCurrency(existingEMI)}
            </span>
          </div>
          <Slider
            value={[existingEMI]}
            onValueChange={(v) => setExistingEMI(v[0])}
            min={0}
            max={200000}
            step={1000}
          />
        </div>

        {/* CIBIL Score */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">CIBIL Score</span>
            <span className={`text-sm font-semibold ${
              cibilScore >= 750 ? "text-success" : cibilScore >= 650 ? "text-warning" : "text-destructive"
            }`}>
              {cibilScore}
            </span>
          </div>
          <Slider
            value={[cibilScore]}
            onValueChange={(v) => setCibilScore(v[0])}
            min={300}
            max={900}
            step={10}
          />
        </div>

        {/* Desired Loan Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Desired Loan Amount</span>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <Slider
            value={[loanAmount]}
            onValueChange={(v) => setLoanAmount(v[0])}
            min={50000}
            max={5000000}
            step={25000}
          />
        </div>
      </div>

      <Button 
        onClick={calculateEligibility} 
        variant="gradient" 
        className="w-full mb-6"
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Analyzing...
          </>
        ) : (
          <>
            <TrendingUp className="w-4 h-4 mr-2" />
            Check Eligibility
          </>
        )}
      </Button>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Main Result */}
          <div className={`rounded-xl p-4 ${
            result.eligible 
              ? "bg-success/10 border border-success/30" 
              : "bg-warning/10 border border-warning/30"
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {result.eligible ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-warning" />
              )}
              <span className="font-semibold">
                {result.eligible ? "Likely Eligible!" : "Needs Adjustment"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Approval probability: <span className="font-bold text-foreground">{result.probability}%</span>
            </p>
          </div>

          {/* Max Eligible */}
          <div className="bg-muted/30 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Maximum Eligible Amount</p>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-gradient">
                {(result.maxEligible / 100000).toFixed(1)}L
              </span>
            </div>
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Suggestions:</p>
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                  <span className="text-muted-foreground">{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
