"use client";

import ScrollableContainer, {
  ScrollableContainerRef,
} from "@/components/ScrollableContainer";
import { TimelineViewMode } from "@/types/timeline";

interface TimelineSidebarProps {
  sidebarRef: React.RefObject<ScrollableContainerRef | null>;
  viewMode: TimelineViewMode;
  title: string;
  selectedDateId: string;
  selectedPackageId: string;
  onDateSelect: (
    dateId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  onPackageSelect: (
    packageId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  onScrollToItem: (element: HTMLElement) => void;
  showFutureSchedule?: boolean;
}

/**
 * 타임라인 사이드바 컴포넌트 (C106)
 * 날짜 목록 또는 패키지 목록을 표시
 */
export default function TimelineSidebar({
  sidebarRef,
  viewMode,
  title,
  selectedDateId,
  selectedPackageId,
  onDateSelect,
  onPackageSelect,
  onScrollToItem,
  showFutureSchedule = true,
}: TimelineSidebarProps) {
  const handleDateClick = (
    dateId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    onDateSelect(dateId, event);
    onScrollToItem(event.currentTarget);
  };

  const handlePackageClick = (
    packageId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    onPackageSelect(packageId, event);
    onScrollToItem(event.currentTarget);
  };

  return (
    <ScrollableContainer ref={sidebarRef} className="C106">
      {viewMode === "package" ? (
        <>
          {/* 향후일정 (패키지 제외) */}
          {title !== "패키지" && (
            <div
              className={`C129 ${
                selectedDateId === "" && !selectedPackageId ? "isSelected" : ""
              }`}
              onClick={(e) => {
                onDateSelect("", e);
                onPackageSelect("", e);
                handleDateClick("", e);
              }}
            >
              <p className="T057">
                <span className="isGreen isLabel">
                  2<span className="isUnit">기</span>
                </span>{" "}
                향후 일정
              </p>
              <p className="T055">
                <span className="isUnit">~ 2026.</span>09.23
              </p>
            </div>
          )}
          {/* 패키지 목록 - 하드코딩 유지 (추후 데이터 구조화) */}
          <div
            className={`C129 ${
              selectedPackageId === "package-3" ? "isSelected" : ""
            }`}
            onClick={(e) => handlePackageClick("package-3", e)}
          >
            <p className="T056 isLabel isGreen">
              3<span className="isMini">기</span>
            </p>
            <p className="T057">
              <span className="isGrey">2025.</span>09.23
              <span className="isGrey"> ~ </span>
              <span className="isRed isBold">진행중</span>
            </p>
            <p className="T057">
              <span className="isUnit"> (경과: </span>365
              <span className="isUnit">일)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedPackageId === "package-2" ? "isSelected" : ""
            }`}
            onClick={(e) => handlePackageClick("package-2", e)}
          >
            <p className="T056 isLabel isGreen">
              2<span className="isMini">기</span>
            </p>
            <p className="T057">
              <span className="isGrey">2024.</span>09.23
              <span className="isGrey"> ~ 2025.</span>09.23
            </p>
            <p className="T057">
              <span className="isUnit"> (경과: </span>365
              <span className="isUnit">일)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedPackageId === "package-1" ? "isSelected" : ""
            }`}
            onClick={(e) => handlePackageClick("package-1", e)}
          >
            <p className="T056 isLabel">
              1<span className="isMini">기</span>
            </p>
            <p className="T057">
              <span className="isGrey">2023.</span>09.23
              <span className="isGrey"> ~ 2024.</span>09.23
            </p>
            <p className="T057">
              <span className="isUnit"> (기간: </span>365
              <span className="isUnit">일)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
        </>
      ) : (
        <>
          {/* 향후일정 */}
          {showFutureSchedule && (
            <div
              className={`C129 ${selectedDateId === "" ? "isSelected" : ""}`}
              onClick={(e) => handleDateClick("", e)}
            >
              <p className="T057">
                <span className="isGreen isLabel">
                  2<span className="isUnit">기</span>
                </span>{" "}
                향후 일정
              </p>
              <p className="T055">
                <span className="isUnit">~ 2026.</span>09.23
              </p>
            </div>
          )}
          {/* 날짜 목록 - 하드코딩 유지 (추후 데이터 구조화) */}
          <div
            className={`C129 ${
              selectedDateId === "2025-12-15" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-12-15", e)}
          >
            <p className="T057">
              <span className="isGreen isLabel">
                2<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              12.15 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-12-08" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-12-08", e)}
          >
            <p className="T057">
              <span className="isGreen isLabel">
                2<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              12.08 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-12-01" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-12-01", e)}
          >
            <p className="T057">
              <span className="isGreen isLabel">
                2<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              12.01 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-11-24" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-11-24", e)}
          >
            <p className="T057">
              <span className="isGreen isLabel">
                2<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              11.24 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-11-17" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-11-17", e)}
          >
            <p className="T057">
              <span className="isGreen isLabel">
                2<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              11.17 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-11-10" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-11-10", e)}
          >
            <p className="T057">
              <span className="isLabel">
                1<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              11.10 <span className="isMini">(월)</span>
            </p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-11-03" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-11-03", e)}
          >
            <p className="T057">
              <span className="isLabel">
                1<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              11.03 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-10-27" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-10-27", e)}
          >
            <p className="T057">
              <span className="isLabel">
                1<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              10.27 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-10-20" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-10-20", e)}
          >
            <p className="T057">
              <span className="isLabel">
                1<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              10.20 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-10-13" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-10-13", e)}
          >
            <p className="T057">
              <span className="isLabel">
                1<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              10.13 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
          <div
            className={`C129 ${
              selectedDateId === "2025-10-06" ? "isSelected" : ""
            }`}
            onClick={(e) => handleDateClick("2025-10-06", e)}
          >
            <p className="T057">
              <span className="isLabel">
                1<span className="isUnit">기</span>
              </span>{" "}
              <span className="isGrey">
                2025<span className="isUnit">년</span>
              </span>
            </p>
            <p className="T056">
              10.06 <span className="isMini">(월)</span>
            </p>
            <p className="T058">부산병원</p>
          </div>
        </>
      )}
    </ScrollableContainer>
  );
}
