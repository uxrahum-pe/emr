/**
 * Reception Page
 *
 * @description 원무 파트의 메인 페이지입니다. 고객 상태 관리, 직원 일정 조회,
 * 쪽지 및 알림 기능을 제공합니다.
 *
 * @page
 * @route /reception
 *
 * @remarks
 * - Aside 컴포넌트를 사용하여 우측 슬라이드 페이지를 관리합니다.
 * - NoteClickHandler와 AlarmClickHandler는 Aside 내부에 렌더링되어야 합니다.
 * - MainContent는 역할 기반 라우팅을 사용하여 직원 일정을 표시합니다.
 */

"use client";

import { useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import Aside from "@/components/Aside";
import { useAside } from "@/components/AsideContext";
import MainContent from "@/components/reception/MainContent";
import NoteClickHandler from "@/components/reception/NoteClickHandler";
import AlarmClickHandler from "@/components/reception/AlarmClickHandler";
import CustomerDetailPanel from "@/components/CustomerDetailPanel";
import SlidePage from "@/components/SlidePage";
import ReferenceMessage from "@/components/ReferenceMessage";
import ToggleSwitch from "@/components/ToggleSwitch";
import Tooltip from "@/components/Tooltip";
import ScrollableContainer from "@/components/ScrollableContainer";
import ListItem from "@/components/ListItem";
import DraggableScrollContainer from "@/components/DraggableScrollContainer";
import TabSelector from "@/components/TabSelector";
import EmployeeBadge from "@/components/EmployeeBadge";
import ReceptionCheckInButton from "@/components/ReceptionCheckInButton";
import EmployeeSlidePage from "@/components/EmployeeSlidePage";
import DoctorSlidePage from "@/components/DoctorSlidePage";
import CounselorSlidePage from "@/components/CounselorSlidePage";
import type { CustomerStatusSectionProps } from "@/types/reception";
import { useAsideStore } from "@/stores/useAsideStore";
import { useReceptionStore } from "@/stores/useReceptionStore";
import { usePageHeaderHandlers } from "@/hooks/usePageHeaderHandlers";

export default function ReceptionPage() {
  // Zustand 스토어에서 상태 가져오기
  const currentPageId = useAsideStore((state) => state.currentPageId);

  // PageHeader 핸들러 관리 훅 사용
  const {
    noteClickHandler,
    alarmClickHandler,
    handleNoteHandlerReady,
    handleAlarmHandlerReady,
  } = usePageHeaderHandlers();

  // Reception 스토어 상태
  const {
    isSmallScreen,
    activeIndex,
    selectedTabs,
    selectedPendingTabs,
    selectedSortTab,
    isQuickActionsHovered,
    isCustomerDetailOpen,
    setIsSmallScreen,
    setActiveIndex,
    setSelectedTabs,
    setSelectedPendingTabs,
    setSelectedSortTab,
    setIsQuickActionsHovered,
    setIsCustomerDetailOpen,
  } = useReceptionStore();

  const handleC032Click = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveIndex(activeIndex === index ? null : index);
    },
    [activeIndex, setActiveIndex]
  );

  return (
    <>
      <main className="C007">
        <PageHeader
          title="원무"
          onNoteClick={noteClickHandler}
          isNoteSelected={currentPageId === "my-notes"}
          onAlarmClick={alarmClickHandler}
          isAlarmSelected={currentPageId === "my-alarms"}
        />
        <Aside
          mainContent={() => (
            <MainContent
              onCustomerClick={() => setIsCustomerDetailOpen(true)}
            />
          )}
        >
          <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
          <AlarmClickHandler onHandlerReady={handleAlarmHandlerReady} />
          <CustomerStatusSection
            handleC032Click={handleC032Click}
            isSmallScreen={isSmallScreen}
            setIsSmallScreen={setIsSmallScreen}
            activeIndex={activeIndex}
            selectedTabs={selectedTabs}
            setSelectedTabs={setSelectedTabs}
            selectedPendingTabs={selectedPendingTabs}
            setSelectedPendingTabs={setSelectedPendingTabs}
            selectedSortTab={selectedSortTab}
            setSelectedSortTab={setSelectedSortTab}
            isQuickActionsHovered={isQuickActionsHovered}
            setIsQuickActionsHovered={setIsQuickActionsHovered}
            isCustomerDetailOpen={isCustomerDetailOpen}
            setIsCustomerDetailOpen={setIsCustomerDetailOpen}
          />
        </Aside>
      </main>
      <Sidebar />
    </>
  );
}

/**
 * CustomerStatusSection Component
 *
 * @description 고객 상태 섹션을 렌더링하는 컴포넌트입니다.
 * 예약, 대기, 완료 등의 탭을 관리하고 고객 리스트를 표시합니다.
 *
 * @component
 * @internal
 */
