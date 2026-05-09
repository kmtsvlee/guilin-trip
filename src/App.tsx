import { useState } from 'react';
// 只引入絕對會用到的 5 個圖示，徹底消滅 "never read" 警告
import { Camera, Phone, Briefcase, Info, ChevronRight } from 'lucide-react';

interface DayData {
  date: string;
  dayOfWeek: string;
  location: string;
  stay?: string;
  meals?: string;
  items: { t: string; title: string; desc?: string; note?: string; }[];
}

const schedule: DayData[] = [
  {
    date: "06/05", dayOfWeek: "五", location: "台北 - 澳門 - 桂林",
    stay: "桂林喜來登酒店 (0773-2825588)",
    meals: "午：珠海風味 / 晚：粥城風味",
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "抵達後前往珠海，午餐後搭乘動車前往桂林。" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "開啟喀斯特地貌初探，入住喜來登酒店。", note: "需提前 1 小時到達車站" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "陽朔糖舍 (Alila Sugarhouse)",
    meals: "早：飯店 / 午：米粉風味 / 晚：啤酒魚",
    items: [
      { t: "09:00", title: "灕江精華段攝影", desc: "搭乘竹筏拍攝灕江煙雨與黃布倒影。", note: "建議使用中長焦鏡頭" },
      { t: "19:00", title: "印象劉三姐", desc: "大型實景演出攝影。", note: "需提前購票，建議攜帶腳架" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 興坪 - 陽朔",
    stay: "陽朔糖舍 (Alila Sugarhouse)",
    meals: "早：飯店 / 午：農家飯 / 晚：西街自理",
    items: [
      { t: "05:00", title: "相公山日出", desc: "俯瞰灕江第一灣，拍攝雲海日出。", note: "需凌晨出發，注意安全" },
      { t: "17:30", title: "灕江漁火拍攝", desc: "興坪漁翁、魚鷹、煤油燈經典畫面。", note: "需提前預約模特漁翁" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "陽朔 - 龍脊梯田",
    stay: "龍脊全景樓",
    meals: "早：飯店 / 午：竹筒飯 / 晚：山珍風味",
    items: [
      { t: "10:00", title: "前往龍勝龍脊梯田", desc: "換乘景區車進入，拍攝壯族村寨。", note: "山區氣溫較低，建議帶薄外套" },
      { t: "16:30", title: "金佛頂日落", desc: "拍攝梯田線條與光影變化。", note: "廣角鏡頭必備" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林",
    stay: "桂林喜來登酒店",
    meals: "早：飯店 / 午：龍勝風味 / 晚：歡送晚宴",
    items: [
      { t: "05:30", title: "西山韶樂日出", desc: "梯田水面反射晨光，層次感極佳。", note: "注意防蚊蟲叮寫" },
      { t: "19:30", title: "兩江四湖夜景", desc: "拍攝日月雙塔燈光夜景。", note: "慢門攝影建議使用三腳架" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 珠海 - 澳門 - 台北",
    items: [
      { t: "07:32", title: "桂林北-珠海 (動車 G3875)", note: "需提早到達車站進行安檢" },
      { t: "20:50", title: "澳門-台北 (星宇 JX206)", desc: "經由港珠澳大橋前往澳門機場，返抵桃園。", note: "4/21 已開放售票" }
    ]
  }
];

const gearList = [
  { cat: "攝影器材", list: ["機身 x 2 (備用機重要)", "16-35mm 廣角 (風景)", "24-70mm (萬用)", "70-200mm (漁火細節)", "腳架 / 快門線 / 減光鏡", "記憶卡/電池 x 5"] },
  { cat: "必備物資", list: ["護照 / 台胞證", "常備藥品 / 防蚊液", "雨衣 / 遮陽傘", "機能排汗服 / 輕便球鞋"] }
];

export default function App() {
  const [day, setDay] = useState<number>(0);
  
  // 使用強制斷言，確保 TypeScript 不會報錯
  const curr = (schedule[day] || schedule[0])!;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 flex justify-center font-sans antialiased">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-10 border-b-2 border-zinc-900 pb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-6 leading-none">Guilin Trip</h1>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 shadow-sm hover:border-zinc-700 transition-colors">
            <Phone className="w-3 h-3 text-red-500" />
            <span>導遊：曾克儉 13977316816</span>
          </div>
        </header>

        {/* Date Selector */}
        <nav className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {schedule.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setDay(i)} 
              className={`px-4 py-2 text-[10px] font-black border shrink-0 transition-all ${day === i ? 'bg-zinc-100 text-zinc-950 border-zinc-100 scale-105' : 'border-zinc-900 text-zinc-600 hover:border-zinc-700'}`}
            >
              DAY {i + 1}
            </button>
          ))}
        </nav>

        {/* Content Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-black italic mb-8 leading-tight">
            {curr.date} <span className="text-zinc-600 not-italic ml-2 uppercase text-2xl tracking-normal font-bold">{curr.location}</span>
          </h2>
          
          <div className="space-y-3 mb-10 text-[13px]">
            {curr.stay && (
              <div className="p-4 border border-zinc-900 bg-zinc-900/20 rounded shadow-inner">
                <span className="text-[10px] text-red-600 block uppercase mb-1 font-black tracking-widest">Accommodation</span>
                <p className="font-bold text-zinc-300">{curr.stay}</p>
              </div>
            )}
            {curr.meals && (
              <div className="p-4 border border-zinc-900 bg-zinc-900/20 flex gap-3 rounded shadow-inner">
                <Briefcase className="w-4 h-4 text-zinc-700 mt-1" />
                <div>
                  <span className="text-[10px] text-red-600 block uppercase mb-1 font-black tracking-widest">Meal Reference</span>
                  <p className="font-bold text-zinc-300">{curr.meals}</p>
                </div>
              </div>
            )}
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 relative">
            {curr.items.map((it, i) => (
              <div key={i} className="relative pl-7 border-l-2 border-zinc-900">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-red-600 rounded-full border-2 border-zinc-950 shadow-sm" />
                <div className="flex items-center gap-3 mb-2 font-bold uppercase text-sm">
                  <span className="text-zinc-500 font-mono tracking-tighter">{it.t}</span>
                  <span className="italic text-zinc-100 leading-tight">{it.title}</span>
                </div>
                {it.desc && <p className="text-zinc-500 text-xs leading-relaxed mb-3 font-medium">{it.desc}</p>}
                {it.note && (
                  <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 text-[10px] font-black uppercase tracking-wider">
                    <Info className="w-3 h-3" />
                    {it.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Gear List Footer */}
        <footer className="mt-24 border-t-2 border-zinc-900 pt-12 pb-24">
          <div className="flex items-center gap-4 mb-10">
            <Camera className="w-7 h-7 text-red-600" />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-100">Equipment Checklist</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {gearList.map((g, i) => (
              <div key={i} className="bg-zinc-900/10 border border-zinc-800 p-6 border-l-2 border-l-zinc-800 hover:border-l-red-600 transition-all duration-300">
                <h4 className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.3em] mb-5 border-b border-zinc-900 pb-3 leading-none">{g.cat}</h4>
                <ul className="space-y-4">
                  {g.list.map((l, j) => (
                    <li key={j} className="text-xs font-bold text-zinc-500 flex items-start gap-3 leading-tight">
                      <ChevronRight className="w-3 h-3 text-zinc-800 mt-0.5 shrink-0" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center text-zinc-800 text-[10px] font-mono uppercase tracking-[0.5em]">
            Guilin Photography Expedition 2026
          </div>
        </footer>
      </div>
    </div>
  );
}