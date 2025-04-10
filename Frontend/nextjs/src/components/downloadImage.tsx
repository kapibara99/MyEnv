// import html2canvas from "@codewonders/html2canvas";
import html2canvas from "html2canvas-pro";

export default function DownloadImage({ targetId }: { targetId: string }) {
  // 画像化とダウンロードをトリガーする
  const onClickExport = (): void => {
    // 画像化したい要素を取得
    const target = document.getElementById(targetId) as HTMLElement;
    if (!target) return;
    // html2canvasを使って要素をキャンバスに描画
    html2canvas(target, { logging: false }).then((canvas: HTMLCanvasElement) => {
      // キャンバスをPNG形式のデータURLに変換
      const targetImgUri = canvas.toDataURL("image/png");
      // ダウンロードリンクを作成
      const downloadLink = document.createElement("a");
      if (typeof downloadLink.download === "string") {
        downloadLink.href = targetImgUri;
        downloadLink.download = `${targetId}_${new Date().getTime()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        // ダウンロードリンクが使えない場合は新しいタブで開く
        window.open(targetImgUri);
      }
    });
  };

  return (
    <div>
      {/* 画像化を実行するボタン */}
      <button
        type="button"
        onClick={onClickExport}
        className="cursor-pointer relative flex gap-1.5 px-8 py-4 bg-attention text-base-color rounded-3xl hover:opacity-60 transition font-bold shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px">
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Interface / Download">
              {" "}
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#f1f1f1"
                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                id="Vector"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
        画像でダウンロード
      </button>
    </div>
  );
}
