import { useState } from 'react';

// --- 1. 組件：美食導覽卡片 ---
const FoodCard = ({ n, t, a }: { n: string; t: string; a: string }) => (
  <div className="bg-white p-5 rounded-[2rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <h3 className="text-lg font-black text-[#3D3A36] mb-1">{n}</h3>
    <p className="text-xs font-bold text-[#8C8579] mb-3">📍 {a}</p>
    <div className="flex space-x-2">
      <a href={`tel:${t}`} className="flex-1 bg-[#E9F0EA] text-[#4A6741] py-3 rounded-xl font-black text-center text-xs">📞 撥打</a>
      <a 
        href={`http://googleusercontent.com/maps.google.com/4{window.encodeURIComponent(a)}`} 
        target="_blank" 
        rel="noreferrer" 
        className="flex-1 bg-[#4A6741] text-white py-3 rounded-xl font-black text-center text-xs"
      >
        🗺️ 導航
      </a>
    </div>
  </div>
);

// --- 2. 資料庫：精準對齊 4 日行程 (28 個項目) ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "06:00", title: "松山機場 (第二航廈)", note: "立榮航空櫃檯集合", map: "松山機場第二航廈" },
    { t: "07:00", title: "台北-金門 (B7-8801) ✈️", note: "07:00 起飛 / 08:05 抵達", map: "金門尚義機場" },
    { t: "09:30", title: "水頭聚落 (金水國小、得月樓)", note: "傳統洋樓美學攝影", map: "金門得月樓" },
    { t: "11:30", title: "珠山、歐厝聚落", note: "燕尾脊建築與古厝攝影", map: "珠山聚落" },
    { t: "14:00", title: "建功嶼 (退潮限定)", note: "摩西分海、石像與沙紋紀錄", map: "建功嶼" },
    { t: "15:30", title: "湖下海堤沙紋 (退潮)", note: "拍攝特殊海防地景沙紋", map: "湖下海堤" },
    { t: "18:00", title: "慈堤黃昏夕照 🌅", note: "捕捉金門最美日落點", map: "金門慈堤" },
    { t: "20:00", title: "後浦老街夜拍 🌙", note: "紀錄人文煙火氣與老街夜景", map: "金城老街" }
  ]},
  { day: "28", b: "民宿", l: "海口城餐廳", d: "小明的店餐廳", items: [
    { t: "09:00", title: "瓊林聚落巡禮", note: "紅磚巷弄與人文圖騰攝影", map: "金門瓊林聚落" },
    { t: "11:00", title: "金城迎城隍盛典 🥁", note: "捕捉核心祭典張力與陣頭", map: "金城鎮" },
    { t: "15:00", title: "南、北山聚落", note: "古厝建築巡禮與生活肖像紀錄", map: "北山古洋樓" },
    { t: "17:00", title: "嚨口沙灘軌條砦 (退潮)", note: "戰地地景夕陽攝影", map: "嚨口沙灘" },
    { t: "18:30", title: "小金門探訪 (烈嶼)", note: "北街黑糖剉冰、懷舊老街人文", map: "烈嶼鄉" },
    { t: "19:30", title: "雙口海邊", note: "眺望對岸廈門夜景與海濱風景", map: "雙口海濱公園" },
    { t: "20:30", title: "金門大橋夜拍 🌉", note: "壯麗大橋光影與夜色攝影", map: "金門大橋" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地餐廳", items: [
    { t: "06:00", title: "青年農莊栗喉蜂虎 🐦", note: "生態攝影 (長焦 300-400mm)", map: "金門青年農莊" },
    { t: "09:00", title: "山后民俗文化村", note: "十八間大厝對稱建築美學", map: "山后民俗文化村" },
    { t: "11:00", title: "陽翟老街巡禮", note: "《軍中樂園》場景與懷舊人文", map: "陽翟老街" },
    { t: "14:00", title: "碧山聚落", note: "彩繪聚落與精緻洋樓建築", map: "碧山聚落" },
    { t: "15:30", title: "沙美老街 (老理髮店)", note: "紀錄老店人文與生活肌理", map: "沙美老街" },
    { t: "17:30", title: "山外市區採購", note: "市區人文巡禮與伴手禮買買", map: "山外車站" },
    { t: "19:30", title: "瓊林聚落夜拍 🕯️", note: "低光影下古厝建築的層次感", map: "瓊林聚落" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "浯倆餐廚", items: [
    { t: "09:00", title: "太湖晨曦紀錄", note: "晨間湖光色影與自然紀錄", map: "金門太湖" },
    { t: "10:30", title: "榕園生態巡禮", note: "自然紀錄與榕樹群攝影", map: "金門榕園" },
    { t: "11:30", title: "漁村小艇坑道 ⚓", note: "E-092 對稱坑道攝影", map: "漁村小艇坑道" },
    { t: "13:30", title: "陳景蘭洋樓 / 成功海邊", note: "精緻洋樓建築美學紀錄", map: "陳景蘭洋樓" },
    { t: "15:30", title: "明遺老街巡禮", note: "金門最古老街道歷史感紀錄", map: "明遺老街" },
    { t: "17:00", title: "舊城門巡禮", note: "最後的人文巡禮紀錄", map: "金門舊城門" },
    { t: "18:30", title: "尚義機場 (加油還車)", note: "準備歸途", map: "金門尚義機場" },
    { t: "20:15", title: "金門-台北 (B7-8836)", note: "平安歸台 (21:15 抵達)", map: "松山機場" }
  ]}
];

// --- 3. 裝備清單：100% 完整補完 ---
const prepItems = [
  { id: 101, t: "身分證正本 (登機用)", c: "證件" },
  { id: 102, t: "駕照正本 (4人份租車用)", c: "證件" },
  { id: 201, t: "相機機身 + 廣角鏡 (拍建築)", c: "攝影" },
  { id: 202, t: "300-400mm 長焦 (拍蜂虎)", c: "攝影" },
  { id: 203, t: "三腳架 (務必托運，要裝袋)", c: "攝影" },
  { id: 204, t: "記憶卡 (多張)、電池、充電器", c: "攝影" },
  { id: 205, t: "快門線、偏光鏡/減光鏡", c: "攝影" },
  { id: 301, t: "自備盥洗用品 (民宿不供一次性)", c: "生活" },
  { id: 302, t: "保溫瓶、太陽眼鏡、防曬油", c: "生活" },
  { id: 303, t: "折傘、輕便雨衣", c: "生活" },
  { id: 304, t: "個人常用藥品 (止痛、過敏等)", c: "生活" },
  { id: 305, t: "行動電源 (必須隨身攜帶)", c: "生活" }
];

// --- 4. 美食資料庫：完整 21 家 ---
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
  { n: "好口味海鮮館", t: "082-331196", a: "金湖鎮市港路28號" },
  { n: "鮮采美食", t: "082-335252", a: "金湖鎮國順街35號" },
  { n: "六喜小館", t: "082-323323", a: "金城鎮賢庵里賢聚52之2號" },
  { n: "聯泰餐館", t: "082-329279", a: "金寧鄉湖南村14號" },
  { n: "金門牛家莊", t: "082-320099", a: "金城鎮民族路318巷5號" },
  { n: "海鱻城", t: "082-326679", a: "金寧鄉昔果山68號" },
  { n: "阿芬海產店", t: "082-331139", a: "金湖鎮復國墩25號" },
  { n: "浯倆餐廚", t: "082-328885", a: "金城鎮光前路103號" }
];

export default function App() {
  const [tab, setTab] = useState('行程');
  const [day, setDay] = useState('27');
  const [expenses, setExpenses] = useState<{id:number, i:string, a:number}[]>([]);
  const [inI, setInI] = useState('');
  const [inA, setInA] = useState('');
  const [checked, setChecked] = useState<number[]>([]);
  
  const curr = scheduleData.find(d => d.day === day) || scheduleData[0];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-36 font-sans text-[#3D3A36] text-left">
      <header className="p-8 pt-12 flex justify-between items-end">
        <div><p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p><h1 className="text-3xl font-black">金門迎城隍</h1></div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#8C8579] uppercase block">預算累計</span>
          <span className="text-2xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span>
        </div>
      </header>

      <main className="px-6 text-left">
        {tab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 transition-all ${day===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}><span className="text-xl font-black">{d}</span></button>
              ))}
            </div>
            
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-around text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>午</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-white/20 px-2"><b>晚</b><br/>{curr.d}</div>
            </div>

            {curr.items.map((it, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#4A6741] font-bold text-xs">🕒 {it.t}</p>
                  <a href={`http://googleusercontent.com/maps.google.com/4{window.encodeURIComponent(it.map)}`} target="_blank" rel="noreferrer" className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-xs font-black">🗺️ 導航</a>
                </div>
                <h2 className="text-xl font-black leading-tight mb-2 text-left">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic text-left">💡 {it.note}</div>
              </div>
            ))}

            {day !== "30" && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]">
                <p className="text-[10px] font-black text-[#8C8579] uppercase text-center mb-4 tracking-widest text-center">住宿飯店</p>
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4A6741] shadow-sm text-left">
                  <h3 className="text-lg font-black mb-1">🏠 老閩宅 3 館</h3>
                  <a href={`http://googleusercontent.com/maps.google.com/4{window.encodeURIComponent("金門縣金湖鎮瓊林150號")}`} target="_blank" rel="noreferrer" className="text-xs italic text-[#4A6741] mb-1 underline block">📍 金門縣金湖鎮瓊林150號</a>
                  <p className="text-xs font-bold text-[#8C8579]">📞 0933-699582</p>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === '美食' && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#8C8579] uppercase mb-4 tracking-widest text-left">在地 21 家推薦名單</p>
            {foodData.map((f, i)=>(<FoodCard key={i} n={f.n} t={f.t} a={f.a} />))}
          </div>
        )}

        {tab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3">托運重要規定</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：禁止托運，必須隨身</li>
                <li>📸 三腳架：長度過長，必須托運並裝袋</li>
                <li>✈️ 托運限重：立榮每人 10 公斤</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden text-left">
              {prepItems.map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0 active:bg-gray-50">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <div><p className={`font-black ${checked.includes(i.id)?'line-through opacity-30 text-[#8C8579]':''}`}>{i.t}</p><span className="text-[8px] font-bold text-[#8C8579] uppercase">{i.c}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === '帳單' && (
          <div className="space-y-4 text-left">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <div className="flex space-x-2">
                <input type="text" placeholder="項目" value={inI} onChange={(e)=>setInI(e.target.value)} className="flex-1 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <input type="number" placeholder="$" value={inA} onChange={(e)=>setInA(e.target.value)} className="w-24 p-4 rounded-2xl bg-[#F8F5F0] font-bold text-sm outline-none" />
                <button onClick={()=>{
                  if(inI && inA){ setExpenses([{id:Date.now(), i:inI, a:Number(inA)}, ...expenses]); setInI(''); setInA(''); }
                }} className="p-4 bg-[#4A6741] text-white rounded-2xl font-black">＋</button>
              </div>
            </div>
            {expenses.map(e=>(
              <div key={e.id} className="bg-white p-4 px-6 rounded-2xl border-2 border-[#E5E0D8] flex justify-between items-center shadow-sm">
                <span className="font-black">{e.i}</span><span className="font-black text-[#4A6741]">${e.a}</span>
              </div>
            ))}
          </div>
        )}

        {tab === '航班' && (
          <div className="space-y-4 text-left">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">去程 05/27</span>
              <p className="text-xl font-black text-[#3D3A36]">立榮 B7-8801</p>
              <p className="text-sm font-bold text-[#8C8579] mb-4">07:00 起飛 / 08:05 抵達</p>
              <p className="text-[10px] font-bold text-[#4A6741] bg-[#E9F0EA] p-3 rounded-xl">📢 06:00 松山機場 (第二航廈) 集合</p>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm">
              <span className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">回程 05/30</span>
              <p className="text-xl font-black text-[#3D3A36]">立榮 B7-8836</p>
              <p className="text-sm font-bold text-[#8C8579] mb-4">20:15 起飛 / 21:15 抵達</p>
              <p className="text-[10px] font-bold text-[#4A6741] bg-[#E9F0EA] p-3 rounded-xl">📢 18:30 尚義機場 (加油還車)</p>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
        {[{id:'行程', i:'🗺️'}, {id:'航班', i:'🎫'}, {id:'美食', i:'😋'}, {id:'準備', i:'🎒'}, {id:'帳單', i:'💰'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex flex-col items-center p-2 px-3 rounded-2xl transition-all ${tab===t.id?'bg-[#4A6741] text-white shadow-md':'text-[#8C8579]'}`}>
            <span className="text-lg">{t.i}</span><span className="text-[8px] font-black">{t.id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}