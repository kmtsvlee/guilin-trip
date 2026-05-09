import React, { useState } from 'react';
// 這裡確保所有圖示都是 Lucide 官方標準名稱
import { Camera, MapPin, Clock, Phone, Briefcase, Info, ChevronRight } from 'lucide-react';

// 1. 強制定義資料結構，排除所有 undefined 的可能
interface ScheduleItem {
  t: string;
  title: string;
  desc?: string;
  note?: string;
}

interface ScheduleData {
  date: string;
  dayOfWeek: string;
  location: string;
  stay?: string;
  meals?: string;
  items: ScheduleItem[];
}

const scheduleData: ScheduleData[] = [
  {
    date: "06/05",
    dayOfWeek: "五",
    location: "台北-澳門-桂林",
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
    location: "桂林-陽朔",
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
    location: "陽朔-興坪-桂林",
    items: [
      { t: "07:32", title: "桂林北-珠海 (動車 G3875)", note: "4/21 開始售票" },
      { t: "20:50", title: "澳門-台北 (星宇 JX206)", desc: "經由港珠澳大橋前往澳門機場，平安返家。" }
    ]
  }
];

const gearList = [
  { category: "攝影器材", items: ["機身 x 2", "16-35mm 廣角", "24-70mm 萬用", "70-200mm 細節", "三腳架 / 快門線", "記憶卡 / 電池 x 5"] },
  { category: "個人必備", items: ["護照 / 台胞證", "常備藥品", "雨衣 / 遮陽傘", "機能排汗服飾"] }
];

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  
  // 使用類型斷言 (as ScheduleData) 徹底消除 TypeScript 對 undefined 的焦慮
  const curr = (scheduleData[activeDay] || scheduleData[0]) as ScheduleData;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-12 flex justify-center font-sans tracking-tight">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-10 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-black italic mb-4 tracking-tighter uppercase">Guilin Trip</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
            <Phone className="w-4 h-4 text-zinc-500" />
            <span>導遊：曾克儉 13977316816</span>
          </div>
        </header>

        {/* Date Tabs */}
        <nav className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {scheduleData.map((d, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-5 py-2 text-xs font-black transition-all border shrink-0 ${
                activeDay === idx ? 'bg-zinc-100 text-zinc-950 border-zinc-100' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
              }`}
            >
              DAY {d.date.split('/')[1]}
            </button>
          ))}
        </nav>

        {/* Daily Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-black italic mb-6 leading-tight">
            {curr.date} ({curr.dayOfWeek}) <br />
            <span className="text-zinc-500 not-italic text-2xl uppercase font-bold tracking-normal">{curr.location}</span>
          </h2>

          <div className="grid gap-3 mb-10">
            {curr.stay && (
              <div className="p-4 border border-zinc-800 bg-zinc-900/40">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-600 mb-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Accommodation
                </div>
                <div className="text-sm font-bold text-zinc-200">{curr.stay}</div>
              </div>
            )}
            {curr.meals && (
              <div className="p-4 border border-zinc-800 bg-zinc-900/40">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-600 mb-1 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Dining Reference
                </div>
                <div className="text-sm font-bold text-zinc-200">{curr.meals}</div>
              </div>
            )}
          </div>

          {/* Timeline Items */}
          <div className="space-y-10">
            {curr.items.map((item, idx) => (
              <div key={idx} className="relative pl-7 border-l-2 border-zinc-900">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-red-600 rounded-full border-[3px] border-zinc-950" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black text-zinc-400 bg-zinc-900 px-2 py-1 border border-zinc-800 flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3 h-3 text-red-500" /> {item.t}
                  </span>
                  <h3 className="text-xl font-black italic uppercase tracking-tight text-zinc-100">{item.title}</h3>
                </div>
                {item.desc && (
                  <p className="text-zinc-400 text-[13px] leading-relaxed mb-3 font-medium">{item.desc}</p>
                )}
                {item.note && (
                  <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 text-[11px] font-black uppercase tracking-wider">
                    <Info className="w-3 h-3" /> {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gear Checklist - 確保重新渲染 */}
        <section className="mt-24 border-t border-zinc-900 pt-12 pb-24">
          <h2 className="text-2xl font-black italic mb-10 flex items-center gap-3 uppercase tracking-tighter">
            <Camera className="w-7 h-7 text-red-600" /> Equipment Checklist
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {gearList.map((cat, idx) => (
              <div key={idx} className="border border-zinc-800 p-6 bg-zinc-900/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-red-600 transition-colors" />
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-5 border-b border-zinc-800 pb-2">
                  {cat.category}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-[12px] font-bold flex items-center gap-3 text-zinc-400">
                      <ChevronRight className="w-3 h-3 text-zinc-700" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}