import { useState } from 'react';

// --- 1. 組件：美食卡片 (修正了 ${} 的語法錯誤) ---
const FoodCard = ({ n, t, a }: { n: string; t: string; a: string }) => (
  <div className="bg-white p-5 rounded-[2rem] border-2 border-[#E5E0D8] shadow-sm mb-4 text-left">
    <h3 className="text-lg font-black text-[#3D3A36] mb-1">{n}</h3>
    <p className="text-xs font-bold text-[#8C8579] mb-3">📍 {a}</p>
    <div className="flex space-x-2">
      <a href={`tel:${t}`} className="flex-1 bg-[#E9F0EA] text-[#4A6741] py-3 rounded-xl font-black text-center text-xs">📞 撥打</a>
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(a)}`} 
        target="_blank" 
        rel="noreferrer" 
        className="flex-1 bg-[#4A6741] text-white py-3 rounded-xl font-black text-center text-xs"
      >
        🗺️ 導航
      </a>
    </div>
  </div>
);

// --- 2. 資料庫：對齊 4 日行程 ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "07:00", title: "台北-金門 (B7-8801) ✈️", r: "06:00 松山機場集合", m: "松山機場第二航廈" },
    { t: "09:30", title: "水頭聚落 (得月樓)", r: "人文建築美學拍攝", m: "金門得月樓" },
    { t: "14:00", title: "建功嶼 / 湖下沙紋", r: "退潮限定沙紋攝影 🌊", m: "建功嶼" },
    { t: "18:00", title: "慈堤黃昏夕照", r: "金門日落大景拍攝 🌅", m: "金門慈堤" },
    { t: "20:00", title: "後浦老街夜拍", r: "金城鎮人文煙火氣紀錄", m: "金城老街" }
  ]},
  { day: "28", b: "民宿", l: "海口城餐廳", d: "小明的店", items: [
    { t: "11:00", title: "金城迎城隍盛典 🥁", r: "捕捉年度祭典張力", m: "金城鎮" },
    { t: "15:00", title: "南、北山聚落", r: "古厝巡禮與生活紀錄", m: "北山古洋樓" },
    { t: "17:00", title: "嚨口沙灘軌條砦", r: "戰地夕陽攝影 🛡️", m: "嚨口沙灘" },
    { t: "20:30", title: "金門大橋夜拍", r: "橋樑壯麗光影夜色", m: "金門大橋" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地餐廳", items: [
    { t: "06:00", title: "青年農莊栗喉蜂虎 🐦", r: "生態攝影 (300-400mm)", m: "金門青年農莊" },
    { t: "11:00", title: "陽翟老街 / 山后", r: "傳統建築與懷舊場景", m: "陽翟老街" },
    { t: "15:30", title: "沙美老街 (老店)", r: "沙美人文肌理紀錄", m: "沙美老街" },
    { t: "19:30", title: "瓊林聚落夜拍", r: "古厝夜間光影層次", m: "瓊林聚落" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "浯倆餐廚", items: [
    { t: "11:30", title: "漁村小艇坑道 ⚓", r: "E-092 對稱坑道攝影", m: "漁村小艇坑道" },
    { t: "13:30", title: "陳景蘭洋樓", r: "成功海邊精緻洋樓美學", m: "陳景蘭洋樓" },
    { t: "15:00", title: "收拾行李與退房", r: "準備平安歸途", m: "老閩宅3館" },
    { t: "18:30", title: "尚義機場 (加油還車)", r: "20:15 起飛回台北 ✈️", m: "金門尚義機場" }
  ]}
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
        <div>
          <p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p>
          <h1 className="text-3xl font-black">金門迎城隍</h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#8C8579] uppercase block">總支出</span>
          <span className="text-2xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span>
        </div>
      </header>

      <main className="px-6">
        {tab === '行程' && (
          <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {['27','28','29','30'].map(d=>(
                <button key={d} onClick={()=>setDay(d)} className={`flex-1 min-w-[60px] py-4 rounded-2xl border-2 ${day===d?'bg-white border-[#4A6741] shadow-sm':'opacity-40 border-[#E5E0D8]'}`}><span className="text-xl font-black">{d}</span></button>
              ))}
            </div>
            
            <div className="bg-[#4A6741] p-4 rounded-3xl text-white flex justify-around text-center shadow-lg text-[10px]">
              <div className="flex-1"><b>早</b><br/>{curr.b}</div>
              <div className="flex-1 border-l border-white/20"><b>午</b><br/>{curr.l}</div>
              <div className="flex-1 border-l border-white/20"><b>晚</b><br/>{curr.d}</div>
            </div>

            {curr.items.map((it, i)=>(
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#4A6741] font-bold text-xs">🕒 {it.t}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(it.m)}`} target="_blank" rel="noreferrer" className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-xs font-black">🗺️ 導航</a>
                </div>
                <h2 className="text-xl font-black leading-tight mb-2 text-left">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic text-left">💡 {it.r}</div>
              </div>
            ))}

            {/* 30 號不顯示民宿卡片 */}
            {day !== "30" && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]">
                <p className="text-[10px] font-black text-[#8C8579] uppercase text-center mb-4 tracking-widest">住宿飯店</p>
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4A6741] shadow-sm text-left">
                  <h3 className="text-lg font-black mb-1">🏠 老閩宅 3 館</h3>
                  <a href={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent("金門縣金湖鎮瓊林150號")}`} target="_blank" rel="noreferrer" className="text-xs italic text-[#4A6741] mb-1 underline block">📍 金門縣金湖鎮瓊林150號</a>
                  <p className="text-xs font-bold text-[#8C8579]">📞 0933-699582</p>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === '美食' && (
          <div className="space-y-4">
            <FoodCard n="金道地蚵仔煎" t="082-327969" a="金城鎮前水頭15號" />
            <FoodCard n="東門餐廳" t="082-371850" a="金城鎮東門北提路" />
            <FoodCard n="談天樓" t="082-332766" a="金湖鎮復興路3號" />
            <FoodCard n="佑昇鍋貼" t="082-332229" a="成功村171號" />
          </div>
        )}

        {tab === '準備' && (
          <div className="space-y-6 text-left">
            <div className="bg-[#4A6741] p-6 rounded-[2.5rem] text-white">
              <p className="text-[10px] font-bold opacity-70 uppercase mb-3">托運規定</p>
              <ul className="text-xs font-bold space-y-2">
                <li>🔋 電池/行動電源：必須隨身攜帶</li>
                <li>📸 三腳架：一定要托運 (須裝袋)</li>
                <li>✈️ 托運限重：10 公斤 / 人</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm overflow-hidden">
              {[
                {id:1, t:"身份證正本 / 駕照 (4人)"},
                {id:2, t:"300-400mm 鏡頭 (拍蜂虎)"},
                {id:3, t:"快門線 / 濾鏡 / 三腳架"},
                {id:4, t:"自備盥洗用品 (民宿不供)"}
              ].map(i=>(
                <div key={i.id} onClick={()=>setChecked(p=>p.includes(i.id)?p.filter(x=>x!==i.id):[...p,i.id])} className="flex items-center p-6 border-b-2 border-[#F8F5F0] last:border-0">
                  <span className="text-2xl mr-4">{checked.includes(i.id)?'✅':'⬜'}</span>
                  <p className={`font-black ${checked.includes(i.id)?'line-through opacity-30':''}`}>{i.t}</p>
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
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E5E0D8] p-2 flex justify-around items-center shadow-lg z-50">
        {[{id:'行程', i:'🗺️'}, {id:'美食', i:'😋'}, {id:'準備', i:'🎒'}, {id:'帳單', i:'💰'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex flex-col items-center p-2 px-3 rounded-2xl transition-all ${tab===t.id?'bg-[#4A6741] text-white shadow-md':'text-[#8C8579]'}`}>
            <span className="text-lg">{t.i}</span><span className="text-[8px] font-black">{t.id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}