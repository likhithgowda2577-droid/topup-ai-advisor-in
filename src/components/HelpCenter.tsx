import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  FileQuestion,
  Search
} from "lucide-react";
import { Input } from "./ui/input";

const faqs = [
  {
    question: "What documents do I need for a personal loan?",
    answer: "For a personal loan, you typically need: Aadhaar Card, PAN Card, Last 3 months salary slips, Last 6 months bank statements, and a passport-size photo. Some lenders may also require Form 16 or ITR documents.",
  },
  {
    question: "How is my loan eligibility calculated?",
    answer: "Your eligibility is based on your monthly income, existing EMIs, CIBIL score, age, and employment stability. Generally, your total EMIs (including the new loan) shouldn't exceed 50% of your monthly income.",
  },
  {
    question: "What is a good CIBIL score for loans?",
    answer: "A CIBIL score of 750 and above is considered excellent. Scores between 700-749 are good, 650-699 is fair, and below 650 may face challenges in loan approval. Higher scores often lead to better interest rates.",
  },
  {
    question: "How long does loan approval take?",
    answer: "With digital KYC and our AI-powered platform, many loans are approved within 24-48 hours. Complex cases or higher loan amounts may take 3-5 business days.",
  },
  {
    question: "Can I prepay my loan without penalty?",
    answer: "Most personal loans allow prepayment after 12 months without penalty. Home loans with floating rates have no prepayment charges. Always check the specific terms with your lender.",
  },
  {
    question: "What languages does the AI assistant support?",
    answer: "Our AI assistant supports 12+ Indian languages including Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Malayalam, Gujarati, Punjabi, and more. You can switch languages mid-conversation.",
  },
];

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Help Center</h2>
          <p className="text-sm text-muted-foreground">FAQs & Support</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-muted/50 border-border/50"
        />
      </div>

      {/* FAQs */}
      <div className="space-y-3 mb-6">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-muted/30 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <FileQuestion className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium text-sm">{faq.question}</span>
              </div>
              {expandedIndex === index ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Contact Options */}
      <div className="border-t border-border/50 pt-6">
        <h3 className="text-sm font-medium mb-4">Still need help?</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex-col h-auto py-4">
            <MessageCircle className="w-5 h-5 mb-2 text-primary" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-4">
            <Mail className="w-5 h-5 mb-2 text-primary" />
            <span className="text-xs">Email</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-4">
            <Phone className="w-5 h-5 mb-2 text-primary" />
            <span className="text-xs">Call Us</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
