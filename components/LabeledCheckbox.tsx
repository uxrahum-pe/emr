"use client";

import { useState } from "react";

export interface LabeledCheckboxProps {
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
}

/**
 * 라벨이 있는 체크박스 컴포넌트
 * C2001, C2002, C2003, T2001 구조를 사용
 */
export default function LabeledCheckbox(props: LabeledCheckboxProps) {
  const { disabled = false, className = "", containerClassName = "" } = props;

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

  return (
    <div
      className={containerClass}
      onClick={handleContainerClick}
      style={{
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <div className={checkboxClass}>
        <div
          className={`C2003 ${
            isChecked
              ? "isIMaskGreen isIcon isMini isCheckedBold"
              : "isIcon isMini"
          }`}
        ></div>
      </div>
      <p className="T2001">{textValue}</p>
    </div>
  );
}
