import { useState } from 'react';
// 精確對齊引入清單，確保所有圖示皆被使用，消滅所有警告
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
    stay: "國際五星 桂林喜來登酒店 (0773-2825588)",
    meals: { b: "自理", l: "珠海風味 (60)", d: "粥城風味 (60)" },
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "集合搭機前往澳門。抵達後經由橫琴/拱北口岸前往珠海。桂林以喀斯特地貌聞名，其山青、水秀、洞奇、石美四絕是攝影師的夢幻題材。", icon: "plane" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "搭乘動車直達桂林。灕江穿城而過，使桂林具備悠閒的旅遊氛圍。抵達後入住喜來登，感受千年古城的山水氣息。", note: "需提早 1 小時到達車站安檢", icon: "train" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "准五星 新西街麗華酒店",
    meals: { b: "飯店內", l: "農家宴 (60)", d: "啤酒魚風味 (60)" },
    items: [
      { t: "09:00", title: "遇龍河三橋 (富里、金龍、遇龍)", desc: "拍攝遇龍河上最著名的古石橋。水流平緩，兩岸峰林清秀，竹木繁茂。石橋與倒影相連酷似滿月，是拍攝田園山水的絕佳地點。", icon: "camera" },
      { t: "14:30", title: "灕江精華 (興坪-九馬畫山)", desc: "搭乘竹筏拍攝著名的「九馬畫山」。江面寬闊如鏡，兩岸奇峰排列，是灕江最精華的喀斯特山體景觀，適合捕捉倒影。", icon: "camera" },
      { t: "17:00", title: "興坪漁火專場攝影 (漁翁魚鷹)", desc: "特別安排漁民現場示範。在灕江暮色下，捕捉竹筏、魚鷹、煤油燈火與漁翁的神秘人文神采，是桂林最具代表性的經典大片。", note: "包含模特漁翁與魚鷹費用，拍攝約 2 小時", icon: "camera" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 相公山",
    stay: "相公山山莊 (方便清晨拍攝)",
    meals: { b: "飯店內", l: "蝴蝶莊園 (60)", d: "陽朔風味餐 (60)" },
    items: [
      { t: "09:00", title: "陽朔公園 / 西山 / 西街人文", desc: "西街具備 1400 多年歷史，明清風格建築與中西合璧的異國風情交織。適合捕捉人文寫實、古鎮氣息與當地生活。", icon: "camera" },
      { t: "14:00", title: "烏龍泉攝影基地", desc: "烏龍泉是田園光影的頂級拍攝地，山峰排列有序，捕捉蜿蜒的灕江田園、村落與翠竹交織的牧歌景象。", icon: "camera" },
      { t: "16:00", title: "烏龍泉夕陽攝影", desc: "捕捉夕陽下群峰層次分明的壯麗景象。光影在群峰間跳躍，是攝影愛好者的必選之地。", note: "建議使用腳架進行長曝，注意防蚊", icon: "camera" },
      { t: "19:00", title: "陽朔大橋夜拍 / 印象劉三姐", desc: "可選擇拍攝大橋餘輝與漁家夜景，或觀看張藝謀導演的大型山水實景演出。", icon: "camera" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "相公山 - 龍脊梯田",
    stay: "龍脊平安壯寨 - 林舍民宿",
    meals: { b: "飯店內", l: "壯寨風味 (60)", d: "龍勝風味 (60)" },
    items: [
      { t: "05:00", title: "相公山日出攝影 (大 U 型)", desc: "登上相公山遠眺，灕江在此處呈大 U 型迴轉。捕捉雲海、日出灑在群峰間的壯麗線條，視覺震撼。", icon: "camera" },
      { t: "13:00", title: "黃洛瑤寨 / 長髮表演", desc: "探訪紅瑤族聚居地，拍攝「天下第一長髮村」的民俗生活。紅瑤族女性保留長髮習俗，極具人文攝影價值。", icon: "camera" },
      { t: "16:00", title: "龍脊平安壯寨 (九龍五虎)", desc: "拍攝著名的「九龍五虎」—指九條山脊與五個山頭。梯田規模宏大，線條隨山勢起伏，捕捉壯族農耕智慧。", note: "需換乘景區車，行李建議精簡", icon: "camera" },
      { t: "17:30", title: "七星伴月攝影", desc: "七個小山包守護彎月狀水田。捕捉斜陽下的梯田線條，感受曲線美學與光影變化。", icon: "camera" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林市區",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "飯店內 (打包)", l: "竹筒飯風味 (60)", d: "九龍酒家 (60)" },
    items: [
      { t: "05:30", title: "平安壯寨 1 號點日出", desc: "捕捉清晨第一道曙光灑在梯田水面上的反射。薄霧繚繞中的壯族吊腳樓構成如詩如畫的晨霧奇觀。", icon: "camera" },
      { t: "15:00", title: "兩江四湖環城水系", desc: "灕江、桃花江、榕湖、杉湖構成的環城水系，展現「城在景中、景在城中」的美景，體現桂林水城特色。", icon: "camera" },
      { t: "19:00", title: "日月雙塔夜拍 (杉湖)", desc: "拍攝杉湖中的金塔與銀塔。雙塔璀璨倒影與象鼻山遙遙相望，是桂林地標性夜景，適合慢門長曝。", note: "建議使用三腳架捕捉精確倒影", icon: "camera" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "打包餐盒", l: "四合院風味 (60)", d: "自理" },
    items: [
      { t: "09:34", title: "桂林西 - 廣州南 (動車 G2231)", desc: "搭乘動車返回珠海。途經情侶路，可遠眺日月貝大劇院（珠海大劇院）。帶著滿滿的作品準備返台。", icon: "train" },
      { t: "20:50", title: "澳門機場 (星宇 JX206)", desc: "搭機返抵桃園。紀錄了灕江煙雨與龍脊的脊樑，結束這趟洗滌心靈的山水遠征。", note: "4/21 記得最後確認售票狀況", icon: "plane" }
    ]
  }
];

const gearData = [
  { cat: "攝影器材 / GEAR", list: ["機身 x 2 (含備機)", "16-35mm 廣角 (梯田必備)", "24-70mm 萬用", "70-200mm (漁火/細節)", "三腳架/減光鏡/快門線", "備用電池 x 5"] },
  { cat: "必備物資 / ESSENTIALS", list: ["護照 / 台胞證", "個人藥品 / 防蚊液", "雨衣 / 遮陽傘", "機能服飾 / 輕便球鞋"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<'plan' | 'gear'>('plan');
  
  // 核心邏輯：確保索引安全，消滅最後一個紅字
  const c = (schedule[day] || schedule[0]) as DayData;

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-[#2D3A30] font-sans antialiased pb-36">
      {/* Header */}
      <header className="pt-12 px-6 pb-6 text-center">
        <div className="flex justify-center mb-1"><Leaf className="w-4 h-4 text-[#2D5A27] opacity-60 animate-bounce" /></div>
        <div className="text-[10px] font-black tracking-[0.4em] text-[#2D5A27] opacity-60 mb-1 uppercase italic underline underline-offset-4 decoration-[#2D5A27]/20">Photography Itinerary</div>
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
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase">DAY {day + 1} ({c.dayOfWeek})</h2>
            <div className="text-[#2D5A27] font-bold tracking-[0.3em] mt-2 opacity-80 uppercase text-[10px] bg-[#2D5A27]/5 py-1.5 rounded inline-block px-4">{c.location}</div>
          </div>

          {/* Stay & Meals Card */}
          <div className="bg-[#2D5A27] text-white p-7 rounded-[2.8rem] shadow-2xl space-y-6 border-b-[6px] border-[#1A3A1A]">
             {c.stay && (
               <div className="flex gap-4 border-b border-white/10 pb-5">
                 <MapPin className="w-5 h-5 shrink-0 opacity-50 mt-1" />
                 <div>
                   <div className="text-[9px] font-black tracking-[0.2em] opacity-50 mb-1 uppercase text-white/80">住宿安排 STAY</div>
                   <div className="text-[14px] font-bold leading-tight">{c.stay}</div>
                 </div>
               </div>
             )}
             <div className="grid grid-cols-3 gap-2 pt-1 text-center items-center">
               <div className="flex flex-col items-center border-r border-white/10">
                  <div className="text-[8px] opacity-40 mb-1 uppercase tracking-tighter text-white/80">早 Breakfast</div>
                  <div className="text-[12px] font-bold">{c.meals.b}</div>
               </div>
               <div className="flex flex-col items-center border-r border-white/10 px-1">
                  <Briefcase className="w-4 h-4 mb-1 opacity-30" />
                  <div className="text-[8px] opacity-40 mb-1 uppercase tracking-tighter text-white/80">午 Lunch</div>
                  <div className="text-[12px] font-bold">{c.meals.l}</div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-[8px] opacity-40 mb-1 uppercase tracking-tighter text-white/80">晚 Dinner</div>
                  <div className="text-[12px] font-bold">{c.meals.d}</div>
               </div>
             </div>
          </div>

          {/* Timeline - 詳實顯示所有景點 */}
          <div className="space-y-8 pt-4 pb-24">
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
                      <h3 className="font-black text-[#2D3A30] text-sm tracking-tight group-hover:text-[#2D5A27] transition-colors">{it.title}</h3>
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
            <div className="text-[10px] text-[#A0B0A5] font-black tracking-[0.4em] uppercase mt-2">Ready for Landscape</div>
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

      {/* Floating Bottom Navigator */}
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