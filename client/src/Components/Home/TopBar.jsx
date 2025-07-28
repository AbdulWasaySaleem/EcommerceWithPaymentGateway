import { Button } from "antd";
import { Filter } from "lucide-react";

const TopBar = ({ onFilterClick }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-gray-800">Best Selling</h2>
    <Button
      icon={<Filter size={16} />}
      onClick={onFilterClick}
      className="border border-gray-300"
    >
      Filter
    </Button>
  </div>
);

export default TopBar;
