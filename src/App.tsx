import { useState } from 'react';

const scheduleData = [
  { day: "05", b: "自理", l: "珠海風味", d: "粥城風味", stay: "桂林喜來登大酒店", items: [
    { t: "08:05", title: "桃園-澳門 (星宇 JX201)", note: "廣角捕捉機艙與雲端", desc: "開啟六天五夜桂林攝影之旅。抵達澳門後過關前往珠海，這段路程可觀察珠澳雙城的建築線條對比，為後續的現代建築攝影做暖身。", map: "桃園機場" },
    { t: "16:39", title: "廣州南-桂林西 (動車 D1862)", note: "快門優先捕捉窗外地貌變化", desc: "搭乘動車跨越省際。窗外景色將從工廠林立轉變為拔地而起的喀斯特孤峰。建議觀察光影在山巒間的移動，記錄這段地景的過渡。", map: "廣州南站" }
  ]},
  { day: "06", b: "酒店", l: "農家宴", d: "啤酒魚", stay: "陽朔精品酒店", items: [
    { t: "09:00", title: "遇龍河三橋 (富裡/金龍/遇龍)", note: "廣角鏡頭強調石拱幾何與人文煙火", desc: "富裡橋是著名的石拱橋，橋頭常有在地居民活動。建議利用 16-35mm 焦段將古橋、倒影與兩岸垂柳一同納入構圖，捕捉最道地的「煙火氣」與歷史厚度。", map: "陽朔遇龍河" },
    { t: "17:00", title: "灕江漁火 (黃昏藍調) 🌅", note: "【核心】高感光/大光圈捕捉冷暖對比", desc: "此為此行重點人文場景。在魔幻時刻使用三腳架，捕捉漁夫點亮馬燈後，紅黃色的暖光與藍調山水的強烈色對。魚鷹的動態與煙霧的質感是畫面成敗的關鍵細節。", map: "灕江" }
  ]},
  { day: "07", b: "酒店", l: "蝴蝶莊園", d: "陽朔風味", stay: "陽朔精品酒店", items: [
    { t: "05:30", title: "陽朔大橋日出 🌅", note: "長焦捕捉晨霧，廣角拍江灣大景", desc: "陽朔大橋視野開闊，可俯視灕江蜿蜒。清晨常有江霧，陽光透過霧氣形成的丁達爾效應是絕佳素材。建議觀察江面早起打撈或擺渡的人影，增添人文氣息。", map: "陽朔大橋" },
    { t: "17:30", title: "烏龍泉夕陽 🌇", note: "低角度拍攝田園光影", desc: "烏龍泉以田園風光著稱。夕陽逆光下，田埂的線條會被勾勒得非常清晰。適合拍攝層次分明的遠景，呈現桂林山水特有的國畫意境。", map: "烏龍泉" }
  ]},
  { day: "08", b: "酒店", l: "壯族風味", d: "龍勝風味", stay: "龍脊梯田景觀民宿", items: [
    { t: "05:30", title: "相公山日出雲海 🌅", note: "【核心】超廣角強調群峰張力", desc: "登上相公山頂可鳥瞰灕江第一灣。當雲海翻騰於群峰之間，氣勢極其壯觀。利用廣角鏡頭的透視感，強化山勢的視覺張力，是風景攝影的經典教材。", map: "相公山" },
    { t: "17:30", title: "龍脊梯田晚霞 🌇", note: "捕捉梯田水面反光與線條", desc: "六月正值灌水期。晚霞映射在水面如同破碎的銀鏡。建議尋找農民在田間勞動的身影作為視覺重心，將線條美與人文關懷結合。", map: "龍脊梯田" }
  ]},
  { day: "09", b: "打包", l: "竹筒飯", d: "九龍酒家", stay: "桂林精選酒店", items: [
    { t: "06:00", title: "七星伴月晨霧 🌅", note: "慢快門營造霧氣流動感", desc: "龍脊最具代表性的景點。清晨霧氣在梯田間流動，宛如仙境。此時的光影變化極快，建議多嘗試不同曝光組合，捕捉梯田如五線譜般的韻律。", map: "龍脊梯田" },
    { t: "17:00", title: "塔山夕陽 🌇", note: "對稱構圖捕捉古塔倒影", desc: "塔山與穿山隔江相望。古老的壽佛塔矗立山頭，在夕陽與江水倒影的映襯下，散發濃厚的人文歷史感。建議拍攝水中倒影，創造平衡的視覺效果。", map: "桂林塔山" }
  ]},
  { day: "10", b: "打包", l: "四合院", d: "自理", stay: "甜蜜的家", items: [
    { t: "16:00", title: "日月貝大劇院 (外觀)", note: "建築幾何線條與簡約構圖", desc: "珠海現代建築代表。白色貝殼造型極具視覺張力，適合使用超廣角鏡頭從低視角切入，強調其結構的宏偉與現代感。建議嘗試黑白攝影來強化其純粹的線條。", map: "珠海大劇院" },
    { t: "20:50", title: "澳門-桃園 (星宇 JX206)", note: "整理相簿，記錄攝影心得", desc: "滿載而歸。這六天的影像將成為最珍貴的收藏，記錄了從自然山水到人文瞬間的完整視角，準備回家進行精細的數位顯影。", map: "澳門機場" }
  ]}
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('05');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F0FDF4] pb-36 font-sans text-[#064E3B] text-left">
      <header className="p-8 pt-12 bg-gradient-to-b from-[#DCFCE7] to-[#F0FDF4]">
        <p className="text-[#059669] font-bold text-[10px] uppercase tracking-widest">June 2026 Expedition</p>
        <h1 className="text-3xl font-black text-[#10B981]">桂林攝影手帳</h1>
      </header>

      <main className="px-6">
        {/* 日期導覽 */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {['05','06','07','08','09','10'].map(d=>(
            <button key={d} onClick={()=>{setDay(d); setExpandedIdx(null);}} className={`flex-1 min-w-[50px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-[#10B981] border-[#10B981] text-white shadow-md':'bg-white border-[#DCFCE7] text-[#059669]'}`}>
              <span className="text-lg font-black">{d}</span>
            </button>
          ))}
        </div>

        {/* 飲食摘要 */}
        <div className="bg-[#064E3B] p-5 rounded-3xl text-[#D1FAE5] flex justify-around text-center text-[10px] mb-8 shadow-lg">
          <div className="flex-1"><b>早</b><br/>{curr.b}</div>
          <div className="flex-1 border-l border-emerald-800/50 px-2"><b>午</b><br/>{curr.l}</div>
          <div className="flex-1 border-l border-emerald-800/50 px-2"><b>晚</b><br/>{curr.d}</div>
        </div>

        {/* 行程列表 */}
        {curr.items.map((it, i)=>(
          <div key={i} onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className={`bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer mb-5 ${expandedIdx === i ? 'border-[#10B981] shadow-md' : 'border-[#DCFCE7]'}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#059669] font-bold text-xs bg-[#D1FAE5] px-3 py-1 rounded-full">🕒 {it.t}</span>
              <span className={`text-[#10B981] transition-transform duration-300 ${expandedIdx === i ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <h2 className="text-xl font-black leading-tight text-[#064E3B]">{it.title}</h2>
            
            <div className={`overflow-hidden transition-all duration-300 ${expandedIdx === i ? 'max-h-96 mt-4' : 'max-h-0'}`}>
              <div className="bg-[#F0FDF4] p-5 rounded-3xl border border-dashed border-[#10B981]/30">
                <p className="text-[#059669] text-[10px] font-bold mb-2 uppercase tracking-widest">地點詳解</p>
                <p className="text-[#064E3B] text-sm leading-relaxed mb-4">{it.desc}</p>
                <div className="pt-4 border-t border-[#10B981]/10">
                  <span className="text-[#10B981] text-[11px] font-bold">📸 攝影重點：</span>
                  <span className="text-[#059669] text-[11px] italic">{it.note}</span>
                </div>
              </div>
            </div>
            {expandedIdx !== i && <p className="text-[#059669] text-[10px] italic mt-2 opacity-60">點擊閱讀深度拍攝筆記...</p>}
          </div>
        ))}

        {/* 住宿區塊 */}
        <div className="mt-8 bg-white/60 p-6 rounded-[2.5rem] border-2 border-dashed border-[#10B981]/40 flex items-center space-x-4">
          <div className="bg-[#10B981] text-white p-3 rounded-2xl text-xl">🏨</div>
          <div>
            <p className="text-[#059669] text-[10px] font-bold uppercase tracking-wider">Tonight's Stay</p>
            <p className="text-lg font-black text-[#064E3B]">{curr.stay}</p>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md rounded-[2.5rem] border-2 border-[#DCFCE7] p-2 flex justify-around shadow-xl z-50">
        <button className="flex-1 flex flex-col items-center p-3 rounded-2xl bg-[#10B981] text-white">
          <span className="text-lg">⛰️</span><span className="text-[8px] font-black">行程</span>
        </button>
        <button className="flex-1 flex flex-col items-center p-3 rounded-2xl text-[#059669]">
          <span className="text-lg">🍜</span><span className="text-[8px] font-black">美食</span>
        </button>
      </nav>
    </div>
  );
}