import UsePhone from "../hooks/usePhone";
import { generateSlug } from "../Helper/helpers.jsx";

export default function usePhoFilter({ brandId, phoneName }) {
  const { phones, loading } = UsePhone();

  if (!phones) return { filterPhones: [], phoneidfilter: [], loading: true };

  const filterPhones = phones.filter(
    (phone) => phone.brandId === Number(brandId)
  );

  const phoneidfilter = phones.filter(
    (phone) => generateSlug(phone.name) === phoneName
  );

  return { filterPhones, loading, phoneidfilter };
}
