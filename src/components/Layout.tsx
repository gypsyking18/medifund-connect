
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { connectWallet } from '@/lib/web3';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      console.log("Initiating wallet connection...");
      const { address } = await connectWallet();
      console.log("Wallet connected successfully:", address);
      setWalletAddress(address);
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
    } catch (error: any) {
      console.error("Wallet connection error in component:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            console.log("Found existing connection:", accounts[0]);
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
        }
      }
    };

    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log("Account changed:", accounts);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast({
            title: "Account Changed",
            description: "Wallet account has been updated.",
          });
        } else {
          setWalletAddress("");
          toast({
            variant: "destructive",
            title: "Disconnected",
            description: "Wallet has been disconnected.",
          });
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [toast]);

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
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            <Wallet className="h-4 w-4" />
            {isConnecting ? 'Connecting...' : 
             walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 
             'Connect Wallet'}
          </Button>
        </div>
      </nav>
      
      <main className="pt-16">
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
