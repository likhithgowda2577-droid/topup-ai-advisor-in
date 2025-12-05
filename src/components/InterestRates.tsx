import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { TrendingDown, ArrowRight, Filter } from "lucide-react";

interface Bank {
  name: string;
  logo: string;
  rate: number;
  processingFee: string;
  maxTenure: string;
  maxAmount: string;
}

const banks: Record<string, Bank[]> = {
  personal: [
    { name: "HDFC Bank", logo: "🏦", rate: 10.5, processingFee: "Up to 2.5%", maxTenure: "5 years", maxAmount: "₹40L" },
    { name: "SBI", logo: "🏛️", rate: 11.0, processingFee: "Up to 1.5%", maxTenure: "6 years", maxAmount: "₹35L" },
    { name: "ICICI Bank", logo: "🏦", rate: 10.75, processingFee: "Up to 2%", maxTenure: "5 years", maxAmount: "₹50L" },
    { name: "Axis Bank", logo: "🏦", rate: 10.49, processingFee: "Up to 2%", maxTenure: "5 years", maxAmount: "₹40L" },
    { name: "Kotak Bank", logo: "🏦", rate: 10.99, processingFee: "Up to 2.5%", maxTenure: "6 years", maxAmount: "₹40L" },
  ],
  home: [
    { name: "SBI", logo: "🏛️", rate: 8.4, processingFee: "Up to 0.35%", maxTenure: "30 years", maxAmount: "No limit" },
    { name: "HDFC Home", logo: "🏠", rate: 8.5, processingFee: "Up to 0.5%", maxTenure: "30 years", maxAmount: "No limit" },
    { name: "ICICI Home", logo: "🏠", rate: 8.6, processingFee: "Up to 0.5%", maxTenure: "30 years", maxAmount: "₹10Cr" },
    { name: "LIC HFL", logo: "🏢", rate: 8.35, processingFee: "Up to 0.5%", maxTenure: "30 years", maxAmount: "No limit" },
  ],
  vehicle: [
    { name: "HDFC Bank", logo: "🚗", rate: 8.5, processingFee: "Up to 0.5%", maxTenure: "7 years", maxAmount: "₹1Cr" },
    { name: "SBI Car", logo: "🚙", rate: 8.65, processingFee: "Nil", maxTenure: "7 years", maxAmount: "₹50L" },
    { name: "ICICI Bank", logo: "🚗", rate: 8.75, processingFee: "Up to 0.5%", maxTenure: "7 years", maxAmount: "₹1Cr" },
    { name: "Mahindra Finance", logo: "🚕", rate: 9.5, processingFee: "Up to 2%", maxTenure: "5 years", maxAmount: "₹50L" },
  ],
  education: [
    { name: "SBI Scholar", logo: "🎓", rate: 8.15, processingFee: "Nil", maxTenure: "15 years", maxAmount: "₹1.5Cr" },
    { name: "HDFC Credila", logo: "📚", rate: 9.0, processingFee: "Up to 1%", maxTenure: "12 years", maxAmount: "No limit" },
    { name: "Axis Bank", logo: "🎓", rate: 9.7, processingFee: "Up to 1%", maxTenure: "15 years", maxAmount: "₹75L" },
    { name: "IDBI Bank", logo: "📖", rate: 8.5, processingFee: "Nil", maxTenure: "15 years", maxAmount: "₹1Cr" },
  ],
};

const loanTypes = [
  { id: "personal", name: "Personal", icon: "💰" },
  { id: "home", name: "Home", icon: "🏠" },
  { id: "vehicle", name: "Vehicle", icon: "🚗" },
  { id: "education", name: "Education", icon: "🎓" },
];

export const InterestRates = () => {
  const [selectedType, setSelectedType] = useState("personal");

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Best Interest Rates</h2>
          <p className="text-sm text-muted-foreground">Compare rates from top lenders</p>
        </div>
        <Button variant="ghost" size="icon">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Loan Type Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {loanTypes.map((type) => (
          <motion.button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedType === type.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span>{type.icon}</span>
            {type.name}
          </motion.button>
        ))}
      </div>

      {/* Bank Cards */}
      <div className="space-y-3">
        {banks[selectedType]?.map((bank, index) => (
          <motion.div
            key={bank.name}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center text-2xl">
                {bank.logo}
              </div>
              <div>
                <h3 className="font-medium text-foreground">{bank.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {bank.processingFee} • Up to {bank.maxTenure}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-lg font-bold text-primary">
                {bank.rate}%
                <TrendingDown className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground">p.a. onwards</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4">
        View All Lenders
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};
