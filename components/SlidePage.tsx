"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePageHeader from "./SlidePageHeader";
import WeeklyCalendar from "./WeeklyCalendar";
import AsidePackageItem from "./AsidePackageItem";

/**
 * 기본 슬라이드 페이지 컴포넌트
 * 공통 슬라이드 페이지 기능을 제공
 */
export default function SlidePage({
  children,
  className = "",
  transform,
  zIndex,
  style,
  onGoBack,
  showBackButton = false,
  title,
  employeeName,
  employeeRole,
  customerName,
  customerId,
  showToggleSwitch = true,
}: SlidePageProps) {
  const inlineStyle: React.CSSProperties = {
    ...(transform && { transform }),
    ...(zIndex !== undefined && { zIndex }),
    ...style,
  };

  // 업무 일정 보기, 원장 일정 보기, 상담 일정 보기일 때 WeeklyCalendar 표시
  const shouldShowCalendar = showBackButton && !customerName;

  return (
    <div className={`C073 ${className}`.trim()} style={inlineStyle}>
      {showBackButton && onGoBack && (
        <SlidePageHeader
          onGoBack={onGoBack}
          title={title || "고객 참조 사항"}
          employeeName={employeeName}
          employeeRole={employeeRole}
          customerName={customerName}
          customerId={customerId}
          showToggleSwitch={showToggleSwitch}
        />
      )}
      {shouldShowCalendar && <WeeklyCalendar isNotShadow={true} />}
      {shouldShowCalendar && (
        <div className="C166">
          {(() => {
            if (title !== "원장 일정 보기") {
              return null;
            }

            const c172Interval = 80;
            const startHour = 8;
            const startMinute = 0;
            const durationStep = 30;
            const initialDuration = 30;
            const endOfDayMinutes = 20 * 60;

            const items: Array<{
              startHour: number;
              startMinute: number;
              durationMinutes: number;
            }> = [];

            let currentStartMinutes = startHour * 60 + startMinute;
            let i = 0;

            while (currentStartMinutes < endOfDayMinutes) {
              const calculatedDuration = initialDuration + i * durationStep;
              const endMinutes = currentStartMinutes + calculatedDuration;

              // 마지막 아이템인지 확인 (다음 아이템이 8시를 넘어가면 마지막)
              const isLastItem = endMinutes >= endOfDayMinutes;

              if (isLastItem) {
                // 마지막 수술은 4시간(240분)으로 고정
                const durationMinutes = 240;
                const currentStartHour = Math.floor(currentStartMinutes / 60);
                const currentStartMinute = currentStartMinutes % 60;

                items.push({
                  startHour: currentStartHour,
                  startMinute: currentStartMinute,
                  durationMinutes,
                });
                break;
              } else {
                const durationMinutes = calculatedDuration;
                const currentStartHour = Math.floor(currentStartMinutes / 60);
                const currentStartMinute = currentStartMinutes % 60;

                items.push({
                  startHour: currentStartHour,
                  startMinute: currentStartMinute,
                  durationMinutes,
                });

                currentStartMinutes = endMinutes;
                i++;
              }
            }

            return (
              <>
                {Array.from({ length: 13 }, (_, i) => {
                  const hour = 8 + i;
                  const isAM = hour < 12;
                  const displayHour =
                    hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                  const timeString = `${String(displayHour).padStart(
                    2,
                    "0"
                  )}:00`;
                  const period = isAM ? "AM" : "PM";

                  return (
                    <div key={hour} className="C172">
                      <div className="C173">
                        <p className="T074">
                          <span className="isUnit">{period}</span> {timeString}
                        </p>
                        <div className="C174"></div>
                      </div>
                    </div>
                  );
                })}
                {items.map((item, index) => {
                  const {
                    startHour: currentStartHour,
                    startMinute: currentStartMinute,
                    durationMinutes,
                  } = item;

                  const scheduleHourIndex = currentStartHour - 8;
                  const baseTop = 10 + scheduleHourIndex * c172Interval;
                  const minuteOffset =
                    Math.round(
                      ((currentStartMinute / 60) * c172Interval) / 10
                    ) * 10;
                  const scheduleC172Top = baseTop + minuteOffset;

                  // 현실적인 수술 데이터
                  const surgeries = [
                    {
                      part: "허벅지",
                      partClass: "isThigh",
                      name: "러브핸들 지방흡입 + 허리 라인 교정",
                      code: "FAT242",
                      details: ["B2(62~64.8cm이하)", "병행", "무한"],
                    },
                    {
                      part: "복부",
                      partClass: "isBelly",
                      name: "복부 지방흡입 + 복근 성형",
                      code: "FAT185",
                      details: ["A1(70cm이하)", "단독", "1회"],
                    },
                    {
                      part: "팔뚝",
                      partClass: "isArm",
                      name: "팔뚝 지방흡입",
                      code: "FAT156",
                      details: ["양측", "단독", "무한"],
                    },
                    {
                      part: "얼굴",
                      partClass: "isFace",
                      name: "볼 지방흡입 + 리프팅",
                      code: "FAT198",
                      details: ["양측", "병행", "2회"],
                    },
                    {
                      part: "허벅지",
                      partClass: "isThigh",
                      name: "허벅지 전체 지방흡입",
                      code: "FAT267",
                      details: ["양측", "단독", "무한"],
                    },
                    {
                      part: "복부",
                      partClass: "isBelly",
                      name: "복부 지방흡입 + 리프팅",
                      code: "FAT223",
                      details: ["A2(70~75cm)", "병행", "1회"],
                    },
                    {
                      part: "허벅지",
                      partClass: "isThigh",
                      name: "허벅지 안쪽 지방흡입",
                      code: "FAT201",
                      details: ["양측", "단독", "무한"],
                    },
                  ];

                  const surgeryRooms = [
                    "제1수술실",
                    "제2수술실",
                    "제3수술실",
                    "제4수술실",
                    "제5수술실",
                    "제6수술실",
                    "제7수술실",
                    "제8수술실",
                  ];

                  const surgery = surgeries[index % surgeries.length];
                  const room = surgeryRooms[index % surgeryRooms.length];

                  return (
                    <AsidePackageItem
                      key={`time-${currentStartHour}-${currentStartMinute}-${index}`}
                      icon={
                        <div className="C134 isIMaskMagenta isSyringe"></div>
                      }
                      partIcon={
                        <div className="C119">
                          <div
                            className={`C121 styleSheet isIcon isPart ${surgery.partClass}`}
                          ></div>
                        </div>
                      }
                      headerContent={
                        <>
                          <p className="T063">
                            <span className="isBold isMagenta">수술</span>{" "}
                            {surgery.part}
                          </p>
                          <p className="T064">
                            <span className="isUnit">CODE:</span> {surgery.code}
                          </p>
                        </>
                      }
                      bodyContent={
                        <>
                          <p className="T065 isBold isEllipsis">
                            {surgery.name} ({durationMinutes}분)
                          </p>
                          {surgery.details.map((detail, i) => (
                            <p key={i} className="T042">
                              {detail}
                            </p>
                          ))}
                        </>
                      }
                      startHour={currentStartHour}
                      startMinute={currentStartMinute}
                      durationMinutes={durationMinutes}
                      scheduleC172Top={scheduleC172Top}
                      room={room}
                    />
                  );
                })}
              </>
            );
          })()}
        </div>
      )}
      {!shouldShowCalendar && children}
    </div>
  );
}
