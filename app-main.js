(function(){
const{useState,useEffect}=React;
function App(){
const[screen,setScreen]=useState('home');
const[patologia,setPatologia]=useState(null);
const[postId,setPostId]=useState(0);

/* ── Initial route ── */
useEffect(()=>{
  const h=window.location.hash;
  const m=h.match(/^#\/patologia\/(\w+)/);
  if(m){const p=PATOLOGIAS.find(x=>x.sigla===m[1]);if(p){setPatologia(p);setScreen('patologia');return;}}
  const bm=h.match(/^#\/blog\/(\d+)$/);
  if(bm){setPostId(parseInt(bm[1]));setScreen('blogpost');return;}
  if(h==='#/simulador')setScreen('simulador');
  else if(h==='#/blog')setScreen('blog');
  else if(h==='#/faq')setScreen('faq');
  else if(h==='#/pericias')setScreen('pericias');
  else if(h==='#/estrangeiro'||h==='#/bpc-estrangeiro')setScreen('estrangeiro');
},[]);

/* ── Hashchange listener ── */
useEffect(()=>{
  function handleHash(){
    const h=window.location.hash;
    const bm=h.match(/^#\/blog\/(\d+)$/);
    if(bm){setPostId(parseInt(bm[1]));setScreen('blogpost');return;}
    if(h==='#/simulador'){setScreen('simulador');}
    else if(h==='#/faq'){setScreen('faq');}
    else if(h==='#/pericias'){setScreen('pericias');}
    else if(h==='#/estrangeiro'||h==='#/bpc-estrangeiro'){setScreen('estrangeiro');}
    else if(h==='#/blog'){setScreen('blog');}
    else if(h==='#/'||h==='#/home'){setScreen('home');}
    else{
      const pm=h.match(/^#\/patologia\/(\w+)/);
      if(pm){const p=PATOLOGIAS.find(x=>x.sigla===pm[1]);if(p){setPatologia(p);setScreen('patologia');}}
    }
  }
  window.addEventListener('hashchange',handleHash);
  return()=>window.removeEventListener('hashchange',handleHash);
},[]);

/* ── Scroll to top on screen change ── */
useEffect(()=>{
  document.documentElement.style.scrollBehavior='auto';
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
  requestAnimationFrame(()=>{document.documentElement.style.scrollBehavior='';});
},[screen]);

/* ── Dynamic <title> ── */
useEffect(()=>{
  const base='Portal do BPC \u2014 BPC/LOAS para idoso e pessoa com defici\u00eancia';
  if(screen==='patologia'&&patologia){document.title='BPC para '+patologia.nome+' \u2014 '+base;}
  else if(screen==='simulador'){document.title='Simulador BPC gratuito \u2014 '+base;}
  else if(screen==='pericias'){document.title='Per\u00edcia m\u00e9dica e social do BPC \u2014 checklist e orienta\u00e7\u00f5es | Portal do BPC';}
  else if(screen==='estrangeiro'){document.title='BPC para estrangeiro \u2014 imigrante, refugiado, naturalizado | Portal do BPC';}
  else if(screen==='faq'){document.title='Perguntas frequentes sobre o BPC/LOAS \u2014 30+ d\u00favidas respondidas | Portal do BPC';}
  else if(screen==='blog'){document.title='Blog \u2014 Conte\u00fado sobre BPC/LOAS | Portal do BPC';}
  else if(screen==='blogpost'){document.title=(window.BLOG_POSTS&&window.BLOG_POSTS[postId]?window.BLOG_POSTS[postId].titulo:'Artigo')+' | Portal do BPC';}
  else{document.title=base+' | Iraj\u00e1/RJ';}
},[screen,patologia,postId]);

/* ── Navigate ── */
const navigate=(s,payload)=>{
  if(s==='patologia'){setPatologia(payload);setScreen(s);window.location.hash='#/patologia/'+(payload&&payload.sigla?payload.sigla:'');return;}
  if(s==='blogpost'){setPostId(payload);setScreen('blogpost');window.location.hash='#/blog/'+payload;return;}
  setScreen(s);
  window.location.hash='#/'+s;
};
window.__bpcNavigate=navigate;

return React.createElement(React.Fragment,null,
  React.createElement(Header,{active:screen==='patologia'?'patologias':screen,onNavigate:navigate}),
  React.createElement('main',null,
    screen==='home'&&React.createElement(ScreenLanding,{onNavigate:navigate}),
    screen==='patologia'&&React.createElement(ScreenPatologia,{patologia:patologia,onNavigate:navigate}),
    screen==='simulador'&&React.createElement(ScreenSimulador,{onNavigate:navigate}),
    screen==='pericias'&&React.createElement(ScreenPericias,{onNavigate:navigate}),
    screen==='estrangeiro'&&React.createElement(ScreenEstrangeiro,{onNavigate:navigate}),
    screen==='blog'&&React.createElement(ScreenBlog,null),
    screen==='blogpost'&&React.createElement(ScreenBlogPost,{postId:postId,onNavigate:navigate}),
    screen==='faq'&&React.createElement(ScreenFAQ,null),
    screen==='patologias'&&React.createElement(ScreenLanding,{onNavigate:navigate})
  ),
  React.createElement(Footer,null),
  React.createElement(WhatsAppFloat,null)
);
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App,null));
})();
