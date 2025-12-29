/**
 * CustomerStatusSection Component (C021) - 리팩토링 버전
 *
 * @description 모든 파트에서 공통으로 사용되는 고객 현황 섹션 컴포넌트입니다.
 * 파트별 설정(configs)에 따라 블록 구성과 UI가 달라집니다.
 *
 * @component
 * @example
 * ```tsx
 * // 원무 파트
 * <CustomerStatusSection partId="reception" />
 *
 * // 상담 파트
 * <CustomerStatusSection partId="counseling" />
 * ```
 */

"use client";

import { useState, useCallback, memo } from "react";
import { useAside } from "@/components/AsideContext";
import SlidePage from "@/components/SlidePage";
import CustomerDetailPanel from "@/components/CustomerDetailPanel";
import CustomerStatusHeader from "./CustomerStatusHeader";
import CustomerStatusBlock from "./CustomerStatusBlock";
import CustomerCheckInPanel from "./CustomerCheckInPanel";
import { getHeaderConfig, getStatusBlocksConfig } from "./configs";
import type {
  CustomerStatusSectionNewProps,
  CustomerInfo,
  AssignedEmployee,
  CustomerCardData,
  StatusBlockStats,
  CustomerStatusId,
} from "./types";
import { getRoleInfo } from "@/lib/utils/role";

// ============================================
// 샘플 데이터 (실제로는 API에서 가져옴)
// ============================================

/** 공통 타임라인 아이템 */
const COMMON_TIMELINE = [
  {
    iconClass: "isRibbon",
    time: "AM 10:22",
    description: "상태 변경 시술시작.",
    statusIconClass: "isChecked",
  },
  {
    iconClass: "isSyringe",
    time: "AM 10:22",
    description: "시술 완료: O2 리프팅패키지",
    statusIconClass: "isChecked",
  },
  {
    iconClass: "isPaperPlane",
    time: "AM 10:22",
    description: "파트이동: 수납",
    statusIconClass: "isMyLocation",
  },
];

