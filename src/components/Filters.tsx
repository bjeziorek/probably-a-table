import * as Collapsible from "@radix-ui/react-collapsible";
import { Button, Flex, Spinner } from "@radix-ui/themes";
import type { TableFiltersFilters, TableFiltersHandleReset, TableFiltersIsPending, TableFiltersOpen, TableFiltersSetFilters, TableFiltersSetOpen } from "../types/filters";

interface FiltersProps<Filters> {
    open: TableFiltersOpen,
    setOpen: TableFiltersSetOpen,
    isPending: TableFiltersIsPending,
    filters: TableFiltersFilters<Filters>,
    setFilters: TableFiltersSetFilters<Filters>,
    handleReset: TableFiltersHandleReset
}


export function Filters<Filters>(props: FiltersProps<Filters>) {
    const { open, setOpen, isPending, handleReset } = props;


    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger>
                <Button variant="ghost">--- filters ---- {open ? "▲" : "▼"}</Button>
            </Collapsible.Trigger>

            {open && (
                <Collapsible.Content>

                    <div style={{ position: "relative" }}>
                        {isPending && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(33, 33, 33, 0.6)",
                                    backdropFilter: "blur(3px)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 10,
                                    borderRadius: "var(--radius-3)",
                                }}
                            >
                                <Spinner size="3" />
                            </div>
                        )}
                        <Flex direction="column" gap="3" mt="3">
                            <Flex direction="column" gap="4">

                                {isPending && (
                                    <div className="overlay">
                                        <Spinner />
                                    </div>
                                )}


                                {/* Przyciski */}
                                <Flex gap="2" mt="2">
                                    <Button variant="soft" onClick={handleReset}>--- reset ----</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                </Collapsible.Content>
            )}
        </Collapsible.Root>
    )
}