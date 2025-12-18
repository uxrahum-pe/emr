/**
 * 모달 스택 관리 유틸리티
 * 가장 최근에 열린 모달이 ESC 키로 먼저 닫히도록 관리
 */

type ModalCloseHandler = () => void;

class ModalStack {
  private stack: ModalCloseHandler[] = [];

  /**
   * 모달을 스택에 추가
   */
  push(closeHandler: ModalCloseHandler): void {
    this.stack.push(closeHandler);
  }

  /**
   * 모달을 스택에서 제거
   */
  remove(closeHandler: ModalCloseHandler): void {
    this.stack = this.stack.filter((handler) => handler !== closeHandler);
  }

  /**
   * 가장 최근에 열린 모달 닫기
   */
  closeTop(): void {
    const topHandler = this.stack[this.stack.length - 1];
    if (topHandler) {
      topHandler();
    }
  }

  /**
   * 스택이 비어있는지 확인
   */
  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}

export const modalStack = new ModalStack();

// 전역 ESC 키 리스너
if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && !modalStack.isEmpty()) {
      e.preventDefault();
      e.stopPropagation();
      modalStack.closeTop();
    }
  });
}
