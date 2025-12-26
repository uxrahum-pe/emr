/**
 * NoteClickHandler Component
 *
 * @description PageHeader의 C018.isNote 버튼 클릭 시 "내 쪽지 보기" 페이지를 표시하는 핸들러를 생성합니다.
 *
 * @component
 * @example
 * ```tsx
 * <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
 * ```
 *
 * @remarks
 * - Aside 내부에 렌더링되어야 useAside 훅을 사용할 수 있습니다.
 * - 핸들러는 한 번만 등록되며, 애니메이션 중에는 클릭을 무시합니다.
 * - 함수형 업데이트를 사용하여 최신 상태를 보장합니다.
 */

"use client";

import { useEffect, useRef } from "react";
import { useAside } from "@/components/AsideContext";
import MyNotesSlide from "@/components/slides/MyNotesSlide";
import type { NoteClickHandlerProps } from "@/types/reception";

export default function NoteClickHandler({
  onHandlerReady,
}: NoteClickHandlerProps) {
  const { navigateToPage, isAnimating } = useAside();
  const navigateToPageRef = useRef(navigateToPage);
  const onHandlerReadyRef = useRef(onHandlerReady);
  const isAnimatingRef = useRef(isAnimating);

  // ref 업데이트 (항상 최신 값 유지)
  useEffect(() => {
    navigateToPageRef.current = navigateToPage;
    onHandlerReadyRef.current = onHandlerReady;
    isAnimatingRef.current = isAnimating;
  }, [navigateToPage, onHandlerReady, isAnimating]);

  // 핸들러 등록 (페이지 전환 시 재등록 가능하도록)
  useEffect(() => {
    const handler = () => {
      // 애니메이션 중이면 무시
      if (isAnimatingRef.current) {
        return;
      }
      navigateToPageRef.current("my-notes", <MyNotesSlide />);
    };
    // 다음 틱에 등록하여 무한 루프 방지 및 렌더링 완료 후 실행
    // 컴포넌트가 완전히 마운트된 후에만 등록
    const timeoutId = setTimeout(() => {
      if (onHandlerReadyRef.current) {
        onHandlerReadyRef.current(handler);
      }
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onHandlerReady]); // onHandlerReady가 준비된 후에만 실행

  return null;
}
