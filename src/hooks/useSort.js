import { useMemo, useState } from "react";

const useSort = (
    data = [],
    initialField = "",
    initialOrder = "asc"
) => {

    const [sortBy, setSortBy] = useState(initialField);

    const [sortOrder, setSortOrder] = useState(initialOrder);

    const sortedData = useMemo(() => {

        if (!sortBy) return data;

        return [...data].sort((a, b) => {

            let first = a[sortBy];
            let second = b[sortBy];

            if (typeof first === "string") {

                first = first.toLowerCase();
                second = second.toLowerCase();

                return sortOrder === "asc"
                    ? first.localeCompare(second)
                    : second.localeCompare(first);
            }

            return sortOrder === "asc"
                ? first - second
                : second - first;

        });

    }, [data, sortBy, sortOrder]);

    return {

        sortedData,

        sortBy,

        sortOrder,

        setSortBy,

        setSortOrder,

    };

};

export default useSort;