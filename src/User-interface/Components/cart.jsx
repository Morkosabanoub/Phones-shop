import useData from "../../hooks/useData";
import useChngtext from "../../hooks/UseChngtext";
import PhoneCard from "../../User-interface/Components/phonecard/phonecard";
import usePhone from "../../hooks/usePhone";
import UseAuth from "../../hooks/AuthContext";

export default function Cart() {
    const { phones, loading } = usePhone();
    const endpoint = `http://localhost:5000/api/general/users`;
    const { text } = useChngtext();
    const { dataList } = useData(endpoint);
    const { user } = UseAuth();

    const foubduser = dataList.find((u) => u.Username === user?.Username);

    const cartIds =
      foubduser?.cart?.map((c) => {
        if (c.id?.$numberInt) {
          return String(c.id.$numberInt); 
        }
        if (c.id?.$numberDouble) {
          return String(Math.floor(Number(c.id.$numberDouble))); 
        }
        return String(c.id);
      }) || [];

    const phonefound = phones.filter((phone) =>
      cartIds.includes(String(phone.id))
    );

    if (loading) return <div>{text.loading}</div>;

    return (
        <div>
            <h1>Cart</h1>
            <div className="grid">
                {phonefound.length > 0 ? (
                    phonefound.map((b) => (
                        <div key={b.id}>
                            <PhoneCard phoneCard={b} />
                        </div>
                    ))
                ) : (
                    <p>Cart is empty</p>
                )}
            </div>
        </div>
    );
}
