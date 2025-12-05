import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";

const Index = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Navigate to auth page after splash
    navigate("/auth");
  };

  return (
    <AnimatePresence mode="wait">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
    </AnimatePresence>
  );
};

export default Index;
