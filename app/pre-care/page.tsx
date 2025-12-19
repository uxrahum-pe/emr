/**
 * Pre Care Page
 *
 * @description 전처치 파트의 메인 페이지입니다. 시술 전 처치 내역을 관리합니다.
 *
 * @page
 * @route /pre-care
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function PreCarePage() {
  return (
    <SimplePageLayout
      title="전처치"
      subtitle="시술 전 처치 관리"
      containerClassName="precare-container"
    >
      <div className="precare-card">
        <h2>전처치 관리</h2>
        <p>시술 전 처치 내역을 관리합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
