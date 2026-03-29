import { useTranslation } from "react-i18next";
import type { TableSearchSearch, TableSearchSetSearch } from "../types/search";

interface SimpleSearchProps {
    search: TableSearchSearch,
    setSearch: TableSearchSetSearch
}

export function SimpleSearch(props: SimpleSearchProps) {
    const { search, setSearch } = props;
    const { t } = useTranslation();

    return (
        <>
            <h2 className='sr-only'>{t("table.simpleSearch")}</h2>
               <input
                    placeholder={t("models.searchSimplePlaceholder")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "300px" }}
                />
        </>

    )
}
