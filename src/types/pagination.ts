export type TablePaginationPage = number;
export type TablePaginationSetPage = React.Dispatch<React.SetStateAction<TablePaginationPage>>;

export type TablePaginationTotalPages = number;

export type TablePaginationPageSize = number;
export type TablePaginationSetPageSize = React.Dispatch<React.SetStateAction<TablePaginationPageSize>>;

/**
 * defaultPageSize - number
 * availablePageSizes - number[]
 */
export interface TablePaginationPageSizeConfig {
  defaultPageSize: number;
  availablePageSizes: number[];
}
