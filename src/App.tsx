import { useState } from 'react';

const scheduleData = [
  { day: "05", b: "自理", l: "珠海風味", d: "粥城風味", stay: "桂林喜來登大酒店", items: [
    { t: "08:05", title: "桃園-澳門 (星宇 JX201)", note: "開啟旅程的起點", desc: "搭乘星宇航空前往澳門，準備展開為期六天的桂林攝影之旅。抵達後將經由陸路口岸前往珠海，感受兩地不同的城市氣息。", map: "桃園機場" },
    { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", note: "動車橫跨兩省", desc: "搭乘高鐵動車前往桂林。窗外景色將從都市繁華轉向桂林標誌性的喀斯特地貌，這是此行第一段動態攝影的機會。", map: "廣州南站" }
  ]},
  { day: "06", b: "酒店", l: "農家宴", d: "啤酒魚", stay: "陽朔精品酒店", items: [
    { t: "09:00", title: "遇龍河三橋風光", note: "富裡橋、金龍橋、遇龍橋攝影", desc: "遇龍河被譽為『小灕江』。富裡橋是著名的石拱橋，倒影與古橋構成完美的幾何對稱，建議使用廣角鏡頭捕捉靜謐的古意。", map: "陽朔遇龍河" },
    { t: "17:00", title: "灕江漁火 (黃昏藍調) 🌅", note: "【核心】竹筏+漁夫+魚鷹+漁火擺拍", desc: "這是攝影愛好者的夢幻場景。在魔幻時刻（Blue Hour），漁夫點亮馬燈，魚鷹立於筏頭。建議使用大光圈定焦鏡頭，捕捉燈火在江面上的暖色反光與背景山的藍調對比。", map: "灕江" }
  ]},
  { day: "07", b: "酒店", l: "蝴蝶莊園", d: "陽朔風味", stay: "陽朔精品酒店", items: [
    { t: "05:30", title: "陽朔大橋日出 🌅", note: "捕捉灕江晨曦", desc: "陽朔大橋是觀看灕江大拐彎日出的絕佳位置。晨霧繚繞在山間，陽光灑在江面上，江中的倒影與早起的漁船是構圖的核心。", map: "陽朔大橋" },
    { t: "17:30", title: "烏龍泉夕陽 🌇", note: "捕捉山水剪影", desc: "烏龍泉田園風光如畫。夕陽餘暉將田野染成金黃色，山脈形成深邃的剪影。此處適合拍攝層次分明的遠景攝影。", map: "烏龍泉" }
  ]},
  { day: "08", b: "酒店", l: "壯族風味", d: "龍勝風味", stay: "龍脊梯田景觀民宿", items: [
    { t: "05:30", title: "相公山日出雲海 🌅", note: "【核心】廣角大景必拍點", desc: "相公山位於灕江精華段。登上山頂可以鳥瞰灕江第一灣，雲海、彩霞、灕江共同構成如國畫般的意境。強烈建議帶上三腳架與漸變減光鏡。", map: "相公山" },
    { t: "17:30", title: "龍脊梯田晚霞 🌇", note: "梯田水面反光攝影", desc: "六月的梯田正值灌水期。晚霞映射在波光粼粼的水面上，層層疊疊的線條構成了強烈的幾何美感，是捕捉大地線條的最佳時機。", map: "龍脊梯田" }
  ]},
  { day: "09", b: "打包", l: "竹筒飯", d: "九龍酒家", stay: "桂林精選酒店", items: [
    { t: "06:00", title: "七星伴月晨霧日出 🌅", note: "拍攝梯田晨霧意境", desc: "龍脊梯田著名的七星伴月景點，晨霧如白紗般籠罩在山頭，隨著太陽升起，光影在田埂間流動，充滿神祕感。", map: "龍脊梯田" },
    { t: "17:00", title: "塔山夕陽 🌇", note: "捕捉建築與山水交匯", desc: "塔山倒影在江面上，古老的塔影與壯麗的夕陽背景相映成趣。這是桂林市區攝影的經典機位。", map: "桂林塔山" }
  ]},
  { day: "10", b: "打包", l: "四合院", d: "自理", stay: "甜蜜的家", items: [
    { t: "16:00", title: "日月貝大劇院 (外觀)", note: "建築幾何與線條攝影", desc: "珠海新地標日月貝。白色貝殼造型在海邊背景下顯得極其簡潔有力。適合拍攝現代感強烈的黑白建築攝影或長曝光。", map: "珠海大劇院" },
    { t: "20:50", title: "澳門-桃園 (星宇 JX206)", note: "帶著美照回家", desc: "結束六天的深度攝影之旅，帶著豐富的影像作品與滿滿的回憶，準備回到溫暖的家進行後製處理。", map: "澳門機場" }
  ]}
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('05');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null); // 控制展開哪一個

  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F0FDF4] pb-36 font-sans text-[#064E3B] text-left">
      <header className="p-8 pt-12 bg-gradient-to-b from-[#DCFCE7] to-[#F0FDF4]">
        <p className="text-[#059669] font-bold text-[10px] uppercase tracking-widest">June 2026</p>
        <h1 className="text-3xl font-black text-[#10B981]">桂林攝影手帳</h1>
      </header>

      <main className="px-6">
        {/* 日期選擇 */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {['05','06','07','08','09','10'].map(d=>(
            <button 
              key={d} 
              onClick={()=>{setDay(d); setExpandedIdx(null);}} // 切換日期時重設展開狀態
              className={`flex-1 min-w-[50px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-[#10B981] border-[#10B981] text-white shadow-md':'bg-white border-[#DCFCE7] text-[#059669] opacity-70'}`}
            >
              <span className="text-lg font-black">{d}</span>
            </button>
          ))}
        </div>

        {/* 餐食 */}
        <div className="bg-[#064E3B] p-5 rounded-3xl text-[#D1FAE5] flex justify-around text-center text-[10px] mb-8 shadow-lg">
          <div className="flex-1"><b>早</b><br/>{curr.b}</div>
          <div className="flex-1 border-l border-emerald-800/50 px-2"><b>午</b><br/>{curr.l}</div>
          <div className="flex-1 border-l border-emerald-800/50 px-2"><b>晚</b><br/>{curr.d}</div>
        </div>

        {/* 行程卡片 */}
        {curr.items.map((it, i)=>(
          <div 
            key={i} 
            onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} // 點擊展開/收合
            className={`bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer mb-5 ${expandedIdx === i ? 'border-[#10B981] shadow-md' : 'border-[#DCFCE7] shadow-sm'}`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#059669] font-bold text-xs bg-[#D1FAE5] px-3 py-1 rounded-full">🕒 {it.t}</span>
              {/* 箭頭指示 */}
              <span className={`text-[#10B981] transition-transform duration-300 ${expandedIdx === i ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
            <h2 className="text-xl font-black leading-tight mb-2 text-[#064E3B]">{it.title}</h2>
            
            {/* 展開區塊 */}
            <div className={`overflow-hidden transition-all duration-300 ${expandedIdx === i ? 'max-h-96 mt-4' : 'max-h-0'}`}>
              <div className="bg-[#F0FDF4] p-5 rounded-3xl border border-dashed border-[#10B981]/30">
                <p className="text-[#059669] text-xs font-bold mb-2 uppercase tracking-widest">地點筆記</p>
                <p className="text-[#064E3B] text-sm leading-relaxed whitespace-pre-line font-medium">
                  {it.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-[#10B981]/10 flex items-center text-[#10B981]">
                  <span className="text-[10px] font-bold">💡 拍攝建議：</span>
                  <span className="text-[10px] italic">{it.note}</span>
                </div>
              </div>
            </div>
            
            {/* 未展開時的預覽文字 */}
            {expandedIdx !== i && (
               <p className="text-[#059669] text-[10px] italic mt-2 opacity-60">點擊查看拍攝詳解...</p>
            )}
          </div>
        ))}

        {/* 住宿資訊 */}
        <div className="mt-8 bg-white/60 p-6 rounded-[2.5rem] border-2 border-dashed border-[#10B981]/40 flex items-center space-x-4">
          <div className="bg-[#10B981] text-white p-3 rounded-2xl shadow-sm text-xl">🏨</div>
          <div>
            <p className="text-[#059669] text-[10px] font-bold uppercase tracking-wider">Tonight's Stay</p>
            <p className="text-lg font-black text-[#064E3B]">{curr.stay}</p>
          </div>
        </div>
      </main>

      {/* 底部導覽 */}
      <nav className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md rounded-[2.5rem] border-2 border-[#DCFCE7] p-2 flex justify-around shadow-xl z-50">
        <button onClick={()=>setTab('行程')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab==='行程'?'bg-[#10B981] text-white shadow-inner':'text-[#059669]'}`}>
          <span className="text-lg">⛰️</span><span className="text-[8px] font-black">行程</span>
        </button>
        <button onClick={()=>setTab('美食')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab==='美食'?'bg-[#10B981] text-white shadow-inner':'text-[#059669]'}`}>
          <span className="text-lg">🍜</span><span className="text-[8px] font-black">美食</span>
        </button>
      </nav>
    </div>
  );
}