
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: number;
  patientName: string;
  status: string;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCampaigns: Campaign[];
}

const DonationModal = ({ isOpen, onClose, activeCampaigns }: DonationModalProps) => {
  const [campaignId, setCampaignId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDonation = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to make donations");
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error("No ethereum account found");
      }

      // Add your contract interaction here
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // await contract.donateToCampaign(campaignId, { value: ethers.utils.parseEther(amount) });

      toast({
        title: "Success!",
        description: "Your donation has been processed successfully.",
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to process donation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
          <DialogDescription>
            Select a campaign and enter the amount you wish to donate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Campaign</Label>
            <Select onValueChange={setCampaignId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Active Campaigns</SelectLabel>
                  {activeCampaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id.toString()}>
                      {campaign.patientName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleDonation}
            disabled={isLoading || !amount || !campaignId}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Donate'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
