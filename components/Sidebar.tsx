"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Tooltip from "@/components/Tooltip";

export default function Sidebar() {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const c190Refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const c191Refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const c193Refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [c190Positions, setC190Positions] = useState<{
    [key: string]: number;
  }>({});
  const [c193MarginTops, setC193MarginTops] = useState<{
    [key: string]: number;
  }>({});
  const [c193Tops, setC193Tops] = useState<{
    [key: string]: number;
  }>({});

  const menuItems = [
    { href: "/dashboard", icon: "isDashboard", label: "대시보드" },
    { href: "/reception", icon: "isReception", label: "원무" },
    { href: "/counseling", icon: "isCounseling", label: "상담" },
    { href: "/pre-care", icon: "isPreCare", label: "전처치" },
    { href: "/clinic", icon: "isProcedure", label: "진료" },
    { href: "/surgery", icon: "isSurgery", label: "수술" },
    { href: "/procedure", icon: "isClinic", label: "시술" },
    { href: "/post-care", icon: "isPostCare", label: "후관리" },
    { href: "/statistics", icon: "isStatistics", label: "통계" },
  ];

  // C190이 필요한 메뉴 아이템들 (대시보드 제외)
  const c190MenuItems = menuItems.filter((item) => item.icon !== "isDashboard");

  useEffect(() => {
    let resizeTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const element = scrollContainerRef.current;
        const hasOverflow = element.scrollHeight > element.clientHeight;

        if (hasOverflow) {
          element.classList.add("isOverflowed");
        } else {
          element.classList.remove("isOverflowed");
        }
      }
    };

    const debouncedCheckOverflow = () => {
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
      }
      resizeTimeoutId = setTimeout(() => {
        checkOverflow();
      }, 150);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(debouncedCheckOverflow);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    window.addEventListener("resize", debouncedCheckOverflow);

    return () => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", debouncedCheckOverflow);
    };
  }, []);

  // C190 위치 계산 및 C193 margin-top 계산
  useEffect(() => {
    const breakpoint = 1920;
    const size5 = (window.innerWidth * 5) / breakpoint;
    const size10 = (window.innerWidth * 10) / breakpoint;

    const calculatePositions = () => {
      const newPositions: { [key: string]: number } = {};
      const newMarginTops: { [key: string]: number } = {};
      const newC193Tops: { [key: string]: number } = {};

      c190MenuItems.forEach((item) => {
        const iconClass = item.icon;
        const menuItem = menuItemRefs.current[item.href];
        const c190 = c190Refs.current[iconClass];
        const c191 = c191Refs.current[iconClass];
        const c193 = c193Refs.current[iconClass];

        // C190 위치 계산: C005의 브라우저 상단 top에서 size-5 아래
        if (menuItem) {
          const c005 = menuItem.querySelector(
            `.C005.${iconClass}`
          ) as HTMLElement;
          if (c005) {
            const c005Rect = c005.getBoundingClientRect();
            const top = c005Rect.top + size5;
            newPositions[iconClass] = top;
          }
        }

        // C193 margin-top 계산 및 뷰포트 경계 체크
        if (c191 && c193 && c190) {
          const c191Height = c191.getBoundingClientRect().height;
          const c193Height = c193.getBoundingClientRect().height;
          const marginTop = -1 * ((c193Height - c191Height) / 2);
          newMarginTops[iconClass] = marginTop;

          // C193의 뷰포트 경계 체크
          const c190Rect = c190.getBoundingClientRect();
          const c193Rect = c193.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // C193의 현재 브라우저 상단 위치 (C190의 top + C193의 margin-top)
          const c193TopInViewport = c190Rect.top + marginTop;
          const c193BottomInViewport = c193TopInViewport + c193Height;

          let adjustedTop = marginTop;

          // 위쪽이 뷰포트를 벗어나면 위쪽 마진 10에 맞춤
          if (c193TopInViewport < size10) {
            adjustedTop = size10 - c190Rect.top;
          }

          // 아래쪽이 뷰포트를 벗어나면 아래쪽 마진 10에 맞춤
          if (c193BottomInViewport > viewportHeight - size10) {
            adjustedTop = viewportHeight - size10 - c193Height - c190Rect.top;
          }

          newC193Tops[iconClass] = adjustedTop;
        }
      });

      setC190Positions(newPositions);
      setC193MarginTops(newMarginTops);
      setC193Tops(newC193Tops);
    };

    // DOM 렌더링 완료 후 측정
    const rafId = requestAnimationFrame(() => {
      setTimeout(calculatePositions, 0);
    });

    // 리사이즈 시 재계산
    const resizeObserver = new ResizeObserver(() => {
      calculatePositions();
    });

    // 모든 요소 관찰
    Object.values(menuItemRefs.current).forEach((ref) => {
      if (ref) resizeObserver.observe(ref);
    });
    Object.values(c190Refs.current).forEach((ref) => {
      if (ref) resizeObserver.observe(ref);
    });
    Object.values(c191Refs.current).forEach((ref) => {
      if (ref) resizeObserver.observe(ref);
    });
    Object.values(c193Refs.current).forEach((ref) => {
      if (ref) resizeObserver.observe(ref);
    });

    window.addEventListener("resize", calculatePositions);
    window.addEventListener("scroll", calculatePositions, true);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculatePositions);
      window.removeEventListener("scroll", calculatePositions, true);
    };
  }, []);

  return (
    <nav className="C000">
      <div className="C001">
        <div className="C002"></div>
        <p className="T000">홍성훈</p>
        <p className="T001">부산병원</p>
      </div>
      <div ref={scrollContainerRef} className="C003">
        {menuItems.map((item) => (
          <Tooltip key={item.href} text={item.label}>
            <Link
              href={item.href}
              ref={(el) => {
                menuItemRefs.current[item.href] = el;
              }}
              className={`C004 ${pathname === item.href ? "isSelected" : ""}`}
            >
              <div
                className={`C005 styleSheet isIcon ${item.icon} isBig`}
              ></div>
            </Link>
          </Tooltip>
        ))}
      </div>
      <div className="C006">
        <Tooltip text="설정">
          <Link href="/settings" className="C004">
            <div className="C005 styleSheet isIcon isSettings isBig"></div>
          </Link>
        </Tooltip>
      </div>
      {c190MenuItems.map((item) => {
        const iconClass = item.icon;
        const isCurrentPage = pathname === item.href;
        return (
          <div
            key={iconClass}
            className={`C190 ${iconClass} ${isCurrentPage ? "isOpened" : ""}`}
            ref={(el) => {
              c190Refs.current[iconClass] = el;
            }}
            style={
              c190Positions[iconClass] !== undefined
                ? { top: `${c190Positions[iconClass]}px` }
                : undefined
            }
          >
            <div
              className="C193"
              ref={(el) => {
                c193Refs.current[iconClass] = el;
              }}
              style={
                c193Tops[iconClass] !== undefined
                  ? { top: `${c193Tops[iconClass]}px` }
                  : c193MarginTops[iconClass] !== undefined
                  ? { marginTop: `${c193MarginTops[iconClass]}px` }
                  : undefined
              }
            >
              <div className="C194">
                <div className="C195 styleSheet isIcon isEarth"></div>
                <p className="T083">외국인 등록 현황</p>
              </div>
              <div className="C194">
                <div className="C195 styleSheet isIcon isEarth"></div>
                <p className="T083">test</p>
              </div>
            </div>
            <div
              className="C191"
              ref={(el) => {
                c191Refs.current[iconClass] = el;
              }}
            >
              <div className="C196"></div>
              <div className="C196"></div>
              <div className="C196"></div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
