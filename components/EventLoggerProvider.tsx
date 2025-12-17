/**
 * 이벤트 로거 프로바이더
 * 앱 전체에서 사용자 이벤트를 자동으로 추적
 *
 * TODO: DB 준비 후 주석 해제
 */

// 'use client'

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { initEventLogger, getEventLogger } from "@/lib/event-logger";

// export default function EventLoggerProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   useEffect(() => {
//     // 이벤트 로거 초기화 (한 번만)
//     initEventLogger();

//     const logger = getEventLogger();
//     logger.updatePath(pathname);

//     // 페이지 변경 시 경로 업데이트
//     return () => {
//       logger.flush(); // 페이지 변경 시 플러시
//     };
//   }, [pathname]);

//   return <>{children}</>;
// }

// 임시 컴포넌트 (타입 에러 방지용)
export default function EventLoggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
