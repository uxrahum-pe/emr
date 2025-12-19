/**
 * Reception Page
 *
 * @description 원무 파트의 메인 페이지입니다. 고객 상태 관리, 직원 일정 조회,
 * 쪽지 및 알림 기능을 제공합니다.
 *
 * @page
 * @route /reception
 *
 * @remarks
 * - Aside 컴포넌트를 사용하여 우측 슬라이드 페이지를 관리합니다.
 * - NoteClickHandler와 AlarmClickHandler는 Aside 내부에 렌더링되어야 합니다.
 * - MainContent는 역할 기반 라우팅을 사용하여 직원 일정을 표시합니다.
 */

"use client";

import { useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import Aside from "@/components/Aside";
import MainContent from "@/components/reception/MainContent";
import NoteClickHandler from "@/components/reception/NoteClickHandler";
import AlarmClickHandler from "@/components/reception/AlarmClickHandler";
import CustomerStatusSection from "@/components/reception/CustomerStatusSection";
import { useAsideStore } from "@/stores/useAsideStore";
import { useReceptionStore } from "@/stores/useReceptionStore";
import { usePageHeaderHandlers } from "@/hooks/usePageHeaderHandlers";

export default function ReceptionPage() {
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
    setIsSmallScreen,
    setActiveIndex,
    setSelectedTabs,
    setSelectedPendingTabs,
    setSelectedSortTab,
    setIsQuickActionsHovered,
    setIsCustomerDetailOpen,
  } = useReceptionStore();

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
          title="원무"
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
    </>
  );
}
