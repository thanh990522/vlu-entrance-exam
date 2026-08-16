(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let vgMode='mcq-sample',vgRangeStart=1,clozeId=1,readingId=1,listeningTest=1,listeningPart='part1';
const localAudioUrls=new Map();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9£%]+/g,' ').trim();
const LISTEN_VISUAL_OPTIONS={
1:{1:['Monday','Tuesday','Thursday'],2:['sitting and talking on a sofa','food/buffet table','dancing with friends'],3:['rainy','sunny','mixed cloud/rain'],4:['12:30','1:00','1:30'],5:['driving lessons','money','a dress'],6:['shirt image A','shirt image B (Medium)','shirt image C'],7:['mobile-phone use','seat-belt use','80 km/h speed']},
2:{1:['pizza','cereal/porridge','fish and chips'],2:['time change 17:00 → 19:00','fast-food meal','cinema/movie'],3:['6:00','8:30','10:00'],4:['£120','£150','£180'],5:['football programme','garden/nature programme','police programme'],6:['Wednesday 21','Thursday 22','Friday 23'],7:['cooked breakfast/meal','sandwich','drinks/tea/coffee']},
3:{1:['June 30','July 7','July 8'],2:['illness/bed','presentation/speaking to an audience','money'],3:['use the website/online service','home visit/service person','computer/online form image C'],4:['garden-waste bag','load the bag into the car','mow the lawn'],5:['clothes','frozen foods','flowers'],6:['3:00','3:15','4:00'],7:['ticket office/station desk','platform/train','coach/bus']},
4:{1:['museum','gym/fitness equipment','swimming pool'],2:['train','car','coach/bus'],3:['apartments/high-rise','library','art gallery'],4:['membership calendar A','membership calendar B','membership calendar C'],5:['Monday 19','Tuesday 20','Wednesday 21'],6:['meeting/drink with a friend','gift/present','visiting/helping a person in a wheelchair'],7:['bagged food/snack','cheese','chocolate']},
5:{1:['tree','shed','gate'],2:['shorts','shoes','socks'],3:['Friday 23','Saturday 24','Sunday 25'],4:['plates','cups','fork and knife'],5:['wallet','phone','bank card'],6:['Greece','Italy','Spain'],7:['Platform 10','Platform 11','Platform 14']},
6:{1:['kitchen','bedroom/bed','armchair'],2:['bread','cheese','fruit'],3:['tennis','golf','cycling'],4:['sofa','rug/carpet','wardrobe'],5:['wind','rain','snow'],6:['hotel','swimming pool','taking photos'],7:['Wednesday 21','Thursday 22','Friday 23']},
7:{1:['12:30','1:30','3:30'],2:['car','motorbike','train'],3:['football','basketball','swimming'],4:['railway/train','roads/cars','airport/plane'],5:['7 people','18 people','30 people'],6:['coffee','tea','water'],7:['August 11','August 18','September 1']},
8:{1:['8:30','9:00','9:30'],2:['January','February','March'],3:["men's fashion shop",'online/laptop','market stall'],4:['£25','£15','£60'],5:['kettle','iron','microwave'],6:['museum/gallery','cinema','stadium'],7:['January 13','January 15','January 16']}
};

