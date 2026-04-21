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
  const tabs = [{ id: '行程', icon: '🗺️' }, { id: '預訂', icon: '🎫' }, { id: '帳單', icon: '💰' }, { id: '準備', icon: '🎒' }];
  return (
    <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-3 flex justify-around items-center shadow-lg z-50">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center p-3 rounded-2xl transition-all ${currentTab === tab.id ? 'bg-[#4A6741] text-white scale-110' : 'text-[#8C8579]'}`}>
          <span className="text-xl mb-1">{tab.icon}</span>
          <span className="text-[10px] font-black">{tab.id}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 3. 完整行程資料 (依據文檔全面補齊) ---
const scheduleData = [
  { day: "27", items: [
    { time: "08:30", location: "市區", title: "金門早餐", remark: "開啟味蕾之旅。" },
    { time: "09:30", location: "水頭/珠山/歐厝", title: "古厝聚落巡禮", remark: "人文與建築層次，適合廣角攝影。" },
    { time: "13:30", location: "明遺老街/翟山坑道", title: "備選：歷史軌跡", remark: "坑道倒影或老街古樸氛圍。" },
    { time: "15:30", location: "建功嶼/湖下海堤", title: "建功嶼與海堤沙紋", remark: "注意潮汐，拍攝獨特沙紋理攝影。" },
    { time: "18:00", location: "慈堤", title: "慈堤黃昏夕照", remark: "捕捉金門最美日落。" },
    { time: "20:00", location: "後浦老街", title: "後浦老街夜拍", remark: "紅燈籠與人文煙火氣。" }
  ]},
  { day: "28", items: [
    { time: "08:30", location: "瓊林", title: "瓊林聚落巡禮", remark: "清晨光線柔和，拍紅磚巷弄。" },
    { time: "11:00", location: "金城鎮", title: "金城迎城隍盛典", remark: "本次核心！捕捉祭典陣頭張力。" },
    { time: "15:30", location: "南北山聚落", title: "南、北山巡禮", remark: "人文細節與生活氣息紀錄。" },
    { time: "17:30", location: "嚨口沙灘", title: "嚨口軌條砦夕照", remark: "拍出戰地電影感的前景。" },
    { time: "20:00", location: "小金門/大橋", title: "小金門探訪與大橋夜拍", remark: "金門大橋壯麗線條與夜景。" }
  ]},
  { day: "29", items: [
    { time: "06:00", location: "青年農莊", title: "栗喉蜂虎生態攝影", remark: "夏季限定，長焦捕捉飛行色彩。" },
    { time: "10:00", location: "山后/陽翟", title: "山后民俗村與陽翟老街", remark: "對稱建築與懷舊場景。" },
    { time: "14:30", location: "碧山/沙美", title: "碧山聚落與沙美老街", remark: "沙美老理髮店的人文肖像紀錄。" },
    { time: "19:30", location: "瓊林聚落", title: "瓊林夜巡夜拍", remark: "夜間聚落古樸低光影層次。" }
  ]},
  { day: "30", items: [
    { time: "09:00", location: "太湖/榕園", title: "太湖與榕園紀錄", remark: "自然光影與湖光色影。" },
    { time: "11:00", location: "漁村小艇坑道", title: "漁村小艇坑道 (E-092)", remark: "極致對稱與坑道光影美學。" },
    { time: "13:30", location: "軍事據點", title: "軍事據點探訪", remark: "尋找被時間遺忘的碉堡細節。" },
    { time: "15:30", location: "機場", title: "回程與整理", remark: "結束充實的金門攝影之旅。" }
  ]}
];

// --- 4. 主程式 ---
export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  
  // 帳單邏輯
  const [expenses, setExpenses] = useState<{id: number, item: string, amount: number}[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');

  // 編輯邏輯
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

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-32 font-sans text-[#3D3A36] text-left transition-all">
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
            {scheduleData.find(d => d.day === selectedDay)?.items.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
                <div className="text-[#4A6741] font-bold text-xs mb-2">🕒 {item.time} 📍 {item.location}</div>
                <h2 className="text-xl font-black mb-2">{item.title}</h2>
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
                <input type="text" placeholder="項目" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="w-full p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm" />
                <input type="number" placeholder="$" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm" />
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
                      <button onClick={saveEdit} className="text-[#4A6741] font-black">💾</button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col text-left">
                        <span