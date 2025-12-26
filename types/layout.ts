/**
 * Layout 관련 타입 정의
 *
 * @description 레이아웃 컴포넌트에서 사용되는 타입들을 중앙화하여 관리합니다.
 * AI가 코드를 이해할 때 이 파일을 참조하면 레이아웃 구조를 빠르게 파악할 수 있습니다.
 */

import type { AsidePage } from "@/stores/useAsideStore";

/**
 * SimplePageLayout 컴포넌트 Props
 *
 * @description 간단한 페이지들을 위한 공통 레이아웃 컴포넌트의 Props입니다.
 */
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
 * Aside 컴포넌트 Props
 */
export interface AsideProps {
  /** 메인 콘텐츠 (함수 또는 ReactNode) */
  mainContent?: React.ReactNode | (() => React.ReactNode);
  /** 페이지 네비게이션 콜백 */
  onNavigate?: (pageId: string) => void;
  /** 자식 컴포넌트들 */
  children?: React.ReactNode;
}

/**
 * AsideInner 컴포넌트 Props
 * @internal
 */
export interface AsideInnerProps {
  /** 메인 콘텐츠 (함수 또는 ReactNode) */
  mainContent?: React.ReactNode | (() => React.ReactNode);
  /** 페이지 스택 */
  pages: AsidePage[];
  /** 현재 페이지 인덱스 */
  currentIndex: number;
  /** 뒤로 가기 핸들러 */
  goBack: () => void;
}

// AsidePage 타입 re-export (useAsideStore에서 정의됨)
export type { AsidePage };
