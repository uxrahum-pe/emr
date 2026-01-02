"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import FatLevelGauge from "@/components/FatLevelGauge";
import {
  PackageItemStats,
  PackageItemPayment,
  PackageHeader,
  PackageBody,
  PackageItemNote,
} from "@/types/package";

export interface PackageItemProps {
  /** 초기 접기 상태 */
  defaultFolded?: boolean;
  /** 접기/펼치기 상태 변경 핸들러 */
  onToggle?: (isFolded: boolean) => void;
  /** 체크박스 체크 상태 */
  checked?: boolean;
  /** 체크박스 변경 핸들러 */
  onCheckChange?: (checked: boolean) => void;
  /** C145 체크박스 표시 여부 */
  showCheckbox?: boolean;
  /** 헤더 데이터 */
  header: PackageHeader;
  /** 본문 데이터 */
  body: PackageBody;
  /** 잔여 시술 횟수 (무한이면 null, 선택사항) */
  remainingCount?: number | null;
  /** 아이콘 (C141) */
  icon?: React.ReactNode;
  /** 부위 아이콘 (C142) */
  partIcon?: React.ReactNode;
  /** 통계 정보 (C147) */
  stats?: PackageItemStats;
  /** 결제 정보 (C151) */
  payment?: PackageItemPayment;
  /** 메모/이력 목록 (C250) */
  notes?: PackageItemNote[];
  /** 추가 클래스명 */
  className?: string;
  /** Aside 모드 여부 */
  isAsideMode?: boolean;
  /** 다크 모드 여부 */
  isDarkMode?: boolean;
}

/**
 * 패키지 아이템 컴포넌트 (C132)
 * 접기/펼치기 기능이 있는 패키지 카드
 */
function PackageItem({
  defaultFolded = true,
  onToggle,
  checked = false,
  onCheckChange,
  showCheckbox = false,
  header,
  body,
  remainingCount,
  icon,
  partIcon,
  stats,
  payment,
  notes,
  className = "",
  isAsideMode = false,
  isDarkMode = false,
}: PackageItemProps) {
  const [isFolded, setIsFolded] = useState(defaultFolded);

  // defaultFolded가 변경되면 내부 상태 동기화
  useEffect(() => {
    setIsFolded(defaultFolded);
  }, [defaultFolded]);

  const handleHeaderClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const newFolded = !isFolded;
      setIsFolded(newFolded);
      onToggle?.(newFolded);
    },
    [isFolded, onToggle]
  );

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onCheckChange?.(!checked);
    },
    [checked, onCheckChange]
  );

  const combinedClassName = useMemo(() => {
    const classes = [
      "C132",
      "isFull",
      isFolded ? "isFolded" : "isOpened",
      isAsideMode ? "isAsideMode" : "",
      isDarkMode ? "isDarkMode" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return classes.trim();
  }, [isFolded, isAsideMode, isDarkMode, className]);

  const checkboxClassName = useMemo(
    () => `C145 ${checked ? "isChecked" : ""}`.trim(),
    [checked]
  );

  return (
    <div className={combinedClassName}>
      <div className="C133">
        <div className="C140">
          {icon && <div className="C141">{icon}</div>}
          {partIcon && <div className="C142">{partIcon}</div>}
          {showCheckbox && (
            <div className={checkboxClassName} onClick={handleCheckboxClick}>
              <div className="C146 styleSheet isIcon isMini isChecked"></div>
            </div>
          )}
        </div>
        <div className="C143">
          <div className="C144" onClick={handleHeaderClick}>
            <p className="T063">
              <span className="isBold isMagenta">수술</span> {header.part}
            </p>
            <p className="T064">
              <span className="isUnit">CODE:</span> {header.code}
            </p>
            <p className="T064 isGrcode">
              <span className="isUnit">/ GRCODE:</span> {header.grcode}
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className={`C144 ${isFolded ? "isFolded" : ""}`}>
            <p className="T065 isBold isEllipsis is2lines">{body.title}</p>
            <p className="T042">{body.spec}</p>
            <p className="T042">{body.type}</p>
            <p className="T042">{body.count}</p>
            {remainingCount !== null && remainingCount !== undefined && (
              <p className="T042">잔여: {remainingCount}회</p>
            )}
          </div>
        </div>
      </div>
      {stats && (
        <div className="C147">
          {stats.method && (
            <div className="C148">
              <p className="T065">{stats.method}</p>
              <p className="T066">수술방법</p>
            </div>
          )}
          {typeof stats.specialRate === "number" && (
            <div className="C148">
              <p className="T065">
                {stats.specialRate}
                <span className="isUnit isMini">%</span>
              </p>
              <p className="T066">특진비율</p>
            </div>
          )}
          {typeof stats.fatLevel === "number" && (
            <div className="C148">
              <FatLevelGauge level={stats.fatLevel} />
              <p className="T066">지방경도</p>
            </div>
          )}
          {typeof stats.procedureCount === "number" && (
            <div className="C148">
              <p className="T065">
                {stats.procedureCount}
                <span className="isUnit isMini">회</span>
              </p>
              <p className="T066">시술횟수</p>
            </div>
          )}
        </div>
      )}
      {payment && (
        <div className="C151">
          {typeof payment.contractAmount === "number" && (
            <p className="T067">
              계약금:{" "}
              <span className="isValue isBlue">
                {payment.contractAmount.toLocaleString()}
              </span>
              원
            </p>
          )}
          {typeof payment.reservationAmount === "number" && (
            <p className="T067">
              예약금:{" "}
              <span className="isValue">
                {payment.reservationAmount.toLocaleString()}
              </span>
              원
            </p>
          )}
          {typeof payment.discountRate === "number" && (
            <p className="T067">
              할인율:{" "}
              <span className="isValue isRed">{payment.discountRate}</span>%
            </p>
          )}
          {typeof payment.discountAmount === "number" && (
            <p className="T067">
              할인액:{" "}
              <span className="isValue isRed">
                -{payment.discountAmount.toLocaleString()}
              </span>
              원
            </p>
          )}
        </div>
      )}
      {notes && notes.length > 0 && (
        <div className="C250">
          {notes.map((note, index) => {
            // 날짜에서 연도 뒤 "."까지 isUnit으로 감싸기 (예: "25.08.23" -> "25." + "08.23")
            const formatDate = (dateStr: string) => {
              const match = dateStr.match(/^(\d+\.)(.+)$/);
              if (match) {
                return (
                  <>
                    <span className="isUnit">{match[1]}</span>
                    {match[2]}
                  </>
                );
              }
              return dateStr;
            };

            return (
              <div key={index} className="C251">
                <p className="T112">{formatDate(note.date)}</p>
                <p className="T113">&ldquo;{note.content}&rdquo;</p>
                <div className="C214">
                  <div
                    className="C241"
                    style={
                      note.authorImageUrl
                        ? {
                            background: `url(${note.authorImageUrl}) center center / cover no-repeat`,
                          }
                        : undefined
                    }
                  ></div>
                  <p className="T089">
                    {note.authorName}
                    <span className="isUnit">{note.authorTitle}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(PackageItem);
