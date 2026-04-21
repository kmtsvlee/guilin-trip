import { useState } from 'react';
import BottomNav from './components/BottomNav';
import FlightCard from './components/FlightCard';

// 1. 完整金門攝影行程：不限景點數量，依據文檔全面補齊 
const scheduleData = [
  { 
    day: "27", 
    items: [
      { time: "08:30", location: "市區", title: "金門早餐 🍜", remark: "開啟味蕾，建議尋找在地廣東粥。" },
      { time: "09:30", location: "水頭/珠山/歐厝", title: "三大聚落美學 🏛️", remark: "人文與建築大景，適合廣角表現聚落與層次。" },
      { time: "13:30", location: "明遺老街/翟山坑道", title: "備選：歷史與坑道 ⚔️", remark: "若光影太強可入坑道拍攝倒影，或去明遺老街拍古樸氛圍。" },
      { time: "15:00", location: "建功嶼/湖下海堤", title: "建功嶼與沙紋攝影 🌊", remark: "注意潮汐時間，拍攝湖下海堤獨特的沙紋紋理。" },
      { time: "18:00", location: "慈堤", title: "慈堤黃昏夕陽 🌅", remark: "攝影師必爭之地，廣角捕捉海天一色的壯闊感。" },
      { time: "20:00", location: "後浦(金城)老街", title: "後浦老街夜拍 🌙", remark: "夜拍重點：紅燈籠下的戰後建築與巷弄人文張力。" }
    ] 
  },
  { 
    day: "28", 
    items: [
      { time: "08:30", location: "市區/瓊林", title: "早餐與瓊林巡禮 🏮", remark: "清晨光線柔和，適合拍攝瓊林的紅磚巷弄與人文圖騰。" },
      { time: "11:00", location: "金城鎮", title: "正日：迎城隍盛典 🥁", remark: "本次旅程核心！廣角與長焦交替，捕捉祭典高潮、陣頭與信眾神情。" },
      { time: "15:30", location: "南、北山聚落", title: "南北山聚落攝影 🏡", remark: "拍攝古厝的人文細節與戰鬥留下的歷史痕跡。" },
      { time: "17:30", location: "嚨口沙灘", title: "軌條砦夕照 🛡️", remark: "利用軌條砦作為前景，拍出戰地特有的淒美電影感。" },
      { time: "19:30", location: "小金門/金門大橋", title: "小金門探訪與大橋夜色 🌉", remark: "拍攝大橋壯麗線條與對岸光影。" }
    ] 
  },
  { 
    day: "29", 
    items: [
      { time: "06:00", location: "青年農莊", title: "栗喉蜂虎生態 🐦", remark: "夏季限定！長焦預備，捕捉蜂虎優美的飛行與色彩。" },
      { time: "10:00", location: "山后民俗村/陽翟", title: "民俗建築與復古老街 🎥", remark: "山后整齊的對稱建築（廣角）、陽翟老街的懷舊感。" },
      { time: "14:30", location: "碧山/沙美老街", title: "碧山與沙美人文 💈", remark: "尋找沙美老理髮店，捕捉最有「生活肌理」的人文肖像。" },
      { time: "19:30", location: "瓊林聚落", title: "瓊林夜拍 🕯️", remark: "感受夜間聚落的古樸與低光影下的紅磚層次。" }
    ] 
  },
  { 
    day: "30", 
    items: [
      { time: "09:00", location: "太湖/榕園", title: "湖光色影紀錄 🌳", remark: "拍攝太湖水鳥與榕園古樸自然的光影。" },
      { time: "11:00", location: "漁村小艇坑道", title: "坑道對稱美學 ⚓", remark: "極致的對稱構圖點，利用水面倒影創造視覺震撼。" },
      { time: "13:30", location: "軍事據點", title: "軍事據點最後探訪 🪖", remark: "尋找被時間遺忘的碉堡細節，為攝影集畫下句點。" },
      { time: "15:30", location: "金門機場", title: "回程與整理 ✈️", remark: "帶著充滿「煙火氣」的記憶與畫面，平安賦歸。" }
    ] 
  }
];

const initialChecklist = [
  { id: 1, task: "廣角鏡頭 (聚落/大橋/沙紋)", category: "器材" },
  { id: 2, task: "長焦鏡頭 (栗喉蜂虎專用)", category: "器材" },
  { id: 3, task: "偏光鏡/減光鏡 (海堤/夕陽)", category: "器材" },
  { id: 4, task: "備用電池與快門線", category: "器材" },
  { id: 5, task: "防曬用品與防蚊液", category: "生活" },
  { id: 6, task: "身分證件與電子機票", category: "重要" },
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
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
          <p className="text-leaf font-bold text-[10px] tracking-widest mb-1 uppercase">May 2026</p>
          <h1 className="text-3xl font-black">金門迎城隍</h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-earth-light block uppercase">Days Left</span>
          <span className="text-2xl font-black text-leaf">37</span>
        </div>
      </header>

      <main className="px-6">
        {activeTab === '行程' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
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
            <div className="space-y-4">
              {currentDayData.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-paper-dark shadow-soft">
                  <div className="text-leaf font-bold text-xs mb-2">🕒 {item.time} 📍 {item.location}</div>
                  <h2 className="text-xl font-black mb-3 leading-tight">{item.title}</h2>
                  <div className="bg-paper/40 p-4 rounded-2xl border border-dashed border-earth-light/30 text-sm italic leading-relaxed">
                    💡 {item.remark}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === '預訂' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <FlightCard type="去程" airline="立榮航空" flightNo="B7-8801" date="2026.05.27" time="07:00 - 08:05" from="TSA" to="KNH" />
            <FlightCard type="回程" airline="立榮航空" flightNo="B7-8836" date="2026.05.30" time="20:15 - 21:15" from="KNH" to="TSA" />
          </div>
        )}

        {activeTab === '準備' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="font-bold text-xs text-earth-light tracking-widest uppercase">Packing Checklist</h3>
            <div className="bg-white rounded-[2.5rem] border-2 border-paper-dark shadow-soft overflow-hidden">
              {initialChecklist.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-center p-6 border-b-2 border-paper last:border-0 active:bg-paper/30 transition-colors"
                >
                  <span className="text-2xl mr-4">{checkedIds.includes(item.id) ? '✅' : '⬜'}</span>
                  <div className="flex flex-col">
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