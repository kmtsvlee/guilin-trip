import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faTicket, faWallet, faBookOpen, faListCheck } from '@fortawesome/free-solid-svg-icons';

export default function BottomNav({ onTabChange, currentTab }: { onTabChange: (t: string) => void, currentTab: string }) {
  const tabs = [
    { label: '行程', icon: faMapLocationDot },
    { label: '預訂', icon: faTicket },
    { label: '記帳', icon: faWallet },
    { label: '日誌', icon: faBookOpen },
    { label: '準備', icon: faListCheck },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-paper-dark rounded-t-[2.5rem] shadow-2xl z-50">
      <div className="flex justify-around items-center h-24 pb-4">
        {tabs.map((tab) => (
          <button 
            key={tab.label}
            onClick={() => onTabChange(tab.label)}
            className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === tab.label ? 'text-leaf' : 'text-earth-light opacity-50'}`}
          >
            <FontAwesomeIcon icon={tab.icon} className="text-xl mb-1" />
            <span className="text-[10px] font-black">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}