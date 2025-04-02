
import { cn } from "@/lib/utils";
import { CaseStatus } from "@/store/useCaseStore";
import { Check, Clock } from "lucide-react";

interface CaseStatusBadgeProps {
  status: CaseStatus;
}

const CaseStatusBadge = ({ status }: CaseStatusBadgeProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Approve":
        return <Check className="w-4 h-4" />;
      case "Review":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "Approve":
        return "text-status-approve border-status-approve bg-green-50";
      case "Review":
        return "text-status-review border-status-review bg-yellow-50";
      case "Reject":
        return "text-status-reject border-status-reject bg-red-50";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border",
        getStatusClass()
      )}
    >
      <span className="mr-1">{getStatusIcon()}</span>
      <span>{status}</span>
    </div>
  );
};

export default CaseStatusBadge;
