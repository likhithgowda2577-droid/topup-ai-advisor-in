import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: "cyan" | "purple" | "mixed";
  delay?: number;
  onClick?: () => void;
}

const gradientClasses = {
  cyan: "from-cyan-electric/20 to-cyan-electric/5",
  purple: "from-purple-soft/20 to-purple-soft/5",
  mixed: "from-cyan-electric/20 via-purple-soft/10 to-transparent",
};

const iconBgClasses = {
  cyan: "bg-cyan-electric/20 text-cyan-electric",
  purple: "bg-purple-soft/20 text-purple-soft",
  mixed: "bg-gradient-primary text-primary-foreground",
};

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient = "cyan",
  delay = 0,
  onClick
}: FeatureCardProps) => {
  return (
    <motion.div
      className={`glass-card p-5 cursor-pointer hover:border-primary/30 transition-all duration-300 group relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[gradient]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${iconBgClasses[gradient]} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
