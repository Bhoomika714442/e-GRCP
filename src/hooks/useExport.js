const useExport = () => {

    const exportCSV = (
        data = [],
        fileName = "Export"
    ) => {

        if (!data.length) return;

        const headers = Object.keys(data[0]);

        const rows = data.map(item =>
            headers.map(header => item[header])
        );

        const csv = [

            headers.join(","),

            ...rows.map(row => row.join(","))

        ].join("\n");

        const blob = new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = `${fileName}.csv`;

        link.click();

        URL.revokeObjectURL(url);

    };

    return {

        exportCSV,

    };

};

export default useExport;