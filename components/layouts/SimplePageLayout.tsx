/**
 * SimplePageLayout Component
 *
 * @description 간단한 페이지들을 위한 공통 레이아웃 컴포넌트입니다.
 * Sidebar와 기본 페이지 구조를 제공합니다.
 *
 * @component
 * @example
 * ```tsx
 * <SimplePageLayout
 *   title="상담"
 *   subtitle="환자 상담 관리"
 *   containerClassName="counseling-container"
 * >
 *   <div className="counseling-card">
 *     <h2>상담 관리</h2>
 *     <p>환자 상담 내역을 관리합니다.</p>
 *   </div>
 * </SimplePageLayout>
 * ```
 *
 * @remarks
 * - Sidebar를 자동으로 포함합니다.
 * - 일관된 페이지 구조를 제공합니다.
 * - CSS 클래스명을 props로 받아 커스터마이징 가능합니다.
 */

"use client";

import Sidebar from "@/components/Sidebar";

export interface SimplePageLayoutProps {
  /** 페이지 제목 */
  title: string;
  /** 페이지 부제목 */
  subtitle: string;
  /** 컨테이너 CSS 클래스명 */
  containerClassName: string;
  /** 헤더 CSS 클래스명 (기본값: {containerClassName}-header) */
  headerClassName?: string;
  /** 콘텐츠 CSS 클래스명 (기본값: {containerClassName}-content) */
  contentClassName?: string;
  /** 제목 CSS 클래스명 (기본값: {containerClassName}-title) */
  titleClassName?: string;
  /** 부제목 CSS 클래스명 (기본값: {containerClassName}-subtitle) */
  subtitleClassName?: string;
  /** 자식 요소 */
  children: React.ReactNode;
}

/**
 * SimplePageLayout 컴포넌트
 */
export default function SimplePageLayout({
  title,
  subtitle,
  containerClassName,
  headerClassName,
  contentClassName,
  titleClassName,
  subtitleClassName,
  children,
}: SimplePageLayoutProps) {
  const defaultHeaderClassName =
    headerClassName || `${containerClassName}-header`;
  const defaultContentClassName =
    contentClassName || `${containerClassName}-content`;
  const defaultTitleClassName = titleClassName || `${containerClassName}-title`;
  const defaultSubtitleClassName =
    subtitleClassName || `${containerClassName}-subtitle`;

  return (
    <>
      <Sidebar />
      <div className={containerClassName}>
        <div className={defaultHeaderClassName}>
          <h1 className={defaultTitleClassName}>{title}</h1>
          <p className={defaultSubtitleClassName}>{subtitle}</p>
        </div>
        <div className={defaultContentClassName}>{children}</div>
      </div>
    </>
  );
}
