"use client";

import { useEffect, useState, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { modalStack } from "@/lib/modal-stack";

export interface PopupProps {
  /** 팝업 열림 상태 */
  isOpen: boolean;
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
  /** 팝업 내용 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 대형 팝업 컴포넌트 (C176)
 * C009 클릭 시 사용되는 기본 팝업 틀
 */
export default function Popup({
  isOpen,
  onClose,
  children,
  className = "",
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCloseRef = useRef(onClose);

  // onClose ref 업데이트 (항상 최신 값 유지)
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // 컴포넌트가 나타나면 바로 렌더링
      setIsVisible(true);
      // 모달 스택에 추가
      const closeHandler = () => {
        onCloseRef.current();
      };
      closeHandlerRef.current = closeHandler;
      modalStack.push(closeHandler);

      // body 스크롤 막기
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // 스크롤바 너비 계산 (스크롤바가 사라져도 레이아웃 시프트 방지)
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // 브라우저가 초기 상태를 인식한 후 애니메이션 트리거
      const timer = setTimeout(() => {
        setIsOpened(true);
      }, 10);

      return () => {
        clearTimeout(timer);
        // 모달 스택에서 제거
        if (closeHandlerRef.current) {
          modalStack.remove(closeHandlerRef.current);
          closeHandlerRef.current = null;
        }

        // 다른 모달이 열려있지 않으면 스크롤 복원
        if (modalStack.isEmpty()) {
          document.body.style.overflow = originalOverflow;
          document.body.style.paddingRight = originalPaddingRight;
        }
      };
    } else {
      // 닫을 때: isOpened 제거 후 0.3초 뒤 컴포넌트 제거
      setIsOpened(false);
      // 모달 스택에서 제거
      if (closeHandlerRef.current) {
        modalStack.remove(closeHandlerRef.current);
        closeHandlerRef.current = null;
      }

      // 다른 모달이 열려있지 않으면 스크롤 복원
      if (modalStack.isEmpty()) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // onClose는 ref로 처리하므로 의존성에서 제거

  if (!mounted || !isVisible) return null;

  const popupClassName = `C176 ${
    isOpened ? "isOpened" : ""
  } ${className}`.trim();

  return createPortal(
    <div className={popupClassName}>
      <div className="C177">{children}</div>
    </div>,
    document.body
  );
}
