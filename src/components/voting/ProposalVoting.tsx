
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import type { FeeProposal, Comment } from '@/types/voting';

const ProposalVoting = () => {
  const [selectedProposal, setSelectedProposal] = useState<FeeProposal | null>(null);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleVote = async (proposalId: number, support: boolean) => {
    try {
      setIsLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Add contract interaction here
      // await contract.voteOnFeeProposal(proposalId, support);
      
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

  const handleExecute = async (proposalId: number) => {
    try {
      setIsLoading(true);
      // Add contract interaction here
      // await contract.executeFeeProposal(proposalId);
      
      toast({
        title: "Success!",
        description: "Proposal has been executed.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to execute proposal.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {[/* Add mock proposals here */].map((proposal) => (
          <Card key={proposal.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Proposal #{proposal.id}: Change Fee to {proposal.proposedFee}%
                </h3>
                <p className="text-sm text-muted-foreground">
                  Votes: {proposal.yesVotes} Yes / {proposal.noVotes} No
                </p>
              </div>
              {!proposal.executed && (
                <Button
                  variant="outline"
                  onClick={() => handleExecute(proposal.id)}
                  disabled={isLoading}
                >
                  Execute
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
                  onClick={() => handleVote(proposal.id, true)}
                  disabled={isLoading}
                  className="flex-1"
                  variant="outline"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ThumbsUp className="mr-2 h-4 w-4" />
                  )}
                  Vote Yes
                </Button>
                <Button
                  onClick={() => handleVote(proposal.id, false)}
                  disabled={isLoading}
                  className="flex-1"
                  variant="outline"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ThumbsDown className="mr-2 h-4 w-4" />
                  )}
                  Vote No
                </Button>
              </div>
            </div>

            {proposal.comments && proposal.comments.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Comments</h4>
                <div className="space-y-2">
                  {proposal.comments.map((comment, index) => (
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

export default ProposalVoting;
