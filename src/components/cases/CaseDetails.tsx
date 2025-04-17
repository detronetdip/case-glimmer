
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCaseStore } from "@/store/useCaseStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Flag, RotateCwIcon } from "lucide-react";
import CaseStatusBadge from "./CaseStatusBadge";
import TagBadge from "./TagBadge";
import CaseHistory from "./CaseHistory";
import CaseApplicantDetails from "./CaseApplicantDetails";
import CaseGeoLocation from "./CaseGeoLocation";

const CaseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases, selectedCase, selectCase, clearSelectedCase } = useCaseStore();
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        selectCase(id);
      }, 2000);
    }

    return () => {
      clearSelectedCase();
    };
  }, [id, selectCase, clearSelectedCase]);

  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-effectiv-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="flex gap-2">Fetching <RotateCwIcon className="animate-spin" /> </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-effectiv-background">
      <div className="py-4 px-6 bg-white border-b border-effectiv-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500"
            onClick={() => navigate('/')}
            aria-label="Back to Cases"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <div className="mx-2 h-4 border-l border-effectiv-border" />
          <div className="text-sm text-muted-foreground">
            Individual Onboarding / Default Queue / {selectedCase.applicationId}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="space-x-2">
            <Flag className="h-4 w-4" />
            <span>Mark as Fraud</span>
          </Button>
          <Button variant="default" className="bg-effectiv-purple hover:bg-effectiv-lightPurple">
            Case History
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white border border-effectiv-border rounded-md shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-effectiv-border">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-semibold">{selectedCase.applicationId}</h2>
              <CaseStatusBadge status={selectedCase.status} />
            </div>
            <div className="flex gap-2 " id="ins-bts">
              
              <Button variant="outline">See Decision Path</Button>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Evaluation Time</div>
              <div>{selectedCase.evaluationTime}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Assignee</div>
              <div className="flex items-center space-x-2">
                {selectedCase.assignee ? (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-effectiv-purple text-white text-xs">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedCase.assignee}</span>
                  </>
                ) : (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <span>Unassigned</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {selectedCase.tags && selectedCase.tags.length > 0 && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-1">
                {selectedCase.tags.map((tag) => (
                  <TagBadge key={tag.id} tag={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div id="insight" className="my-4">

        </div>
        <div className="grid grid-cols-7 gap-6">
          <div className="col-span-4">
            <div className="space-y-6">
              <Card>
                <CardHeader className="py-3 px-4 border-b border-effectiv-border">
                  <h3 className="font-semibold">Applicant Details</h3>
                </CardHeader>
                <CardContent className="p-0">
                  <CaseApplicantDetails caseDetails={selectedCase} />
                </CardContent>
              </Card>

              {selectedCase.details?.geoLocation && (
                <Card>
                  <CardHeader className="py-3 px-4 border-b border-effectiv-border">
                    <h3 className="font-semibold">Geo Location</h3>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CaseGeoLocation location={selectedCase.details.geoLocation} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <div className="col-span-3">
            <CaseHistory caseData={selectedCase} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
