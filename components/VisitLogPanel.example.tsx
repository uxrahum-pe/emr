/**
 * VisitLogPanel - API 연동 예시
 *
 * 이 파일은 실제 API 연동 시 VisitLogPanel을 어떻게 수정할지 보여주는 예시입니다.
 * 실제 구현 시 이 패턴을 참고하여 적용하세요.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { TimelineViewMode } from "@/types/timeline";
import { ScrollableContainerRef } from "@/components/ScrollableContainer";
import TimelineSidebar from "@/components/TimelineSidebar";
import TimelineContent from "@/components/TimelineContent";
import VisitLogContent from "@/components/VisitLogContent";
import { useTimelineScrollSync } from "@/hooks/useTimelineScrollSync";
import {
  getVisitLogs,
  getPackages,
  getFutureSchedules,
} from "@/lib/api-helpers";
import { transformArray } from "@/lib/type-transformers";
import { isSuccessResponse } from "@/lib/type-guards";
import { VisitLogItem, PackageItem } from "@/types/api";

interface VisitLogPanelProps {
  showFutureSchedule?: boolean;
  title?: string;
  viewMode?: TimelineViewMode;
  patientId: string; // API 연동 시 필수
}

/**
 * API 연동 버전의 VisitLogPanel
 *
 * 사용 예시:
 * <VisitLogPanel
 *   patientId="patient-123"
 *   viewMode="date"
 *   title="내원일지"
 * />
 */
export default function VisitLogPanelWithAPI({
  showFutureSchedule = true,
  title = "내원일지",
  viewMode = "date",
  patientId,
}: VisitLogPanelProps) {
  // 선택 상태 관리
  const [selectedDateId, setSelectedDateId] = useState<string>(
    viewMode === "package" ? "" : ""
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");

  // 데이터 상태
  const [visitLogItems, setVisitLogItems] = useState<VisitLogItem[]>([]);
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const sidebarRef = useRef<ScrollableContainerRef | null>(null);
  const contentRef = useRef<ScrollableContainerRef | null>(null);

  // 데이터 로드
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        if (viewMode === "date") {
          // 방문일지 데이터 로드
          const response = await getVisitLogs(patientId);

          if (isSuccessResponse(response) && response.data) {
            const items = transformArray.visitLogs(response.data.items);
            setVisitLogItems(items);

            // 첫 번째 항목 선택
            if (items.length > 0) {
              setSelectedDateId(items[0].visitDate);
            }
          } else {
            setError("방문일지 데이터를 불러올 수 없습니다.");
          }
        } else {
          // 패키지 데이터 로드
          const response = await getPackages(patientId);

          if (isSuccessResponse(response) && response.data) {
            const items = transformArray.packages(response.data);
            setPackageItems(items);

            // 첫 번째 항목 선택
            if (items.length > 0) {
              setSelectedPackageId(items[0].id);
            }
          } else {
            setError("패키지 데이터를 불러올 수 없습니다.");
          }
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "데이터 로드 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    }

    if (patientId) {
      loadData();
    }
  }, [patientId, viewMode]);

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
      scrollToItem("", true);
      return;
    }

    scrollSidebarToItem(event.currentTarget);
    scrollToItem(dateId, false);
  };

  // 패키지 선택 핸들러
  const handlePackageSelect = (
    packageId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedPackageId(packageId);
    setSelectedDateId("package-selected");
    scrollSidebarToItem(event.currentTarget);
    scrollToItem(packageId, false);
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="C099">
        <div className="C104">
          <p className="T047">{title}</p>
        </div>
        <div className="C105">
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="C099">
        <div className="C104">
          <p className="T047">{title}</p>
        </div>
        <div className="C105">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </div>
    );
  }

  // TimelineDateItem으로 변환 (API 데이터 → UI 타입)
  const dateItems = visitLogItems.map((item) => ({
    id: item.visitDate,
    label: item.visitDate.split("-")[0] + "년",
    date: item.displayDate,
    dayOfWeek: item.dayOfWeek,
    hospital: item.hospital,
    period: item.period,
  }));

  // TimelinePackageItem으로 변환 (API 데이터 → UI 타입)
  const timelinePackageItems = packageItems.map((item) => ({
    id: item.id,
    period: item.period,
    startDate: item.startDate,
    endDate: item.endDate,
    status: item.status,
    hospital: item.hospital,
    duration: item.duration,
  }));

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
          />
        </TimelineContent>
      </div>
    </div>
  );
}
