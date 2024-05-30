import { createColumnHelper } from "@tanstack/react-table";
import { IRecipe } from "../../interface/recipes.interface";
import ReactTable from "../../components/Table";
import Button from "../../components/Button";
type TRecipe = {
  data: IRecipe[] | [];
  setEditData: (value?: string | null) => void;
  onDelete: (value: string ) => void;
};
const Recipes: React.FC<TRecipe> = (props) => {
  const columnHelper = createColumnHelper<IRecipe>();
  const columns = [
    columnHelper.accessor((row) => row.title, {
      id: "Title",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("ingredients", {
      header: () => "Ingredients",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("preparation_steps", {
      header: () => <span>Preparation Steps</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("cooking_time", {
      header: "Cooking Time",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("serving_size", {
      header: "Serving Size",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: (info) => (
        <span className="flex gap-2">
          <Button onClick={() => props.setEditData(info.getValue())} >
            Edit
          </Button>
          <Button onClick={() => props.onDelete(info.getValue())} className="bg-red-500">
            Delete
          </Button>
        </span>
      ),
    }),
  ];
  return (
    <div>
      <ReactTable tcolumns={columns} tData={props.data} />
    </div>
  );
};
export default Recipes;
