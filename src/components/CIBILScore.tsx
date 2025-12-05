import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

interface CIBILScoreProps {
  score?: number;
  onCheckScore?: () => void;
}

export const CIBILScore = ({ score: initialScore, onCheckScore }: CIBILScoreProps) => {
  const [score, setScore] = useState(initialScore || 0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (score > 0) {
      const duration = 2000;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score]);

  const handleCheckScore = () => {
    setIsChecking(true);
    setTimeout(() => {
      setScore(742);
      setIsChecking(false);
    }, 2000);
  };

  const getScoreColor = () => {
    if (score >= 750) return "hsl(142, 76%, 45%)"; // success
    if (score >= 650) return "hsl(38, 92%, 50%)"; // warning
    return "hsl(0, 84%, 60%)"; // destructive
  };

  const getScoreLabel = () => {
    if (score >= 750) return { text: "Excellent", icon: CheckCircle, color: "text-success" };
    if (score >= 650) return { text: "Good", icon: TrendingUp, color: "text-warning" };
    if (score >= 550) return { text: "Fair", icon: AlertCircle, color: "text-warning" };
    return { text: "Poor", icon: TrendingDown, color: "text-destructive" };
  };

  const scoreInfo = getScoreLabel();
  const percentage = ((score - 300) / 600) * 100;
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;

  const improvements = [
    "Pay bills on time",
    "Keep credit utilization below 30%",
    "Avoid multiple loan applications",
    "Maintain a healthy credit mix",
  ];

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">CIBIL Score</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleCheckScore}
          disabled={isChecking}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? "Checking..." : "Refresh"}
        </Button>
      </div>

      {score > 0 ? (
        <>
          {/* Score Meter */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-[135deg]" viewBox="0 0 200 200">
              {/* Background track */}
              <circle
                cx="100"
                cy="100"
                r="85"
                className="score-meter-track"
                strokeDasharray={circumference * 0.75}
              />
              {/* Progress */}
              <motion.circle
                cx="100"
                cy="100"
                r="85"
                className="score-meter-progress"
                stroke={getScoreColor()}
                strokeDasharray={circumference * 0.75}
                initial={{ strokeDashoffset: circumference * 0.75 }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 10px ${getScoreColor()})` }}
              />
            </svg>
            
            {/* Score display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className="text-4xl font-bold"
                style={{ color: getScoreColor() }}
              >
                {animatedScore}
              </motion.span>
              <span className="text-sm text-muted-foreground">out of 900</span>
            </div>
          </div>

          {/* Score Label */}
          <div className={`flex items-center justify-center gap-2 mb-6 ${scoreInfo.color}`}>
            <scoreInfo.icon className="w-5 h-5" />
            <span className="font-semibold">{scoreInfo.text}</span>
          </div>

          {/* Improvement Tips */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Improve Your Score</h3>
            {improvements.map((tip, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">{tip}</span>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Check your CIBIL score securely via PAN verification
          </p>
          <Button 
            onClick={handleCheckScore} 
            variant="gradient"
            disabled={isChecking}
          >
            {isChecking ? "Checking..." : "Check My Score"}
          </Button>
        </div>
      )}
    </motion.div>
  );
};
