import { useState } from 'react';

// --- 1. 組件：美食卡片 ---
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

// --- 2. 資料庫：100% 精準對齊行程表 ---
const scheduleData = [
  { day: "27", b: "標記", l: "水頭金道地", d: "東門餐廳", items: [
    { t: "06:00", title: "松山機場 (第二航廈) 集合", r: "立榮航空櫃檯", map: "松山機場第二航廈" },
    { t: "07:00", title: "台北-金門 (B7-8801)", r: "07:00起飛 / 08:05抵達", map: "金門尚義機場" },
    { t: "09:30", title: "水頭聚落 (金水國小、得月樓)", r: "人文建築攝影", map: "金門得月樓" },
    { t: "11:30", title: "珠山、歐厝聚落", r: "傳統聚落巡禮", map: "珠山聚落" },
    { t: "14:00", title: "建功嶼 (退潮)", r: "退潮限定", map: "建功嶼" },
    { t: "15:30", title: "湖下海堤沙紋 (退潮)", r: "沙紋攝影", map: "湖下海堤" },
    { t: "18:00", title: "慈堤黃昏", r: "落日大景拍攝", map: "金門慈堤" },
    { t: "20:00", title: "後埔(金城)老街夜拍", r: "老街煙火氣紀錄", map: "金城老街" }
  ]},
  { day: "28", b: "民宿", l: "海口城餐廳", d: "小明的店餐廳", items: [
    { t: "09:00", title: "瓊林", r: "聚落巡禮", map: "金門瓊林聚落" },
    { t: "11:00", title: "金城迎城隍", r: "核心盛典捕捉", map: "金城鎮" },
    { t: "15:00", title: "南、北山聚落", r: "人文與古厝", map: "北山古洋樓" },
    { t: "17:00", title: "嚨口沙灘軌條砦 (退潮)", r: "戰地夕陽攝影", map: "嚨口沙灘" },
    { t: "18:30", title: "小金門 (剉冰、老街)", r: "烈嶼探訪", map: "烈嶼鄉" },
    { t: "19:30", title: "雙口海邊", r: "海濱風景", map: "雙口海濱公園" },
    { t: "20:30", title: "金門大橋夜拍", r: "大橋光影攝影", map: "金門大橋" }
  ]},
  { day: "29", b: "民宿", l: "談天樓", d: "新天地餐廳", items: [
    { t: "06:00", title: "青年農莊栗喉蜂虎", r: "生態攝影 (300-400mm)", map: "金門青年農莊" },
    { t: "09:00", title: "山后民俗村", r: "燕尾脊建築美學", map: "山后民俗文化村" },
    { t: "11:00", title: "陽翟", r: "老街攝影", map: "陽翟老街" },
    { t: "14:00", title: "碧山聚落", r: "洋樓建築紀錄", map: "碧山聚落" },
    { t: "15:30", title: "沙美老街 (老理髮店)", r: "人文生活肌理", map: "沙美老街" },
    { t: "17:30", title: "山外採購", r: "市區採買", map: "山外車站" },
    { t: "19:30", title: "瓊林夜拍", r: "聚落光影紀錄", map: "瓊林聚落" }
  ]},
  { day: "30", b: "民宿", l: "佑昇餐廳", d: "簡餐 (浯倆餐廚)", items: [
    { t: "09:00", title: "太湖", r: "晨間湖光", map: "金門太湖" },
    { t: "10:30", title: "榕園", r: "自然生態", map: "金門榕園" },
    { t: "11:30", title: "漁村小艇坑道", r: "對稱倒影攝影", map: "漁村小艇坑道" },
    { t: "13:30", title: "陳景蘭洋樓(成功海邊)", r: "洋樓巡禮", map: "陳景蘭洋樓" },
    { t: "15:00", title: "退房", r: "結束住宿", map: "金門縣金湖鎮瓊林150號" },
    { t: "15:30", title: "明遺老街", r: "老街巡禮", map: "明遺老街" },
    { t: "17:00", title: "舊城門", r: "歷史巡禮", map: "金門舊城門" },
    { t: "18:30", title: "尚義機場 (加油還車)", r: "機場集合", map: "金門尚義機場" },
    { t: "20:15", title: "金門-台北 (B7-8836)", r: "平安歸途", map: "松山機場" }
  ]}
];

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
  { n: "高坑牛肉", t: "082-352549", a: "金沙鎮高坑村38號" }
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
      <header className="p-8 pt-12 flex justify-between items-end">
        <div>
          <p className="text-[#4A6741] font-bold text-[10px] uppercase">May 2026</p>
          <h1 className="text-3xl font-black text-left text-[#3D3A36]">金門迎城隍</h1>
        </div>
        {tab === '帳單' && (
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#8C8579] uppercase">總支出</span>
            <span className="block text-2xl font-black text-[#4A6741]">NT${expenses.reduce((s,e)=>s+e.a,0)}</span>
          </div>
        )}
      </header>

      <main className="px-6">
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
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E5E0D8] shadow-sm mb-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#4A6741] font-bold text-sm">🕒 {it.t}</p>
                  <a href={"https://www.google.com/maps/search/?api=1&query=" + window.encodeURIComponent(it.map)} target="_blank" rel="noreferrer" className="bg-[#E9F0EA] text-[#4A6741] px-3 py-1 rounded-full text-xs font-black">🗺️ 導航</a>
                </div>
                <h2 className="text-xl font-black leading-tight mb-2 text-left">{it.title}</h2>
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-dashed border-[#8C8579]/30 text-sm italic text-left">💡 {it.r}</div>
              </div>
            ))}

            {/* 修正邏輯：只有非 30 號才顯示住宿資訊 */}
            {day !== "30" && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-[#E5E0D8]"></div>