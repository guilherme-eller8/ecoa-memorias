import { existsSync } from "node:fs";
import { join } from "node:path";

/** Caminho da imagem se ela existe em /public; senão "sepia", o lugar liso enquanto ela não chega. */
export function fotoOuSepia(src: string): string {
  return existsSync(join(process.cwd(), "public", src)) ? src : "sepia";
}
