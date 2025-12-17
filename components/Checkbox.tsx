"use client";

import { useState } from "react";

export interface CheckboxProps {
  /** 체크박스가 체크되어 있는지 여부 (controlled) */
  checked?: boolean;
  /** 기본 체크 상태 (uncontrolled) */
  defaultChecked?: boolean;
  /** 체크 상태 변경 핸들러 */
  onChange?: (checked: boolean) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 체크박스 컴포넌트
 * C145, C146 구조를 사용하는 체크박스
 */
export default function Checkbox(props: CheckboxProps) {
  const { disabled = false, className = "" } = props;
  const isControlled = "checked" in props;

  const [internalChecked, setInternalChecked] = useState(
    isControlled ? false : props.defaultChecked ?? false
  );

  const isChecked = isControlled ? props.checked ?? false : internalChecked;

  const handleClick = (e: React.MouseEvent) => {
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

  const combinedClassName = `C145 ${isChecked ? "isChecked" : ""} ${
    disabled ? "isDisabled" : ""
  } ${className}`.trim();

  return (
    <div className={combinedClassName} onClick={handleClick}>
      <div className="C146 styleSheet isIcon isMini isChecked"></div>
    </div>
  );
}
