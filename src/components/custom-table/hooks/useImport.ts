/* eslint-disable no-case-declarations */
import { useState } from 'react';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as XLSX from 'xlsx';

import notification from '@lib/notification';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type ExportType = 'pdf' | 'excel';

interface UseImportOptions {
  fileName?: string;
  sheetName?: string;
  header?: string[];
  orientation?: 'landscape' | 'portrait';
  pageSize?: string;
}

/**
 * @description This hook is used to export data with pdf or excel uses pdfmake and xlsx package.
 * @param data The data to be exported
 * @param type { 'pdf' | 'excel' }
 * @param options The options for the export (fileName, sheetName, header, orientation, pageSize)
 * @returns Returns the loading state and the handleExport function
 */
function useImport<T extends object>(data: T[], options?: UseImportOptions) {
  const [loading, setLoading] = useState(false);

  const handleExport = (type: ExportType) => {
    setLoading(true);

    switch (type) {
      case 'pdf':
        const tableColumnNames = Object.keys(data[0] || {}).map(
          (key) => key.charAt(0).toUpperCase() + key.slice(1)
        );

        const date = new Date().toLocaleDateString();

        const docDefinition: TDocumentDefinitions = {
          watermark: {
            text: `${date} - Requester`,
            color: '#ff5c00',
            opacity: 0.1,
            bold: true,
            italics: false,
          },
          defaultStyle: {
            alignment: 'justify',
            noWrap: false,
            fontSize: 8,
          },
          content: [
            {
              alignment: 'center',
              layout: 'tableLayouts',
              table: {
                headerRows: 1,
                widths: [...tableColumnNames.map(() => 'auto')],
                body: [
                  [...tableColumnNames],
                  ...data.map((row) => Object.values(row)),
                ],
              },
            },
          ],
        };

        pdfMake
          .createPdf(docDefinition, {
            tableLayouts: {
              fillColor: (rowIndex: number) => {
                if (rowIndex === 0) {
                  return '#ff5c00';
                }

                return rowIndex % 2 === 0 ? '#f5f5f5' : '#fff';
              },
            },
          })
          .download(`${date} - Table.pdf`);

        pdfMake
          .createPdf(docDefinition)
          .download(`${options?.fileName ?? 'document'}.pdf`, () => {
            notification('PDF exported successfully.');
            setLoading(false);
          });
        break;

      case 'excel':
        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          options?.sheetName || 'Sheet1'
        );
        XLSX.writeFile(workbook, `${options?.fileName ?? 'document'}.xlsx`);

        notification('Excel exported successfully.');
        setLoading(false);
        break;

      default:
        setLoading(false);
        break;
    }
  };

  return { loading, handleExport };
}

export default useImport;
