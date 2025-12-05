import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Calculator, IndianRupee } from "lucide-react";

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(24);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const n = tenure;

    if (monthlyRate === 0) {
      setEmi(principal / n);
      setTotalInterest(0);
      setTotalPayment(principal);
    } else {
      const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / 
                       (Math.pow(1 + monthlyRate, n) - 1);
      const totalPay = emiValue * n;
      const totalInt = totalPay - principal;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(totalInt));
      setTotalPayment(Math.round(totalPay));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const principalPercentage = (loanAmount / totalPayment) * 100;
  const interestPercentage = (totalInterest / totalPayment) * 100;

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">EMI Calculator</h2>
          <p className="text-sm text-muted-foreground">Plan your loan repayment</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Loan Amount</span>
            <span className="text-sm font-semibold text-primary">
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <Slider
            value={[loanAmount]}
            onValueChange={(v) => setLoanAmount(v[0])}
            min={50000}
            max={5000000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>₹50K</span>
            <span>₹50L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Interest Rate</span>
            <span className="text-sm font-semibold text-primary">
              {interestRate}% p.a.
            </span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(v) => setInterestRate(v[0])}
            min={5}
            max={24}
            step={0.25}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>5%</span>
            <span>24%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Loan Tenure</span>
            <span className="text-sm font-semibold text-primary">
              {tenure} months ({Math.floor(tenure / 12)}y {tenure % 12}m)
            </span>
          </div>
          <Slider
            value={[tenure]}
            onValueChange={(v) => setTenure(v[0])}
            min={6}
            max={84}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>6 months</span>
            <span>7 years</span>
          </div>
        </div>
      </div>

      {/* EMI Result */}
      <motion.div
        className="bg-gradient-primary rounded-2xl p-6 mb-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-primary-foreground/80 text-sm mb-1">Monthly EMI</p>
        <div className="flex items-center gap-2">
          <IndianRupee className="w-8 h-8 text-primary-foreground" />
          <span className="text-4xl font-bold text-primary-foreground">
            {emi.toLocaleString('en-IN')}
          </span>
        </div>
      </motion.div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
          <p className="text-lg font-semibold text-secondary">
            {formatCurrency(totalInterest)}
          </p>
        </div>
        <div className="bg-muted/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
          <p className="text-lg font-semibold text-foreground">
            {formatCurrency(totalPayment)}
          </p>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="mb-4">
        <div className="h-4 rounded-full overflow-hidden flex">
          <motion.div
            className="bg-primary h-full"
            initial={{ width: 0 }}
            animate={{ width: `${principalPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="bg-secondary h-full"
            initial={{ width: 0 }}
            animate={{ width: `${interestPercentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            Principal ({principalPercentage.toFixed(0)}%)
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            Interest ({interestPercentage.toFixed(0)}%)
          </span>
        </div>
      </div>

      <Button variant="gradient" className="w-full">
        Apply for This Loan
      </Button>
    </motion.div>
  );
};
