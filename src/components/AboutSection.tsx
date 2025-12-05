import { motion } from "framer-motion";
import { 
  Shield, 
  Globe, 
  Bot, 
  BookOpen,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Guidance",
    description: "Smart loan recommendations tailored to your profile",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Communicate in your preferred Indian language",
  },
  {
    icon: Shield,
    title: "RBI Compliant",
    description: "100% secure and regulatory compliant platform",
  },
  {
    icon: BookOpen,
    title: "Financial Literacy",
    description: "Learn and make informed borrowing decisions",
  },
];

export const AboutSection = () => {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">About Top Up</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Top Up is your AI-powered loan advisor, designed to simplify the Indian lending ecosystem. 
          We help you navigate through loan options with multilingual support, personalized guidance, 
          and complete financial transparency.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className="font-medium text-sm">Our Mission</span>
        </div>
        <p className="text-sm text-muted-foreground">
          To democratize access to credit by making loan processes simple, transparent, 
          and accessible to every Indian in their preferred language.
        </p>
      </div>

      <Button variant="outline" className="w-full mt-4">
        Learn More About Us
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};
