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

import { ReactNode, useEffect, memo } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import WeeklyCalendar from "./WeeklyCalendar";
import { AsideProvider } from "./AsideContext";
import SlidePage from "./SlidePage";
import { useAsideStore, type AsidePage } from "@/stores/useAsideStore";

/**
 * Aside 컴포넌트 Props
 */
interface AsideProps {
  /** 메인 콘텐츠 (함수 또는 ReactNode) */
  mainContent?: ReactNode | (() => ReactNode);
  /** 페이지 네비게이션 콜백 */
  onNavigate?: (pageId: string) => void;
  /** 자식 컴포넌트들 */
  children?: ReactNode;
}

function Aside({ mainContent, onNavigate, children }: AsideProps) {
  // Zustand 스토어에서 상태와 액션 가져오기
  const pages = useAsideStore((state) => state.pages);
  const currentIndex = useAsideStore((state) => state.currentIndex);
  const isAnimating = useAsideStore((state) => state.isAnimating);
  const navigateToPage = useAsideStore((state) => state.navigateToPage);
  const resetToMain = useAsideStore((state) => state.resetToMain);
  const goBack = useAsideStore((state) => state.goBack);

  // onNavigate 콜백을 Zustand 스토어의 currentPageId와 동기화 (선택적)
  useEffect(() => {
    if (onNavigate) {
      const unsubscribe = useAsideStore.subscribe(
        (state) => state.currentPageId,
        (currentPageId) => {
          if (currentPageId) {
            onNavigate(currentPageId);
          } else {
            onNavigate("main");
          }
        }
      );
      return unsubscribe;
    }
  }, [onNavigate]);

  return (
    <AsideProvider>
      <AsideInner
        mainContent={mainContent}
        pages={pages}
        currentIndex={currentIndex}
        isAnimating={isAnimating}
        goBack={goBack}
        resetToMain={resetToMain}
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
 *
 * @component
 * @internal
 */
interface AsideInnerProps {
  mainContent?: ReactNode | (() => ReactNode);
  pages: AsidePage[];
  currentIndex: number;
  isAnimating: boolean;
  goBack: () => void;
  resetToMain: () => void;
}

const AsideInner = memo(function AsideInner({
  mainContent,
  pages,
  currentIndex,
  isAnimating,
  goBack,
  resetToMain,
}: AsideInnerProps) {
  const setPages = useAsideStore((state) => state.setPages);
  // 현재 경로 확인 (대시보드는 /)
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  // Render mainContent inside provider to access useAside
  // mainContent가 변경될 때마다 재계산되도록 useMemo 사용
  const mainPageContent = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;

    // 대시보드 경로이거나 content가 null이면 대시보드용 빈 C073 반환 (SlidePage로 감싸지 않음)
    if (isDashboard || content === null) {
      return <div className="C073"></div>;
    }

    // 원무 페이지용 레이아웃
    return (
      <>
        <WeeklyCalendar />
        <div className="C070">
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
  }, [mainContent, isDashboard]);

  // 대시보드용 C073인지 확인하는 함수
  const isDashboardC073 = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;
    return isDashboard || content === null;
  }, [mainContent, isDashboard]);

  // Initialize and update main page when mainContent changes
  React.useEffect(() => {
    setPages((prev) => {
      const mainPageIndex = prev.findIndex((page) => page.id === "main");
      if (mainPageIndex !== -1) {
        // 메인 페이지가 이미 있으면 업데이트
        const newPages = [...prev];
        newPages[mainPageIndex] = {
          ...newPages[mainPageIndex],
          content: mainPageContent,
        };
        return newPages;
      } else {
        // 메인 페이지가 없으면 생성
        return [
          {
            id: "main",
            content: mainPageContent,
          },
        ];
      }
    });
  }, [mainPageContent, setPages]);

  return (
    <aside className="C013">
      <div className="C089">
        {pages.map((page, index) => {
          const offset = index - currentIndex;
          // page.content가 React 요소인지 확인하고, SlidePage 계열 컴포넌트인지 체크
          const isSlidePageComponent =
            React.isValidElement(page.content) &&
            (page.content.type === SlidePage ||
              (typeof page.content.type === "function" &&
                (page.content.type.name === "DoctorSlidePage" ||
                  page.content.type.name === "EmployeeSlidePage" ||
                  page.content.type.name === "CounselorSlidePage")));

          if (isSlidePageComponent) {
            // SlidePage 계열 컴포넌트면 props를 전달하여 clone
            return React.cloneElement(
              page.content as React.ReactElement<any>,
              {
                key: page.id,
                transform: `translateX(${offset * 100}%)`,
                zIndex: pages.length - index,
                onGoBack: goBack,
                showBackButton: index > 0,
              } as any
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
        })}
      </div>
    </aside>
  );
});

export default memo(Aside);
