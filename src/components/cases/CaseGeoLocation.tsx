
interface CaseGeoLocationProps {
  location: {
    lat: number;
    lng: number;
  };
}

const CaseGeoLocation = ({ location }: CaseGeoLocationProps) => {
  return (
    <div className="h-64 border-t border-effectiv-border relative bg-gray-100 p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/lovable-uploads/7ee061d2-5a7a-4786-ac6a-d303aa01f656.png" 
          alt="Map location"
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default CaseGeoLocation;
