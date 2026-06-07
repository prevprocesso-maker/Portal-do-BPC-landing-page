(function(){
const{useState,useEffect}=React;
function App(){
const[screen,setScreen]=useState('home');
const[patologia,setPatologia]=useState(null);
useEffect(()=>{
const h=window.location.hash;
const m=h.match(/^#\/patologia\/(\w+)/);
if(m){const p=PATOLOGIAS.find(x=>x.sigla===m[1]);if(p){setPatologia(p);setScreen('patologia');return;}}
if(h==='#/simulador')setScreen('simulador');
else if(h==='#/blog')setScreen('blog');
else if(h==='#/faq')setScreen('faq');
else if(h==='#/pericias')setScreen('pericias');
else if(h==='#/estrangeiro'||h==='#/bpc-estrangeiro')setScreen('estrangeiro');
},[]);
useEffect(()=>{
function handleHash(){
var h=window.location.hash;
if(h==='#/simulador'){setScreen('simulador');}
else if(h==='#/faq'){setScreen('faq');}
else if(h==='#/pericias'){setScreen('pericias');}
else if(h==='#/estrangeiro'||h==='#/bpc-estrangeiro'){setScreen('estrangeiro');}
else if(h==='#/blog'){setScreen('blog');}
else if(h==='#/'||h==='#/home'){setScreen('home');}
else{
var pm=h.match(/^#\/patologia\/(\w+)/);
if(pm){var p=PATOLOGIAS.find(function(x){return x.sigla===pm[1];});if(p){setPatologia(p);setScreen('patologia');}}
}
}
window.addEventListener('hashchange',handleHash);
return function(){window.removeEventListener('hashchange',handleHash);};
},[]);
useEffect(()=>{
document.documentElement.style.scrollBehavior='auto';
document.documentElement.scrollTop=0;
document.body.scrollTop=0;
requestAnimationFrame(()=>{document.documentElement.style.scrollBehavior='';});
},[screen]);
useEffect(()=>{
const base='Portal do BPC \u2014 BPC/LOAS para idoso e pessoa com defici\u00eancia';
if(screen==='patologia'&&patologia){document.title='BPC para '+patologia.nome+' \u2014 '+base;}
else if(screen==='simulador'){document.title='Simulador BPC gratuito \u2014 '+base;}
else if(screen==='pericias'){document.title='Per\u00edcia m\u00e9dica e social do BPC \u2014 checklist e orienta\u00e7\u00f5es | Portal do BPC';}
else if(screen==='estrangeiro'){document.title='BPC para estrangeiro \u2014 imigrante, refugiado, naturalizado | Portal do BPC';}
else if(screen==='faq'){document.title='Perguntas frequentes sobre o BPC/LOAS \u2014 30+ d\u00favidas respondidas | Portal do BPC';}
else if(screen==='blog'){document.title='Blog \u2014 Conte\u00fado sobre BPC/LOAS | Portal do BPC';}
else{document.title=base+' | Iraj\u00e1/RJ';}
},[screen,patologia]);
const navigate=(s,payload)=>{
if(s==='patologia')setPatologia(payload);
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
screen==='faq'&&React.createElement(ScreenFAQ,null),
screen==='patologias'&&React.createElement(ScreenLanding,{onNavigate:navigate})
),
React.createElement(Footer,null),
React.createElement(WhatsAppFloat,null)
);
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App,null));
})();