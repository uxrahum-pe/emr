/**
 * Counseling Page
 *
 * @description 상담 파트의 메인 페이지입니다. 고객 상태 관리, 직원 일정 조회,
 * 쪽지 및 알림 기능을 제공합니다.
 *
 * @page
 * @route /counseling
 *
 * @remarks
 * - Aside 컴포넌트를 사용하여 우측 슬라이드 페이지를 관리합니다.
 * - NoteClickHandler와 AlarmClickHandler는 Aside 내부에 렌더링되어야 합니다.
 * - MainContent는 역할 기반 라우팅을 사용하여 직원 일정을 표시합니다.
 */

"use client";

import { useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import Aside from "@/components/Aside";
import MainContent from "@/components/counseling/MainContent";
import NoteClickHandler from "@/components/counseling/NoteClickHandler";
import AlarmClickHandler from "@/components/counseling/AlarmClickHandler";
import CustomerStatusSection from "@/components/counseling/CustomerStatusSection";
import AgencyStatusPopup from "@/components/popups/AgencyStatusPopup";
import RecordingFilePopup from "@/components/popups/RecordingFilePopup";
import { useAsideStore } from "@/stores/useAsideStore";
import { usePartCommonStore } from "@/stores/useReceptionStore";
import { usePageHeaderHandlers } from "@/hooks/usePageHeaderHandlers";

export default function CounselingPage() {
  // Zustand 스토어에서 상태 가져오기
  const currentPageId = useAsideStore((state) => state.currentPageId);

  // PageHeader 핸들러 관리 훅 사용
  const {
    noteClickHandler,
    alarmClickHandler,
    handleNoteHandlerReady,
    handleAlarmHandlerReady,
  } = usePageHeaderHandlers();

  // Reception 스토어 상태
  const {
    isSmallScreen,
    activeIndex,
    selectedTabs,
    selectedPendingTabs,
    selectedSortTab,
    isQuickActionsHovered,
    isCustomerDetailOpen,
    openSidebarMenuPopup,
    setIsSmallScreen,
    setActiveIndex,
    setSelectedTabs,
    setSelectedPendingTabs,
    setSelectedSortTab,
    setIsQuickActionsHovered,
    setIsCustomerDetailOpen,
    setOpenSidebarMenuPopup,
  } = usePartCommonStore();

  // 페이지 마운트 시 고객 상세 패널 초기화
  useEffect(() => {
    setIsCustomerDetailOpen(false);
  }, [setIsCustomerDetailOpen]);

  const handleC032Click = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveIndex(activeIndex === index ? null : index);
    },
    [activeIndex, setActiveIndex]
  );

  return (
    <>
      <main className="C007">
        <PageHeader
          title="상담"
          onNoteClick={noteClickHandler}
          isNoteSelected={currentPageId === "my-notes"}
          onAlarmClick={alarmClickHandler}
          isAlarmSelected={currentPageId === "my-alarms"}
        />
        <Aside
          mainContent={() => (
            <MainContent
              onCustomerClick={() => setIsCustomerDetailOpen(true)}
            />
          )}
        >
          <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
          <AlarmClickHandler onHandlerReady={handleAlarmHandlerReady} />
          <CustomerStatusSection
            handleC032Click={handleC032Click}
            isSmallScreen={isSmallScreen}
            setIsSmallScreen={setIsSmallScreen}
            activeIndex={activeIndex}
            selectedTabs={selectedTabs}
            setSelectedTabs={setSelectedTabs}
            selectedPendingTabs={selectedPendingTabs}
            setSelectedPendingTabs={setSelectedPendingTabs}
            selectedSortTab={selectedSortTab}
            setSelectedSortTab={setSelectedSortTab}
            isQuickActionsHovered={isQuickActionsHovered}
            setIsQuickActionsHovered={setIsQuickActionsHovered}
            isCustomerDetailOpen={isCustomerDetailOpen}
            setIsCustomerDetailOpen={setIsCustomerDetailOpen}
          />
        </Aside>
      </main>
      <Sidebar />
      {/* 상담 파트 팝업들 */}
      <AgencyStatusPopup
        isOpen={openSidebarMenuPopup === "agency"}
        onClose={() => setOpenSidebarMenuPopup(null)}
      />
      <RecordingFilePopup
        isOpen={openSidebarMenuPopup === "recordingFile"}
        onClose={() => setOpenSidebarMenuPopup(null)}
      />
    </>
  );
}
