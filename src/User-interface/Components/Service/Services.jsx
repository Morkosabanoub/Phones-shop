import useService from "../../../hooks/useService";
import useChngtext from "../../../hooks/UseChngtext";
import Service from "./Service-card";
import "./Service-card.scss";

export default function Services() {
  const { text } = useChngtext();
  const { services, error, loading } = useService();
  if (loading) return <div>{text.Loading}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{text.ourservice}</h1>
      <div className="grid">
        {services.map((serviceshow) => (
          <div key={serviceshow.id}>
            <Service Service={serviceshow} />
          </div>
        ))}
      </div>
    </div>
  );
}
