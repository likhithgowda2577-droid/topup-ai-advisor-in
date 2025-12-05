import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { 
  Brain, 
  Route, 
  Target, 
  Mic2, 
  ShieldCheck, 
  TrendingDown,
  GraduationCap
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Loan Eligibility",
    description: "Instant AI-powered assessment based on your financial profile",
    gradient: "cyan" as const,
  },
  {
    icon: Route,
    title: "End-to-End Guidance",
    description: "Complete hand-holding from application to disbursement",
    gradient: "purple" as const,
  },
  {
    icon: Target,
    title: "Personalized Offers",
    description: "Custom loan recommendations matching your needs",
    gradient: "cyan" as const,
  },
  {
    icon: Mic2,
    title: "Voice & Chat Support",
    description: "Communicate naturally in 12+ Indian languages",
    gradient: "purple" as const,
  },
  {
    icon: ShieldCheck,
    title: "Secure Verification",
    description: "RBI-compliant document verification with encryption",
    gradient: "cyan" as const,
  },
  {
    icon: TrendingDown,
    title: "Rate Comparison",
    description: "Real-time rates from 30+ banks and NBFCs",
    gradient: "purple" as const,
  },
  {
    icon: GraduationCap,
    title: "Beginner Friendly",
    description: "Step-by-step guidance for first-time borrowers",
    gradient: "mixed" as const,
  },
];

export const WhyChooseUs = () => {
  return (
    <div className="py-2">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold mb-1">Why Choose Top Up</h2>
        <p className="text-sm text-muted-foreground">
          Features that make us stand out
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {features.slice(0, 6).map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradient={feature.gradient}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Full width card */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <FeatureCard
          icon={features[6].icon}
          title={features[6].title}
          description={features[6].description}
          gradient={features[6].gradient}
        />
      </motion.div>
    </div>
  );
};
