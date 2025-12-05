import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  IndianRupee,
  Edit2,
  Save,
  CheckCircle,
  Camera
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 98765 43210",
    address: "Bangalore, Karnataka",
    dob: "1990-05-15",
    occupation: "Software Engineer",
    monthlyIncome: "75000",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully",
    });
  };

  const stats = [
    { label: "Loans Applied", value: "3", color: "text-primary" },
    { label: "CIBIL Score", value: "742", color: "text-success" },
    { label: "KYC Status", value: "Verified", color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">My Profile</h1>
          </div>
          <Button
            variant={isEditing ? "gradient" : "ghost"}
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
      </motion.header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Profile Picture */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary" />
              </button>
            )}
          </div>
          <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
          <div className="flex items-center gap-1 text-sm text-success">
            <CheckCircle className="w-4 h-4" />
            <span>Verified User</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Personal Information */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Full Name</label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-9 bg-muted/50"
                  />
                ) : (
                  <p className="font-medium">{profile.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-9 bg-muted/50"
                  />
                ) : (
                  <p className="font-medium">{profile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Phone</label>
                <p className="font-medium">{profile.phone}</p>
                <span className="text-xs text-success">Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Address</label>
                {isEditing ? (
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="h-9 bg-muted/50"
                  />
                ) : (
                  <p className="font-medium">{profile.address}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-info" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Date of Birth</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={profile.dob}
                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    className="h-9 bg-muted/50"
                  />
                ) : (
                  <p className="font-medium">{new Date(profile.dob).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Employment Information */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-4">Employment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Occupation</label>
                {isEditing ? (
                  <Input
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    className="h-9 bg-muted/50"
                  />
                ) : (
                  <p className="font-medium">{profile.occupation}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Monthly Income</label>
                {isEditing ? (
                  <Input
                    value={profile.monthlyIncome}
                    onChange={(e) => setProfile({ ...profile, monthlyIncome: e.target.value })}
                    className="h-9 bg-muted/50"
                  />
                ) : (
                  <p className="font-medium">₹{parseInt(profile.monthlyIncome).toLocaleString('en-IN')}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="gradient" className="w-full">
            Update KYC Documents
          </Button>
          <Button variant="outline" className="w-full">
            View Loan History
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
