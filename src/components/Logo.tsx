import { motion } from "framer-motion";
import logoImage from "@/assets/top-up-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

export const Logo = ({ size = "md", animated = false, showText = false, className = "" }: LogoProps) => {
  const logoElement = (
    <img
      src={logoImage}
      alt="Top Up Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );

  if (animated) {
    return (
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          animate={{
            boxShadow: [
              "0 0 20px hsl(187 100% 50% / 0.3)",
              "0 0 40px hsl(187 100% 50% / 0.6)",
              "0 0 20px hsl(187 100% 50% / 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {logoElement}
        </motion.div>
        {showText && (
          <motion.span
            className="text-2xl font-bold text-gradient"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Top Up
          </motion.span>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {logoElement}
      {showText && <span className="text-lg font-bold text-foreground">Top Up</span>}
    </div>
  );
};
