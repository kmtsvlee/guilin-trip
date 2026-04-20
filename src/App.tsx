import { useState } from 'react';
import BottomNav from './components/BottomNav';
import FlightCard from './components/FlightCard';

// 1. 金門城隍祭 4 天完整攝影行程 (每日 4 行程)
const scheduleData = [
  { 
    day: "27", 
    items: [
      { time: "08:05", location: "金門機場", title: "解鎖金門 ✈️", remark: "取車後直奔市區，先適應金門的慢節奏。" },
      { time: "11:30", location: "金城菜市場", title: "市場午間煙火氣 🥢", remark: "捕捉攤販忙碌身影與蒸氣，這是最有生活感的時候。" },
      { time: "14:30", location: "模範街", title: "紅磚拱廊攝影 📸", remark: "下午光影灑在對稱拱廊，廣角鏡頭的最佳實驗場。" },
      { time: "19:30", location: "金城老街", title: "祭典前夜巡禮 🌙", remark: "拍拍紅燈籠下的老建築，捕捉城隍祭前的寧靜張力。" }
    ] 
  },
  { 
    day: "28", 
    items: [
      { time: "09:00", location: "浯島城隍廟", title: "正日起駕儀式 🏮", remark: "城隍祭最高潮！煙火繚繞與陣頭交織，人文攝影核心。" },
      { time: "12:00", location: "市區小巷", title: "廟會街頭小吃 🍜", remark: "拍拍吃著廣東粥的信眾，捕捉祭典中的日常片段。" },
      { time: "14:00", location: "後浦老街", title: "神轎遶境高潮 🥁", remark: "神轎穿梭窄巷，用廣角鏡頭貼近人物情緒與動作。" },
      { time: "21:00", location: "城隍廟口", title: "夜宴與謝神 🕯️", remark: "拍拍祭典結束後留下的燈影與殘煙，很有電影感。" }
    ] 
  },
  { 
    day: "29", 
    items: [
      { time: "10:00", location: "水頭聚落", title: "洋樓美學攝影 🏛️", remark: "拍出得月樓的僑鄉感，注意閩南建築的脊線對稱。" },
      { time: "13:30", location: "珠山聚落", title: "紅磚聚落全景 🧱", remark: "登上聚落後山，拍出屋脊層層疊疊的節奏感。" },
      { time: "16:00", location: "翟山坑道", title: "坑道倒影對稱 💧", remark: "利用坑道平靜水面倒影，拍出完美的水平與垂直線。" },
      { time: "18:30", location: "慈湖三角堡", title: "慈湖夕陽軌道 🌅", remark: "拍拍軌道倒影與夕陽，營造出戰地的荒涼淒美感。" }
    ] 
  },
  { 
    day: "30", 
    items: [
      { time: "08:30", location: "金城早市", title: "早晨菜市肌理 🥬", remark: "拍拍老闆搓蚵嗲的手，這就是你追求的生活細節。" },
      { time: "10:30", location: "北山古洋樓", title: "彈孔牆人文痕跡 🏚️", remark: "廣角特寫戰鬥留下的傷痕，拍出歷史的壓迫感。" },
      { time: "12:30", location: "在地牛肉麵", title: "最後的味覺紀錄 🐮", remark: "拍拍大口吃麵的人們，為這趟旅程畫下圓滿句點。" },
      { time: "14:15", location: "金門機場", title: "回程與備份 ✈️", remark: "記得再次檢查記憶卡，準備回家後的大圖處理。" }
    ] 
  }
];

// 2. 攝影師行李清單
const initialChecklist = [
  { id: 1, task: "廣角鏡頭 (16-35mm)", category: "器材" },
  { id: 2, task: "備用電池與記憶卡", category: "器材" },
  { id: 3, task: "防曬用品與雨具", category: "生活" },
  { id: 4, task: "行動電源", category: "生活" },
  { id: 5, task: "身分證件與電子機票", category: "重要" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('行程');
  const [selectedDay, setSelectedDay] = useState('27');
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const currentDayData = scheduleData.find(d => d.day === selectedDay)?.items || [];

  const toggleCheck = (id: number) => {
    setCheckedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-paper pb-32 font-sans text-earth-dark text-left">
      {/* 頂部標題 */}
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
          <p className="text-leaf font-bold text-[10px] tracking-widest mb-1 uppercase text-left">May 2026</p>
          <h1 className="text-3xl font-black text-left">金門城隍祭</h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-earth-light block uppercase">Days Left</span>
          <span className="text-2xl font-black text-leaf">37</span>
        </div>
      </header>

      <main className="px-6 text-left">
        {/* --- 行程分頁 --- */}
        {activeTab === '行程' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar text-center">
              {['27', '28', '29', '30'].map((day) => (
                <button 
                  key={day} 
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${selectedDay === day ? 'bg-white border-leaf shadow-soft scale-105' : 'opacity-40 border-paper-dark'}`}
                >
                  <span className="text-xl font-black">{day}</span>
                </button>
              ))}
            </div>
            <div className="space-y-5">
              {currentDayData.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-paper-dark shadow-soft">
                  <div className="text-leaf font-bold text-xs mb-2 text-left">🕒 {item.time} 📍 {item.location}</div>
                  <h2 className="text-xl font-black mb-3 leading-tight text-left">{item.title}</h2>
                  <div className="bg-paper/40 p-4 rounded-2xl border border-dashed border-earth-light/30 text-sm italic leading-relaxed text-left">
                    💡 {item.remark}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 預訂分頁 --- */}
        {activeTab === '預訂' && (
          <div className="space-y-4 animate-in fade-in">
            <FlightCard type="去程" airline="立榮航空" flightNo="B7-8801" date="2026.05.27" time="07:00 - 08:05" from="TSA" to="KNH" />
            <FlightCard type="回程" airline="立榮航空" flightNo="B7-8836" date="2026.05.30" time="20:15 - 21:15" from="KNH" to="TSA" />
          </div>
        )}

        {/* --- 準備分頁 --- */}
        {activeTab === '準備' && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-bold text-xs text-earth-light tracking-widest uppercase text-left">Packing Checklist</h3>
            <div className="bg-white rounded-[2.5rem] border-2 border-paper-dark shadow-soft overflow-hidden">
              {initialChecklist.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-center p-6 border-b-2 border-paper last:border-0 active:bg-paper/30 transition-colors"
                >
                  <span className="text-2xl mr-4">{checkedIds.includes(item.id) ? '✅' : '⬜'}</span>
                  <div className="flex flex-col text-left">
                    <span className={`font-bold ${checkedIds.includes(item.id) ? 'line-through opacity-30 text-earth-light' : ''}`}>
                      {item.task}
                    </span>
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