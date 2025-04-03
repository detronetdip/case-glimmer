
import { Case } from "@/store/useCaseStore";

interface CaseApplicantDetailsProps {
  caseDetails: Case;
}

const CaseApplicantDetails = ({ caseDetails }: CaseApplicantDetailsProps) => {
  const details = caseDetails.details || {};
  
  const fields = [
    { label: "First Name", value: caseDetails.firstName },
    { label: "Last Name", value: caseDetails.lastName },
    { label: "SSN", value: details.ssn },
    { label: "Primary Address", value: details.primaryAddress },
    { label: "Primary Email", value: details.primaryEmail },
    { label: "Primary Phone", value: details.primaryPhone },
    { label: "Date Of Birth", value: details.dateOfBirth },
    { label: "Occupation", value: details.occupation },
    { label: "Employer", value: details.employer },
  ];

  return (
    <div className="divide-y divide-gray-100">
      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-3 py-3 px-4">
          <div className="text-sm text-gray-500">{field.label}</div>
          <div className="col-span-2 text-sm">{field.value || "-"}</div>
        </div>
      ))}
    </div>
  );
};

export default CaseApplicantDetails;
