
export interface FeeProposal {
  id: number;
  proposedFee: number;
  yesVotes: number;
  noVotes: number;
  startTime: number;
  endTime: number;
  executed: boolean;
  totalMembersAtCreation: number;
  comments?: Comment[];
}

export interface Campaign {
  id: number;
  status: string;
  patientName: string;
  description: string;
  yesVotes: number;
  noVotes: number;
  deadline: number;
  comments?: Comment[];
}

export interface Comment {
  voter: string;
  reason: string;
  timestamp: number;
  vote: boolean;
}
