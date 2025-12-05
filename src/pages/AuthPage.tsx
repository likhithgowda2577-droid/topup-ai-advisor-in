import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { 
  Phone, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent!",
        description: `OTP sent to +91 ${phone}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Top Up!",
        description: "Login successful",
      });
      navigate("/home");
    }, 1000);
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Top Up!",
        description: "Login successful",
      });
      navigate("/home");
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Top Up!",
        description: "Google login successful",
      });
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(187 100% 50% / 0.2) 0%, transparent 70%)",
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(262 83% 58% / 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-6 py-8 max-w-md mx-auto w-full">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <Logo size="lg" animated />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isLogin ? "Sign in to continue to Top Up" : "Start your loan journey with Top Up"}
          </p>
        </motion.div>

        {/* Auth Method Tabs */}
        <motion.div 
          className="glass-card p-1 flex gap-1 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <button
            onClick={() => { setAuthMethod("phone"); setOtpSent(false); }}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              authMethod === "phone" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Phone OTP
          </button>
          <button
            onClick={() => { setAuthMethod("email"); setOtpSent(false); }}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              authMethod === "email" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </button>
        </motion.div>

        {/* Auth Form */}
        <motion.div 
          className="glass-card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {authMethod === "phone" ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {!otpSent ? (
                  <>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          +91
                        </span>
                        <Input
                          type="tel"
                          placeholder="Enter 10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="pl-14 h-12 bg-muted/50 border-border/50"
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendOtp} 
                      className="w-full" 
                      variant="gradient"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-success mb-4">
                      <CheckCircle className="w-4 h-4" />
                      OTP sent to +91 {phone}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Enter OTP
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="h-12 bg-muted/50 border-border/50 text-center text-xl tracking-widest"
                        maxLength={6}
                      />
                    </div>
                    <Button 
                      onClick={handleVerifyOtp} 
                      className="w-full" 
                      variant="gradient"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify & Continue"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <button 
                      onClick={() => setOtpSent(false)}
                      className="w-full text-sm text-primary hover:underline"
                    >
                      Change number
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-muted/50 border-border/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-muted/50 border-border/50 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button 
                  onClick={handleEmailLogin} 
                  className="w-full" 
                  variant="gradient"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Google Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button 
            onClick={handleGoogleLogin}
            variant="glass" 
            className="w-full h-12"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </motion.div>

        {/* Toggle Login/Signup */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </motion.p>

        {/* Security Badge */}
        <motion.div 
          className="mt-auto pt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
        >
          <Shield className="w-4 h-4 text-success" />
          RBI-Compliant Secured KYC
        </motion.div>
      </div>
    </div>
  );
}
