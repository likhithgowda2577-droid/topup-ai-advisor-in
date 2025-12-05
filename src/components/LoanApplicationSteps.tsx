import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { 
  UserCircle, 
  CheckSquare, 
  FileUp, 
  Search, 
  Zap,
  ArrowRight,
  Check
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Enter Basic Info",
    description: "Quick personal & financial details",
    icon: UserCircle,
    status: "completed",
  },
  {
    id: 2,
    title: "Check Eligibility",
    description: "AI-powered instant assessment",
    icon: CheckSquare,
    status: "current",
  },
  {
    id: 3,
    title: "Upload Documents",
    description: "Secure KYC verification",
    icon: FileUp,
    status: "pending",
  },
  {
    id: 4,
    title: "Compare Offers",
    description: "Best rates from top lenders",
    icon: Search,
    status: "pending",
  },
  {
    id: 5,
    title: "Apply Instantly",
    description: "One-click loan application",
    icon: Zap,
    status: "pending",
  },
];

export const LoanApplicationSteps = () => {
  const currentStep = steps.findIndex(s => s.status === "current") + 1;

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Quick Loan Application</h2>
          <p className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              step.status === "current" 
                ? "bg-primary/10 border border-primary/30" 
                : step.status === "completed"
                ? "bg-success/10"
                : "bg-muted/30"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              step.status === "completed"
                ? "bg-success text-success-foreground"
                : step.status === "current"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}>
              {step.status === "completed" ? (
                <Check className="w-6 h-6" />
              ) : (
                <step.icon className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-medium ${
                step.status === "pending" ? "text-muted-foreground" : "text-foreground"
              }`}>
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {step.status === "current" && (
              <Button size="sm" variant="gradient">
                Continue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <Button variant="gradient" className="w-full mt-6">
        Start New Application
      </Button>
    </motion.div>
  );
};
