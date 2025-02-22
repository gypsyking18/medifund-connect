
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalVoting from './ProposalVoting';
import CampaignVoting from './CampaignVoting';
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

const VotingSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">DAO Voting</h2>
      
      <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-700">Welcome to DAO Voting</h3>
            <p className="text-sm text-blue-600 mt-1">
              As a DAO member, you can vote on fee proposals and campaign verifications. 
              Select a category below to start voting:
            </p>
            <ul className="text-sm text-blue-600 mt-2 list-disc list-inside">
              <li>Vote on Proposals: Review and vote on fee change proposals (0-5%)</li>
              <li>Vote on Campaigns: Help verify new medical campaign requests</li>
            </ul>
          </div>
        </div>
      </Card>

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
