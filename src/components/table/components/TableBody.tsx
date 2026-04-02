import { Table } from "@radix-ui/themes"
import type { TableColumnsColumns } from "../../../types/columns";
import type { TableData } from "../../../types/data";
import { useTableUUID } from "../../../providers/TableProvider";

interface TableBodyProps<Data extends { id: string | number; }> {
    paginated: TableData<Data>,
    columns: TableColumnsColumns<Data>
}

export function TableBody<Data extends { id: string | number; }>(props: TableBodyProps<Data>) {
    const { paginated, columns } = props;
    const uuid = useTableUUID()

    return (
        <Table.Body>
            {paginated.map((model: Data) => (
                <Table.Row key={'TBody-tblRow'+model.id+'-'+uuid}>
                    {columns.filter(c => c.visible).map(col => (
                        <Table.Cell key={'TBody+tblCell-'+col.id+'-'+uuid}>
                            {col.render(model)}
                        </Table.Cell>
                    ))}
                </Table.Row>
            ))}
        </Table.Body>
    )
}