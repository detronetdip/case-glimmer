
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCaseStore } from "@/store/useCaseStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import CaseStatusBadge from "./CaseStatusBadge";
import TagBadge from "./TagBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CasesTable = () => {
  const { cases, loading, fetchCases } = useCaseStore();

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  if (loading) {
    return <div className="p-8 text-center">Loading cases...</div>;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[120px]">STATUS</TableHead>
            <TableHead>APPLICATION ID</TableHead>
            <TableHead>FIRST NAME</TableHead>
            <TableHead>LAST NAME</TableHead>
            <TableHead>EVALUATION TIME</TableHead>
            <TableHead>TAGS</TableHead>
            <TableHead>ASSIGNEE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caseItem) => (
            <TableRow key={caseItem.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <CaseStatusBadge status={caseItem.status} />
              </TableCell>
              <TableCell>
                <Link 
                  to={`/cases/${caseItem.id}`} 
                  className="text-effectiv-purple hover:underline font-medium"
                >
                  {caseItem.applicationId}
                </Link>
              </TableCell>
              <TableCell>{caseItem.firstName}</TableCell>
              <TableCell>{caseItem.lastName}</TableCell>
              <TableCell>{caseItem.evaluationTime}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {caseItem.tags.map((tag) => (
                    <TagBadge key={tag.id} tag={tag} />
                  ))}
                  {caseItem.tags.length === 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      No Tags
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {caseItem.assignee ? (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-effectiv-purple text-white text-xs">
                        I
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{caseItem.assignee}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Unassigned</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">25 per page</div>
        <div className="flex items-center space-x-2">
          <button className="h-8 w-8 rounded-md border border-input flex items-center justify-center">
            &lt;
          </button>
          <button className="h-8 w-8 rounded-md border border-input bg-effectiv-purple text-white flex items-center justify-center">
            1
          </button>
          <button className="h-8 w-8 rounded-md border border-input flex items-center justify-center">
            2
          </button>
          <span className="h-8 w-8 flex items-center justify-center">...</span>
          <button className="h-8 w-8 rounded-md border border-input flex items-center justify-center">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CasesTable;
