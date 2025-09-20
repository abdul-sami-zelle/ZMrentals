import { useEffect, useState } from "react";

export default function useDropdownNavigation(ref, isOpen, itemClass, onSelect) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const container = ref.current;
    const items = container.querySelectorAll(`.${itemClass}`);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); // prevent page scroll

        if (items.length === 0) return;

        setActiveIndex((prev) => {
          let newIndex = prev;

          if (e.key === "ArrowDown") {
            newIndex = prev < items.length - 1 ? prev + 1 : items.length - 1;
          } else if (e.key === "ArrowUp") {
            newIndex = prev > 0 ? prev - 1 : 0;
          }

          // Scroll active item into view
          items[newIndex]?.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
          });

          return newIndex;
        });
      }

      // ✅ Trigger click on active item with Enter/Space
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();

        if (activeIndex >= 0 && items[activeIndex]) {
          items[activeIndex].click(); // simulate click
          if (onSelect) {
            onSelect(items[activeIndex], activeIndex);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, ref, itemClass, activeIndex, onSelect]);

  // reset index when closed
  useEffect(() => {
    if (!isOpen) setActiveIndex(-1);
  }, [isOpen]);

  return activeIndex;
}
