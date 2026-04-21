import { useState, useEffect } from 'react';

// --- 1. 輔助組件：美食地圖卡片 ---
const FoodCard = ({ name, tel, addr }: any) => (
  <div className="bg-white p-5 rounded-[2rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <h3 className="text-lg font-black text-[#3D3A36] mb-1">{name}</h3>
    <p className="text-xs font-bold text-[#8C8579] mb-3">📍 {addr}</p>
    <div className="flex space-x-2">
      <a href={`tel:${tel}`} className="flex-1 bg-[#E9F0EA] text-[#4A6741] py-3 rounded-xl font-black text-center text-xs">📞 撥打電話</a>
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`} target="_blank" className="flex-1 bg-[#4A6741] text-white py-3 rounded-xl font-black text-center text-xs">🗺️ 開啟地圖</a>
    </div>
  </div>
);

// --- 2. 底部導覽 (新增美食分頁) ---
const BottomNav = ({ onTabChange, currentTab }: any) => {
  const tabs = [
    { id: '行程', icon: '🗺️' }, { id: '美食', icon: '😋' }, 
    { id: '航班', icon: '🎫' }, { id: '準備', icon: '🎒' }, { id: '帳單', icon: '💰' }
  ];
  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center p-2 px-3 rounded-2xl transition-all ${currentTab === tab.id ? 'bg-[#4A6741] text-white' : 'text-[#8C8579]'}`}>
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[8px] font-black">{tab.id}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 3. 完整資料庫 ---
const scheduleData = [
  { day: "27", breakfast: "標記", lunch: "水頭金道地", dinner: "東門餐廳", hotel: { name: "老閩宅 3 館", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "06:00", title: "松山二航集合", loc: "立榮航空櫃檯", map: "松山機場" },
      { time: "09:30", title: "水頭聚落攝影", loc: "金水國小、得月樓", map: "水頭聚落" },
      { time: "11:30", title: "三大聚落美學", loc: "珠山、歐厝聚落", map: "珠山聚落" },
      { time: "14:00", title: "建功嶼 (退潮)", loc: "石像與海際線", map: "建功嶼" },
      { time: "15:30", title: "湖下海堤沙紋", loc: "退潮限定沙紋攝影", map: "湖下海堤" },
      { time: "18:00", title: "慈堤黃昏", loc: "最美日落點", map: "慈堤" },
      { time: "20:00", title: "後浦老街夜拍", loc: "金城老街人文", map: "金城老街" }
    ]
  },
  { day: "28", breakfast: "民宿", lunch: "海口城餐廳", dinner: "小明的店", hotel: { name: "老閩宅", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "09:00", title: "瓊林聚落", loc: "紅磚巷弄與圖騰", map: "瓊林聚落" },
      { time: "11:00", title: "迎城隍盛典", loc: "金城鎮祭典核心", map: "金城鎮" },
      { time: "15:00", title: "南北山聚落", loc: "古厝人文紀錄", map: "北山聚落" },
      { time: "17:00", title: "嚨口軌條砦", loc: "軌條砦夕照 (退潮)", map: "嚨口沙灘" },
      { time: "18:30", title: "小金門探訪", loc: "北街黑糖剉冰、老街", map: "烈嶼" },
      { time: "19:30", title: "雙口海邊/大橋夜拍", loc: "金門大橋壯觀夜色", map: "金門大橋" }
    ]
  },
  { day: "29", breakfast: "民宿", lunch: "談天樓", dinner: "新天地餐廳", hotel: { name: "老閩宅", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "06:00", title: "栗喉蜂虎攝影", loc: "青年農莊生態區", map: "青年農莊" },
      { time: "10:00", title: "山后民俗村", title2: "陽翟老街", loc: "對稱建築與懷舊場景", map: "山后民俗文化村" },
      { time: "14:00", title: "碧山聚落/沙美老街", loc: "沙美老理髮店人文", map: "沙美老街" },
      { time: "16:00", title: "山外採購", loc: "市區人文巡禮", map: "山外車站" },
      { time: "19:30", title: "瓊林夜拍", loc: "聚落夜間光影紀錄", map: "瓊林聚落" }
    ]
  },
  { day: "30", breakfast: "民宿", lunch: "佑昇餐廳", dinner: "浯倆餐廚", hotel: null,
    items: [
      { time: "09:00", title: "太湖與榕園", loc: "自然光影紀錄", map: "太湖" },
      { time: "11:00", title: "漁村小艇坑道", loc: "E-092 對稱美學", map: "漁村小艇坑道" },
      { time: "13:30", title: "陳景蘭洋樓", loc: "成功海邊洋樓攝影", map: "陳景蘭洋樓" },
      { time: "15:30", title: "明遺老街與舊城門", loc: "最後的人文巡禮", map: "明遺老街" },
      { time: "18:30", title: "尚義機場", loc: "加油還車、平安歸途", map: "金門機場" }
    ]
  }
];

