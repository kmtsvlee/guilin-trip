import { useState } from 'react';

const scheduleData = [
  { 
    day: "05", b: "自理", l: "珠海風味 (60)", d: "粥城風味 (60)", 
    stay: "國際五星 桂林喜來登酒店或同級", 
    items: [
      { 
        t: "08:05", title: "桃園-澳門 (星宇 JX201)", 
        note: "抵達後過關前往珠海", 
        desc: "今日於機場集合搭機前往澳門。抵達後過關前往珠海。午餐後前往廣州高鐵站搭乘高速列車前往『山水甲天下』之美譽的桂林。桂林是中國河山中的一顆璀璨明珠，獨特的喀斯特地貌和秀美的灕江使這裡成為舉世聞名的旅遊勝地。『山青、水秀、洞奇、石美』形成了桂林獨具一格、馳名中外的自然風光。",
        map: "桃園機場" 
      },
      { 
        t: "16:39", title: "廣州南-桂林西 (動車 D1862)", 
        note: "車次參考 16:39-19:30", 
        desc: "搭乘動車前往桂林西站。建議在車窗邊準備相機，進入廣西境內後，窗外的山勢將開始展現喀斯特地貌的奇特輪廓。",
        map: "廣州南站" 
      }
    ]
  },
  { 
    day: "06", b: "酒店內用", l: "農家宴 (60)", d: "啤酒魚 (60)", 
    stay: "准五星 新西街麗華廷酒店或同級", 
    items: [
      { 
        t: "09:00", title: "遇龍河三橋 (富裡、金龍、遇龍)", 
        note: "歷史古橋與平靜水面攝影", 
        desc: "遇龍河位於陽朔縣，常年水質清澈，水流緩慢。富裡橋建於明代永樂年間，石結構拱橋與倒影相接，酷似一輪滿月。遇龍橋則是石拱橋，始建於明代，橋長60米，是陽朔縣重點文物古蹟。建議使用廣角捕捉古橋與兩岸翠竹、農田構成的南國風光。",
        map: "遇龍河" 
      },
      { 
        t: "14:00", title: "興坪古鎮 + 船遊灕江", 
        note: "捕捉「三岩、五井、十三山」", 
        desc: "興坪依山傍水，風景薈萃，粉牆黛瓦石板小巷，是灕江沿岸最美麗的古鎮。灕江沿岸翠竹垂柳，倒映江中的疏林和群峰，化入天際，沉入水底。黃昏時分，五指山下宛如仙境，景色神祕。畫家徐悲鴻曾在此寫生，感嘆『果然佳勝在興坪』。",
        map: "興坪古鎮" 
      },
      { 
        t: "18:00", title: "灕江漁火 (含竹筏+漁夫+魚鷹)", 
        note: "【核心攝影】藍調時刻與傳統漁燈", 
        desc: "這是灕江漁家人的傳統漁事活動。在清晨或傍晚，小竹筏上一盞耀眼的燈光，魚鷹借著燈光捕魚。夜幕下的江面，漁民成群結隊，乘筏遊梭，灕江山水大背景融合成一幅令人嘆為觀止的奇妙景觀。",
        map: "灕江" 
      }
    ]
  },
  { 
    day: "07", b: "酒店內用", l: "蝴蝶莊園 (60)", d: "陽朔風味 (60)", 
    stay: "相公山山莊 或 DS.裏度假民宿(相公山店)", 
    items: [
      { 
        t: "05:30", title: "陽朔大橋 (拍攝日出)", 
        note: "捕捉灕江第一長公路橋晨曦", 
        desc: "屹立在灕江上，橋長207米，是陽朔迄今為止最長的公路橋。當會淩絕頂，一覽灕江水。這裡是俯瞰江面霧氣與第一道曙光的絕佳位置。",
        map: "陽朔大橋" 
      },
      { 
        t: "10:00", title: "陽朔公園 + 西郎山 + 西街風情", 
        note: "古建築與現代異國風情融合", 
        desc: "陽朔公園內的西郎山可俯看城景。陽朔西街是有1400多年歷史的古老街道，明清時期的風格，青瓦粉牆吊腳樓。這裡匯集了中西文化，充滿異國風情的咖啡店、酒吧與古樸建築交織，形成獨特的旅遊景點資源。",
        map: "陽朔西街" 
      },
      { 
        t: "17:00", title: "烏龍泉 (拍攝夕陽)", 
        note: "捕捉田園風光與落日餘暉", 
        desc: "烏龍泉是拍攝田園風光的秘境。夕陽照射在水田與孤峰之間，線條優美，是典型的桂林山水攝影機位。",
        map: "烏龍泉" 
      }
    ]
  },
  { 
    day: "08", b: "酒店內用", l: "瑤族風味 (60)", d: "龍勝風味 (60)", 
    stay: "龍脊九龍五虎觀景臺-林舍民宿或同級", 
    items: [
      { 
        t: "05:00", title: "相公山 (拍攝日出雲海)", 
        note: "【核心重點】俯看灕江第一灣", 
        desc: "位於陽朔興坪鎮內的灕江西岸。登上相公山舉目遠眺，群峰排列有序，蜿蜒流淌的灕江甚是美妙。這裡的雲海、日出、光影、彩霞吸引著無數攝影愛好者和攝影家。",
        map: "相公山" 
      },
      { 
        t: "14:00", title: "黃洛瑤寨 (長髮表演)", 
        note: "紀錄天下第一長髮村的人文細節", 
        desc: "黃洛瑤寨身著華麗服飾的瑤族姑娘表演傳統舞蹈，並獻上香味噴噴的瑤族油茶。此處可觀察並拍攝瑤族獨特的服飾紋樣與生活習俗。",
        map: "黃洛瑤寨" 
      },
      { 
        t: "16:00", title: "龍脊平安壯寨梯田 (九龍五虎)", 
        note: "拍攝氣勢磅礡的梯田線條與吊腳樓", 
        desc: "龍脊梯田規模宏大。平安壯寨保持傳統的麻欄式三層木樓，全杉木結構，是桂北地區典型的高腳幹欄型建築。『九龍』指主脈分出來的九條小山樑，『五虎』指五個微凸的小山頭，兩者被梯田所盤繞。晚上可拍攝最新夜景『夜龍脊』。",
        map: "龍脊梯田" 
      }
    ]
  },
  { 
    day: "09", b: "酒店內(需打包)", l: "竹筒飯 (60)", d: "九龍酒家 (60)", 
    stay: "國際五星 桂林喜來登酒店或同級", 
    items: [
      { 
        t: "05:30", title: "七星伴月 (拍攝晨霧日出)", 
        note: "捕捉七小山包與月亮田光影", 
        desc: "『七星』指當初開天時特意留下來的七個小山包，疊立在器塊田中央，遠望像七顆閃爍的星星，守護著龍脊那塊彎彎的月亮田。此處晨霧流動感極強，是梯田攝影的精華。",
        map: "七星伴月" 
      },
      { 
        t: "14:00", title: "日船遊一江四湖 + 榕杉湖 + 日月雙塔", 
        note: "城市環城水系與地標建築", 
        desc: "環城水系包括灕江、桃花江、榕湖、杉湖等。新橋景趣相容，樓亭臺榭錯落有致。日月雙塔座落在杉湖中，日塔為金塔，月塔為銀塔，是桂林的文化地標。",
        map: "日月雙塔" 
      },
      { 
        t: "17:00", title: "穿山公園 + 塔山日落", 
        note: "捕捉「金針、鵝管」與壽佛塔剪影", 
        desc: "穿山內有鐘乳石奇洞，佈滿如樹枝狀的碳酸鈣結晶『金針』與玻璃管狀的『鵝管』。欣賞塔山上與象鼻山普賢塔遙遙相望的壽佛塔，感受桂林山水城市的悠閒氣氛。",
        map: "塔山" 
      }
    ]
  },
  { 
    day: "10", b: "打包", l: "四合院 (60)", d: "自理", 
    stay: "溫暖的家", 
    items: [
      { 
        t: "14:00", title: "珠海觀光 (日月貝/港珠澳大橋)", 
        note: "現代建築與海景攝影", 
        desc: "參觀愛情郵局，望港珠澳大橋，這是世界最長的跨海大橋，全長55公里。隨後參觀日月貝珠海大劇院，由一大一小兩組『貝殼』組成，是中國唯一建設在海島上的歌劇院。",
        map: "珠海" 
      },
      { 
        t: "20:50", title: "澳門-桃園 (星宇 JX206)", 
        note: "20:50-22:40 抵達台灣", 
        desc: "帶著滿載的美照與回憶，搭乘星宇航空返回溫暖的家。",
        map: "澳門機場" 
      }
    ]
  }
];

