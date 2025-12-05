import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { InterestRates } from "@/components/InterestRates";
import { CIBILScore } from "@/components/CIBILScore";
import { DocumentVerification } from "@/components/DocumentVerification";
import { EMICalculator } from "@/components/EMICalculator";
import { LoanApplicationSteps } from "@/components/LoanApplicationSteps";
import { AIAssistant } from "@/components/AIAssistant";
import { EligibilityPredictor } from "@/components/EligibilityPredictor";
import { HelpCenter } from "@/components/HelpCenter";
import { Button } from "@/components/ui/button";
import { 
  Home,
  Calculator,
  FileText,
  TrendingUp,
  Settings,
  Shield,
  HelpCircle,
  MessageSquare
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Calculator, label: "EMI" },
  { icon: FileText, label: "Documents" },
  { icon: TrendingUp, label: "Rates" },
  { icon: Settings, label: "Settings" },
];

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header 
        onLanguageChange={setCurrentLanguage} 
        currentLanguage={currentLanguage} 
      />

      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-secondary/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">
            <motion.h1 
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to <span className="text-gradient">Top Up</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your AI-powered multilingual loan advisor
            </motion.p>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="gradient" size="lg">
                Get Started
              </Button>
              <Button variant="glass" size="lg">
                <HelpCircle className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "Active Users", value: "50K+", color: "text-primary" },
            { label: "Loans Processed", value: "₹100Cr+", color: "text-secondary" },
            { label: "Partner Banks", value: "30+", color: "text-success" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 text-center"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Section */}
        <AboutSection />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Loan Application Steps */}
        <LoanApplicationSteps />

        {/* Interest Rates */}
        <InterestRates />

        {/* CIBIL Score */}
        <CIBILScore />

        {/* EMI Calculator */}
        <EMICalculator />

        {/* Eligibility Predictor */}
        <EligibilityPredictor />

        {/* Document Verification */}
        <DocumentVerification />

        {/* Help Center */}
        <HelpCenter />

        {/* RBI Compliance Notice */}
        <motion.div
          className="glass-card p-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-success" />
            <h3 className="font-semibold">RBI Compliance & Security</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Top Up is fully compliant with RBI guidelines for digital lending. Your data is encrypted 
            with 256-bit SSL encryption and stored securely. We never share your personal information 
            without your explicit consent.
          </p>
        </motion.div>

        {/* Help & Support */}
        <motion.div
          className="glass-card p-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Need Help?</h3>
                <p className="text-xs text-muted-foreground">24/7 support available</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-2 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeNav === item.label
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
