import { Checkbox, Radio, Button, Drawer } from "antd";
import { Price } from "../../Components/Price";

const FiltersDrawer = ({
  open,
  onClose,
  categories,
  checked,
  radio,
  setChecked,
  setRadio,
  resetFilters,
}) => {
  const handleCategoryChange = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((catId) => catId !== id);
    setChecked(updatedChecked);
  };

  return (
    <Drawer title="Filters" placement="right" onClose={onClose} open={open}>
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-600">By Category</h3>
        {categories.map((cat) => (
          <Checkbox
            key={cat._id}
            onChange={(e) => handleCategoryChange(e.target.checked, cat._id)}
            checked={checked.includes(cat._id)}
          >
            {cat.name}
          </Checkbox>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-600">By Price</h3>
        <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
          {Price.map((p) => (
            <Radio key={p._id} value={p.array}>
              {p.name}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <Button type="primary" danger onClick={resetFilters}>
        Reset Filters
      </Button>
    </Drawer>
  );
};

export default FiltersDrawer;
