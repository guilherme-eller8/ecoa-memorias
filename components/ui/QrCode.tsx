import QRCode from "qrcode";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type QrCodeProps = {
  /** Endereço codificado. Por padrão, o site. */
  url?: string;
  className?: string;
};

/**
 * O QR impresso em cada capítulo. Gerado no servidor como um único path, em tinta,
 * com a margem de silêncio de 2 módulos para continuar legível por uma câmera de verdade.
 */
export function QrCode({ url = SITE_URL, className }: QrCodeProps) {
  const { modules } = QRCode.create(url, { errorCorrectionLevel: "M" });
  const n = modules.size;
  const margem = 2;
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modules.get(y, x)) d += `M${x + margem} ${y + margem}h1v1h-1z`;
    }
  }
  const lado = n + margem * 2;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${lado} ${lado}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect width={lado} height={lado} fill="var(--papel)" />
      <path d={d} fill="var(--tinta)" />
    </svg>
  );
}
