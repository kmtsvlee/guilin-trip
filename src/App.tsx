import { useState } from 'react';

// --- 1. 組件：美食卡片 [cite: 25-44] ---
const FoodCard = ({ n, t, a }: { n: string; t: string; a: string }) => (
  <div className="bg-white p-5 rounded-[2rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <h3 className="text-lg font-black text-[#3D3A36] mb-1">{n}</h3>
    <p className="text-xs font-bold text-[#8C8579] mb-3">📍 {a}</p>
    <div className="flex space-x-2">
      <a href={"tel:" + t} className="flex-1 bg-[#E9F0EA] text-[#4A6741] py-3 rounded-xl font-black text-center text-xs">📞 撥打</a>
      <a 
        href={"https://www.google.com/maps/search/?api=1&query=" + window.encodeURIComponent(a)} 
        target="_blank" 
        rel="noreferrer" 
        className="flex-1 bg-[#4A6741] text-white py-3 rounded-xl font-black text-center text-xs"
      >
        🗺️ 導航
      </a>
    </div>
  </div>
);

// --- 2. 組件：航班卡片 [cite: 2] ---
const FlightCard = ({ type, airline, flightNo, time, note }: { type: string, airline: string, flightNo: string, time: string, note: string }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">{type}</span>
    <div className="flex justify-between items-center text-center mb-2">
      <div className="text-left text-[#3D3A36]"><p className="text-xl font-black">{airline}</p></div>
      <div className="flex-1 border-t-2 border-dashed border-[#E5E0D8] mx-4 relative text-center"><span className="text-lg absolute -top-4 left-1/2 -translate-x-1/2">✈️</span></div>
      <div className="text-right text-[#3D3A36]"><p className="text-xl font-black">{flightNo}</p></div>
    </div>
    <p className="text-sm font-bold text-[#8C8579] mb-4 text-center">{time}</p>
    <p className="text-[10px] font-bold text-[#4A6741] bg-[#E9F0EA] p-3 rounded-xl">📢 {note}</p>
  </div>
);

// --- 3. 資料庫：100% 依照您的 docx 檔案建立 [cite: 2-15] ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "06:00", title: "松山機場 (第二航廈)", r: "立榮航空櫃檯集合" },
    { t: "07:00", title: "台北-金門 (B7-8801)", r: "07:00起飛 / 08:05抵達" },
    { t: "09:30", title: "水頭聚落", r: "金水國小、得月樓" },
    { t: "11:30", title: "珠山、歐厝聚落", r: "聚落建築攝影" },
    { t: "14:00", title: "建功嶼 (退潮)", r: "退潮限定" },
    { t: "15:30", title: "湖下海堤沙紋 (退潮)", r: "退潮限定" },
    { t: "18:00", title: "慈堤黃昏", r: "夕陽攝影" },
    { t: "20:00", title: "後埔(金城)老街夜拍", r: "人文夜間紀錄" }
  ]},
  { day: "28", b: "民宿", l: "海口城餐廳", d: "小明的店餐廳", items: [
    { t: "09:00", title: "瓊林", r: "聚落巡禮" },
    { t: "11:00", title: "金城迎城隍", r: "核心盛典" },
    { t: "15:00", title: "南、北山聚落", r: "人文與建築" },
    { t: "17:00", title: "嚨口沙灘軌條砦 (退潮)", r: "戰地夕陽攝影" },
    { t: "18:30", title: "小金門", r: "北街黑糖剉冰、老街" },
    { t: "19:30", title: "雙口海邊", r: "海濱夜色" },
    { t: "20:30", title: "金門大橋夜拍", r: "大橋光影" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地餐廳", items: [
    { t: "06:00", title: "青年農莊栗喉蜂虎", r: "生態攝影" },
    { t: "09:00", title: "山后民俗村", r: "對稱建築" },
    { t: "11:00", title: "陽翟", r: "老街懷舊" },
    { t: "14:00", title: "碧山聚落", r: "聚落巡禮" },
    { t: "15:30", title: "沙美老街 (老理髮店)", r: "人文紀錄" },
    { t: "17:30", title: "山外採購", r: "市區採買" },
    { t: "19:30", title: "瓊林夜拍", r: "聚落夜間光影" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "簡餐 (浯倆餐廚)", items: [
    { t: "09:00", title: "太湖", r: "自然湖光" },
    { t: "10:30", title: "榕園", r: "生態紀錄" },
    { t: "11:30", title: "漁村小艇坑道", r: "坑道攝影" },
    { t: "13:30", title: "陳景蘭洋樓 (成功海邊)", r: "洋樓建築" },
    { t: "15:00", title: "退房", r: "收拾行李" },
    { t: "15:30", title: "明遺老街", r: "老街巡禮" },
    { t: "17:00", title: "舊城門", r: "城門遺址" },
    { t: "18:30", title: "尚義機場", r: "加油還車" },
    { t: "20:15", title: "金門-台北 (B7-8836)", r: "20:15起飛 / 21:15抵達" }
  ]}
];

// --- 4. 美食資料庫：包含您提供的所有 20 家餐廳 [cite: 25-44] ---
const foodData = [
  { n: "金道地蚵仔煎", t: "082-327969", a: "金城鎮前水頭15號" },
  { n: "東門餐廳", t: "082-371850", a: "金城鎮東門北提路" },
  { n: "小明的店", t: "082-327441", a: "金寧鄉湖埔村慈湖路一段98號" },
  { n: "記德海鮮餐廳", t: "082-324461", a: "金城鎮慈湖路二段105號" },
  { n: "新天地海產店", t: "082-330656", a: "金湖鎮復國墩31號之1" },
  { n: "談天樓", t: "082-332766", a: "金湖鎮復興路3號" },
  { n: "海口城海鮮餐廳", t: "082-328022", a: "金寧鄉慈湖路三段18號巷8-8號" },
  { n: "良金牛肉麵", t: "082-335886", a: "金湖鎮漁村160號" },
  { n: "佑昇生億鍋貼", t: "082-332229", a: "金湖鎮成功村171號" },
  { n: "信源海產店", t: "082-327743", a: "金寧鄉湖下村60號" },
  { n: "金許園(酸菜白肉鍋)", t: "082-371626", a: "金城鎮官裏53號" },
  { n: "高坑牛肉", t: "082-352549", a: "金沙鎮高坑村38號" },
  { n: "海洋餐廳", t: "082-311867", a: "金寧鄉仁愛新村4-1號" },
  { n: "好口味海鮮館", t: "082-331196", a: "金湖鎮新湖里市港路28號" },
  { n: "鮮采美食", t: "082-335252", a: "金湖鎮國順街35號" },
  { n: "六喜小館", t: "082-323323", a: "金城鎮賢庵里賢聚52之2號" },
  { n: "聯泰餐館", t: "082-329279", a: "金寧鄉湖南村14號" },
  { n: "金門牛家莊", t: "082-320099", a: "金城鎮民族路318巷5號" },
  { n: "海鱻城", t: "082-326679", a: "金寧鄉昔果山68號" },
  { n: "阿芬海產店", t: "082-331139", a: "金湖鎮復國墩25號" }
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('27');
  const [checked, setChecked] = useState<number[]>([]);
  const [expenses, setExpenses] = useState<{id:number, i:string, a:number}[]>([]);
  const [inI, setInI] = useState('');
  const [inA, setInA] = useState('');
  
  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-36 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12">
        <p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p>
        <h1 className="text-3xl font-black text-left">金門迎城隍</h1>
      </header>

      <main className="px-6">
        {/* 行程分頁 */}
        {tab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}>
                  <span className="text-xl font-black">{d}</span>
                </button>
              ))}
            </div>
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-around text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>午</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>晚</b><br/>{curr.d}</div>
            </div>
            {curr.items.map((it, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <p className="text-[#4A6741] font-bold text-xs mb-1 text-left">🕒 {it.t}</p>
                <h2 className="text-xl font-black leading-tight mb-2 text-left">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic text-left">💡 {it.r}</div>
              </div>
            ))}
            
            {/* 第四天專屬備選景點 [cite: 15] */}
            {day === "30" && (
              <div className="bg-[#E9F0EA] p-6 rounded-3xl border-2 border-[#4A6741]/20 mt-4 text-xs font-bold text-left text-[#3D3A36]">
                備選景點：翟山坑道、船型堡、探訪軍事據點、沉睡的戰車(退潮)、農試所
              </div>
            )}

            {/* 住宿資訊 [cite: 2] */}
            {day !== "30" && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]">
                <p className="text-[10px] font-black text-[#8C8579] uppercase text-center mb-4 tracking-widest">住宿飯店</p>
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4A6741] shadow-sm text-left">
                  <h3 className="text-lg font-black mb-1">🏠 老閩宅 3 館</h3>
                  <a href="https://www.google.com/maps/search/?api=1&query=金門縣金湖鎮瓊林150號" target="_blank" rel="noreferrer" className="text-xs italic text-[#4A6741] mb-1 underline decoration-dashed block">📍 金門縣金湖鎮瓊林150號</a>
                  <p className="text-xs font-bold text-[#8C8579]">📞 0933-699582</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 航班分頁回來了！ [cite: 2, 16] */}
        {tab === '航班' && (
          <div className="space-y-4">
            <FlightCard type="去程 05.27 (三)" airline="立榮航空" flightNo="B7-8801" time="07:00 / 08:05" note="06:00 松山機場 (第二航廈) 立榮航空櫃檯集合" />
            <FlightCard type="回程 05.30 (六)" airline="立榮航空" flightNo="B7-8836" time="20:15 / 21:15" note="18:30 尚義機場 (加油還車)" />
          </div>
        )}

        {/* 美食分頁 */}
        {tab === '美食' && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#8C8579] uppercase mb-4 tracking-widest text-left">美食地圖 (全 20 家)</p>
            {foodData.map((f, i)=>(<FoodCard key={i} n={f.n} t={f.t} a={f.a} />))}
          </div>
        )}

        {/* 準備清單 [cite: 17-23] */}
        {tab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3">托運規定</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池：必須隨身攜帶</li>
                <li>📸 腳架：一定要托運 (用腳架袋裝好)</li>
                <li>✈️ 行李：每人可托運 10 公斤</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
              {[
                {id:1, t:"身份證正本、駕照4人", c:"重要"},
                {id:2, t:"相機、各焦段鏡頭(栗喉蜂虎300-400)", c:"攝影"},
                {id:3, t:"快門線、偏光/漸層鏡、閃光燈", c:"攝影"},
                {id:4, t:"記憶卡、電池、充電器、三腳架", c:"攝影"},
                {id:5, t:"環保筷、保溫瓶、拖鞋", c:"生活"},
                {id:6, t:"自備盥洗物品(民宿不提供一次性)", c:"生活"},
                {id:7, t:"太陽眼鏡、帽子、防曬油、折傘", c:"生活"},
                {id:8, t:"手電筒、望遠鏡、健保卡及常用藥品", c:"生活"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checked.includes(i.id)?'line-through opacity-30 text-[#8C8579]':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 帳單分頁回來了！ */}
        {tab === '帳單' && (
          <div className="space-y-4 text-left">
            <div className="text-right mb-6">
              <span className="text-[10px] font-bold text-[#8C8579] uppercase block">總計支出</span>
              <span className="text-4xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={inI} onChange={(e: any)=>setInI(e.target.value)} className="flex-1 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <input type="number" placeholder="$" value={inA} onChange={(e: any)=>setInA(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <button onClick={()=>{
                  if(inI && inA){ setExpenses([{id:Date.now(), i:inI, a:Number(inA)}, ...expenses]); setInI(''); setInA(''); }
                }} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            {expenses.map(e=>(
              <div key={e.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] flex justify-between items-center shadow-sm">
                <span className="font-black text-[#3D3A36] text-left">{e.i}</span><span className="font-black text-[#4A6741]">${e.a}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
        {[{id:'行程', i:'🗺️'}, {id:'美食', i:'😋'}, {id:'航班', i:'🎫'}, {id:'準備', i:'🎒'}, {id:'帳單', i:'💰'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex flex-col items-center p-2 px-3 rounded-2xl transition-all ${tab===t.id?'bg-[#4A6741] text-white shadow-md':'text-[#8C8579]'}`}>
            <span className="text-lg">{t.i}</span><span className="text-[8px] font-black">{t.id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}