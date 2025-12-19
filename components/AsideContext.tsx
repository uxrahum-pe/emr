"use client";

import { ReactNode } from "react";
import { useAsideStore } from "@/stores/useAsideStore";

/**
 * useAside Hook
 *
 * @description Zustand 스토어를 사용하는 useAside 훅입니다.
 * 기존 AsideContext와의 호환성을 유지합니다.
 */
export function useAside() {
  const navigateToPage = useAsideStore((state) => state.navigateToPage);
  const resetToMain = useAsideStore((state) => state.resetToMain);
  const isAnimating = useAsideStore((state) => state.isAnimating);

  return {
    navigateToPage,
    resetToMain,
    isAnimating,
  };
}

/**
 * AsideProvider
 *
 * @description 호환성을 위해 유지되지만, 실제로는 Zustand 스토어를 사용합니다.
 * children을 그대로 반환합니다.
 */
export function AsideProvider({ children }: { children: ReactNode }) {
  // Zustand 스토어를 사용하므로 Provider는 필요 없지만 호환성을 위해 유지
  return <>{children}</>;
}
