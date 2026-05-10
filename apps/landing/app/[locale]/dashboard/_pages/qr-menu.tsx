"use client";

import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Link, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../_ui/page-header";
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

const PAPER_FORMATS = {
  a4: { width: 210, height: 297, name: "A4" },
  a5: { width: 148, height: 210, name: "A5" },
  a6: { width: 105, height: 148, name: "A6" },
  letter: { width: 216, height: 279, name: "Letter" },
};

const QR_PER_PAGE = {
  one: { count: 1, cols: 1, rows: 1 },
  two: { count: 2, cols: 1, rows: 2 },
  four: { count: 4, cols: 2, rows: 2 },
  six: { count: 6, cols: 2, rows: 3 },
  nine: { count: 9, cols: 3, rows: 3 },
  sixteen: { count: 16, cols: 4, rows: 4 },
};

interface QrMenuPageProps {
  initialSlug: string | null;
  tableNumbers: number[];
}

export function QrMenuPage({ initialSlug, tableNumbers }: QrMenuPageProps) {
  const t = useTranslations("qrCode");
  const { translations } = useDashboard();
  const router = useRouter();

  const [slug] = useState<string | null>(initialSlug);
  const [paperFormat, setPaperFormat] = useState<keyof typeof PAPER_FORMATS>("a4");
  const [qrPerPage, setQrPerPage] = useState<keyof typeof QR_PER_PAGE>("sixteen");
  const [customText, setCustomText] = useState<string>("QR Menu\nScan Me");
  const [textSize, setTextSize] = useState<string>("medium");
  const [qrSvg, setQrSvg] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<string>("none");
  const printRef = useRef<HTMLDivElement>(null);

  const menuUrl = slug
    ? selectedTable !== "none"
      ? `https://${slug}.iq-rest.com?table=${selectedTable}`
      : `https://${slug}.iq-rest.com`
    : "";
  const paper = PAPER_FORMATS[paperFormat];

  useEffect(() => {
    track(DashboardEvent.SHOWED_QR_MENU);
  }, []);
  const isSmallPaper = paperFormat === "a5" || paperFormat === "a6";

  useEffect(() => {
    if (isSmallPaper && (qrPerPage === "six" || qrPerPage === "nine" || qrPerPage === "sixteen")) {
      setQrPerPage("four");
    }
  }, [isSmallPaper, qrPerPage]);

  const layout = QR_PER_PAGE[qrPerPage];

  const getQrSizeMm = () => {
    const marginMm = 10;
    const gapMm = 8;
    const availableWidth = paper.width - (marginMm * 2) - (gapMm * (layout.cols - 1));
    const availableHeight = paper.height - (marginMm * 2) - (gapMm * (layout.rows - 1));
    const cellWidth = availableWidth / layout.cols;
    const cellHeight = availableHeight / layout.rows;
    return Math.min(cellWidth, cellHeight * 0.7);
  };

  const qrSizeMm = getQrSizeMm();

  const getTextSizePx = () => {
    const sizes: Record<string, { single: string; few: string; many: string }> = {
      small: { single: "32px", few: "26px", many: "22px" },
      medium: { single: "44px", few: "32px", many: "26px" },
      large: { single: "64px", few: "48px", many: "36px" },
    };
    const size = sizes[textSize] || sizes.medium;
    if (layout.count === 1) return size.single;
    if (layout.count <= 4) return size.few;
    return size.many;
  };

  const generatePrintHtml = (svgContent: string) => {
    const formattedCustomText = customText.replace(/\n/g, "<br>");
    const scanTextSize = getTextSizePx();
    const qrItems = Array(layout.count).fill(null).map(() => `
      <div class="qr-item">
        <div class="qr-wrapper">${svgContent}</div>
        ${customText ? `<div class="scan-text">${formattedCustomText}</div>` : ""}
      </div>
    `).join("");

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page {
              size: ${paper.width}mm ${paper.height}mm;
              margin: 0;
            }
            @media print {
              html, body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              width: 100%;
              height: 100%;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 10mm;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(${layout.cols}, 1fr);
              grid-template-rows: repeat(${layout.rows}, 1fr);
              gap: 8mm;
              width: 100%;
              height: 100%;
              place-items: center;
            }
            .qr-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            }
            .qr-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .qr-wrapper svg {
              width: ${qrSizeMm}mm !important;
              height: ${qrSizeMm}mm !important;
            }
            .scan-text {
              font-size: ${scanTextSize};
              font-weight: bold;
              color: #000;
              margin-top: ${layout.count === 1 ? "12px" : "4px"};
            }
          </style>
        </head>
        <body>
          <div class="grid">${qrItems}</div>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const svg = printRef.current?.querySelector("svg")?.outerHTML || "";
      setQrSvg(svg);
    }, 100);
    return () => clearTimeout(timer);
  }, [menuUrl, selectedTable]);

  const handlePrint = () => {
    if (!qrSvg) return;
    const html = generatePrintHtml(qrSvg);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  const handleDownload = () => {
    const svg = printRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code-${slug}.png`;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  if (!slug) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title={translations.pages.qrMenu} />
        <div className="flex-1 flex items-center justify-center px-6 pb-6">
          <div className="text-center">
            <p className="text-sm font-medium">{t("noSlug")}</p>
            <p className="text-xs text-muted-foreground/60 max-w-[270px] mt-2">{t("noSlugDescription")}</p>
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="mt-5 flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity mx-auto"
              style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
            >
              {t("goToSettings")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    toast.success(t("copyUrl"));
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.qrMenu}>
        <Button
          size="sm"
          onClick={() => { track(DashboardEvent.CLICKED_PRINT_QR); handlePrint(); }}
        >
          <Printer className="h-4 w-4 mr-1" />
          {t("print")}
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">
          <div ref={printRef} className="hidden" hidden>
            <QRCodeSVG
              value={menuUrl}
              size={200}
              level="L"
            />
          </div>

          {/* Print settings */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("printSection")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {/* Paper format */}
              <div className="flex items-center h-11 px-4">
                <span className="text-sm text-muted-foreground shrink-0 mr-3">{t("paperFormat")}</span>
                <div className="relative flex-1 flex justify-end">
                  <select
                    value={paperFormat}
                    onChange={(e) => { track(DashboardEvent.CHANGED_PAPER_FORMAT); setPaperFormat(e.target.value as keyof typeof PAPER_FORMATS); }}
                    className="appearance-none bg-transparent text-sm text-right pr-5 cursor-pointer focus:outline-none"
                  >
                    <option value="a4">{t("formats.a4")}</option>
                    <option value="a5">{t("formats.a5")}</option>
                    <option value="a6">{t("formats.a6")}</option>
                    <option value="letter">{t("formats.letter")}</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>
              <div className="border-t border-border mx-4" />
              {/* QR per page */}
              <div className="flex items-center h-11 px-4">
                <span className="text-sm text-muted-foreground shrink-0 mr-3">{t("qrPerPage")}</span>
                <div className="relative flex-1 flex justify-end">
                  <select
                    value={qrPerPage}
                    onChange={(e) => { track(DashboardEvent.CHANGED_QR_PER_PAGE); setQrPerPage(e.target.value as keyof typeof QR_PER_PAGE); }}
                    className="appearance-none bg-transparent text-sm text-right pr-5 cursor-pointer focus:outline-none"
                  >
                    <option value="one">{t("perPage.one")}</option>
                    <option value="two">{t("perPage.two")}</option>
                    <option value="four">{t("perPage.four")}</option>
                    {!isSmallPaper && (
                      <>
                        <option value="six">{t("perPage.six")}</option>
                        <option value="nine">{t("perPage.nine")}</option>
                        <option value="sixteen">{t("perPage.sixteen")}</option>
                      </>
                    )}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>
              <div className="border-t border-border mx-4" />
              {/* Text size */}
              <div className="flex items-center h-11 px-4">
                <span className="text-sm text-muted-foreground shrink-0 mr-3">{t("textSize")}</span>
                <div className="relative flex-1 flex justify-end">
                  <select
                    value={textSize}
                    onChange={(e) => { track(DashboardEvent.CHANGED_TEXT_SIZE); setTextSize(e.target.value); }}
                    className="appearance-none bg-transparent text-sm text-right pr-5 cursor-pointer focus:outline-none"
                  >
                    <option value="small">{t("textSizes.small")}</option>
                    <option value="medium">{t("textSizes.medium")}</option>
                    <option value="large">{t("textSizes.large")}</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>
              {/* Table */}
              {tableNumbers.length > 0 && (
                <>
                  <div className="border-t border-border mx-4" />
                  <div className="flex items-center h-11 px-4">
                    <span className="text-sm text-muted-foreground shrink-0 mr-3">{t("tableQr")}</span>
                    <div className="relative flex-1 flex justify-end">
                      <select
                        value={selectedTable}
                        onChange={(e) => { track(DashboardEvent.CLICKED_TABLE_QR); setSelectedTable(e.target.value); }}
                        className="appearance-none bg-transparent text-sm text-right pr-5 cursor-pointer focus:outline-none"
                      >
                        <option value="none">—</option>
                        {tableNumbers.map((num) => (
                          <option key={num} value={String(num)}>{t("tableNumber", { number: num })}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Custom text */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("customText")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onFocus={() => track(DashboardEvent.FOCUSED_CUSTOM_TEXT)}
                placeholder={t("customTextPlaceholder")}
                rows={2}
                className="w-full px-4 py-3 text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground/30 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <button
                type="button"
                onClick={() => { track(DashboardEvent.CLICKED_DOWNLOAD_QR); handleDownload(); }}
                className="flex items-center w-full h-11 px-4 hover:bg-muted/50 transition-colors"
              >
                <Download className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium text-primary">{t("download")}</span>
              </button>
              <div className="border-t border-border mx-4" />
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center w-full h-11 px-4 hover:bg-muted/50 transition-colors"
              >
                <Link className="h-4 w-4 mr-3 text-primary" />
                <span className="text-sm font-medium text-primary">{t("copyUrl")}</span>
              </button>
            </div>
          </div>

        </DashboardContent>
      </div>
    </div>
  );
}
