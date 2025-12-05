import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import logoImage from "@/assets/top-up-logo.png";
import { 
  X, 
  Send, 
  Mic, 
  MicOff,
  Globe,
  Calculator,
  FileText,
  TrendingUp,
  Bot,
  User,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Calculator, label: "Calculate EMI", action: "help me calculate EMI" },
  { icon: TrendingUp, label: "Check Eligibility", action: "check my loan eligibility" },
  { icon: FileText, label: "Document Help", action: "what documents do I need for a loan" },
  { icon: Globe, label: "Change Language", action: "change language to Hindi" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" },
  { code: "bn", name: "বাংলা" },
  { code: "ml", name: "മലയാളം" },
];

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hello! I'm your AI Loan Advisor. I can help you with:\n\n• Calculating EMI\n• Checking loan eligibility\n• Comparing interest rates\n• Document guidance\n• Financial literacy\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you're interested in loans. Let me help you explore your options. Based on your query, I'd recommend checking our EMI calculator to understand your monthly payments better.",
        "Great question! For personal loans in India, you'll typically need:\n\n• Aadhaar Card\n• PAN Card\n• Last 3 months salary slips\n• Bank statements\n• Address proof\n\nWould you like me to help you start the document upload?",
        "Based on typical eligibility criteria, here's what lenders look for:\n\n• CIBIL Score: 700+\n• Monthly Income: ₹25,000+\n• Employment: Stable job (6+ months)\n• Age: 21-58 years\n\nWould you like me to check your personalized eligibility?",
        "I can help you compare interest rates from top banks! Currently, the best rates are:\n\n• SBI: 10.5% p.a.\n• HDFC: 10.75% p.a.\n• ICICI: 10.99% p.a.\n\nShall I show you detailed comparisons?",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setInput("What is the best interest rate for home loans?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-cyan flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px hsl(187 100% 50% / 0.4)",
            "0 0 40px hsl(187 100% 50% / 0.6)",
            "0 0 20px hsl(187 100% 50% / 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={logoImage} alt="AI Assistant" className="w-10 h-10 object-contain" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold">AI Loan Advisor</h2>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Online • {languages.find(l => l.code === selectedLanguage)?.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Language Selector */}
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-40 scrollbar-custom" style={{ height: "calc(100vh - 180px)" }}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex gap-3 mb-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === "assistant" 
                      ? "bg-gradient-to-r from-primary to-secondary" 
                      : "bg-muted"
                  }`}>
                    {message.role === "assistant" ? (
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.role === "assistant" 
                        ? "bg-muted/50 rounded-tl-none" 
                        : "bg-primary text-primary-foreground rounded-tr-none"
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex gap-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-24 left-0 right-0 px-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm whitespace-nowrap hover:bg-muted transition-colors"
                    onClick={() => handleQuickAction(action.action)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <action.icon className="w-4 h-4 text-primary" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={isListening ? "default" : "ghost"}
                  size="icon"
                  onClick={handleVoiceInput}
                  className={isListening ? "animate-pulse" : ""}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="pr-12 h-12 bg-muted/50 border-border/50"
                  />
                </div>
                <Button
                  variant="gradient"
                  size="icon-lg"
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