const foodMap = [
  { n: "金道地蚵仔煎", t: "082-327969", a: "金城鎮前水頭15號" },
  { n: "東門餐廳", t: "082-371850", a: "金城鎮東門北提路" },
  { n: "小明的店", t: "082-327441", a: "金寧鄉湖埔村慈湖路一段98號" },
  { n: "記德海鮮餐廳", t: "082-324461", a: "金城鎮慈湖路二段105號" },
  { n: "新天地海產店", t: "082-330656", a: "金湖鎮復國墩31號之1" },
  { n: "談天樓", t: "082-332766", a: "金湖鎮復興路3號" },
  { n: "海口城餐廳", t: "082-328022", a: "金寧鄉慈湖路三段18號巷8-8號" },
  { n: "良金牛肉麵", t: "082-335886", a: "金湖鎮漁村160號" },
  { n: "佑昇生億鍋貼", t: "082-332229", a: "金湖鎮成功村171號" },
  { n: "金許園(酸菜白肉鍋)", t: "082-371626", a: "金城鎮官裏53號" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [expenses, setExpenses] = useState<{id:number, i:string, a:number}[]>([]);

  const currentDay = scheduleData.find(d => d.day === selectedDay);

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-36 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div><p className="text-[#4A6741] font-bold text-[10px] tracking-widest uppercase">May 2026</p><h1 className="text-3xl font-black">金門迎城隍</h1></div>
        <div className="text-right"><span className="text-[10px] font-bold text-[#8C8579] uppercase">Total Spent</span><span className="text-2xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span></div>
      </header>

      <main className="px-6">
        {activeTab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setSelectedDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 ${selectedDay===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}><span className="text-xl font-black">{d}</span></button>
              ))}
            </div>
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-between text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{currentDay?.breakfast}</div>
              <div className="flex-1 border-l border-white/20"><b>午</b><br/>{currentDay?.lunch}</div>
              <div className="flex-1 border-l border-white/20"><b>晚</b><br/>{currentDay?.dinner}</div>
            </div>
            {currentDay?.items.map((item, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}`} target="_blank" className="text-[#4A6741] font-bold text-xs mb-1 underline decoration-dashed block">🕒 {item.time} 📍 {item.loc}</a>
                <h2 className="text-xl font-black leading-tight mb-2">{item.title}</h2>
                <p className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic">💡 {item.remark}</p>
              </div>
            ))}
            {selectedDay==="30" && (
              <div className="bg-[#E9F0EA] p-6 rounded-[2.5rem] border-2 border-[#4A6741]/20 mt-8">
                <p className="text-[10px] font-black text-[#4A6741] uppercase tracking-widest mb-2">備選景點</p>
                <p className="text-xs font-bold text-[#3D3A36] leading-relaxed">翟山坑道、船型堡、探訪軍事據點、沉睡的戰車(退潮)、農試所</p>
              </div>
            )}
            {currentDay?.hotel && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]">
                <p className="text-[10px] font-black text-[#8C8579] uppercase tracking-widest mb-4 text-center">今日住宿</p>
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4A6741] shadow-sm">
                  <h3 className="text-lg font-black mb-1">🏠 {currentDay.hotel.name}</h3>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentDay.hotel.addr)}`} target="_blank" className="text-xs italic text-[#4A6741] underline decoration-dashed block mb-1">📍 {currentDay.hotel.addr}</a>
                  <p className="text-xs font-bold text-[#8C8579]">📞 {currentDay.hotel.tel}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === '美食' && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#8C8579] uppercase tracking-widest mb-4">金門美食推薦名錄</p>
            {foodMap.map((f, i)=>(<FoodCard key={i} name={f.n} tel={f.t} addr={f.a} />))}
          </div>
        )}

        {activeTab === '航班' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">去程 05.27 (三)</span>
              <div className="flex justify-between items-center"><div className="text-left"><p className="text-2xl font-black">TSA</p><p className="text-xs text-[#8C8579] font-bold">07:00</p></div><div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2">✈️</span></div><div className="text-right"><p className="text-2xl font-black">KNH</p><p className="text-xs text-[#8C8579] font-bold">08:05</p></div></div>
              <p className="mt-4 text-[10px] font-bold text-[#4A6741]">📢 06:00 松山二航立榮櫃檯集合</p>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">回程 05.30 (六)</span>
              <div className="flex justify-between items-center"><div className="text-left"><p className="text-2xl font-black">KNH</p><p className="text-xs text-[#8C8579] font-bold">20:15</p></div><div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-180">✈️</span></div><div className="text-right"><p className="text-2xl font-black">TSA</p><p className="text-xs text-[#8C8579] font-bold">21:15</p></div></div>
              <p className="mt-4 text-[10px] font-bold text-[#4A6741]">📢 18:30 機場加油還車集合</p>
            </div>
          </div>
        )}

        {activeTab === '準備' && (
          <div className="space-y-6">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-3">托運規定</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：必須隨身</li>
                <li>✈️ 托運限重：10 公斤/人</li>
                <li>📸 腳架：一定要托運 (需腳架袋)</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
              {[
                {id:1, t:"身份證正本/駕照(4人)", c:"重要"},
                {id:2, t:"300-400mm 鏡頭 (拍蜂虎)", c:"攝影器材"},
                {id:3, t:"偏光/漸層鏡/快門線/三腳架", c:"攝影器材"},
                {id:4, t:"自備盥洗用品(民宿不提供)", c:"生活"},
                {id:5, t:"手電筒/望遠鏡/摺傘/常用藥", c:"生活"},
                {id:6, t:"環保筷/保溫瓶/太陽眼鏡/帽", c:"生活"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setCheckedIds(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                  <span className="text-2xl mr-4">{checkedIds.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checkedIds.includes(i.id)?'line-through opacity-30':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === '帳單' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" className="flex-1 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" id="expItem"/>
                <input type="number" placeholder="$" className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" id="expAmt"/>
                <button onClick={()=>{
                  const i=document.getElementById('expItem') as HTMLInputElement;
                  const a=document.getElementById('expAmt') as HTMLInputElement;
                  if(i.value && a.value){ setExpenses([{id:Date.now(), i:i.value, a:Number(a.value)}, ...expenses]); i.value=''; a.value=''; }
                }} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            {expenses.map(e=>(
              <div key={e.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] flex justify-between items-center shadow-sm">
                <span className="font-black">{e.i}</span>
                <div className="flex items-center space-x-4"><span className="font-black text-[#4A6741]">${e.a}</span><button onClick={()=>setExpenses(expenses.filter(x=>x.id!==e.id))} className="opacity-20">✕</button></div>
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNav onTabChange={setActiveTab} current