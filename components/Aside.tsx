"use client";

import { useState, ReactNode, useRef, useEffect } from "react";
import React from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import { AsideProvider } from "./AsideContext";
import SlidePage from "./SlidePage";

interface AsidePage {
  id: string;
  content: ReactNode;
}

interface AsideProps {
  mainContent?: ReactNode | (() => ReactNode);
  onNavigate?: (pageId: string) => void;
}

export default function Aside({
  mainContent,
  onNavigate,
  children,
}: AsideProps & { children?: ReactNode }) {
  const [pages, setPages] = useState<AsidePage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigateToPage = (pageId: string, content: ReactNode) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // 동일 분류의 페이지가 이미 열려있는지 확인
    // pageId 형식: "employee-kms002" -> 실제 id: "employee-kms002-1234567890"
    // pageId로 시작하는 페이지를 찾음
    const existingPageIndex = pages.findIndex((page) => {
      // page.id가 pageId로 시작하는지 확인 (타임스탬프 제외)
      return page.id.startsWith(`${pageId}-`);
    });
    
    if (existingPageIndex !== -1) {
      // 동일 분류의 페이지가 이미 열려있으면 해당 페이지로 이동하고 내용만 업데이트
      setPages((prev) => {
        const newPages = [...prev];
        newPages[existingPageIndex] = { 
          id: newPages[existingPageIndex].id, 
          content,
        };
        return newPages;
      });
      setCurrentIndex(existingPageIndex);
      onNavigate?.(pageId);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      // 새로운 분류면 기존처럼 새 페이지 추가
      const newPage: AsidePage = { id: `${pageId}-${Date.now()}`, content };
      setPages((prev) => [...prev, newPage]);
      setCurrentIndex((prev) => prev + 1);
      onNavigate?.(pageId);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const goBack = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => {
        setPages((prev) => prev.slice(0, -1));
        setIsAnimating(false);
      }, 300);
    }
  };

  const resetToMain = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(0);
    setTimeout(() => {
      // main 페이지만 남기고 나머지 제거
      setPages((prev) => {
        const mainPage = prev.find((page) => page.id === "main");
        return mainPage ? [mainPage] : prev;
      });
      setIsAnimating(false);
    }, 300);
  };

  return (
    <AsideProvider navigateToPage={navigateToPage} resetToMain={resetToMain}>
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

function AsideInner({ 
  mainContent, 
  pages, 
  setPages, 
  currentIndex, 
  setCurrentIndex, 
  isAnimating, 
  setIsAnimating, 
  goBack,
  resetToMain,
}: { 
  mainContent?: ReactNode | (() => ReactNode);
  pages: AsidePage[];
  setPages: React.Dispatch<React.SetStateAction<AsidePage[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  goBack: () => void;
  resetToMain: () => void;
}) {
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
}
