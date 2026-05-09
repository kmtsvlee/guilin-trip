import { useState } from 'react';
// 嚴格對齊引入清單，確保下方全部用到，消滅所有警告
import { Camera, MapPin, Phone, Briefcase, Info, ChevronRight, Calendar, Luggage, Plane, Train, Leaf } from 'lucide-react';

interface DayData {
  date: string;
  dayOfWeek: string;
  location: string;
  stay?: string;
  meals: { b?: string; l?: string; d?: string };
  items: { t: string; title: string; desc?: string; note?: string; icon: 'plane' | 'train' | 'camera' }[];
}

const schedule: DayData[] = [
  {
    date: "06/05", dayOfWeek: "五", location: "台北 - 澳門 - 桂林",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "自理", l: "珠海風味", d: "粥城風味" },
    items: [
      { t: "08:05", title: "桃園機場集合 (星宇 JX201)", desc: "搭機前往澳門。抵達後過關前往珠海，開啟這趟山水甲天下的攝影之旅。", icon: "plane" },
      { t: "16:39", title: "廣州南 - 桂林西 (動車 D1862)", desc: "搭乘高速動車前往桂林。桂林是喀斯特地貌的明珠，獨特的山水結構舉世聞名。", note: "需提早 1 小時到達車站", icon: "train" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "准五星 新西街麗華酒店",
    meals: { b: "飯店內", l: "農家宴", d: "陽朔啤酒魚" },
    items: [
      { t: "09:00", title: "遇龍河三橋風光", desc: "拍攝遇龍河上的富里橋、金龍橋與遇龍橋。這裡水流平緩，倒影清晰，是拍攝田園山水的絕佳地點。", icon: "camera" },
      { t: "17:00", title: "興坪漁火攝影", desc: "安排傳統漁翁進行漁火拍攝，包含竹筏、魚鷹、煤油燈。在暮色下捕捉灕江最經典的人文畫面。", note: "漁火拍攝約 2 小時，包含模特費用", icon: "camera" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 相公山",
    stay: "相公山山莊 或 同級",
    meals: { b: "飯店內", l: "蝴蝶莊園", d: "陽朔風味餐" },
    items: [
      { t: "05:00", title: "相公山日出攝影", desc: "登上相公山舉目遠眺，群峰排列有序，蜿蜒流淌的灕江就在腳下，是捕捉雲海日出的頂級機位。", icon: "camera" },
      { t: "16:00", title: "陽朔西街風情", desc: "體驗具備 1400 多年歷史的古鎮街區，拍攝明清風格建築與中西合璧的小鎮氛圍。", note: "此處可自由拍攝人文寫實", icon: "camera" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "陽朔 - 龍脊梯田",
    stay: "龍脊全景樓民宿",
    meals: { b: "飯店內", l: "壯寨風味", d: "龍勝風味" },
    items: [
      { t: "09:00", title: "黃洛瑤寨探訪", desc: "探訪紅瑤族聚居地，拍攝傳統建築與長髮民俗表演，感受大山深處的人文魅力。", icon: "camera" },
      { t: "15:00", title: "龍脊梯田 - 平安壯寨", desc: "拍攝「九龍五虎」與「七星伴月」奇觀。如階梯般的田埂隨山勢起伏，線條感極強。", note: "需換乘景區電車，建議攜帶輕便相機", icon: "camera" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林市區",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "飯店內", l: "竹筒飯風味", d: "九龍酒家" },
    items: [
      { t: "05:30", title: "梯田晨霧日出", desc: "清晨的龍脊常有霧氣繚繞。拍攝晨曦灑在水田上的反光，呈現如詩如畫的層次感。", icon: "camera" },
      { t: "19:00", title: "兩江四湖夜景", desc: "拍攝日月雙塔在湖面上的璀璨倒影。金塔與銀塔交相輝映，是桂林市標誌性夜景。", note: "建議使用三腳架，慢門攝影", icon: "camera" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "打包餐盒", l: "四合院風味", d: "自理" },
    items: [
      { t: "09:34", title: "桂林西 - 廣州南 (動車 G2231)", desc: "搭乘高鐵返回廣州及珠海。收拾行囊與回憶，準備返台。", icon: "train" },
      { t: "20:50", title: "澳門機場 (星宇 JX206)", desc: "帶著滿滿的攝影作品，搭機返回溫暖的家。", note: "4/21 記得確認售票狀況", icon: "plane" }
    ]
  }
];

const gearData = [
  { cat: "攝影器材 / GEAR", list: ["機身 x 2 (含備機)", "16-35mm 廣角 (主拍梯田)", "24-70mm 萬用", "70-200mm (漁翁特寫)", "三腳架/減光鏡/快門線", "備用電池 x 5"] },
  { cat: "必備物資 / ESSENTIALS", list: ["護照 / 台胞證", "個人藥品 / 防蚊液", "雨衣 / 遮陽傘", "機能服飾 / 輕便球鞋"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<'plan' | 'gear'>('plan');
  
  // 核心安全處理：確保資料絕對存在，消滅所有紅字警告
  const c = schedule[day]!;

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-[#2D3A30] font-sans antialiased pb-32">
      {/* Header */}
      <header className="pt-10 px-6 pb-6 text-center">
        <div className="flex justify-center mb-1">
          <Leaf className="w-4 h-4 text-[#2D5A27] opacity-60 animate-bounce" />
        </div>
        <div className="text-[10px] font-black tracking-[0.3em] text-[#2D5A27] opacity-60 mb-1 uppercase italic underline underline-offset-4 decoration-[#2D5A27]/20">Photography Itinerary</div>
        <h1 className="text-3xl font-black text-[#2D5A27] tracking-tighter uppercase">桂林攝影行程</h1>
        <div className="mt-4 flex justify-center">
           <div className="bg-white/90 px-4 py-1.5 rounded-full border border-[#D1DDD5] flex items-center gap-2 shadow-sm">
             <Phone className="w-3 h-3 text-[#2D5A27]" />
             <span className="text-[11px] font-bold text-[#4A5D50]">曾克儉 13977316816</span>
           </div>
        </div>
      </header>

      {/* Day Tabs */}
      <nav className="flex gap-3 px-6 overflow-x-auto no-scrollbar mb-8">
        {schedule.map((d, i) => (
          <button key={i} onClick={() => setDay(i)} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 border ${day === i ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-lg scale-105' : 'bg-white text-[#2D5A27] border-[#D1DDD5]'}`}>
            {d.date.split('/')[1]}
          </button>
        ))}
      </nav>

      {tab === 'plan' ? (
        <main className="px-6 space-y-6 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase leading-none">DAY {day + 1} ({c.dayOfWeek})</h2>
            <div className="text-[#2D5A27] font-bold tracking-[0.2em] mt-2 opacity-80 uppercase text-[10px] bg-[#2D5A27]/5 py-1 rounded inline-block px-3">{c.location}</div>
          </div>

          {/* Stay & Meals Card (Forest Green Style) */}
          <div className="bg-[#2D5A27] text-white p-6 rounded-[2.2rem] shadow-xl space-y-5 border-b-4 border-[#1A3A1A]">
             {c.stay && (
               <div className="flex gap-4 border-b border-white/10 pb-4">
                 <MapPin className="w-5 h-5 shrink-0 opacity-70 mt-1" />
                 <div>
                   <div className="text-[9px] font-black tracking-widest opacity-50 mb-1 uppercase">住宿安排 STAY</div>
                   <div className="text-[13px] font-bold leading-tight">{c.stay}</div>
                 </div>
               </div>
             )}
             <div className="grid grid-cols-3 gap-2 pt-1 text-center items-center">
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter">Breakfast</div>
                  <div className="text-[11px] font-bold">{c.meals.b}</div>
               </div>
               <div className="border-x border-white/10 flex flex-col items-center px-1">
                  <Briefcase className="w-3.5 h-3.5 mb-1 opacity-40" />
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter">Lunch</div>
                  <div className="text-[11px] font-bold">{c.meals.l}</div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter">Dinner</div>
                  <div className="text-[11px] font-bold">{c.meals.d}</div>
               </div>
             </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-6 pt-4 pb-12">
            {c.items.map((it, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2D5A27] ring-4 ring-white shadow-sm" />
                  {i !== c.items.length - 1 && <div className="w-0.5 grow bg-[#D1DDD5] my-1" />}
                </div>
                <div className="bg-white p-5 rounded-[1.8rem] border border-[#D1DDD5] shadow-sm grow hover:border-[#2D5A27] transition-colors group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#2D5A27] font-black font-mono text-sm">{it.t}</span>
                    <div className="flex items-center gap-1.5 ml-1">
                      {it.icon === 'plane' && <Plane className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      {it.icon === 'train' && <Train className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      {it.icon === 'camera' && <Camera className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      <h3 className="font-black text-[#2D3A30] text-sm tracking-tight group-hover:text-[#2D5A27] transition-colors">{it.title}</h3>
                    </div>
                  </div>
                  {it.desc && <p className="text-[#5A6D60] text-[12px] leading-relaxed mb-3 font-medium">{it.desc}</p>}
                  {it.note && (
                    <div className="bg-[#F8FAF8] p-3 rounded-2xl flex items-start gap-2 border border-[#D1DDD5]">
                      <Info className="w-3.5 h-3.5 text-[#2D5A27] mt-0.5 shrink-0" />
                      <p className="text-[11px] font-bold text-[#2D5A27] leading-normal">{it.note}</p>
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
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase tracking-tighter leading-none">Gear Checklist</h2>
            <div className="text-[9px] text-[#A0B0A5] font-bold tracking-[0.3em] uppercase mt-2">Ready for Landscape</div>
          </div>
          {gearData.map((g, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-6 border border-[#D1DDD5] shadow-sm">
              <h3 className="flex items-center gap-2 text-[#2D5A27] font-black text-[12px] mb-4 border-b border-[#F1F5F2] pb-3 uppercase tracking-[0.1em]">
                <Luggage className="w-4 h-4" /> {g.cat}
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {g.list.map((l, j) => (
                  <li key={j} className="flex items-center gap-3 text-[13px] font-bold text-[#4A5D50]">
                    <ChevronRight className="w-3.5 h-3.5 text-[#2D5A27] opacity-30 shrink-0" /> {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      )}

      {/* Persistent Bottom Tab Bar (Dark Emerald Style) */}
      <div className="fixed bottom-8 left-10 right-10 flex justify-center z-50">
        <div className="bg-[#1A2E1F]/90 backdrop-blur-xl px-2 py-2 rounded-full flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
          <button onClick={() => setTab('plan')} className={`flex items-center gap-2 px-7 py-3 rounded-full text-xs font-black transition-all ${tab === 'plan' ? 'bg-[#2D5A27] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
            <Calendar className="w-4 h-4" /> 行程
          </button>
          <button onClick={() => setTab('gear')} className={`flex items-center gap-2 px-7 py-3 rounded-full text-xs font-black transition-all ${tab === 'gear' ? 'bg-[#2D5A27] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
            <Camera className="w-4 h-4" /> 裝備
          </button>
        </div>
      </div>
    </div>
  );
}