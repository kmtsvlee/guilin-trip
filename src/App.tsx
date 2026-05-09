import { useState } from 'react';
import { Camera, Phone, Briefcase, Info, ChevronRight, Luggage } from 'lucide-react';

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
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "入住喜來登，準備開啟喀斯特地貌攝影。", note: "需提前 1 小時到達車站" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "陽朔糖舍 (Alila Sugarhouse)",
    meals: "早：飯店 / 午：米粉風味 / 晚：啤酒魚",
    items: [
      { t: "09:00", title: "灕江精華段攝影", desc: "搭乘竹筏拍攝灕江煙雨與黃布倒影。", note: "建議使用中長焦鏡頭" },
      { t: "19:00", title: "印象劉三姐", desc: "大型實景演出攝影。", note: "建議攜帶腳架，提前進場" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 興坪 - 陽朔",
    stay: "陽朔糖舍 (Alila Sugarhouse)",
    meals: "早：飯店 / 午：農家飯 / 晚：西街自理",
    items: [
      { t: "05:00", title: "相公山日出", desc: "俯瞰灕江第一灣，拍攝雲海日出。", note: "凌晨出發，體力挑戰" },
      { t: "17:30", title: "灕江漁火拍攝", desc: "興坪漁翁、魚鷹、煤油燈經典畫面。", note: "已預約模特漁翁" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "陽朔 - 龍脊梯田",
    stay: "龍脊全景樓",
    meals: "早：飯店 / 午：竹筒飯 / 晚：山珍風味",
    items: [
      { t: "10:00", title: "前往龍勝龍脊梯田", desc: "拍攝壯族村寨與層疊梯田線條。", note: "山區路窄，建議攜帶輕便包" },
      { t: "16:30", title: "金佛頂日落", desc: "捕捉夕陽餘暉灑在梯田上的金黃瞬間。", note: "廣角鏡頭必備" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林",
    stay: "桂林喜來登酒店",
    meals: "早：飯店 / 午：龍勝風味 / 晚：歡送晚宴",
    items: [
      { t: "05:30", title: "西山韶樂日出", desc: "龍脊梯田著名的晨曦視角。", note: "注意鏡頭除霧" },
      { t: "19:30", title: "兩江四湖夜景", desc: "拍攝日月雙塔燈光。慢門攝影。", note: "建議使用三腳架" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 珠海 - 澳門 - 台北",
    items: [
      { t: "07:32", title: "桂林北-珠海 (動車 G3875)", note: "需提早到達車站" },
      { t: "20:50", title: "澳門-台北 (星宇 JX206)", desc: "返抵桃園，結束遠征行程。", note: "4/21 已開放售票" }
    ]
  }
];

const gearData = {
  photo: {
    title: "攝影器材 / GEAR",
    list: ["機身 x 2 (含備機)", "16-35mm 廣角", "24-70mm 萬用", "70-200mm 細節", "三腳架/減光鏡", "備用電池 x 5"]
  },
  essential: {
    title: "必備物資 / ESSENTIALS",
    list: ["護照 / 台胞證", "個人藥品 / 防蚊", "雨衣 / 遮陽傘", "機能服飾 / 運動鞋"]
  }
};

export default function App() {
  const [day, setDay] = useState(0);
  const [gearType, setGearType] = useState<'photo' | 'essential'>('photo');
  
  const c = schedule[day] || schedule[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 flex justify-center font-sans antialiased">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <header className="mb-12 border-b-2 border-zinc-900 pb-10 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Guilin<br/><span className="text-red-600">Trip</span></h1>
            <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-black text-zinc-400 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 shadow-xl">
              <Phone className="w-3 h-3 text-red-500" />
              <span>曾克儉 13977316816</span>
            </div>
          </div>
          <div className="text-right font-mono text-[9px] text-zinc-700 uppercase tracking-[0.3em] leading-relaxed italic">Photography<br/>Expedition 2026</div>
        </header>

        {/* Date Selector */}
        <nav className="flex gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {schedule.map((_, i) => (
            <button key={i} onClick={() => setDay(i)} className={`px-5 py-3 text-[10px] font-black border transition-all shrink-0 ${day === i ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]' : 'border-zinc-900 text-zinc-600 hover:border-zinc-700'}`}>
              DAY {i + 1}
            </button>
          ))}
        </nav>

        {/* Schedule Display */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-600 text-white px-3 py-1 font-black italic text-2xl">{c.date.split('/')[1]}</div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">{c.location}</h2>
          </div>

          <div className="grid gap-4 mb-12">
            {c.stay && (
              <div className="p-5 border border-zinc-900 bg-zinc-900/40 backdrop-blur-md rounded-sm">
                <span className="text-[9px] text-zinc-600 block uppercase mb-2 font-black tracking-[0.2em] flex items-center gap-2 italic underline underline-offset-4 decoration-red-600">Accommodation</span>
                <p className="text-sm font-bold text-zinc-300">{c.stay}</p>
              </div>
            )}
            {c.meals && (
              <div className="p-5 border border-zinc-900 bg-zinc-900/40 backdrop-blur-md rounded-sm flex gap-4">
                <Briefcase className="w-5 h-5 text-zinc-800 mt-1 shrink-0" />
                <div>
                  <span className="text-[9px] text-zinc-600 block uppercase mb-2 font-black tracking-[0.2em] italic underline underline-offset-4 decoration-red-600">Meal Ref.</span>
                  <p className="text-sm font-bold text-zinc-300 leading-snug">{c.meals}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-12">
            {c.items.map((it, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-zinc-900 py-1">
                <div className="absolute -left-[9px] top-2 w-4 h-4 bg-red-600 rounded-full border-[3px] border-zinc-950 shadow-lg" />
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] font-black bg-zinc-100 text-zinc-950 px-2 py-0.5 rounded-sm">{it.t}</span>
                  <h3 className="text-lg font-black italic uppercase tracking-tight text-zinc-100 leading-none">{it.title}</h3>
                </div>
                {it.desc && <p className="text-zinc-500 text-xs leading-relaxed mb-3 font-medium max-w-md">{it.desc}</p>}
                {it.note && <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 text-[10px] font-black uppercase tracking-widest"><Info className="w-3 h-3" /> {it.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Gear Checklist - 按鈕切換區塊 */}
        <footer className="mt-24 border-t-2 border-zinc-900 pt-16 pb-32">
          <div className="flex items-center gap-4 mb-10">
            <Camera className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Equipment Checklist</h2>
          </div>

          {/* 質感切換按鈕 */}
          <div className="flex gap-3 mb-8">
            <button onClick={() => setGearType('photo')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${gearType === 'photo' ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-xl' : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'}`}>
              攝影器材
            </button>
            <button onClick={() => setGearType('essential')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${gearType === 'essential' ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-xl' : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'}`}>
              必備物資
            </button>
          </div>

          {/* 切換內容 */}
          <div className="bg-zinc-900/20 border border-zinc-800 p-8 border-l-[6px] border-l-red-600 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.4em] mb-8 border-b border-zinc-800 pb-4 flex items-center gap-3">
              <Luggage className="w-4 h-4 text-zinc-800" /> {gearData[gearType].title}
            </h4>
            <ul className="grid gap-5 sm:grid-cols-2">
              {gearData[gearType].list.map((l, i) => (
                <li key={i} className="text-[11px] font-bold text-zinc-400 flex items-start gap-3">
                  <ChevronRight className="w-3.5 h-3.5 text-red-900 mt-0.5 shrink-0" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 text-center text-zinc-800 text-[10px] font-mono uppercase tracking-[0.6em] italic">Mission Focus / 2026</div>
        </footer>
      </div>
    </div>
  );
}