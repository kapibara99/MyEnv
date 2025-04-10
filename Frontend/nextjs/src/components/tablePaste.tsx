import type { MouseEvent } from "react";

export default function TablePaste({ targetSelector }: { targetSelector: string }) {
  const onClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 取得対象の要素
    const targets = document.querySelectorAll(`${targetSelector}`);
    if (!targets.length) return;
    const resultEls = ["<tr>"];
    for (let i = 0; i < targets.length; i++) {
      const el = targets[i] as HTMLElement;
      const cellText = el.textContent !== "" ? el.textContent : "&#160;";
      const cellData = `<td>${cellText}</td>`;
      resultEls.push(cellData);
      if ((i + 1) % 9 == 0 && i > 0) {
        resultEls.push("</tr>");
      }
    }
    const output = document.getElementById("paste-output");
    if (output) {
      output.innerHTML = "";
      output.insertAdjacentHTML("beforeend", resultEls.join(""));
      const pasteEl = document.getElementById("paste-table");
      if (pasteEl && pasteEl.textContent) {
        try {
          await navigator.clipboard.writeText(pasteEl.outerHTML);
          alert("クリップボードにコピーしました！");
        } catch (err) {
          console.error(err);
          alert("コピーに失敗しました");
        }
      }
    }
  };
  return (
    <div>
      <button
        onClick={onClickHandler}
        type="button"
        className="cursor-pointer relative flex items-center gap-1.5 px-8 py-4 bg-attention text-base-color rounded-3xl hover:opacity-60 transition font-bold shadow-md"
      >
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="699.428px"
          height="699.428px"
          viewBox="0 0 699.428 699.428"
          className="w-[1.5em] h-[1.5em] fill-white"
          // style={enableBackground:"new 0 0 699.428 699.428"}
          // xml:space="preserve"
        >
          <g>
            <g id="_x33__21_">
              <g>
                <path
                  d="M502.714,0c-2.71,0-262.286,0-262.286,0C194.178,0,153,42.425,153,87.429l-25.267,0.59
				c-46.228,0-84.019,41.834-84.019,86.838V612c0,45.004,41.179,87.428,87.429,87.428H459c46.249,0,87.428-42.424,87.428-87.428
				h21.857c46.25,0,87.429-42.424,87.429-87.428v-349.19L502.714,0z M459,655.715H131.143c-22.95,0-43.714-21.441-43.714-43.715
				V174.857c0-22.272,18.688-42.993,41.638-42.993L153,131.143v393.429C153,569.576,194.178,612,240.428,612h262.286
				C502.714,634.273,481.949,655.715,459,655.715z M612,524.572c0,22.271-20.765,43.713-43.715,43.713H240.428
				c-22.95,0-43.714-21.441-43.714-43.713V87.429c0-22.272,20.764-43.714,43.714-43.714H459c-0.351,50.337,0,87.975,0,87.975
				c0,45.419,40.872,86.882,87.428,86.882c0,0,23.213,0,65.572,0V524.572z M546.428,174.857c-23.277,0-43.714-42.293-43.714-64.981
				c0,0,0-22.994,0-65.484v-0.044L612,174.857H546.428z M502.714,306.394H306c-12.065,0-21.857,9.77-21.857,21.835
				c0,12.065,9.792,21.835,21.857,21.835h196.714c12.065,0,21.857-9.771,21.857-21.835
				C524.571,316.164,514.779,306.394,502.714,306.394z M502.714,415.57H306c-12.065,0-21.857,9.77-21.857,21.834
				c0,12.066,9.792,21.836,21.857,21.836h196.714c12.065,0,21.857-9.77,21.857-21.836C524.571,425.34,514.779,415.57,502.714,415.57
				z"
                />
              </g>
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>

        <span>スプレッドシートやExcelへコピーする</span>
      </button>
      <div className="hidden invisible">
        <table id="paste-table">
          <tbody id="paste-output"></tbody>
        </table>
      </div>
    </div>
  );
}
