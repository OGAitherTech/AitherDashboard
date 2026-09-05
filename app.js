const DEFAULT_BACKEND = localStorage.getItem('aither_backend_url') || 'https://aither-backend.onrender.com';
let backend = DEFAULT_BACKEND.replace(/\/$/, '');
let cache = {};

const $ = (id) => document.getElementById(id);
const esc = (value) => String(value ?? '—').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message){ const t=$('toast'); t.textContent=message; t.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove('show'),2600); }
function setConnection(ok, text){ const p=$('connectionPill'); p.textContent=text; p.className='pill '+(ok?'ok':'bad'); }
function apiUrl(path){ return backend + path; }
async function api(path, options={}){
  if(!backend) throw new Error('Backend URL is not configured. Open Settings and enter your Aither Backend URL.');
  const response=await fetch(apiUrl(path),{...options,credentials:'include',headers:{'Content-Type':'application/json',...(options.headers||{})}});
  let data={}; try{ data=await response.json(); }catch{}
  if(!response.ok) throw new Error(data.detail || `Request failed (${response.status})`);
  return data;
}

async function loadData(silent=false){
  if(!silent) toast('Refreshing Aither data…');
  try{
    const results=await Promise.allSettled([
      api('/api/auth/session'),api('/api/status'),api('/api/health'),api('/api/version'),api('/api/config'),api('/api/apps'),api('/api/updates'),api('/api/notifications')
    ]);
    const [session,status,health,version,config,apps,updates,notifications]=results.map(r=>r.status==='fulfilled'?r.value:{error:r.reason?.message||'Unavailable'});
    cache={session,status,health,version,config,apps,updates,notifications};
    const connected=results.slice(1).some(r=>r.status==='fulfilled');
    setConnection(connected,'Backend connected');
    render();
    if(!silent) toast(connected?'Dashboard refreshed':'Could not reach Aither Backend');
  }catch(e){ setConnection(false,'Backend unavailable'); if(!silent) toast(e.message); }
}
function render(){
  const s=cache.session||{}; const user=s.user; const apps=Array.isArray(cache.apps?.apps)?cache.apps.apps:[]; const updates=Array.isArray(cache.updates?.updates)?cache.updates.updates:[]; const notifications=Array.isArray(cache.notifications?.notifications)?cache.notifications.notifications:[];
  $('accountState').textContent=s.authenticated?'Signed in':'Signed out'; $('accountEmail').textContent=user?.email||'No active session'; $('appCount').textContent=apps.length; $('notificationCount').textContent=notifications.length; $('updateCount').textContent=updates.length;
  $('welcome').textContent=user?.name?`Welcome back, ${user.name}.`:'Your Aither data, in one place.'; $('avatar').textContent=(user?.name||'A').charAt(0).toUpperCase();
  $('profileCard').innerHTML=user?`<div class="profile-avatar">${esc(user.name).charAt(0).toUpperCase()}</div><div><strong>${esc(user.name)}</strong><span>${esc(user.email)}</span></div>`:`<div class="profile-avatar">?</div><div><strong>Not signed in</strong><span>Use an Aither app to create or sign in to an account.</span></div>`;
  const st=cache.status?.status||'Unavailable'; const health=cache.health?.status||'Unavailable'; $('statusDot').style.background=(st==='operational'&&health==='healthy')?'#5be49a':'#ff9ca9'; $('statusCard').innerHTML=row('Status',st)+row('Health',health)+row('Version',cache.version?.version||cache.config?.app_version||'—')+row('Environment',cache.config?.environment||'—');
  $('accountDetails').innerHTML=user?detail('Name',user.name)+detail('Email',user.email)+detail('User ID',user.id)+detail('Email verified',user.email_verified?'Yes':'No'):empty('No authenticated Aither account found.');
  $('appsList').innerHTML=apps.length?apps.map(a=>`<article class="item-card"><h3>${esc(a.name||'Unnamed app')}</h3><p>Version ${esc(a.version)} · ${esc(a.platform)}</p></article>`).join(''):empty('No registered apps were returned by the backend.');
  $('updatesList').innerHTML=updates.length?updates.map(x=>cardFromData(x,'Update')).join(''):empty('No updates are currently available.');
  $('notificationsList').innerHTML=notifications.length?notifications.map(x=>cardFromData(x,'Notification')).join(''):empty('No notifications are currently available.');
  $('systemDetails').innerHTML=statCard('Backend status',cache.status?.status)+statCard('Health',cache.health?.status)+statCard('API version',cache.version?.version||cache.config?.app_version)+statCard('Environment',cache.config?.environment)+statCard('Service',cache.status?.service||cache.config?.app_name)+statCard('Health timestamp',cache.health?.timestamp);
}
function row(k,v){return `<div class="data-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`}
function detail(k,v){return `<div class="detail"><label>${esc(k)}</label><strong>${esc(v)}</strong></div>`}
function statCard(k,v){return `<article class="stat"><span>${esc(k)}</span><strong>${esc(v)}</strong></article>`}
function empty(text){return `<div class="empty">${esc(text)}</div>`}
function cardFromData(x,title){ const name=x.title||x.name||x.message||title; const description=x.description||x.body||x.detail||x.status||''; return `<article class="item-card"><h3>${esc(name)}</h3><p>${esc(description)}</p></article>` }
function showView(view){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));const target=$('view-'+view);if(target)target.classList.add('active-view');document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));const titles={overview:'Overview',account:'Account',apps:'Apps',updates:'Updates',notifications:'Notifications',system:'System',settings:'Settings'};$('pageTitle').textContent=titles[view]||'Overview';$('sidebar').classList.remove('open')}
document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));document.querySelectorAll('[data-view-jump]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.viewJump)));$('menuBtn').addEventListener('click',()=>$('sidebar').classList.toggle('open'));$('refreshBtn').addEventListener('click',()=>loadData());$('heroRefresh').addEventListener('click',()=>loadData());$('forceRefresh').addEventListener('click',()=>loadData());$('settingsBtn').addEventListener('click',()=>showView('settings'));$('logoutBtn').addEventListener('click',async()=>{try{await api('/api/auth/logout',{method:'POST'});toast('Signed out');await loadData(true)}catch(e){toast(e.message)}});$('backendUrl').value=backend;$('autoRefresh').checked=localStorage.getItem('aither_auto_refresh')!=='false';$('saveSettings').addEventListener('click',()=>{backend=$('backendUrl').value.trim().replace(/\/$/,'');localStorage.setItem('aither_backend_url',backend);localStorage.setItem('aither_auto_refresh',$('autoRefresh').checked);toast('Settings saved');loadData(true)});let timer;function configureTimer(){clearInterval(timer);if($('autoRefresh').checked)timer=setInterval(()=>loadData(true),60000)}$('autoRefresh').addEventListener('change',configureTimer);configureTimer();render();loadData(true);
