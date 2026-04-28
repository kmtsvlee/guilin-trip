import { useState } from 'react';

const scheduleData = [
  { 
    day: "05", b: "自理", l: "珠海風味 (60)", d: "粥城風味 (60)", 
    stay: "國際五星 桂林喜來登酒店或同級", 
    items: [
      { 
        t: "08:05", title: "桃園-澳門 (星宇 JX201)", 
        lens: "24-70mm", core: "機窗雲海構圖、澳門過關紀錄",
        note: "抵達後過關前往珠海", 
        desc: "今日於機場集合搭機前往澳門。抵達後過關前往珠海。午餐後前往廣州高鐵站搭乘高速列車前往『山水甲天下』之美譽的桂林。桂林是中國河山中的一顆璀璨明珠，獨特的喀斯特地貌和秀美的灕江使這裡成為舉世聞名的旅遊勝地。『山青、水秀、洞奇、石美』形成了桂林獨具一格、馳名中外的自然風光。",
        map: "桃園機場" 
      },
      { 
        t: "16:39", title: "廣州南-桂林西 (動車 D1862)", 
        lens: "35mm / 50mm", core: "車廂人文、窗外喀斯特地貌初探",
        note: "車次參考 16:39-19:30", 
        desc: "搭乘動車前往桂林西站。建議在車窗邊準備相機，進入廣西境內後，窗外的山勢將開始展現喀斯特地貌的奇特輪廓。抵達後入住喜來登酒店。",
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
        lens: "16-35mm (超廣角)", core: "古橋石結構對稱、水面滿月倒影",
        note: "富裡橋/金龍橋/遇龍橋攝影", 
        desc: "遇龍河位於陽朔縣，常年水質清措，水流緩慢。富裡橋建於明代永樂年間，長30米，寬5米，高10米，石結構拱橋與倒影相接酷似滿月。遇龍橋是遇龍河上一石拱橋，位於白沙鎮遇龍村旁，明代所建，全長60米，寬5米，高9米，跨度18米，全用石頭砌成，未用灰漿，歷經數百年而無損，是陽朔縣重點文物古蹟。",
        map: "遇龍河" 
      },
      { 
        t: "14:00", title: "興坪古鎮 + 船遊灕江", 
        lens: "24-105mm / 70-200mm", core: "20元人民幣背景、三岩五井十三山",
        note: "捕捉「佳勝在興坪」的國畫意境", 
        desc: "興坪依山傍水，風景薈萃，粉牆黛瓦石板小巷，是灕江沿岸最美麗的古鎮。灕江沿岸翠竹垂柳，倒映江中的疏林和群峰，化入天際，沉入水底。黃昏時分，五指山下宛如仙境，景色神祕。畫家徐悲鴻曾在此寫生，感嘆『果然佳勝在興坪』。",
        map: "興坪古鎮" 
      },
      { 
        t: "18:00", title: "灕江漁火 (含竹筏+漁夫+魚鷹)", 
        lens: "35mm / 50mm (大光圈)", core: "藍調時刻、傳統馬燈暖色光、漁夫特寫",
        note: "【核心攝影】2小時拍攝傳統漁事景觀", 
        desc: "灕江漁家人的傳統漁事活動。在清晨或傍晚，小竹筏上一盞耀眼的燈光，魚兒借著燈光把魚捕捉叨給主人。夜幕下的江面，漁民成群結隊，乘筏遊梭，灕江山水大背景融合成一幅令人嘆為觀止的奇妙景觀。",
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
        lens: "70-200mm / 16-35mm", core: "江面晨霧、一覽灕江水",
        note: "長焦捕捉霧中孤舟，廣角拍橋面延伸", 
        desc: "屹立在灕江上，橋長207米，是陽朔迄今為止最長的公路橋，連接著陽朔通往福利、興坪鄉鎮的道路。當會淩絕頂，一覽灕江水。這裡是俯瞰江面霧氣與第一道曙光的絕佳位置。",
        map: "陽朔大橋" 
      },
      { 
        t: "10:00", title: "陽朔公園 + 西郎山 + 西街風情", 
        lens: "35mm / 50mm", core: "明清建築風格、中西文化衝突人文",
        note: "拍攝1400年歷史古街風情", 
        desc: "西郎山可俯看城景。陽朔西街是有1400多年歷史的古老街道，位於縣城中心，全長1180米。房屋古樸典雅，桂北明清時期風格，小青瓦、坡屋面、白粉牆、吊腳樓。這裡匯集了中西文化，充滿異國風情的咖啡店、酒吧與古建築並存。",
        map: "陽朔西街" 
      },
      { 
        t: "17:00", title: "烏龍泉 (拍攝夕陽)", 
        lens: "16-35mm / 24-70mm", core: "田園風光剪影、水田夕陽反射",
        note: "捕捉桂林特有田園祕境", 
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
        lens: "14-24mm / 16-35mm", core: "第一灣全景、群峰排列、彩霞光影",
        note: "【核心重點】世界級攝影基地", 
        desc: "位於陽朔興坪鎮內的灕江西岸。登上相公山舉目遠眺，群峰排列有序，蜿蜒流淌的灕江甚是美妙。這裡的雲海、日出、光影、彩霞吸引著無數攝影愛好者和攝影家。",
        map: "相公山" 
      },
      { 
        t: "14:00", title: "黃洛瑤寨 (長髮表演)", 
        lens: "50mm / 85mm", core: "華麗服飾紋理、長髮洗滌人文",
        note: "拍攝「天下第一長髮村」", 
        desc: "身著華麗服飾的瑤族姑娘表演傳統舞蹈，並獻上香味噴噴的瑤族油茶。此處可紀錄瑤族紅瑤支系的獨特民俗與人文細節。",
        map: "黃洛瑤寨" 
      },
      { 
        t: "16:00", title: "龍脊平安壯寨 (九龍五虎)", 
        lens: "70-200mm / 16-35mm", core: "九龍五虎線條、夜龍脊燈光",
        note: "拍攝高腳幹欄型建築與梯田", 
        desc: "龍脊梯田規模極其宏大。平安壯寨保持傳統的麻欄式三層木樓，全杉木結構，是桂北地區典型的高腳幹欄型建築。『九龍』指主脈分出來的九條小山樑，『五虎』指五個微凸的小山頭，兩者被梯田所盤繞。z字型的石板道把全寨各戶相連。晚上可拍攝最新夜景『夜龍脊』。",
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
        lens: "24-70mm / 70-200mm", core: "七小山包對稱感、彎彎月亮田",
        note: "捕捉宛如巨龍般的梯田線條", 
        desc: "平安梯田宛如一條進行中的巨龍。『七星』指當初開天時特意留下來的七個小山包，疊立在器塊田中央，遠望像七顆閃爍的星星，守護著龍脊那塊彎彎的月亮田。晨霧流動感極強，是攝影精華。",
        map: "七星伴月" 
      },
      { 
        t: "14:00", title: "日船遊一江四湖 + 日月雙塔", 
        lens: "16-35mm", core: "城市環城水系、日塔月塔地標",
        note: "拍攝杉湖中的金塔銀塔", 
        desc: "環城水系包括灕江、桃花江、榕湖、杉湖等。日月雙塔座落在杉湖中，日塔為金塔，月塔為銀塔，是兩一江四湖環城水系中最重要的旅遊景點。雙塔高聳入雲，直指日月。",
        map: "日月雙塔" 
      },
      { 
        t: "17:00", title: "穿山公園 + 塔山日落", 
        lens: "70-200mm / 24-70mm", core: "古塔夕陽剪影、壽佛塔特寫",
        note: "捕捉「金針、鵝管」奇觀", 
        desc: "穿山內有奇特鐘乳石岩洞，佈滿如樹枝狀的碳酸鈣結晶『金針』與玻璃管狀的『鵝管』。欣賞塔山上與象鼻山普賢塔遙遙相望的壽佛塔，感受山水城市的悠閒氣氛。塔山紅葉更是名列桂林八景之一。",
        map: "塔山" 
      }
    ]
  },
  { 
    day: "10", b: "打包", l: "四合院 (60)", d: "自理", 
    stay: "溫暖的家", 
    items: [
      { 
        t: "09:34", title: "桂林西-廣州南 (動車 G2231)", 
        lens: "iPhone / 35mm", core: "車廂紀錄、告別山水",
        note: "車次參考 09:34-11:58", 
        desc: "結束桂林行程，搭乘高鐵返回廣州。隨後搭車返回珠海進行市區觀光。",
        map: "桂林西站" 
      },
      { 
        t: "14:00", title: "珠海日月貝大劇院 + 港珠澳大橋", 
        lens: "12-24mm / 16-35mm", core: "極簡幾何線條、海島歌劇院全景",
        note: "紀錄現代建築之美", 
        desc: "遠觀港珠澳大橋，這是世界最長的跨海大橋，全長55公里。隨後參觀日月貝珠海大劇院，由一大一小兩組『貝殼』組成，是中國唯一建設在海島上的歌劇院。",
        map: "珠海" 
      }
    ]
  }
];

