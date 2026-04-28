import { useState } from 'react';

const scheduleData = [
  { 
    day: "05", b: "自理", l: "珠海風味 (60)", d: "粥城風味 (60)", 
    stay: "國際五星 桂林喜來登酒店或同級", 
    items: [
      { 
        t: "08:05", title: "桃園-澳門 (星宇 JX201)", 
        lens: "24-70mm", core: "機窗窗景、澳門過關紀錄",
        note: "高空俯瞰雲海與海島線條", 
        desc: "開啟六天五夜桂林攝影之旅。抵達澳門後過關前往珠海。午後轉往廣州搭乘動車，沿途觀察地理特徵由平原轉為丘陵孤峰。",
        map: "桃園機場" 
      },
      { 
        t: "16:39", title: "廣州南-桂林西 (動車 D1862)", 
        lens: "35mm / 50mm", core: "車廂人文、窗外地景流動",
        note: "快門優先捕捉窗外地貌變化", 
        desc: "搭乘動車前往桂林。窗外山勢將開始展現喀斯特地貌的奇特輪廓。適合練習動態構圖。",
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
        lens: "16-35mm (超廣角)", core: "古橋對稱倒影、兩岸垂柳煙火氣",
        note: "利用低角度強調拱橋弧線", 
        desc: "遇龍河水質清澈。富裡橋建於明代，石結構拱橋與倒影相接酷似滿月。建議觀察橋頭居民洗滌或過橋的人影，增添生活感。",
        map: "遇龍河" 
      },
      { 
        t: "14:00", title: "興坪古鎮 + 船遊灕江", 
        lens: "24-105mm (全能焦段)", core: "20元人民幣背景、江岸疏林群峰",
        note: "長焦段壓縮群峰重疊感", 
        desc: "興坪依山傍水，粉牆黛瓦。灕江沿岸翠竹垂柳，化入天際。黃昏時分五指山下宛如仙境，是徐悲鴻寫生之地。",
        map: "興坪古鎮" 
      },
      { 
        t: "18:00", title: "灕江漁火 (含竹筏+漁夫+魚鷹)", 
        lens: "35mm / 50mm (大光圈)", core: "傳統馬燈暖光、魚鷹動態、藍調背景",
        note: "【核心】控制冷暖平衡，捕捉漁火微光", 
        desc: "灕江傳統漁事。夜幕下漁民點亮馬燈，魚鷹借光捕魚。這是最考驗高感光與測光能力的經典場景。",
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
        lens: "16-35mm / 70-200mm", core: "江面晨霧、第一道曙光穿透感",
        note: "長焦捕捉霧中孤舟，廣角拍橋面延伸", 
        desc: "陽朔迄今最長公路橋。這裡是俯瞰江面霧氣與日出光影的最佳機位。",
        map: "陽朔大橋" 
      },
      { 
        t: "10:00", title: "陽朔西街風情", 
        lens: "35mm (人文定焦)", core: "明清建築吊腳樓、中西文化衝突點",
        note: "捕捉古街生活片段與招牌色彩", 
        desc: "1400年歷史古街。青瓦粉牆與現代酒吧並存，充滿異國風情，是街頭人文攝影的寶庫。",
        map: "陽朔西街" 
      },
      { 
        t: "17:00", title: "烏龍泉 (拍攝夕陽)", 
        lens: "16-35mm / 24-70mm", core: "水田幾何線條、夕陽餘暉反射",
        note: "尋找水田反光最亮的夾角進行構圖", 
        desc: "典型的桂林田園秘境。夕陽照射在水田與孤峰間，線條極美。",
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
        lens: "16-35mm (超廣角必備)", core: "灕江第一灣全景、群峰排列張力",
        note: "【核心】使用漸變鏡或包圍曝光控制天空亮度", 
        desc: "登上山頂俯瞰。雲海、日出、光影共同構成如國畫般的意境，是桂林最頂級的攝影機位。",
        map: "相公山" 
      },
      { 
        t: "14:00", title: "黃洛瑤寨 (長髮表演)", 
        lens: "50mm / 85mm (人像)", core: "服飾紋樣、長髮洗滌動態、神態特寫",
        note: "利用自然光強調織物紋理", 
        desc: "天下第一長髮村。瑤族姑娘服飾精美，可拍攝其特有的民俗勞作與傳統舞蹈。",
        map: "黃洛瑤寨" 
      },
      { 
        t: "16:00", title: "龍脊平安壯寨 (九龍五虎)", 
        lens: "16-35mm / 70-200mm", core: "梯田優美線條、高腳吊腳樓建築",
        note: "長焦壓縮梯田層次，廣角強調規模感", 
        desc: "壯寨全杉木麻欄式三層木樓。九龍五虎意指被梯田盤繞的山樑山頭，意境深遠。",
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
        lens: "24-70mm", core: "七小山包對稱感、彎彎月亮田影",
        note: "晨霧流動時使用慢快門增加仙氣", 
        desc: "龍脊攝影精華。晨霧如同守護星星與月亮田，光影變幻極快。",
        map: "七星伴月" 
      },
      { 
        t: "14:00", title: "日月雙塔 (杉湖)", 
        lens: "16-35mm / 24-70mm", core: "金塔銀塔倒影、城市環城水系",
        note: "尋找水面平靜處拍攝完美倒影", 
        desc: "杉湖中的文化地標。新橋與樓亭臺榭錯落，呈現現代與古典交織的城市風光。",
        map: "日月雙塔" 
      },
      { 
        t: "17:00", title: "穿山公園 + 塔山日落", 
        lens: "24-70mm / 70-200mm", core: "古塔夕陽剪影、石雕細節",
        note: "利用遠處壽佛塔作為視覺重心", 
        desc: "穿山奇洞內有金針鵝管結晶。塔山日落時與普賢塔遙遙相望，極具悠閒感。",
        map: "塔山" 
      }
    ]
  },
  { 
    day: "10", b: "打包", l: "四合院 (60)", d: "自理", 
    stay: "溫暖的家", 
    items: [
      { 
        t: "14:00", title: "珠海日月貝大劇院", 
        lens: "12-24mm / 16-35mm", core: "極簡幾何線條、海島歌劇院全景",
        note: "黑白構圖可強化建築結構感", 
        desc: "一大一小兩組貝殼組成。中國唯一建設在海島上的歌劇院，現代感十足。",
        map: "珠海" 
      }
    ]
  }
];

