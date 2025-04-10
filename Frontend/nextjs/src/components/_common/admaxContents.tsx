import { useEffect, useState } from "react";

type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};
interface Window {
  admaxads?: AdmaxAdType[];
  __admax_tag__?: { [key: string]: unknown }[];
}
declare const window: Window;

export default function AdmaxContent({ admaxID }: { admaxID: string }) {
  const [dev] = useState(process.env.NODE_ENV === "development");
  useEffect(() => {
    if (dev) return;
    const script = document.createElement("script");
    script.src = "https://adm.shinobi.jp/st/t.js";
    script.async = true;
    document.body.appendChild(script);
    window.admaxads = window.admaxads || [];
    window.admaxads.push({ admax_id: admaxID, type: "switch" });
    return () => {
      document.body.removeChild(script);
    };
  }, [admaxID, dev]);

  return (
    <>
      <div className="mt-8 flex justify-center">
        {dev ? (
          <img className="inline-block" src="https://placehold.jp/728x90.png" alt="AD dummy" />
        ) : (
          <div className={`admax-switch inline-block`} data-admax-id={admaxID} />
        )}
      </div>
    </>
  );
}
