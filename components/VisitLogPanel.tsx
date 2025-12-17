"use client";

import { useState, useRef, useEffect } from "react";
import { TimelineViewMode } from "@/types/timeline";
import { ScrollableContainerRef } from "@/components/ScrollableContainer";
import TimelineSidebar from "@/components/TimelineSidebar";
import TimelineContent from "@/components/TimelineContent";
import VisitLogContent from "@/components/VisitLogContent";
import { useTimelineScrollSync } from "@/hooks/useTimelineScrollSync";

interface VisitLogPanelProps {
  /** 향후일정 표시 여부 */
  showFutureSchedule?: boolean;
  /** 패널 제목 */
  title?: string;
  /** 뷰 모드: 'date' (날짜 기반) 또는 'package' (패키지 기반) */
  viewMode?: TimelineViewMode;
}

/**
 * 방문일지 패널 컴포넌트
 * 내원일지, 상세로그, 예약~TAT 등 다양한 액션에서 사용되는 타임라인 뷰
 */
export default function VisitLogPanel({
  showFutureSchedule = true,
  title = "내원일지",
  viewMode = "date",
}: VisitLogPanelProps) {
  // 선택 상태 관리
  const [selectedDateId, setSelectedDateId] = useState<string>(
    viewMode === "package" ? "" : "2025-12-15"
  );
  const [selectedPackageId, setSelectedPackageId] =
    useState<string>("package-3");

  // Refs
  const sidebarRef = useRef<ScrollableContainerRef | null>(null);
  const contentRef = useRef<ScrollableContainerRef | null>(null);

  // 패키지 뷰로 진입했을 때 기본 선택 상태 초기화
  useEffect(() => {
    if (viewMode === "package" && title === "패키지" && !selectedPackageId) {
      // 초기 진입 시에만 기본 선택 적용 (렌더 후 비동기로 처리)
      const id = requestAnimationFrame(() => {
        setSelectedPackageId("package-3");
        setSelectedDateId("package-selected");
      });
      return () => cancelAnimationFrame(id);
    }
  }, [viewMode, title, selectedPackageId]);

  // 스크롤 동기화 훅
  const { scrollToItem, scrollSidebarToItem } = useTimelineScrollSync(
    sidebarRef,
    contentRef,
    {
      viewMode,
      title,
      hideFutureSchedule: !showFutureSchedule,
      onDateSelect: (dateId: string) => setSelectedDateId(dateId),
      onPackageSelect: (packageId: string) => setSelectedPackageId(packageId),
    }
  );

  // 날짜 선택 핸들러
  const handleDateSelect = (
    dateId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedDateId(dateId);

    if (dateId === "") {
      // 향후일정 클릭
      scrollToItem("", true);
      if (viewMode === "package") {
        setSelectedPackageId("");
      }
      return;
    }

    // 날짜 클릭
    scrollSidebarToItem(event.currentTarget);
    scrollToItem(dateId, false);
  };

  // 패키지 선택 핸들러
  const handlePackageSelect = (
    packageId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedPackageId(packageId);
    setSelectedDateId("package-selected"); // 향후일정 선택 해제

    // 패키지 모드에서는 스크롤 동기화 비활성화 (깜빡임 방지)
    if (viewMode === "package" && title === "패키지") {
      scrollSidebarToItem(event.currentTarget);
      return;
    }

    scrollSidebarToItem(event.currentTarget);
    scrollToItem(packageId, false);
  };

  return (
    <div className="C099">
      <div className="C104">
        <p className="T047">{title}</p>
      </div>
      <div className="C105">
        <TimelineSidebar
          sidebarRef={sidebarRef}
          viewMode={viewMode}
          title={title}
          selectedDateId={selectedDateId}
          selectedPackageId={selectedPackageId}
          onDateSelect={handleDateSelect}
          onPackageSelect={handlePackageSelect}
          onScrollToItem={scrollSidebarToItem}
          showFutureSchedule={showFutureSchedule}
        />
        <TimelineContent
          contentRef={contentRef}
          viewMode={viewMode}
          title={title}
          showFutureSchedule={showFutureSchedule}
        >
          <VisitLogContent
            viewMode={viewMode}
            title={title}
            showFutureSchedule={showFutureSchedule}
            selectedPackageId={selectedPackageId}
          />
        </TimelineContent>
      </div>
    </div>
  );
}
