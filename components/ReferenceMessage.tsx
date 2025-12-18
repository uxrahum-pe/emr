"use client";

import EmployeeBadge from "@/components/EmployeeBadge";

interface ReferenceMessageProps {
  /** 발신자 정보 */
  from: {
    department: string;
    type?: string;
    /** From 아이콘 클래스 (기본: "isNote") */
    iconClass?: string;
  };
  /** 수신자 정보 (옵션) */
  to?: {
    department: string;
    type?: string;
    /** To 아이콘 클래스 (기본: from.iconClass 또는 "isNote") */
    iconClass?: string;
  };
  /** 작성자 정보 */
  author: {
    name: string;
    role: string;
    avatarClass?: string;
    /** 툴팁에 표시할 텍스트 (기본: "{name} {role}") */
    tooltipText?: string;
    /** 직원 ID (클릭 핸들러용) */
    employeeId?: string;
  };
  /** 메시지 본문 */
  content: string;
  /** 내가 작성한 메시지인지 여부 (기본: false) */
  isMine?: boolean;
  /** 입력 시간 (예: "AM 11:20", "PM 02:30") */
  time?: string;
}

/**
 * 참조사항 메시지 컴포넌트 (C159)
 * 고객 참조사항, 내부 메시지 등에서 재사용 가능
 * 여러 메시지를 렌더링할 때는 C156 컨테이너로 감싸야 함
 */
export default function ReferenceMessage({
  from,
  to,
  author,
  content,
  isMine = false,
  time,
}: ReferenceMessageProps) {
  const tooltipText = author.tooltipText || `${author.name} ${author.role}`;
  const fromIconClass = from.iconClass || "isNote";
  const toIconClass = to?.iconClass || fromIconClass;

  // 시간 파싱 (예: "AM 11:20" 또는 "PM 02:30")
  const parseTime = (timeStr?: string) => {
    if (!timeStr) return null;
    const parts = timeStr.split(" ");
    if (parts.length === 2) {
      return { period: parts[0], time: parts[1] };
    }
    return null;
  };

  const timeData = parseTime(time);

  return (
    <div className={`C159 ${isMine ? "isMine" : ""}`}>
      <div className="C160">
        {/* 아이콘 영역: From 아이콘 → (To가 있으면 화살표 + To 아이콘) */}
        <div className="C165">
          {/* From 아이콘 */}
          <div className="C036">
            <div className={`C033 isIcon styleSheet ${fromIconClass}`}></div>
          </div>
          {/* To가 있을 때: 화살표 아이콘 + To 아이콘 */}
          {to && (
            <>
              <div className="C080 isFitted">
                <div className="C081 styleSheet isIcon isMini isArrow"></div>
              </div>
              <div className="C036">
                <div className={`C033 isIcon styleSheet ${toIconClass}`}></div>
              </div>
            </>
          )}
        </div>
        {/* 정보 영역: From/To 텍스트 + 작성자 배지 */}
        <div className="C162">
          <div className="C163">
            {/* From/To 텍스트 */}
            <p className="T069">
              <span className="isUnit">From:</span> {from.department}
              {to && (
                <>
                  <span className="isUnit"> & To:</span> {to.department}
                </>
              )}
            </p>
            {/* From type 표시 */}
            {from.type && <p className="T069">{from.type}</p>}
          </div>
          <EmployeeBadge
            name={author.name}
            role={author.role}
            employeeId={author.employeeId}
            avatarClass={author.avatarClass}
            tooltipText={tooltipText}
          />
        </div>
      </div>
      {/* 메시지 본문 및 시간 */}
      <div className="C164">
        <div className="C161">
          <p className="T070">{content}</p>
        </div>
        {timeData && (
          <p className="T071">
            <span className="isUnit">{timeData.period}</span> {timeData.time}
          </p>
        )}
      </div>
    </div>
  );
}
