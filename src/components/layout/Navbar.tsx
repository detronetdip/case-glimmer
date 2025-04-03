import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, HelpCircle, MessageSquare, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-effectiv-border bg-white px-4 py-2 flex items-center justify-between h-14">
      <div className="flex items-center">
        <div className="py-8">
          <div className="text-effectiv-purple font-bold text-xl mr-6">CMS</div>
          {/* <div className="text-effectiv-purple text-xs mr-6">Case management syatem</div> */}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 focus-visible:ring-effectiv-purple"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-effectiv-purple"></span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-effectiv-purple text-white text-sm">A</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
