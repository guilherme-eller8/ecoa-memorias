import Image from "next/image";
import { fotoOuSepia } from "@/lib/imagens";

type FotoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** cena: foto colorida (.photo). antiga: cópia impressa colada na página (.photo-antiga). */
  tipo: "cena" | "antiga";
  /** Proporção do quadro, ex. "4 / 3". A mesma dentro de cada seção. */
  proporcao: string;
  /** Recorte conferido em 390 e 1440. */
  objectPosition?: string;
  preload?: boolean;
  className?: string;
};

/**
 * Foto da página com o tratamento unificado. Se o arquivo ainda não existe em /public,
 * fica o lugar sépia na mesma proporção, para a troca não mexer no layout.
 */
export function Foto({
  src,
  alt,
  sizes,
  tipo,
  proporcao,
  objectPosition = "50% 50%",
  preload = false,
  className,
}: FotoProps) {
  const caminho = fotoOuSepia(src);
  const miolo =
    caminho === "sepia" ? (
      <span className="photo-sepia" role="img" aria-label={alt} />
    ) : (
      <Image
        src={caminho}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectFit: "cover", objectPosition }}
      />
    );

  if (tipo === "antiga") {
    return (
      <span
        className={["photo-antiga block", className].filter(Boolean).join(" ")}
        style={{ aspectRatio: proporcao }}
      >
        <span className="photo-antiga__img block">{miolo}</span>
      </span>
    );
  }
  return (
    <span
      className={["photo block", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: proporcao }}
    >
      {miolo}
    </span>
  );
}
