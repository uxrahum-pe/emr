"use client";

import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

interface SlidePageHeaderProps {
  onGoBack: () => void;
  title: string;
  employeeName?: string;
  employeeRole?: string;
  customerName?: string;
  customerId?: string;
  showToggleSwitch?: boolean;
}

/**
 * SlidePage의 공통 상단 헤더 컴포넌트
 * 뒤로 버튼, 제목, 직원 정보, ToggleSwitch를 포함
 */
export default function SlidePageHeader({
  onGoBack,
  title,
  employeeName = "",
  employeeRole = "",
  customerName = "",
  customerId = "",
  showToggleSwitch = true,
}: SlidePageHeaderProps) {
  const [showRecord, setShowRecord] = useState(false);

  return (
    <div className="C090">
      <div className="C091" onClick={onGoBack}>
        <div className="C092 styleSheet isIcon isArrow isLeft"></div>
        <p className="T044">뒤로</p>
      </div>
      <div className="C093">
        <p className="T045">{title}</p>
        <div className="C095">
          {employeeName && <div className="C040"></div>}
          <p className="T046">
            {customerName ? (
              <>
                {customerName}{" "}
                {customerId && <span className="isUnit">{customerId}</span>}
              </>
            ) : (
              <>
                {employeeName}{" "}
                {employeeRole && <span className="isUnit">{employeeRole}</span>}
              </>
            )}
          </p>
        </div>
      </div>
      <div className="C094">
        {showToggleSwitch && (
          <ToggleSwitch
            onLabel="기록지 보기"
            offLabel="기록지 닫음"
            value={showRecord}
            textSize="mini"
            onChange={(isOn) => {
              setShowRecord(isOn);
            }}
          />
        )}
        {!customerName &&
          title !== "내 쪽지 보기" &&
          title !== "내 알림 보기" && (
            <div className="C091 isFitted isMessage">
              <div className="C092 styleSheet isIcon isRelay"></div>
            </div>
          )}
      </div>
    </div>
  );
}