const prepList = [
  { category: "攝影器材", items: [
    { name: "廣角鏡頭 (16-35mm)", detail: "必備！拍梯田大景與古橋全景" },
    { name: "三腳架", detail: "灕江漁火、相公山雲海長曝必用" },
    { name: "減光鏡 (ND/GND)", detail: "控制日出與夕陽的光差比" },
    { name: "備用電池/記憶卡", detail: "龍脊梯田區充電不便，建議多備一份" }
  ]},
  { category: "機能裝備", items: [
    { name: "防水機能外套", detail: "6 月桂林多陣雨，山區氣溫多變" },
    { name: "防滑登山鞋", detail: "龍脊梯田步道濕滑，需有良好抓地力" },
    { name: "遮陽帽/太陽眼鏡", detail: "做好物理防曬，避免曝曬中暑" }
  ]},
  { category: "重要文件", items: [
    { name: "護照/台胞證", detail: "過關與酒店入住檢查" },
    { name: "動車訂票資訊", detail: "截圖存檔，防止網路訊號不穩" }
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
        <p className="text-[#059669] font-bold text-[10px] uppercase tracking-widest">2026 June Photography Tour</p>
        <h1 className="text-3xl font-black text-[#10B981]">桂林攝影行程</h1>
      </header>

      <main className="px-6">
        {tab === '行程' ? (
          <>
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 mb-6">
              {['05','06','07','08','09','10'].map(d=>(
                <button key={d} onClick={()=>{setDay(d); setExpandedIdx(null);}} className={`flex-1 min-w-[50px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-[#10B981] border-[#10B981] text-white shadow-md':'bg-white border-[#DCFCE7] text-[#059669]'}`}>
                  <span className="text-lg font-black">{d}</span>
                </button>
              ))}
            </div>

            <div className="bg-[#064E3B] p-5 rounded-3xl text-[#D1FAE5] flex justify-around text-center text-[10px] mb-8 shadow-lg">
              <div className="flex-1"><b>早餐</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-emerald-800/50 px-2"><b>午餐</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-emerald-800/50 px-2"><b>晚餐</b><br/>{curr.d}</div>
            </div>

            {curr.items.map((it, i)=>(
              <div key={i} onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className={`bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer mb-5 ${expandedIdx === i ? 'border-[#10B981] shadow-md' : 'border-[#DCFCE7]'}`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[#059669] font-bold text-xs bg-[#D1FAE5] px-3 py-1 rounded-full">🕒 {it.t}</span>
                  <span className={`text-[#10B981] transition-transform duration-300 ${expandedIdx === i ? 'rotate-180' : ''}`}>▼</span>
                </div>
                <h2 className="text-xl font-black leading-tight text-[#064E3B]">{it.title}</h2>
                <div className={`overflow-hidden transition-all duration-300 ${expandedIdx === i ? 'max-h-[1200px] mt-4' : 'max-h-0'}`}>
                  <div className="bg-[#F0FDF4] p-5 rounded-3xl border border-dashed border-[#10B981]/30">
                    <p className="text-[#059669] text-[10px] font-bold mb-2 uppercase tracking-widest">地點詳解</p>
                    <p className="text-[#064E3B] text-sm leading-relaxed mb-4 whitespace-pre-line">{it.desc}</p>
                    <div className="pt-4 border-t border-[#10B981]/10">
                      <span className="text-[#10B981] text-[11px] font-bold">📸 攝影筆記：</span>
                      <span className="text-[#059669] text-[11px] italic">{it.note}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-white/60 p-6 rounded-[2.5rem] border-2 border-dashed border-[#10B981]/40 flex items-center space-x-4">
              <div className="bg-[#10B981] text-white p-3 rounded-2xl text-xl">🏨</div>
              <div>
                <p className="text-[#059669] text-[10px] font-bold uppercase tracking-wider">Tonight's Stay</p>
                <p className="text-lg font-black text-[#064E3B] leading-tight">{curr.stay}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            {prepList.map((cat, idx) => (
              <div key={idx}>
                <h3 className="text-[#059669] font-black text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                  <span className="w-8 h-[2px] bg-[#10B981] mr-3"></span>{cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border-2 border-[#DCFCE7] flex items-start space-x-4 shadow-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-[#10B981] mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="font-black text-[#064E3B] leading-tight">{item.name}</p>
                        <p className="text-[#059669] text-[10px] mt-1 italic">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md rounded-[2.5rem] border-2 border-[#DCFCE7] p-2 flex justify-around shadow-xl z-50">
        <button onClick={() => setTab('行程')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab === '行程' ? 'bg-[#10B981] text-white' : 'text-[#059669]'}`}>
          <span className="text-lg">⛰️</span><span className="text-[8px] font-black">行程</span>
        </button>
        <button onClick={() => setTab('準備')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab === '準備' ? 'bg-[#10B981] text-white' : 'text-[#059669]'}`}>
          <span className="text-lg">🎒</span><span className="text-[8px] font-black">準備</span>
        </button>
      </nav>
    </div>
  );
}