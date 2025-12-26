"use client";

/**
 * 팝업 헤더 컴포넌트
 *
 * @description 팝업의 상단 헤더 영역 (제목 + 닫기 버튼)을 제공하는 공통 컴포넌트
 * @component
 */
export interface PopupHeaderProps {
  /** 팝업 제목 */
  title: string;
  /** 닫기 버튼 클릭 핸들러 */
  onClose: () => void;
  /** 헤더 영역의 X 좌표 (기본값: 260) */
  x?: number;
  /** 헤더 영역의 Y 좌표 (기본값: 20) */
  y?: number;
  /** 헤더 영역의 너비 (기본값: 1400) */
  width?: number;
}

export default function PopupHeader({
  title,
  onClose,
  x = 260,
  y = 20,
  width = 1400,
}: PopupHeaderProps) {
  return (
    <div className="C180">
      <p className="T076">{title}</p>
      <div className="C181 isCloseButton" onClick={onClose}>
        <div className="C179 isDepth1"></div>
        <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
      </div>
    </div>
  );
}
