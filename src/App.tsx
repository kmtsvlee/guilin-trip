import { useState } from 'react';
// 嚴格對齊引入清單，確保下方全部用到，消滅所有警告
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
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "集合搭機前往澳門。抵達後經由橫琴/拱北口岸前往珠海，開啟這趟「山水甲天下」的遠征。桂林以喀斯特地貌聞名，其山青、水秀、洞奇、石美四大特色是攝影師的夢幻題材。", icon: "plane" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "搭乘動車直達桂林。這座山水城市由灕江貫穿，城景交融。抵達後入住喜來登，感受千年古城的悠閒氣息。", note: "需提早 1 小時到達車站進行安檢", icon: "train" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "准五星 新西街麗華酒店",
    meals: { b: "飯店內", l: "農家宴 (60)", d: "啤酒魚風味 (60)" },
    items: [
      { t: "09:00", title: "遇龍河三橋 (富里、金龍、遇龍)", desc: "拍攝遇龍河上最具代表性的三座古橋。水流平緩如鏡，兩岸山峰清秀，竹木繁茂。石橋與倒影相連酷似滿月，是拍攝田園山水的絕佳地點。", icon: "camera" },
      { t: "17:00", title: "興坪漁火專場攝影", desc: "特別安排漁民現場示範。在灕江暮色下，捕捉竹筏、魚鷹、煤油燈與漁翁的人文互動。光影在江面跳躍，是捕捉桂林靈魂的最核心機位。", note: "包含模特漁翁與魚鷹費用，拍攝約 2 小時", icon: "camera" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 相公山",
    stay: "相公山山莊 (方便清晨拍攝)",
    meals: { b: "飯店內", l: "蝴蝶莊園 (60)", d: "陽朔風味餐 (60)" },
    items: [
      { t: "09:00", title: "陽朔西街人文 / 陽朔公園", desc: "西街是 1400 多年歷史的古鎮，明清風格建築與西方咖啡文化融合。隨後前往烏龍泉攝影基地，拍攝田園光影。", icon: "camera" },
      { t: "16:00", title: "烏龍泉夕陽攝影", desc: "烏龍泉山峰排列有序，蜿蜒的灕江在此流淌。夕陽西下時，光影在喀斯特群峰間跳躍，是拍攝田園牧歌景象的頂級位點。", note: "建議使用腳架進行慢門拍攝，注意防蚊", icon: "camera" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "相公山 - 龍脊梯田",
    stay: "龍脊平安壯寨 - 林舍民宿",
    meals: { b: "飯店內", l: "壯寨風味 (60)", d: "龍勝風味 (60)" },
    items: [
      { t: "05:00", title: "相公山日出攝影", desc: "登上相公山舉目遠眺，灕江在此處呈大 U 型迴轉。雲海、日出、彩霞交織在群峰之間，呈現視覺震撼的層次感。", icon: "camera" },
      { t: "15:00", title: "平安壯寨 (九龍五虎 / 七星伴月)", desc: "九龍指九條山脊，五虎指五個小山頭；七星伴月則是七個小山包守護彎月狀水田。梯田規模宏大，線條隨山勢起伏，捕捉壯族勞動智慧的結晶。", note: "需換乘景區專車，行李建議精簡", icon: "camera" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林市區",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "飯店內 (需打包)", l: "竹筒飯風味 (60)", d: "九龍酒家 (60)" },
    items: [
      { t: "05:30", title: "龍脊梯田 1 號觀景點日出", desc: "捕捉清晨第一道曙光灑在梯田水面上的反射。薄霧繚繞中的壯族吊腳樓與階梯狀田壟，構成如詩如畫的晨霧奇觀。", icon: "camera" },
      { t: "19:00", title: "兩江四湖環城夜拍 / 日月雙塔", desc: "拍攝日月雙塔在湖面上的璀璨倒影。金塔與銀塔與象鼻山遙遙相望，是桂林城市地標夜景。環城水系讓桂林夜晚充滿靈氣。", note: "建議使用三腳架與減光鏡進行長曝", icon: "camera" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "打包餐盒", l: "四合院風味 (60)", d: "自理" },
    items: [
      { t: "09:34", title: "桂林西 - 廣州南 (動車 G2231)", desc: "搭乘動車返回珠海與澳門。途中可欣賞嶺南風光。帶著記憶卡裡滿載的山水大片，準備結束這趟攝影遠征。", icon: "train" },
      { t: "20:50", title: "澳門機場 (星宇 JX206)", desc: "搭機返回桃園。攝影是凝固的時間，這份手帳紀錄了 2026 桂林最美的光影記憶。", note: "4/21 記得最後確認售票狀態", icon: "plane" }
    ]
  }
];

const gearData = [
  { cat: "攝影器材 / GEAR", list: ["機身 x 2 (備機重要)", "16-35mm 廣角 (主拍梯田)", "24-70mm 萬用", "70-200mm (漁火/特寫)", "腳架/減光鏡/快門線", "備用電池 x 5"] },
  { cat: "必備物資 / ESSENTIALS", list: ["護照 / 台胞證", "個人藥品 / 防蚊液", "雨衣 / 遮陽傘", "機能服飾 / 輕便球鞋"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<'plan' | 'gear'>('plan');
  
  // 核心邏輯：強制斷言，消滅所有紅字報錯
  const c = schedule[day] as DayData;

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-[#2D3A30] font-sans antialiased pb-36">
      {/* Header */}
      <header className="pt-12 px-6 pb-6 text-center">
        <div className="text-[10px] font-black tracking-[0.4em] text-[#2D5A27] opacity-50 mb-1 uppercase italic underline underline-offset-4 decoration-[#2D5A27]/20">Photography Expedition</div>
        <h1 className="text-3xl font-black text-[#2D5A27] tracking-tighter uppercase">桂林攝影行程</h1>
        <div className="mt-5 flex justify-center">
           <div className="bg-white/90 px-5 py-2 rounded-full border border-[#D1DDD5] flex items-center gap-3 shadow-sm">
             <Phone className="w-3.5 h-3.5 text-[#2D5A27]" />
             <span className="text-[12px] font-bold text-[#4A5D50]">曾克儉 13977316816</span>
           </div>
        </div>
      </header>

      {/* Day Tabs */}
      <nav className="flex gap-3 px-6 overflow-x-auto no-scrollbar mb-10">
        {schedule.map((d, i) => (
          <button key={i} onClick={() => setDay(i)} className={`px-6 py-3 rounded-full text-xs font-black transition-all shrink-0 border ${day === i ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xl scale-105' : 'bg-white text-[#2D5A27] border-[#D1DDD5]'}`}>
            {d.date.split('/')[1]}
          </button>
        ))}
      </nav>

      {tab === 'plan' ? (
        <main className="px-6 space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase tracking-tighter">DAY {day + 1} ({c.dayOfWeek})</h2>
            <div className="text-[#2D5A27] font-bold tracking-[0.3em] mt-2 opacity-80 uppercase text-[10px] bg-[#2D5A27]/5 py-1.5 rounded inline-block px-4">{c.location}</div>
          </div>

          {/* Stay & Meals Card (Forest Style) */}
          <div className="bg-[#2D5A27] text-white p-7 rounded-[2.8rem] shadow-2xl space-y-6 border-b-[6px] border-[#1A3A1A]">
             {c.stay && (
               <div className="flex gap-4 border-b border-white/10 pb-5">
                 <MapPin className="w-5 h-5 shrink-0 opacity-60 mt-1" />
                 <div>
                   <div className="text-[9px] font-black tracking-[0.2em] opacity-50 mb-1 uppercase">住宿安排 STAY</div>
                   <div className="text-[14px] font-bold leading-tight">{c.stay}</div>
                 </div>
               </div>
             )}
             <div className="grid grid-cols-3 gap-2 pt-1 text-center items-center">
               <div className="flex flex-col items-center border-r border-white/10">
                  <div className="text-[8px] opacity-40 mb-1 uppercase tracking-tighter">Breakfast</div>
                  <div className="text-[12px] font-bold">{c.meals.b}</div>
               </div>
               <div className="flex flex-col items-center border-r border-white/10 px-1">
                  <Briefcase className="w-4 h-4 mb-1 opacity-30" />
                  <div className="text-[8px] opacity-40 mb-1 uppercase tracking-tighter">Lunch</div>
                  <div className="text-[12px] font-bold">{c.meals.l}</div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-40 mb-1 uppercase tracking-tighter">Dinner</div>
                  <div className="text-[12px] font-bold">{c.meals.d}</div>
               </div>
             </div>
          </div>

          {/* Detailed Timeline */}
          <div className="space-y-8 pt-4 pb-20">
            {c.items.map((it, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#2D5A27] ring-[5px] ring-white shadow-md" />
                  {i !== c.items.length - 1 && <div className="w-0.5 grow bg-[#D1DDD5] my-2" />}
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-[#D1DDD5] shadow-sm grow hover:border-[#2D5A27] transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#2D5A27] font-black font-mono text-sm leading-none">{it.t}</span>
                    <div className="flex items-center gap-2 ml-1">
                      {it.icon === 'plane' && <Plane className="w-4 h-4 text-[#2D5A27]/30" />}
                      {it.icon === 'train' && <Train className="w-4 h-4 text-[#2D5A27]/30" />}
                      {it.icon === 'camera' && <Camera className="w-4 h-4 text-[#2D5A27]/30" />}
                      <h3 className="font-black text-[#2D3A30] text-sm tracking-tight group-hover:text-[#2D5A27] transition-colors uppercase italic">{it.title}</h3>
                    </div>
                  </div>
                  {it.desc && <p className="text-[#5A6D60] text-[12.5px] leading-relaxed mb-4 font-medium text-justify">{it.desc}</p>}
                  {it.note && (
                    <div className="bg-[#F8FAF8] p-4 rounded-2xl flex items-start gap-3 border border-[#D1DDD5]">
                      <Info className="w-4 h-4 text-[#2D5A27] mt-0.5 shrink-0 opacity-80" />
                      <p className="text-[11.5px] font-bold text-[#2D5A27] leading-normal">{it.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main className="px-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-center py-8">
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase tracking-tighter">Equipment List</h2>
            <div className="text-[10px] text-[#A0B0A5] font-black tracking-[0.4em] uppercase mt-2">Mission Focus</div>
          </div>
          {gearData.map((g, i) => (
            <div key={i} className="bg-white rounded-[2.2rem] p-7 border border-[#D1DDD5] shadow-sm">
              <h3 className="flex items-center gap-3 text-[#2D5A27] font-black text-[13px] mb-5 border-b border-[#F1F5F2] pb-4 uppercase tracking-[0.1em]">
                <Luggage className="w-5 h-5" /> {g.cat}
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {g.list.map((l, j) => (
                  <li key={j} className="flex items-center gap-3 text-[13.5px] font-bold text-[#4A5D50]">
                    <ChevronRight className="w-4 h-4 text-[#2D5A27] opacity-30 shrink-0" /> {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      )}

      {/* Floating Navigator (Dark Deep Green) */}
      <div className="fixed bottom-10 left-12 right-12 flex justify-center z-50">
        <div className="bg-[#1A2E1F]/90 backdrop-blur-2xl px-2 py-2 rounded-full flex gap-1 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/10">
          <button onClick={() => setTab('plan')} className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-black transition-all ${tab === 'plan' ? 'bg-[#2D5A27] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
            <Calendar className="w-4 h-4" /> 行程
          </button>
          <button onClick={() => setTab('gear')} className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-black transition-all ${tab === 'gear' ? 'bg-[#2D5A27] text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}>
            <Camera className="w-4 h-4" /> 裝備
          </button>
        </div>
      </div>
    </div>
  );
}