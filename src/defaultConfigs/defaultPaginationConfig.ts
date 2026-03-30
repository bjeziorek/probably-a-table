import { type TablePaginationPageSizeConfig } from "../types";

export const defaultPaginationConfig: TablePaginationPageSizeConfig = {
    defaultPageSize: 10,
    availablePageSizes: [5, 10, 20, 50, 100]
}