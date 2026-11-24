const STORAGE_KEY = 'ecoloop-prototype-v1';
const seed = {
  rate: 2,
  customers: [
    {id:'CLI-0001',name:'Mariana Costa',createdAt:'2026-11-14'},
    {id:'CLI-0002',name:'Rafael Lima',createdAt:'2026-11-14'}
  ],
  selectedCustomerId: 'CLI-0001',
  operators: [{id:'OP-0001',name:'Equipe de demonstração'}],
  activeOperatorId: 'OP-0001',
  redemptions: [],
  refills: [
    {id:'R-2406',order:'ECO-2406',customerId:'CLI-0001',customer:'Mariana Costa',kind:'Cartucho',value:35,date:'2026-11-14',status:'credited',token:'ECO-2406-A8F2',points:70,createdBy:{name:'Registro demonstrativo anterior'}},
    {id:'R-2319',order:'ECO-2319',customerId:'CLI-0001',customer:'Mariana Costa',kind:'Toner',value:28,date:'2026-11-07',status:'credited',token:'ECO-2319-C4B1',points:56,createdBy:{name:'Registro demonstrativo anterior'}},
    {id:'R-2208',order:'ECO-2208',customerId:'CLI-0001',customer:'Mariana Costa',kind:'Cartucho',value:42,date:'2026-10-29',status:'credited',token:'ECO-2208-D9E3',points:84,createdBy:{name:'Registro demonstrativo anterior'}},
    {id:'R-2184',order:'ECO-2184',customerId:'CLI-0001',customer:'Mariana Costa',kind:'Cartucho',value:19,date:'2026-10-18',status:'credited',token:'ECO-2184-F7A2',points:38,createdBy:{name:'Registro demonstrativo anterior'}}
  ]
};
let state;
try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(seed); }
catch { state = structuredClone(seed); }
function migrateState(){
  state={...structuredClone(seed),...state};
  if(!Array.isArray(state.customers)||!state.customers.length)state.customers=structuredClone(seed.customers);
  if(!Array.isArray(state.operators)||!state.operators.length)state.operators=structuredClone(seed.operators);
  if(!state.activeOperatorId||!state.operators.some(o=>o.id===state.activeOperatorId))state.activeOperatorId=state.operators[0].id;
  state.redemptions=Array.isArray(state.redemptions)?state.redemptions:[];
  state.refills=Array.isArray(state.refills)?state.refills:[];
  for(const refill of state.refills){
    let customer=state.customers.find(c=>c.id===refill.customerId)||state.customers.find(c=>c.name.toLowerCase()===String(refill.customer||'').toLowerCase());
    if(!customer){customer={id:`CLI-${Date.now()}-${state.customers.length}`,name:refill.customer||'Cliente demonstrativo',createdAt:refill.date};state.customers.push(customer);}
    refill.customerId=customer.id;refill.customer=customer.name;
    refill.createdBy=refill.createdBy||{name:'Registro demonstrativo anterior'};
  }
  state.selectedCustomerId=state.selectedCustomerId||state.customers[0]?.id;
  if(!state.customers.some(c=>c.id===state.selectedCustomerId))state.selectedCustomerId=state.customers[0]?.id;
  for(const redemption of state.redemptions){redemption.customerId=redemption.customerId||state.selectedCustomerId;redemption.operator=redemption.operator||{name:'Resgate demonstrativo anterior'};}
}
migrateState();
let currentMode = 'customer';
let currentQrId = null;
let cameraStream = null;
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const money = value => Number(value).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const pointsFor = value => Math.floor(Number(value) * Number(state.rate));
const earnedTotal = () => state.refills.filter(r=>r.status==='credited').reduce((sum,r)=>sum+r.points,0);
const activeCustomer = () => state.customers.find(c=>c.id===state.selectedCustomerId)||state.customers[0];
const activeOperator = () => state.operators.find(o=>o.id===state.activeOperatorId)||state.operators[0];
const balanceFor = customerId => state.refills.filter(r=>r.customerId===customerId&&r.status==='credited').reduce((sum,r)=>sum+r.points,0)-state.redemptions.filter(r=>r.customerId===customerId).reduce((sum,r)=>sum+r.points,0);
const escapeHtml = value => String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const operatorName = entry => entry?.name||'Não identificado (registro anterior)';
const dateBR = value => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).replace('.','');
function showMessage(title, body){ $('#message-title').textContent=title; $('#message-body').textContent=body; $('#message-dialog').showModal(); }
function statusLabel(status){ return ({credited:'Pontos creditados',delivered:'Entregue • aguardando QR',pending:'Aguardando entrega',redeemed:'Desconto utilizado'})[status] || status; }
function showPage(name){
  $$('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));
  $$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  const titles={inicio:currentMode==='admin'?'Painel Ecojet':'Seu ciclo RETINTA ECOJET',historico:'Meu extrato',resgatar:'Usar meus pontos',clientes:'Cadastro e histórico de clientes',recargas:'Recargas e QR Codes',configuracoes:'Regras de pontos e operadores'};
  $('#page-title').textContent=titles[name]||'RETINTA ECOJET';
  if(name==='recargas') renderAdmin();
  if(name==='clientes') renderCustomers();
}
function setMode(mode){
  currentMode=mode;
  $$('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  $('#customer-nav').classList.toggle('hidden',mode!=='customer');
  $('#admin-nav').classList.toggle('hidden',mode!=='admin');
  const customer=activeCustomer();
  $('#customer-switcher-wrap').classList.toggle('hidden',mode!=='customer');
  $('#profile-name').textContent=mode==='customer'?(customer?.name||'Cliente'):'Equipe Ecojet';
  $('#profile-role').textContent=mode==='customer'?'Cliente RETINTA ECOJET':'Administrador';
  $('.avatar').textContent=mode==='customer'?(customer?.name||'C').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase():'EJ';
  showPage('inicio'); render();
}
function renderRecent(){
  const customer=activeCustomer();
  const recent=state.refills.filter(r=>r.customerId===customer?.id&&r.status==='credited').slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  $('#recent-list').innerHTML=recent.length?recent.map(r=>`<div class="activity-item"><span class="activity-icon">↻</span><span><strong>Recarga de ${r.kind.toLowerCase()}</strong><small>${dateBR(r.date)} · ${money(r.value)}</small></span><span class="points-earned">+${r.points} pts</span></div>`).join(''):'<p class="muted">Suas recargas confirmadas aparecerão aqui.</p>';
}
function renderHistory(){
  const customer=activeCustomer();
  const items=[...state.refills.filter(r=>r.customerId===customer?.id&&r.status==='credited').map(r=>({date:r.date,label:`Recarga de ${r.kind.toLowerCase()}`,value:money(r.value),points:`+${r.points}`,status:'Pontos creditados'})),...state.refills.filter(r=>r.customerId===customer?.id&&r.status!=='credited').map(r=>({date:r.date,label:`Recarga de ${r.kind.toLowerCase()}`,value:money(r.value),points:'—',status:statusLabel(r.status)})),...state.redemptions.filter(r=>r.customerId===customer?.id).map(r=>({date:r.date,label:'Desconto na recarga',value:money(r.value),points:`−${r.points}`,status:'Desconto utilizado'}))].sort((a,b)=>b.date.localeCompare(a.date));
  $('#history-table').innerHTML=items.length?items.map(x=>`<tr><td>${dateBR(x.date)}</td><td><strong>${x.label}</strong></td><td>${x.value}</td><td class="${x.points.startsWith('+')?'positive':''}">${x.points}</td><td><span class="status ${x.status.includes('aguardando')?'pending':x.status.includes('Entregue')?'delivered':x.status.includes('utilizado')?'used':''}">${x.status}</span></td></tr>`).join(''):'<tr><td colspan="5">Nenhuma movimentação registrada.</td></tr>';
}
function renderAdmin(){
 const sorted=state.refills.slice().sort((a,b)=>b.date.localeCompare(a.date));
 $('#admin-total').textContent=state.refills.length;
 $('#admin-pending').textContent=state.refills.filter(r=>r.status==='pending').length;
 $('#admin-issued').textContent=earnedTotal().toLocaleString('pt-BR');
 $('#admin-table').innerHTML=sorted.length?sorted.map(r=>`<tr><td><strong>${escapeHtml(customerById(r.customerId)?.name||r.customer)}</strong><br><small>${escapeHtml(r.order||r.id)} · ${escapeHtml(r.kind)}</small></td><td>${money(r.value)}</td><td class="positive">${r.status==='credited'?`+${r.points} pts`:`${r.points} pts`}</td><td><span class="status ${r.status==='pending'?'pending':r.status==='delivered'?'delivered':''}">${statusLabel(r.status)}</span></td><td><small>Cadastro: ${escapeHtml(operatorName(r.createdBy))}<br>Entrega: ${escapeHtml(operatorName(r.deliveredBy))}</small><br><button class="action-button" data-qr="${r.id}">Ver QR / detalhes</button></td></tr>`).join(''):'<tr><td colspan="5">Ainda não há recargas. Registre a primeira para gerar um QR Code.</td></tr>';
}
const customerById=id=>state.customers.find(c=>c.id===id);
function renderCustomers(){
 const term=($('#customer-search')?.value||'').trim().toLocaleLowerCase('pt-BR');
 const customers=state.customers.filter(c=>!term||c.name.toLocaleLowerCase('pt-BR').includes(term)||c.id.toLowerCase().includes(term)).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
 $('#customer-table').innerHTML=customers.length?customers.map(c=>`<tr><td><code>${escapeHtml(c.id)}</code></td><td><strong>${escapeHtml(c.name)}</strong></td><td>${state.refills.filter(r=>r.customerId===c.id).length}</td><td class="positive">${balanceFor(c.id).toLocaleString('pt-BR')} pts</td><td><button class="action-button" data-customer="${escapeHtml(c.id)}">Ver histórico</button></td></tr>`).join(''):'<tr><td colspan="5">Nenhum cliente encontrado.</td></tr>';
 const select=$('#refill-customer');
 if(select){const selected=select.value;select.innerHTML=state.customers.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>`<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)} · ${escapeHtml(c.id)}</option>`).join('');if(state.customers.some(c=>c.id===selected))select.value=selected;}
 const customerSelect=$('#customer-switcher');
 if(customerSelect){customerSelect.innerHTML=state.customers.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>`<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join('');customerSelect.value=state.selectedCustomerId;}
 const operatorSelect=$('#active-operator');
 if(operatorSelect){operatorSelect.innerHTML=state.operators.map(o=>`<option value="${escapeHtml(o.id)}">${escapeHtml(o.name)}</option>`).join('');operatorSelect.value=state.activeOperatorId;}
}
function showCustomerDetail(id){
 const customer=customerById(id);if(!customer)return;
 const detail=$('#customer-detail');detail.classList.remove('hidden');$('#customer-detail-name').textContent=customer.name;$('#customer-detail-code').textContent=`Código ${customer.id}`;$('#customer-detail-balance').textContent=`${balanceFor(id).toLocaleString('pt-BR')} pontos`;
 const movements=[...state.refills.filter(r=>r.customerId===id).map(r=>({date:r.date,label:`Recarga ${r.order||r.id} · ${r.kind}`,value:money(r.value),points:r.status==='credited'?`+${r.points}`:'—',status:statusLabel(r.status),operator:r.deliveredBy?`${operatorName(r.createdBy)} / ${operatorName(r.deliveredBy)}`:operatorName(r.createdBy)})),...state.redemptions.filter(r=>r.customerId===id).map(r=>({date:r.date,label:'Resgate de pontos',value:money(r.value),points:`−${r.points}`,status:'Desconto utilizado',operator:operatorName(r.operator)}))].sort((a,b)=>b.date.localeCompare(a.date));
 $('#customer-detail-history').innerHTML=movements.length?movements.map(m=>`<tr><td>${dateBR(m.date)}</td><td>${escapeHtml(m.label)}</td><td>${m.value}</td><td>${escapeHtml(m.points)}</td><td>${escapeHtml(m.status)}</td><td>${escapeHtml(m.operator)}</td></tr>`).join(''):'<tr><td colspan="6">Este cliente ainda não tem movimentações.</td></tr>';
}
function render(){
 const customer=activeCustomer();const balance=balanceFor(customer?.id);
 $('#welcome-customer').textContent=customer?.name.split(' ')[0]||'Cliente';
 $('#profile-name').textContent=currentMode==='customer'?(customer?.name||'Cliente'):'Equipe Ecojet';
 $('.avatar').textContent=currentMode==='customer'?(customer?.name||'C').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase():'EJ';
 $('#customer-switcher-wrap').classList.toggle('hidden',currentMode!=='customer');
 $('#balance').innerHTML=`${balance.toLocaleString('pt-BR')} <small>pts</small>`;
 $('#balance-value').textContent=money(balance/100);
 $('#history-balance').textContent=`${balance.toLocaleString('pt-BR')} pts`;
 $('#redeem-balance').innerHTML=`${balance.toLocaleString('pt-BR')} <small>pontos</small>`;
 $('#refill-count').textContent=state.refills.filter(r=>r.customerId===customer?.id&&r.status==='credited').length;
 const next=300-(balance%300); $('#next-benefit').innerHTML=`${next===300?0:next} <small>pts</small>`;
 $('#progress-fill').style.width=`${Math.min(100,(balance%300)/300*100)}%`;
 $('#discount-value').textContent=money(Math.floor(balance/100));
 $('#redeem-explainer').textContent=balance>=100?'Você já pode transformar seus pontos em desconto.':'Acumule mais pontos até completar 100 para resgatar R$ 1,00.';
 $('#redeem-button').disabled=balance<100; $('#redeem-button').style.opacity=balance<100?'.55':'1';
 renderRecent();renderHistory();renderAdmin();
 renderCustomers();
 const deliveryQr=$('#delivery-qr');
 if(deliveryQr){deliveryQr.innerHTML='';if(window.QRCode)new QRCode(deliveryQr,{text:'RETINTA ECOJET:DEMO-ILUSTRATIVA',width:48,height:48,colorDark:'#173a25',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});else deliveryQr.innerHTML='<span class="qr-fallback">QR</span>';}
 $('#points-rate').value=state.rate; $('#rate-example').textContent=`${(50*state.rate).toLocaleString('pt-BR')} pontos`;
}
function openQr(id){
 const refill=state.refills.find(r=>r.id===id); if(!refill)return;
 currentQrId=id; $('#qr-title').textContent=refill.order||refill.id; $('#qr-subtitle').textContent=`${customerById(refill.customerId)?.name||refill.customer} · ${refill.kind} · ${money(refill.value)} · ${refill.points} pontos previstos · Cadastro: ${operatorName(refill.createdBy)}${refill.deliveredBy?` · Entrega: ${operatorName(refill.deliveredBy)}`:''}`;
 $('#qr-token').textContent=refill.token; $('#manual-token').value=''; $('#qr-code').innerHTML='';
 if(window.QRCode) new QRCode($('#qr-code'),{text:`RETINTA ECOJET:${refill.token}`,width:164,height:164,colorDark:'#173a25',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
 else $('#qr-code').innerHTML='<div class="qr-fallback">QR Code será exibido quando houver conexão.</div>';
 $('#print-order').textContent=refill.order||refill.id; $('#print-points').textContent=`${refill.points} pontos RETINTA ECOJET`; $('#print-token').textContent=refill.token; $('#print-qr-code').innerHTML='';
 const delivered=refill.status==='delivered'||refill.status==='credited';
 $('#deliver-button').classList.toggle('hidden',delivered); $('#simulate-scan').classList.toggle('hidden',refill.status==='credited'); $('#scan-camera').classList.toggle('hidden',refill.status==='credited'); $('.manual-scan').classList.toggle('hidden',refill.status==='credited');
 $('#qr-status').textContent=refill.status==='credited'?'QR já utilizado. Os pontos foram creditados uma única vez.':delivered?'Entrega confirmada. O cliente já pode escanear o QR Code.':'A pontuação só será liberada depois que a entrega for marcada como concluída.';
 $('#qr-dialog').showModal();
}
function confirmScan(input,{allowAnyCustomer=false}={}){
 const token=String(input||'').trim().replace(/^(?:RETINTA(?:\s+ECOJET)?|ECOLOOP):/i,'');
 const refill=state.refills.find(r=>r.token.toLowerCase()===token.toLowerCase());
 if(!refill){showMessage('Código não encontrado','Confira o código do QR Code e tente novamente.');return false;}
 if(refill.status==='credited'){showMessage('QR Code já utilizado','Este pedido já recebeu pontos. Cada código pode ser usado uma única vez.');return false;}
 if(refill.status!=='delivered'){showMessage('Entrega ainda não confirmada','Os pontos serão liberados após a Ecojet marcar o pedido como entregue.');return false;}
 if(!allowAnyCustomer&&activeCustomer()?.id!==refill.customerId){showMessage('QR de outro cliente','Este QR Code pertence a outra conta. Selecione o cliente correto para concluir a demonstração.');return false;}
 refill.status='credited'; refill.creditedAt=new Date().toISOString().slice(0,10); refill.creditedByCustomerId=refill.customerId; save(); render();
 if($('#qr-dialog').open) $('#qr-dialog').close(); if($('#customer-scan-dialog').open) $('#customer-scan-dialog').close(); showMessage('Pontos adicionados!',`${refill.points} pontos da recarga ${refill.order||refill.id} entraram no saldo de ${customerById(refill.customerId)?.name||refill.customer}.`); return true;
}
function markDelivered(){const r=state.refills.find(x=>x.id===currentQrId);if(!r||r.status!=='pending')return;r.status='delivered';r.deliveredAt=new Date().toISOString().slice(0,10);r.deliveredBy={...activeOperator()};save();render();openQr(r.id);}
function createRefill(form){
 const data=new FormData(form), value=Number(data.get('value'));
 if(!Number.isFinite(value)||value<=0)return;
 const id=`R-${Date.now().toString().slice(-6)}`; const order=String(data.get('order')||`ECO-${id.slice(2)}`).trim();
 const customer=customerById(String(data.get('customerId')));if(!customer){showMessage('Selecione um cliente','Cadastre ou selecione um cliente antes de registrar a recarga.');return;}
 const refill={id,order,customerId:customer.id,customer:customer.name,kind:String(data.get('kind')),value,date:new Date().toISOString().slice(0,10),status:'pending',token:`${order.replace(/[^a-z0-9]/gi,'').toUpperCase()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`,points:pointsFor(value),createdBy:{...activeOperator()}};
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
$('#simulate-scan').addEventListener('click',()=>{const refill=state.refills.find(r=>r.id===currentQrId);if(refill)confirmScan(refill.token,{allowAnyCustomer:true})});
$('#manual-confirm').addEventListener('click',()=>confirmScan($('#manual-token').value,{allowAnyCustomer:true}));
$('#manual-token').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();confirmScan(e.currentTarget.value,{allowAnyCustomer:true})}});
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
$('#customer-switcher').addEventListener('change',e=>{state.selectedCustomerId=e.target.value;save();render();});
$('#customer-search').addEventListener('input',()=>{renderCustomers();$('#customer-detail').classList.add('hidden')});
$('#customer-table').addEventListener('click',e=>{const button=e.target.closest('[data-customer]');if(button)showCustomerDetail(button.dataset.customer)});
$('#new-customer').addEventListener('click',()=>$('#customer-dialog').showModal());
$('#customer-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const name=String(new FormData(form).get('name')||'').trim();if(!name)return;const duplicate=state.customers.some(c=>c.name.toLocaleLowerCase('pt-BR')===name.toLocaleLowerCase('pt-BR'));if(duplicate){showMessage('Cliente já cadastrado','Pesquise o nome na lista para consultar o histórico existente.');return;}const id=`CLI-${crypto.randomUUID().slice(0,8).toUpperCase()}`;state.customers.push({id,name,createdAt:new Date().toISOString().slice(0,10)});state.selectedCustomerId=id;save();render();renderCustomers();$('#customer-detail').classList.add('hidden');$('#customer-dialog').close();form.reset();showMessage('Cliente cadastrado',`${name} recebeu o código ${id} e já pode ser selecionado em uma nova recarga.`);});
$('#active-operator').addEventListener('change',e=>{state.activeOperatorId=e.target.value;save();});
$('#operator-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const name=String(new FormData(form).get('name')||'').trim();if(!name)return;const duplicate=state.operators.some(o=>o.name.toLocaleLowerCase('pt-BR')===name.toLocaleLowerCase('pt-BR'));if(duplicate){$('#settings-notice').textContent='Esse operador já está cadastrado. Selecione-o na lista.';return;}const id=`OP-${crypto.randomUUID().slice(0,8).toUpperCase()}`;state.operators.push({id,name});state.activeOperatorId=id;save();renderCustomers();form.reset();$('#settings-notice').textContent=`${name} cadastrado e definido como operador ativo.`;});
$('#redeem-button').addEventListener('click',()=>{const customer=activeCustomer();const points=Math.floor(balanceFor(customer?.id)/100)*100;if(points<100)return;const value=points/100;state.redemptions.unshift({date:new Date().toISOString().slice(0,10),customerId:customer.id,points,value,operator:{name:`Cliente: ${customer.name}`}});save();render();showMessage('Resgate demonstrativo',`${points} pontos foram trocados por ${money(value)} em desconto demonstrativo. Este protótipo não cria um cupom fiscal.`)});
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
