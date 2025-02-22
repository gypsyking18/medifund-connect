
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { connectWallet, ERROR_MAP } from "@/lib/web3";

const ProposalForm = () => {
  const [newFee, setNewFee] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const feeValue = parseFloat(newFee);
      if (isNaN(feeValue) || feeValue <= 0 || feeValue > 5) {
        throw new Error("Fee must be between 0 and 5%");
      }

      const { contract } = await connectWallet();
      const tx = await contract.proposeFeeChange(feeValue);
      await tx.wait();

      toast({
        title: "Success!",
        description: "Your fee proposal has been created.",
      });
      setNewFee("");
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
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create Fee Proposal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newFee">New Service Fee (%)</Label>
            <Input
              id="newFee"
              type="number"
              step="0.01"
              min="0"
              max="5"
              value={newFee}
              onChange={(e) => setNewFee(e.target.value)}
              placeholder="Enter new fee percentage (max 5%)"
              required
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading || !newFee}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Proposal...
              </>
            ) : (
              'Create Proposal'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProposalForm;
