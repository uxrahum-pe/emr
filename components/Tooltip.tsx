"use client";

import {
  useState,
  useRef,
  useEffect,
  ReactElement,
  cloneElement,
  isValidElement,
  HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { TipState, TooltipProps } from "@/types/ui";

export default function Tooltip(props: TooltipProps) {
  const { text, children, className, style } = props;
  const hasOffset = "offsetX" in props && "offsetY" in props;
  const finalOffsetX = hasOffset ? props.offsetX : 16;
  const finalOffsetY = hasOffset ? props.offsetY : 16;
  const [tip, setTip] = useState<TipState>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const [mounted, setMounted] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const throttleDelay = 16; // ~60fps

  useEffect(() => {
    setMounted(true);
  }, []);

  const showTip = (e?: React.MouseEvent) => {
    if (e) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setTip({
        visible: true,
        text,
        x: rect.right + finalOffsetX,
        y: rect.top + finalOffsetY,
      });
    } else {
      setTip((prev) => ({ ...prev, visible: true, text }));
    }
  };

  const moveTip = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTimeRef.current < throttleDelay) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        moveTip(e);
      });
      return;
    }
    lastMoveTimeRef.current = now;

    // 마우스 커서를 따라다니도록
    setTip((prev) => ({
      ...prev,
      visible: true,
      x: e.clientX + finalOffsetX,
      y: e.clientY + finalOffsetY,
    }));
  };

  const hideTip = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setTip((prev) => ({ ...prev, visible: false }));
  };

  // children이 React 요소인 경우 직접 이벤트 핸들러를 추가
  if (isValidElement(children)) {
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;
    const existingClassName = (child.props as any)?.className || "";
    const existingStyle = (child.props as any)?.style || {};

    return (
      <>
        {cloneElement(child, {
          onMouseEnter: (e: React.MouseEvent) => showTip(e),
          onMouseMove: moveTip,
          onMouseLeave: hideTip,
          className: className
            ? `${existingClassName} ${className}`.trim()
            : existingClassName,
          style: { ...existingStyle, ...(style || {}) },
        } as any)}
        {tip.visible &&
          mounted &&
          createPortal(
            <div className="C061" style={{ left: tip.x, top: tip.y }}>
              {tip.text}
            </div>,
            document.body
          )}
      </>
    );
  }

  // children이 요소가 아닌 경우 wrapper div 사용
  return (
    <>
      <div
        className={className}
        style={style}
        onMouseEnter={(e) => showTip(e)}
        onMouseMove={moveTip}
        onMouseLeave={hideTip}
      >
        {children}
      </div>
      {tip.visible &&
        mounted &&
        createPortal(
          <div className="C061" style={{ left: tip.x, top: tip.y }}>
            {tip.text}
          </div>,
          document.body
        )}
    </>
  );
}
