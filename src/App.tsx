import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import FlightCard from './components/FlightCard';

// 1. 行程資料 [cite: 1-9]
const scheduleData = [
  { 
    day: "27", 
    items: [
      { time: "08:30", location: "市區", title: "金門早餐 🍜", remark: "開啟味蕾，建議尋找在地廣東粥。" },
      { time: "09:30", location: "水頭/珠山/歐厝", title: "三大聚落美學 🏛️", remark: "人文與建築大景，適合廣角表現聚落與層次。" },
      { time: "15:00", location: "建功嶼/湖下海堤", title: "建功嶼與沙紋攝影 🌊", remark: "注意潮汐時間，拍攝湖下海堤獨特的沙紋。" },
      { time: "18:00", location: "慈堤", title: "慈堤黃昏夕陽 🌅", remark: "攝影師必爭之地，廣角捕捉海天一色。" },
      { time: "20:00", location: "後浦(金城)老街", title: "後浦老街夜拍 🌙", remark: "夜拍重點：紅燈籠下的建築與人文張力。" }
    ] 
  },
  { 
    day: "28", 
    items: [
      { time: "08:30", location: "市區/瓊林", title: "早餐與瓊林巡禮 🏮", remark: "清晨光線柔和，適合拍攝紅磚巷弄與人文圖騰。" },
      { time: "11:00", location: "金城鎮", title: "正日：迎城隍盛典 🥁", remark: "本次旅程核心！捕捉祭典高潮、陣頭與信眾神情。" },
      { time: "17:30", location: "嚨口沙灘", title: "軌條砦夕照 🛡️", remark: "利用軌條砦作為前景，拍出戰地特有的淒美感。" },
      { time: "19:30", location: "小金門/金門大橋", title: "小金門探訪與大橋夜色 🌉", remark: "拍攝大橋壯麗線條與對岸光影。" }
    ] 
  },
  { 
    day: "29", 
    items: [
      { time: "06:00", location: "青年農莊", title: "栗喉蜂虎生態 🐦", remark: "夏季限定！長焦預備，捕捉蜂虎優美的飛行。" },
      { time: "10:00", location: "山后民俗村/陽翟", title: "民俗建築與復古老街 🎥", remark: "山后對稱建築、陽翟老街的懷舊感。" },
      { time: "14:30", location: "碧山/沙美老街", title: "碧山與沙美人文 💈", remark: "尋找沙美老理髮店，捕捉「生活肌理」的人文肖像。" }
    ] 
  },
  { 
    day: "30", 
    items: [
      { time: "09:00", location: "太湖/榕園", title: "湖光色影紀錄 🌳", remark: "拍攝太湖水鳥與榕園古樸自然的光影。" },
      { time: "11:00", location: "漁村小艇坑道", title: "坑道對稱美學 ⚓", remark: "極致的對稱構圖點，利用水面倒影創造視覺震撼。" },
      { time: "15:30", location: "金門機場", title: "回程與整理 ✈️", remark: "帶著充滿「煙火氣」的記憶與畫面，平安賦歸。" }
    ] 
  }
];

