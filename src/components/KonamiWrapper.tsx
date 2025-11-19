"use client";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import MatrixRain from "./MatrixRain";

export default function KonamiWrapper() {
  const triggered = useKonamiCode();

  return triggered ? <MatrixRain /> : null;
}
