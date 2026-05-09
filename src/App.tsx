import { useState } from 'react';
// 嚴格對齊引入清單，確保下方全部用到，消滅所有警告
import { Camera, MapPin, Phone, Briefcase, Info, ChevronRight, Calendar, Luggage } from 'lucide-react';

interface DayData {
  date: string;
  dayOfWeek: string;
  location: string;
  stay?: string;
  meals: { b?: string; l?: string; d?: string };
  items: { t: string; title: string; desc?: string; note?: string }[];
}

const schedule: DayData[] = [
  {
    date: "06/05", dayOfWeek: "五", location: "台北 - 澳門 - 桂林",
    stay: "桂林喜來登酒店 (0773-2825588)",
    meals: { b: "自理", l: "珠海風味", d: "粥城風味" },
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "抵達後前往珠海，午餐後搭乘動車前往桂林。" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "入住酒店，開啟喀斯特攝影之旅。", note: "需提前 1 小時到達車站" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "陽朔糖舍 (Alila Sugarhouse)",
    meals: { b: "飯店內", l: "米粉風味", d: "啤酒魚風味" },
    items: [
      { t: "09:00", title: "灕江精華段攝影", desc: "搭乘竹筏拍攝灕江煙雨與黃布倒影。", note: "建議使用中長焦鏡頭" },
      { t: "19:00", title: "印象劉三姐", desc: "大型實景演出攝影。", note: "建議攜帶腳架，提前進場" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 興坪 - 陽朔",
    stay: "陽朔糖舍 (Alila Sugarhouse)",
    meals: { b: "飯店內", l: "農家飯", d: "西街自理" },
    items: [
      { t: "05:00", title: "相公山日出", desc: "俯瞰灕江第一灣，拍攝雲海日出。", note: "凌晨出發，體力挑戰" },
      { t: "17:30", title: "灕江漁火拍攝", desc: "興坪漁翁、魚鷹、煤油燈經典畫面。", note: "已預約模特漁翁" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "陽朔 - 龍脊梯田",
    stay: "龍脊全景樓",
    meals: { b: "飯店內", l: "竹筒飯", d: "山珍風味" },
    items: [
      { t: "10:00", title: "前往龍勝龍脊梯田", desc: "拍攝壯族村寨與層疊梯田線條。", note: "山區路窄，建議攜帶輕便包" },
      { t: "16:30", title: "金佛頂日落", desc: "捕捉夕陽餘暉灑在梯田上的金黃瞬間。", note: "廣角鏡頭必備" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林",
    stay: "桂林喜來登酒店",
    meals: { b: "飯店內", l: "龍勝風味", d: "歡送晚宴" },
    items: [
      { t: "05:30", title: "西山韶樂日出", desc: "龍脊梯田著名的晨曦視角。", note: "注意鏡頭除霧" },
      { t: "19:30", title: "兩江四湖夜景", desc: "拍攝日月雙塔燈光。慢門攝影。", note: "建議使用三腳架" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "飯店內", l: "動車便餐", d: "自理" },
    items: [
      { t: "07:32", title: "桂林北-珠海 (動車 G3875)", note: "需提早到達車站" },
      { t: "20:50", title: "澳門-台北 (星宇 JX206)", desc: "返抵桃園機場，結束攝影遠征行程。", note: "4/21 已開放售票" }
    ]
  }
];

const gearData = [
  { cat: "攝影器材", list: ["機身 x 2 (含備機)", "16-35mm 廣角", "24-70mm 萬用", "70-200mm 細節", "三腳架/減光鏡", "備用電池 x 5"] },
  { cat: "必備物資", list: ["護照 / 台胞證", "個人藥品 / 防蚊", "雨衣 / 遮陽傘", "機能服飾 / 運動鞋"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<'plan' | 'gear'>('plan');
  
  // 核心修復：使用非空斷言，徹底消滅紅字
  const c = schedule[day]!;

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#333] font-sans antialiased pb-32">
      {/* Header */}
      <header className="pt-10 px-6 pb-6 text-center">
        <div className="text-[10px] font-black tracking-[0.3em] text-[#8B2323] opacity-60 mb-1 uppercase italic">Photography Expedition</div>
        <h1 className="text-3xl font-black text-[#8B2323] tracking-tighter">桂林攝影遠征</h1>
        <div className="mt-4 flex justify-center">
           <div className="bg-white/80 px-4 py-1.5 rounded-full border border-[#E5DED9] flex items-center gap-2 shadow-sm">
             <Phone className="w-3 h-3 text-[#8B2323]" />
             <span className="text-[11px] font-bold text-[#555]">曾克儉 13977316816</span>
           </div>
        </div>
      </header>

      {/* Day Tabs */}
      <nav className="flex gap-3 px-6 overflow-x-auto no-scrollbar mb-8">
        {schedule.map((d, i) => (
          <button 
            key={i} 
            onClick={() => setDay(i)} 
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
              day === i ? 'bg-[#8B2323] text-white border-[#8B2323] shadow-md' : 'bg-white text-[#8B2323] border-[#E5DED9]'
            }`}
          >
            {d.date.split('/')[1]}
          </button>
        ))}
      </nav>

      {tab === 'plan' ? (
        <main className="px-6 space-y-6 animate-in fade-in duration-500">
          <div className="text-center py-4">
            <h2 className="text-2xl font-black text-[#8B2323] italic uppercase">DAY {day + 1}</h2>
            <div className="text-[#8B2323] font-bold tracking-widest mt-1 opacity-80 uppercase">{c.location}</div>
          </div>

          {/* Stay & Meals Card */}
          <div className="bg-[#8B2323] text-white p-6 rounded-3xl shadow-xl space-y-4">
             {c.stay && (
               <div className="flex gap-3 border-b border-white/10 pb-4">
                 <MapPin className="w-5 h-5 shrink-0 opacity-80" />
                 <div>
                   <div className="text-[10px] font-black tracking-widest opacity-60 mb-1 uppercase">住宿 STAY</div>
                   <div className="text-sm font-bold">{c.stay}</div>
                 </div>
               </div>
             )}
             <div className="grid grid-cols-3 gap-2 pt-2 text-center items-center">
               <div>
                 <div className="text-[10px] opacity-60 mb-1">早餐</div>
                 <div className="text-xs font-bold">{c.meals.b}</div>
               </div>
               <div className="border-x border-white/10 flex flex-col items-center">
                 <Briefcase className="w-3 h-3 mb-1 opacity-40" />
                 <div className="text-[10px] opacity-60 mb-1">午餐</div>
                 <div className="text-xs font-bold">{c.meals.l}</div>
               </div>
               <div>
                 <div className="text-[10px] opacity-60 mb-1">晚餐</div>
                 <div className="text-xs font-bold">{c.meals.d}</div>
               </div>
             </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 pt-4 pb-12">
            {c.items.map((it, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#8B2323] ring-4 ring-white" />
                  {i !== c.items.length - 1 && <div className="w-0.5 grow bg-[#E5DED9] my-1" />}
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#E5DED9] shadow-sm grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8B2323] font-black font-mono text-sm">{it.t}</span>
                    <h3 className="font-black text-[#333] text-sm">{it.title}</h3>
                  </div>
                  {it.desc && <p className="text-[#666] text-xs leading-relaxed mb-3">{it.desc}</p>}
                  {it.note && (
                    <div className="bg-[#FAF7F5] p-3 rounded-xl flex items-start gap-2 border border-[#E5DED9]">
                      <Info className="w-3.5 h-3.5 text-[#8B2323] mt-0.5" />
                      <p className="text-[11px] font-bold text-[#8B2323]">{it.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main className="px-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-center py-6">
            <h2 className="text-2xl font-black text-[#8B2323] italic uppercase tracking-tighter">Equipment Checklist</h2>
            <div className="text-[10px] text-zinc-400 font-bold tracking-[0.3em] uppercase mt-1">Ready for Shooting</div>
          </div>
          {gearData.map((g, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-[#E5DED9] shadow-sm">
              <h3 className="flex items-center gap-2 text-[#8B2323] font-black text-sm mb-4 border-b border-[#FAF7F5] pb-3 uppercase">
                <Luggage className="w-4 h-4" /> {g.cat}
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {g.list.map((l, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-bold text-[#555]">
                    <ChevronRight className="w-3 h-3 text-[#8B2323] opacity-40" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-10 right-10 flex justify-center z-50">
        <div className="bg-[#333]/90 backdrop-blur-md px-2 py-2 rounded-full flex gap-1 shadow-2xl border border-white/10">
          <button 
            onClick={() => setTab('plan')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all ${tab === 'plan' ? 'bg-[#8B2323] text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            <Calendar className="w-4 h-4" /> 行程
          </button>
          <button 
            onClick={() => setTab('gear')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all ${tab === 'gear' ? 'bg-[#8B2323] text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            <Camera className="w-4 h-4" /> 裝備
          </button>
        </div>
      </div>
    </div>
  );
}