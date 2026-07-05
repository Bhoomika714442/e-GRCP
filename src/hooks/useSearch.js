import { useMemo, useState } from "react";

const useSearch = (data = [], fields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const safeData = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }

    if (data && typeof data === "object") {
      return (
        data.requests ||
        data.risks ||
        data.vendors ||
        data.procurements ||
        data.compliance ||
        data.audit ||
        data.contracts ||
        []
      );
    }

    return [];
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return safeData;
    }

    const keyword = searchTerm.toLowerCase();

    return safeData.filter((item) =>
      fields.some((field) => {
        const value = item?.[field];

        if (value === undefined || value === null) {
          return false;
        }

        return value
          .toString()
          .toLowerCase()
          .includes(keyword);
      })
    );
  }, [safeData, fields, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
};

export default useSearch;