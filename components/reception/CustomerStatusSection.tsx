/**
 * CustomerStatusSection Component
 *
 * @description 원무 페이지의 고객 상태 섹션 컴포넌트입니다.
 * 예약, 대기, 완료 등 고객 상태를 관리하고 표시합니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerStatusSection
 *   handleC032Click={handleC032Click}
 *   isSmallScreen={isSmallScreen}
 *   setIsSmallScreen={setIsSmallScreen}
 *   // ... 기타 props
 * />
 * ```
 *
 * @remarks
 * - 원무 페이지에서만 사용되는 컴포넌트입니다.
 * - Zustand 스토어(useReceptionStore)를 사용하여 상태를 관리합니다.
 * - useAside 훅을 사용하여 Aside 네비게이션을 수행합니다.
 */

"use client";

import { useState, useRef, useEffect, memo } from "react";
import { useAside } from "@/components/AsideContext";
import SlidePage from "@/components/SlidePage";
import ReferenceMessage from "@/components/ReferenceMessage";
import ToggleSwitch from "@/components/ToggleSwitch";
import Tooltip from "@/components/Tooltip";
import DraggableScrollContainer from "@/components/DraggableScrollContainer";
import ScrollableContainer from "@/components/ScrollableContainer";
import TabSelector from "@/components/TabSelector";
import EmployeeBadge from "@/components/EmployeeBadge";
import CustomerDetailPanel from "@/components/CustomerDetailPanel";
import ReceptionCheckInButton from "@/components/ReceptionCheckInButton";
import Popup from "@/components/Popup";
import LabeledCheckbox from "@/components/LabeledCheckbox";
import ValidatedInput from "@/components/ValidatedInput";
import { getRoleInfo } from "@/lib/utils/role";
import type { CustomerStatusSectionProps } from "@/types/reception";
import PopupSectionBox from "../PopupSectionBox";

import { useReceptionStore } from "@/stores/useReceptionStore";

/**
 * 고객 참조사항 페이지 콘텐츠 컴포넌트
 *
 * @description 고객 클릭 시 표시되는 참조사항 페이지의 내용을 렌더링합니다.
 */
const CustomerReferenceContent = memo(() => (
  <>
    <div className="C070">
      <div className="C157">
        <div className="C158 styleSheet isIcon isReception"></div>
        <p className="T069">
          <span className="isUnit">From:</span> 원무
        </p>
      </div>
      <p className="T035">
        <span className="isUnit">참조사항 입력</span>
      </p>
      <div className="C071">
        <div className="C072 styleSheet isIcon isWrite"></div>
      </div>
    </div>
    <div className="C156">
      <ReferenceMessage
        from={{
          department: "원무",
          type: "일반",
          iconClass: "isReception",
        }}
        author={{
          name: "김민수",
          role: "원무팀장",
          avatarClass: "isMale",
          tooltipText: "김민수 원무팀장",
          employeeId: "kms001",
        }}
        content="오늘 오후 2시부터 시스템 점검이 예정되어 있습니다. 점검 시간 동안 일시적으로 접속이 불가능할 수 있으니, 긴급한 업무는 사전에 처리해 주시기 바랍니다. 점검이 완료되면 자동으로 알림이 발송될 예정입니다."
        time="AM 09:15"
      />
      <div className="C135">
        <p className="T061">2025.12.15 (월)</p>
      </div>
      <ReferenceMessage
        from={{
          department: "원무",
          type: "긴급",
          iconClass: "isReception",
        }}
        to={{ department: "상담", type: "긴급", iconClass: "isCounseling" }}
        author={{
          name: "박지영",
          role: "상담사",
          avatarClass: "isFemale",
          tooltipText: "박지영 상담사",
          employeeId: "pjy002",
        }}
        content="홍길동 고객님께서 내일 오전 예약 변경을 요청하셨습니다. 원래 예약 시간은 오전 10시였는데, 오후 2시로 변경 희망하신다고 하셨습니다. 가능 여부 확인 후 연락 부탁드립니다."
        time="AM 10:32"
      />
      <ReferenceMessage
        from={{
          department: "상담",
          type: "일반",
          iconClass: "isCounseling",
        }}
        author={{
          name: "이수진",
          role: "상담사",
          avatarClass: "isMale",
          tooltipText: "이수진 상담사",
          employeeId: "lsj003",
        }}
        content="네, 확인했습니다. 오후 2시 시간대가 비어있어서 변경 가능합니다. 고객님께 확인 연락 드리겠습니다."
        isMine={true}
        time="AM 10:45"
      />
      <ReferenceMessage
        from={{
          department: "원무",
          type: "일반",
          iconClass: "isReception",
        }}
        to={{ department: "진료", type: "일반", iconClass: "isClinic" }}
        author={{
          name: "최영희",
          role: "원무과장",
          avatarClass: "isFemale",
          tooltipText: "최영희 원무과장",
          employeeId: "cyh004",
        }}
        content="이번 주 금요일부터 새로운 보험 정책이 적용됩니다. 주요 변경사항은 진료실로 공지문을 보내드렸으니 확인 부탁드립니다. 환자 상담 시 참고해 주시기 바랍니다."
        isMine={true}
        time="PM 02:15"
      />
    </div>
    <div className="C167">
      <div className="C168">
        <div className="C169 styleSheet isIcon isMegaphone"></div>
      </div>
      <div className="C170">
        <div className="C171">
          <p className="T072 isRed">전체공지</p>
          <p className="T019">
            From: <span className="isBold isBlack">원무</span>
          </p>
        </div>
        <p className="T073 isEllipsis">
          네트웍스 서포터
          asdfasdfasdfasdfasdㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹfasdf
        </p>
      </div>
      <div className="C112">
        <div className="C113 styleSheet isIcon isMini isChevron"></div>
      </div>
    </div>
  </>
));

