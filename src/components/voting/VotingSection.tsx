
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalVoting from './ProposalVoting';
import CampaignVoting from './CampaignVoting';

const VotingSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">DAO Voting</h2>
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="proposals">Vote on Proposals</TabsTrigger>
          <TabsTrigger value="campaigns">Vote on Campaigns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proposals">
          <ProposalVoting />
        </TabsContent>
        
        <TabsContent value="campaigns">
          <CampaignVoting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VotingSection;
