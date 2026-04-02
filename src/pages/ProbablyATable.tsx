import { Card } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { useSort } from "../hooks/useSort/useSort";
import { useFilter } from "../hooks/useFilter/useFilter";
import { usePagination } from "../hooks/usePagination/usePagination";
import { useColumns } from "../hooks/useColumns/useColumns";
import { SimpleSearch } from "../components/SimpleSearch";
import { TableMenu } from "../components/TableMenu";
import { TableFull } from "../components/table/TableFull";
import type { TableData } from "../types/data";
import type { TableFiltersFilters } from "../types/filters";
import type { TableColumnsColumns } from "../types/columns";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { type TablePaginationPageSizeConfig } from "../types";
import { defaultPaginationConfig } from "../defaultConfigs/defaultPaginationConfig";
import { defaultTranslations } from "../components/translations/defaultTranslations";
import { v4 as uuid } from "uuid"
import { TableContext } from "../providers/TableProvider";

interface ProbablyATableProps<Data extends { id: string | number; }, Filters> {
    columns: TableColumnsColumns<Data>,
    data: TableData<Data>,
    filters: TableFiltersFilters<Filters>,
    defaultFilters: TableFiltersFilters<Filters>,
    paginationConfig?: TablePaginationPageSizeConfig
}

export default function ProbablyATable<Data extends { id: string | number; }, Filters>(props: ProbablyATableProps<Data, Filters>) {

    // PROPS
    const {
        columns: propCols,
        data: propData,
        filters: propFilters,
        defaultFilters,
        paginationConfig = defaultPaginationConfig
    } = props;

    // STATES
    const [search, setSearch] = useState("");
    // const [open, setOpen] = useState(false);

    // CONSTS
    const debouncedSearch = useDebouncedValue(search, 300);
    const tableUUID = useRef(uuid())

    // HOOKS
    const { filtered } = useFilter<Data, Filters>(propData, debouncedSearch, propFilters, defaultFilters);
    const { sortedData, sort, toggleSort } = useSort(filtered)
    const { paginated,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize } = usePagination(sortedData, paginationConfig.defaultPageSize)
    const { toggleColumn,
        columns,
        handleDrop,
        setDragged } = useColumns(propCols)

    return (
         <TableContext.Provider value={{ tableUUID: tableUUID.current }}>
            <h2 className='sr-only'>{defaultTranslations.tableSR}</h2>
            <Card>
                <SimpleSearch search={search} setSearch={setSearch}></SimpleSearch>
                {/* <Filters open={open} setOpen={setOpen} isPending={isPending} filters={filters} setFilters={setFilters} handleReset={handleReset} ></Filters> */}
            </Card>


            <Card className="mt-4">
                <TableMenu page={page} setPage={setPage} totalPages={totalPages} setPageSize={setPageSize} pageSize={pageSize} columns={columns} toggleColumn={toggleColumn} paginationConfig={paginationConfig}></TableMenu>


                <TableFull columns={columns} setDragged={setDragged} handleDrop={handleDrop} toggleSort={toggleSort} sort={sort} paginated={paginated}></TableFull>
            </Card>
         </TableContext.Provider>
    );
}
