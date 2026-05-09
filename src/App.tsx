import { useState } from 'react';
import { Camera, MapPin, Phone, Briefcase, Info, ChevronRight, Calendar, Luggage, Plane, Train } from 'lucide-react';

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
    stay: "國際五星 桂林喜來登酒店 (0773-2825588)",
    meals: { b: "自理", l: "珠海風味 (60)", d: "粥城風味 (60)" },
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "集合搭機前往澳門。抵達後經拱北口岸前往珠海，隨後搭乘動車前往桂林。桂林以「山青、水秀、洞奇、石美」四絕著稱，是喀斯特地貌的巅峰代表。", icon: "plane" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "開啟山水城市之行。灕江穿城而過，使桂林具備悠閒的旅遊氛圍與絕佳的人文攝影條件。", note: "需提早 1 小時到達車站", icon: "train" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "准五星 新西街麗華酒店",
    meals: { b: "飯店內", l: "農家宴 (60)", d: "啤酒魚風味 (60)" },
    items: [
      { t: "09:00", title: "灕江精華段 (興坪-九馬畫山)", desc: "搭乘竹筏拍攝著名的「九馬畫山」。兩岸奇峰排列，水質清澈如鏡。隨後前往遇龍河拍攝富里橋、金龍橋等古橋風光，橋洞與倒影構成圓月景象。", icon: "camera" },
      { t: "17:00", title: "興坪漁火專場攝影", desc: "特別安排漁民現場示範。在灕江暮色中，利用竹筏、魚鷹、煤油燈火，捕捉傳統漁事活動的神秘與神采，是桂林最具代表性的人文大片機位。", note: "漁火拍攝含模特漁翁費用", icon: "camera" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 相公山",
    stay: "相公山山莊 (方便清晨拍攝)",
    meals: { b: "飯店內", l: "蝴蝶莊園 (60)", d: "陽朔風味餐 (60)" },
    items: [
      { t: "09:00", title: "陽朔西街 / 陽朔公園", desc: "西街擁有 1400 多年歷史，建築維持明清風格，是中西文化交融的著名街區。隨後前往烏龍泉攝影基地，拍攝田園光影與群峰層次。", icon: "camera" },
      { t: "16:00", title: "烏龍泉夕陽攝影", desc: "烏龍泉山峰排列有序，蜿蜒的灕江與田園村落交織。夕陽西下時，光影在喀斯特群峰間跳躍，是風景攝影師的必選之地。", note: "注意防蚊與腳架平穩", icon: "camera" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "相公山 - 龍脊梯田",
    stay: "龍脊平安壯寨 - 林舍民宿",
    meals: { b: "飯店內", l: "壯寨風味 (60)", d: "龍勝風味 (60)" },
    items: [
      { t: "05:00", title: "相公山日出攝影", desc: "登上相公山舉目遠眺，灕江在此處呈大 U 型迴轉，群峰層疊。在雲海日出的映襯下，山水線條極其震撼，是桂林攝影的皇冠之位。", icon: "camera" },
      { t: "15:00", title: "龍脊梯田 (九龍五虎 / 七星伴月)", desc: "前往平安壯寨。拍攝著名的「九龍五虎」—指九條山脊與五個山頭；「七星伴月」—指七個小山包守護著彎月狀的田塊。梯田規模宏大，線條隨山勢起伏，如詩如畫。", note: "換乘景區電車，行李建議輕便", icon: "camera" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林市區",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "飯店內 (需打包)", l: "竹筒飯風味 (60)", d: "九龍酒家 (60)" },
    items: [
      { t: "05:30", title: "平安壯寨日出攝影", desc: "拍攝晨曦灑在水田上的反光。龍脊梯田在清晨常有薄霧繚繞，壯寨吊腳樓在梯田環抱下顯得靜謐且富有層次感。", icon: "camera" },
      { t: "19:00", title: "兩江四湖環城水系 / 日月雙塔", desc: "桂林標誌性景觀。兩江四湖展現「城在景中、景在城中」。日月雙塔座落在杉湖，與象鼻山遙遙相望，金塔銀塔交相輝映，是夜景長曝的首選。", note: "建議使用慢門攝影捕捉湖面投影", icon: "camera" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "打包餐盒", l: "四合院風味 (60)", d: "自理" },
    items: [
      { t: "09:34", title: "桂林西 - 廣州南 (動車 G2231)", desc: "搭乘動車返回。途經珠海情侶路，可遠眺日月貝大劇院。帶著滿滿的攝影作品，準備結束這趟洗滌心靈的山水之旅。", icon: "train" },
      { t: "20:50", title: "澳門機場 (星宇 JX206)", desc: "搭機返抵桃園。攝影是凝固的時間，這趟遠征紀錄了灕江的煙雨與龍脊的脊樑。", note: "4/21 記得確認售票狀況", icon: "plane" }
    ]
  }
];

const gearList = [
  { cat: "攝影器材 / GEAR", list: ["機身 x 2 (含備機)", "16-35mm 廣角 (拍梯田)", "24-70mm 萬用", "70-200mm (漁翁特寫)", "三腳架/減光鏡/快門線", "備用電池 x 5"] },
  { cat: "必備物資 / ESSENTIALS", list: ["護照 / 台胞證", "個人藥品 / 防蚊液", "雨衣 / 遮陽傘", "機能服飾 / 輕便球鞋"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<'plan' | 'gear'>('plan');
  
  // 核心邏輯：強制斷言 DayData，消除所有 TypeScript 紅字
  const c = schedule[day] as DayData;

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-[#2D3A30] font-sans antialiased pb-32">
      {/* Header */}
      <header className="pt-10 px-6 pb-6 text-center">
        <div className="text-[10px] font-black tracking-[0.3em] text-[#2D5A27] opacity-60 mb-1 uppercase italic underline underline-offset-4 decoration-[#2D5A27]/20">Photography Itinerary</div>
        <h1 className="text-3xl font-black text-[#2D5A27] tracking-tighter uppercase">桂林攝影行程</h1>
        <div className="mt-4 flex justify-center">
           <div className="bg-white/90 px-4 py-1.5 rounded-full border border-[#D1DDD5] flex items-center gap-2 shadow-sm hover:border-[#2D5A27] transition-colors">
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
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase">DAY {day + 1} ({c.dayOfWeek})</h2>
            <div className="text-[#2D5A27] font-bold tracking-[0.2em] mt-2 opacity-80 uppercase text-[10px] bg-[#2D5A27]/5 py-1 rounded inline-block px-3">{c.location}</div>
          </div>

          {/* Stay & Meals Card */}
          <div className="bg-[#2D5A27] text-white p-6 rounded-[2.5rem] shadow-xl space-y-5 border-b-4 border-[#1A3A1A]">
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
               <div className="flex flex-col items-center border-r border-white/10">
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter text-white/80">早 Breakfast</div>
                  <div className="text-[11px] font-bold text-white">{c.meals.b}</div>
               </div>
               <div className="flex flex-col items-center border-r border-white/10 px-1">
                  <Briefcase className="w-3.5 h-3.5 mb-1 opacity-40" />
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter text-white/80">午 Lunch</div>
                  <div className="text-[11px] font-bold text-white">{c.meals.l}</div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter text-white/80">晚 Dinner</div>
                  <div className="text-[11px] font-bold text-white">{c.meals.d}</div>
               </div>
             </div>
          </div>

          {/* Timeline Items with Detailed Descriptions */}
          <div className="space-y-6 pt-4 pb-12">
            {c.items.map((it, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2D5A27] ring-4 ring-white shadow-sm" />
                  {i !== c.items.length - 1 && <div className="w-0.5 grow bg-[#D1DDD5] my-1" />}
                </div>
                <div className="bg-white p-5 rounded-[1.8rem] border border-[#D1DDD5] shadow-sm grow hover:border-[#2D5A27] transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#2D5A27] font-black font-mono text-sm">{it.t}</span>
                    <div className="flex items-center gap-1.5 ml-1">
                      {it.icon === 'plane' && <Plane className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      {it.icon === 'train' && <Train className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      {it.icon === 'camera' && <Camera className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      <h3 className="font-black text-[#2D3A30] text-sm tracking-tight group-hover:text-[#2D5A27] transition-colors">{it.title}</h3>
                    </div>
                  </div>
                  {it.desc && <p className="text-[#5A6D60] text-[12px] leading-relaxed mb-3 font-medium text-justify">{it.desc}</p>}
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
            <div className="text-[9px] text-[#A0B0A5] font-bold tracking-[0.3em] uppercase mt-2">Ready to Go</div>
          </div>
          {gearList.map((g, i) => (
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

      {/* Bottom Floating Navigation */}
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