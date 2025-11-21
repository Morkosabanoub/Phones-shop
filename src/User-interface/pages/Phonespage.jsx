import PhonesList from "../Components/phonecard/PhonesList";
import useChngtext from "../../hooks/UseChngtext";

export default function Phonespage() {
    const { text } = useChngtext();
  
  return (

    <>
      <h1>{text.phone}</h1>
    <PhonesList />
  </>
  );
  
  
}
