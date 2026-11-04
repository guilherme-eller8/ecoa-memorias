import { CabecalhoTom } from "@/components/landing/CabecalhoTom";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

// Só o logo: a página é curta e não leva de volta ao site das famílias.
export function Cabecalho() {
  return (
    <CabecalhoTom>
      <Container className="relative flex h-16 items-center md:h-[72px]">
        <a
          href="#topo"
          className="inline-flex min-h-12 items-center"
          aria-label="Ecoa Memórias, início"
        >
          <Logo decorativo className="h-12 w-auto md:h-[58px]" />
        </a>
      </Container>
    </CabecalhoTom>
  );
}
