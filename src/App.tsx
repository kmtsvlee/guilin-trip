import { useState } from 'react';

// --- 1. 組件：美食導覽卡片 (改用最穩定的字串拼接) ---
const FoodCard = ({ n, t, a }: { n: string; t: string; a: string }) => (
  <div className="bg-white p-5 rounded-[2rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <h3 className="text-lg font-black text-[#3D3A36] mb-1">{n}</h3>
    <p className="text-xs font-bold text-[#8C8579] mb-3">📍 {a}</p>
    <div className="flex space-x-2">
      <a href={"tel:" + t} className="flex-1 bg-[#E9F0EA] text-[#4A6741] py-3 rounded-xl font-black text-center text-xs">📞 撥打</a>
      <a 
        href={"https://www.google.com/maps/search/?api=1&query=" + window.encodeURIComponent(a)} 
        target="_blank" 
        rel="noreferrer" 
        className="flex-1 bg-[#4A6741] text-white py-3 rounded-xl font-black text-center text-xs"
      >
        🗺️ 導航
      </a>
    </div>
  </div>
);

// --- 2. 資料庫：行程與住宿 [cite: 1-15] ---
const scheduleData = [
  { 
    day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", 
    hotel: { n: "老閩宅 3 館", a: "瓊林 150 號", t: "0933-699582" },
    items: [
      { t: "07:00", title: "台北-金門 (B7-8801) ✈️", loc: "松山二航集合", map: "松山機場" },
      { t: "09:30", title: "水頭聚落攝影", loc: "得月樓、金水國小", map: "得月樓" },
      { t: "11:30", title: "三大聚落美學", loc: "珠山、歐厝聚落", map: "珠山聚落" },
      { t: "15:00", title: "建功嶼/湖下沙紋", loc: "退潮限定攝影 🌊", map: "建功嶼" },
      { t: "18:00", title: "慈堤黃昏", loc: "捕捉最美日落", map: "慈堤" },
      { t: "20:00", title: "後浦老街夜拍", loc: "金城人文紀錄 🌙", map: "後浦老街" }
    ]
  },
  { 
    day: "28", b: "民宿", l: "海口城", d: "小明的店", 
    hotel: { n: "老閩宅 3 館", a: "瓊林 150 號", t: "0933-699582" },
    items: [
      { t: "09:00", title: "瓊林巡禮", loc: "紅磚巷弄與圖騰 🏮", map: "瓊林" },
      { t: "11:00", title: "金城迎城隍", loc: "年度核心祭典 🥁", map: "金城鎮" },
      { t: "15:30", title: "南、北山聚落", loc: "生活細節攝影", map: "北山聚落" },
      { t: "17:30", title: "嚨口沙灘夕照", loc: "軌條砦戰地感 🛡️", map: "嚨口沙灘" },
      { t: "19:30", title: "大橋/小金門", loc: "壯麗線條夜拍 🌉", map: "金門大橋" }
    ]
  },
  { 
    day: "29", b: "民宿", l: "談天樓", d: "新天地", 
    hotel: { n: "老閩宅 3 館", a: "瓊林 150 號", t: "0933-699582" },
    items: [
      { t: "06:00", title: "栗喉蜂虎攝影", loc: "青年農莊 (長焦必備) 🐦", map: "青年農莊" },
      { t: "10:00", title: "山后/陽翟", loc: "建築與懷舊場景 🎥", map: "山后民俗村" },
      { t: "14:30", title: "碧山/沙美", loc: "人文肌理紀錄 💈", map: "沙美老街" },
      { t: "16:00", title: "山外採購", loc: "伴手禮巡禮 🛍️", map: "山外車站" }
    ]
  },
  { 
    day: "30", b: "民宿", l: "佑昇餐廳", d: "浯倆餐廚", hotel: null,
    items: [
      { t: "09:00", title: "太湖與榕園", loc: "自然光影觀察 🌳", map: "太湖" },
      { t: "11:00", title: "漁村小艇坑道", loc: "E-092 對稱美學 ⚓", map: "漁村小艇坑道" },
      { t: "13:30", title: "陳景蘭洋樓", loc: "精緻洋樓攝影 🏛️", map: "陳景蘭洋樓" },
      { t: "15:30", title: "明遺老街/舊城", loc: "最後人文巡禮 ⛩️", map: "明遺老街" },
      { t: "20:15", title: "平安歸途 (B7-8836) ✈️", loc: "18:30 加油還車", map: "金門機場" }
    ]
  }
];

// --- 3. 美食名錄 [cite: 25-44] ---
const foodMap = [
  { n: "金道地蚵仔煎", t: "082-327969", a: "金城鎮前水頭 15 號" },
  { n: "東門餐廳", t: "082-371850", a: "金城鎮東門北提路" },
  { n: "小明的店", t: "082-327441", a: "金寧鄉湖埔村慈湖路一段 98 號" },
  { n: "記德海鮮餐廳", t: "082-324461", a: "金城鎮慈湖路二段 105 號" },
  { n: "談天樓", t: "082-332766", a: "金湖鎮復興路 3 號" },
  { n: "良金牛肉麵", t: "082-335886", a: "金湖鎮漁村 160 號" },
  { n: "佑昇生億鍋貼", t: "082-332229", a: "金湖鎮成功村 171 號" },
  { n: "高坑牛肉", t: "082-352549", a: "金沙鎮高坑村 38 號" },
  { n: "信源海產店", t: "082-327743", a: "金寧鄉湖下村 60 號" },
  { n: "金門牛家莊", t: "082-320099", a: "金城鎮民族路 318 巷 5 號" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  const [expenses, setExpenses] = useState<{id:number, i:string, a:number}[]>([]);
  const [inItem, setInItem] = useState('');
  const [inAmt, setInAmt] = useState('');
  const [checked, setChecked] = useState<number[]>([]);

  const curr = scheduleData.find(d => d.day === selectedDay) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-36 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div><p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p><h1 className="text-3xl font-black">金門迎城隍</h1></div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#8C8579] uppercase">總支出</span>
          <span className="text-2xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span>
        </div>
      </header>

      <main className="px-6">
        {activeTab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setSelectedDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${selectedDay===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}><span className="text-xl font-black">{d}</span></button>
              ))}
            </div>
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-around text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>午</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>晚</b><br/>{curr.d}</div>
            </div>
            {curr.items.map((it, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <a href={"https://www.google.com/maps/search/?api=1&query=" + window.encodeURIComponent(it.map)} target="_blank" rel="noreferrer" className="text-[#4A6741] font-bold text-xs mb-1 underline decoration-dashed block">🕒 {it.t} 📍 {it.loc}</a>
                <h2 className="text-xl font-black leading-tight mb-2">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic">💡 {it.r}</div>
              </div>
            ))}
            {selectedDay === "30" && (
              <div className="bg-[#E9F0EA] p-6 rounded-3xl border-2 border-[#4A6741]/20 mt-8 text-xs font-bold text-[#3D3A36]">
                備選景點：翟山坑道、船型堡、探訪軍事據點、沉睡戰車(退潮)、農試所
              </div>
            )}
            {curr.hotel && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]">
                <p className="text-[10px] font-black text-[#8C8579] uppercase text-center mb-4 tracking-widest">住宿資訊</p>
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4A6741] shadow-sm text-left">
                  <h3 className="text-lg font-black mb-1">🏠 {curr.hotel.n}</h3>
                  <a href={"https://www.google.com/maps/search/?api=1&query=" + window.encodeURIComponent(curr.hotel.a)} target="_blank" rel="noreferrer" className="text-xs italic text-[#4A6741] mb-1 underline decoration-dashed block">📍 {curr.hotel.a}</a>
                  <p className="text-xs font-bold text-[#8C8579]">📞 {curr.hotel.t}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === '美食' && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#8C8579] uppercase mb-4 tracking-widest">美食地圖名錄</p>
            {foodMap.map((f, i)=>(<FoodCard key={i} n={f.n} t={f.t} a={f.a} />))}
          </div>
        )}

        {activeTab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3 tracking-widest text-left">重要規範</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：必須隨身攜帶</li>
                <li>📸 腳架：一定要托運 (須裝袋)</li>
                <li>✈️ 托運限重：10 公斤 / 人</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden text-left">
              {[
                {id:1, t:"身份證正本 / 駕照 (4人)", c:"重要"},
                {id:2, t:"300-400mm 鏡頭 (拍蜂虎)", c:"攝影"},
                {id:3, t:"偏光/漸層鏡/腳架/快門線", c:"攝影"},
                {id:4, t:"自備盥洗用品 (環保)", c:"生活"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checked.includes(i.id)?'line-through opacity-30 text-[#8C8579]':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === '帳單' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={inItem} onChange={(e: any)=>setInItem(e.target.value)} className="flex-1 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <input type="number" placeholder="$" value={inAmt} onChange={(e: any)=>setInAmt(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <button onClick={()=>{
                  if(inItem && inAmt){ setExpenses([{id:Date.now(), i:inItem, a:Number(inAmt)}, ...expenses]); setInItem(''); setInAmt(''); }
                }} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            {expenses.map(e=>(
              <div key={e.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] flex justify-between items-center shadow-sm">
                <span className="font-black text-left">{e.i}</span><span className="font-black text-[#4A6741]">${e.a}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === '航班' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm text-left">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block tracking-widest">去程 05.27 (三)</span>
              <div className="flex justify-between items-center text-center"><div className="text-left"><p className="text-2xl font-black">TSA</p><p className="text-xs text-[#8C8579] font-bold">07:00</p></div><div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative text-center"><span className="text-lg">✈️</span></div><div className="text-right"><p className="text-2xl font-black">KNH</p><p className="text-xs text-[#8C8579] font-bold">08:05</p></div></div>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm text-left">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block tracking-widest">回程 05.30 (六)</span>
              <div className="flex justify-between items-center text-center"><div className="text-left"><p className="text-2xl font-black">KNH</p><p className="text-xs text-[#8C8579] font-bold">20:15</p></div><div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative text-center"><span className="text-lg rotate-180 inline-block">✈️</span></div><div className="text-right"><p className="text-2xl font-black">TSA</p><p className="text-xs text-[#8C8579] font-bold">21:15</p></div></div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
        {[{id:'行程', i:'🗺️'}, {id:'美食', i:'😋'}, {id:'航班', i:'🎫'}, {id:'準備', i:'🎒'}, {id:'帳單', i:'💰'}].map(tab => (
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`flex flex-col items-center p-2 px-3 rounded-2xl transition-all ${activeTab===tab.id?'bg-[#4A6741] text-white shadow-md':'text-[#8C8579]'}`}>
            <span className="text-lg">{tab.i}</span><span className="text-[8px] font-black">{tab.id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}