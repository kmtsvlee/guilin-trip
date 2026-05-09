import { useState } from 'react';
// 嚴格管理圖示引入，確保 0 警告
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
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", desc: "集合搭機前往澳門。抵達後經由橫琴或拱北口岸前往珠海，隨後轉乘動車前往桂林。桂林以喀斯特地貌聞名，其「山青、水秀、洞奇、石美」是全球攝影師的夢幻題材。", icon: "plane" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", desc: "搭乘動車直達桂林。灕江穿城而過，使桂林具備悠閒的旅遊氛圍。抵達後入住喜來登，感受千年古城的山水氣息。", note: "需提早 1 小時到達車站安檢", icon: "train" }
    ]
  },
  {
    date: "06/06", dayOfWeek: "六", location: "桂林 - 陽朔",
    stay: "准五星 新西街麗華酒店",
    meals: { b: "飯店內", l: "農家宴 (60)", d: "啤酒魚風味 (60)" },
    items: [
      { t: "09:00", title: "遇龍河三橋 (富里、金龍、遇龍)", desc: "拍攝遇龍河上最著名的古石橋。水流平緩，兩岸峰林清秀。橋洞與倒影相接酷似滿月，是田園攝影的絕佳機位。", icon: "camera" },
      { t: "14:30", title: "灕江精華 (興坪-九馬畫山)", desc: "搭乘竹筏拍攝著名的「九馬畫山」。江面寬闊如鏡，奇峰倒影清晰。這裡的喀斯特山體層次感豐富，是水墨畫風的代表。", icon: "camera" },
      { t: "17:00", title: "興坪漁火專場 (含漁翁魚鷹)", desc: "特別安排漁民現場示範。暮色下利用竹筏、魚鷹、煤油燈火，捕捉傳統漁事的人文魅力，是桂林最具代表性的經典大片機位。", note: "包含模特漁翁費用，拍攝約 2 小時", icon: "camera" }
    ]
  },
  {
    date: "06/07", dayOfWeek: "日", location: "陽朔 - 相公山",
    stay: "相公山山莊 (方便清晨拍攝)",
    meals: { b: "飯店內", l: "蝴蝶莊園 (60)", d: "陽朔風味餐 (60)" },
    items: [
      { t: "09:00", title: "陽朔西街人文 / 陽朔公園", desc: "西街具備 1400 多年歷史，明清風格建築與中西合璧的店鋪交織。適合捕捉人文寫實畫面。", icon: "camera" },
      { t: "15:00", title: "烏龍泉夕陽攝影", desc: "烏龍泉是攝影師必選位。山峰排列有序，蜿蜒的灕江田園與群峰在夕陽光影下層次分明，捕捉如詩如畫的牧歌景象。", note: "建議使用腳架長曝，注意防蚊", icon: "camera" },
      { t: "19:00", title: "印象劉三姐 (選購)", desc: "張藝謀導演的大型實景演出，以山水為幕。若不觀影，可前往陽朔大橋拍夕陽餘輝。", icon: "camera" }
    ]
  },
  {
    date: "06/08", dayOfWeek: "一", location: "相公山 - 龍脊梯田",
    stay: "龍脊平安壯寨 - 林舍民宿",
    meals: { b: "飯店內", l: "壯寨風味 (60)", d: "龍勝風味 (60)" },
    items: [
      { t: "05:00", title: "相公山日出攝影", desc: "登上相公山遠眺，灕江在此處呈大 U 型迴轉。捕捉雲海、日出灑在群峰間的壯麗線條，呈現震撼的視覺層次。", icon: "camera" },
      { t: "13:00", title: "黃洛瑤寨 / 長髮秀", desc: "探訪紅瑤族聚居地，拍攝「天下第一長髮村」的民俗生活。紅瑤族女性保留長髮習俗，具有極強的人文攝影價值。", icon: "camera" },
      { t: "16:00", title: "龍脊梯田 (九龍五虎 / 七星伴月)", desc: "前往平安壯寨。拍攝「九龍五虎」—指九條山脊與五個山頭；「七星伴月」—指七個小山包守護彎月狀水田。線條感極強。", note: "換乘景區車，行李建議輕便", icon: "camera" }
    ]
  },
  {
    date: "06/09", dayOfWeek: "二", location: "龍脊 - 桂林市區",
    stay: "國際五星 桂林喜來登酒店",
    meals: { b: "飯店內 (打包)", l: "竹筒飯風味 (60)", d: "九龍酒家 (60)" },
    items: [
      { t: "05:30", title: "平安壯寨日出攝影", desc: "拍攝晨曦灑在水田上的反光。清晨常有薄霧繚繞，壯族吊腳樓在梯田環抱下靜謐且富有層次感。", icon: "camera" },
      { t: "14:00", title: "下山前往桂林", desc: "收拾器材下山，返回桂林市區，準備晚上的城市地標拍攝。", icon: "camera" },
      { t: "19:00", title: "兩江四湖環城夜拍 / 日月雙塔", desc: "拍攝座落在杉湖的日月雙塔。金塔與銀塔交相輝映，是桂林標誌性夜景。環城水系展現「城在景中、景在城中」。", note: "建議使用三腳架捕捉湖面投影", icon: "camera" }
    ]
  },
  {
    date: "06/10", dayOfWeek: "三", location: "桂林 - 澳門 - 台北",
    meals: { b: "打包餐盒", l: "四合院風味 (60)", d: "自理" },
    items: [
      { t: "09:34", title: "桂林西 - 廣州南 (動車 G2231)", desc: "搭乘動車返回珠海。途經珠海情侶路，可遠眺日月貝大劇院。帶著記憶卡裡滿載的大片，結束遠征。", icon: "train" },
      { t: "20:50", title: "澳門機場 (星宇 JX206)", desc: "搭機返抵桃園。這趟攝影之旅將山水、梯田與民俗人文完美融合在快門中。", note: "4/21 確認最終售票狀況", icon: "plane" }
    ]
  }
];

