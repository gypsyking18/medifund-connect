
import { useEffect } from 'react';
import { connectWallet } from '@/lib/web3';

export const useContractEvents = () => {
  useEffect(() => {
    const setupEventListeners = async () => {
      try {
        const { contract } = await connectWallet();

        contract.on("CampaignStatusUpdated", (campaignId, newStatus) => {
          console.log("Campaign status updated:", campaignId.toString(), newStatus);
          // Update UI state here
        });

        contract.on("Voted", (campaignId, voter, approved) => {
          console.log("New vote:", campaignId.toString(), voter, approved);
          // Update UI state here
        });

        contract.on("FeeProposalCreated", (proposalId, newFee) => {
          console.log("New fee proposal:", proposalId.toString(), newFee);
          // Update UI state here
        });

        return () => {
          contract.removeAllListeners();
        };
      } catch (error) {
        console.error("Failed to setup event listeners:", error);
      }
    };

    setupEventListeners();
  }, []);
};

export default useContractEvents;
