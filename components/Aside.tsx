/**
 * Aside Component
 *
 * @description 우측 사이드바 영역에서 슬라이드 페이지를 관리하는 컴포넌트입니다.
 * 페이지 스택을 관리하고, 동일한 pageId의 페이지가 이미 열려있으면 누적하지 않고
 * 해당 페이지로 이동합니다.
 *
 * @component
 * @example
 * ```tsx
 * <Aside
 *   mainContent={<MainContent />}
 *   onNavigate={(pageId) => console.log(pageId)}
 * >
 *   <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
 * </Aside>
 * ```
 *
 * @remarks
 * - 함수형 업데이트를 사용하여 항상 최신 상태를 보장합니다.
 * - 동일한 pageId의 페이지는 누적되지 않고 기존 페이지로 이동합니다.
 * - 애니메이션 중에는 새로운 네비게이션을 무시합니다.
 */

"use client";

import { useEffect, useLayoutEffect, memo, useRef, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import WeeklyCalendar from "./WeeklyCalendar";
import { usePageHeaderStore } from "@/stores/usePageHeaderStore";
import { AsideProvider } from "./AsideContext";
import SlidePage from "./SlidePage";
import { useAsideStore, type AsidePage } from "@/stores/useAsideStore";
import PartReferencePopup from "./popups/PartReferencePopup";
import type { AsideProps, AsideInnerProps } from "@/types/layout";

function Aside({ mainContent, onNavigate, children }: AsideProps) {
  // Zustand 스토어에서 상태와 액션 가져오기
  const pages = useAsideStore((state) => state.pages);
  const currentIndex = useAsideStore((state) => state.currentIndex);
  const goBack = useAsideStore((state) => state.goBack);

  // onNavigate 콜백을 Zustand 스토어의 currentPageId와 동기화 (선택적)
  useEffect(() => {
    if (!onNavigate) return;

    let prevPageId: string | null = null;

    // Zustand의 subscribe는 전체 상태 변경을 감지
    // currentPageId만 변경되었을 때만 호출하도록 최적화
    const unsubscribe = useAsideStore.subscribe((state) => {
      const currentPageId = state.currentPageId;
      // 이전 값과 다를 때만 호출
      if (currentPageId !== prevPageId) {
        prevPageId = currentPageId;
        if (currentPageId) {
          onNavigate(currentPageId);
        } else {
          onNavigate("main");
        }
      }
    });

    return unsubscribe;
  }, [onNavigate]);

  return (
    <AsideProvider>
      <AsideInner
        mainContent={mainContent}
        pages={pages}
        currentIndex={currentIndex}
        goBack={goBack}
      />
      {children}
    </AsideProvider>
  );
}

/**
 * AsideInner Component
 *
 * @description Aside의 내부 렌더링을 담당하는 컴포넌트입니다.
 * 메인 페이지를 초기화하고 페이지 스택을 렌더링합니다.
 * pathname 변경을 감지하여 Aside를 메인 페이지로 초기화합니다.
 *
 * @component
 * @internal
 *
 * @remarks
 * - `useLayoutEffect`를 사용하여 pathname 변경을 먼저 감지합니다.
 * - pathname이 변경되면 pages를 빈 배열로 초기화하고, mainPageContent useEffect에서 main 페이지를 생성합니다.
 * - main 페이지 생성 후 `currentIndex`를 0으로 설정하여 메인 페이지로 이동합니다.
 */
const AsideInner = memo(function AsideInner({
  mainContent,
  pages,
  currentIndex,
  goBack,
}: AsideInnerProps) {
  const setPages = useAsideStore((state) => state.setPages);
  const setIsAnimating = useAsideStore((state) => state.setIsAnimating);
  const lastPathname = useAsideStore((state) => state.lastPathname);
  const setLastPathname = useAsideStore((state) => state.setLastPathname);
  // PageHeader 핸들러 리셋을 위한 스토어
  const resetHandlers = usePageHeaderStore((state) => state.resetHandlers);

  // 현재 경로 확인 (대시보드는 /)
  const pathname = usePathname();

  // pathname 변경 플래그 (mainPageContent useEffect에서 사용)
  const pathnameChangedRef = useRef(false);

  // pathname 변경 시 Aside를 메인으로 초기화
  // useLayoutEffect를 사용하여 mainPageContent useEffect보다 먼저 실행되도록 함
  useLayoutEffect(() => {
    // 클라이언트에서만 실행 (SSR 환경에서는 무시)
    if (typeof window === "undefined") {
      console.log("🔴 [Aside] pathname useLayoutEffect - SSR 환경, 실행 안 함");
      return;
    }

    console.log("🟡 [Aside] pathname useLayoutEffect 실행", {
      pathname,
      lastPathname,
      isClient: typeof window !== "undefined",
    });

    // pathname이 유효하지 않으면 무시
    if (!pathname) {
      console.log("⚠️ [Aside] pathname이 유효하지 않음");
      return;
    }

    // 첫 마운트 시에는 pathname만 저장
    if (lastPathname === null) {
      console.log("🆕 [Aside] 첫 마운트, pathname 저장", { pathname });
      setLastPathname(pathname);
      return;
    }

    // pathname이 변경되었을 때만 리셋
    if (lastPathname !== pathname) {
      console.log("🔄 [Aside] pathname 변경 감지", {
        from: lastPathname,
        to: pathname,
      });
      setLastPathname(pathname);
      pathnameChangedRef.current = true;

      // goBack처럼 애니메이션 시작
      setIsAnimating(true);

      // 즉시 pages를 빈 배열로 초기화 (main 페이지는 mainPageContent useEffect에서 생성됨)
      setPages([]);
      console.log("🗑️ [Aside] pages 빈 배열로 초기화");

      // PageHeader 핸들러도 리셋 (이전 페이지의 핸들러가 남아있지 않도록)
      resetHandlers();
    } else {
      pathnameChangedRef.current = false;
    }
  }, [
    pathname,
    lastPathname,
    setPages,
    setIsAnimating,
    resetHandlers,
    setLastPathname,
  ]);
  const isDashboard = pathname === "/";
  const isCounseling = pathname === "/counseling";
  const isReception = pathname === "/reception";
  const isPreCare = pathname === "/pre-care";
  const isClinic = pathname === "/clinic";
  const isSurgery = pathname === "/surgery";
  const isProcedure = pathname === "/procedure";
  const isPostCare = pathname === "/post-care";
  const isStatistics = pathname === "/statistics";

  // C070 클릭 시 팝업 상태
  const [isPartReferencePopupOpen, setIsPartReferencePopupOpen] =
    useState(false);

  // Render mainContent inside provider to access useAside
  // mainContent가 변경될 때마다 재계산되도록 useMemo 사용
  const mainPageContent = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;

    console.log("🔵 [Aside] mainPageContent useMemo 실행", {
      pathname,
      isDashboard,
      isCounseling,
      isReception,
      hasContent: !!content,
      isClient: typeof window !== "undefined",
    });

    // 대시보드 경로일 때는 content를 C073으로 감싸서 반환 (SlidePage로 감싸지 않음)
    if (isDashboard) {
      return <div className="C073">{content}</div>;
    }

    // content가 null이면 빈 C073 반환
    if (content === null) {
      return <div className="C073"></div>;
    }

    // 상담 페이지용 레이아웃
    if (isCounseling) {
      return (
        <>
          <WeeklyCalendar />
          <div
            className="C070 isCounseling"
            onClick={() => setIsPartReferencePopupOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <p className="T035">
              상담파트 <span className="isUnit">전체 전달사항 입력</span>
            </p>
            <div className="C071">
              <div className="C072 styleSheet isIcon isWrite"></div>
            </div>
          </div>
          <div className="C074"></div>
          <div className="C075">{content}</div>
        </>
      );
    }

    // 원무 페이지용 레이아웃
    return (
      <>
        <WeeklyCalendar />
        <div
          className="C070 isReception"
          onClick={() => setIsPartReferencePopupOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <p className="T035">
            원무파트 <span className="isUnit">전체 전달사항 입력</span>
          </p>
          <div className="C071">
            <div className="C072 styleSheet isIcon isWrite"></div>
          </div>
        </div>
        <div className="C074"></div>
        <div className="C075">{content}</div>
      </>
    );
  }, [mainContent, isDashboard, isCounseling, isReception, pathname]);

  // 대시보드용 C073인지 확인하는 함수
  const isDashboardC073 = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;
    return isDashboard || content === null;
  }, [mainContent, isDashboard]);

  // Initialize and update main page when mainContent changes
  React.useEffect(() => {
    // 클라이언트에서만 실행 (SSR 환경에서는 무시)
    if (typeof window === "undefined") {
      console.log(
        "🔴 [Aside] mainPageContent useEffect - SSR 환경, 실행 안 함"
      );
      return;
    }

    console.log("🟢 [Aside] mainPageContent useEffect 시작", {
      hasMainPageContent: !!mainPageContent,
      pathname,
      pagesLength: pages.length,
      currentIndex,
    });

    // mainPageContent가 없으면 생성하지 않음
    if (!mainPageContent) {
      console.log("⚠️ [Aside] mainPageContent가 없어서 생성 안 함");
      return;
    }

    setPages((prev) => {
      const wasEmpty = prev.length === 0;
      const mainPageIndex = prev.findIndex((page) => page.id === "main");

      console.log("📝 [Aside] setPages 실행", {
        wasEmpty,
        mainPageIndex,
        prevLength: prev.length,
        pathnameChanged: pathnameChangedRef.current,
      });

      let newPages: AsidePage[];
      if (mainPageIndex !== -1) {
        // 메인 페이지가 이미 있으면 업데이트
        newPages = [...prev];
        newPages[mainPageIndex] = {
          ...newPages[mainPageIndex],
          content: mainPageContent,
        };
        console.log("✅ [Aside] 메인 페이지 업데이트", {
          newPagesLength: newPages.length,
        });
      } else {
        // 메인 페이지가 없으면 생성
        newPages = [
          {
            id: "main",
            content: mainPageContent,
            timestamp: Date.now(),
          },
          ...prev,
        ];
        console.log("🆕 [Aside] 메인 페이지 생성", {
          newPagesLength: newPages.length,
        });
      }

      // 초기 마운트 시 또는 pathname 변경으로 pages가 비어있을 때
      // main 페이지를 생성하고 currentIndex를 0으로 설정
      if (wasEmpty) {
        // pathname 변경으로 인한 경우
        if (pathnameChangedRef.current) {
          console.log("🔄 [Aside] pathname 변경으로 인한 초기화");
          pathnameChangedRef.current = false;

          // goBack처럼 pages와 currentIndex를 한 번에 설정
          const mainPage = newPages.find((page) => page.id === "main");
          if (mainPage) {
            // 다음 틱에 실행하여 setPages 완료 후 currentIndex 설정
            setTimeout(() => {
              console.log("⏰ [Aside] pathname 변경 후 상태 설정", {
                pagesLength: 1,
                currentIndex: 0,
              });
              useAsideStore.setState({
                pages: [mainPage],
                currentIndex: 0,
                currentPageId: null,
              });

              // goBack처럼 setTimeout을 사용하여 애니메이션 종료
              setTimeout(() => {
                console.log("✅ [Aside] 애니메이션 종료");
                useAsideStore.setState({
                  isAnimating: false,
                });
              }, 300);
            }, 0);
          }
        } else {
          // 초기 마운트 시에는 즉시 currentIndex를 0으로 설정
          console.log("🚀 [Aside] 초기 마운트 시 상태 설정");
          setTimeout(() => {
            useAsideStore.setState({
              currentIndex: 0,
              currentPageId: null,
              isAnimating: false,
            });
            console.log("✅ [Aside] 초기 마운트 완료", {
              currentIndex: 0,
              pagesLength: newPages.length,
            });
          }, 0);
        }
      }

      return newPages;
    });
  }, [mainPageContent, setPages, pathname, pages.length, currentIndex]);

  // pathname 변경 후 pages가 main 페이지만 있을 때 currentIndex를 0으로 설정
  // goBack처럼 pages와 currentIndex를 동시에 설정해야 작동함
  React.useEffect(() => {
    // 클라이언트에서만 실행 (SSR 환경에서는 무시)
    if (typeof window === "undefined") return;

    if (pathnameChangedRef.current) {
      // pages가 main 페이지만 있는지 확인
      const hasOnlyMainPage = pages.length === 1 && pages[0]?.id === "main";
      if (hasOnlyMainPage) {
        pathnameChangedRef.current = false; // 플래그 리셋
        // main 페이지가 생성된 직후 무조건 currentIndex를 0으로 설정
        // currentIndex가 이미 0이어도 다시 설정하여 렌더링을 보장
        useAsideStore.setState({
          currentIndex: 0,
          currentPageId: null,
        });
      }
    }
  }, [pages]);

  // 렌더링 상태 로깅
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🎨 [Aside] 렌더링 상태", {
        pagesLength: pages.length,
        currentIndex,
        hasMainPageContent: !!mainPageContent,
        pathname,
      });
    }
  }, [pages.length, currentIndex, mainPageContent, pathname]);

  return (
    <aside className="C013">
      <div className="C089">
        {pages.length === 0 ? (
          // pages가 비어있을 때 fallback 렌더링 (초기 마운트 시)
          <div
            className="C073"
            style={{ transform: "translateX(0%)", zIndex: 1 }}
          >
            {mainPageContent || <div className="C073"></div>}
          </div>
        ) : (
          pages.map((page, index) => {
            const offset = index - currentIndex;
            // page.content가 React 요소인지 확인하고, SlidePage 계열 컴포넌트인지 체크
            const isSlidePageComponent =
              React.isValidElement(page.content) &&
              (page.content.type === SlidePage ||
                (typeof page.content.type === "function" &&
                  (page.content.type.name === "DoctorSlidePage" ||
                    page.content.type.name === "EmployeeSlidePage" ||
                    page.content.type.name === "CounselorSlidePage" ||
                    page.content.type.name === "CustomerReferenceSlide" ||
                    page.content.type.name === "MyNotesSlide" ||
                    page.content.type.name === "MyAlarmsSlide")));

            if (isSlidePageComponent) {
              // SlidePage 계열 컴포넌트면 props를 전달하여 clone
              return React.cloneElement(
                page.content as React.ReactElement<{
                  transform?: string;
                  zIndex?: number;
                  onGoBack?: () => void;
                  showBackButton?: boolean;
                }>,
                {
                  key: page.id,
                  transform: `translateX(${offset * 100}%)`,
                  zIndex: pages.length - index,
                  onGoBack: goBack,
                  showBackButton: index > 0,
                }
              );
            } else {
              // 대시보드용 C073이면 SlidePage로 감싸지 않고 직접 렌더링
              if (page.id === "main" && isDashboardC073) {
                return (
                  <div
                    key={page.id}
                    className="C073"
                    style={{
                      transform: `translateX(${offset * 100}%)`,
                      zIndex: pages.length - index,
                    }}
                  >
                    {page.content}
                  </div>
                );
              }
              // 일반 content면 SlidePage로 감싸기
              return (
                <SlidePage
                  key={page.id}
                  transform={`translateX(${offset * 100}%)`}
                  zIndex={pages.length - index}
                  onGoBack={goBack}
                  showBackButton={index > 0}
                >
                  {page.content}
                </SlidePage>
              );
            }
          })
        )}
      </div>

      {/* 파트 참조사항 팝업 */}
      {(isReception ||
        isCounseling ||
        isPreCare ||
        isClinic ||
        isSurgery ||
        isProcedure ||
        isPostCare ||
        isStatistics) && (
        <PartReferencePopup
          isOpen={isPartReferencePopupOpen}
          onClose={() => setIsPartReferencePopupOpen(false)}
        />
      )}
    </aside>
  );
});

export default memo(Aside);
