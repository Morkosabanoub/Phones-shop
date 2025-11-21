import { useState } from "react";

export default function useLoadMore(items = [], steps = 15) {
  const [visibleCount, setVisibleCount] = useState(steps);
  const safeItems = Array.isArray(items) ? items : [];

  const visibleItems = safeItems.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + steps);

  const keepload = visibleCount < items.length;

  return { visibleItems, loadMore, keepload };
}
