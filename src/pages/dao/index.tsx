
import React from 'react';
import VotingSection from '@/components/voting/VotingSection';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Vote } from "lucide-react";

const DAOPage = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl font-bold mb-6">DAO Governance</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Participate in decentralized decision-making for medical crowdfunding campaigns and platform improvements.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="rounded-full" size="lg">
            <Vote className="mr-2 h-4 w-4" />
            Start Voting
          </Button>
          <Button variant="outline" className="rounded-full" size="lg">
            <FileText className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </div>
      </motion.div>

      {/* Voting Section */}
      <VotingSection />
    </div>
  );
};

export default DAOPage;
