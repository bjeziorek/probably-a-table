import { useState } from "react";
import type { TableData } from "../../types/data";
import { paginate } from "./utils/paginate";

export function usePagination<Data extends { id: string | number; }>(
    sortedData: TableData<Data>,
    defaultPageSize: number
) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const total = sortedData.length;
    const totalPages = Math.ceil(total / pageSize);

    const paginated = paginate(sortedData,page,pageSize);

    return {
        paginated,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize
    }
}
