import { useState } from 'react';

// --- 1. 組件：美食導覽卡片 (修復字串插值與標籤閉合) [cite: 24-44] ---
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

// --- 2. 組件：底部導覽 ---
const BottomNav = ({ onTabChange, currentTab }: { onTabChange: (id: string) => void; currentTab: string }) => {
  const tabs = [
    { id: '行程', i: '🗺️' }, { id: '美食', i: '😋' }, 
    { id: '航班', i: '🎫' }, { id: '準備', i: '🎒' }, { id: '帳單', i: '💰' }
  ];
  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center p-2 px-4 rounded-2xl transition-all ${currentTab === tab.id ? 'bg-[#4A6741] text-white' : 'text-[#8C8579]'}`}>
          <span className="text-lg">{tab.i}</span>
          <span className="text-[8px] font-black">{tab.id}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 3. 資料庫：完整行程與美食 [cite: 1-16, 25-44] ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "07:00", title: "台北-金門 (B7-8801) ✈️", r: "06:00 松山二航集合 [cite: 2]" },
    { t: "09:30", title: "水頭聚落巡禮", r: "金水國小、得月樓攝影 [cite: 4]" },
    { t: "14:00", title: "建功嶼/湖下沙紋", r: "退潮限定沙紋攝影 🌊 [cite: 4]" },
    { t: "18:00", title: "慈堤黃昏", r: "捕捉最美日落點 [cite: 4]" },
    { t: "20:00", title: "後埔老街夜拍", r: "金城人文煙火氣紀錄 [cite: 4]" }
  ]},
  { day: "28", b: "民宿", l: "海口城", d: "小明的店", items: [
    { t: "11:00", title: "金城迎城隍盛典 🥁", r: "年度行程核心！捕捉祭典張力 [cite: 7]" },
    { t: "15:30", title: "南、北山聚落", r: "生活細節與人文肖像攝影 [cite: 7]" },
    { t: "17:30", title: "嚨口沙灘夕照", r: "戰地電影感大景 🛡️ [cite: 7]" },
    { t: "19:30", title: "大橋/小金門", r: "金門大橋壯麗夜景對望 [cite: 7]" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地", items: [
    { t: "06:00", title: "栗喉蜂虎攝影 🐦", r: "青年農莊 (長焦 300-400mm) [cite: 10, 22]" },
    { t: "10:00", title: "山后/陽翟老街", r: "對稱建築與懷舊場景攝影 [cite: 10]" },
    { t: "14:30", title: "碧山/沙美人文", r: "沙美老理髮店生活肌理紀錄 [cite: 10]" },
    { t: "19:30", title: "瓊林夜拍", r: "夜間聚落光影層次紀錄 [cite: 10]" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "浯倆餐廚", items: [
    { t: "09:00", title: "太湖晨曦紀錄 🌳", r: "湖光色影與自然紀錄 " },
    { t: "11:00", title: "漁村小艇坑道", r: "E-092 對稱美學攝影 ⚓ " },
    { t: "13:30", title: "陳景蘭洋樓", r: "成功海邊精緻洋樓建築 " },
    { t: "15:30", title: "明遺老街巡禮", r: "最後的人文巡禮紀錄 " },
    { t: "20:15", title: "平安歸途 ✈️", r: "18:30 加油還車 (B7-8836) [cite: 16]" }
  ]}
];

const foodMap = [
  { n: "金道地蚵仔煎", t: "082-327969", a: "金城鎮前水頭15號 [cite: 25]" },
  { n: "東門餐廳", t: "082-371850", a: "金城鎮東門北提路 [cite: 26]" },
  { n: "小明的店", t: "082-327441", a: "金寧鄉湖埔村慈湖路一段98號 [cite: 27]" },
  { n: "記德海鮮", t: "082-324461", a: "金城鎮慈湖路二段105號 [cite: 28]" },
  { n: "談天樓", t: "082-332766", a: "金湖鎮復興路3號 [cite: 30]" },
  { n: "佑昇生億鍋貼", t: "082-332229", a: "金湖鎮成功村171號 [cite: 33]" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  const [expenses, setExpenses] = useState<{id:number, i:string, a:number}[]>([]);
  const [inI, setInI] = useState('');
  const [inA, setInA] = useState('');
  const [checked, setChecked] = useState<number[]>([]);

  const curr = scheduleData.find(d => d.day === selectedDay) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-36 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div><p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p><h1 className="text-3xl font-black text-left">金門迎城隍</h1></div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#8C8579] uppercase text-right block">總支出</span>
          <span className="text-2xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span>
        </div>
      </header>

      <main className="px-6 text-left">
        {activeTab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setSelectedDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 ${selectedDay===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}><span className="text-xl font-black">{d}</span></button>
              ))}
            </div>
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-around text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-white/20"><b>午</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-white/20"><b>晚</b><br/>{curr.d}</div>
            </div>
            {curr.items.map((it, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <p className="text-[#4A6741] font-bold text-[10px] mb-1">🕒 {it.t}</p>
                <h2 className="text-xl font-black leading-tight mb-2 text-left">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic text-left">💡 {it.r}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === '美食' && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#8C8579] uppercase mb-4 tracking-widest text-left">金門美食推薦名錄 [cite: 24-44]</p>
            {foodMap.map((f, i)=>(<FoodCard key={i} n={f.n} t={f.t} a={f.a} />))}
          </div>
        )}

        {activeTab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3 text-left">飛行攝影規範 [cite: 23]</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：必須隨身攜帶</li>
                <li>📸 三腳架：一定要托運 (須裝袋)</li>
                <li>✈️ 托運限重：10 公斤 / 人</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
              {[
                {id:1, t:"身份證正本 / 駕照 (4人) [cite: 18]", c:"重要"},
                {id:2, t:"300-400mm 鏡頭 (蜂虎) [cite: 22]", c:"攝影"},
                {id:3, t:"自備盥洗用品 (民宿不供) [cite: 20]", c:"生活"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0 active:bg-gray-50">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checked.includes(i.id)?'line-through opacity-30 text-[#8C8579]':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === '帳單' && (
          <div className="space-y-4 text-left">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={inI} onChange={(e)=>setInI(e.target.value)} className="flex-1 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <input type="number" placeholder="$" value={inA} onChange={(e)=>setInA(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <button onClick={()=>{
                  if(inI && inA){ setExpenses([{id:Date.now(), i:inI, a:Number(inA)}, ...expenses]); setInI(''); setInA(''); }
                }} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            {expenses.map(e=>(
              <div key={e.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] flex justify-between items-center shadow-sm">
                <span className="font-black text-[#3D3A36] text-left">{e.i}</span><span className="font-black text-[#4A6741]">${e.a}</span>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === '航班' && (
          <div className="space-y-4 text-left">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block tracking-widest">去程 05.27 (三)</span>
              <div className="flex justify-between items-center text-center"><div className="text-left text-[#3D3A36]"><p className="text-2xl font-black">TSA</p><p className="text-xs text-[#8C8579] font-bold">07:00</p></div><div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative text-center"><span className="text-lg">✈️</span></div><div className="text-right text-[#3D3A36]"><p className="text-2xl font-black">KNH</p><p className="text-xs text-[#8C8579] font-bold">08:05</p></div></div>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block tracking-widest">回程 05.30 (六)</span>
              <div className="flex justify-between items-center text-center"><div className="text-left text-[#3D3A36]"><p className="text-2xl font-black">KNH</p><p className="text-xs text-[#8C8579] font-bold">20:15</p></div><div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative text-center"><span className="text-lg rotate-180 inline-block">✈️</span></div><div className="text-right text-[#3D3A36]"><p className="text-2xl font-black">TSA</p><p className="text-xs text-[#8C8579] font-bold">21:15</p></div></div>
            </div>
          </div>
        )}
      </main>

      <BottomNav onTabChange={setActiveTab} currentTab={activeTab} />
    </div>
  );
}