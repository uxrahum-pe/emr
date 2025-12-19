"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { modalStack } from "@/lib/modal-stack";

export interface MiniPopupProps {
  /** 팝업 내용 */
  children: ReactNode;
  /** 팝업이 열려있는지 여부 */
  isOpen: boolean;
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
  /** 트리거 요소의 클릭 이벤트 (마우스 위치 계산용) */
  triggerEvent?: MouseEvent | null;
}

/**
 * 미니 팝업 컴포넌트
 * 클릭한 위치의 우측 하단에 표시되며, 화면을 벗어나지 않도록 자동 조정됩니다.
 */
export default function MiniPopup({
  children,
  isOpen,
  onClose,
  triggerEvent,
}: MiniPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  const closeHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC 키 처리를 위한 modalStack 관리
  useEffect(() => {
    if (isOpen) {
      // 모달 스택에 추가
      closeHandlerRef.current = onClose;
      modalStack.push(onClose);
      return () => {
        // 모달 스택에서 제거
        if (closeHandlerRef.current) {
          modalStack.remove(closeHandlerRef.current);
          closeHandlerRef.current = null;
        }
      };
    } else {
      // 닫을 때 모달 스택에서 제거
      if (closeHandlerRef.current) {
        modalStack.remove(closeHandlerRef.current);
        closeHandlerRef.current = null;
      }
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !triggerEvent || !mounted) return;

    // 초기 위치를 클릭 지점 기준으로 설정 (렌더링 전에)
    const offsetX = 25;
    const offsetY = 25;
    setPosition({
      top: triggerEvent.clientY + offsetY,
      left: triggerEvent.clientX + offsetX,
    });

    const updatePosition = () => {
      if (!popupRef.current) return;

      const popupRect = popupRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 실제 DOM 크기 사용
      const popupWidth = popupRect.width;
      const popupHeight = popupRect.height;

      // size-20 여백 계산 (breakpoint 기준)
      const breakpoint = 1920;
      const margin = (window.innerWidth * 20) / breakpoint;

      // 클릭한 위치 기준 우측 하단으로 오프셋
      const offsetX = 25; // 20~30 사이의 값
      const offsetY = 25;

      // 우측 하단 위치 계산 (클릭 지점 + 오프셋)
      let left = triggerEvent.clientX + offsetX;
      let top = triggerEvent.clientY + offsetY;

      // 화면 경계를 벗어나면 경계선에 맞춤 (size-20 여백 고려)
      if (left + popupWidth + margin > viewportWidth) {
        left = viewportWidth - popupWidth - margin;
      }
      if (left < margin) {
        left = margin;
      }

      if (top + popupHeight + margin > viewportHeight) {
        top = viewportHeight - popupHeight - margin;
      }
      if (top < margin) {
        top = margin;
      }

      setPosition({ top, left });
    };

    // DOM 렌더링 완료 후 위치 재계산
    const rafId = requestAnimationFrame(() => {
      const timeoutId = setTimeout(updatePosition, 0);
      return () => clearTimeout(timeoutId);
    });

    // 리사이즈 시 위치 재계산
    window.addEventListener("resize", updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerEvent, mounted]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div className="C062" onClick={onClose}></div>
      <div
        ref={popupRef}
        className="C063"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: "var(--size-410)",
          height: "fit-content",
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
}
