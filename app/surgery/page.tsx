/**
 * Surgery Page
 *
 * @description 수술 파트의 메인 페이지입니다. 수술 기록을 관리합니다.
 *
 * @page
 * @route /surgery
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function SurgeryPage() {
  return (
    <SimplePageLayout
      title="수술"
      subtitle="수술 기록 관리"
      containerClassName="surgery-container"
    >
      <div className="surgery-card">
        <h2>수술 관리</h2>
        <p>수술 기록을 관리합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
