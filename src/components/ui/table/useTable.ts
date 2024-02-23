import React, { HTMLAttributes, HTMLProps } from "react";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { findIndex, get, map } from "lodash";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { makeData, Person } from "./makeData";
import button from "@material-tailwind/react/theme/components/button";

const useTable = (widgetData: any) => {
  const { tableData = {} } = widgetData || {};
  const tableName = tableData.name;
  const tableColumns = get(tableData, "columns", []);
  const tableRows = get(tableData, "rows", []);

  const columns = React.useMemo<ColumnDef<any>[]>(() => {
    return tableColumns.map((column: string) => ({
      accessorKey: column,
      header: column,
      cell: flexRender,
    }));
  }, [tableColumns]);

  const data = map(tableRows, (row: string[], index: number) => {
    return row.reduce((acc: any, value: string, index: number) => {
      acc[tableData.columns[index]] = value;
      // add subrows []
      acc.subRows = [];
      return acc;
    }, {});
  });

  const [datat, setData] = React.useState(() => makeData(10, 5, 3));
  console.log("test data", datat);
  console.log("tableData", tableData);
  console.log("tableColumns", tableColumns);
  console.log("tableRows", tableRows);
  console.log("constructed data", data);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const table = useReactTable({
    data: data || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("table", table);

  return {
    tableName,
    table,
  };
};

export default useTable;
