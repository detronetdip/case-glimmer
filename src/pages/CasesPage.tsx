import CasesTable from "@/components/cases/CasesTable";
import CaseFilter from "@/components/cases/CaseFilter";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";

const CasesPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Cases</h1>
          <div className="text-sm text-muted-foreground">
            Individual Onboarding / All Cases(9)
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="mr-2">
          <span className="mr-2 text-sm">Status</span>
          <CaseFilter
            label="In"
            options={["All", "Review", "Approve", "Reject"]}
          />
        </div>
        <div className="ml-4">
          <CaseFilter
            label="Review Queue"
            options={["Individual Onboarding", "Business Verification", "Manual Review"]}
          />
          <span className="mx-2">In</span>
          <CaseFilter
            label="All"
            options={["All", "My Cases"]}
          />
        </div>
        <div className="ml-auto flex items-center">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Clock className="h-4 w-4" />
            <span>Assigned to me</span>
          </Button>
          <Button
            variant="outline"
            className="ml-2 flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Adv. Filters</span>
          </Button>
        </div>
      </div>

      <CasesTable />
    </div>
  );
};

export default CasesPage;
