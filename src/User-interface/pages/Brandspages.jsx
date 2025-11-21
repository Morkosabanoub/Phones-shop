import { useParams } from "react-router-dom";
import Brands from "../Components/brands/brands";
import UseBrands from "../../hooks/useBrands";

export default function BrandPage() {
  const { brandName } = useParams();
  const { brands } = UseBrands();

  if (!brands) return <div>Loading...</div>;

  const brand = brands.find(
    (b) => b.name.toLowerCase() === brandName.toLowerCase()
  );

  if (!brand) return <div>Brand not found</div>;

  return (
    <div className="brandscontainer">
      <Brands brandId={brand.id} />
    </div>
  );
}
