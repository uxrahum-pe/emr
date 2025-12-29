/**
 * CustomerStatusHeader Component (C028)
 *
 * @description 고객 현황 섹션의 헤더 컴포넌트입니다.
 * 검색 버튼, 화면 크기 토글 등 공통 헤더 UI를 제공합니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerStatusHeader
 *   config={receptionHeaderConfig}
 *   isSmallScreen={isSmallScreen}
 *   onScreenSizeChange={setIsSmallScreen}
 *   onSearchClick={() => setSearchPopupOpen(true)}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import ToggleSwitch from "@/components/ToggleSwitch";
import type { CustomerStatusHeaderProps } from "./types";

const CustomerStatusHeader = memo(function CustomerStatusHeader({
  config,
  isSmallScreen,
  onScreenSizeChange,
  onSearchClick,
  onSurveySearchClick,
  onDirectRegisterClick,
}: CustomerStatusHeaderProps) {
  return (
    <div className="C028">
      {/* 섹션 제목 */}
      <p className="T007">{config.title}</p>

      {/* 고객 통합 검색 */}
      {config.showSearch && (
        <div
          className="C022"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSearchClick?.();
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="C017 styleSheet isIcon isMagnifier"></div>
          <p className="T005">고객 통합 검색</p>
        </div>
      )}

      {/* 설문지 & 바코드 검색 */}
      {config.showSurveySearch && (
        <div
          className="C023"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSurveySearchClick?.();
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="C019 styleSheet isIcon isCheck"></div>
          <p className="T008">설문지 & 바코드 고객 검색</p>
        </div>
      )}

      {/* 고객 직접 등록 */}
      {config.showDirectRegister && (
        <div
          className="C023"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDirectRegisterClick?.();
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="C019 styleSheet isIcon isSignUp"></div>
          <p className="T008">고객 직접 등록</p>
        </div>
      )}

      {/* 추가 버튼들 */}
      {config.extraButtons?.map((button) => (
        <div
          key={button.id}
          className="C023"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            button.onClick?.();
          }}
          style={{ cursor: "pointer" }}
        >
          {button.iconClass && (
            <div className={`C019 styleSheet isIcon ${button.iconClass}`}></div>
          )}
          <p className="T008">{button.label}</p>
        </div>
      ))}

      {/* 화면 크기 토글 */}
      <div className="C024">
        <p className="T009">화면 크기:</p>
        <ToggleSwitch
          onLabel="큰 화면"
          offLabel="작은 화면"
          value={!isSmallScreen}
          onChange={(isOn) => {
            onScreenSizeChange(!isOn);
          }}
        />
      </div>
    </div>
  );
});

CustomerStatusHeader.displayName = "CustomerStatusHeader";

export default CustomerStatusHeader;
