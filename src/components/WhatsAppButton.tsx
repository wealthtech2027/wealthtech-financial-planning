import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '972508210573'; // 050-8210573 in international format
  const message = 'שלום, אשמח לקבל פרטים נוספים על השירותים שלכם';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a data-ev-id="ev_2e3ea5241d"
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
    aria-label="צור קשר בוואטסאפ">

      <MessageCircle className="w-7 h-7 fill-white" />
      
      {/* Tooltip */}
      <span data-ev-id="ev_1cfb75e5e6" className="absolute right-16 bg-navy text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        דברו איתנו בוואטסאפ
      </span>
    </a>);

}