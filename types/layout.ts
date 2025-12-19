/**
 * Layout 관련 타입 정의
 *
 * @description 레이아웃 컴포넌트에서 사용되는 타입들을 중앙화하여 관리합니다.
 * AI가 코드를 이해할 때 이 파일을 참조하면 레이아웃 구조를 빠르게 파악할 수 있습니다.
 */

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
