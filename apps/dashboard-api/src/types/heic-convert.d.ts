declare module "heic-convert" {
  interface HeicConvertOptions {
    buffer: Buffer | ArrayBuffer | Uint8Array;
    format: "JPEG" | "PNG";
    quality?: number; // 0..1, JPEG only
  }
  function convert(options: HeicConvertOptions): Promise<Buffer>;
  export = convert;
}
