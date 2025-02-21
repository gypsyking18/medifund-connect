
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const BecomeDAO = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to register");
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error("No ethereum account found");
      }

      // Add contract interaction here
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // await contract.registerMember(accounts[0]);

      toast({
        title: "Success!",
        description: "You have successfully registered as a DAO member.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to register. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimMembership = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to claim membership");
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error("No ethereum account found");
      }

      // Add contract interaction here
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // await contract.claimMembership();

      toast({
        title: "Success!",
        description: "You have successfully claimed your DAO membership.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to claim membership. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Become a DAO Member</h1>
      
      <div className="max-w-2xl mx-auto grid gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Register as Initial Member</h2>
          <p className="text-muted-foreground mb-6">
            Join as one of the initial DAO members during the setup phase.
          </p>
          <Button 
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              'Register as Member'
            )}
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Claim Membership through Donations</h2>
          <p className="text-muted-foreground mb-6">
            If you've donated at least $10 to 60 or more unique campaigns, you can claim your DAO membership.
          </p>
          <Button 
            onClick={handleClaimMembership}
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Claiming...
              </>
            ) : (
              'Claim Membership'
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default BecomeDAO;
