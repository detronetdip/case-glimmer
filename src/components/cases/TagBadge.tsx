
import { cn } from "@/lib/utils";
import { Tag } from "@/store/useCaseStore";

interface TagBadgeProps {
  tag: Tag;
}

const TagBadge = ({ tag }: TagBadgeProps) => {
  const getTagClass = () => {
    switch (tag.color) {
      case "red":
        return "bg-red-100 text-red-800";
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "purple":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getTagClass()
      )}
    >
      {tag.name}
    </span>
  );
};

export default TagBadge;
