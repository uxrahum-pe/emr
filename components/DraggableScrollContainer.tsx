"use client";

import { useEffect, useRef } from "react";
import { DraggableScrollContainerProps } from "@/types/ui";

export default function DraggableScrollContainer({
  children,
  className = "",
  scrollSpeed = 2,
  scrollToEnd = true,
  onDragStart,
  onDragEnd,
}: DraggableScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 오른쪽 끝으로 스크롤
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !scrollToEnd) return;

    const scrollToRight = () => {
      if (element) {
        const maxScroll = element.scrollWidth - element.clientWidth;
        if (maxScroll > 0) {
          element.scrollLeft = maxScroll;
        }
      }
    };

    // 여러 번 시도하여 DOM이 완전히 렌더링된 후 스크롤
    // requestAnimationFrame을 사용하여 브라우저가 레이아웃을 완료한 후 실행
    const rafId = requestAnimationFrame(() => {
      setTimeout(scrollToRight, 0);
      setTimeout(scrollToRight, 50);
      setTimeout(scrollToRight, 100);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [scrollToEnd]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let hasDragged = false;
    let startY: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      hasDragged = false;
      element.classList.add("isDragging");
      startX = e.pageX - element.offsetLeft;
      startY = e.pageY - element.offsetTop;
      scrollLeft = element.scrollLeft;
      onDragStart?.(e);
    };

    const handleMouseLeave = () => {
      if (isDown) {
        onDragEnd?.();
      }
      isDown = false;
      hasDragged = false;
      element.classList.remove("isDragging");
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDown) {
        onDragEnd?.();
      }

      // 드래그가 발생했다면 클릭 이벤트를 막기
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        // 클릭 이벤트가 발생하지 않도록 짧은 시간 동안 클릭을 막음
        const clickHandler = (clickE: MouseEvent) => {
          clickE.preventDefault();
          clickE.stopPropagation();
          element.removeEventListener("click", clickHandler, true);
        };
        element.addEventListener("click", clickHandler, true);
        setTimeout(() => {
          element.removeEventListener("click", clickHandler, true);
        }, 100);
      }

      isDown = false;
      hasDragged = false;
      element.classList.remove("isDragging");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;

      const x = e.pageX - element.offsetLeft;
      const y = e.pageY - element.offsetTop;
      const deltaX = Math.abs(x - startX);
      const deltaY = Math.abs(y - startY);

      // 마우스가 일정 거리 이상 이동했다면 드래그로 간주
      if (deltaX > 5 || deltaY > 5) {
        hasDragged = true;
        e.preventDefault();
        const walk = (x - startX) * scrollSpeed;
        element.scrollLeft = scrollLeft - walk;
      }
    };

    element.addEventListener("mousedown", handleMouseDown as EventListener);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mousemove", handleMouseMove as EventListener);

    return () => {
      element.removeEventListener(
        "mousedown",
        handleMouseDown as EventListener
      );
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener(
        "mousemove",
        handleMouseMove as EventListener
      );
      element.classList.remove("isDragging");
    };
  }, [scrollSpeed, onDragStart, onDragEnd]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
