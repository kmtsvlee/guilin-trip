import { useState, useEffect } from 'react';

// --- 1. 輔助組件：機票卡片 ---
const FlightCard = ({ type, airline, flightNo, date, time, from, to }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
    <div className="flex justify-between items-center mb-4 text-left">
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
  const tabs = [
    { id: '行程', icon: '🗺️' },
    { id: '預訂', icon: '🎫' },
    { id: '帳單', icon: '💰' },
    { id: '準備', icon: '🎒' }
  ];
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

// --- 3. 完整行程資料  ---
const scheduleData = [
  { day: "27", items: [
    { time: "08:30", location: "市區", title: "在地早餐 🥣", remark: "建議尋找傳統廣東粥。" },
    { time: "09:30", location: "水頭/珠山/歐厝", title: "三大聚落美學 🏛️", remark: "拍攝重點：水頭洋樓、珠山與歐厝古厝群。" },
    { time: "15:30", location: "建功嶼/湖下", title: "海際線與沙紋 🌊", remark: "捕捉建功嶼石像與海堤沙紋。" },
    { time: "18:00", location: "慈堤", title: "慈堤黃昏夕陽 🌅", remark: "捕捉金門最美日落。" },
    { time: "20:00", location: "後浦老街", title: "後浦夜拍 🌙", remark: "紅燈籠與戰後建築夜間氛圍。" }
  ]},
  { day: "28", items: [
    { time: "11:00", location: "金城鎮", title: "金城迎城隍 🥁", remark: "年度盛典！捕捉祭典陣頭張力。" },
    { time: "17:30", location: "嚨口沙灘", title: "軌條砦夕照 🛡️", remark: "利用軌條砦拍出戰地電影感。" }
  ]},
  { day: "29", items: [
    { time: "06:00", location: "青年農莊", title: "栗喉蜂虎生態 🐦", remark: "捕捉蜂虎優美姿態。" },
    { time: "14:30", location: "沙美老街", title: "生活肌理攝影 💈", remark: "沙美老理髮店人文肖像。" }
  ]},
  { day: "30", items: [
    { time: "11:00", location: "漁村坑道", title: "坑道對稱美學 ⚓", remark: "利用坑道倒影創造震撼對稱感。" }
  ]}
];

// --- 4. 主程式 ---
export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  
  // 帳單狀態
  const [expenses, setExpenses] = useState<{id: number, item: string, amount: number}[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');

  // 編輯狀態
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

  // 新增
  const addExpense = () => {
    if (!newItem || !newAmount) return;
    setExpenses([{ id: Date.now(), item: newItem, amount: Number(newAmount) }, ...expenses]);
    setNewItem(''); setNewAmount('');
  };

  // 開始編輯
  const startEdit = (exp: any) => {
    setEditingId(exp.id);
    setEditItem(exp.item);
    setEditAmount(exp.amount.toString());
  };

  // 儲存編輯
  const saveEdit = () => {
    setExpenses(expenses.map(e => e.id === editingId ? { ...e, item: editItem, amount: Number(editAmount) } : e));
    setEditingId(null);
  };

  // 刪除
  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
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
            {/* 新增欄位 */}
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <h3 className="font-bold text-xs text-[#8C8579] mb-4 uppercase tracking-widest">Quick Add</h3>
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="flex-2 w-full p-4 rounded-2xl bg-[#F8F5F0] border-0 font-bold text-sm" />
                <input type="number" placeholder="$" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="flex-1 w-24 p-4 rounded-2xl bg-[#F8F5F0] border-0 font-bold text-sm" />
                <button onClick={addExpense} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>

            {/* 列表 */}
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
                      <div className="flex flex-col">
                        <span className="font-black text-lg">{exp.item}</span>
                        <span className="text-[10px] font-bold text-[#8C8579] uppercase">Expense</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-[#4A6741] text-xl">${exp.amount}</span>
                        <div className="flex space-x-2 opacity-30">
                          <button onClick={() => startEdit(exp)}>📝</button>
                          <button onClick={() => deleteExpense(exp.id)}>✕</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 預訂與準備分頁... (維持原樣) */}
        {activeTab === '預訂' && (
          <div>
            <FlightCard type="去程" airline="立榮航空" flightNo="B7-8801" date="2026.05.27" time="07:00 - 08:05" from="TSA" to="KNH" />
            <FlightCard type="回程" airline="立榮航空" flightNo="B7-8836" date="2026.05.30" time="20:15 - 21:15" from="KNH" to="TSA" />
          </div>
        )}
        {activeTab === '準備' && (
          <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
            {[ {id:1, task:"廣角鏡頭"}, {id:2, task:"長焦鏡頭"}, {id:3, task:"身分證/機票"} ].map(item => (
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