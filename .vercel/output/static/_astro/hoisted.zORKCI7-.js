import{c as w}from"./wrapper.DVMbrJAx.js";import"./hoisted.BkoFJ0Lt.js";const I="https://ooevpxkcftpemofjantd.supabase.co",b="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZXZweGtjZnRwZW1vZmphbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Njg3ODYsImV4cCI6MjA4MTM0NDc4Nn0.rbUanSpOKtwqcSs71eCLw_K2ywpuWSfG9Ae88hBmu6M",o=w(I,b),g=document.getElementById("loading-state"),h=document.getElementById("not-logged-state"),p=document.getElementById("dashboard-content"),d=document.getElementById("user-avatar"),l=document.getElementById("user-name"),u=document.getElementById("user-email"),C=document.getElementById("logout-btn");async function B(){try{const{data:{user:t},error:e}=await o.auth.getUser();if(e||!t){m();return}E(t),L(t)}catch(t){console.error("Auth error:",t),m()}}function m(){g?.classList.add("hidden"),h?.classList.remove("hidden"),p?.classList.add("hidden")}function E(t){g?.classList.add("hidden"),h?.classList.add("hidden"),p?.classList.remove("hidden");const e=t.user_metadata?.username||t.email?.split("@")[0]||"Utilisateur";d&&(d.textContent=e.charAt(0).toUpperCase()),l&&(l.textContent=e),u&&(u.textContent=t.email||"")}async function L(t){try{const{data:e,error:S}=await o.from("stories").select("*").eq("author_id",t.id).order("created_at",{ascending:!1});if(e&&e.length>0){const s=document.getElementById("my-stories-list");if(s){s.innerHTML=e.map(n=>`
            <a href="/stories/${n.slug}" class="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--accent-primary)]/5 transition-colors group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-16 rounded overflow-hidden bg-[var(--bg-primary)]">
                  ${n.cover_url?`<img src="${n.cover_url}" alt="${n.title}" class="w-full h-full object-cover">`:'<div class="w-full h-full flex items-center justify-center text-2xl">📖</div>'}
                </div>
                <div>
                  <h3 class="text-[var(--text-primary)] font-medium group-hover:text-[var(--accent-primary)] transition-colors">${n.title}</h3>
                  <div class="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <span class="px-2 py-0.5 bg-[var(--bg-primary)] rounded text-xs">${n.type}</span>
                    <span>${n.status==="published"?"✅ Publié":"📝 Brouillon"}</span>
                    <span>👁️ ${n.views||0}</span>
                  </div>
                </div>
              </div>
              <svg class="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          `).join("");const x=e.reduce((n,y)=>n+(y.views||0),0),i=document.getElementById("stat-stories"),c=document.getElementById("stat-views");i&&(i.textContent=e.length.toString()),c&&(c.textContent=k(x))}}const{count:f}=await o.from("likes").select("*",{count:"exact",head:!0}).in("story_id",(e||[]).map(s=>s.id)),a=document.getElementById("stat-likes");a&&(a.textContent=(f||0).toString());const{count:v}=await o.from("comments").select("*",{count:"exact",head:!0}).in("story_id",(e||[]).map(s=>s.id)),r=document.getElementById("stat-comments");r&&(r.textContent=(v||0).toString())}catch(e){console.error("Error loading user data:",e)}}function k(t){return t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toString()}C?.addEventListener("click",async()=>{try{await o.auth.signOut(),window.location.href="/"}catch(t){console.error("Logout error:",t)}});B();
