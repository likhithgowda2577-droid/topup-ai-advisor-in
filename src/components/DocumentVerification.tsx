import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Camera,
  CreditCard,
  User,
  Building,
  Receipt,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "pending" | "uploaded" | "verified" | "rejected";
  mandatory: boolean;
}

export const DocumentVerification = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "aadhaar", name: "Aadhaar Card", icon: <CreditCard className="w-5 h-5" />, status: "pending", mandatory: true },
    { id: "pan", name: "PAN Card", icon: <FileText className="w-5 h-5" />, status: "pending", mandatory: true },
    { id: "selfie", name: "Live Selfie", icon: <Camera className="w-5 h-5" />, status: "pending", mandatory: true },
    { id: "salary", name: "Salary Slips (3 months)", icon: <Receipt className="w-5 h-5" />, status: "pending", mandatory: false },
    { id: "bank", name: "Bank Statements", icon: <Building className="w-5 h-5" />, status: "pending", mandatory: false },
    { id: "itr", name: "ITR Documents", icon: <FileSpreadsheet className="w-5 h-5" />, status: "pending", mandatory: false },
  ]);

  const handleUpload = (docId: string) => {
    setDocuments(docs => docs.map(doc => {
      if (doc.id === docId) {
        return { ...doc, status: "uploaded" };
      }
      return doc;
    }));

    // Simulate verification
    setTimeout(() => {
      setDocuments(docs => docs.map(doc => {
        if (doc.id === docId) {
          return { ...doc, status: "verified" };
        }
        return doc;
      }));
      toast({
        title: "Document Verified",
        description: "Your document has been verified successfully",
      });
    }, 2000);
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return (
          <span className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        );
      case "uploaded":
        return (
          <span className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" /> In Review
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <Upload className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  const completedCount = documents.filter(d => d.status === "verified").length;
  const mandatoryDocs = documents.filter(d => d.mandatory);
  const optionalDocs = documents.filter(d => !d.mandatory);

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Document Verification</h2>
          <p className="text-sm text-muted-foreground">
            {completedCount}/{documents.length} documents verified
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / documents.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Mandatory Documents */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Mandatory Documents
        </h3>
        <div className="space-y-3">
          {mandatoryDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  doc.status === "verified" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  {doc.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <span className="text-xs text-destructive">Required</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(doc.status)}
                {doc.status === "pending" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleUpload(doc.id)}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Optional Documents
        </h3>
        <div className="space-y-3">
          {optionalDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  doc.status === "verified" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  {doc.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <span className="text-xs text-muted-foreground">Optional</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(doc.status)}
                {doc.status === "pending" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleUpload(doc.id)}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
