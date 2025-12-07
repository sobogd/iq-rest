"use client";

import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Download, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Translations {
  preview: string;
  paperFormat: string;
  qrPerPage: string;
  customText: string;
  customTextPlaceholder: string;
  textSize: string;
  print: string;
  download: string;
  noSlug: string;
  noSlugDescription: string;
  goToSettings: string;
  menuUrl: string;
  formats: {
    a4: string;
    a5: string;
    a6: string;
    letter: string;
  };
  perPage: {
    one: string;
    two: string;
    four: string;
    six: string;
    nine: string;
    sixteen: string;
  };
  textSizes: {
    small: string;
    medium: string;
    large: string;
  };
}

interface QrCodeClientProps {
  t: Translations;
  slug: string | null;
}

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

export function QrCodeClient({ t, slug }: QrCodeClientProps) {
  const [paperFormat, setPaperFormat] = useState<keyof typeof PAPER_FORMATS>("a4");
  const [qrPerPage, setQrPerPage] = useState<keyof typeof QR_PER_PAGE>("sixteen");
  const [customText, setCustomText] = useState<string>("QR Menu\nScan Me");
  const [textSize, setTextSize] = useState<string>("medium");
  const [qrSvg, setQrSvg] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const menuUrl = slug ? `sobogdqr.com/m/${slug}` : "";
  const fullMenuUrl = slug ? `https://sobogdqr.com/m/${slug}` : "";
  const paper = PAPER_FORMATS[paperFormat];
  const isSmallPaper = paperFormat === "a5" || paperFormat === "a6";

  // Reset qrPerPage if switching to small paper with invalid selection
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

  const generatePrintHtml = (svgContent: string, isPreview = false) => {
    const formattedCustomText = customText.replace(/\n/g, "<br>");
    const scanTextSize = getTextSizePx();
    const qrItems = Array(layout.count).fill(null).map(() => `
      <div class="qr-item">
        <div class="qr-wrapper">${svgContent}</div>
        ${customText ? `<div class="scan-text">${formattedCustomText}</div>` : ""}
      </div>
    `).join("");

    const previewStyles = isPreview ? `
      html {
        zoom: 0.4;
      }
    ` : "";

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
                width: 100% !important;
                height: 100% !important;
                transform: none !important;
                zoom: 1 !important;
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
            ${previewStyles}
            .grid {
              display: grid;
              grid-template-columns: repeat(${layout.cols}, 1fr);
              grid-template-rows: repeat(${layout.rows}, 1fr);
              gap: 8mm;
              width: 100%;
              height: 100%;
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

  // Update QR SVG when menuUrl changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const svg = printRef.current?.querySelector("svg")?.outerHTML || "";
      setQrSvg(svg);
    }, 100);
    return () => clearTimeout(timer);
  }, [menuUrl]);

  // Update iframe preview
  useEffect(() => {
    if (!qrSvg || !iframeRef.current) return;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(generatePrintHtml(qrSvg, true));
      doc.close();
    }
  }, [qrSvg, paperFormat, qrPerPage, customText, textSize, layout, paper, qrSizeMm]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow || !qrSvg) return;

    printWindow.document.write(generatePrintHtml(qrSvg));
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
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
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold">{t.noSlug}</h2>
            <p className="text-muted-foreground">{t.noSlugDescription}</p>
            <Link href="/dashboard/settings">
              <Button>{t.goToSettings}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Left Column - Form */}
      <div className="space-y-5">
        {/* Menu URL */}
        <div className="space-y-2">
          <Label>{t.menuUrl}:</Label>
          <a
            href={fullMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-10 px-3 border rounded-md hover:border-foreground/30 transition-colors cursor-pointer"
          >
            <code className="text-sm flex-1 truncate">{menuUrl}</code>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
        </div>

        {/* Paper Format */}
        <div className="space-y-2">
          <Label>{t.paperFormat}:</Label>
          <Select value={paperFormat} onValueChange={(v) => setPaperFormat(v as keyof typeof PAPER_FORMATS)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">{t.formats.a4}</SelectItem>
              <SelectItem value="a5">{t.formats.a5}</SelectItem>
              <SelectItem value="a6">{t.formats.a6}</SelectItem>
              <SelectItem value="letter">{t.formats.letter}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* QR Per Page */}
        <div className="space-y-2">
          <Label>{t.qrPerPage}:</Label>
          <Select value={qrPerPage} onValueChange={(v) => setQrPerPage(v as keyof typeof QR_PER_PAGE)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one">{t.perPage.one}</SelectItem>
              <SelectItem value="two">{t.perPage.two}</SelectItem>
              <SelectItem value="four">{t.perPage.four}</SelectItem>
              {!isSmallPaper && (
                <>
                  <SelectItem value="six">{t.perPage.six}</SelectItem>
                  <SelectItem value="nine">{t.perPage.nine}</SelectItem>
                  <SelectItem value="sixteen">{t.perPage.sixteen}</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Text */}
        <div className="space-y-2">
          <Label>{t.customText}:</Label>
          <Textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={t.customTextPlaceholder}
            rows={2}
          />
        </div>

        {/* Text Size */}
        <div className="space-y-2">
          <Label>{t.textSize}:</Label>
          <Select value={textSize} onValueChange={setTextSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{t.textSizes.small}</SelectItem>
              <SelectItem value="medium">{t.textSizes.medium}</SelectItem>
              <SelectItem value="large">{t.textSizes.large}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button onClick={handlePrint} className="w-full">
            <Printer className="mr-2 h-4 w-4" />
            {t.print}
          </Button>
          <Button onClick={handleDownload} variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            {t.download}
          </Button>
        </div>
      </div>

      {/* Right Column - Preview */}
      <div className="space-y-4">
        {/* Hidden QR code for SVG generation */}
        <div ref={printRef} className="hidden">
          <QRCodeSVG
            value={menuUrl}
            size={200}
            level="L"
          />
        </div>

        {/* Preview iframe */}
        <div className="space-y-2">
          <Label>{t.preview}:</Label>
          <iframe
            ref={iframeRef}
            className="border rounded-lg bg-white shadow-sm w-full"
            style={{
              aspectRatio: `${paper.width}/${paper.height}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
