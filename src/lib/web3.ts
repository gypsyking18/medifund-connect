
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = "0x10d0fd8e5773684a3a4c1cc3fd913a146bf201dd";

const CONTRACT_ABI = [
  "function registerMember(address member) external",
  "function createFeeProposal(uint256 newFee) external",
  "function voteOnFeeProposal(uint256 proposalId, bool support) external",
  "function createCampaign(string memory patientName, string memory description) external",
  "function voteOnCampaign(uint256 campaignId, bool support) external"
];

export const connectWallet = async () => {
  console.log("Attempting to connect wallet...");
  
  if (typeof window === 'undefined') {
    throw new Error("Window object not available");
  }

  if (!window.ethereum) {
    throw new Error("Please install MetaMask to connect your wallet");
  }

  try {
    // Request account access
    console.log("Requesting account access...");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (!accounts || accounts.length === 0) {
      throw new Error("No authorized accounts found");
    }

    console.log("Account connected:", accounts[0]);

    // Create Web3 instance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log("Wallet connection successful:", { address });
    
    return { signer, contract, address };
  } catch (error: any) {
    console.error("Wallet connection error:", error);
    throw new Error(error.message || "Failed to connect wallet");
  }
};

export const sanitizeIPFSUri = (uri: string) => 
  uri.startsWith('ipfs://') ? uri.replace('ipfs://', 'https://ipfs.io/ipfs/') : uri;

export const ERROR_MAP: Record<string, string> = {
  "MedicalCrowdfunding__NotDAOMember": "DAO membership required",
  "MedicalCrowdfunding__VotingPeriodOver": "Voting period has ended",
  "MedicalCrowdfunding__FeeExceedsMaximum": "Fee cannot exceed 5%",
  "MedicalCrowdfunding__AlreadyVoted": "You have already voted",
  "MedicalCrowdfunding__ProposalExecuted": "Proposal has already been executed"
};
