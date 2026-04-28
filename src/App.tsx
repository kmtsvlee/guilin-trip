import { useState } from 'react';

const scheduleData = [
  { day: "05", b: "自理", l: "珠海風味", d: "粥城風味", stay: "桂林喜來登大酒店", items: [
    { t: "08:05", title: "桃園-澳門 (星宇 JX201)", note: "抵達後過關前往珠海", map: "桃園機場" },
    { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", note: "抵達桂林入住酒店", map: "廣州南站" }
  ]},
  { day: "06", b: "酒店", l: "農家宴", d: "啤酒魚", stay: "陽朔精品酒店", items: [
    { t: "09:00", title: "遇龍河三橋風光", note: "富裡橋、金龍橋、遇龍橋攝影", map: "陽朔遇龍河" },
    { t: "17:00", title: "灕江漁火 (黃昏藍調) 🌅", note: "【核心】竹筏+漁夫+魚鷹+漁火擺拍", map: "灕江" }
  ]},
  { day: "07", b: "酒店", l: "蝴蝶莊園", d: "陽朔風味", stay: "陽朔精品酒店", items: [
    { t: "05:30", title: "陽朔大橋日出 🌅", note: "捕捉灕江晨曦", map: "陽朔大橋" },
    { t: "17:30", title: "烏龍泉夕陽 🌇", note: "捕捉山水剪影", map: "烏龍泉" }
  ]},
  { day: "08", b: "酒店", l: "壯族風味", d: "龍勝風味", stay: "龍脊梯田景觀民宿", items: [
    { t: "05:30", title: "相公山日出雲海 🌅", note: "【核心】廣角大景必拍點", map: "相公山" },
    { t: "17:30", title: "龍脊梯田晚霞 🌇", note: "梯田水面反光攝影", map: "龍脊梯田" }
  ]},
  { day: "09", b: "打包", l: "竹筒飯", d: "九龍酒家", stay: "桂林精選酒店", items: [
    { t: "06:00", title: "七星伴月晨霧日出 🌅", note: "拍攝梯田晨霧意境", map: "龍脊梯田" },
    { t: "17:00", title: "塔山夕陽 🌇", note: "捕捉建築與山水交匯", map: "桂林塔山" }
  ]},
  { day: "10", b: "打包", l: "四合院", d: "自理", stay: "甜蜜的家", items: [
    { t: "16:00", title: "日月貝大劇院 (外觀)", note: "建築幾何與線條攝影", map: "珠海大劇院" },
    { t: "20:50", title: "澳門-桃園 (星宇 JX206)", note: "帶著美照回家", map: "澳門機場" }
  ]}
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('05');
  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F0FDF4] pb-36 font-sans text-[#064E3B] text-left">
      <header className="p-8 pt-12 bg-gradient-to-b from-[#DCFCE7] to-[#F0FDF4]">
        <p className="text-[#059669] font-bold text-[10px] uppercase tracking-widest">June 2026</p>
        {/* 標題改為翠綠色 */}
        <h1 className="text-3xl font-black text-[#10B981]">桂林攝影手帳</h1>
      </header>

      <main className="px-6">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {['05','06','07','08','09','10'].map(d=>(
            <button 
              key={d} 
              onClick={()=>setDay(d)} 
              className={`flex-1 min-w-[50px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-[#10B981] border-[#10B981] text-white shadow-md':'bg-white border-[#DCFCE7] text-[#059669] opacity-70'}`}
            >
              <span className="text-lg font-black">{d}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#064E3B] p-5 rounded-3xl text-[#D1FAE5] flex justify-around text-center text-[10px] mb-8 shadow-lg">
          <div className="flex-1"><b>早</b><br/>{curr.b}</div>
          <div className="flex-1 border-l border-emerald-800/50 px-2"><b>午</b><br/>{curr.l}</div>
          <div className="flex-1 border-l border-emerald-800/50 px-2"><b>晚</b><br/>{curr.d}</div>
        </div>

        {/* 行程卡片 */}
        {curr.items.map((it, i)=>(
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#DCFCE7] shadow-sm mb-5">
            <div className="flex items-center mb-3">
              <span className="text-[#059669] font-bold text-xs bg-[#D1FAE5] px-3 py-1 rounded-full">🕒 {it.t}</span>
            </div>
            <h2 className="text-xl font-black leading-tight mb-2 text-[#064E3B]">{it.title}</h2>
            <div className="bg-[#F0FDF4] p-4 rounded-2xl border border-dashed border-[#10B981]/30 text-sm italic text-[#059669]">
              💡 {it.note}
            </div>
          </div>
        ))}

        {/* 住宿資訊欄位 (位於最下方) */}
        <div className="mt-8 bg-white/60 p-6 rounded-[2.5rem] border-2 border-dashed border-[#10B981]/40 flex items-center space-x-4">
          <div className="bg-[#10B981] text-white p-3 rounded-2xl shadow-sm text-xl">🏨</div>
          <div>
            <p className="text-[#059669] text-[10px] font-bold uppercase tracking-wider">Tonight's Stay</p>
            <p className="text-lg font-black text-[#064E3B]">{curr.stay}</p>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md rounded-[2.5rem] border-2 border-[#DCFCE7] p-2 flex justify-around shadow-xl z-50">
        <button onClick={()=>setTab('行程')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab==='行程'?'bg-[#10B981] text-white shadow-inner':'text-[#059669]'}`}>
          <span className="text-lg">⛰️</span><span className="text-[8px] font-black">行程</span>
        </button>
        <button onClick={()=>setTab('美食')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab==='美食'?'bg-[#10B981] text-white shadow-inner':'text-[#059669]'}`}>
          <span className="text-lg">🍜</span><span className="text-[8px] font-black">美食</span>
        </button>
      </nav>
    </div>
  );
}