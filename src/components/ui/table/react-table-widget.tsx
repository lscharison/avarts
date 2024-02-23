import React from "react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { makeData, Person } from "./makeData";
import { WidgetTypes } from "@/types/editor.types";
import useTable from "./useTable";
import { isEmpty } from "lodash";

export type ReactTableWidgetProps = {
  data: WidgetTypes;
};

const ReactTableWidget = ({ data }: ReactTableWidgetProps) => {
  const { table, tableName } = useTable(data);

  //   const columns = React.useMemo<ColumnDef<any>[]>(
  //     () => [
  //       {
  //         header: "Name",
  //         footer: (props) => props.column.id,
  //         columns: [
  //           {
  //             accessorKey: "firstName",
  //             header: ({ table }) => (
  //               <>
  //                 <button
  //                   {...{
  //                     onClick: table.getToggleAllRowsExpandedHandler(),
  //                   }}
  //                 >
  //                   {table.getIsAllRowsExpanded() ? (
  //                     <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
  //                   ) : (
  //                     <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
  //                   )}
  //                 </button>{" "}
  //                 First Name
  //               </>
  //             ),
  //             cell: ({ row, getValue }) => (
  //               <div
  //                 style={{
  //                   // Since rows are flattened by default,
  //                   // we can use the row.depth property
  //                   // and paddingLeft to visually indicate the depth
  //                   // of the row
  //                   paddingLeft: `${row.depth * 2}rem`,
  //                 }}
  //               >
  //                 <>
  //                   {row.getCanExpand() ? (
  //                     <button
  //                       {...{
  //                         onClick: row.getToggleExpandedHandler(),
  //                         style: { cursor: "pointer" },
  //                       }}
  //                     >
  //                       {row.getIsExpanded() ? (
  //                         <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
  //                       ) : (
  //                         <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
  //                       )}
  //                     </button>
  //                   ) : (
  //                     "🔵"
  //                   )}{" "}
  //                   {getValue()}
  //                 </>
  //               </div>
  //             ),
  //             footer: (props) => props.column.id,
  //           },
  //           {
  //             accessorFn: (row) => row.lastName,
  //             id: "lastName",
  //             cell: (info) => info.getValue(),
  //             header: () => <span>Last Name</span>,
  //             footer: (props) => props.column.id,
  //           },
  //         ],
  //       },
  //     ],
  //     []
  //   );

  if (!table) return null;
  if (isEmpty(table)) return null;
  if (isEmpty(tableName)) return null;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <table className="min-w-full text-left text-sm font-light dark:border-neutral-500 border border-blue-gray-100">
            <thead className="border-b font-medium dark:border-neutral-500">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        {header.isPlaceholder ? null : (
                          <div className="font-normal leading-none opacity-70">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="p-4 border-b border-blue-gray-50"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReactTableWidget;
