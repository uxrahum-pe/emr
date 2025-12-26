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
 * <Aside mainContent={<MainContent />}>
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
import { useAsideStore } from "@/stores/useAsideStore";
import PartReferencePopup from "./popups/PartReferencePopup";
import type { AsideProps, AsideInnerProps } from "@/types/layout";

function Aside({ mainContent, onNavigate, children }: AsideProps) {
  const currentIndex = useAsideStore((state) => state.currentIndex);
  const goBack = useAsideStore((state) => state.goBack);

  useEffect(() => {
    if (!onNavigate) return;

    let prevPageId: string | null = null;
    const unsubscribe = useAsideStore.subscribe((state) => {
      const currentPageId = state.currentPageId;
      if (currentPageId !== prevPageId) {
        prevPageId = currentPageId;
        onNavigate(currentPageId || "main");
      }
    });

    return unsubscribe;
  }, [onNavigate]);

  return (
    <AsideProvider>
      <AsideInner
        mainContent={mainContent}
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
  currentIndex,
  goBack,
}: AsideInnerProps) {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const storePages = useAsideStore((state) => state.pages);
  const setPages = useAsideStore((state) => state.setPages);
  const setIsAnimating = useAsideStore((state) => state.setIsAnimating);
  const lastPathname = useAsideStore((state) => state.lastPathname);
  const setLastPathname = useAsideStore((state) => state.setLastPathname);
  const resetHandlers = usePageHeaderStore((state) => state.resetHandlers);

  // 렌더링에는 storePages를 직접 사용
  const pages = storePages;
  const pathname = usePathname();
  const pathnameChangedRef = useRef(false);

  useLayoutEffect(() => {
    if (!isMounted || !pathname) return;

    if (lastPathname === null) {
      setLastPathname(pathname);
      return;
    }

    if (lastPathname !== pathname) {
      setLastPathname(pathname);
      pathnameChangedRef.current = true;
      setIsAnimating(true);
      setPages([]);
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
    isMounted,
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

  const mainPageContent = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;

    if (isDashboard) {
      return <div className="C073">{content}</div>;
    }

    if (content === null) {
      return <div className="C073"></div>;
    }

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
  }, [mainContent, isDashboard, isCounseling]);

  const isDashboardC073 = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;
    return isDashboard || content === null;
  }, [mainContent, isDashboard]);

  // pathname 변경 추적을 위한 ref
  const prevPathnameRef = useRef<string | null>(null);
  const mainPageInitializedRef = useRef(false);

  React.useEffect(() => {
    if (!isMounted || !mainPageContent) {
      console.log("🔴 [Aside] mainPageContent useEffect - 조건 불만족", {
        isMounted,
        hasMainPageContent: !!mainPageContent,
      });
      return;
    }

    const currentState = useAsideStore.getState();
    const wasEmpty = currentState.pages.length === 0;
    const mainPageIndex = currentState.pages.findIndex(
      (page) => page.id === "main"
    );

    // pathname이 변경되었는지 확인
    const pathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    // main 페이지가 없거나, pathname이 변경된 경우에만 실행
    // mainContent 변경은 무시 (이미 렌더링된 main 페이지는 유지)
    const shouldUpdate = mainPageIndex === -1 || pathnameChanged;

    // main 페이지가 이미 있고, pathname도 변경되지 않았다면 스킵
    if (!shouldUpdate && mainPageIndex !== -1) {
      console.log("⏭️ [Aside] main 페이지 존재하고 pathname 변경 없음, 스킵", {
        mainPageIndex,
        pathnameChanged,
        mainPageInitialized: mainPageInitializedRef.current,
      });
      return;
    }

    console.log("🟢 [Aside] mainPageContent useEffect 실행", {
      wasEmpty,
      mainPageIndex,
      pagesLength: currentState.pages.length,
      currentIndex: currentState.currentIndex,
      pathname,
      pathnameChanged,
    });

    // main 페이지가 이미 있는 경우
    if (mainPageIndex !== -1) {
      // pathname이 변경된 경우에만 업데이트
      if (pathnameChanged) {
        const newPages = [...currentState.pages];
        newPages[mainPageIndex] = {
          ...newPages[mainPageIndex],
          content: mainPageContent,
        };
        console.log("✅ [Aside] main 페이지 content 업데이트 (pathname 변경)");
        setPages(newPages);
        mainPageInitializedRef.current = true;
      }
      return;
    }

    // main 페이지가 없을 때만 생성
    const newPages = [
      {
        id: "main",
        content: mainPageContent,
        timestamp: Date.now(),
      },
      ...currentState.pages,
    ];

    if (wasEmpty) {
      if (pathnameChangedRef.current) {
        console.log("🔄 [Aside] pathname 변경으로 인한 main 페이지 생성");
        pathnameChangedRef.current = false;
        const mainPage = newPages.find((page) => page.id === "main");
        if (mainPage) {
          setTimeout(() => {
            useAsideStore.setState({
              pages: [mainPage],
              currentIndex: 0,
              currentPageId: null,
            });
            setTimeout(() => {
              useAsideStore.setState({ isAnimating: false });
            }, 300);
          }, 0);
        }
      } else {
        console.log("🚀 [Aside] 초기 마운트 시 main 페이지 생성");
        useAsideStore.setState({
          pages: newPages,
          currentIndex: 0,
          currentPageId: null,
          isAnimating: false,
        });
        mainPageInitializedRef.current = true;
      }
    } else {
      // main 페이지가 없지만 다른 페이지들이 있는 경우 (이론적으로 발생하지 않아야 함)
      console.log("⚠️ [Aside] main 페이지 없음, 다른 페이지들 존재", {
        pagesLength: currentState.pages.length,
      });
      setPages(newPages);
    }
  }, [
    mainContent, // mainContent 변경을 직접 추적
    mainPageContent, // mainPageContent도 의존성에 포함 (렌더링 보장)
    setPages,
    pathname,
    isMounted,
    // mainContent와 pathname의 실제 변경을 ref로 추적하므로
    // 의존성 배열에 포함하되, ref를 통해 중복 실행 방지
  ]);

  // pathname 변경 후 pages가 main 페이지만 있을 때 currentIndex를 0으로 설정
  // goBack처럼 pages와 currentIndex를 동시에 설정해야 작동함
  React.useEffect(() => {
    // 마운트 전에는 실행하지 않음
    if (!isMounted) return;

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
  }, [pages, isMounted]);

  // 초기 마운트 시 pages가 비어있고 mainPageContent가 있으면 fallback 렌더링
  const shouldShowFallback = pages.length === 0 && !!mainPageContent;

  // 렌더링 상태 로깅
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🎨 [Aside] 렌더링 상태", {
        pagesLength: pages.length,
        currentIndex,
        hasMainPageContent: !!mainPageContent,
        pathname,
        shouldShowFallback,
        pages: pages.map((p) => ({
          id: p.id,
          hasContent: !!p.content,
          contentType: p.content
            ? React.isValidElement(p.content)
              ? (p.content as React.ReactElement).type
              : typeof p.content
            : null,
        })),
      });
    }
  }, [pages, currentIndex, mainPageContent, pathname, shouldShowFallback]);

  // ✅ isMounted가 false일 때(서버 사이드 or 첫 렌더링)는 fallback UI 반환
  // 이렇게 하면 Hydration 단계까지는 서버 HTML과 똑같은 구조를 유지합니다.
  if (!isMounted) {
    return (
      <aside className="C013">
        <div className="C089" />
      </aside>
    );
  }

  return (
    <aside className="C013">
      <div className="C089">
        {shouldShowFallback ? (
          <div
            className="C073"
            style={{ transform: "translateX(0%)", zIndex: 1 }}
          >
            {mainPageContent}
          </div>
        ) : pages.length > 0 ? (
          pages.map((page, index) => {
            console.log("📄 [Aside] 페이지 렌더링", {
              pageId: page.id,
              index,
              offset: index - currentIndex,
              isCurrent: index === currentIndex,
            });
            const offset = index - currentIndex;
            const contentType =
              page.content && React.isValidElement(page.content)
                ? (page.content as React.ReactElement<unknown>).type
                : null;
            const contentDisplayName =
              contentType &&
              typeof contentType === "object" &&
              "displayName" in contentType
                ? (contentType as { displayName?: string }).displayName
                : contentType && typeof contentType === "function"
                ? contentType.name
                : null;

            const isSlidePageComponent =
              React.isValidElement(page.content) &&
              (contentType === SlidePage ||
                (typeof contentType === "function" &&
                  (contentDisplayName === "DoctorSlidePage" ||
                    contentDisplayName === "EmployeeSlidePage" ||
                    contentDisplayName === "CounselorSlidePage" ||
                    contentDisplayName === "CustomerReferenceSlide" ||
                    contentDisplayName === "MyNotesSlide" ||
                    contentDisplayName === "MyAlarmsSlide")));

            console.log("🔍 [Aside] 페이지 컴포넌트 체크", {
              pageId: page.id,
              contentType:
                contentType?.name ||
                contentType?.displayName ||
                typeof contentType,
              contentDisplayName,
              isSlidePageComponent,
              isValidElement: React.isValidElement(page.content),
            });

            if (isSlidePageComponent) {
              const clonedElement = React.cloneElement(
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
              console.log("✅ [Aside] SlidePage 컴포넌트 cloneElement", {
                pageId: page.id,
                transform: `translateX(${offset * 100}%)`,
                zIndex: pages.length - index,
                showBackButton: index > 0,
              });
              return clonedElement;
            }

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
          })
        ) : null}
      </div>

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
