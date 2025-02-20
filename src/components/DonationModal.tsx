
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: number;
}

const DonationModal = ({ isOpen, onClose, campaignId }: DonationModalProps) => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEthDonation = async () => {
    try {
      setIsLoading(true);
      // Call the donateWithETH function from your smart contract
      // You'll need to implement the web3 integration and contract calls
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Add contract interaction here
      
      toast({
        title: "Success!",
        description: "Your ETH donation has been processed.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process ETH donation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsdcDonation = async () => {
    try {
      setIsLoading(true);
      // Call the donateWithUSDC function from your smart contract
      // You'll need to implement the web3 integration and contract calls
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Add contract interaction here
      
      toast({
        title: "Success!",
        description: "Your USDC donation has been processed.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process USDC donation. Please try again.",
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
            Choose your preferred currency and enter the amount you wish to donate.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="eth" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="eth">Donate ETH</TabsTrigger>
            <TabsTrigger value="usdc">Donate USDC</TabsTrigger>
          </TabsList>
          
          <TabsContent value="eth">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ethAmount">Amount (ETH)</Label>
                <Input
                  id="ethAmount"
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
                onClick={handleEthDonation}
                disabled={isLoading || !amount}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Donate ETH'
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="usdc">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usdcAmount">Amount (USDC)</Label>
                <Input
                  id="usdcAmount"
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
                onClick={handleUsdcDonation}
                disabled={isLoading || !amount}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Donate USDC'
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