function normalizeSourceMCQ(stem,options){let q=String(stem||'').trim(),opts=[...(options||[])];if(!q&&opts[0]){const m=String(opts[0]).match(/^(.*?)\s+A\.\s*(.+)$/);if(m){q='A '+m[1].trim();opts[0]=m[2].trim();}}return{q,opts};}
function optionCardHtml(prefix,id,stem,options){const n=normalizeSourceMCQ(stem,options);return `<article class="instant-card" data-instant="${prefix}-${id}"><p class="iq"><b>Câu ${id}.</b> ${esc(n.q)}</p><div class="instant-options">${n.opts.map((o,i)=>{const L='ABCD'[i];return `<label class="instant-option" data-choice="${L}"><input type="radio" name="${prefix}_${id}" value="${L}"><b>${L}.</b><span>${esc(o)}</span></label>`}).join('')}</div><div class="instant-feedback"></div></article>`;}
function revealInstant(card,selected,correct,explanation,extra=''){
  $$('.instant-option',card).forEach(l=>{l.classList.remove('is-correct','is-wrong');if(l.dataset.choice===correct)l.classList.add('is-correct');if(l.dataset.choice===selected&&selected!==correct)l.classList.add('is-wrong');});
  const fb=$('.instant-feedback',card),ok=selected===correct;fb.className=`instant-feedback show ${ok?'good':'bad'}`;fb.innerHTML=`<b>${ok?'✓ Chính xác':'✗ Chưa đúng'} · Đáp án ${esc(correct)}</b><span class="rule">${esc(explanation)}</span>${extra}`;
}
function bindInstant(root,lookup,prefix){
  $$(`input[type=radio][name^="${prefix}_"]`,root).forEach(i=>i.onchange=()=>{const id=i.name.slice(prefix.length+1),q=lookup(id),card=i.closest('.instant-card');revealInstant(card,i.value,q.answer,q.explanation,q.extra||'');});
}

