/**
 * CustomerStatusBlock Component (C031)
 *
 * @description 고객 상태별 블록 컴포넌트입니다.
 * 예약, 대기, 진행중, 완료 등 각 상태별 고객 리스트를 표시합니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerStatusBlock
 *   config={reservationConfig}
 *   stats={{ waiting: 5, delayed: 2 }}
 *   customers={customerList}
 *   isActive={activeIndex === 0}
 *   onHeaderClick={(e) => handleBlockClick(0, e)}
 *   onCustomerClick={(customer) => handleCustomerClick(customer)}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import ScrollableContainer from "@/components/ScrollableContainer";
import TabSelector from "@/components/TabSelector";
import CustomerCard from "./CustomerCard";
import type { CustomerStatusBlockProps, CustomerInfo, AssignedEmployee } from "./types";

const CustomerStatusBlock = memo(function CustomerStatusBlock({
  config,
  stats,
  customers,
  isActive = false,
  isFolded = false,
  isSmallScreen = false,
  selectedTabs = [],
  onTabChange,
  onHeaderClick,
  onCustomerClick,
  onEmployeeClick,
}: CustomerStatusBlockProps) {
  // 활성화 상태 클래스 계산
  const getActiveClassName = (): string => {
    if (isActive) return "isActived";
    if (isFolded) return "isFolded";
    return "";
  };

  // 통계 표시 텍스트 생성
  const renderStats = () => {
    const parts: string[] = [];

    if (stats.waiting !== undefined) {
      parts.push(`대기: ${stats.waiting}명`);
    }
    if (stats.delayed !== undefined && stats.delayed > 0) {
      parts.push(`지연: ${stats.delayed}명`);
    }
    if (stats.inProgress !== undefined) {
      parts.push(`진행중: ${stats.inProgress}명`);
    }
    if (stats.completed !== undefined) {
      parts.push(`완료: ${stats.completed}명`);
    }

    return parts;
  };

  // 탭 아이템 변환
  const tabItems = config.tabs?.map((tab) => ({ title: tab.title })) || [];

  const handleCustomerClick = (customer: CustomerInfo) => {
    onCustomerClick?.(customer);
  };

  const handleEmployeeClick = (employee: AssignedEmployee, e: React.MouseEvent) => {
    onEmployeeClick?.(employee, e);
  };

  return (
    <div
      className={`C031 ${config.cssClass} ${getActiveClassName()}`}
    >
      {/* 블록 헤더 (C032) */}
      <div className="C032" onClick={onHeaderClick}>
        {/* 아이콘 */}
        <div className="C036">
          <div className={`C033 isIcon styleSheet ${config.iconClass}`}></div>
        </div>

        {/* 제목 */}
        <p className="T011">{config.title}</p>

        {/* 탭 셀렉터 */}
        {tabItems.length > 0 && (
          <TabSelector
            items={tabItems}
            multiple={config.multipleTabs}
            value={selectedTabs}
            onChange={(selected) => {
              if (config.multipleTabs) {
                onTabChange?.(selected as number[]);
              } else {
                onTabChange?.([selected as number]);
              }
            }}
          />
        )}

        {/* 고정 버튼 */}
        {config.showPinButton && (
          <div className="C051">
            <div className="C052 styleSheet isIcon isMini isPin"></div>
            <p className="T026">고정</p>
          </div>
        )}

        {/* 통계 표시 (큰 화면) */}
        <p className="T012">
          {renderStats().map((stat, index) => {
            const isDelayed = stat.includes("지연");
            const isWaiting = stat.includes("대기");
            const value = stat.match(/\d+/)?.[0] || "0";
            const label = stat.replace(/\d+명/, "").trim();

            return (
              <span key={index}>
                {index > 0 && " / "}
                {label}{" "}
                <span className={`isValue ${isDelayed ? "isRed" : isWaiting ? "isBlack" : ""}`}>
                  {value}
                </span>
                명
              </span>
            );
          })}
        </p>

        {/* 통계 표시 (작은 화면) */}
        <p className="T020">
          {stats.waiting !== undefined && (
            <span className="isBlack">{stats.waiting}</span>
          )}
          {stats.delayed !== undefined && stats.delayed > 0 && (
            <>
              {" / "}
              <span className="isRed">{stats.delayed}</span>
            </>
          )}
        </p>
      </div>

      {/* 고객 리스트 (C038 - ScrollableContainer) */}
      <ScrollableContainer>
        {customers.map((customerData) => (
          <CustomerCard
            key={customerData.customer.id}
            data={customerData}
            onClick={handleCustomerClick}
            onEmployeeClick={handleEmployeeClick}
            isCompact={isSmallScreen}
            scrollToEnd={isActive}
          />
        ))}
      </ScrollableContainer>
    </div>
  );
});

CustomerStatusBlock.displayName = "CustomerStatusBlock";

export default CustomerStatusBlock;
