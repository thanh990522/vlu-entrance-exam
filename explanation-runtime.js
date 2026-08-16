(()=>{
const $=(s,r=document)=>r.querySelector(s);
function setRule(card,text){const rule=$('.instant-feedback .rule',card);if(rule)rule.textContent=text;}
function activeListeningTest(){const b=$('[data-ltest].active');return b?Number(b.dataset.ltest):1;}
function listeningTarget(stem){
  const s=String(stem||'').toLowerCase();
  if(s.includes('what time')||s.startsWith('when ')||s.includes('which day'))return 'mốc thời gian/ngày';
  if(s.includes('how much'))return 'giá tiền';
  if(s.includes('what size'))return 'kích cỡ';
  if(s.includes('weather'))return 'đặc điểm thời tiết';
  if(s.includes('where'))return 'địa điểm';
  if(s.includes('which programme'))return 'chương trình cụ thể';
  return 'vật, hoạt động hoặc chi tiết cụ thể được hỏi';
}
function listeningMCQExplanation(t,q){
  const target=listeningTarget(q.stem);
  const source=t.hasScript
    ? 'Test này có script/key trong bộ nguồn nên đáp án được đối chiếu với phần giải.'
    : 'Bộ nguồn của test này không có transcript đầy đủ, nên website không tự dựng câu thoại; đáp án được giữ theo hình và key nguồn.';
  return `Đáp án ${q.answer}: ${q.correctDesc}. Câu “${q.stem}” yêu cầu xác định ${target}. Vì vậy khi nghe cần giữ đúng keyword của câu hỏi và chờ chi tiết cuối cùng khớp với hình ${q.answer}. Hai hình còn lại là distractors. Đặc biệt chú ý các tín hiệu sửa/đổi ý như “but”, “actually”, “instead”, “no, I mean…”, vì thông tin được nhắc đầu tiên chưa chắc là đáp án cuối. ${source}`;
}
function fillExplanation(q){
  const a=q.answer,stem=String(q.stem||'');let rule='';
  if(/to get your work/i.test(stem)&&a==='published') rule='Cấu trúc causative là “get + object + past participle”: get your work published = làm cho tác phẩm được xuất bản.';
  else if(/as they were/i.test(stem)&&/^cancel/i.test(a)) rule='Sau “were” cần past participle để tạo passive voice: were cancelled = đã bị hủy.';
  else if(/with \(\d+\).*problems/i.test(stem)&&/al$/.test(a)) rule=`Sau “with” và trước danh từ “problems” cần tính từ bổ nghĩa; “${a}” là adjective phù hợp.`;
  else if(/we.?re \(\d+\)/i.test(stem)&&/ing$/.test(a)) rule=`Sau “we’re” cần phần bổ sung cho hoạt động/trạng thái; “${a}” ở dạng V-ing tạo cụm đúng trong ngữ cảnh.`;
  else if(/your \(\d+\)/i.test(stem)) rule=`Sau possessive “your” cần noun/noun phrase; “${a}” đúng từ loại và đúng nghĩa của mệnh đề phía sau.`;
  else if(/\(\d+\).*and streets/i.test(stem)) rule=`Chỗ trống song song với danh từ số nhiều “streets”, nên “${a}” phải là danh từ chỉ địa điểm số nhiều phù hợp về nghĩa.`;
  else if(/\d|£/.test(a)||/\b(am|pm)\b/i.test(a)) rule=`Đây là câu nghe lấy thông tin số/thời gian; phải ghi chính xác “${a}”. Dạng này thường có distractor là một con số/giờ được nhắc trước rồi bị sửa lại.`;
  else if(/\s/.test(a)) rule=`Đáp án là cả cụm “${a}”; cần giữ đủ các content words vì bỏ một thành tố có thể làm sai collocation hoặc nghĩa của câu.`;
  else rule=`“${a}” khớp từ loại và nghĩa của vị trí trống trong câu “${stem}”. Hãy dùng từ đứng ngay trước/sau chỗ trống để dự đoán noun/adjective/verb trước khi nghe.`;
  return `Đáp án: “${a}”. ${rule} Các dạng được nguồn chấp nhận: ${(q.accepted||[a]).join(' / ')}.`;
}
function updateGrammar(input){
  const m=input.name.match(/^vg_(\d+)$/);if(!m)return;
  const text=window.VG_EXPLANATIONS?.[m[1]];if(!text)return;
  setRule(input.closest('.instant-card'),text);
}
function updateListeningMCQ(input){
  const m=input.name.match(/^listen_(\d+)$/);if(!m||!window.LISTENING_REVIEW)return;
  const t=window.LISTENING_REVIEW.find(x=>x.test===activeListeningTest());
  const q=t?.part1.find(x=>String(x.id)===m[1]);if(!q)return;
  setRule(input.closest('.instant-card'),listeningMCQExplanation(t,q));
}
function updateFill(el){
  const card=el.closest('.fill-card');if(!card||!window.LISTENING_REVIEW)return;
  const id=Number(card.dataset.fill),t=window.LISTENING_REVIEW.find(x=>x.test===activeListeningTest()),q=t?.part3.find(x=>x.id===id);if(!q)return;
  setTimeout(()=>setRule(card,fillExplanation(q)),0);
}
document.addEventListener('change',e=>{
  if(e.target.matches('input[type=radio][name^="vg_"]')) setTimeout(()=>updateGrammar(e.target),0);
  if(e.target.matches('input[type=radio][name^="listen_"]')) setTimeout(()=>updateListeningMCQ(e.target),0);
  if(e.target.matches('[data-fillinput]')) updateFill(e.target);
});
document.addEventListener('click',e=>{const b=e.target.closest('[data-checkfill]');if(b)updateFill(b);});
})();