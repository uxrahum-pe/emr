/**
 * CustomerCard Component (C034)
 *
 * @description 고객 현황 리스트에서 개별 고객 정보를 표시하는 카드 컴포넌트입니다.
 * 모든 파트(원무, 상담, 수술 등)에서 공통으로 사용됩니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerCard
 *   data={customerData}
 *   onClick={(customer) => handleCustomerClick(customer)}
 *   onEmployeeClick={(employee, e) => handleEmployeeClick(employee, e)}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import Tooltip from "@/components/Tooltip";
import EmployeeBadge from "@/components/EmployeeBadge";
import DraggableScrollContainer from "@/components/DraggableScrollContainer";
import type { CustomerCardProps, TimelineItem } from "./types";

/**
 * 성별에 따른 색상 클래스 반환
 */
function getGenderColorClass(gender: "male" | "female"): string {
  return gender === "female" ? "isRed" : "isBlue";
}

/**
 * 성별 표시 텍스트 반환
 */
function getGenderText(gender: "male" | "female"): string {
  return gender === "female" ? "여성" : "남성";
}

/**
 * 기수에 따른 색상 클래스 반환
 */
function getVisitCountClass(visitCount: number): string {
  return visitCount === 1 ? "isNewbie" : "isOldbie";
}

/**
 * 타임라인 아이템 렌더링
 */
function renderTimelineItem(item: TimelineItem, index: number) {
  return (
    <div className="C042" key={index}>
      <div className={`C043 styleSheet isIcon ${item.iconClass}`}></div>
      <div className="C044">
        <p className="T021">
          <span className="isUnit">{item.time.split(" ")[0]}</span> {item.time.split(" ")[1]}
        </p>
        <p className="T022">{item.description}</p>
      </div>
      {item.statusIconClass && (
        <div className="C046">
          <div className={`C047 styleSheet isIcon isMini ${item.statusIconClass}`}></div>
        </div>
      )}
    </div>
  );
}

const CustomerCard = memo(function CustomerCard({
  data,
  onClick,
  onEmployeeClick,
  isCompact = false,
  scrollToEnd = false,
}: CustomerCardProps) {
  const {
    customer,
    scheduledTime,
    scheduledAction,
    serviceType,
    serviceTypeColor,
    assignedEmployee,
    fromPart,
    delayMinutes,
    delayColor,
    delayText,
    waitingMinutes,
    waitingColor,
    totalWaitingMinutes,
    totalWaitingColor,
    notes,
    tags,
    timeline,
    paymentAmount,
    discountAmount,
    procedureName,
    orderNumber,
    vitalCompleted,
  } = data;

  const handleClick = () => {
    onClick?.(customer);
  };

  const handleEmployeeClick = (e: React.MouseEvent) => {
    if (assignedEmployee && onEmployeeClick) {
      onEmployeeClick(assignedEmployee, e);
    }
  };

  return (
    <div className="C034" onClick={handleClick}>
      {/* 고객 기본 정보 (C035) */}
      <Tooltip text="고객 상세 정보">
        <div className="C035">
          <p className="T013">{customer.name}</p>
          <p className={`T014 ${getGenderColorClass(customer.gender)}`}>
            {getGenderText(customer.gender)}
          </p>
          <p className="T014">
            {customer.age}
            <span className="isUnit">세</span>
          </p>
          <p className={`T014 ${getVisitCountClass(customer.visitCount)}`}>
            {customer.visitCount}
            <span className="isUnit">기</span>
          </p>
          <p className="T015">{customer.id}</p>
        </div>
      </Tooltip>

      {/* 고객 상태 정보 (C037) */}
      <div className="C037">
        {/* 예정/접수/이관 시간 */}
        {scheduledTime && (
          <p className="T016">
            <span className="isUnit">{scheduledTime.split(" ")[0]}</span>{" "}
            {scheduledTime.split(" ")[1]} {scheduledAction || "예정"}.
          </p>
        )}

        {/* 이관 출발 파트 */}
        {fromPart && (
          <p className="T016">
            <span className="isUnit">from:</span> {fromPart}
          </p>
        )}

        {/* 서비스 유형 */}
        {serviceType && (
          <p className={`T017 ${serviceTypeColor || ""}`}>{serviceType}</p>
        )}

        {/* 시술명 (진료/수술 블록) */}
        {procedureName && <p className="T017">{procedureName}</p>}

        {/* 순번 */}
        {orderNumber !== undefined && (
          <p className="T017">
            <span className="isUnit">순번:</span> {orderNumber}번
          </p>
        )}

        {/* Vital 완료 여부 */}
        {vitalCompleted && <p className="T017 isBlue">Vital 입력완료</p>}

        {/* 담당 직원 */}
        {assignedEmployee && (
          <EmployeeBadge
            name={assignedEmployee.name}
            role={assignedEmployee.role}
            employeeId={assignedEmployee.id}
            onClick={handleEmployeeClick}
          />
        )}

        {/* 대기 시간 */}
        {waitingMinutes !== undefined && waitingMinutes > 0 && (
          <p className={`T016 ${waitingColor || ""}`}>
            <span className="isBold">{waitingMinutes}분</span> 대기
          </p>
        )}

        {/* 지연 시간 */}
        {delayMinutes !== undefined && delayMinutes > 0 && (
          <p className={`T019 ${delayColor || ""}`}>
            {delayText || `${delayMinutes}분 지연.`}
          </p>
        )}

        {/* 총 대기 시간 */}
        {totalWaitingMinutes !== undefined && (
          <p className="T019">
            -합계:<span className={`isBold ${totalWaitingColor || ""}`}>{totalWaitingMinutes}분</span>
          </p>
        )}

        {/* 수납 금액 */}
        {paymentAmount !== undefined && (
          <p className="T016 isBlue">
            {paymentAmount.toLocaleString()}
            <span className="isUnit">원</span>
          </p>
        )}

        {/* 할인 금액 */}
        {discountAmount !== undefined && (
          <p className="T019">
            할인:<span className="isBold isMint">{discountAmount.toLocaleString()}</span>원
          </p>
        )}

        {/* 참고사항 */}
        {notes && <p className="T023">&quot;{notes}&quot;</p>}

        {/* 태그들 */}
        {tags?.map((tag, index) => (
          <p key={index} className="T024">
            {tag.label}
          </p>
        ))}

        {/* 외국인 정보 */}
        {data.isForeigner && (
          <>
            <p className="T024">외국인</p>
            {data.nationality && (
              <p className="T024">
                <span className="isUnit">국적:</span>
                {data.nationality}
              </p>
            )}
            {data.language && (
              <p className="T024">
                <span className="isUnit">사용언어:</span>
                {data.language}
              </p>
            )}
            {data.interpreter && (
              <p className="T024">
                <span className="isUnit">통역:</span>
                {data.interpreter}
              </p>
            )}
          </>
        )}
      </div>

      {/* 타임라인 (C041) */}
      {timeline && timeline.length > 0 && (
        <DraggableScrollContainer className="C041" scrollToEnd={scrollToEnd}>
          <div className="C045">
            {timeline.map((item, index) => renderTimelineItem(item, index))}
          </div>
        </DraggableScrollContainer>
      )}
    </div>
  );
});

CustomerCard.displayName = "CustomerCard";

export default CustomerCard;
