
import { cn } from "@/lib/utils";
import { FileText, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-effectiv-border flex flex-col">
      <div className="px-4 py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-sm",
              isActive
                ? "bg-effectiv-purple text-white"
                : "text-gray-700 hover:bg-gray-100"
            )
          }
        >
          <FileText className="h-5 w-5" />
          <span>All Cases</span>
        </NavLink>
      </div>
      
      <div className="px-4 pt-6">
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase px-3 mb-2">
          FAVORITES
        </h3>
        <div className="text-xs text-gray-500 px-3 py-2">
          Click on <Star className="w-4 h-4 inline text-yellow-400" /> icon in any menu items to add as favorite
        </div>
      </div>

      <div className="mt-auto px-4 py-4 border-t border-effectiv-border">
        <div className="flex items-center space-x-3 px-3">
          <Avatar>A</Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">admin user</span>
            <span className="text-xs text-muted-foreground">archeragent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Avatar component
const Avatar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
      {children}
    </div>
  );
};

export default Sidebar;