CustomerReferenceContent.displayName = "CustomerReferenceContent";

/**
 * CustomerStatusSection 컴포넌트
 */
export default function CustomerStatusSection({
  handleC032Click,
  isSmallScreen,
  setIsSmallScreen,
  activeIndex,
  selectedTabs,
  setSelectedTabs,
  selectedPendingTabs,
  setSelectedPendingTabs,
  selectedSortTab,
  setSelectedSortTab,
  isQuickActionsHovered,
  setIsQuickActionsHovered,
  isCustomerDetailOpen,
  setIsCustomerDetailOpen,
}: CustomerStatusSectionProps) {
  const { sortOrder, toggleSortOrder } = useReceptionStore();
  const { navigateToPage, resetToMain } = useAside();
  const [isCustomerRegistrationPopupOpen, setIsCustomerRegistrationPopupOpen] =
    useState(false);
  const [isCustomerSearchPopupOpen, setIsCustomerSearchPopupOpen] =
    useState(false);
  const [isSurveyBarcodeSearchPopupOpen, setIsSurveyBarcodeSearchPopupOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerSearchTab, setCustomerSearchTab] = useState(0); // 0: 바코드 예약 고객, 1: 설문지 고객, 2: 상담 가등록 고객
  const [excludeRegisteredChecked, setExcludeRegisteredChecked] =
    useState(true);
  
  // 각 체크박스별 독립적인 상태
  const [useAliasChecked, setUseAliasChecked] = useState(false);
  const [customerRejectedChecked, setCustomerRejectedChecked] = useState(false);
  const [smsRejectedChecked, setSmsRejectedChecked] = useState(false);
  const [smsReceivedChecked, setSmsReceivedChecked] = useState(false);
  const [verifiedCustomerChecked, setVerifiedCustomerChecked] = useState(false);
  const [unverifiedCustomerChecked, setUnverifiedCustomerChecked] = useState(false);
  const [registeredChecked, setRegisteredChecked] = useState(false);
  const [preRegisteredChecked, setPreRegisteredChecked] = useState(false);
  const [pendingChecked, setPendingChecked] = useState(false);
  const [deletedChecked, setDeletedChecked] = useState(false);
  const [refundedChecked, setRefundedChecked] = useState(false);
  const [movedChecked, setMovedChecked] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 테이블 데이터 타입
  interface CustomerTableData {
    customerName: string;
    residentNumber: string;
    phoneNumber: string;
    registrationBranch: string;
    barcodeNumber: string;
    registrationDate: string;
    webId: string;
    registrationStatus: "가입완료" | "미연결";
  }

  interface SurveyCustomerTableData {
    customerName: string;
    residentNumber: string;
    phoneNumber: string;
    registrationBranch: string;
    chartNumber: string;
    registrationDate: string;
    surveyType: string;
    registrationStatus: "가입완료" | "미연결";
  }

  interface PreRegistrationCustomerTableData {
    customerName: string;
    residentNumber: string;
    phoneNumber: string;
    registrationBranch: string;
    preRegistrationNumber: string;
    registrationDate: string;
    registrant: string;
    registrationStatus: "가입완료" | "미연결";
  }

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const sampleTableData: CustomerTableData[] = Array.from(
    { length: 10 },
    () => ({
      customerName: "이신득",
      residentNumber: "840923-1712313",
      phoneNumber: "010-7444-4118",
      registrationBranch: "서울365mc병원",
      barcodeNumber: "1600016819392871",
      registrationDate: "2024.08.11",
      webId: "uxmason",
      registrationStatus: Math.random() > 0.4 ? "가입완료" : "미연결",
    })
  );

  // 설문지 고객 샘플 데이터
  const surveyTableData: SurveyCustomerTableData[] = Array.from(
    { length: 10 },
    () => ({
      customerName: "이신득",
      residentNumber: "840923-1712313",
      phoneNumber: "010-7444-4118",
      registrationBranch: "서울365mc병원",
      chartNumber: "360015819",
      registrationDate: "2024.08.11",
      surveyType: "신환설문지 (빼톡스)",
      registrationStatus: "미연결",
    })
  );

  // 상담 가등록 고객 샘플 데이터
  const preRegistrationTableData: PreRegistrationCustomerTableData[] =
    Array.from({ length: 10 }, () => ({
      customerName: "이신득",
      residentNumber: "840923-1712313",
      phoneNumber: "010-7444-4118",
      registrationBranch: "서울365mc병원",
      preRegistrationNumber: "PR20240811001",
      registrationDate: "2024.08.11",
      registrant: "김상담",
      registrationStatus: "미연결",
    }));

  const totalPages = 10;
  const itemsPerPage = 10;

  // 고객 통합 검색 팝업이 열릴 때 입력 필드에 자동 포커스
  useEffect(() => {
    if (isCustomerSearchPopupOpen) {
      // 팝업이 완전히 렌더링되고 애니메이션이 시작된 후 포커스
      // Popup 컴포넌트의 isOpened 상태 변경(10ms) + 애니메이션 시간을 고려
      const timer1 = setTimeout(() => {
        if (searchInputRef.current) {
          // requestAnimationFrame을 사용하여 브라우저 렌더링 사이클에 맞춤
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              searchInputRef.current?.focus();
            });
          });
        }
      }, 150);

      return () => clearTimeout(timer1);
    }
  }, [isCustomerSearchPopupOpen]);

  const handleCustomerClick = (
    customerName: string,
    customerId: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("고객 클릭:", customerName, customerId);
    // 고객 통합 정보 패널 열기
    setIsCustomerDetailOpen(true);
    // 모든 고객은 동일한 customer 카테고리로 묶어서 누적 없이 데이터만 리로드
    navigateToPage(
      "customer",
      <SlidePage
        title="고객 참조사항"
        customerName={customerName}
        customerId={customerId}
        showToggleSwitch={true}
      >
        <CustomerReferenceContent />
      </SlidePage>
    );
  };

  const handleCustomerDetailClose = () => {
    setIsCustomerDetailOpen(false);
    // Aside도 원무파트 전체 타임라인으로 되돌리기
    resetToMain();
  };

  const handleEmployeeClickFromStatus = (
    employeeName: string,
    employeeId: string,
    role: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation(); // C034 클릭 이벤트와 충돌 방지
    console.log("고객현황 직원 클릭:", employeeName, employeeId, role);

    // 역할 정보 가져오기 (유틸리티 함수 사용)
    const roleInfo = getRoleInfo(role);
    const SlidePageComponent = roleInfo.component;

    // 동일 역할 카테고리는 같은 pageId 사용 (employeeId 무시)
    navigateToPage(
      roleInfo.category,
      <SlidePageComponent
        title={roleInfo.title}
        employeeName={employeeName}
        employeeRole={role}
        employeeId={employeeId}
      />
    );
  };

  return (
    <article className="C020">
      <section className="C021">
        <div className="C028">
          <p className="T007">고객 현황</p>
          <div
            className="C022"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCustomerSearchPopupOpen(true);
            }}
          >
            <div className="C017 styleSheet isIcon isMagnifier"></div>
            <p className="T005">고객 통합 검색</p>
          </div>
          <div
            className="C023"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSurveyBarcodeSearchPopupOpen(true);
            }}
          >
            <div className="C019 styleSheet isIcon isCheck"></div>
            <p className="T008">설문지 & 바코드 고객 검색</p>
          </div>
          <div
            className="C023"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCustomerRegistrationPopupOpen(true);
            }}
          >
            <div className="C019 styleSheet isIcon isSignUp"></div>
            <p className="T008">고객 직접 등록</p>
          </div>
          <div className="C024">
            <p className="T009">화면 크기:</p>
            <ToggleSwitch
              onLabel="큰 화면"
              offLabel="작은 화면"
              value={!isSmallScreen}
              onChange={(isOn) => {
                setIsSmallScreen(!isOn);
              }}
            />
          </div>
        </div>
        <div className={`C029 ${isSmallScreen ? "isSmall" : "isBig"}`}>
          <div className="C030 isQuartet">
            <div
              className={`C031 isReservation ${
                activeIndex === 0
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(0, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isAlarmClock"></div>
                </div>
                <p className="T011">예약</p>
                <TabSelector
                  items={[
                    { title: "수술상담" },
                    { title: "시술상담" },
                    { title: "일반시술" },
                  ]}
                  multiple={true}
                  value={selectedTabs}
                  onChange={(selected) => setSelectedTabs(selected as number[])}
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  대기: <span className="isValue isBlack">5</span>명 / 지연:{" "}
                  <span className="isValue isRed">2</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">5</span> /{" "}
                  <span className="isRed">2</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("김지영", "210051234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김지영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        27<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051234</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019 isRed">31분 지연.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("박준호", "210051235")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">박준호</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        34<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051235</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019 isYellow">11분 지연.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("최혜진", "210051236")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">최혜진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        41<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051236</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019 isGreen">5분 후 도착 예정.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("이은지", "210051237")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이은지</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        39<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051237</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019">30분 후 도착 예정.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("한소영", "210051238")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한소영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        26<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051238</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019">1시간 30분 후 도착 예정.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
              </ScrollableContainer>
            </div>
            <div
              className={`C031 isPending ${
                activeIndex === 1
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(1, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isHourglass"></div>
                </div>
                <p className="T011">대기</p>
                <TabSelector
                  items={[{ title: "수술상담" }, { title: "시술상담" }]}
                  multiple={true}
                  value={selectedPendingTabs}
                  onChange={(selected) =>
                    setSelectedPendingTabs(selected as number[])
                  }
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  접수: <span className="isValue isBlack">2</span>명 / 보류:{" "}
                  <span className="isValue isYellow">1</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">2</span> /{" "}
                  <span className="isYellow">1</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("정미영", "210051239")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">정미영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        30<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051239</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:25 이관.
                    </p>
                    <p className="T016">
                      <span className="isUnit">from:</span> 진료파트
                    </p>
                    <p className="T016 isYellow">
                      <span className="isBold">21분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">31분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 1}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("윤지혜", "210051240")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">윤지혜</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051240</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:40 접수.
                    </p>
                    <p className="T016 isGreen">
                      <span className="isBold">11분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isGreen">11분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 1}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("강민주", "210051241")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">강민주</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        31<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051241</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:50 접수.
                    </p>
                    <p className="T017 isBlue">Vital 입력완료</p>
                    <p className="T016 isGreen">
                      <span className="isBold">11분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isGreen">11분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 1}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
              </ScrollableContainer>
            </div>
            <div
              className={`C031 isClinic ${
                activeIndex === 2
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(2, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isClinic"></div>
                </div>
                <p className="T011">진료</p>
                <TabSelector
                  items={[{ title: "시간순" }, { title: "상태순" }]}
                  multiple={false}
                  value={selectedSortTab}
                  onChange={(selected) =>
                    setSelectedSortTab(selected as number)
                  }
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  대기: <span className="isValue isBlack">4</span>명 / 진행:{" "}
                  <span className="isValue isYellow">2</span>명 / 완료:{" "}
                  <span className="isValue isGreen">2</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">4</span> /{" "}
                  <span className="isYellow">2</span> /{" "}
                  <span className="isGreen">2</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("박수진", "210048901")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">박수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        32<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048901</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:15 이관.
                    </p>
                    <p className="T017">진료 대기</p>
                    <p className="T016 isRed">
                      <span className="isBold">31분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">41분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("이혜진", "210051567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이혜진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        24<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051567</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:35 시작.
                    </p>
                    <p className="T017">시술 대기</p>
                    <p className="T019">
                      -<span className="isBold isGreen">대기없음</span>
                    </p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016 isYellow">
                      <span className="isBold">21분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">31분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("김철수", "210044321")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김철수</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        42<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210044321</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 9:45 시작.
                    </p>
                    <p className="T017 isGreen">진행중</p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="의사 상세 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "한상호",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          한상호<span className="isUnit">원장</span>
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("최수진", "210047654")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">최수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047654</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 9:30 시작.
                    </p>
                    <p className="T017 isBlue">시술 완료</p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016">
                      01:12:34 <span className="isUnit">경과</span>{" "}
                    </p>
                    <Tooltip text="의사 상세 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "한상호",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          한상호<span className="isUnit">원장</span>
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("이성호", "210049432")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이성호</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        35<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210049432</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:00 시작.
                    </p>
                    <p className="T017">시술 대기</p>
                    <p className="T019">
                      -순번:<span className="isBold isRed">3</span>
                    </p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016 isGreen">
                      <span className="isBold">11분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isYellow">21분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("정지영", "210052098")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">정지영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210052098</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:00 시작.
                    </p>
                    <p className="T017 isGreen">진행중</p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="의사 상세 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "한상호",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          한상호<span className="isUnit">원장</span>
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
              </ScrollableContainer>
            </div>
            <div
              className={`C031 isPayment ${
                activeIndex === 3
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(3, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isCoin"></div>
                </div>
                <p className="T011">수납</p>
                <TabSelector
                  items={[{ title: "시간순" }, { title: "상태순" }]}
                  multiple={false}
                  value={selectedSortTab}
                  onChange={(selected) =>
                    setSelectedSortTab(selected as number)
                  }
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  대기: <span className="isValue isBlack">2</span>명 / 완료:{" "}
                  <span className="isValue isBlue">5</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">2</span> /{" "}
                  <span className="isBlue">5</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("한미영", "210048234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한미영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        33<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048234</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:20 대기.
                    </p>
                    <p className="T017">수납 대기</p>
                    <p className="T016 isGreen">
                      <span className="isBold">18분</span> 대기
                    </p>
                    <p className="T019">
                      -지연:<span className="isBold isRed">52분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 3}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("윤서아", "210050123")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">윤서아</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210050123</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:45 수납.
                    </p>
                    <p className="T016 isBlue">
                      1,250,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">750,000</span>원
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 3}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("강지훈", "210045678")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">강지훈</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        38<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210045678</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:50 수납.
                    </p>
                    <p className="T016 isBlue">
                      3,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">800,000</span>원
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 3}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("김수진", "210047567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        30<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047567</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:15 수납.
                    </p>
                    <p className="T016 isBlue">
                      1,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">300,000</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      6,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      1,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 지방흡입
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("한소영", "210047568")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한소영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047568</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:20 수납.
                    </p>
                    <p className="T016 isBlue">
                      1,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">150,000</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      5,000,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      1,000,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      150,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 리프팅
                    </p>
                  </div>
                </div>
              </ScrollableContainer>
            </div>
          </div>
        </div>
        <CustomerDetailPanel
          isOpen={isCustomerDetailOpen}
          onClose={handleCustomerDetailClose}
          isSmallScreen={isSmallScreen}
          onQuickActionsHoverChange={setIsQuickActionsHovered}
        />
      </section>
      <ReceptionCheckInButton
        isOpen={isCustomerDetailOpen}
        isFolded={isQuickActionsHovered}
      />
      <Popup
        isOpen={isCustomerRegistrationPopupOpen}
        onClose={() => setIsCustomerRegistrationPopupOpen(false)}
      >
        <div>
          <PopupSectionBox x={290} y={70} width={660} height={1060}>
            <div className="C1003">
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">주민번호:</p>
                  <div className="C1017">
                  <ValidatedInput
                    className="T1002"
                    type="text"
                    placeholder="000000-0******"
                    minLength={14}
                    required
                    minLengthErrorMessage="입력값이 모자랍니다"
                  />
                  </div>
                  
                  <button className="C1005">중복검사</button>
                  <div className="C1011">
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="가명 사용"
                    />
                  </div>
                  
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">성명:</p>
                  <div className="C1017">
                  <ValidatedInput
                    className="T1002"
                    type="text"
                    placeholder="최대 16자까지"
                    minLength={1}
                    maxLength={16}
                    required
                    minLengthErrorMessage="입력값이 모자랍니다"
                  />
                  </div>
                  <p className="T1000">가명:</p>
                  <div className="C1017">
                  <ValidatedInput
                    className="T1002"
                    type="text"
                    placeholder="최대 16자까지"
                    minLength={1}
                    maxLength={16}
                    required
                    minLengthErrorMessage="입력값이 모자랍니다"
                  />
                  </div>
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">전화번호:</p>
                  <div className="C1017">
                  <ValidatedInput
                    className="T1002"
                    type="text"
                    placeholder="000-0000-0000"
                    minLength={13}
                    maxLength={13}
                    required
                    minLengthErrorMessage="입력값이 모자랍니다"
                  />
                  </div>
                  <button className="C1005">인증요청</button>

                  <input className="T1002" type="text" placeholder="6자리" />
                  <button className="C1010">확인</button>
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">자택번호:</p>
                  <div className="C1017">
                  <ValidatedInput
                    className="T1002"
                    type="text"
                    placeholder="000-0000-0000"
                    minLength={13}
                    maxLength={13}
                    required
                    minLengthErrorMessage="입력값이 모자랍니다"
                  />
                  </div>
                  <p className="T1000">이메일:</p>
                  <div className="C1017">
                  <ValidatedInput
                    className="T1002"
                    type="text"
                    placeholder="최대32자까지"
                    minLength={1}
                    maxLength={32}
                    required
                    validateEmail={true}
                    minLengthErrorMessage="입력값이 모자랍니다"
                    emailErrorMessage="입력 양식이 잘못되었습니다."
                  />
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="C1009"></div>

              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">SMS수신:</p>
                    <div className="C1018">
                    <LabeledCheckbox
                      checked={customerRejectedChecked}
                      onChange={setCustomerRejectedChecked}
                      text="고객 거부"
                    />
                    <LabeledCheckbox
                        checked={smsRejectedChecked}
                      onChange={setSmsRejectedChecked}
                      text="수신 금지"
                    />
                    <LabeledCheckbox
                      checked={smsReceivedChecked}
                      onChange={setSmsReceivedChecked}
                      text="수신 받음"
                    />
                  </div>
                </div>
              </div>

            <div className="C1007">
              <div className="C1000">
                <p className="T1000">거부사유:</p>
                <div className="C1008">
                  종류 선택
                  <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
                </div>

                <div className="C1017">
                  <ValidatedInput
                    className="T1002 isLong"
                    type="text"
                    placeholder="최대64자까지"
                    maxLength={64}
                  />
                  </div>
              </div>
            </div>
            <div className="C1007">
              <div className="C1000">
                <p className="T1000">할인구분:</p>
                <div className="C1008">
                  종류 선택
                  <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
                </div>
                <p className="T1000">직업:</p>
                <div className="C1008">
                  종류 선택
                  <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
                </div>
              </div>
            </div>
            <div className="C1007">
              <div className="C1000">
                <p className="T1000">본인인증:</p>
                <div className="C1016">
                  <div className="C1012">
                    <div className="C1013 styleSheet isIcon isMini isChecked"></div>
                  </div>
                  <p className="T1003">인증 고객</p>
                </div>
                <div className="C1014">
                  <div className="C1015">
                    <div className="C1013"></div>
                  </div>
                  <p className="T1003">미인증 고객</p>
                </div>
              </div>
            </div>
            <div className="C1007">
              <div className="C1000 isTopFitted">
                <p className="T1000">상태:</p>
                <div className="C1018">
                  <div className="C1014">
                    <div className="C1015">
                      <div className="C1013"></div>
                    </div>
                    <p className="T1003">등록</p>
                  </div>
                  <div className="C1014">
                    <div className="C1015">
                      <div className="C1013"></div>
                    </div>
                    <p className="T1003">가등록</p>
                  </div>
                  <div className="C1014">
                    <div className="C1015">
                      <div className="C1013"></div>
                    </div>
                    <p className="T1003">보류</p>
                  </div>
                  <div className="C1014">
                    <div className="C1015">
                      <div className="C1013"></div>
                    </div>
                    <p className="T1003">삭제</p>
                  </div>
                  <div className="C1014">
                    <div className="C1015">
                      <div className="C1013"></div>
                    </div>
                    <p className="T1003">환불</p>
                  </div>
                  <div className="C1014">
                    <div className="C1015">
                      <div className="C1013"></div>
                    </div>
                    <p className="T1003">이동</p>
                  </div>
                </div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={970} y={70} width={660}>
            <div className="C180">
              <p className="T076">신규 고객 등록</p>
              <div
                className="C181 isCloseButton"
                onClick={() => setIsCustomerRegistrationPopupOpen(false)}
              >
                <div className="C179 isDepth1"></div>
                <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={970} y={190} width={660} height={820}>
            <div className="C1003">
            <div className="C1007">
                <div className="C1000">
                  <p className="T1000">특기사항:</p>
                  <div className="C1018">
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="원내 호출 거부"
                    />
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="서포터"
                    />
                  </div>
                  
                </div>
              </div>
              <div className="C1009"></div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">분류:</p>
                  <div className="C1018">
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="외국인"
                    />
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="내국인"
                    />
                  </div>
                  
                </div>
              </div>
              <div className="C1007">
              <div className="C1000">
                <p className="T1000">
                  국적: 
                </p>
                <div className="C1008">
                  종류 선택
                  <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
                </div>
                <p className="T1000">
                  영문명: 
                </p>
                
              </div>
            </div>
            <div className="C1007">
                <div className="C1000">
                  <p className="T1000">여권번호:</p>
                  <input
                    className="T1002"
                    type="text"
                    placeholder="M00000000"
                  />
                  <p className="T1000">건강보험:</p>
                  <input
                    className="T1002"
                    type="text"
                    placeholder="3-00000000000"
                  />
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">거소증:</p>
                  <div className="C1018">
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="있음"
                    />
                  <LabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="없음"
                    />
                  </div>
                  
                  <p className="T1000">체류자격:</p>
                  <div className="C1008">
                  코드 선택
                  <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
                </div>
                </div>
              </div>
              <div className="C1012">
                <div className="C1013"></div>
                <div className="C1014">
                  
                  <div className="C1015">
                    <p className="T1000">입국일:</p>
                    <div className="C1016"><p className="T1004">2025.12.23</p></div>
                  </div>
                
                  
                  <div className="C1015">
                    <p className="T1000">출국일:</p>
                    <div className="C1016"><p className="T1004">2025.12.23</p></div>
                    
                  </div>
                </div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={970} y={1030} width={660} height={100}>
            <div className="C180"></div>
          </PopupSectionBox>
        </div>
      </Popup>
      <Popup
        isOpen={isCustomerSearchPopupOpen}
        onClose={() => setIsCustomerSearchPopupOpen(false)}
      >
        <>
          <PopupSectionBox x={260} y={20} width={1400}>
            <div className="C180">
              <p className="T076">고객 통합 검색</p>
              <input
                ref={searchInputRef}
                className="T085"
                type="text"
                placeholder="이름, 고객번호, 주민번호, 전화번호 등."
              />
              <div className="C189">
                <p className="isGrey">보기:</p>
                <TabSelector
                  items={[{ title: "우리 지점만" }, { title: "타지점 포함" }]}
                  width="var(--size-200)"
                  multiple={false}
                  value={selectedSortTab}
                  onChange={(selected) =>
                    setSelectedSortTab(selected as number)
                  }
                />
              </div>
              <div className="C202">
                <div className="C203">
                  <div className="C204 styleSheet isIcon isMagnifier"></div>
                  <p className="T086">
                    검색결과:<span className="isWhite">8</span>명
                  </p>
                </div>
                <div className="C203 isFilter">
                  <div className="C204 styleSheet isIcon isFunnel"></div>
                  <p className="T086">
                    정렬: <span className="isWhite">주민번호</span>
                  </p>
                </div>
                <div
                  className="C203 isSort"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSortOrder();
                  }}
                >
                  <div
                    className={`C205 ${sortOrder === "desc" ? "isBottom" : ""}`}
                  >
                    <div
                      className={`C206 styleSheet isIcon isMini isArrow ${
                        sortOrder === "desc" ? "isBottom" : "isTop"
                      }`}
                    ></div>
                  </div>
                  <p className="T086">
                    정렬:{" "}
                    <span className="isWhite">
                      {sortOrder === "desc" ? "내림차순" : "오름차순"}
                    </span>
                  </p>
                </div>
              </div>
              <div
                className="C181 isCloseButton"
                onClick={() => setIsCustomerSearchPopupOpen(false)}
              >
                <div className="C179 isDepth1"></div>
                <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={260} y={140} width={1400} height={1040}>
            <ScrollableContainer className="C207">
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
              <div className="C208">
                <div className="C209">
                  <div className="C210">
                    <p className="T013">김지영</p>
                    <p className="T014 isRed">여성</p>
                    <p className="T014">
                      27<span className="isUnit">세</span>
                    </p>
                    <p className="T014 isOldbie">
                      2<span className="isUnit">기</span>
                    </p>
                  </div>
                  <p className="T087">
                    <span className="isUnit">고객번호:</span> 210051234
                  </p>
                  <p className="T087">
                    <span className="isUnit">주민번호:</span> 800423-1******
                  </p>
                  <p className="T087">
                    <span className="isUnit">전화번호:</span> 010-7444-4118
                  </p>
                  <p className="T087">
                    <span className="isUnit">여권번호:</span> M1234567
                  </p>
                  <p className="T087">
                    <span className="isUnit">최종내원:</span> 2025.12.23
                    <span className="isGreen isBold"> 부산병원</span>
                  </p>
                </div>
                <div className="C209">
                  <p className="T087">
                    <span className="isUnit">내원지점이력:</span> 서울병원,
                    부산병원
                  </p>
                  <div className="C211">
                    <p className="T042">찐서포터</p>
                    <p className="T042">EC</p>
                    <p className="T042">CC</p>
                    <p className="T042">마케팅거부</p>
                    <p className="T042">MATE</p>
                    <p className="T042">기증자</p>
                    <p className="T042">실천반갑</p>
                    <p className="T042">성공기 작성</p>
                    <p className="T042 isRed">혈액검사 대상자</p>
                  </div>
                </div>
              </div>
            </ScrollableContainer>
          </PopupSectionBox>
        </>
      </Popup>
      <Popup
        isOpen={isSurveyBarcodeSearchPopupOpen}
        onClose={() => setIsSurveyBarcodeSearchPopupOpen(false)}
      >
        <>
          <PopupSectionBox x={360} y={40} width={1200}>
            <div className="C180">
              <p className="T076">고객 조회</p>
              <div className="C2000">
                <p className="T2000">보기:</p>
                <TabSelector
                  items={[
                    { title: "바코드 예약 고객" },
                    { title: "설문지 고객" },
                    { title: "상담 가등록 고객" },
                  ]}
                  width="var(--size-340)"
                  multiple={false}
                  value={customerSearchTab}
                  onChange={(selected) =>
                    setCustomerSearchTab(selected as number)
                  }
                />
                <LabeledCheckbox
                  checked={excludeRegisteredChecked}
                  onChange={setExcludeRegisteredChecked}
                  text="등록 완료된 고객 제외"
                />
              </div>
              <div
                className="C181 isCloseButton"
                onClick={() => setIsSurveyBarcodeSearchPopupOpen(false)}
              >
                <div className="C179 isDepth1"></div>
                <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
              </div>
            </div>
          </PopupSectionBox>
          {/* 검색 폼 섹션 - 탭에 따라 변경 */}
          {customerSearchTab === 0 && (
            <PopupSectionBox x={360} y={160} width={1200} height={170}>
              <div className="C2004">
                <div className="C2005">
                  <p className="T2004">이름:</p>
                  <input
                    className="T2005"
                    placeholder="16자 이하"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">주민번호:</p>
                  <input
                    className="T2005"
                    placeholder="14자 이내"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">휴대번호:</p>
                  <input
                    className="T2005"
                    placeholder="17자 이내"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">차트번호:</p>
                  <input className="T2006" placeholder="9자 이내" type="text" />
                </div>
              </div>

              <div className="C2006">
                <div className="C2005">
                  <p className="T2004">예약번호:</p>
                  <input className="T2006" placeholder="7자 이내" type="text" />
                </div>

                <div className="C2005">
                  <div className="C2007">
                    <p className="T2004">날짜 검색:</p>
                    <input
                      className="T2005"
                      placeholder="날짜 선택"
                      type="text"
                    />
                    <div className="C2007">
                      <p className="T2004">~</p>
                      <input
                        className="T2005"
                        placeholder="날짜 선택"
                        type="text"
                      />
                    </div>
                    <button className="C2008">검색</button>
                  </div>
                </div>
              </div>
            </PopupSectionBox>
          )}

          {customerSearchTab === 1 && (
            <PopupSectionBox x={360} y={160} width={1200} height={170}>
              <div className="C2004">
                <div className="C2005">
                  <p className="T2004">이름:</p>
                  <input
                    className="T2005"
                    placeholder="16자 이하"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">주민번호:</p>
                  <input
                    className="T2005"
                    placeholder="14자 이내"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">휴대번호:</p>
                  <input
                    className="T2005"
                    placeholder="17자 이내"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">차트번호:</p>
                  <input className="T2006" placeholder="9자 이내" type="text" />
                </div>
              </div>

              <div className="C2006">
                <div className="C2005">
                  <p className="T2004">예약번호:</p>
                  <input className="T2006" placeholder="7자 이내" type="text" />
                </div>

                <div className="C2005">
                  <div className="C2007">
                    <p className="T2004">날짜 검색:</p>
                    <input
                      className="T2005"
                      placeholder="날짜 선택"
                      type="text"
                    />
                    <div className="C2007">
                      <p className="T2004">~</p>
                      <input
                        className="T2005"
                        placeholder="날짜 선택"
                        type="text"
                      />
                    </div>
                    <button className="C2008">검색</button>
                  </div>
                </div>
              </div>
            </PopupSectionBox>
          )}

          {customerSearchTab === 2 && (
            <PopupSectionBox x={360} y={160} width={1200} height={170}>
              <div className="C2004">
                <div className="C2005">
                  <p className="T2004">이름:</p>
                  <input
                    className="T2005"
                    placeholder="16자 이하"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">주민번호:</p>
                  <input
                    className="T2005"
                    placeholder="14자 이내"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">휴대번호:</p>
                  <input
                    className="T2005"
                    placeholder="17자 이내"
                    type="text"
                  />
                </div>
                <div className="C2005">
                  <p className="T2004">차트번호:</p>
                  <input className="T2006" placeholder="9자 이내" type="text" />
                </div>
              </div>

              <div className="C2006">
                <div className="C2005">
                  <p className="T2004">예약번호:</p>
                  <input className="T2006" placeholder="7자 이내" type="text" />
                </div>

                <div className="C2005">
                  <div className="C2007">
                    <p className="T2004">날짜 검색:</p>
                    <input
                      className="T2005"
                      placeholder="날짜 선택"
                      type="text"
                    />
                    <div className="C2007">
                      <p className="T2004">~</p>
                      <input
                        className="T2005"
                        placeholder="날짜 선택"
                        type="text"
                      />
                    </div>
                    <button className="C2008">검색</button>
                  </div>
                </div>
              </div>
            </PopupSectionBox>
          )}

          {/* 테이블 섹션 - 탭에 따라 변경 */}
          {customerSearchTab === 0 && (
            <PopupSectionBox x={360} y={350} width={1200} height={810}>
              <div className="C2009">
                <div className="C2010">
                  <div className="C2011">
                    <div className="C2012">
                      <div className="C2013">
                        <div className="T2010">고객이름</div>
                        <div className="T2010 is15p">주민번호</div>
                        <div className="T2010 is15p">휴대번호</div>
                        <div className="T2010 is15p">등록지점</div>
                        <div className="T2010 is15p">바코드 번호</div>
                        <div className="T2010">등록일자</div>
                        <div className="T2010">웹 ID</div>
                        <div className="T2010">등록여부</div>
                      </div>
                    </div>
                    <div className="C2014">
                      {sampleTableData.map((row, index) => (
                        <div key={index} className="C2015">
                          <div className="T2011">{row.customerName}</div>
                          <div className="T2011 is15p">
                            {row.residentNumber}
                          </div>
                          <div className="T2011 is15p">{row.phoneNumber}</div>
                          <div className="T2011 is15p">
                            {row.registrationBranch}
                          </div>
                          <div className="T2011 is15p">{row.barcodeNumber}</div>
                          <div className="T2011">{row.registrationDate}</div>
                          <div className="T2011">{row.webId}</div>
                          <div
                            className={`T2012 ${
                              row.registrationStatus === "가입완료"
                                ? "isRegistered"
                                : "isDisconnected"
                            }`}
                          >
                            {row.registrationStatus}
                          </div>
                          <button className="C2016">
                            <div className="C2017">
                              <div className="C2018 styleSheet isIcon isArrow isMini"></div>
                            </div>
                            <span className="T2020">등록하기</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="C2019">
                  <button
                    className="C2020"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isLeftDouble"></div>
                  </button>
                  <button
                    className="C2020"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isLeft"></div>
                  </button>
                  {Array.from(
                    { length: Math.min(10, totalPages) },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`C2021 ${
                        currentPage === page ? "isActive" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="C2020"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isRight"></div>
                  </button>
                  <button
                    className="C2020"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isRightDouble"></div>
                  </button>
                </div>
              </div>
            </PopupSectionBox>
          )}

          {customerSearchTab === 1 && (
            <PopupSectionBox x={360} y={350} width={1200} height={810}>
              <div className="C2009">
                <div className="C2010">
                  <div className="C2011">
                    <div className="C2012">
                      <div className="C2013">
                        <div className="T2010 isFixed150">고객이름</div>
                        <div className="T2010 isFixed150">주민번호</div>
                        <div className="T2010 isFixed150">휴대번호</div>
                        <div className="T2010 isFixed150">등록지점</div>
                        <div className="T2010 isFixed150">차트번호</div>
                        <div className="T2010 isFixed150">등록일자</div>
                        <div className="T2010 isFixed150">설문지 종류</div>
                        <div className="T2010 isFixed150">등록여부</div>
                      </div>
                    </div>
                    <div className="C2014">
                      {surveyTableData.map((row, index) => {
                        const surveyPageContent = (
                          <SlidePage
                            title="신환 설문지 등록"
                            customerName={row.customerName}
                            customerId={row.chartNumber}
                            showToggleSwitch={false}
                          >
                            {/* 신환 설문지 등록 폼 - 여기에 퍼블리싱 */}
                          </SlidePage>
                        );
                        return (
                          <div
                            key={index}
                            className="C2015"
                            onClick={() => {
                              navigateToPage("new-survey", surveyPageContent);
                            }}
                          >
                            <div className="T2011 isFixed150">
                              {row.customerName}
                            </div>
                            <div className="T2011 isFixed150">
                              {row.residentNumber}
                            </div>
                            <div className="T2011 isFixed150">
                              {row.phoneNumber}
                            </div>
                            <div className="T2011 isFixed150">
                              {row.registrationBranch}
                            </div>
                            <div className="T2011 isFixed150">
                              {row.chartNumber}
                            </div>
                            <div className="T2011 isFixed150">
                              {row.registrationDate}
                            </div>
                            <div className="T2011 isFixed150">
                              {row.surveyType}
                            </div>
                            <div
                              className={`T2012 isFixed150 ${
                                row.registrationStatus === "가입완료"
                                  ? "isRegistered"
                                  : "isDisconnected"
                              }`}
                            >
                              {row.registrationStatus}
                            </div>
                            <button
                              className="C2016"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToPage("new-survey", surveyPageContent);
                              }}
                            >
                              <div className="C2017">
                                <div className="C2018 styleSheet isIcon isArrow isMini"></div>
                              </div>
                              <span className="T2011">등록하기</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="C2019">
                  <button
                    className="C2020"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isLeftDouble"></div>
                  </button>
                  <button
                    className="C2020"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isLeft"></div>
                  </button>
                  {Array.from(
                    { length: Math.min(10, totalPages) },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`C2021 ${
                        currentPage === page ? "isActive" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="C2020"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isRight"></div>
                  </button>
                  <button
                    className="C2020"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isRightDouble"></div>
                  </button>
                </div>
              </div>
            </PopupSectionBox>
          )}

          {customerSearchTab === 2 && (
            <PopupSectionBox x={360} y={350} width={1200} height={810}>
              <div className="C2009">
                <div className="C2010">
                  <div className="C2011">
                    <div className="C2012">
                      <div className="C2013">
                        <div className="T2010 isFixed150">고객이름</div>
                        <div className="T2010 isFixed150">주민번호</div>
                        <div className="T2010 isFixed150">휴대번호</div>
                        <div className="T2010 isFixed150">등록지점</div>
                        <div className="T2010 isFixed150">가등록 번호</div>
                        <div className="T2010 isFixed150">등록일자</div>
                        <div className="T2010 isFixed150">등록자</div>
                        <div className="T2010 isFixed150">등록여부</div>
                      </div>
                    </div>
                    <div className="C2014">
                      {preRegistrationTableData.map((row, index) => (
                        <div key={index} className="C2015">
                          <div className="T2011 isFixed150">
                            {row.customerName}
                          </div>
                          <div className="T2011 isFixed150">
                            {row.residentNumber}
                          </div>
                          <div className="T2011 isFixed150">
                            {row.phoneNumber}
                          </div>
                          <div className="T2011 isFixed150">
                            {row.registrationBranch}
                          </div>
                          <div className="T2011 isFixed150">
                            {row.preRegistrationNumber}
                          </div>
                          <div className="T2011 isFixed150">
                            {row.registrationDate}
                          </div>
                          <div className="T2011 isFixed150">
                            {row.registrant}
                          </div>
                          <div
                            className={`T2012 isFixed150 ${
                              row.registrationStatus === "가입완료"
                                ? "isRegistered"
                                : "isDisconnected"
                            }`}
                          >
                            {row.registrationStatus}
                          </div>
                          <button className="C2016">
                            <div className="C2017">
                              <div className="C2018 styleSheet isIcon isArrow isMini"></div>
                            </div>
                            <span className="T2020">등록하기</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="C2019">
                  <button
                    className="C2020"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isLeftDouble"></div>
                  </button>
                  <button
                    className="C2020"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isLeft"></div>
                  </button>
                  {Array.from(
                    { length: Math.min(10, totalPages) },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`C2021 ${
                        currentPage === page ? "isActive" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="C2020"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isRight"></div>
                  </button>
                  <button
                    className="C2020"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <div className="C2018 styleSheet isIcon isMini isControl isRightDouble"></div>
                  </button>
                </div>
              </div>
            </PopupSectionBox>
          )}
        </>
      </Popup>
    </article>
  );
}
