import { useState } from 'react';

// 嚴格定義資料結構，徹底消滅紅字
interface ScheduleItem {
  t: string;
  title: string;
  note: string;
  desc: string;
}

interface ScheduleData {
  day: string;
  date: string;
  theme: string;
  stay: string;
  meals: string;
  items: ScheduleItem[];
}

const scheduleData: ScheduleData[] = [
  { 
    day: "05", date: "06/05 (五)", theme: "台北-澳門-桂林",
    stay: "桂林喜來登酒店 (0773-2825588)", 
    meals: "午：珠海風味 / 晚：粥城風味",
    items: [
      { t: "08:05", title: "桃園-澳門 (星宇 JX201)", note: "航班 08:05-10:00", desc: "抵達後前往珠海，午餐後搭動車前往桂林。" },
      { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", note: "暫定 16:39-19:30", desc: "開啟喀斯特地貌初探，入住喜來登酒店。" }
    ]
  },
  { 
    day: "06", date: "06/06 (六)", theme: "遇龍河與灕江漁火",
    stay: "陽朔新西街麗呈華廷 (0773-8818888)", 
    meals: "午：農家宴 / 晚：啤酒魚",
    items: [
      { t: "09:00", title: "遇龍河三橋 (富裡、金龍、遇龍)", note: "古橋對稱攝影", desc: "捕捉石拱橋與倒影構成的滿月意境。" },
      { t: "18:00", title: "灕江漁火 (含竹筏/漁夫/魚鷹)", note: "核心！2小時拍攝", desc: "含夕陽拍攝。報價含10次撒網，額外￥25/次。" }
    ]
  },
  { 
    day: "07", date: "06/07 (日)", theme: "相公山晨光-陽朔西街",
    stay: "相公山山莊 (13517836588) *需交定金", 
    meals: "午：蝴蝶莊園 / 晚：陽朔風味",
    items: [
      { t: "05:30", title: "陽朔大橋 (拍攝日出)", note: "捕捉江面晨霧", desc: "俯瞰灕江，拍攝第一道曙光與孤舟。" },
      { t: "10:00", title: "陽朔公園 + 西街人文", note: "捕捉老街煙火氣", desc: "明清建築風格與中西文化衝突。" }
    ]
  },
  { 
    day: "08", date: "06/08 (一)", theme: "相公山-龍勝梯田",
    stay: "龍脊九龍五虎林舍 (13877351263)", 
    meals: "午：壯族風味 / 晚：龍勝風味",
    items: [
      { t: "05:00", title: "相公山 (日出雲海)", note: "灕江第一灣全景", desc: "捕捉群峰排列與彩霞。這是此行核心攝影點。" },
      { t: "16:00", title: "龍脊梯田 (九龍五虎+夜龍脊)", note: "梯田線條與燈光", desc: "拍攝梯田曲線與最新夜景「夜龍脊」。" }
    ]
  },
  { 
    day: "09", date: "06/09 (二)", theme: "龍勝晨曦-兩江四湖",
    stay: "桂林喜來登酒店 (0773-2825588)", 
    meals: "午：竹筒飯 / 晚：九龍酒家",
    items: [
      { t: "05:30", title: "七星伴月 (晨霧日出)", note: "平安壯寨1號點", desc: "捕捉宛如巨龍般的梯田線條。" },
      { t: "17:00", title: "兩江四湖 + 日月雙塔", note: "城市對稱建築", desc: "杉湖中的金塔銀塔，建議使用廣角鏡拍攝對稱美。" }
    ]
  },
  { 
    day: "10", date: "06/10 (三)", theme: "桂林-珠海-台北",
    stay: "溫暖的家", 
    meals: "午：閩南四合院 / 晚：自理",
    items: [
      { t: "07:32", title: "桂林北-珠海 (動車 G3875)", note: "4/21 開始售票", desc: "車次時間 07:32-11:04。" },
      { t: "20:50", title: "澳門-台北 (星宇 JX206)", note: "航班 20:50-22:40", desc: "經由港珠澳大橋前往澳門機場，平安返家。" }
    ]
  }
];

export default function App() {
  const [activeDay, setActiveDay] = useState<number>(0);
  const curr = scheduleData[activeDay];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-12 flex justify-center font-sans">
      <div className="w-full max-w-lg bg-zinc-900 rounded-[40px] shadow-2xl overflow-hidden border border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="p-8 bg-emerald-700">
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-black/30 rounded-full text-[10px] font-black tracking-widest uppercase">2026 JUN PHOTO</span>
            <span className="text-2xl">📸</span>
          </div>
          <h1 className="text-3xl font-black italic uppercase">Guilin Trip</h1>
          <p className="text-xs opacity-80 tracking-widest font-bold mt-1">導遊：曾克儉 13977316816</p>
        </div>

        {/* Day Nav */}
        <div className="flex p-4 gap-2 overflow-x-auto bg-zinc-950/50 no-scrollbar">
          {scheduleData.map((d, i) => (
            <button 
              key={d.day} 
              onClick={() => setActiveDay(i)} 
              className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${
                activeDay === i ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 flex-1">
          <div className="mb-6 border-l-4 border-emerald-500 pl-4">
            <p className="text-emerald-500 font-black text-xs italic">{curr.date}</p>
            <h2 className="text-xl font-black uppercase italic">{curr.theme}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3 mb-8">
            <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-800">
              <p className="text-[10px] text-zinc-500 font-black uppercase mb-1 italic">🏨 Stay</p>
              <p className="text-[11px] font-bold">{curr.stay}</p>
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-800">
              <p className="text-[10px] text-zinc-500 font-black uppercase mb-1 italic">🍽️ Meals</p>
              <p className="text-[11px] font-bold">{curr.meals}</p>
            </div>
          </div>

          <div className="space-y-6">
            {curr.items.map((it, i) => (
              <div key={i} className="flex gap-4 border-b border-zinc-800 pb-4">
                <span className="text-emerald-500 text-sm">📍</span>
                <div>
                  <h4 className="font-black text-sm italic">{it.title}</h4>
                  <p className="text-[10px] text-emerald-400 font-bold mb-1">🕒 {it.t} | {it.note}</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-zinc-950 border-t border-zinc-800 text-center">
          <p className="text-[9px] font-black text-zinc-600 tracking-widest italic uppercase">
            撒網 ￥25/次 | 礦泉水 1瓶/日 | 4/21 售票提醒
          </p>
        </div>
      </div>
    </div>
  );
}