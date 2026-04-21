import { useState, useEffect } from 'react';

// --- 1. 輔助組件：機票卡片 ---
const FlightCard = ({ type, airline, flightNo, date, time, from, to, note }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <div className="flex justify-between items-center mb-4">
      <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{type}</span>
      <span className="text-[#8C8579] font-bold text-xs">{airline} {flightNo}</span>
    </div>
    <div className="flex justify-between items-center mb-4">
      <div className="text-left">
        <div className="text-2xl font-black">{from}</div>
        <div className="text-xs text-[#8C8579] font-bold">{date}</div>
      </div>
      <div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">✈️</span>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black">{to}</div>
        <div className="text-xs text-[#8C8579] font-bold">{time}</div>
      </div>
    </div>
    {note && <div className="text-[10px] font-bold text-[#4A6741] bg-[#E9F0EA] p-3 rounded-xl">📢 {note}</div>}
  </div>
);

// --- 2. 輔助組件：底部導覽 ---
const BottomNav = ({ onTabChange, currentTab }: any) => {
  const tabs = [{ id: '行程', icon: '🗺️' }, { id: '航班', icon: '🎫' }, { id: '帳單', icon: '💰' }, { id: '準備', icon: '🎒' }];
  return (
    <nav className="fixed bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-3 flex justify-around items-center shadow-lg z-50">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center p-3 rounded-2xl transition-all ${currentTab === tab.id ? 'bg-[#4A6741] text-white scale-110 shadow-md' : 'text-[#8C8579]'}`}>
          <span className="text-xl mb-1">{tab.icon}</span>
          <span className="text-[10px] font-black">{tab.id}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 3. 完整行程與住宿資料 [cite: 11-24, 33-53] ---
const scheduleData = [
  { 
    day: "27", 
    breakfast: "標記", lunch: "金道地", dinner: "東門餐廳",
    hotel: { name: "老閩宅 3 館", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "06:00", location: "松山二航", title: "集合出發 ✈️", remark: "立榮櫃檯集合 (07:00 起飛)" },
      { time: "09:30", location: "水頭聚落", title: "古厝建築巡禮", remark: "金水國小、得月樓攝影" },
      { time: "14:00", location: "建功嶼/湖下", title: "退潮沙紋攝影 🌊", remark: "拍攝建功嶼與湖下海堤沙紋" },
      { time: "18:00", location: "慈堤", title: "慈堤黃昏 🌅", remark: "金門日落大景拍攝" },
      { time: "20:00", location: "後浦老街", title: "金城老街夜拍 🌙", remark: "拍攝紅燈籠與人文煙火氣" }
    ] 
  },
  { 
    day: "28", 
    breakfast: "民宿", lunch: "海口城", dinner: "小明的店",
    hotel: { name: "老閩宅 3 館", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "09:00", location: "瓊林聚落", title: "瓊林巡禮 🏮", remark: "聚落圖騰與紅磚建築攝影" },
      { time: "11:00", location: "金城鎮", title: "金城迎城隍盛典 🥁", remark: "核心行程：捕捉祭典陣頭張力" },
      { time: "15:30", location: "南、北山", title: "南、北山聚落攝影", remark: "拍攝生活細節與人文肖像" },
      { time: "17:30", location: "嚨口沙灘", title: "軌條砦夕照 (退潮) 🛡️", remark: "利用軌條砦拍出戰地電影感" },
      { time: "19:30", location: "小金門/大橋", title: "大橋光影夜拍 🌉", remark: "金門大橋壯麗線條與夜景對望" }
    ] 
  },
  { 
    day: "29", 
    breakfast: "民宿", lunch: "談天樓", dinner: "新天地餐廳",
    hotel: { name: "老閩宅 3 館", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "06:00", location: "青年農莊", title: "栗喉蜂虎攝影 🐦", remark: "長焦鏡頭準備，捕捉飛行姿態" },
      { time: "10:00", location: "山后/陽翟", title: "民俗村與老街 🎥", remark: "對稱建築與懷舊場景攝影" },
      { time: "14:30", location: "碧山/沙美", title: "碧山與沙美人文 💈", remark: "沙美老理髮店人文肖像紀錄" },
      { time: "19:30", location: "瓊林聚落", title: "瓊林夜拍 🕯️", remark: "夜間聚落光影層次紀錄" }
    ] 
  },
  { 
    day: "30", 
    breakfast: "民宿", lunch: "佑昇餐廳", dinner: "浯倆餐廚",
    hotel: { name: "老閩宅 3 館", addr: "金門縣金湖鎮瓊林 150 號", tel: "0933-699582" },
    items: [
      { time: "09:00", location: "太湖/榕園", title: "太湖晨曦 🌳", remark: "湖光色影與自然紀錄" },
      { time: "11:00", location: "漁村坑道", title: "漁村小艇坑道 ⚓", remark: "對稱美學光影攝影" },
      { time: "13:30", location: "陳景蘭洋樓", title: "洋樓建築美學 🏛️", remark: "成功海邊精緻洋樓攝影" },
      { time: "15:30", location: "明遺/舊城", title: "最後巡禮 ⛩️", remark: "明遺老街與舊城門紀錄" },
      { time: "18:30", location: "金門機場", title: "歸途 ✈️", remark: "加油還車，20:15 起飛回台" }
    ] 
  }
];

// --- 4. 主程式 ---
export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  
  const [expenses, setExpenses] = useState<{id: number, item: string, amount: number}[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const [checkedIds, setCheckedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('checkedIds');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('checkedIds', JSON.stringify(checkedIds));
  }, [expenses, checkedIds]);

  const addExpense = () => {
    if (!newItem || !newAmount) return;
    setExpenses([{ id: Date.now(), item: newItem, amount: Number(newAmount) }, ...expenses]);
    setNewItem(''); setNewAmount('');
  };

  const currentDay = scheduleData.find(d => d.day === selectedDay);

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-32 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
          <p className="text-[#4A6741] font-bold text-[10px] tracking-widest mb-1 uppercase">May 2026</p>
          <h1 className="text-3xl font-black">金門迎城隍</h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#8C8579] block uppercase">Total Spent</span>
          <span className="text-2xl font-black text-[#4A6741]">NT${expenses.reduce((sum, e) => sum + e.amount, 0)}</span>
        </div>
      </header>

      <main className="px-6">
        {activeTab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
              {['27', '28', '29', '30'].map(day => (
                <button key={day} onClick={() => setSelectedDay(day)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${selectedDay === day ? 'bg-white border-[#4A6741] shadow-sm' : 'opacity-40 border-[#E5E0D8]'}`}>
                  <span className="text-xl font-black">{day}</span>
                </button>
              ))}
            </div>

            {/* 美食快訊 */}
            <div className="bg-[#4A6741] p-5 rounded-[2rem] text-white flex justify-around text-center shadow-lg">
              <div><p className="text-[8px] opacity-70 font-bold uppercase">早餐</p><p className="font-black text-xs">{currentDay?.breakfast}</p></div>
              <div className="border-l border-white/20 px-4">
                <p className="text-[8px] opacity-70 font-bold uppercase">午餐</p>
                <p className="font-black text-xs">{currentDay?.lunch}</p>
              </div>
              <div className="border-l border-white/20 px-4">
                <p className="text-[8px] opacity-70 font-bold uppercase">晚餐</p>
                <p className="font-black text-xs">{currentDay?.dinner}</p>
              </div>
            </div>

            {currentDay?.items.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <p className="text-[#4A6741] font-bold text-xs mb-2">🕒 {item.time} 📍 {item.location}</p>
                <h2 className="text-xl font-black mb-2 leading-tight">{item.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic">💡 {item.remark}</div>
              </div>
            ))}

            {/* 每一天最下方的住宿標記  */}
            {currentDay?.hotel && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]">
                <p className="text-[10px] font-black text-[#8C8579] uppercase tracking-widest mb-4 text-center">今日入住飯店</p>
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4A6741] shadow-sm">
                  <h3 className="text-xl font-black mb-1">🏠 {currentDay.hotel.name}</h3>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentDay.hotel.addr)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm italic text-[#4A6741] underline decoration-dashed block mb-2"
                  >
                    📍 {currentDay.hotel.addr}
                  </a>
                  <p className="text-sm font-bold text-[#8C8579]">📞 {currentDay.hotel.tel}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 帳單與航班分頁維持穩定架構 */}
        {activeTab === '帳單' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <h3 className="font-bold text-xs text-[#8C8579] mb-4 uppercase tracking-widest">快速記帳</h3>
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="w-full p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <input type="number" placeholder="$" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <button onClick={addExpense} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            {expenses.map(exp => (
              <div key={exp.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] flex justify-between items-center shadow-sm">
                {editingId === exp.id ? (
                  <div className="flex items-center space-x-2 w-full">
                    <input type="text" value={editItem} onChange={(e) => setEditItem(e.target.value)} className="flex-1 p-2 bg-[#F8F5F0] rounded-lg font-bold" />
                    <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} className="w-20 p-2 bg-[#F8F5F0] rounded-lg font-bold" />
                    <button onClick={() => {
                      setExpenses(expenses.map(e => e.id === editingId ? { ...e, item: editItem, amount: Number(editAmount) } : e));
                      setEditingId(null);
                    }} className="text-[#4A6741] font-black p-2">💾</button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <span className="font-black text-lg">{exp.item}</span>
                    <div className="flex items-center space-x-4">
                      <span className="font-black text-[#4A6741] text-xl">${exp.amount}</span>
                      <button onClick={() => { setEditingId(exp.id); setEditItem(exp.item); setEditAmount(exp.amount.toString()); }} className="opacity-30">📝</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === '航班' && (
          <div>
            <FlightCard type="去程" airline="立榮航空" flightNo="B7-8801" date="05.27 (三)" time="07:00 - 08:05" from="TSA" to="KNH" note="06:00 松山二航集合" />
            <FlightCard type="回程" airline="立榮航空" flightNo="B7-8836" date="05.30 (六)" time="20:15 - 21:15" from="KNH" to="TSA" note="18:30 機場還車" />
          </div>
        )}

        {activeTab === '準備' && (
          <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden text-left">
            {[ {id:1, task:"身份證正本/駕照"}, {id:2, task:"300-400mm 鏡頭"}, {id:3, task:"自備盥洗用品"}, {id:4, task:"三腳架 (托運)"} ].map(item => (
              <div key={item.id} onClick={() => setCheckedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                <span className="text-2xl mr-4">{checkedIds.includes(item.id) ? '✅' : '⬜'}</span>
                <span className={`font-bold ${checkedIds.includes(item.id) ? 'line-through opacity-30 text-[#8C8579]' : ''}`}>{item.task}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav onTabChange={setActiveTab} currentTab={activeTab} />
    </div>
  );
}