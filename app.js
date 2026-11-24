const STORAGE_KEY = 'ecoloop-prototype-v1';
const seed = {
  rate: 2,
  customerName: 'Mariana Costa',
  balance: 248,
  redemptions: [],
  refills: [
    {id:'R-2406',order:'ECO-2406',customer:'Mariana Costa',kind:'Cartucho',value:35,date:'2026-11-14',status:'credited',token:'ECO-2406-A8F2',points:70},
    {id:'R-2319',order:'ECO-2319',customer:'Mariana Costa',kind:'Toner',value:28,date:'2026-11-07',status:'credited',token:'ECO-2319-C4B1',points:56},
    {id:'R-2208',order:'ECO-2208',customer:'Mariana Costa',kind:'Cartucho',value:42,date:'2026-10-29',status:'credited',token:'ECO-2208-D9E3',points:84},
    {id:'R-2184',order:'ECO-2184',customer:'Mariana Costa',kind:'Cartucho',value:19,date:'2026-10-18',status:'credited',token:'ECO-2184-F7A2',points:38}
  ]
};
let state;
try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(seed); }
catch { state = structuredClone(seed); }
let currentMode = 'customer';
let currentQrId = null;
let cameraStream = null;
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const money = value => Number(value).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const pointsFor = value => Math.floor(Number(value) * Number(state.rate));
const earnedTotal = () => state.refills.filter(r=>r.status==='credited').reduce((sum,r)=>sum+r.points,0);
const dateBR = value => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).replace('.','');
function showMessage(title, body){ $('#message-title').textContent=title; $('#message-body').textContent=body; $('#message-dialog').showModal(); }
function statusLabel(status){ return ({credited:'Pontos creditados',delivered:'Entregue • aguardando QR',pending:'Aguardando entrega',redeemed:'Desconto utilizado'})[status] || status; }
function showPage(name){
  $$('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));
  $$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  const titles={inicio:currentMode==='admin'?'Painel Ecojet':'Seu ciclo RETINTA ECOJET',historico:'Meu extrato',resgatar:'Usar meus pontos',recargas:'Recargas e QR Codes',configuracoes:'Regras de pontos'};
  $('#page-title').textContent=titles[name]||'RETINTA ECOJET';
  if(name==='recargas') renderAdmin();
}
function setMode(mode){
  currentMode=mode;
  $$('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  $('#customer-nav').classList.toggle('hidden',mode!=='customer');
  $('#admin-nav').classList.toggle('hidden',mode!=='admin');
  $('#profile-name').textContent=mode==='customer'?state.customerName:'Equipe Ecojet';
  $('#profile-role').textContent=mode==='customer'?'Cliente RETINTA ECOJET':'Administrador';
  $('#profile .avatar');
  $('.avatar').textContent=mode==='customer'?state.customerName.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase():'EJ';
  showPage('inicio'); render();
}
function renderRecent(){
  const recent=state.refills.filter(r=>r.status==='credited').slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  $('#recent-list').innerHTML=recent.length?recent.map(r=>`<div class="activity-item"><span class="activity-icon">↻</span><span><strong>Recarga de ${r.kind.toLowerCase()}</strong><small>${dateBR(r.date)} · ${money(r.value)}</small></span><span class="points-earned">+${r.points} pts</span></div>`).join(''):'<p class="muted">Suas recargas confirmadas aparecerão aqui.</p>';
}
function renderHistory(){
  const items=[...state.refills.filter(r=>r.status==='credited').map(r=>({date:r.date,label:`Recarga de ${r.kind.toLowerCase()}`,value:money(r.value),points:`+${r.points}`,status:'Pontos creditados'})),...state.refills.filter(r=>r.status!=='credited').map(r=>({date:r.date,label:`Recarga de ${r.kind.toLowerCase()}`,value:money(r.value),points:'—',status:statusLabel(r.status)})),...state.redemptions.map(r=>({date:r.date,label:'Desconto na recarga',value:money(r.value),points:`−${r.points}`,status:'Desconto utilizado'}))].sort((a,b)=>b.date.localeCompare(a.date));
  $('#history-table').innerHTML=items.length?items.map(x=>`<tr><td>${dateBR(x.date)}</td><td><strong>${x.label}</strong></td><td>${x.value}</td><td class="${x.points.startsWith('+')?'positive':''}">${x.points}</td><td><span class="status ${x.status.includes('aguardando')?'pending':x.status.includes('Entregue')?'delivered':x.status.includes('utilizado')?'used':''}">${x.status}</span></td></tr>`).join(''):'<tr><td colspan="5">Nenhuma movimentação registrada.</td></tr>';
}
function renderAdmin(){
 const sorted=state.refills.slice().sort((a,b)=>b.date.localeCompare(a.date));
 $('#admin-total').textContent=state.refills.length;
 $('#admin-pending').textContent=state.refills.filter(r=>r.status==='pending').length;
 $('#admin-issued').textContent=earnedTotal().toLocaleString('pt-BR');
 $('#admin-table').innerHTML=sorted.length?sorted.map(r=>`<tr><td><strong>${r.customer}</strong><br><small>${r.order||r.id} · ${r.kind}</small></td><td>${money(r.value)}</td><td class="positive">${r.status==='credited'?`+${r.points} pts`:`${r.points} pts`}</td><td><span class="status ${r.status==='pending'?'pending':r.status==='delivered'?'delivered':''}">${statusLabel(r.status)}</span></td><td><button class="action-button" data-qr="${r.id}">Ver QR / detalhes</button></td></tr>`).join(''):'<tr><td colspan="5">Ainda não há recargas. Registre a primeira para gerar um QR Code.</td></tr>';
}
function render(){
 const balance=Number(state.balance)||0;
 $('#balance').innerHTML=`${balance.toLocaleString('pt-BR')} <small>pts</small>`;
 $('#balance-value').textContent=money(balance/100);
 $('#history-balance').textContent=`${balance.toLocaleString('pt-BR')} pts`;
 $('#redeem-balance').innerHTML=`${balance.toLocaleString('pt-BR')} <small>pontos</small>`;
 $('#refill-count').textContent=state.refills.filter(r=>r.status==='credited').length;
 const next=300-(balance%300); $('#next-benefit').innerHTML=`${next===300?0:next} <small>pts</small>`;
 $('#progress-fill').style.width=`${Math.min(100,(balance%300)/300*100)}%`;
 $('#discount-value').textContent=money(Math.floor(balance/100));
 $('#redeem-explainer').textContent=balance>=100?'Você já pode transformar seus pontos em desconto.':'Acumule mais pontos até completar 100 para resgatar R$ 1,00.';
 $('#redeem-button').disabled=balance<100; $('#redeem-button').style.opacity=balance<100?'.55':'1';
 renderRecent();renderHistory();renderAdmin();
 const deliveryQr=$('#delivery-qr');
 if(deliveryQr){deliveryQr.innerHTML='';if(window.QRCode)new QRCode(deliveryQr,{text:'RETINTA ECOJET:DEMO-ILUSTRATIVA',width:48,height:48,colorDark:'#173a25',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});else deliveryQr.innerHTML='<span class="qr-fallback">QR</span>';}
 $('#points-rate').value=state.rate; $('#rate-example').textContent=`${(50*state.rate).toLocaleString('pt-BR')} pontos`;
}
function openQr(id){
 const refill=state.refills.find(r=>r.id===id); if(!refill)return;
 currentQrId=id; $('#qr-title').textContent=refill.order||refill.id; $('#qr-subtitle').textContent=`${refill.customer} · ${refill.kind} · ${money(refill.value)} · ${refill.points} pontos previstos`;
 $('#qr-token').textContent=refill.token; $('#manual-token').value=''; $('#qr-code').innerHTML='';
 if(window.QRCode) new QRCode($('#qr-code'),{text:`RETINTA ECOJET:${refill.token}`,width:164,height:164,colorDark:'#173a25',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
 else $('#qr-code').innerHTML='<div class="qr-fallback">QR Code será exibido quando houver conexão.</div>';
 $('#print-order').textContent=refill.order||refill.id; $('#print-points').textContent=`${refill.points} pontos RETINTA ECOJET`; $('#print-token').textContent=refill.token; $('#print-qr-code').innerHTML='';
 const delivered=refill.status==='delivered'||refill.status==='credited';
 $('#deliver-button').classList.toggle('hidden',delivered); $('#simulate-scan').classList.toggle('hidden',refill.status==='credited'); $('#scan-camera').classList.toggle('hidden',refill.status==='credited'); $('.manual-scan').classList.toggle('hidden',refill.status==='credited');
 $('#qr-status').textContent=refill.status==='credited'?'QR já utilizado. Os pontos foram creditados uma única vez.':delivered?'Entrega confirmada. O cliente já pode escanear o QR Code.':'A pontuação só será liberada depois que a entrega for marcada como concluída.';
 $('#qr-dialog').showModal();
}
function confirmScan(input){
 const token=String(input||'').trim().replace(/^(?:RETINTA(?:\s+ECOJET)?|ECOLOOP):/i,'');
 const refill=state.refills.find(r=>r.token.toLowerCase()===token.toLowerCase());
 if(!refill){showMessage('Código não encontrado','Confira o código do QR Code e tente novamente.');return false;}
 if(refill.status==='credited'){showMessage('QR Code já utilizado','Este pedido já recebeu pontos. Cada código pode ser usado uma única vez.');return false;}
 if(refill.status!=='delivered'){showMessage('Entrega ainda não confirmada','Os pontos serão liberados após a Ecojet marcar o pedido como entregue.');return false;}
 refill.status='credited'; refill.creditedAt=new Date().toISOString().slice(0,10); state.balance+=refill.points; save(); render();
 if($('#qr-dialog').open) $('#qr-dialog').close(); if($('#customer-scan-dialog').open) $('#customer-scan-dialog').close(); showMessage('Pontos adicionados!',`${refill.points} pontos da recarga ${refill.order||refill.id} entraram no saldo de ${refill.customer}.`); return true;
}
function markDelivered(){const r=state.refills.find(x=>x.id===currentQrId);if(!r||r.status!=='pending')return;r.status='delivered';save();render();openQr(r.id);}
function createRefill(form){
 const data=new FormData(form), value=Number(data.get('value'));
 if(!Number.isFinite(value)||value<=0)return;
 const id=`R-${Date.now().toString().slice(-6)}`; const order=String(data.get('order')||`ECO-${id.slice(2)}`).trim();
 const refill={id,order,customer:String(data.get('customer')).trim(),kind:String(data.get('kind')),value,date:new Date().toISOString().slice(0,10),status:'pending',token:`${order.replace(/[^a-z0-9]/gi,'').toUpperCase()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`,points:pointsFor(value)};
 state.refills.unshift(refill); save(); render(); $('#refill-dialog').close(); form.reset();openQr(id);
}
$$('.mode').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
$('#open-customer-scan').addEventListener('click',()=>$('#customer-scan-dialog').showModal());
$('#customer-confirm').addEventListener('click',()=>confirmScan($('#customer-token').value));
$('#customer-token').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();confirmScan(e.currentTarget.value)}});
$('#scan-camera-customer').addEventListener('click',async()=>startCamera($('#customer-camera')));
$$('.nav-link').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.go)));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('#new-refill').addEventListener('click',()=>$('#refill-dialog').showModal());
$('#refill-form').addEventListener('submit',e=>{e.preventDefault();createRefill(e.currentTarget)});
$('#admin-table').addEventListener('click',e=>{const btn=e.target.closest('[data-qr]');if(btn)openQr(btn.dataset.qr)});
$('#deliver-button').addEventListener('click',markDelivered);
$('#simulate-scan').addEventListener('click',()=>{const refill=state.refills.find(r=>r.id===currentQrId);if(refill)confirmScan(refill.token)});
$('#manual-confirm').addEventListener('click',()=>confirmScan($('#manual-token').value));
$('#manual-token').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();confirmScan(e.currentTarget.value)}});
$('#print-label-button').addEventListener('click',()=>{
 const width=Number($('#label-width').value),height=Number($('#label-height').value);
 if(!Number.isFinite(width)||width<45||width>108||!Number.isFinite(height)||height<26||height>250){showMessage('Medidas fora do limite','Para este layout, informe largura de 45 a 108 mm e altura de 26 a 250 mm. Confira as dimensões da etiqueta carregada na Zebra GC420.');return}
 if(!window.QRCode){showMessage('QR Code indisponível','Conecte-se à internet para carregar a biblioteca que gera o QR Code antes de imprimir.');return}
 $('#print-qr-code').innerHTML='';
 new QRCode($('#print-qr-code'),{text:`RETINTA ECOJET:${state.refills.find(r=>r.id===currentQrId)?.token||''}`,width:220,height:220,colorDark:'#000000',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
 document.documentElement.style.setProperty('--label-width',`${width}mm`);
 document.documentElement.style.setProperty('--label-height',`${height}mm`);
 $('#print-page-style').textContent=`@page { size: ${width}mm ${height}mm; margin: 0; }`;
 window.print();
});
window.addEventListener('afterprint',()=>{document.documentElement.style.removeProperty('--label-width');document.documentElement.style.removeProperty('--label-height')});
$('#points-rate').addEventListener('input',e=>{$('#rate-example').textContent=`${(50*(Number(e.target.value)||0)).toLocaleString('pt-BR')} pontos`});
$('#save-settings').addEventListener('click',()=>{const n=Math.floor(Number($('#points-rate').value));if(!Number.isFinite(n)||n<1||n>1000){$('#settings-notice').textContent='Informe uma taxa inteira entre 1 e 1.000 pontos.';return}state.rate=n;save();render();$('#settings-notice').textContent='Configuração atualizada. Será aplicada às novas recargas.'});
$('#reset-demo').addEventListener('click',()=>{if(!window.confirm('Restaurar os dados fictícios iniciais? As alterações e recargas desta demonstração serão apagadas.'))return;state=structuredClone(seed);save();render();$('#settings-notice').textContent='Dados fictícios restaurados. O protótipo está pronto para uma nova demonstração.'});
$('#redeem-button').addEventListener('click',()=>{const points=Math.floor(state.balance/100)*100;if(points<100)return;const value=points/100;state.balance-=points;state.redemptions.unshift({date:new Date().toISOString().slice(0,10),points,value});save();render();showMessage('Resgate demonstrativo',`${points} pontos foram trocados por ${money(value)} em desconto demonstrativo. Este protótipo não cria um cupom fiscal.`)});
$('#scan-camera').addEventListener('click',async()=>{
 const video=$('#camera-view');
 if(!('BarcodeDetector'in window)){showMessage('Câmera indisponível neste navegador','Use o campo de código único. A leitura por câmera depende do suporte do navegador e de acesso seguro (HTTPS ou localhost).');return}
 try{const detector=new BarcodeDetector({formats:['qr_code']});cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});video.srcObject=cameraStream;video.style.display='block';await video.play();const scan=async()=>{if(!$('#qr-dialog').open)return;try{const codes=await detector.detect(video);if(codes.length){confirmScan(codes[0].rawValue);stopCamera();return}}catch{}requestAnimationFrame(scan)};scan()}catch{showMessage('Não foi possível abrir a câmera','Confira a permissão de câmera do navegador ou confirme o código manualmente.')}
});
function stopCamera(){if(cameraStream)cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;$('#camera-view').style.display='none';$('#customer-camera').style.display='none'}
async function startCamera(video){
 if(!('BarcodeDetector'in window)){showMessage('Câmera indisponível neste navegador','Use o campo de código único. A leitura por câmera depende do suporte do navegador e de acesso seguro (HTTPS ou localhost).');return}
 try{const detector=new BarcodeDetector({formats:['qr_code']});cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});video.srcObject=cameraStream;video.style.display='block';await video.play();const scan=async()=>{if(!video.closest('dialog').open)return;try{const codes=await detector.detect(video);if(codes.length){confirmScan(codes[0].rawValue);stopCamera();return}}catch{}requestAnimationFrame(scan)};scan()}catch{showMessage('Não foi possível abrir a câmera','Confira a permissão de câmera do navegador ou confirme o código manualmente.')}
}
$$('dialog').forEach(d=>d.addEventListener('close',stopCamera));
render();
