import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faPlaneArrival, faTicket } from '@fortawesome/free-solid-svg-icons';

export default function FlightCard({ type, airline, flightNo, date, time, from, to }: any) {
  return (
    <div className="bg-white rounded-[2rem] border-2 border-paper-dark shadow-soft overflow-hidden mb-6">
      <div className={`py-2 px-6 flex justify-between items-center ${type === '去程' ? 'bg-leaf' : 'bg-earth'} text-white`}>
        <span className="text-xs font-black tracking-widest uppercase">{type} FLIGHT</span>
        <FontAwesomeIcon icon={faTicket} className="text-sm opacity-50" />
      </div>
      <div className="p-6 text-earth-dark">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h4 className="text-earth-light text-[10px] font-bold uppercase tracking-tighter">Airline</h4>
            <p className="text-lg font-black leading-none">{airline}</p>
          </div>
          <div className="text-right">
            <h4 className="text-earth-light text-[10px] font-bold uppercase tracking-tighter">Flight No.</h4>
            <p className="text-lg font-black text-leaf leading-none">{flightNo}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-3xl font-black">{from}</p>
            <p className="text-[10px] font-bold text-earth-light uppercase tracking-tighter">Departure</p>
          </div>
          <div className="flex-1 px-4 flex flex-col items-center">
            <div className="w-full border-t-2 border-dashed border-paper-dark relative">
              <FontAwesomeIcon icon={type === '去程' ? faPlaneDeparture : faPlaneArrival} className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-earth-light text-sm" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black">{to}</p>
            <p className="text-[10px] font-bold text-earth-light uppercase tracking-tighter">Arrival</p>
          </div>
        </div>
        <div className="bg-paper/50 rounded-2xl p-4 flex justify-between items-center border border-paper-dark/30">
          <div>
            <span className="text-[10px] font-bold text-earth-light block uppercase">Date</span>
            <span className="font-black">{date}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-earth-light block uppercase">Time</span>
            <span className="font-black">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}