/**
 * MENTARI MOD - Discus Helper Module
 * Refactored for modularity and code efficiency.
 */

(function () {
  const Config = {
    GEMINI: {
      MODEL: "gemini-2.5-flash-lite",
      ENDPOINT: "https://generativelanguage.googleapis.com/v1beta/models",
    },
    STORAGE_KEYS: {
      API_KEY: "geminiApiKey",
    },
    PROMPTS: {
      DEFAULT: (content) => `Kamu adalah seorang mahasiswa Universitas Pamulang (UNPAM) yang aktif berdiskusi di forum e-learning.
Jawab diskusi berikut secara lugas, akademis, dan natural.

ATURAN WAJIB & SANGAT KETAT:
1. WAJIB selalu awali kalimat pertama persis dengan frasa "Izin menjawab," (contoh: "Izin menjawab, terkait topik diskusi ini...", "Izin menjawab, menurut pemahaman saya...").
2. DILARANG KERAS menyebut subjek/objek seperti nama mahasiswa, NIM (Nomor Induk Mahasiswa / deretan angka), nama dosen, atau sapaan ("Halo rekan", "Bapak/Ibu dosen", "Menanggapi rekan..."). Langsung bahas substansi materi diskusi.
3. DILARANG KERAS menggunakan format Markdown seperti huruf tebal (**teks**), huruf miring (*teks*), heading (###), atau bullet bintang (*). Jawaban WAJIB berupa teks bersih mengalir (Plain Text murni).
4. JANGAN gunakan salam pembuka ("Halo", "Selamat pagi", "Assalamu'alaikum"), sapaan personal, penutup ("Semoga membantu", "Terima kasih"), atau basa-basi AI ("Berikut jawabannya", "Tentu, ini rangkumannya:"). Awali LANGSUNG dengan "Izin menjawab, ...".
5. Jika terdapat soal yang berhubungan dengan bahasa pemrograman atau coding, berikan potongan contoh kode singkat dan bersih. Jika pertanyaan bernomor atau meminta poin, gunakan penomoran angka biasa (1., 2., 3.).

TOPIK DISKUSI:
${content}

JAWABAN PLAIN TEXT:`,
      REVISE: (mode, prevAnswer) => {
        const modes = {
          shorten: `Ringkas jawaban forum berikut menjadi lebih singkat dan padat, tetap diawali "Izin menjawab," tanpa bullet bintang atau markdown, dan tanpa menyebut nama/NIM/dosen:\n\n${prevAnswer}`,
          paragraph: `Ubah jawaban forum berikut menjadi satu paragraf rapi dan mengalir, tetap diawali "Izin menjawab," tanpa bullet atau penomoran markdown, dan tanpa menyebut nama/NIM/dosen:\n\n${prevAnswer}`,
          clarify: `Perjelas dan perbaiki jawaban forum berikut agar lebih mudah dipahami, tetap diawali "Izin menjawab," tanpa menyebut nama/NIM/dosen:\n\n${prevAnswer}`,
          lengthen: `Perpanjang dan tambahkan elaborasi penjelasan pada jawaban forum berikut secara relevan, tetap diawali "Izin menjawab," tanpa bullet bintang atau markdown, dan tanpa menyebut nama/NIM/dosen:\n\n${prevAnswer}`,
          numbered: `Ubah uraian jawaban forum berikut menjadi poin-poin bernomor angka (1., 2., 3.), tetap diawali "Izin menjawab," tanpa huruf tebal atau markdown, dan tanpa menyebut nama/NIM/dosen:\n\n${prevAnswer}`
        };
        return modes[mode] || prevAnswer;
      },
      QUESTIONS: (content) => `Bacalah konteks diskusi forum e-learning UNPAM berikut, lalu buatkan 3 saran pertanyaan yang berbobot, natural, dan relevan untuk diajukan di forum.
ATURAN WAJIB:
- Buat tepat 3 pertanyaan, pisahkan setiap pertanyaan HANYA dengan baris baru (enter).
- Setiap pertanyaan harus berdiri sendiri, tidak saling terhubung, dan JANGAN menggunakan kata sambung di awal kalimat seperti "Selain itu", "Lalu", "Dan".
- DILARANG menggunakan penomoran (1., 2.), bullet (*, -), huruf tebal (**), miring (*), atau markdown apapun. Hanya teks pertanyaan murni per baris.
- DILARANG menyebut nama mahasiswa/NIM/dosen.
- Gaya bahasa mahasiswa yang sopan dan ingin tahu.

KONTEKS DISKUSI:
${content}

SARAN PERTANYAAN:`
    }
  };

  const Utils = {
    updateModelLimit(model, isLimited) {
      try {
        const statsKey = "gemini_model_stats";
        const raw = localStorage.getItem(statsKey);
        const stats = raw ? JSON.parse(raw) : {};
        if (!stats[model]) stats[model] = {};
        stats[model].limited = isLimited ? true : false;
        localStorage.setItem(statsKey, JSON.stringify(stats));
      } catch (e) {}
    },
    getApiKey() {
      const stored = localStorage.getItem(Config.STORAGE_KEYS.API_KEY);
      if (stored) return atob(stored);
      alert("API Key Gemini tidak ditemukan! Selesaikan di menu Setting.");
      throw new Error("API Key missing");
    },
    extractContent(root) {
      const selectors = [".ck-content", ".MuiBox-root", ".discussion-content", '[class*="content"]', "div:not([class]):not([id])"];
      for (const s of selectors) {
        const elements = root.querySelectorAll(s);
        for (const el of elements) {
          if (el.textContent.trim().length < 10) continue;
          if (el.querySelector("button, a, input, select, textarea")) continue;
          return el.textContent.trim();
        }
      }
      return root.textContent.trim();
    },
    isDosen(root) {
      const elements = [...(root?.querySelectorAll('strong, b, [style*="font-weight:bold"], [class*="name"], [class*="user"], [class*="author"], .MuiTypography-root') || [])];
      return elements.some(el => /\b(?:,|\.)\b/i.test(el.textContent.trim()));
    },
    updateQuota(headers) {
      try {
        const quota = {
          rpm: { remaining: parseInt(headers.get('x-ratelimit-remaining-requests')), limit: parseInt(headers.get('x-ratelimit-limit-requests')) },
          tpm: { remaining: parseInt(headers.get('x-ratelimit-remaining-tokens')), limit: parseInt(headers.get('x-ratelimit-limit-tokens')) },
          updated: Date.now()
        };
        if (!isNaN(quota.rpm.limit)) localStorage.setItem("gemini_quota", JSON.stringify(quota));
      } catch (e) {}
    },
    cleanForumAnswer(rawText) {
      if (!rawText || typeof rawText !== "string") return "";

      let cleaned = rawText
        .replace(/^```(?:markdown)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^#+\s+/gm, "")
        .trim();

      // 1. Strip introductory AI boilerplate
      cleaned = cleaned.replace(
        /^(?:berikut\s+(?:adalah\s+)?(?:jawaban|rangkuman|tanggapan|ulasan|analisis)[^:\n]*:?\s*|tentu,?\s+[^:\n]*:?\s*|baik(?:lah)?,?\s+[^:\n]*:?\s*)/i,
        "",
      );

      // 2. Strip initial greetings
      cleaned = cleaned.replace(
        /^(?:halo|hai|selamat\s+(?:pagi|siang|sore|malam)|assalamu['’]?alaikum(?:\s+wr\.?\s*wb\.?)?)[^,\n]*[,\.\n\:\-]?\s*/i,
        "",
      );

      // 3. Strip initial direct address to lecturer / peers
      cleaned = cleaned.replace(
        /^(?:kepada\s+)?(?:yth\.?\s+)?(?:bapak(?:\/ibu)?|ibu|pak|bu|bpk|dosen(?:\s+pengampu)?|rekan(?:\-rekan)?(?:\s+mahasiswa)?|saudara(?:\/i)?|teman(?:\-teman)?)\s*(?:dosen)?\s*(?:[A-Z][a-z]+|\d{8,14})?[,\.\:\-]?\s*/i,
        "",
      );

      // 4. Strip 'menanggapi pertanyaan rekan 2310... / Budi...'
      cleaned = cleaned.replace(
        /^(?:menanggapi|merespons|membalas)\s+(?:pertanyaan|pendapat|tanggapan|argumen|apa\s+yang\s+disampaikan)?\s*(?:dari|oleh)?\s*(?:rekan|saudara|teman|bapak|ibu|pak|bu)?\s*(?:\d{8,14}|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)?[^,\n]*[,\.\n\:\-]?\s*/i,
        "",
      );

      // 5. Strip 'Izin menjawab' prefix temporarily if present to clean any object/greeting that followed it
      cleaned = cleaned.replace(/^izin\s+menjawab[,.\s]*/i, "");

      // If after 'izin menjawab' there was still a greeting or object address:
      cleaned = cleaned.replace(
        /^(?:kepada\s+)?(?:yth\.?\s+)?(?:bapak(?:\/ibu)?|ibu|pak|bu|bpk|dosen(?:\s+pengampu)?|rekan(?:\-rekan)?(?:\s+mahasiswa)?|saudara(?:\/i)?|teman(?:\-teman)?)\s*(?:dosen)?\s*(?:[A-Z][a-z]+|\d{8,14})?[,\.\:\-]?\s*/i,
        "",
      );
      cleaned = cleaned.replace(
        /^(?:menanggapi|merespons|membalas)\s+(?:pertanyaan|pendapat|tanggapan|argumen|apa\s+yang\s+disampaikan)?\s*(?:dari|oleh)?\s*(?:rekan|saudara|teman|bapak|ibu|pak|bu)?\s*(?:\d{8,14}|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)?[^,\n]*[,\.\n\:\-]?\s*/i,
        "",
      );

      // 6. Strip any accidental NIM numbers anywhere in text
      cleaned = cleaned.replace(
        /(?:\brekan|\bsaudara|\bteman|\bmahasiswa)?\s*\(?\b(?:NIM\s*)?\d{8,14}\b\)?/gi,
        "",
      );

      // 7. Clean trailing punctuation and multiple spaces left behind
      cleaned = cleaned
        .replace(/[ \t]{2,}/g, " ")
        .replace(/^\s*[,.;:\-]\s*/, "")
        .trim();

      // 8. Re-attach 'Izin menjawab,' cleanly
      if (cleaned.length > 0) {
        if (/^\d+\./.test(cleaned)) {
          cleaned = `Izin menjawab,\n${cleaned}`;
        } else {
          const firstWord = cleaned.split(/\s+/)[0] || "";
          if (/^[A-Z][a-z]+$/.test(firstWord)) {
            cleaned = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
          }
          cleaned = `Izin menjawab, ${cleaned}`;
        }
      } else {
        cleaned = "Izin menjawab, ";
      }

      return cleaned.trim();
    }
  };

  const ApiService = {
    async callGemini(prompt, isQuestionMode = false) {
      const key = Utils.getApiKey();
      let modelRaw = localStorage.getItem("gemini_model") || Config.GEMINI.MODEL;
      let model = modelRaw.replace(/"/g, '');

      const res = await fetch(`${Config.GEMINI.ENDPOINT}/${model}:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048, topP: 0.95, topK: 40 }
        })
      });

      if (!res.ok) {
        if (res.status === 429) {
          Utils.updateModelLimit(model, true);
          throw new Error("Rate Limit Tercapai! Kuota API model ini sudah habis. Silakan ganti Model atau API Key lain di menu Pengaturan (Mentari Mod).");
        }
        throw new Error("Gagal mendapatkan jawaban dari Gemini (Cek Koneksi atau API Key)");
      }
      Utils.updateQuota(res.headers);
      Utils.updateModelLimit(model, false);
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada jawaban.";
      if (isQuestionMode) {
        return raw
          .replace(/^```(?:markdown)?\s*/i, "")
          .replace(/\s*```$/i, "")
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/\*(.*?)\*/g, "$1")
          .replace(/^#+\s+/gm, "")
          .trim();
      }
      return Utils.cleanForumAnswer(raw);
    }
  };

  const UIRenderer = {
    createButton(type, onClick) {
      const btn = document.createElement("button");
      btn.type = "button";
      if (type === "buat") {
        btn.className = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedInfo MuiButton-sizeSmall MuiButton-containedSizeSmall buat-pertanyaan-btn";
        btn.style = "margin-right:2px;min-width:0px;padding:6px 12px;line-height:1.2;font-weight:500;border-radius:11px;background:#1e3a8a;color:#fff;border:0;display:flex;align-items:center;gap:4px;";
        btn.innerHTML = `<span class="MuiButton-startIcon" style="display:inline-flex;align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg></span><span class="MuiButton-label">Buat Pertanyaan</span>`;
      } else {
        btn.className = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedWarning MuiButton-sizeSmall MuiButton-containedSizeSmall cari-jawaban-btn";
        btn.style = "margin-right:2px;min-width:0px;padding:6px 12px;line-height:1.2;font-weight:500;border-radius:11px;background:#41a3f1;color:rgb(255,255,255);border:0;display:flex;align-items:center;gap:4px;";
        btn.innerHTML = `<span class="MuiButton-startIcon" style="display:inline-flex;align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span><span class="MuiButton-label">Cari Jawaban</span>`;
      }
      btn.onclick = onClick;
      return btn;
    },

    showSaranQuestions(saranText, root, replyBtn) {
      let saranDiv = root.querySelector(".saran-pertanyaan-gemini");
      if (!saranDiv) {
        saranDiv = document.createElement("div");
        saranDiv.className = "saran-pertanyaan-gemini";
        saranDiv.style = "margin:10px 0 0 0;padding:10px;;border-radius:18px;border:1px solid rgba(184, 184, 184, 0.3);font-size:13px;display:flex;flex-direction:column;gap:8px;";
        replyBtn.parentElement.parentElement.appendChild(saranDiv);
      }
      const questions = saranText.split(/\n+/).filter(Boolean).slice(0, 5);
      saranDiv.innerHTML = `<b>Saran Pertanyaan:</b>`;
      questions.forEach(q => {
        const qWrap = document.createElement("div");
        qWrap.style = "display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap;";
        const textBox = document.createElement("div");
        textBox.textContent = q.trim();
        textBox.style = "flex:1 1 200px;padding:14px 80px 14px 12px;position:relative;border-radius:10px;background: rgba(184, 184, 184, 0.3);font-size:13px;word-break:break-word;min-height:36px;text-align:justify;text-justify:inter-word;";
        
        const copyBtn = document.createElement("button");
        copyBtn.style = "position:absolute;right:8px;bottom:8px;min-width:0px;padding:8px;line-height:1.2;font-weight:500;border-radius:9px;background:#79bb7c;color:#fff;border:0;display:flex;align-items:center;gap:4px;z-index:2;box-shadow:0 1px 4px rgba(0,0,0,0.07);";
        copyBtn.innerHTML = `<span class="MuiButton-startIcon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span><span class="MuiButton-label">Copy</span>`;
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(q.trim());
          copyBtn.querySelector(".MuiButton-label").innerText = "Copied!";
          setTimeout(() => copyBtn.querySelector(".MuiButton-label").innerText = "Copy", 1200);
        };
        textBox.appendChild(copyBtn);
        qWrap.appendChild(textBox);
        saranDiv.appendChild(qWrap);
      });
    },

    showJawabanBox(jawaban, replyBtn, root, content) {
      let resultDiv = root.querySelector(".jawaban-gemini");
      if (!resultDiv) {
        resultDiv = document.createElement("div");
        resultDiv.className = "jawaban-gemini";
        resultDiv.style = "margin:10px 0 0 0;padding:10px;border-radius:18px;border:1px solid rgba(184, 184, 184, 0.3);font-size:13px;display:flex;flex-direction:column;gap:8px;text-align:justify;text-justify:inter-word;";
        replyBtn.parentElement.parentElement.appendChild(resultDiv);
      }
      resultDiv.innerHTML = `<b>Jawaban:</b><div style='margin-bottom:6px;white-space:pre-line;'>${jawaban}</div>`;
      
      const btnRow = document.createElement("div");
      btnRow.style = "display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;";
      
      const copyBtn = document.createElement("button");
      copyBtn.style = "margin-right:0;min-width:0px;padding:6px 10px;line-height:1.2;font-weight:500;border-radius:11px;background:#79bb7c;color:#fff;border:0;display:flex;align-items:center;gap:4px;";
      copyBtn.innerHTML = `<span class="MuiButton-startIcon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span><span class="MuiButton-label">Copy</span>`;
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(jawaban);
        copyBtn.querySelector(".MuiButton-label").innerText = "Copied!";
        setTimeout(() => copyBtn.querySelector(".MuiButton-label").innerText = "Copy", 1200);
      };
      btnRow.appendChild(copyBtn);

      const modes = [{m:"shorten", l:"Ringkas"}, {m:"paragraph", l:"1 Paragraf"}, {m:"clarify", l:"Perjelas"}, {m:"lengthen", l:"Perpanjang"}, {m:"numbered", l:"Nomor"}];
      modes.forEach(({m, l}) => {
        const btn = document.createElement("button");
        btn.style = "margin-right:0;min-width:0px;padding:6px 10px;line-height:1.2;font-weight:500;border-radius:11px;background:rgb(66, 66, 66);color:rgb(225,225,225);border:0";
        btn.innerHTML = `<span class="MuiButton-label">${l}</span>`;
        btn.onclick = async () => {
          btn.disabled = true;
          btn.innerText = "Memproses...";
          try {
            const result = await ApiService.callGemini(Config.PROMPTS.REVISE(m, jawaban));
            this.showJawabanBox(result, replyBtn, root, content);
          } catch(e) { alert(e.message); }
          btn.disabled = false;
          btn.innerText = l;
        };
        btnRow.appendChild(btn);
      });
      resultDiv.appendChild(btnRow);
    }
  };

  const App = {
    async handleBuatPertanyaan(btn, root, replyBtn) {
      btn.disabled = true;
      const originalHtml = btn.innerHTML;
      btn.innerText = "Memproses...";
      try {
        const content = Utils.extractContent(root);
        const saran = await ApiService.callGemini(Config.PROMPTS.QUESTIONS(content), true);
        UIRenderer.showSaranQuestions(saran, root, replyBtn);
      } catch (e) { alert(e.message); }
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    },

    async handleCariJawaban(btn, root, replyBtn) {
      btn.disabled = true;
      const originalHtml = btn.innerHTML;
      btn.innerText = "Memproses...";
      try {
        const content = Utils.extractContent(root);
        const jawaban = await ApiService.callGemini(Config.PROMPTS.DEFAULT(content));
        UIRenderer.showJawabanBox(jawaban, replyBtn, root, content);
      } catch (e) { alert(e.message); }
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    },

    injectButtons() {
      document.querySelectorAll(".MuiStack-root .MuiButton-root.MuiButton-containedSuccess").forEach(replyBtn => {
        if (replyBtn.parentElement.querySelector(".cari-jawaban-btn")) return;
        const root = replyBtn.closest(".MuiPaper-root, .discussion-post, [role='article']") || replyBtn.closest("div");
        
        if (Utils.isDosen(root)) {
          const buatBtn = UIRenderer.createButton("buat", () => this.handleBuatPertanyaan(buatBtn, root, replyBtn));
          replyBtn.parentElement.insertBefore(buatBtn, replyBtn);
        }

        const cariBtn = UIRenderer.createButton("cari", () => this.handleCariJawaban(cariBtn, root, replyBtn));
        replyBtn.parentElement.insertBefore(cariBtn, replyBtn);
      });
    },

    init() {
      this.injectButtons();
      new MutationObserver(() => this.injectButtons()).observe(document.body, { childList: true, subtree: true });
    }
  };

  App.init();
})();
