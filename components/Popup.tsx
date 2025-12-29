"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { modalStack } from "@/lib/modal-stack";

import type { PopupProps } from "@/types/ui";

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
    let openFrame1: number | null = null;
    let openFrame2: number | null = null;
    let closeFrame: number | null = null;
    let closeTimer: number | null = null;

    if (isOpen) {
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

      // 1프레임째: DOM 추가 (isOpened=false 상태)
      openFrame1 = requestAnimationFrame(() => {
        setIsVisible(true);
        // 2프레임째: isOpened=true 부여 → 트랜지션 시작
        openFrame2 = requestAnimationFrame(() => {
          setIsOpened(true);
        });
      });

      return () => {
        if (openFrame1 !== null) cancelAnimationFrame(openFrame1);
        if (openFrame2 !== null) cancelAnimationFrame(openFrame2);
        // isOpened를 false로 설정 (cleanup 시)
        setIsOpened(false);
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
      // 닫을 때: 다음 프레임에 isOpened 제거 후, 트랜지션 끝나면 DOM 제거
      closeFrame = requestAnimationFrame(() => {
        setIsOpened(false);
        closeTimer = window.setTimeout(() => {
          setIsVisible(false);
        }, 300);
      });

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

      return () => {
        if (closeFrame !== null) cancelAnimationFrame(closeFrame);
        if (closeTimer !== null) clearTimeout(closeTimer);
        // 타이머가 취소되더라도 isOpened는 false로 유지
        setIsOpened(false);
      };
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