const SAMPLE_CUSTOMERS: Record<CustomerStatusId, CustomerCardData[]> = {
  reservation: [
    {
      customer: {
        id: "210051234",
        name: "김지영",
        gender: "female",
        age: 27,
        visitCount: 2,
      },
      status: "reservation",
      scheduledTime: "AM 10:30",
      scheduledAction: "예정",
      serviceType: "시술 신환 상담",
      serviceTypeColor: "isBlue",
      assignedEmployee: { id: "kyj006", name: "김유정", role: "상담사" },
      delayMinutes: 31,
      delayColor: "isRed",
      delayText: "31분 지연.",
      tags: [{ label: "해외예약" }, { label: "외국인" }, { label: "통역필요" }],
      isForeigner: true,
      nationality: "베트남",
      language: "베트남어",
      interpreter: "후안펑",
    },
    {
      customer: {
        id: "210051235",
        name: "박준호",
        gender: "male",
        age: 34,
        visitCount: 1,
      },
      status: "reservation",
      scheduledTime: "AM 10:30",
      scheduledAction: "예정",
      serviceType: "시술 신환 상담",
      serviceTypeColor: "isBlue",
      assignedEmployee: { id: "kyj006", name: "김유정", role: "상담사" },
      delayMinutes: 11,
      delayColor: "isYellow",
      delayText: "11분 지연.",
    },
    {
      customer: {
        id: "210051236",
        name: "최혜진",
        gender: "female",
        age: 41,
        visitCount: 3,
      },
      status: "reservation",
      scheduledTime: "AM 10:30",
      scheduledAction: "예정",
      serviceType: "시술 신환 상담",
      serviceTypeColor: "isBlue",
      assignedEmployee: { id: "kyj006", name: "김유정", role: "상담사" },
    },
  ],
  pending: [
    {
      customer: {
        id: "210051239",
        name: "정미영",
        gender: "female",
        age: 30,
        visitCount: 1,
      },
      status: "pending",
      scheduledTime: "AM 10:25",
      scheduledAction: "이관",
      fromPart: "진료파트",
      waitingMinutes: 21,
      waitingColor: "isYellow",
      totalWaitingMinutes: 31,
      totalWaitingColor: "isRed",
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051240",
        name: "윤지혜",
        gender: "female",
        age: 28,
        visitCount: 1,
      },
      status: "pending",
      scheduledTime: "AM 10:40",
      scheduledAction: "접수",
      waitingMinutes: 11,
      waitingColor: "isGreen",
      totalWaitingMinutes: 11,
      totalWaitingColor: "isGreen",
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051241",
        name: "김민수",
        gender: "male",
        age: 32,
        visitCount: 1,
      },
      status: "pending",
      scheduledTime: "AM 10:45",
      scheduledAction: "접수",
      vitalCompleted: true,
      waitingMinutes: 11,
      waitingColor: "isGreen",
      totalWaitingMinutes: 11,
      totalWaitingColor: "isGreen",
      timeline: COMMON_TIMELINE,
    },
  ],
  inProgress: [
    {
      customer: {
        id: "210051242",
        name: "강수진",
        gender: "female",
        age: 35,
        visitCount: 2,
      },
      status: "inProgress",
      scheduledTime: "AM 09:30",
      scheduledAction: "시작",
      procedureName: "진료 대기",
      waitingMinutes: 31,
      waitingColor: "isRed",
      totalWaitingMinutes: 41,
      totalWaitingColor: "isRed",
      assignedEmployee: { id: "psy001", name: "한상호", role: "원장" },
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051243",
        name: "박지연",
        gender: "female",
        age: 28,
        visitCount: 1,
      },
      status: "inProgress",
      scheduledTime: "AM 09:45",
      scheduledAction: "시작",
      procedureName: "O2 리프팅패키지",
      waitingMinutes: 21,
      waitingColor: "isYellow",
      totalWaitingMinutes: 31,
      totalWaitingColor: "isRed",
      assignedEmployee: { id: "psy001", name: "한상호", role: "원장" },
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051244",
        name: "이서윤",
        gender: "female",
        age: 25,
        visitCount: 3,
      },
      status: "inProgress",
      scheduledTime: "AM 10:00",
      scheduledAction: "시작",
      assignedEmployee: { id: "psy001", name: "한상호", role: "원장" },
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051245",
        name: "정우성",
        gender: "male",
        age: 38,
        visitCount: 2,
      },
      status: "inProgress",
      scheduledTime: "AM 10:15",
      scheduledAction: "시작",
      assignedEmployee: { id: "psy001", name: "한상호", role: "원장" },
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051246",
        name: "최민아",
        gender: "female",
        age: 31,
        visitCount: 1,
      },
      status: "inProgress",
      scheduledTime: "AM 10:20",
      scheduledAction: "시작",
      procedureName: "O2 리프팅패키지",
      waitingMinutes: 11,
      waitingColor: "isGreen",
      totalWaitingMinutes: 21,
      totalWaitingColor: "isYellow",
      assignedEmployee: { id: "psy001", name: "한상호", role: "원장" },
      timeline: COMMON_TIMELINE,
    },
  ],
  completed: [
    {
      customer: {
        id: "210051247",
        name: "이민정",
        gender: "female",
        age: 29,
        visitCount: 1,
      },
      status: "completed",
      scheduledTime: "AM 10:30",
      scheduledAction: "수납",
      procedureName: "수납 대기",
      waitingMinutes: 18,
      waitingColor: "isGreen",
      delayMinutes: 52,
      delayColor: "isRed",
      delayText: "-지연:",
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051248",
        name: "김태현",
        gender: "male",
        age: 32,
        visitCount: 3,
      },
      status: "completed",
      scheduledTime: "AM 10:45",
      scheduledAction: "수납",
      paymentAmount: 1250000,
      discountAmount: 750000,
      timeline: COMMON_TIMELINE,
    },
    {
      customer: {
        id: "210051249",
        name: "박서연",
        gender: "female",
        age: 27,
        visitCount: 2,
      },
      status: "completed",
      scheduledTime: "AM 10:50",
      scheduledAction: "수납",
      paymentAmount: 3200000,
      discountAmount: 800000,
      timeline: COMMON_TIMELINE,
    },
  ],
  holding: [],
  cancelled: [],
};

const SAMPLE_STATS: Record<CustomerStatusId, StatusBlockStats> = {
  reservation: { waiting: 3, delayed: 2 },
  pending: { waiting: 3, delayed: 1 },
  inProgress: { inProgress: 5 },
  completed: { completed: 3 },
  holding: { waiting: 0 },
  cancelled: { waiting: 0 },
};

// ============================================
// 컴포넌트
// ============================================

