/**
 * Counseling Page
 *
 * @description 상담 파트의 메인 페이지입니다. 환자 상담 내역을 관리합니다.
 *
 * @page
 * @route /counseling
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function CounselingPage() {
  return (
    <SimplePageLayout
      title="상담"
      subtitle="환자 상담 관리"
      containerClassName="counseling-container"
    >
      <div className="counseling-card">
        <h2>상담 관리</h2>
        <p>환자 상담 내역을 관리합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
