export const generateSlug = (name) => {
  if (!name || typeof name !== "string") return "";
  return name.toLowerCase().replace(/\s+/g, "");
};
export const scrollToOutlet = () => {
    const el = document.getElementById("main-outlet");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
