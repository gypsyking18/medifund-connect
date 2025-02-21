
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignCategory = {
  Surgery: "Surgery",
  Cancer: "Cancer",
  Emergency: "Emergency",
  Others: "Others"
} as const;

const CreateCampaignModal = ({ isOpen, onClose }: CreateCampaignModalProps) => {
  const [form, setForm] = useState({
    patientAddress: '',
    goalAmount: '',
    patientName: '',
    hospital: '',
    hospitalNumber: '',
    doctorName: '',
    category: '',
    duration: '',
    diagnosisReportURI: '',
    treatmentPlanURI: '',
    hospitalLetterURI: '',
    patientIdURI: '',
    identityProofURI: '',
    medicalBillsURI: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!window.ethereum) {
        throw new Error("Please install MetaMask to create a campaign");
      }

      // Add your contract interaction here
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // await contract.createCampaign(
      //   form.patientAddress,
      //   form.goalAmount,
      //   {
      //     patientname: form.patientName,
      //     hospital: form.hospital,
      //     hospitalNumber: form.hospitalNumber,
      //     doctorName: form.doctorName
      //   },
      //   form.duration,
      //   form.category,
      //   {
      //     diagnosisReportURI: form.diagnosisReportURI,
      //     treatmentPlanCostEstimateURI: form.treatmentPlanURI,
      //     hospitalDoctorLetterURI: form.hospitalLetterURI,
      //     patientId: form.patientIdURI,
      //     identityProofURI: form.identityProofURI,
      //     medicalBillsURI: form.medicalBillsURI
      //   }
      // );

      toast({
        title: "Success!",
        description: "Your campaign has been created and is pending verification.",
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create campaign. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Campaign</DialogTitle>
          <DialogDescription>
            Fill in the campaign details to start your medical crowdfunding campaign.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Patient ETH Address</Label>
              <Input
                value={form.patientAddress}
                onChange={(e) => setForm({ ...form, patientAddress: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label>Goal Amount (USD)</Label>
              <Input
                type="number"
                value={form.goalAmount}
                onChange={(e) => setForm({ ...form, goalAmount: e.target.value })}
                placeholder="10000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Patient Name</Label>
              <Input
                value={form.patientName}
                onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Hospital</Label>
              <Input
                value={form.hospital}
                onChange={(e) => setForm({ ...form, hospital: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hospital Number</Label>
              <Input
                value={form.hospitalNumber}
                onChange={(e) => setForm({ ...form, hospitalNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Doctor's Name</Label>
              <Input
                value={form.doctorName}
                onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(CampaignCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (days)</Label>
              <Input
                type="number"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Required Documents</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Diagnosis Report URI"
                value={form.diagnosisReportURI}
                onChange={(e) => setForm({ ...form, diagnosisReportURI: e.target.value })}
              />
              <Input
                placeholder="Treatment Plan URI"
                value={form.treatmentPlanURI}
                onChange={(e) => setForm({ ...form, treatmentPlanURI: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Hospital Letter URI"
              value={form.hospitalLetterURI}
              onChange={(e) => setForm({ ...form, hospitalLetterURI: e.target.value })}
            />
            <Input
              placeholder="Patient ID URI"
              value={form.patientIdURI}
              onChange={(e) => setForm({ ...form, patientIdURI: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Identity Proof URI (Optional)"
              value={form.identityProofURI}
              onChange={(e) => setForm({ ...form, identityProofURI: e.target.value })}
            />
            <Input
              placeholder="Medical Bills URI (Optional)"
              value={form.medicalBillsURI}
              onChange={(e) => setForm({ ...form, medicalBillsURI: e.target.value })}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Campaign...
              </>
            ) : (
              'Create Campaign'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
