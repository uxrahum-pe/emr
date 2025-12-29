import { create } from "zustand";

interface PartCommonStoreState {
  isSmallScreen: boolean;
  activeIndex: number | null;
  selectedTabs: number[];
  selectedPendingTabs: number[];
  selectedSortTab: number;
  sortOrder: "asc" | "desc";
  isQuickActionsHovered: boolean;
  isCustomerDetailOpen: boolean;
  openSidebarMenuPopup:
    | "customer"
    | "foreigner"
    | "agreement"
    | "practiceIndex"
    | "agency"
    | "recordingFile"
    | null;
}

interface PartCommonStoreActions {
  setIsSmallScreen: (value: boolean) => void;
  setActiveIndex: (index: number | null) => void;
  setSelectedTabs: (tabs: number[]) => void;
  setSelectedPendingTabs: (tabs: number[]) => void;
  setSelectedSortTab: (tab: number) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  toggleSortOrder: () => void;
  setIsQuickActionsHovered: (value: boolean) => void;
  setIsCustomerDetailOpen: (value: boolean) => void;
  setOpenSidebarMenuPopup: (
    popup:
      | "customer"
      | "foreigner"
      | "agreement"
      | "practiceIndex"
      | "agency"
      | "recordingFile"
      | null
  ) => void;
  reset: () => void;
}

type PartCommonStore = PartCommonStoreState & PartCommonStoreActions;

const initialState: PartCommonStoreState = {
  isSmallScreen: false,
  activeIndex: null,
  selectedTabs: [0, 1, 2],
  selectedPendingTabs: [0, 1],
  selectedSortTab: 0,
  sortOrder: "desc",
  isQuickActionsHovered: false,
  isCustomerDetailOpen: false,
  openSidebarMenuPopup: null,
};

export const usePartCommonStore = create<PartCommonStore>((set) => ({
  ...initialState,
  setIsSmallScreen: (value) => set({ isSmallScreen: value }),
  setActiveIndex: (index) => set({ activeIndex: index }),
  setSelectedTabs: (tabs) => set({ selectedTabs: tabs }),
  setSelectedPendingTabs: (tabs) => set({ selectedPendingTabs: tabs }),
  setSelectedSortTab: (tab) => set({ selectedSortTab: tab }),
  setSortOrder: (order) => set({ sortOrder: order }),
  toggleSortOrder: () =>
    set((state) => ({
      sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
    })),
  setIsQuickActionsHovered: (value) => set({ isQuickActionsHovered: value }),
  setIsCustomerDetailOpen: (value) => set({ isCustomerDetailOpen: value }),
  setOpenSidebarMenuPopup: (popup) => set({ openSidebarMenuPopup: popup }),
  reset: () => set(initialState),
}));

// 하위 호환성을 위한 별칭 (점진적 마이그레이션용)
export const useReceptionStore = usePartCommonStore;