const initialChecklist = [
  { id: 1, task: "廣角鏡頭 (聚落/大橋/沙紋)", category: "器材" },
  { id: 2, task: "長焦鏡頭 (栗喉蜂虎專用)", category: "器材" },
  { id: 3, task: "備用電池與快門線", category: "器材" },
  { id: 4, task: "防曬用品與防蚊液", category: "生活" },
  { id: 5, task: "身分證件與電子機票", category: "重要" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  
  // 使用 localStorage 保持資料持久化
  const [checkedIds, setCheckedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('checkedIds');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState<{id: number, item: string, amount: number}[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('checkedIds', JSON.stringify(checkedIds));
  }, [checkedIds]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const currentDayData = scheduleData.find(d => d.day === selectedDay)?.items || [];

  const toggleCheck = (id: number) => {
    setCheckedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const addExpense = () => {
    if (!newItem || !newAmount) return;
    const expense = {
      id: Date.now(),
      item: newItem,
      amount: Number(newAmount)
    };
    setExpenses([expense, ...expenses]);
    setNewItem('');
    setNewAmount('');
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-paper pb-32 font-sans text-earth-dark text-left transition-colors duration-500">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
          <p className="text-leaf font-bold text-[10px] tracking-widest mb-1 uppercase">May 2026</p>
          <h1 className="text-3xl font-black">金門迎城隍</h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-earth-light block uppercase">Total Spent</span>
          <span className="text-2xl font-black text-leaf">NT${totalExpense}</span>
        </div>
      </header>

      <main className="px-6">
        {/* --- 行程分頁 --- */}
        {activeTab === '行程' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
              {['27', '28', '29', '30'].map((day) => (
                <button key={day} onClick={() => setSelectedDay(day)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${selectedDay === day ? 'bg-white border-leaf shadow-soft scale-105' : 'opacity-40 border-paper-dark'}`}>
                  <span className="text-xl font-black">{day}</span>
                </button>
              ))}
            </div>
            {currentDayData.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-paper-dark shadow-soft">
                <div className="text-leaf font-bold text-xs mb-2">🕒 {item.time} 📍 {item.location}</div>
                <h2 className="text-xl font-black mb-2">{item.title}</h2>
                <div className="bg-paper/40 p-4 rounded-2xl border border-dashed border-earth-light/30 text-sm italic">💡 {item.remark}</div>
              </div>
            ))}
          </div>
        )}

        {/* --- 預訂分頁 --- */}
        {activeTab === '預訂' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <FlightCard type="去程" airline="立榮航空" flightNo="B7-8801" date="2026.05.27" time="07:00 - 08:05" from="TSA" to="KNH" />
            <FlightCard type="回程" airline="立榮航空" flightNo="B7-8836" date="2026.05.30" time="20:15 - 21:15" from="KNH" to="TSA" />
          </div>
        )}

        {/* --- 帳單分頁 (新功能！) --- */}
        {activeTab === '帳單' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-paper-dark shadow-soft">
              <h3 className="font-bold text-xs text-earth-light mb-4 uppercase tracking-widest text-left">Quick Add Expense</h3>
              <div className="space-y-3">
                <input type="text" placeholder="項目 (例如：租車)" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="w-full p-4 rounded-2xl bg-paper/50 border-2 border-transparent focus:border-leaf outline-none font-bold" />
                <input type="number" placeholder="金額" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-full p-4 rounded-2xl bg-paper/50 border-2 border-transparent focus:border-leaf outline-none font-bold" />
                <button onClick={addExpense} className="w-full py-4 bg-leaf text-white rounded-2xl font-black shadow-leaf/30 shadow-lg active:scale-95 transition-transform">新增支出</button>
              </div>
            </div>
            
            <div className="space-y-3">
              {expenses.map((exp) => (
                <div key={exp.id} className="bg-white px-6 py-4 rounded-2xl border-2 border-paper-dark flex justify-between items-center shadow-soft">
                  <div>
                    <div className="font-black text-lg">{exp.item}</div>
                    <div className="text-xs font-bold text-earth-light uppercase">Expense</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-black text-leaf text-xl">${exp.amount}</span>
                    <button onClick={() => deleteExpense(exp.id)} className="text-red-300 hover:text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 準備分頁 --- */}
        {activeTab === '準備' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="font-bold text-xs text-earth-light tracking-widest uppercase text-left">Packing Checklist</h3>
            <div className="bg-white rounded-[2.5rem] border-2 border-paper-dark shadow-soft overflow-hidden">
              {initialChecklist.map((item) => (
                <div key={item.id} onClick={() => toggleCheck(item.id)} className="flex items-center p-6 border-b-2 border-paper last:border-0 active:bg-paper/30 transition-colors">
                  <span className="text-2xl mr-4">{checkedIds.includes(item.id) ? '✅' : '⬜'}</span>
                  <div className="flex flex-col">
                    <span className={`font-bold ${checkedIds.includes(item.id) ? 'line-through opacity-30 text-earth-light' : ''}`}>{item.task}</span>
                    <span className="text-[10px] font-bold text-earth-light uppercase">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav onTabChange={setActiveTab} currentTab={activeTab} />
    </div>
  );
}