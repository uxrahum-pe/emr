"use client";

import { createContext, useContext, ReactNode } from "react";

interface AsideContextType {
  navigateToPage: (pageId: string, content: ReactNode) => void;
  resetToMain: () => void;
}

export const AsideContext = createContext<AsideContextType | null>(null);

export function useAside() {
  const context = useContext(AsideContext);
  if (!context) {
    throw new Error("useAside must be used within AsideProvider");
  }
  return context;
}

interface AsideProviderProps {
  children: ReactNode;
  navigateToPage: (pageId: string, content: ReactNode) => void;
  resetToMain: () => void;
}

export function AsideProvider({
  children,
  navigateToPage,
  resetToMain,
}: AsideProviderProps) {
  return (
    <AsideContext.Provider value={{ navigateToPage, resetToMain }}>
      {children}
    </AsideContext.Provider>
  );
}