const CustomerStatusSection = memo(function CustomerStatusSection({
  partId,
  onCustomerClick: externalCustomerClick,
  onEmployeeClick: externalEmployeeClick,
}: CustomerStatusSectionNewProps) {
  const { navigateToPage, resetToMain } = useAside();

  // 상태 관리
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number | null>(null);
  const [selectedTabsMap, setSelectedTabsMap] = useState<Record<string, number[]>>({});
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo | null>(null);
  const [isQuickActionsHovered, setIsQuickActionsHovered] = useState(false);

  // 설정 가져오기
  const headerConfig = getHeaderConfig(partId);
  const statusBlocksConfig = getStatusBlocksConfig(partId);

  // 블록 헤더 클릭 핸들러
  const handleBlockHeaderClick = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveBlockIndex((prev) => (prev === index ? null : index));
  }, []);

  // 탭 변경 핸들러
  const handleTabChange = useCallback((blockId: string, tabs: number[]) => {
    setSelectedTabsMap((prev) => ({ ...prev, [blockId]: tabs }));
  }, []);

  // 고객 클릭 핸들러
  const handleCustomerClick = useCallback(
    (customer: CustomerInfo) => {
      setSelectedCustomer(customer);
      setIsCustomerDetailOpen(true);

      // Aside 페이지 열기
      navigateToPage(
        "customer",
        <SlidePage
          title="고객 참조사항"
          customerName={customer.name}
          customerId={customer.id}
          showToggleSwitch={true}
        >
          {/* 고객 참조사항 콘텐츠 */}
        </SlidePage>
      );

      externalCustomerClick?.(customer);
    },
    [navigateToPage, externalCustomerClick]
  );

  // 직원 클릭 핸들러
  const handleEmployeeClick = useCallback(
    (employee: AssignedEmployee, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const roleInfo = getRoleInfo(employee.role);
      const SlidePageComponent = roleInfo.component;

      navigateToPage(
        roleInfo.category,
        <SlidePageComponent
          title={roleInfo.title}
          employeeName={employee.name}
          employeeRole={employee.role}
          employeeId={employee.id}
        />
      );

      externalEmployeeClick?.(employee, e);
    },
    [navigateToPage, externalEmployeeClick]
  );

  // 고객 상세 패널 닫기
  const handleCustomerDetailClose = useCallback(() => {
    setIsCustomerDetailOpen(false);
    setSelectedCustomer(null);
    resetToMain();
  }, [resetToMain]);

  // 검색 팝업 핸들러들
  const handleSearchClick = useCallback(() => {
    console.log("고객 통합 검색 클릭");
    // TODO: 검색 팝업 열기
  }, []);

  const handleSurveySearchClick = useCallback(() => {
    console.log("설문지 & 바코드 검색 클릭");
    // TODO: 설문지 검색 팝업 열기
  }, []);

  const handleDirectRegisterClick = useCallback(() => {
    console.log("고객 직접 등록 클릭");
    // TODO: 고객 등록 팝업 열기
  }, []);

  // 현재 선택된 고객의 상태 가져오기
  const currentCustomerStatus = selectedCustomer
    ? (Object.entries(SAMPLE_CUSTOMERS).find(([, customers]) =>
        customers.some((c) => c.customer.id === selectedCustomer.id)
      )?.[0] as CustomerStatusId) || "pending"
    : undefined;

  return (
    <article className="C020">
      <section className="C021">
        {/* 헤더 */}
        <CustomerStatusHeader
          config={headerConfig}
          isSmallScreen={isSmallScreen}
          onScreenSizeChange={setIsSmallScreen}
          onSearchClick={handleSearchClick}
          onSurveySearchClick={handleSurveySearchClick}
          onDirectRegisterClick={handleDirectRegisterClick}
        />

        {/* 상태 블록 컨테이너 */}
        <div className={`C029 ${isSmallScreen ? "isSmall" : "isBig"}`}>
          <div className={`C030 isQuartet`}>
            {statusBlocksConfig.blocks.map((blockConfig, index) => {
              const statusId = blockConfig.id;
              const customers = SAMPLE_CUSTOMERS[statusId] || [];
              const stats = SAMPLE_STATS[statusId] || {};

              return (
                <CustomerStatusBlock
                  key={blockConfig.id}
                  config={blockConfig}
                  stats={stats}
                  customers={customers}
                  isActive={activeBlockIndex === index}
                  isFolded={activeBlockIndex !== null && activeBlockIndex !== index}
                  isSmallScreen={isSmallScreen}
                  selectedTabs={selectedTabsMap[blockConfig.id] || []}
                  onTabChange={(tabs) => handleTabChange(blockConfig.id, tabs)}
                  onHeaderClick={(e) => handleBlockHeaderClick(index, e)}
                  onCustomerClick={handleCustomerClick}
                  onEmployeeClick={handleEmployeeClick}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 고객 상세 패널 */}
      <CustomerDetailPanel
        isOpen={isCustomerDetailOpen}
        onClose={handleCustomerDetailClose}
        onQuickActionsHoverChange={setIsQuickActionsHovered}
      />

      {/* 체크인 버튼 패널 */}
      <CustomerCheckInPanel
        isOpen={isCustomerDetailOpen}
        isFolded={isQuickActionsHovered}
        customerStatus={currentCustomerStatus}
      />
    </article>
  );
});

CustomerStatusSection.displayName = "CustomerStatusSection";

export default CustomerStatusSection;
