(()=>{
const X=[0,50,100],Y=[0,16.6667,33.3333,50,66.6667,83.3333,100];
function applyRealListeningImages(){
  const root=document.querySelector('#listeningContent');
  const active=document.querySelector('#listeningTabs [data-ltest].active');
  if(!root||!active||!root.querySelector('[data-instant^="listen-"]'))return;
  const test=Number(active.dataset.ltest),sprite=window.LISTENING_IMAGE_SPRITES?.[test];
  if(!sprite)return;
  root.querySelectorAll('[data-instant^="listen-"]').forEach(card=>{
    const q=Number(card.dataset.instant.split('-')[1]);
    card.querySelectorAll('.instant-option').forEach(label=>{
      const c='ABC'.indexOf(label.dataset.choice),span=label.querySelector('span');
      if(!span||c<0||q<1||q>7||span.querySelector('.listening-real-img'))return;
      span.textContent='';
      const img=document.createElement('div');
      img.className='listening-real-img';
      img.setAttribute('role','img');
      img.setAttribute('aria-label',`Hình ${label.dataset.choice} câu ${q}`);
      img.style.backgroundImage=`url("${sprite.src}")`;
      img.style.backgroundSize='300% 700%';
      img.style.backgroundPosition=`${X[c]}% ${Y[q-1]}%`;
      span.appendChild(img);
    });
  });
}
const style=document.createElement('style');
style.textContent=`
.listen-choice-grid .instant-option span{display:block;width:100%;min-width:0}
.listening-real-img{width:100%;max-width:210px;aspect-ratio:96/76;margin:8px auto 2px;background-repeat:no-repeat;border:1px solid #ead8cc;border-radius:10px;background-color:#fff;box-shadow:0 2px 8px rgba(97,46,16,.08)}
.listen-choice-grid .instant-option{align-items:flex-start;overflow:hidden}
@media(max-width:700px){.listening-real-img{max-width:170px}.listen-choice-grid{grid-template-columns:1fr 1fr 1fr}}
`;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded',()=>{
  applyRealListeningImages();
  const root=document.querySelector('#listeningContent');
  if(root)new MutationObserver(()=>requestAnimationFrame(applyRealListeningImages)).observe(root,{childList:true,subtree:true});
  document.addEventListener('click',e=>{if(e.target.closest('[data-ltest],[data-lpart],[data-view="listening"]'))setTimeout(applyRealListeningImages,0);});
});
})();
