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

import {
  useState,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import React from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import { AsideProvider } from "./AsideContext";
import SlidePage from "./SlidePage";

/**
 * Aside 페이지 인터페이스
 *
 * @description Aside에서 관리하는 각 페이지의 정보를 담는 타입입니다.
 */
interface AsidePage {
  /** 페이지 고유 ID (pageId-timestamp 형식) */
  id: string;
  /** 페이지 콘텐츠 (ReactNode) */
  content: ReactNode;
}

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
  const [pages, setPages] = useState<AsidePage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * 페이지로 네비게이션하는 함수
   *
   * @description 동일한 pageId의 페이지가 이미 열려있으면 해당 페이지로 이동하고,
   * 그 이후의 페이지들은 제거합니다. 새로운 pageId면 스택에 추가합니다.
   *
   * @param pageId - 페이지 식별자 (예: "my-notes", "counselor", "doctor")
   * @param content - 페이지 콘텐츠 (ReactNode)
   *
   * @remarks
   * - 함수형 업데이트를 사용하여 항상 최신 pages 상태를 확인합니다.
   * - 애니메이션 중에는 새로운 네비게이션을 무시합니다.
   * - "main" 페이지는 중복 체크에서 제외됩니다.
   */
  const navigateToPage = useCallback(
    (pageId: string, content: ReactNode) => {
      if (isAnimating) return;
      setIsAnimating(true);

      // 함수형 업데이트를 사용하여 항상 최신 pages 상태를 확인
      setPages((prev) => {
        // 동일 분류의 페이지가 이미 열려있는지 확인
        // pageId 형식: "employee-kms002" -> 실제 id: "employee-kms002-1234567890"
        // pageId로 시작하는 페이지를 찾음
        const existingPageIndex = prev.findIndex((page) => {
          // page.id가 pageId로 시작하는지 확인 (타임스탬프 제외)
          // "main" 페이지는 제외
          if (page.id === "main") return false;
          return page.id.startsWith(`${pageId}-`) || page.id === pageId;
        });

        if (existingPageIndex !== -1) {
          // 동일 분류의 페이지가 이미 열려있으면 해당 페이지로 이동하고 내용만 업데이트
          // 그리고 그 이후의 페이지들은 모두 제거 (스택에서 제거)
          const newPages = prev.slice(0, existingPageIndex + 1);
          newPages[existingPageIndex] = {
            id: newPages[existingPageIndex].id,
            content,
          };
          setCurrentIndex(existingPageIndex);
          setTimeout(() => {
            onNavigate?.(pageId);
            setIsAnimating(false);
          }, 300);
          return newPages;
        } else {
          // 새로운 분류면 기존처럼 새 페이지 추가
          const newPage: AsidePage = { id: `${pageId}-${Date.now()}`, content };
          const newPages = [...prev, newPage];
          setCurrentIndex(newPages.length - 1);
          setTimeout(() => {
            onNavigate?.(pageId);
            setIsAnimating(false);
          }, 300);
          return newPages;
        }
      });
    },
    [isAnimating, onNavigate]
  );

  /**
   * 이전 페이지로 돌아가는 함수
   *
   * @description 현재 페이지를 스택에서 제거하고 이전 페이지로 이동합니다.
   *
   * @remarks
   * - 애니메이션 중이거나 첫 페이지면 동작하지 않습니다.
   * - 함수형 업데이트를 사용하여 최신 상태를 보장합니다.
   */
  const goBack = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setPages((prev) => {
        const newIndex = prev.length - 2; // 현재 페이지 제거 후 인덱스
        const newPages = prev.slice(0, -1);

        // 이전 페이지의 pageId를 저장
        let prevPageId: string | null = null;
        if (
          newPages.length > 0 &&
          newIndex >= 0 &&
          newIndex < newPages.length
        ) {
          prevPageId = newPages[newIndex].id.split("-")[0];
        } else {
          prevPageId = "main";
        }

        setCurrentIndex(newIndex);

        // setPages 콜백 밖에서 onNavigate 호출
        setTimeout(() => {
          if (prevPageId) {
            onNavigate?.(prevPageId);
          }
          setIsAnimating(false);
        }, 300);

        return newPages;
      });
    }
  }, [currentIndex, isAnimating, onNavigate]);

  /**
   * 메인 페이지로 리셋하는 함수
   *
   * @description 모든 페이지를 제거하고 메인 페이지만 남깁니다.
   *
   * @remarks
   * - 애니메이션 중이면 동작하지 않습니다.
   * - 함수형 업데이트를 사용하여 최신 상태를 보장합니다.
   */
  const resetToMain = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(0);
    setTimeout(() => {
      // main 페이지만 남기고 나머지 제거
      setPages((prev) => {
        const mainPage = prev.find((page) => page.id === "main");
        return mainPage ? [mainPage] : prev;
      });
      // setPages 콜백 밖에서 onNavigate 호출
      setTimeout(() => {
        onNavigate?.("main");
        setIsAnimating(false);
      }, 0);
    }, 300);
  }, [isAnimating, onNavigate]);

  return (
    <AsideProvider
      navigateToPage={navigateToPage}
      resetToMain={resetToMain}
      isAnimating={isAnimating}
    >
      <AsideInner
        mainContent={mainContent}
        pages={pages}
        setPages={setPages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
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
  setPages: React.Dispatch<React.SetStateAction<AsidePage[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  goBack: () => void;
  resetToMain: () => void;
}

const AsideInner = memo(function AsideInner({
  mainContent,
  pages,
  setPages,
  currentIndex,
  setCurrentIndex,
  isAnimating,
  setIsAnimating,
  goBack,
  resetToMain,
}: AsideInnerProps) {
  // Render mainContent inside provider to access useAside
  const MainPageContent = () => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;
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
  };

  // Initialize main page
  React.useEffect(() => {
    if (pages.length === 0) {
      setPages([
        {
          id: "main",
          content: <MainPageContent />,
        },
      ]);
    }
  }, [mainContent, pages.length]);

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