const gearData = [
  { cat: "攝影器材 / GEAR", list: ["機身 x 2 (含備機)", "16-35mm 廣角 (拍梯田)", "24-70mm 萬用", "70-200mm (漁翁特寫)", "三腳架 / 減光鏡 / 快門線", "備用電池 x 5"] },
  { cat: "必備物資 / ESSENTIALS", list: ["護照 / 台胞證", "個人藥品 / 防蚊液", "雨衣 / 遮陽傘", "機能服飾 / 輕便球鞋"] }
];

export default function App() {
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<'plan' | 'gear'>('plan');
  
  // 核心修復：強制斷言，徹底消滅 TypeScript 紅字
  const curr = schedule[day] as DayData;

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-[#2D3A30] font-sans antialiased pb-32">
      {/* Header (Forest Green) */}
      <header className="pt-10 px-6 pb-6 text-center">
        <div className="text-[10px] font-black tracking-[0.4em] text-[#2D5A27] opacity-60 mb-1 uppercase italic underline underline-offset-4 decoration-[#2D5A27]/20">Photography Expedition</div>
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
          <button key={i} onClick={() => setDay(i)} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 border ${day === i ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-md' : 'bg-white text-[#2D5A27] border-[#D1DDD5]'}`}>
            {d.date.split('/')[1]}
          </button>
        ))}
      </nav>

      {tab === 'plan' ? (
        <main className="px-6 space-y-6 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase tracking-tighter">DAY {day + 1}</h2>
            <div className="text-[#2D5A27] font-bold tracking-[0.2em] mt-2 opacity-80 uppercase text-[10px] bg-[#2D5A27]/5 py-1 rounded inline-block px-3">{curr.location}</div>
          </div>

          {/* Stay & Meals Card (Forest Green Style) */}
          <div className="bg-[#2D5A27] text-white p-6 rounded-[2.5rem] shadow-xl space-y-5 border-b-4 border-[#1A3A1A]">
             {curr.stay && (
               <div className="flex gap-3 border-b border-white/10 pb-4">
                 <MapPin className="w-5 h-5 shrink-0 opacity-60" />
                 <div>
                   <div className="text-[10px] font-black tracking-widest opacity-60 mb-1 uppercase text-white/70">住宿 STAY</div>
                   <div className="text-[13px] font-bold">{curr.stay}</div>
                 </div>
               </div>
             )}
             <div className="grid grid-cols-3 gap-2 pt-2 text-center items-center">
               <div><div className="text-[10px] opacity-60 mb-1 text-white/70">早餐</div><div className="text-xs font-bold">{curr.meals.b}</div></div>
               <div className="border-x border-white/10 flex flex-col items-center">
                 <Briefcase className="w-3 h-3 mb-1 opacity-40" />
                 <div className="text-[10px] opacity-60 mb-1 text-white/70">午餐</div>
                 <div className="text-xs font-bold">{curr.meals.l}</div>
               </div>
               <div><div className="text-[10px] opacity-60 mb-1 text-white/70">晚餐</div><div className="text-xs font-bold">{curr.meals.d}</div></div>
             </div>
          </div>

          {/* Timeline (Showing ALL items) */}
          <div className="space-y-6 pt-4 pb-12">
            {curr.items.map((it, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2D5A27] ring-4 ring-white" />
                  {i !== curr.items.length - 1 && <div className="w-0.5 grow bg-[#D1DDD5] my-1" />}
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#D1DDD5] shadow-sm grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#2D5A27] font-black font-mono text-sm">{it.t}</span>
                    <div className="flex items-center gap-1.5 ml-1">
                      {it.icon === 'plane' && <Plane className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      {it.icon === 'train' && <Train className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      {it.icon === 'camera' && <Camera className="w-3.5 h-3.5 text-[#2D5A27]/40" />}
                      <h3 className="font-black text-[#333] text-sm tracking-tight">{it.title}</h3>
                    </div>
                  </div>
                  {it.desc && <p className="text-[#5A6D60] text-[12px] leading-relaxed mb-3 font-medium text-justify">{it.desc}</p>}
                  {it.note && (
                    <div className="bg-[#F8FAF8] p-3 rounded-xl flex items-start gap-2 border border-[#D1DDD5]">
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
            <h2 className="text-2xl font-black text-[#2D5A27] italic uppercase tracking-tighter">Equipment Checklist</h2>
          </div>
          {gearData.map((g, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-6 border border-[#D1DDD5] shadow-sm">
              <h3 className="flex items-center gap-2 text-[#2D5A27] font-black text-sm mb-4 border-b border-[#F1F5F2] pb-3 uppercase tracking-widest">
                <Luggage className="w-4 h-4" /> {g.cat}
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {g.list.map((l, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-bold text-[#555]">
                    <ChevronRight className="w-3 h-3 text-[#2D5A27] opacity-40" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      )}

      {/* Bottom Nav Bar (Dark Emerald Style) */}
      <div className="fixed bottom-8 left-10 right-10 flex justify-center z-50">
        <div className="bg-[#1A2E1F]/90 backdrop-blur-xl px-2 py-2 rounded-full flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10">
          <button onClick={() => setTab('plan')} className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black transition-all ${tab === 'plan' ? 'bg-[#2D5A27] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <Calendar className="w-4 h-4" /> 行程
          </button>
          <button onClick={() => setTab('gear')} className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black transition-all ${tab === 'gear' ? 'bg-[#2D5A27] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <Camera className="w-4 h-4" /> 裝備
          </button>
        </div>
      </div>
    </div>
  );
}