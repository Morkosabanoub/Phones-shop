import PhoneInfo from "../Components/phoneInfo/phoneInfo";
import UsePhoFilter from "../../hooks/usePhoFilter";
import { useParams } from "react-router-dom";

export default function PhoneInfopage() {
  const { name } = useParams(); 
  const { phoneidfilter, loading } = UsePhoFilter({ phoneName: name });

  if (loading) return <div>Loading...</div>;
  if (!phoneidfilter || phoneidfilter.length === 0)
    return <div>no phone found</div>;

  return (
    <div>
      <PhoneInfo phoneInfo={phoneidfilter[0]} />
      
    </div>
  );
}