const prepList = [
  { category: "攝影器材", items: [
    { name: "廣角鏡頭 (16-35mm)", detail: "相公山全景、龍脊梯田大景必備" },
    { name: "標準/人像 (35mm/50mm)", detail: "灕江漁火、西街人文街拍最佳選擇" },
    { name: "中長焦 (70-200mm)", detail: "壓縮梯田線條、捕捉遠山晨霧特寫" },
    { name: "配件", detail: "三腳架、ND減光鏡、包圍曝光用遙控器" }
  ]},
  { category: "機能裝備", items: [
    { name: "防水外套", detail: "6月梅雨季防雨、山區防風" },
    { name: "防滑鞋", detail: "龍脊步道、江岸泥濘處需抓地力" }
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
                    <p className="text-[#059669] text-[10px] font-black mb-3 uppercase tracking-widest border-b border-[#10B981]/20 pb-1">攝影指南</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/50 p-3 rounded-2xl border border-[#10B981]/10">
                        <p className="text-[10px] font-bold text-[#10B981] mb-1">🔍 建議焦段</p>
                        <p className="text-xs font-black text-[#064E3B]">{it.lens}</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-2xl border border-[#10B981]/10">
                        <p className="text-[10px] font-bold text-[#10B981] mb-1">📸 核心事項</p>
                        <p className="text-xs font-black text-[#064E3B]">{it.core}</p>
                      </div>
                    </div>

                    <p className="text-[#059669] text-[10px] font-bold mb-2 uppercase tracking-widest">地點詳解</p>
                    <p className="text-[#064E3B] text-sm leading-relaxed mb-4 whitespace-pre-line">{it.desc}</p>
                    
                    <div className="pt-4 border-t border-[#10B981]/10">
                      <p className="text-[#10B981] text-[11px] font-bold mb-1">💡 拍攝備註</p>
                      <p className="text-[#059669] text-[11px] italic leading-snug">{it.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-white/60 p-6 rounded-[2.5rem] border-2 border-dashed border-[#10B981]/40 flex items-center space-x-4">
              <div className="bg-[#10B981] text-white p-3 rounded-2xl text-xl shadow-sm">🏨</div>
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