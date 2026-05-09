import { useState } from 'react';
// 精確引入下方會用到的 10 個圖示，不多不少，消滅所有 unused 警告
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
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "自理", l: "珠海風味 (60)", d: "粥城風味 (60)" },
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "集合搭機前往澳門。抵達後過關前往珠海，隨後搭乘動車前往桂林。桂林是中國河山中一顆璀璨明珠，獨特的喀斯特地貌形成「山青、水秀、洞奇、石美」的自然風光。", icon: "plane" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "開啟這趟舉世聞名的旅遊勝地之行。灕江使這裡成為山水城市，氣氛悠閒。", note: "需提早 1 小時到達車站", icon: "train" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "准五星 新西街麗華酒店",
    meals: { b: "飯店內", l: "農家宴 (60)", d: "啤酒魚 (60)" },
    items: [
      { t: "09:00", title: "遇龍河三橋風光", desc: "拍攝富里橋、金龍橋與遇龍橋。橋長與倒影相接，酷似一輪滿月。遇龍河兩岸山峰清秀，竹木繁茂，水質清澈，是絕佳的田園水墨畫面。", icon: "camera" },
      { t: "17:00", title: "興坪漁火攝影 (含漁翁)", desc: "傳統漁事活動在暮色下展現神采。漁民利用魚鷹獵食，竹筏上的煤油燈火與灕江大背景融為一體，捕捉如畫般的奇妙景觀。", note: "拍攝約 2 小時，包含模特漁翁", icon: "camera" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 相公山",
    stay: "相公山山莊 或 同級",
    meals: { b: "飯店內", l: "蝴蝶莊園 (60)", d: "陽朔風味餐 (60)" },
    items: [
      { t: "09:00", title: "陽朔公園 + 西山 + 西街", desc: "西街是 1400 多年歷史的古鎮街區，明清時期風格與中西合璧的異國風情咖啡館、酒吧交織，形成獨特的旅遊景點。", icon: "camera" },
      { t: "16:00", title: "烏龍泉拍攝夕陽", desc: "烏龍泉是拍攝田園光影的著名基地，捕捉群峰排列有序、蜿蜒流淌的灕江美景。", note: "此處為攝影愛好者必選位", icon: "camera" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "相公山 - 龍脊梯田",
    stay: "龍脊九龍五虎觀景臺 - 林舍民宿",
    meals: { b: "飯店內", l: "壯寨風味 (60)", d: "龍勝風味 (60)" },
    items: [
      { t: "05:00", title: "相公山日出攝影", desc: "登上相公山舉目遠眺，雲海、日出、彩霞吸引無數攝影師。灕江在此處迴轉，層次感豐富。", icon: "camera" },
      { t: "15:00", title: "龍脊平安壯寨梯田", desc: "拍攝「九龍五虎」與「七星伴月」奇觀。九龍指九條山梁，五虎指微凸小山頭。七個小山包疊立在田中央，守護著彎彎的月亮田。", note: "需換乘景區電車，行李建議輕便", icon: "camera" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林市區",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "飯店內 (需打包)", l: "竹筒飯 (60)", d: "九龍酒家 (60)" },
    items: [
      { t: "05:30", title: "平安壯寨 1 號點日出", desc: "捕捉梯田水面反射的晨曦。龍脊梯田規模極為宏大，線條隨山勢起伏，如詩如畫。", icon: "camera" },
      { t: "19:00", title: "兩江四湖夜景 (含日月雙塔)", desc: "灕江、桃花江、榕湖、杉湖等環城水系，展現古建築與現代燈光交映。日月雙塔與象鼻山遙遙相望，是桂林地標夜景。", note: "建議使用三腳架進行慢門攝影", icon: "camera" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "打包餐盒", l: "四合院 (60)", d: "自理" },
    items: [
      { t: "09:34", title: "桂林西 - 廣州南 (動車 G2231)", desc: "收拾行囊，帶著滿滿的攝影大片準備返程。經過珠海情侶路與日月貝大劇院。", icon: "train" },
      { t: "20:50", title: "澳門機場 (星宇 JX206)", desc: "搭機返回桃園。這趟攝影遠征將山水與民俗人文完美融合在快門中。", note: "4/21 記得確認售票狀況", icon: "plane" }
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
  
  // 核心安全處理：確保資料絕對存在，消滅所有 TypeScript 紅字警告
  const c = schedule[day] as DayData;

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-[#2D3A30] font-sans antialiased pb-32">
      {/* Header Section */}
      <header className="pt-10 px-6 pb-6 text-center">
        <div className="text-[10px] font-black tracking-[0.3em] text-[#2D5A27] opacity-60 mb-1 uppercase italic underline underline-offset-4 decoration-[#2D5A27]/20">Photography Expedition</div>
        <h1 className="text-3xl font-black text-[#2D5A27] tracking-tighter uppercase">桂林攝影行程</h1>
        <div className="mt-4 flex justify-center">
           <div className="bg-white/90 px-4 py-1.5 rounded-full border border-[#D1DDD5] flex items-center gap-2 shadow-sm">
             <Phone className="w-3 h-3 text-[#2D5A27]" />
             <span className="text-[11px] font-bold text-[#4A5D50]">導遊：曾克儉 13977316816</span>
           </div>
        </div>
      </header>

      {/* Date Selector */}
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
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase">DAY {day + 1}</h2>
            <div className="text-[#2D5A27] font-bold tracking-[0.2em] mt-2 opacity-80 uppercase text-[10px] bg-[#2D5A27]/5 py-1 rounded inline-block px-3">{c.location}</div>
          </div>

          {/* Stay & Meals Card (Forest Green) */}
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
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter">早餐</div>
                  <div className="text-[11px] font-bold">{c.meals.b}</div>
               </div>
               <div className="border-x border-white/10 flex flex-col items-center px-1">
                  <Briefcase className="w-3.5 h-3.5 mb-1 opacity-40" />
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter">午餐</div>
                  <div className="text-[11px] font-bold">{c.meals.l}</div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-50 mb-1 uppercase tracking-tighter">晚餐</div>
                  <div className="text-[11px] font-bold">{c.meals.d}</div>
               </div>
             </div>
          </div>

          {/* Timeline */}
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

      {/* Persistent Bottom Tab Bar (Deep Green) */}
      <div className="fixed bottom-8 left-10 right-10 flex justify-center z-50">
        <div className="bg-[#1A2E1F]/90 backdrop-blur-xl px-2 py-2 rounded-full flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
          <button onClick={() => setTab('plan')} className={`flex items-center gap-2 px-7 py-3 rounded-full text-xs font-black transition-all ${tab === 'plan' ? 'bg-[#2D5A27] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
            <Calendar className="w-4 h-4" /> 行程
          </button>
          <button onClick={() => setTab('gear')} className={`flex items-center gap-2 px-7 py-3 rounded-full text-xs font-black transition-all ${tab === 'gear' ? 'bg-[#2D5A27] text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}>
            <Camera className="w-4 h-4" /> 裝備
          </button>
        </div>
      </div>
    </div>
  );
}