function CustomerStatusSection({
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
  const { navigateToPage, resetToMain } = useAside();
  // TODO: 섹션 토글, C106/C107 스크롤 동기화가 다시 필요해지면 여기서 상태/refs를 복원

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
    e.stopPropagation(); // ListItem 클릭 이벤트와 충돌 방지
    console.log("고객현황 직원 클릭:", employeeName, employeeId, role);
    // 역할에 따라 적절한 컴포넌트 선택
    let SlidePageComponent = EmployeeSlidePage;
    if (role.includes("원장")) {
      SlidePageComponent = DoctorSlidePage;
    } else if (role.includes("상담사")) {
      SlidePageComponent = CounselorSlidePage;
    }

    // [업무 일정 보기] 클릭 시 분류: 원장, 상담사, 나머지 직원
    let roleCategory = "employee"; // 나머지 직원 (과장, 대리, 팀장, 주임 등)
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
          <div className="C022">
            <div className="C017 styleSheet isIcon isMagnifier"></div>
            <p className="T005">고객 통합 검색</p>
          </div>
          <div className="C023">
            <div className="C019 styleSheet isIcon isCheck"></div>
            <p className="T008">설문지 & 바코드 고객 검색</p>
          </div>
          <div className="C023">
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
                <ListItem
                  onClick={() => handleCustomerClick("이서연", "210051234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이서연</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
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
                      tooltipText="상담 일지 보기"
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("박민준", "210048765")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">박민준</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        35<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048765</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:00 예정.
                    </p>
                    <p className="T017">재진 상담</p>
                    <Tooltip text="상담 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "이수진",
                            "lsj003",
                            "상담사",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          이수진<span className="isUnit">상담사</span>
                        </p>
                      </div>
                    </Tooltip>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("최지우", "210052341")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">최지우</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        24<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210052341</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:15 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019 isGreen">5분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("정하늘", "210049876")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">정하늘</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210049876</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <Tooltip text="상담 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "박미영",
                            "pmy005",
                            "상담사",
                            e
                          )
                        }
                      >
                        <div className="C040"></div>
                        <p className="T018">
                          박미영<span className="isUnit">상담사</span>
                        </p>
                      </div>
                    </Tooltip>
                    <p className="T019 isGreen">10분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("김도현", "210045678")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김도현</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        41<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210045678</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">PM</span> 12:00 예정.
                    </p>
                    <p className="T017">재진 상담</p>
                    <EmployeeBadge
                      name="이수진"
                      role="상담사"
                      employeeId="lsj003"
                      avatarClass="isMale"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019">30분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() =>
                    handleCustomerClick("황보제갈수빈", "210047938")
                  }
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">황보제갈수빈</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        32<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047938</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">PM</span> 12:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019">50분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("윤서아", "210053210")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">윤서아</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        26<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210053210</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">PM</span> 1:00 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="박미영"
                      role="상담사"
                      employeeId="pmy005"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019">1시간30분 후 도착예정.</p>
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
                </ListItem>
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
                  items={[{ title: "접수고객" }, { title: "보류고객" }]}
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
                <ListItem
                  onClick={() => handleCustomerClick("오수빈", "210049123")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">오수빈</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        31<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210049123</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("강민서", "210050456")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">강민서</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        27<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210050456</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("송예준", "210046789")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">송예준</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        38<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210046789</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
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
                  대기: <span className="isValue isBlack">4</span>명 / 호출:{" "}
                  <span className="isValue isYellow">2</span>명 / 진행:{" "}
                  <span className="isValue isGreen">2</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">4</span> /{" "}
                  <span className="isYellow">2</span> /{" "}
                  <span className="isGreen">2</span>
                </p>
              </div>
              <ScrollableContainer>
                <ListItem
                  onClick={() => handleCustomerClick("한소영", "210048901")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한소영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        33<span className="isUnit">세</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("조예린", "210051567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">조예린</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        25<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("임지훈", "210044321")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">임지훈</p>
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
                    <p className="T017">O2 고압산소</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="원장 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "홍성훈",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          홍성훈<span className="isUnit">원장</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("배수진", "210047654")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">배수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        30<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
                    <p className="T016">
                      01:12:34 <span className="isUnit">경과</span>{" "}
                    </p>
                    <Tooltip text="원장 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "홍성훈",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          홍성훈<span className="isUnit">원장</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("서민재", "210049432")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">서민재</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        36<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("노다혜", "210052098")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">노다혜</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="원장 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "홍성훈",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          홍성훈<span className="isUnit">원장</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
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
                <ListItem
                  onClick={() => handleCustomerClick("유하은", "210048234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">유하은</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        34<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048234</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:20 이관.
                    </p>
                    <p className="T017">수납 대기</p>
                    <p className="T016 isGreen">
                      <span className="isBold">18분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">52분</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("안지영", "210050123")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">안지영</p>
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
                      미수:<span className="isBold isMint">750,000</span>원
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("홍준서", "210045678")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">홍준서</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        39<span className="isUnit">세</span>
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
                      2,800,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">1,200,000</span>원
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("전미나", "210047567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">전미나</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        31<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047567</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:10 귀가.
                    </p>
                    <p className="T016 isBlue">
                      8,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">0</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      8,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      1,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      300,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 지방흡입
                    </p>
                  </div>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("장우진", "210043890")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">장우진</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        44<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210043890</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:20 귀가.
                    </p>
                    <p className="T016 isBlue">
                      3,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">800,000</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      4,000,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      800,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      150,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 리프팅 시술
                    </p>
                  </div>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("문서아", "210052345")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">문서아</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        27<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210052345</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:25 귀가.
                    </p>
                    <p className="T016 isBlue">
                      1,850,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">0</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      1,850,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      300,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      80,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 보톡스/필러
                    </p>
                  </div>
                </ListItem>
              </ScrollableContainer>
            </div>
          </div>
        </div>
        <CustomerDetailPanel
          isOpen={isCustomerDetailOpen}
          onClose={handleCustomerDetailClose}
          isSmallScreen={isSmallScreen}
          onQuickActionsHoverChange={setIsQuickActionsHovered}
        ></CustomerDetailPanel>
      </section>
      <ReceptionCheckInButton
        isOpen={isCustomerDetailOpen}
        isFolded={isQuickActionsHovered}
      />
    </article>
  );
}
