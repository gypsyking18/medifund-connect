
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Campaign, Comment } from '@/types/voting';

const CampaignVoting = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleVote = async (campaignId: number, approve: boolean) => {
    try {
      setIsLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Add contract interaction here
      // await contract.voteOnCampaign(campaignId, approve);
      
      if (reason.trim()) {
        // Store comment logic here
      }

      toast({
        title: "Success!",
        description: "Your vote has been recorded.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit vote.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = async (campaignId: number) => {
    try {
      setIsLoading(true);
      // Add contract interaction here
      // await contract.finalizeCampaign(campaignId);
      
      toast({
        title: "Success!",
        description: "Campaign has been finalized.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to finalize campaign.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {[/* Add mock campaigns here */].map((campaign) => (
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
              </div>
              {campaign.status === "PendingVerification" && (
                <Button
                  variant="outline"
                  onClick={() => handleFinalize(campaign.id)}
                  disabled={isLoading}
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

            {campaign.comments && campaign.comments.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Comments</h4>
                <div className="space-y-2">
                  {campaign.comments.map((comment, index) => (
                    <div key={index} className="bg-muted p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.voter.slice(0, 6)}...{comment.voter.slice(-4)}</span>
                        {comment.vote ? (
                          <ThumbsUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <ThumbsDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm mt-1">{comment.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignVoting;
