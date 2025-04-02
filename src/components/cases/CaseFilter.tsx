
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CaseFilterProps {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const CaseFilter = ({ label, options, value = "", onChange }: CaseFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-gray-300">
          {label} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-white">
        {options.map((option) => (
          <DropdownMenuItem 
            key={option}
            onClick={() => onChange && onChange(option)}
            className={option === value ? "bg-muted" : ""}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CaseFilter;