const prepList = [
  { category: "核心攝影器材", items: [
    { name: "超廣角鏡頭 (14-35mm)", detail: "相公山全景、龍脊梯田大景必備" },
    { name: "中長焦鏡頭 (70-200mm)", detail: "核心！捕捉梯田壓縮感、日出孤舟特寫與遠山層次" },
    { name: "人文定焦鏡 (35mm/50mm)", detail: "灕江漁火微光攝影、西街人文街拍" },
    { name: "濾鏡系統 (ND/GND/CPL)", detail: "控制日出日落光差，消除水面雜亂反光" },
    { name: "三腳架 / 清潔組", detail: "慢快門拍攝必備，隨時清理山區潮濕水氣" }
  ]},
  { category: "戶外機能裝備", items: [
    { name: "機能防水外套 (硬殼)", detail: "6 月雨季必備，山區晨間防風防雨" },
    { name: "機能戰術背包", detail: "需具備快取功能，方便隨時切換長焦/廣角鏡頭" },
    { name: "防滑登山鞋", detail: "龍脊石板路與江岸溼滑，需良好抓地力" }
  ]},
  { category: "重要文件與生活", items: [
    { name: "護照 / 台胞證", detail: "通關與各酒店入住檢查憑證" },
    { name: "大容量行動電源", detail: "確保整日戶外拍攝後手機與相機電力" },
    { name: "個人香氛 / 驅蚊噴霧", detail: "保持質感並應對山區水邊蚊蟲" }
  ]}
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('05');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F0FDF4] pb-36 font-sans text-[#064E3B] text-left">
      <header className="p-8 pt-16 bg-gradient-to-b from-[#DCFCE7] to-[#F0FDF4] flex items-center space-x-5 text-left">
        <div className="flex-shrink-0">
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" className="shadow-2xl">
            <rect width="100" height="100" rx="25" fill="#064E3B"/>
            <path d="M15 80L40 30L65 80H15Z" fill="#10B981"/>
            <path d="M45 80L68 45L90 80H45Z" fill="#059669" fillOpacity="0.8"/>
            <circle cx="52" cy="62" r="14" fill="#064E3B" stroke="#F0FDF4" strokeWidth="2"/>
            <path d="M52 48V52M66 62H62M52 76V72M38 62H42" stroke="#F0FDF4" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[#059669] font-bold text-[11px] uppercase tracking-[0.3em] mb-1">2026 六月攝影之旅</p>
          <h1 className="text-3xl font-black text-[#064E3B] tracking-tight">桂林攝影行程</h1>
        </div>
      </header>

      <main className="px-6">
        {tab === '行程' ? (
          <>
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 mb-6 text-left">
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
              <div key={i} onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className={`bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer mb-5 text-left ${expandedIdx === i ? 'border-[#10B981] shadow-md' : 'border-[#DCFCE7]'}`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[#059669] font-bold text-xs bg-[#D1FAE5] px-3 py-1 rounded-full text-left">🕒 {it.t}</span>
                  <span className={`text-[#10B981] transition-transform duration-300 ${expandedIdx === i ? 'rotate-180' : ''}`}>▼</span>
                </div>
                <h2 className="text-xl font-black leading-tight text-[#064E3B] text-left">{it.title}</h2>
                <div className={`overflow-hidden transition-all duration-300 ${expandedIdx === i ? 'max-h-[1500px] mt-4' : 'max-h-0'}`}>
                  <div className="bg-[#F0FDF4] p-5 rounded-3xl border border-dashed border-[#10B981]/30">
                    <p className="text-[#059669] text-[10px] font-black mb-3 uppercase tracking-widest border-b border-[#10B981]/20 pb-1 text-left">攝影指南</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/50 p-3 rounded-2xl border border-[#10B981]/10 text-left">
                        <p className="text-[10px] font-bold text-[#10B981] mb-1">🔍 建議焦段</p>
                        <p className="text-xs font-black text-[#064E3B]">{it.lens}</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-2xl border border-[#10B981]/10 text-left">
                        <p className="text-[10px] font-bold text-[#10B981] mb-1">📸 核心事項</p>
                        <p className="text-xs font-black text-[#064E3B]">{it.core}</p>
                      </div>
                    </div>
                    <p className="text-[#059669] text-[10px] font-bold mb-2 uppercase tracking-widest text-left">地點詳解</p>
                    <p className="text-[#064E3B] text-sm leading-relaxed mb-4 whitespace-pre-line text-left">{it.desc}</p>
                    <div className="pt-4 border-t border-[#10B981]/10 text-left">
                      <span className="text-[#10B981] text-[11px] font-bold">💡 拍攝註記：</span>
                      <span className="text-[#059669] text-[11px] italic">{it.note}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-white/60 p-6 rounded-[2.5rem] border-2 border-dashed border-[#10B981]/40 flex items-center space-x-4 shadow-sm text-left">
              <div className="bg-[#10B981] text-white p-3 rounded-2xl text-xl">🏨</div>
              <div>
                <p className="text-[#059669] text-[10px] font-bold uppercase tracking-wider text-left">今晚住宿</p>
                <p className="text-lg font-black text-[#064E3B] leading-tight text-left">{curr.stay}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 text-left">
            {prepList.map((cat, idx) => (
              <div key={idx}>
                <h3 className="text-[#059669] font-black text-sm uppercase tracking-[0.2em] mb-4 flex items-center text-left">
                  <span className="w-8 h-[2px] bg-[#10B981] mr-3"></span>{cat.category}
                </h3>
                <div className="grid gap-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-[2rem] border-2 border-[#DCFCE7] flex items-start space-x-4 shadow-sm text-left">
                      <div className="w-6 h-6 rounded-full border-2 border-[#10B981] mt-1 flex-shrink-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-black text-[#064E3B] leading-tight text-left">{item.name}</p>
                        <p className="text-[#059669] text-[10px] mt-1 italic leading-snug text-left">{item.detail}</p>
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
        <button onClick={() => setTab('行程')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab === '行程' ? 'bg-[#10B981] text-white shadow-inner' : 'text-[#059669]'}`}>
          <span className="text-lg">⛰️</span><span className="text-[10px] font-black">每日行程</span>
        </button>
        <button onClick={() => setTab('準備')} className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all ${tab === '準備' ? 'bg-[#10B981] text-white shadow-inner' : 'text-[#059669]'}`}>
          <span className="text-lg">🎒</span><span className="text-[10px] font-black">裝備檢查</span>
        </button>
      </nav>
    </div>
  );
}