function grammarExplanation(q){
  const correct=q.options['ABCD'.indexOf(q.answer)]||'';const all=q.options.map(x=>String(x).toLowerCase());const stem=String(q.stem).toLowerCase();let topic='từ vựng và collocation',rule='Cần chọn từ/cụm từ vừa đúng nghĩa trong ngữ cảnh vừa kết hợp tự nhiên với các từ xung quanh.';
  if(all.some(x=>x.includes('article'))||all.every(x=>['a','an','the','no article','no articles','Ɵ/ Ɵ'].includes(x))){topic='mạo từ';rule='Dùng a/an với danh từ đếm được số ít chưa xác định, the khi đối tượng đã xác định/duy nhất, và zero article trong các trường hợp không dùng mạo từ.';}
  else if(all.every(x=>/^(in|on|at|for|with|under|over|after|up|to|through|about|of|by|from|into|upon|out of|during)$/.test(x))){topic='giới từ/cụm cố định';rule='Giới từ thường đi theo collocation cố định; cần đọc cả cụm thay vì dịch từng từ riêng lẻ.';}
  else if(all.some(x=>/\b(have|has|had|will|would|was|were|is|are|been|being)\b/.test(x))||/last|since|for \d|now|when|by this time|in the past|next/.test(stem)){topic='thì và sự hòa hợp thời gian';rule='Xác định mốc thời gian, hành động hoàn tất/đang diễn ra và quan hệ trước–sau giữa các hành động rồi mới chọn dạng động từ.';}
  else if(all.some(x=>/^to\s/.test(x))&&all.some(x=>/ing$/.test(x))){topic='V-ing / to-infinitive';rule='Một số động từ/cấu trúc yêu cầu V-ing, một số yêu cầu to + V; cần nhận diện động từ hoặc cụm đứng trước chỗ trống.';}
  else if(all.some(x=>/more|than|as .* as|better|best/.test(x))){topic='so sánh';rule='So sánh hơn dùng comparative + than; so sánh bằng dùng as + adjective/adverb + as; tránh dạng so sánh kép như “more better”.';}
  else if(all.some(x=>/said|taught|made|built|being|been/.test(x))&&stem.includes('by')){topic='câu bị động';rule='Bị động có dạng be + past participle; thì của be phải phù hợp với mốc thời gian của câu.';}
  else if(q.options.some(x=>/ly$/.test(x))&&q.options.some(x=>/(tion|ity|ness|ment)$/.test(x))){topic='từ loại';rule='Xác định vị trí cần danh từ, tính từ, trạng từ hay động từ dựa vào từ đứng trước/sau chỗ trống.';}
  return `Đáp án ${q.answer}: “${correct}”. Câu này kiểm tra ${topic}. ${rule} Trong câu này, phương án “${correct}” tạo cấu trúc/cụm từ phù hợp nhất; các lựa chọn còn lại không đáp ứng đồng thời yêu cầu ngữ pháp hoặc nghĩa của câu.`;
}
function renderVG(){
  const tabs=[['mcq-sample','Grammar & Vocabulary · Giải mẫu'],['mcq-practice','Grammar & Vocabulary · Tự luyện'],['cloze-sample','Cloze Text · Giải mẫu'],['cloze-practice','Cloze Text · Tự luyện']];
  $('#vgTabs').innerHTML=tabs.map(([id,label])=>`<button data-vgtab="${id}" class="${vgMode===id?'active':''}">${label}</button>`).join('');
  $$('[data-vgtab]').forEach(b=>b.onclick=()=>{vgMode=b.dataset.vgtab;if(vgMode==='mcq-sample')vgRangeStart=1;if(vgMode==='mcq-practice')vgRangeStart=51;if(vgMode==='cloze-sample')clozeId=1;if(vgMode==='cloze-practice')clozeId=3;renderVG();});
  if(vgMode.startsWith('mcq'))renderVGMCQ();else renderCloze();
}
function renderVGMCQ(){
  const sample=vgMode==='mcq-sample',lo=sample?1:51,hi=sample?50:200;const starts=[];for(let s=lo;s<=hi;s+=25)starts.push(s);if(vgRangeStart<lo||vgRangeStart>hi)vgRangeStart=lo;
  const qs=window.VG_REVIEW.mcq.filter(q=>q.id>=vgRangeStart&&q.id<=Math.min(vgRangeStart+24,hi));
  $('#vgContent').innerHTML=`<div class="range-tabs">${starts.map(s=>`<button data-range="${s}" class="${s===vgRangeStart?'active':''}">Câu ${s}–${Math.min(s+24,hi)}</button>`).join('')}</div><div class="review-grid">${qs.map(q=>optionCardHtml('vg',q.id,q.stem,q.options)).join('')}</div>`;
  $$('[data-range]').forEach(b=>b.onclick=()=>{vgRangeStart=Number(b.dataset.range);renderVGMCQ();});
  bindInstant($('#vgContent'),id=>{const q=window.VG_REVIEW.mcq.find(x=>String(x.id)===String(id));return{...q,explanation:grammarExplanation(q)};},'vg');
}
function renderCloze(){
  const group=vgMode==='cloze-sample'?'sample':'practice',texts=window.VG_REVIEW.cloze.filter(t=>t.group===group);if(!texts.some(t=>t.id===clozeId))clozeId=texts[0].id;const t=texts.find(x=>x.id===clozeId);
  $('#vgContent').innerHTML=`<div class="range-tabs">${texts.map(x=>`<button data-cloze="${x.id}" class="${x.id===clozeId?'active':''}">${esc(x.title)}</button>`).join('')}</div><section class="cloze-layout"><div class="review-passage"><h4>${esc(t.title)}</h4><p>${esc(t.passage)}</p></div><div class="review-questions">${t.questions.map((opts,i)=>optionCardHtml(`cloze${t.id}`,i+1,`Blank (${i+1})`,opts)).join('')}</div></section>`;
  $$('[data-cloze]').forEach(b=>b.onclick=()=>{clozeId=Number(b.dataset.cloze);renderCloze();});
  bindInstant($('#vgContent'),id=>{const i=Number(id)-1;return{answer:t.answers[i],explanation:`Đáp án ${t.answers[i]}: “${t.questions[i]['ABCD'.indexOf(t.answers[i])]}”. ${t.rules[i]}`};},`cloze${t.id}`);
}

function renderReadingReview(){
  $('#readingTabs').innerHTML=window.READING_REVIEW.map(t=>`<button data-reading="${t.id}" class="${t.id===readingId?'active':''}">Text ${t.id}</button>`).join('');
  $$('[data-reading]').forEach(b=>b.onclick=()=>{readingId=Number(b.dataset.reading);renderReadingReview();});
  const t=window.READING_REVIEW.find(x=>x.id===readingId);
  $('#readingReviewContent').innerHTML=`<section class="reading-review-layout"><div class="review-passage"><h4>${esc(t.title)}</h4><p>${esc(t.passage)}</p></div><div class="review-questions">${t.questions.map(q=>optionCardHtml(`read${t.id}`,q.id,q.stem,q.options)).join('')}</div></section>`;
  bindInstant($('#readingReviewContent'),id=>{const q=t.questions.find(x=>String(x.id)===String(id));const correct=q.options['ABCD'.indexOf(q.answer)];return{answer:q.answer,explanation:`Đáp án ${q.answer}: “${correct}”. Chi tiết trong bài đọc hỗ trợ đáp án này: ${q.evidence}`,extra:q.sourceMismatch?`<div class="source-mismatch"><b>Đối chiếu nguồn:</b> ${esc(q.sourceMismatch)}</div>`:''};},`read${t.id}`);
}

