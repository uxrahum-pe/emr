/**
 * Dashboard Page
 *
 * @description 대시보드 파트의 메인 페이지입니다. 전체 현황을 한눈에 볼 수 있는 대시보드입니다.
 *
 * @page
 * @route /
 *
 * @remarks
 * - Aside 컴포넌트를 사용하여 우측 슬라이드 페이지를 관리합니다.
 * - NoteClickHandler와 AlarmClickHandler는 Aside 내부에 렌더링되어야 합니다.
 * - MainContent는 역할 기반 라우팅을 사용하여 직원 일정을 표시합니다.
 */

"use client";

import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import Aside from "@/components/Aside";
import PersonalSchedule from "@/components/dashboard/PersonalSchedule";
import NoteClickHandler from "@/components/reception/NoteClickHandler";
import AlarmClickHandler from "@/components/reception/AlarmClickHandler";
import ReservationClickHandler from "@/components/dashboard/ReservationClickHandler";
import { useAsideStore } from "@/stores/useAsideStore";
import { usePageHeaderHandlers } from "@/hooks/usePageHeaderHandlers";

export default function DashboardPage() {
  // Zustand 스토어에서 상태 가져오기
  const currentPageId = useAsideStore((state) => state.currentPageId);

  // PageHeader 핸들러 관리 훅 사용
  const {
    noteClickHandler,
    alarmClickHandler,
    reservationClickHandler,
    handleNoteHandlerReady,
    handleAlarmHandlerReady,
    handleReservationHandlerReady,
  } = usePageHeaderHandlers();

  return (
    <>
      <main className="C007">
        <PageHeader
          title="대시보드"
          onNoteClick={noteClickHandler}
          isNoteSelected={currentPageId === "my-notes"}
          onAlarmClick={alarmClickHandler}
          isAlarmSelected={currentPageId === "my-alarms"}
          onReservationClick={reservationClickHandler}
        />
        <Aside mainContent={() => <PersonalSchedule />}>
          <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
          <AlarmClickHandler onHandlerReady={handleAlarmHandlerReady} />
          <ReservationClickHandler
            onHandlerReady={handleReservationHandlerReady}
          />
          <CustomerStatusSection />
        </Aside>
      </main>
      <Sidebar />
    </>
  );
}

/**
 * CustomerStatusSection Component
 *
 * @description 대시보드 페이지의 메인 콘텐츠 섹션입니다.
 *
 * @component
 * @internal
 */
function CustomerStatusSection() {
  return (
    <article className="C020">
      <div className="C197 isH200">
        <section className="C198 isOneThird">
          <div className="C199">
            <p className="T084">월별 집도 현황</p>
          </div>
          <div className="C200"></div>
        </section>
        <section className="C198 isOneThird">
          <div className="C199">
            <p className="T084">월별 집도 현황</p>
          </div>
          <div className="C200"></div>
        </section>
        <section className="C198 isOneThird">
          <div className="C199">
            <p className="T084">월별 집도 현황</p>
          </div>
          <div className="C200"></div>
        </section>
      </div>
      <div className="C197 isH860">
        <section className="C198 isTwoThird">
          <div className="C199">
            <p className="T084">월별 집도 현황</p>
          </div>
          <div className="C200"></div>
        </section>
        <section className="C198 isOneThird">
          <div className="C199">
            <p className="T084">월별 집도 현황</p>
          </div>
          <div className="C200"></div>
        </section>
      </div>
    </article>
  );
}
