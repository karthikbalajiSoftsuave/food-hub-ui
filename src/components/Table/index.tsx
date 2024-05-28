import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'




type tableType={
  tData:any[],
  tcolumns:any[]
}

const ReactTable:React.FC<tableType>=(props)=>{
  const [columns]=React.useState(()=>props.tcolumns)


  const table = useReactTable({
    data: props.tData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
    <table className="table-auto border border-collapse border-gray-400 w-full">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="bg-gray-200">
            {headerGroup.headers.map(header => (
              <th key={header.id} className="p-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="hover:bg-gray-100">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-2 border-t border-gray-300">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id} className="bg-gray-200">
            {footerGroup.headers.map(header => (
              <th key={header.id} className="p-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
    <div className="h-4" />
  </div>
  
  )
}


export default ReactTable