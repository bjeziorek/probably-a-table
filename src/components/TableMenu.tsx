import { Button, DropdownMenu, Flex, Select, Text } from "@radix-ui/themes";
import { t } from "i18next";
import type { TablePaginationPage, TablePaginationPageSize, TablePaginationSetPage, TablePaginationSetPageSize, TablePaginationTotalPages } from "../types/pagination";
import type { TableColumnsColumns, TableColumnsToggleColumn } from "../types/columns";
import { defaultTranslations } from "./translations/defaultTranslations";

interface TableMenuProps<Data> {
    page: TablePaginationPage,
    setPage: TablePaginationSetPage,
    totalPages: TablePaginationTotalPages,
    setPageSize: TablePaginationSetPageSize,
    pageSize: TablePaginationPageSize,
    columns: TableColumnsColumns<Data>,
    toggleColumn: TableColumnsToggleColumn
}

export function TableMenu<Data>(props: TableMenuProps<Data>) {
    const {
        page,
        setPage,
        totalPages,
        setPageSize,
        pageSize,
        columns,
        toggleColumn
    } = props;

    return (
        <>
        <h2 className="sr-only">{defaultTranslations.tableMenuSR}</h2>
        <Flex gap="3" align="center" mt="4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">{defaultTranslations.tableMenuColumnsBtn}</Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    {columns.map(col => (
                        <DropdownMenu.CheckboxItem
                            key={col.id}
                            checked={col.visible}
                            onCheckedChange={() => toggleColumn(col.id)}
                        >
                            {col.label}
                        </DropdownMenu.CheckboxItem>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <Button
                variant="soft"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
            >
                {defaultTranslations.tableMenuPreviousBtn}
            </Button>
            <Text>
                {defaultTranslations.tableMenuPageLbl} {page} z {totalPages}
            </Text>
            <Button
                variant="soft"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
            >
                {defaultTranslations.tableMenuNextBtn}
            </Button>
            <Select.Root
                value={String(pageSize)}
                onValueChange={(v) => {
                    setPageSize(Number(v));
                    setPage(1);
                }}
            >
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value="4">4</Select.Item>
                    <Select.Item value="10">10</Select.Item>
                    <Select.Item value="20">20</Select.Item>
                    <Select.Item value="50">50</Select.Item>
                </Select.Content>
            </Select.Root>
        </Flex>
</>
    )
}