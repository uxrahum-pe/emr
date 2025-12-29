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
  /** 현재 페이지 인덱스 */
  currentIndex: number;
  /** 뒤로 가기 핸들러 */
  goBack: () => void;
}

/**
 * Aside에서 전달하는 SlidePage Props
 */
export interface AsideSlidePageProps {
  /** Transform 스타일 */
  transform: string;
  /** Z-index */
  zIndex: number;
  /** 뒤로 가기 핸들러 */
  onGoBack: () => void;
  /** 뒤로 가기 버튼 표시 여부 */
  showBackButton: boolean;
}

/**
 * 이미 SlidePage로 감싸진 pageId 목록
 * Production 빌드에서 minification으로 컴포넌트 이름이 변경되므로
 * pageId 기반으로 감지하는 것이 더 안정적
 */
export const PRE_WRAPPED_SLIDE_PAGE_IDS = [
  "my-alarms",
  "my-notes",
  "customer",
  "doctor",
  "counselor",
  "employee",
  "manager",
  "assistant",
  "team-leader",
  "clerk",
] as const;

/**
 * 페이지 경로 타입
 */
export type PagePath =
  | "/"
  | "/reception"
  | "/counseling"
  | "/pre-care"
  | "/clinic"
  | "/surgery"
  | "/procedure"
  | "/post-care"
  | "/statistics";

/**
 * 페이지 경로별 플래그 타입
 */
export interface PagePathFlags {
  isDashboard: boolean;
  isReception: boolean;
  isCounseling: boolean;
  isPreCare: boolean;
  isClinic: boolean;
  isSurgery: boolean;
  isProcedure: boolean;
  isPostCare: boolean;
  isStatistics: boolean;
}

// AsidePage 타입 re-export (useAsideStore에서 정의됨)
export type { AsidePage };
