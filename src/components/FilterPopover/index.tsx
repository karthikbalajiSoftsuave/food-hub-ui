import React from "react";
import Dropdown from "../Dropdown";
import Input from "../Input";
import "./style.scss";
import Button from "../Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface IProps {
  filterProps: any;
  filterData: any;
  onSubmit: (data: any) => void;
}

const FilterPopover: React.FC<IProps> = ({
  filterProps,
  filterData,
  onSubmit,
}) => {
  const payload = filterData?.filters?.length
    ? {
      filters: filterData.filters.map((each: any) =>
          Array.isArray(each.value)
            ? { ...each, value: each.value.join(",") }
            : each
        ),
      }
    : null;

  const { handleSubmit, control } = useForm<any>({
    defaultValues: payload || {
      filters: [{ field: undefined, operator: undefined, value: undefined }],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "filters",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="filterContainer">
        {fields.map((field: any, index: number) => (
          <div key={field.id} className="form-container">
            {filterProps.map((column: any, ind: number) => {
              return (
                <div key={`container${ind}`} className="filterItems">
                  <div className="filter-header">{column.label}</div>
                  {column.type === "select" ? (
                    <Controller
                      name={`filters.${index}.${column.value}`}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Dropdown
                            value={value}
                            optionLabel={"label"}
                            optionValue={"value"}
                            options={column.options}
                            onChange={(e) => onChange(e.target.value)}
                          />
                        );
                      }}
                    />
                  ) : (
                    <Controller
                      name={`filters.${index}.${column.value}`}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Input
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                          />
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
            <span
              onClick={() => {
                fields.length > 1
                  ? remove(index)
                  : update(index, {
                      field: undefined,
                      operator: undefined,
                      value: undefined,
                    });
              }}
            >
              X
            </span>
          </div>
        ))}
        <div
          className={"addIcon"}
          onClick={() =>
            append({ field: undefined, operator: undefined, value: undefined })
          }
        >
          {" "}
          <span>+</span>
        </div>

        <Button variant="primary" type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
};

export default FilterPopover;