function expectedTrackName(test,part){const p1=['01','09','17','25','33','41','49','57'],p3=['03','11','19','27','35','43','51','59'];return `Track ${part==='part1'?p1[test-1]:p3[test-1]} TEST ${test} Part ${part==='part1'?'1':'3'}.mp3`;}
function attachLocalAudio(t){const key=`${t.test}-${listeningPart}`,audio=$('#listenAudio');if(localAudioUrls.has(key))audio.src=localAudioUrls.get(key);const input=$('#listenFile');input.onchange=()=>{const f=input.files?.[0];if(!f)return;if(localAudioUrls.has(key))URL.revokeObjectURL(localAudioUrls.get(key));const url=URL.createObjectURL(f);localAudioUrls.set(key,url);audio.src=url;audio.play().catch(()=>{});};}
function playListening(){const a=$('#listenAudio');if(a?.src)a.play().catch(()=>{});else $('#listenFile')?.click();}
function listenExplanation(t,q){const scriptNote=t.hasScript?'Test này thuộc bộ giải sửa mẫu có script/key đi kèm nên đáp án được đối chiếu với nguồn giải.':'Bộ tự luyện cung cấp audio, hình câu hỏi và key nhưng không kèm transcript đầy đủ; vì vậy phần giải thích không dựng thêm lời thoại ngoài nguồn.';return `Đáp án ${q.answer}. Phương án đúng trong nguồn tương ứng: ${q.correctDesc}. Câu này kiểm tra khả năng bắt một chi tiết trực tiếp như thời gian, địa điểm, đồ vật hoặc hành động. Khi nghe, hãy xác định từ khóa trong câu hỏi trước, sau đó đối chiếu chi tiết nghe được với ba hình A/B/C và loại hai hình có thông tin sai. ${scriptNote}`;}
function fillExplanation(q){const a=q.answer;let type='từ/cụm từ phù hợp với ngữ cảnh và cấu trúc câu';if(/\d|£/.test(a))type='thông tin số, ngày, giờ hoặc giá tiền';else if(/\s/.test(a))type='một cụm danh từ/cụm từ cố định';return `Đáp án: “${a}”. Ô trống này cần ${type}. Trước khi nghe, dùng phần trước và sau chỗ trống để dự đoán từ loại và dạng thông tin. Khi audio đến đúng ý, ghi chính xác từ/cụm từ nghe được rồi kiểm tra chính tả. Các dạng được chấp nhận trong key: ${(q.accepted||[a]).join(' / ')}.`;}
function renderListening(){
  $('#listeningTabs').innerHTML=window.LISTENING_REVIEW.map(t=>`<button data-ltest="${t.test}" class="${t.test===listeningTest?'active':''}">Test ${t.test}</button>`).join('');
  $$('[data-ltest]').forEach(b=>b.onclick=()=>{listeningTest=Number(b.dataset.ltest);listeningPart='part1';renderListening();});
  const t=window.LISTENING_REVIEW.find(x=>x.test===listeningTest),partLabel=listeningPart==='part1'?'1':'3';
  const inner=`<div class="inner-tabs"><button data-lpart="part1" class="${listeningPart==='part1'?'active':''}">Part 1 · Chọn hình</button><button data-lpart="part3" class="${listeningPart==='part3'?'active':''}">Part 3 · Điền từ</button></div>`;
  const toolbar=`<div class="listen-toolbar"><button class="audio-jump primary" id="playCurrent">▶ Phát Part ${partLabel}</button><label class="audio-jump filepick">📁 Chọn audio<input id="listenFile" type="file" accept="audio/*" hidden></label><audio id="listenAudio" controls preload="metadata"></audio><span class="asset-status">${esc(expectedTrackName(t.test,listeningPart))}</span></div>`;
  if(listeningPart==='part1'){
    const opts=LISTEN_VISUAL_OPTIONS[t.test]||{};
    $('#listeningContent').innerHTML=inner+toolbar+`<div class="listen-panel"><div class="listen-q-grid">${t.part1.map(q=>`<article class="instant-card" data-instant="listen-${q.id}"><p class="iq"><b>Câu ${q.id}.</b> ${esc(q.stem)}</p><div class="listen-choice-grid">${['A','B','C'].map((L,i)=>`<label class="instant-option" data-choice="${L}"><input type="radio" name="listen_${q.id}" value="${L}"><b>${L}.</b><span>${esc((opts[q.id]||[])[i]||('Hình '+L))}</span></label>`).join('')}</div><div class="instant-feedback"></div></article>`).join('')}</div></div>`;
    bindInstant($('#listeningContent'),id=>{const q=t.part1.find(x=>String(x.id)===String(id));return{answer:q.answer,explanation:listenExplanation(t,q)};},'listen');
  }else{
    $('#listeningContent').innerHTML=inner+toolbar+`<div class="listen-panel"><h4 style="margin:0;font:900 21px Nunito;color:#8d2b0c">${esc(t.part3Title)}</h4><div class="review-questions">${t.part3.map(q=>`<article class="fill-card" data-fill="${q.id}"><p><b>${q.id}.</b> ${esc(q.stem)}</p><div class="fill-row"><input type="text" placeholder="Nhập đáp án" data-fillinput="${q.id}"><button class="check-fill" data-checkfill="${q.id}">Kiểm tra</button></div><div class="instant-feedback"></div></article>`).join('')}</div></div>`;
    $$('[data-checkfill]').forEach(b=>b.onclick=()=>checkFill(t,Number(b.dataset.checkfill)));$$('[data-fillinput]').forEach(i=>{i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();checkFill(t,Number(i.dataset.fillinput));}};i.onchange=()=>checkFill(t,Number(i.dataset.fillinput));});
  }
  $$('[data-lpart]').forEach(b=>b.onclick=()=>{listeningPart=b.dataset.lpart;renderListening();});$('#playCurrent').onclick=playListening;attachLocalAudio(t);
}
function checkFill(t,id){const q=t.part3.find(x=>x.id===id),card=$(`[data-fill="${id}"]`),input=$(`[data-fillinput="${id}"]`,card),v=norm(input.value),ok=(q.accepted||[q.answer]).some(a=>norm(a)===v);const fb=$('.instant-feedback',card);fb.className=`instant-feedback show ${ok?'good':'bad'}`;fb.innerHTML=`<b>${ok?'✓ Chính xác':'✗ Chưa đúng'} · ${esc(q.answer)}</b><span class="rule">${esc(fillExplanation(q))}</span>`;input.style.borderColor=ok?'#65b887':'#e88980';}

function showReview(view){
  ['vgPage','readingReviewPage','listeningPage'].forEach(id=>$('#'+id)?.classList.remove('active'));
  $('#theoryPage')?.classList.remove('active');$('#testsPage')?.classList.remove('active');
  $$('.mainnav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='vg'){$('#vgPage')?.classList.add('active');renderVG();}
  if(view==='reading'){$('#readingReviewPage')?.classList.add('active');renderReadingReview();}
  if(view==='listening'){$('#listeningPage')?.classList.add('active');renderListening();}
}
function initReview(){
  $$('.mainnav button').forEach(b=>{const old=b.onclick;const v=b.dataset.view;if(['vg','reading','listening'].includes(v)){b.onclick=()=>showReview(v);}else{b.onclick=(e)=>{['vgPage','readingReviewPage','listeningPage'].forEach(id=>$('#'+id)?.classList.remove('active'));if(typeof old==='function')old.call(b,e);};}});
  renderVG();renderReadingReview();renderListening();showReview('vg');
}
document.addEventListener('DOMContentLoaded',initReview);
})();
