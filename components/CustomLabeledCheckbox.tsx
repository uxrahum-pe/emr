"use client";

import { useState } from "react";

export interface CustomLabeledCheckboxProps {
  /** 체크박스가 체크되어 있는지 여부 (controlled) */
  checked?: boolean;
  /** 기본 체크 상태 (uncontrolled) */
  defaultChecked?: boolean;
  /** 체크 상태 변경 핸들러 */
  onChange?: (checked: boolean) => void;
  /** 텍스트 값 */
  text?: string;
  /** 기본 텍스트 값 */
  defaultText?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 클래스명 */
  className?: string;
  /** 컨테이너 클래스명 (C2001에 적용) */
  containerClassName?: string;
  /** checked 상태일 때 배경색상 (기본값: 그라디언트) */
  checkedBackgroundColor?: string;
  /** 체크박스 클래스명 (C2003에 적용될 클래스들) */
  checkboxClassName?: string;
  /** 체크되었을 때 아이콘 클래스명 (기본값: "isIMaskGreen isIcon isMini isCheckedBold") */
  checkedIconClassName?: string;
  /** 체크 안되었을 때 아이콘 클래스명 (기본값: "isIcon isMini") */
  uncheckedIconClassName?: string;
}

/**
 * 커스터마이징 가능한 라벨이 있는 체크박스 컴포넌트
 * C2001, C2002, C2003, T2001 구조를 사용
 * checked 상태의 배경색상과 체크박스 클래스를 커스터마이징 가능
 */
export default function CustomLabeledCheckbox(props: CustomLabeledCheckboxProps) {
  const {
    disabled = false,
    className = "",
    containerClassName = "",
    checkedBackgroundColor,
    checkboxClassName,
    checkedIconClassName,
    uncheckedIconClassName,
  } = props;

  const isControlled = "checked" in props;

  const [internalChecked, setInternalChecked] = useState(
    isControlled ? false : props.defaultChecked ?? true
  );
  const [internalText] = useState(props.text ?? props.defaultText ?? "");

  const isChecked = isControlled ? props.checked ?? false : internalChecked;
  const textValue = props.text ?? internalText;

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    if (isControlled) {
      props.onChange?.(!props.checked);
    } else {
      const newChecked = !internalChecked;
      setInternalChecked(newChecked);
      props.onChange?.(newChecked);
    }
  };

  const containerClass = `C2001 ${
    !isChecked ? "isUnChecked" : ""
  } ${containerClassName}`.trim();
  const checkboxClass = `C2002 ${className}`.trim();

  // checked 상태일 때 배경색상 적용
  const containerStyle = isChecked && checkedBackgroundColor
    ? { background: checkedBackgroundColor }
    : undefined;

  // 체크박스 아이콘 공간 스타일: 섀도우 제거, 체크 시 하얀 배경, 미체크 시 var(--color-black-25)
  const checkboxStyle = {
    boxShadow: "none",
    backgroundColor: isChecked ? "var(--color-white)" : "var(--color-black-25)",
  };

  // 체크박스 클래스 결정
  const iconClass = checkboxClassName
    ? `C2003 ${checkboxClassName}`
    : `C2003 ${
        isChecked
          ? checkedIconClassName || "isIMaskGreen isIcon isMini isCheckedBold"
          : uncheckedIconClassName || "isIcon isMini"
      }`;

  return (
    <div
      className={containerClass}
      onClick={handleContainerClick}
      style={{
        cursor: disabled ? "default" : "pointer",
        ...containerStyle,
      }}
    >
      <div className={checkboxClass} style={checkboxStyle}>
        <div className={iconClass}></div>
      </div>
      <p className="T2001">{textValue}</p>
    </div>
  );
}

