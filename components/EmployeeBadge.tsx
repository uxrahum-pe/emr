"use client";

import Tooltip from "@/components/Tooltip";
import { useContext } from "react";
import { AsideContext } from "@/components/AsideContext";
import DoctorSlidePage from "@/components/DoctorSlidePage";
import EmployeeSlidePage from "@/components/EmployeeSlidePage";
import CounselorSlidePage from "@/components/CounselorSlidePage";

interface EmployeeBadgeProps {
  /** 직원 이름 */
  name: string;
  /** 직원 역할 */
  role: string;
  /** 직원 ID (클릭 시 일지 열기용) */
  employeeId?: string;
  /** 아바타 클래스 (기본: 여성, "isMale"로 남성 설정) */
  avatarClass?: string;
  /** 툴팁 텍스트 (기본: "{name} {role}") */
  tooltipText?: string;
  /** 클릭 핸들러 (옵션, 제공되면 기본 동작 대신 사용) */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 직원 배지 컴포넌트 (C039)
 * 직원 정보를 표시하는 재사용 가능한 컴포넌트
 */
export default function EmployeeBadge({
  name,
  role,
  employeeId,
  avatarClass = "",
  tooltipText,
  onClick,
  className = "",
}: EmployeeBadgeProps) {
  // Aside Provider가 있으면 사용, 없으면 null (옵셔널)
  const asideContext = useContext(AsideContext);
  const navigateToPage = asideContext?.navigateToPage || null;

  const defaultTooltipText = `${name} ${role}`;
  const finalTooltipText = tooltipText || defaultTooltipText;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 커스텀 onClick이 제공되면 그것을 사용
    if (onClick) {
      onClick(e);
      return;
    }

    // employeeId가 없거나 navigateToPage가 없으면 클릭 동작 없음
    if (!employeeId || !navigateToPage) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // 역할에 따라 적절한 컴포넌트 선택
    let SlidePageComponent = EmployeeSlidePage;
    if (role.includes("원장")) {
      SlidePageComponent = DoctorSlidePage;
    } else if (role.includes("상담사")) {
      SlidePageComponent = CounselorSlidePage;
    }

    // 역할 카테고리 결정
    let roleCategory = "employee";
    if (role.includes("원장")) {
      roleCategory = "doctor";
    } else if (role.includes("상담사")) {
      roleCategory = "counselor";
    }

    // 역할에 따라 title 결정
    let pageTitle = "업무 일정 보기";
    if (role.includes("원장")) {
      pageTitle = "원장 일정 보기";
    } else if (role.includes("상담사")) {
      pageTitle = "상담 일정 보기";
    }

    // 동일 역할 카테고리는 같은 pageId 사용 (employeeId 무시)
    navigateToPage(
      roleCategory,
      <SlidePageComponent
        title={pageTitle}
        employeeName={name}
        employeeRole={role}
        employeeId={employeeId}
      />
    );
  };

  const badgeContent = (
    <div
      className={`C039 ${className}`.trim()}
      onClick={handleClick}
      style={employeeId || onClick ? { cursor: "pointer" } : undefined}
    >
      <div className={`C040 ${avatarClass}`.trim()}></div>
      <p className="T018">
        {name}
        <span className="isUnit">{role}</span>
      </p>
    </div>
  );

  return <Tooltip text={finalTooltipText}>{badgeContent}</Tooltip>;
}
