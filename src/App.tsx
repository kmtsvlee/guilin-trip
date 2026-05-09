import { useState } from 'react';
// 只引入這 5 個，且下方保證全部用到，徹底消滅 unused 警告
import { Camera, Phone, Briefcase, Info, ChevronRight } from 'lucide-react';

interface Day {
  date: string;
  dayOfWeek: string;
  location: string;
  stay?: string;
  meals?: string;
  items: { t: string; title: string; desc?: string; note?: string; }[];
}

const schedule: Day[] = [
  {
    date: "06/05",
    dayOfWeek: "五",
    location: "台北 - 澳門 - 桂林",
    stay: "桂林喜來登酒店 (0773-2825588)",
    meals: "午：珠海風味 / 晚：粥城風味",
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "抵達後前往珠海，午餐後搭乘動車前往桂林。" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "開啟喀斯特地貌初探，入住喜來登酒店。", note: "需提前 1 小時到達車站" }
    ]
  },
  {
    date: "06/06",
    dayOfWeek: "六",
    location: "桂林 - 陽朔",
    stay: "陽朔糖舍 (0773-8883999)",
    meals: "早：飯店 / 午：米粉風味 / 晚：啤酒魚",
    items: [
      { t: "09:00", title: "灕江精華段攝影", desc: "搭乘竹筏拍攝灕江煙雨與黃布倒影。", note: "記得帶減光鏡與腳架" },
      { t: "19:00", title: "印象劉三姐", desc: "張藝謀導演大型實景演出攝影。", note: "建議使用中長焦鏡頭" }
    ]
  },
  {
    date: "06/07",
    dayOfWeek: "日",
    location: "陽朔 - 興坪 - 桂林",
    items: [
      { t: "07:32", title: "桂林北-珠海 (動車 G3875)", note: "4/21 開始售票" },
      { t: "20:50", title: "澳門-台北 (星宇 JX206)", desc: "經由港珠澳大橋前往澳門機場，平安返家。" }
    ]
  }
];

const gears = [
  { cat: "攝影器材", list: ["機身 x 2", "16-35mm 廣角", "24-70mm 萬用", "70-200mm 細節", "腳架/電池"] },
  { cat: "必備物資", list: ["護照/台胞證", "常備藥", "機能服/雨具"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const c = schedule[day] || schedule[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 flex justify-center font-sans tracking-tight">
      <div className="w-full max-w-2xl">
        <header className="mb-10 border-b-2 border-zinc-900 pb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-6">Guilin Trip</h1>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
            <Phone className="w-3 h-3 text-red-500" /> {/* 使用 Phone */}
            <span>導遊：曾克儉 13977316816</span>
          </div>
        </header>

        <nav className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {schedule.map((_, i) => (
            <button key={i} onClick={() => setDay(i)} className={`px-4 py-2 text-[10px] font-black border ${day === i ? 'bg-zinc-100 text-zinc-950' : 'border-zinc-800 text-zinc-600'}`}>
              DAY {i + 1}
            </button>
          ))}
        </nav>

        <section className="mb-12">
          <h2 className="text-3xl font-black italic mb-8">{c.date} <span className="text-zinc-600 ml-2">{c.location}</span></h2>
          <div className="space-y-3 mb-10">
            {c.stay && <div className="p-4 border border-zinc-800 bg-zinc-900/20"><span className="text-[10px] text-zinc-600 block uppercase mb-1 font-black">Stay</span>{c.stay}</div>}
            {c.meals && <div className="p-4 border border-zinc-800 bg-zinc-900/20 flex gap-3">
              <Briefcase className="w-4 h-4 text-zinc-600" /> {/* 使用 Briefcase */}
              <div><span className="text-[10px] text-zinc-600 block uppercase mb-1 font-black">Meals</span>{c.meals}</div>
            </div>}
          </div>

          <div className="space-y-10">
            {c.items.map((it, i) => (
              <div key={i} className="relative pl-7 border-l-2 border-zinc-900">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-red-600 rounded-full" />
                <div className="flex items-center gap-3 mb-2 font-bold uppercase text-sm">
                  <span className="text-zinc-500 font-mono">{it.t}</span>
                  <span className="italic">{it.title}</span>
                </div>
                {it.desc && <p className="text-zinc-500 text-xs leading-relaxed mb-2">{it.desc}</p>}
                {it.note && <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase">
                  <Info className="w-3 h-3" /> {/* 使用 Info */}
                  {it.note}
                </div>}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-900 pt-10 pb-20">
          <div className="flex items-center gap-3 mb-8 text-red-600">
            <Camera className="w-5 h-5" /> {/* 使用 Camera */}
            <h3 className="text-lg font-black italic uppercase">Gear Checklist</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {gears.map((g, i) => (
              <div key={i}>
                <h4 className="text-[10px] text-zinc-600 uppercase font-black mb-4">{g.cat}</h4>
                <ul className="space-y-2">
                  {g.list.map((l, j) => (
                    <li key={j} className="text-xs font-bold text-zinc-500 flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-zinc-800" /> {/* 使用 ChevronRight */}
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}