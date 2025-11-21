import { Link } from "react-router-dom";
import useBrands from "../../../hooks/useBrands";
import "./brandsNav.scss";
import useChngtext from "../../../hooks/UseChngtext";

export default function BrandsNav() {
  const { text } = useChngtext();

  const { brands } = useBrands();

  if (!brands) return <div>{text.Loading}</div>;

  return (
    <div className="BrandsNav">
      {brands.map((brand) => (
        <div className="brand" key={brand.id}>
          <Link to={`/brand/${brand.name}`}>
            <img src={brand.logo} alt={brand.name} loading="lazy" />
          </Link>
        </div>
      ))}
    </div>
  );
}
