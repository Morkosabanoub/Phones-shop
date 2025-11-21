import "./Service-card.scss";

export default function ServiceCard({ Service }) {
  if (!Service) return null;

  return (
    <div className="service-card">
      <i className={Service.icon || ""}></i>
      <h3>{Service.title || ""}</h3>
      <p>{Service.text || ""}</p>
    </div>
  );
}
