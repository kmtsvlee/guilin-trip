import { useState } from 'react';

// --- 1. 組件：美食卡片 (對應美食地圖 [cite: 24-44]) ---
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

// --- 2. 資料庫：完整行程與美食 [cite: 2, 4-15, 25-44] ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "07:00", title: "台北-金門 (B7-8801) ✈️", r: "06:00 松山二航集合 [cite: 2]" },
    { t: "09:30", title: "水頭聚落攝影", r: "金水國小、得月樓 [cite: 4]" },
    { t: "14:00", title: "建功嶼/湖下沙紋", r: "退潮限定大景拍攝 [cite: 4]" },
    { t: "18:00", title: "慈堤黃昏夕照", r: "金門最美落日點 [cite: 4]" }
  ]},
  { day: "28", b: "民宿", l: "海口城", d: "小明的店", items: [
    { t: "11:00", title: "金城迎城隍盛典 🥁", r: "捕捉祭典張力與陣頭 [cite: 7]" },
    { t: "15:30", title: "南、北山聚落", r: "生活細節與肖像紀錄 [cite: 7]" },
    { t: "17:30", title: "嚨口沙灘夕照", r: "軌條砦戰地電影感 [cite: 7]" },
    { t: "19:30", title: "大橋夜拍 / 小金門", r: "大橋壯麗線條與夜景 [cite: 7]" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地", items: [
    { t: "06:00", title: "青年農莊攝影 🐦", r: "栗喉蜂虎 (300-400mm) [cite: 10, 22]" },
    { t: "10:00", title: "山后 / 陽翟老街", r: "民俗村對稱美學攝影 [cite: 10]" },
    { t: "14:30", title: "碧山 / 沙美老街", r: "沙美老理髮店人文紀錄 [cite: 10]" },
    { t: "19:30", title: "瓊林聚落夜拍", r: "夜間聚落光影層次 [cite: 10]" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "浯倆餐廚", items: [
    { t: "09:00", title: "太湖與榕園 🌳", r: "湖光色影與自然紀錄 [cite: 13]" },
    { t: "11:00", title: "漁村小艇坑道", r: "坑道對稱倒影攝影 [cite: 13]" },
    { t: "13:30", title: "陳景蘭洋樓", r: "成功海邊精緻洋樓 [cite: 13]" },
    { t: "15:30", title: "明遺老街巡禮", r: "歷史老街巡禮 [cite: 13]" },
    { t: "20:15", title: "平安歸途 (B7-8836) ✈️", r: "18:30 加油還車 [cite: 2, 16]" }
  ]}
];

const foodData = [
  { n: "金道地蚵仔煎", t: "082-327969", a: "金城鎮前水頭15號 [cite: 25]" },
  { n: "東門餐廳", t: "082-371850", a: "金城鎮東門北提路 [cite: 26]" },
  { n: "小明的店", t: "082-327441", a: "金寧鄉湖埔村慈湖路一段98號 [cite: 27]" },
  { n: "談天樓", t: "082-332766", a: "金湖鎮復興路3號 [cite: 30]" },
  { n: "佑昇生億鍋貼", t: "082-332229", a: "金湖鎮成功村171號 [cite: 33]" }
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
              <div><b>早</b><br/>{curr.b}</div>
              <div className="border-l border-white/20 px-4"><b>午</b><br/>{curr.l}</div>
              <div className="border-l border-white/20 px-4"><b>晚</b><br/>{curr.d}</div>
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
            <p className="text-[10px] font-black text-[#8C8579] uppercase mb-4 tracking-widest text-left">推薦美食名錄 [cite: 24]</p>
            {foodData.map((f, i)=>(<FoodCard key={i} n={f.n} t={f.t} a={f.a} />))}
          </div>
        )}

        {tab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3 text-left">重要行李規定 [cite: 23]</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：必須隨身攜帶</li>
                <li>📸 腳架：一定要托運 (須裝袋)</li>
                <li>✈️ 托運限重：10 公斤 / 人</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
              {[
                {id:1, t:"身份證正本 / 駕照 (4人) [cite: 18]", c:"重要"},
                {id:2, t:"300-400mm 鏡頭 (拍蜂虎) [cite: 22]", c:"攝影"},
                {id:3, t:"偏光鏡/漸層鏡/三腳架 [cite: 22]", c:"攝影"},
                {id:4, t:"自備盥洗用品 (民宿不供) [cite: 20]", c:"生活"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checked.includes(i.id)?'line-through opacity-30 text-[#8C8579]':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === '帳單' && (
          <div className="py-10 text-center opacity-30 font-black">帳單功能已就緒，請手動紀錄每日花費。</div>
        )}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
        {[{id:'行程', i:'🗺️'}, {id:'美食', i:'😋'}, {id:'準備', i:'🎒'}, {id:'帳單', i:'💰'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex flex-col items-center p-2 px-3 rounded-2xl transition-all ${tab===t.id?'bg-[#4A6741] text-white shadow-md':'text-[#8C8579]'}`}>
            <span className="text-lg">{t.i}</span><span className="text-[8px] font-black">{t.id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}