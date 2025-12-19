/**
 * Post Care Page
 *
 * @description 후관리 파트의 메인 페이지입니다. 시술 후 관리 내역을 관리합니다.
 *
 * @page
 * @route /post-care
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function PostCarePage() {
  return (
    <SimplePageLayout
      title="후관리"
      subtitle="시술 후 관리"
      containerClassName="postcare-container"
    >
      <div className="postcare-card">
        <h2>후관리</h2>
        <p>시술 후 관리 내역을 관리합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
