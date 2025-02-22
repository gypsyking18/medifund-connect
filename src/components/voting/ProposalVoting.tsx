
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import type { FeeProposal, Comment } from '@/types/voting';
import { connectWallet, ERROR_MAP } from '@/lib/web3';

const ProposalVoting = () => {
  const [proposals, setProposals] = useState<FeeProposal[]>([]);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchProposals = async () => {
    try {
      const { contract } = await connectWallet();
      const proposalCounter = await contract.feeProposalCounter();
      const proposalsData = [];

      for (let i = 1; i <= proposalCounter; i++) {
        const proposal = await contract.feeProposals(i);
        proposalsData.push({
          id: i,
          proposedFee: proposal.proposedFee.toNumber(),
          yesVotes: proposal.yesVotes.toNumber(),
          noVotes: proposal.noVotes.toNumber(),
          startTime: proposal.startTime.toNumber(),
          endTime: proposal.endTime.toNumber(),
          executed: proposal.executed,
          totalMembersAtCreation: proposal.totalMembersAtCreation.toNumber()
        });
      }

      setProposals(proposalsData);
    } catch (error) {
      console.error("Failed to fetch proposals:", error);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleVote = async (proposalId: number, support: boolean) => {
    try {
      setIsLoading(true);
      const { contract } = await connectWallet();
      
      const tx = await contract.voteOnFeeProposal(proposalId, support);
      await tx.wait();
      
      toast({
        title: "Success!",
        description: "Your vote has been recorded.",
      });

      fetchProposals(); // Refresh proposals after voting
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

  const handleExecute = async (proposalId: number) => {
    try {
      setIsLoading(true);
      const { contract } = await connectWallet();
      
      const tx = await contract.executeFeeProposal(proposalId);
      await tx.wait();
      
      toast({
        title: "Success!",
        description: "Proposal has been executed.",
      });
      
      fetchProposals(); // Refresh proposals after execution
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
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Proposal #{proposal.id}: Change Fee to {proposal.proposedFee}%
                </h3>
                <p className="text-sm text-muted-foreground">
                  Votes: {proposal.yesVotes} Yes / {proposal.noVotes} No
                </p>
                <p className="text-sm text-muted-foreground">
                  Ends: {new Date(proposal.endTime * 1000).toLocaleString()}
                </p>
              </div>
              {!proposal.executed && (
                <Button
                  variant="outline"
                  onClick={() => handleExecute(proposal.id)}
                  disabled={isLoading || Date.now() < proposal.endTime * 1000}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Execute'
                  )}
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
                  disabled={isLoading || proposal.executed}
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
                  disabled={isLoading || proposal.executed}
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProposalVoting;
