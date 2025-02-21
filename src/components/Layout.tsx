import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please install MetaMask to connect your wallet.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect wallet. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-clash-display font-bold text-xl">careBridge</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate('/campaigns')}>
              Browse Campaigns
            </Button>
            <Button variant="ghost" onClick={() => navigate('/how-it-works')}>
              How It Works
            </Button>
            <Button variant="ghost" onClick={() => navigate('/dao')}>
              DAO
            </Button>
            <Button variant="ghost" onClick={() => navigate('/become-dao')}>
              Become a DAO
            </Button>
          </div>

          <Button 
            className="rounded-full flex items-center gap-2" 
            onClick={connectWallet}
          >
            <Wallet className="h-4 w-4" />
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </nav>
      
      <main>
        {children}
      </main>

      <footer className="bg-muted mt-20">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-clash-display font-bold">careBridge</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering healthcare through decentralized crowdfunding.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Browse Campaigns
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Start a Campaign
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    How It Works
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">DAO</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Vote
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Proposals
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Become a DAO
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    FAQ
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    Contact
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} careBridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
