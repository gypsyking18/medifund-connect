
import React, { useState } from 'react';
import VotingSection from '@/components/voting/VotingSection';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Vote } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DAOPage = () => {
  const [activeTab, setActiveTab] = useState('voting');

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="lg">
                <Vote className="mr-2 h-4 w-4" />
                Vote
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveTab('voteCampaign')}>
                Vote Campaign
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('voteProposal')}>
                Vote Proposal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="rounded-full" size="lg" onClick={() => setActiveTab('proposal')}>
            <FileText className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </div>
      </motion.div>

      {/* Content Section */}
      {activeTab === 'voting' && <VotingSection />}
      {activeTab === 'proposal' && <ProposalForm />}
      {activeTab === 'voteCampaign' && <CampaignVoting />}
      {activeTab === 'voteProposal' && <ProposalVoting />}
    </div>
  );
};

export default DAOPage;
