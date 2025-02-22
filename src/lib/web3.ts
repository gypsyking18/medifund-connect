
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x10d0fd8e5773684a3a4c1cc3fd913a146bf201dd";

// This would come from your contract compilation
const CONTRACT_ABI = [/* Add your contract ABI here */];

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to connect");
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
  return { signer, contract };
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
