import { useState, useEffect } from 'react';

// --- 1. 輔助組件：機票卡片 ---
const FlightCard = ({ type, airline, flightNo, date, time, from, to }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <div className="flex justify-between items-center mb-4">
      <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{type}</span>
      <span className="text-[#8C8579] font-bold text-xs">{airline} {flightNo}</span>
    </div>
    <div className="flex justify-between items-center">
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

// --- 3. 完整行程資料 (新增 Google Maps 導航連結) ---
const scheduleData = [
  { day: "27", items: [
    { time: "08:30", location: "市區", title: "金門在地早餐 🍲", remark: "建議尋找傳統廣東粥。", mapUrl: "https://maps.app.goo.gl/oo4x1c3xkXSv2VBZ8=金城鎮市區" },
    { time: "09:30", location: "水頭/珠山/歐厝", title: "水頭、珠山、歐厝 🏛️", remark: "拍攝洋樓美學與古厝聚落", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門水頭聚落" },
    { time: "14:00", location: "明遺/翟山", title: "備選：明遺老街與翟山坑道 🛡️", remark: "歷史感極強的備選景點", mapUrl: "https://www.google.com/maps/search/?api=1&query=翟山坑道" },
    { time: "15:30", location: "建功嶼/湖下", title: "建功嶼與湖下海堤沙紋 🌊", remark: "捕捉海堤沙紋理與建功嶼石像", mapUrl: "https://www.google.com/maps/search/?api=1&query=建功嶼" },
    { time: "18:00", location: "慈堤", title: "慈堤黃昏 🌅", remark: "金門最美落日拍攝點", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門慈堤" },
    { time: "20:00", location: "後浦老街", title: "後浦(金城)老街夜拍 🌙", remark: "巷弄紅燈籠與戰後建築", mapUrl: "https://www.google.com/maps/search/?api=1&query=後浦老街" }
  ]},
  { day: "28", items: [
    { time: "08:30", location: "瓊林", title: "瓊林聚落 🏮", remark: "清晨拍攝紅磚巷弄與人文圖騰", mapUrl: "https://www.google.com/maps/search/?api=1&query=瓊林聚落" },
    { time: "11:00", location: "金城鎮", title: "金城迎城隍 🥁", remark: "行程核心：捕捉祭典與陣頭張力", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門浯島城隍廟" },
    { time: "15:30", location: "南、北山", title: "南、北山聚落 🏡", remark: "人文肖像與生活細節", mapUrl: "https://www.google.com/maps/search/?api=1&query=北山聚落" },
    { time: "17:30", location: "嚨口沙灘", title: "嚨口沙灘軌條砦 🛡️", remark: "夕陽下的軌條砦電影感大景", mapUrl: "https://www.google.com/maps/search/?api=1&query=嚨口沙灘" },
    { time: "19:30", location: "小金門/大橋", title: "小金門與金門大橋夜拍 🌉", remark: "壯麗大橋線條與夜景對望", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門大橋" }
  ]},
  { day: "29", items: [
    { time: "06:00", location: "青年農莊", title: "栗喉蜂虎生態攝影 🐦", remark: "捕捉蜂虎飛行姿態與色彩", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門青年農莊" },
    { time: "10:00", location: "山后/陽翟", title: "山后民俗村與陽翟老街 🎥", remark: "對稱建築與懷舊場景", mapUrl: "https://www.google.com/maps/search/?api=1&query=山后民俗村" },
    { time: "14:30", location: "碧山/沙美", title: "碧山聚落與沙美老街 💈", remark: "沙美人文肌理肖像攝影", mapUrl: "https://www.google.com/maps/search/?api=1&query=沙美老街" },
    { time: "19:30", location: "瓊林", title: "瓊林夜拍 🕯️", remark: "夜間聚落的古樸與低光影", mapUrl: "https://www.google.com/maps/search/?api=1&query=瓊林聚落" }
  ]},
  { day: "30", items: [
    { time: "09:00", location: "太湖/榕園", title: "太湖與榕園紀錄 🌳", remark: "湖光色影與自然紀錄 。", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門太湖" },
    { time: "11:00", location: "漁村坑道", title: "漁村小艇坑道 (E-092) ⚓", remark: "極致對稱與坑道光影 。", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門漁村小艇坑道" },
    { time: "13:30", location: "軍事據點", title: "探訪軍事據點 🪖", remark: "尋找被遺忘的碉堡細節 。", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門軍事據點" },
    { time: "15:30", location: "機場", title: "整理與歸途 ✈️", remark: "帶著豐富畫面結束金門攝影之旅。", mapUrl: "https://www.google.com/maps/search/?api=1&query=金門機場" }
  ]}
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

  const startEdit = (exp: any) => {
    setEditingId(exp.id); setEditItem(exp.item); setEditAmount(exp.amount.toString());
  };

  const saveEdit = () => {
    setExpenses(expenses.map(e => e.id === editingId ? { ...e, item: editItem, amount: Number(editAmount) } : e));
    setEditingId(null);
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-32 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
          <p className="text-[#4A6741] font-bold text-[10px] tracking-widest mb-1 uppercase">May 2026</p>
          <h1 className="text-3xl font-black">金門迎城隍</h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#8C8579] block uppercase">Total Spent</span>
          <span className="text-2xl font-black text-[#4A6741]">NT${totalSpent}</span>
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
            {scheduleData.find(d => d.day === selectedDay)?.items.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                {/* 景點連結區域 */}
                <a 
                  href={item.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block text-[#4A6741] font-bold text-xs mb-2 underline decoration-dashed active:opacity-50 transition-opacity"
                >
                  🕒 {item.time} 📍 {item.location}
                </a>
                <h2 className="text-xl font-black mb-2 leading-tight">{item.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic">💡 {item.remark}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === '帳單' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <h3 className="font-bold text-xs text-[#8C8579] mb-4 uppercase tracking-widest">Quick Add</h3>
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="w-full p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none border-2 border-transparent focus:border-[#4A6741]" />
                <input type="number" placeholder="$" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none border-2 border-transparent focus:border-[#4A6741]" />
                <button onClick={addExpense} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            <div className="space-y-3">
              {expenses.map(exp => (
                <div key={exp.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] shadow-sm">
                  {editingId === exp.id ? (
                    <div className="flex items-center space-x-2">
                      <input type="text" value={editItem} onChange={(e) => setEditItem(e.target.value)} className="flex-1 p-2 bg-[#F8F5F0] rounded-lg font-bold" />
                      <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} className="w-20 p-2 bg-[#F8F5F0] rounded-lg font-bold" />
                      <button onClick={saveEdit} className="text-[#4A6741] font-black p-2">💾</button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col text-left">
                        <span className="font-black text-lg">{exp.item}</span>
                        <span className="text-[10px] font-bold text-[#8C8579] uppercase">Expense Item</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-[#4A6741] text-xl">${exp.amount}</span>
                        <div className="flex space-x-3 opacity-30 text-lg">
                          <button onClick={() => startEdit(exp)}>📝</button>
                          <button onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))}>✕</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 預訂與準備分頁維持原樣 */}
        {activeTab === '航班' && (
          <div>
            <FlightCard type="去程" airline="立榮航空" flightNo="B7-8801" date="2026.05.27" time="07:00 - 08:05" from="TSA" to="KNH" />
            <FlightCard type="回程" airline="立榮航空" flightNo="B7-8836" date="2026.05.30" time="20:15 - 21:15" from="KNH" to="TSA" />
          </div>
        )}
        {activeTab === '準備' && (
          <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden text-left">
            {[ {id:1, task:"廣角鏡頭 (拍建築/夕陽)"}, {id:2, task:"長焦鏡頭 (拍栗喉蜂虎)"}, {id:3, task:"備用電池與記憶卡"}, {id:4, task:"身分證與電子機票"} ].map(item => (
              <div key={item.id} onClick={() => setCheckedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                <span className="text-2xl mr-4">{checkedIds.includes(item.id) ? '✅' : '⬜'}</span>
                <span className={`font-bold ${checkedIds.includes(item.id) ? 'line-through opacity-30' : ''}`}>{item.task}</span>
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNav onTabChange={setActiveTab} currentTab={activeTab} />
    </div>
  );
}