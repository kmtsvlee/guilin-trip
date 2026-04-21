import { useState } from 'react';

// --- 1. 組件：美食導航卡片 (修復括號與標籤閉合) [cite: 25-33] ---
const FoodCard = ({ n, t, a }: { n: string; t: string; a: string }) => (
  <div className="bg-white p-5 rounded-[2rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <h3 className="text-lg font-black text-[#3D3A36] mb-1">{n}</h3>
    <p className="text-xs font-bold text-[#8C8579] mb-3">📍 {a}</p>
    <div className="flex space-x-2">
      <a href={`tel:${t}`} className="flex-1 bg-[#E9F0EA] text-[#4A6741] py-3 rounded-xl font-black text-center text-xs">📞 撥打</a>
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`} 
        target="_blank" 
        rel="noreferrer" 
        className="flex-1 bg-[#4A6741] text-white py-3 rounded-xl font-black text-center text-xs"
      >
        🗺️ 導航
      </a>
    </div>
  </div>
);

// --- 2. 資料庫：對齊文檔所有細節 [cite: 1-16] ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "06:00", title: "集合出發 ✈️", r: "松山二航立榮櫃檯 (07:00起飛)" },
    { t: "09:30", title: "水頭聚落攝影", r: "得月樓、金水國小、洋樓美學" },
    { t: "14:00", title: "海際線攝影 🌊", r: "建功嶼、湖下海堤 (退潮限定)" },
    { t: "18:00", title: "慈堤夕照", r: "捕捉金門最美日落大景" },
    { t: "20:00", title: "老街夜拍 🌙", r: "後埔老街人文與煙火氣紀錄" }
  ]},
  { day: "28", b: "民宿", l: "海口城", d: "小明的店", items: [
    { t: "11:00", title: "金城迎城隍 🥁", r: "年度核心祭典：捕捉陣頭張力" },
    { t: "15:30", title: "聚落生活紀錄", r: "南、北山人文肖像與生活細節" },
    { t: "17:30", title: "嚨口戰地夕陽 🛡️", r: "軌條砦夕照 (退潮電影感拍攝)" },
    { t: "19:30", title: "大橋/小金門夜色", r: "黑糖剉冰、雙口海邊、大橋夜拍" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地", items: [
    { t: "06:00", title: "栗喉蜂虎攝影 🐦", r: "青年農莊 (長焦 300-400mm 必備)" },
    { t: "10:00", title: "民俗村與老街 🎥", r: "山后對稱建築、陽翟懷舊場景" },
    { t: "14:30", title: "人文肌理紀錄 💈", r: "碧山、沙美老理髮店肖像攝影" },
    { t: "19:30", title: "瓊林聚落夜拍", r: "夜間光影下的古厝紅磚層次" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "簡餐 (浯倆餐廚)", items: [
    { t: "09:00", title: "太湖與榕園 🌳", r: "自然光影觀察與湖光紀錄" },
    { t: "11:00", title: "漁村坑道對稱 ⚓", r: "小艇坑道 (E-092) 倒影攝影" },
    { t: "13:30", title: "精緻洋樓美學", r: "陳景蘭洋樓、成功海邊巡禮" },
    { t: "15:30", title: "明遺老街巡禮 ⛩️", r: "老街與舊城門歷史感紀錄" },
    { t: "18:30", title: "歸途集合 ✈️", r: "尚義機場加油還車 (20:15起飛)" }
  ]}
];

const foodData = [
  { n: "金道地蚵仔煎", t: "082-327969", a: "金城鎮前水頭15號" },
  { n: "東門餐廳", t: "082-371850", a: "金城鎮東門北提路" },
  { n: "小明的店", t: "082-327441", a: "金寧鄉湖埔村慈湖路一段98號" },
  { n: "談天樓", t: "082-332766", a: "金湖鎮復興路3號" },
  { n: "佑昇生億鍋貼", t: "082-332229", a: "金湖鎮成功村171號" },
  { n: "良金牛肉麵", t: "082-335886", a: "金湖鎮漁村160號" }
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('27');
  const [checked, setChecked] = useState<number[]>([]);
  
  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-36 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12">
        <p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p>
        <h1 className="text-3xl font-black text-left">金門迎城隍攝影手帳</h1>
      </header>

      <main className="px-6">
        {tab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}><span className="text-xl font-black">{d}</span></button>
              ))}
            </div>
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-around text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>午</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>晚</b><br/>{curr.d}</div>
            </div>
            {curr.items.map((it, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <p className="text-[#4A6741] font-bold text-xs mb-1 text-left">🕒 {it.t}</p>
                <h2 className="text-xl font-black leading-tight mb-2 text-left">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic text-left">💡 {it.r}</div>
              </div>
            ))}
          </div>
        )}

        {tab === '美食' && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#8C8579] uppercase mb-4 tracking-widest text-left">名店導覽 [cite: 25-33]</p>
            {foodData.map((f, i)=>(<FoodCard key={i} n={f.n} t={f.t} a={f.a} />))}
          </div>
        )}

        {tab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3">行李托運重要規定 [cite: 23]</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：必須隨身攜帶</li>
                <li>📸 三腳架：一定要托運 (須裝袋)</li>
                <li>✈️ 托運限重：10 公斤 / 人</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
              {[
                {id:1, t:"身份證正本 / 駕照 (4人)", c:"重要 [cite: 18]"},
                {id:2, t:"300-400mm 鏡頭 (拍蜂虎)", c:"攝影 [cite: 22]"},
                {id:3, t:"偏光 / 漸層鏡 / 三腳架", c:"攝影 [cite: 22]"},
                {id:4, t:"自備盥洗用品 (不含一次性)", c:"生活 [cite: 20]"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checked.includes(i.id)?'line-through opacity-30 text-[#8C8579]':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
        {[{id:'行程', i:'🗺️'}, {id:'美食', i:'😋'}, {id:'準備', i:'🎒'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex flex-col items-center p-2 px-6 rounded-2xl transition-all ${tab===t.id?'bg-[#4A6741] text-white shadow-md':'text-[#8C8579]'}`}>
            <span className="text-lg">{t.i}</span><span className="text-[8px] font-black">{t.id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}