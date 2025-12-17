"use client";

import { useEffect, useState } from "react";

interface ReceptionCheckInButtonProps {
  /** 고객 상세 패널(모달) 열림 여부 */
  isOpen: boolean;
  /** 퀵액션(C100) hover 여부에 따른 접힘 상태 */
  isFolded?: boolean;
}

/**
 * 원무 화면 우측 하단 접수 버튼 (C152)
 * - C096(고객 상세 패널)과 비슷하게 마운트/언마운트 + isOpened 애니메이션 관리
 */
export default function ReceptionCheckInButton({
  isOpen,
  isFolded = false,
}: ReceptionCheckInButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    let openFrame1: number | null = null;
    let openFrame2: number | null = null;
    let closeFrame: number | null = null;
    let closeTimer: number | null = null;

    if (isOpen) {
      // 1프레임째: DOM 추가 (isOpened=false 상태)
      openFrame1 = requestAnimationFrame(() => {
        setIsVisible(true);
        // 2프레임째: isOpened=true 부여 → 트랜지션 시작
        openFrame2 = requestAnimationFrame(() => {
          setIsOpened(true);
        });
      });
    } else {
      // 닫힐 때: 다음 프레임에 isOpened 제거 후, 트랜지션 끝나면 DOM 제거
      closeFrame = requestAnimationFrame(() => {
        setIsOpened(false);
        closeTimer = window.setTimeout(() => {
          setIsVisible(false);
        }, 300);
      });
    }

    return () => {
      if (openFrame1 !== null) cancelAnimationFrame(openFrame1);
      if (openFrame2 !== null) cancelAnimationFrame(openFrame2);
      if (closeFrame !== null) cancelAnimationFrame(closeFrame);
      if (closeTimer !== null) clearTimeout(closeTimer);
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <section
      className={`C152 ${isOpened ? "isOpened" : ""} ${
        isFolded ? "isFolded" : ""
      }`.trim()}
    >
      <div className="C153">
        <div className="C154 styleSheet isIcon isCheckIn"></div>
        <div className="C155">
          <p className="T068">접수하기</p>
        </div>
      </div>
    </section>
  );
}
