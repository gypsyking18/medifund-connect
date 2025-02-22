
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Campaign } from '@/types/voting';
import { connectWallet, ERROR_MAP } from '@/lib/web3';

const CampaignVoting = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    try {
      const { contract } = await connectWallet();
      const campaignCount = await contract.getCampaignCount();
      const campaignsData = [];

      for (let i = 1; i <= campaignCount; i++) {
        const campaign = await contract.campaigns(i);
        if (campaign.status === "PendingVerification") {
          const description = await contract.getCampaignDescription(i);
          campaignsData.push({
            id: i,
            status: campaign.status,
            patientName: description.patientName,
            description: "Medical Campaign",
            yesVotes: (await contract.s_campaignYesVotes(i)).toNumber(),
            noVotes: (await contract.s_campaignNoVotes(i)).toNumber(),
            deadline: (await contract.campaignCreationTime(i)).toNumber() + (await contract.votingDuration()).toNumber()
          });
        }
      }

      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleVote = async (campaignId: number, approve: boolean) => {
    try {
      setIsLoading(true);
      const { contract } = await connectWallet();
      
      const tx = await contract.voteOnCampaign(campaignId, approve);
      await tx.wait();
      
      toast({
        title: "Success!",
        description: "Your vote has been recorded.",
      });

      fetchCampaigns(); // Refresh campaigns after voting
    } catch (error: any) {
      const errorMessage = ERROR_MAP[error.code] || error.message;
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = async (campaignId: number) => {
    try {
      setIsLoading(true);
      const { contract } = await connectWallet();
      
      const tx = await contract.finalizeCampaign(campaignId);
      await tx.wait();
      
      toast({
        title: "Success!",
        description: "Campaign has been finalized.",
      });
      
      fetchCampaigns(); // Refresh campaigns after finalization
    } catch (error: any) {
      const errorMessage = ERROR_MAP[error.code] || error.message;
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Campaign #{campaign.id}: {campaign.patientName}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {campaign.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  Votes: {campaign.yesVotes} Yes / {campaign.noVotes} No
                </p>
                <p className="text-sm text-muted-foreground">
                  Deadline: {new Date(campaign.deadline * 1000).toLocaleString()}
                </p>
              </div>
              {campaign.status === "PendingVerification" && (
                <Button
                  variant="outline"
                  onClick={() => handleFinalize(campaign.id)}
                  disabled={isLoading || Date.now() < campaign.deadline * 1000}
                >
                  Finalize
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Optional: Add your reason for voting (public)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mb-4"
              />
              
              <div className="flex gap-4">
                <Button
                  onClick={() => handleVote(campaign.id, true)}
                  disabled={isLoading}
                  className="flex-1"
                  variant="outline"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ThumbsUp className="mr-2 h-4 w-4" />
                  )}
                  Approve
                </Button>
                <Button
                  onClick={() => handleVote(campaign.id, false)}
                  disabled={isLoading}
                  className="flex-1"
                  variant="outline"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ThumbsDown className="mr-2 h-4 w-4" />
                  )}
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignVoting;
