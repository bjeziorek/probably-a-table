import { Table } from "@radix-ui/themes"
import type { TableColumnsColumn, TableColumnsColumns } from "../../../types/columns";
import type { TableSortSort, TableSortToggleSort } from "../../../types/sort";
import type { TableDragHandleDrop, TableDragSetDragged } from "../../../types/drag";
import { useTableUUID } from "../../../providers/TableProvider";

interface TableHeaderProps<Data> {
    setDragged: TableDragSetDragged,
    handleDrop: TableDragHandleDrop,
    columns: TableColumnsColumns<Data>,
    toggleSort: TableSortToggleSort<Data>,
    sort: TableSortSort<Data>
}

export function TableHeader<Data>(props: TableHeaderProps<Data>) {
    const { setDragged, handleDrop, columns, toggleSort, sort } = props;
    const uuid = useTableUUID()

    return (
        <Table.Header>
            <Table.Row>
                {columns.filter(c => c.visible).map((col: TableColumnsColumn<Data>) => (
                    <Table.ColumnHeaderCell
                        key={'THead-Column-'+col.id+'-'+uuid}
                        draggable
                        onDragStart={() => setDragged(col.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(col.id)}
                        onClick={() => toggleSort(col)}
                    >
                        {col.label} {sort.column?.id === col.id && (sort.direction === "asc" ? "▲" : "▼")}
                    </Table.ColumnHeaderCell>
                ))}
            </Table.Row>
        </Table.Header>
    )
}