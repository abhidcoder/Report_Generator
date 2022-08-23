import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportHelper = ({ data }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "purchase_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);

    console.log(buf);

   
    const view = new Uint8Array(buf);

    console.log(view);
   
    for (let i = 0; i !== s.length; ++i) {
      console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{ A: "Purchase details" }, {}];

    let table1 = [
      {
        A: "Name",
        B: "Product",
        C: "Cost"
      },
    ];

    data.forEach((row) => {
    
      table1.push({
        A: row.Username,
        B: row.Item,
        C: row.Price,
      });
    });


    const finalData = [...title, ...table1];

    console.log(finalData);

    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "purchase_report");

   

    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "Name" ? headerIndexes.push(index) : null
    );

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:C1",
      tbodyRange: `A3:C${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
          : null,
      theadRange1:
        headerIndexes?.length >= 2
          ? `A${headerIndexes[1] + 1}:C${headerIndexes[1] + 1}`
          : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `C${headerIndexes[0] + 1}:C${totalRecords + headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
          : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1
          ? `C${headerIndexes[0] + 1}:C${totalRecords + headerIndexes[1] + 1}`
          : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.column("A").width(15);
        sheet.column("B").width(15);
        sheet.column("C").width(15);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          });
        }

        sheet.range(dataInfo.theadRange).style({
          fill: "FFFD04",
          bold: true,
          horizontalAlignment: "center",
        });

        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            fill: "808080",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            bold: true,
          });
        }

      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownLoadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;