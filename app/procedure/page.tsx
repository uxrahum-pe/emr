/**
 * Procedure Page
 *
 * @description 시술 파트의 메인 페이지입니다. 시술 기록을 관리합니다.
 *
 * @page
 * @route /procedure
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function ProcedurePage() {
  return (
    <SimplePageLayout
      title="시술"
      subtitle="시술 기록 관리"
      containerClassName="procedure-container"
    >
      <div className="procedure-card">
        <h2>시술 관리</h2>
        <p>시술 기록을 관리합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
