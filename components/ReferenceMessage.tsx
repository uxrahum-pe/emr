"use client";

import EmployeeBadge from "@/components/EmployeeBadge";

interface ReferenceMessageProps {
  /** 아이콘 클래스 (기본: "isNote") */
  iconClass?: string;
  /** 발신자 정보 */
  from: {
    department: string;
    type?: string;
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
}

/**
 * 참조사항 메시지 컴포넌트 (C156)
 * 고객 참조사항, 내부 메시지 등에서 재사용 가능
 */
export default function ReferenceMessage({
  iconClass = "isNote",
  from,
  author,
  content,
}: ReferenceMessageProps) {
  const tooltipText = author.tooltipText || `${author.name} ${author.role}`;

  return (
    <div className="C156">
      <div className="C159">
        <div className="C160">
          <div className="C036">
            <div className={`C033 isIcon styleSheet ${iconClass}`}></div>
          </div>
          <div className="C162">
            <div className="C163">
              <p className="T069">
                <span className="isUnit">From:</span> {from.department}
              </p>
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
        <div className="C161">
          <p className="T070">{content}</p>
        </div>
      </div>
    </div>
  );
}
