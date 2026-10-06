import { useState, useEffect } from 'react';
import { X, Gift, FileText, Video, Users, CheckCircle, Phone, Mail, User } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface PensionOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PensionOfferPopup({ isOpen, onClose }: PensionOfferPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error('Service not available');
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: 'פופאפ מסלקה פנסיונית'
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'שגיאה בשליחה');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitError('אירעה שגיאה בשליחה. נסה שוב או התקשר אלינו.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after animation
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '' });
      setIsSubmitted(false);
      setSubmitError(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div data-ev-id="ev_048818fefe" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div data-ev-id="ev_4e30965cac"
      className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
      onClick={handleClose} />

      
      {/* Modal */}
      <div data-ev-id="ev_403c96c275" className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button data-ev-id="ev_058126a6e6"
        onClick={handleClose}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors z-10">

          <X className="w-5 h-5 text-slate" />
        </button>
        
        {/* Header with gradient */}
        <div data-ev-id="ev_5491296bac" className="bg-gradient-to-br from-navy via-navy-light to-navy p-8 pt-12 rounded-t-3xl text-center">
          <div data-ev-id="ev_1cf7a7562a" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-4">
            <Gift className="w-8 h-8 text-gold" />
          </div>
          <h2 data-ev-id="ev_5036555f7d" className="text-2xl sm:text-3xl font-bold text-white mb-2">
            מגיע לך הטבה מאיתנו!
          </h2>
          <p data-ev-id="ev_3d6804d2c6" className="text-gold text-lg font-medium">
            הוצאת מסלקה פנסיונית ללא עלות
          </p>
        </div>
        
        {/* Content */}
        <div data-ev-id="ev_fa46fe0dde" className="p-6 sm:p-8">
          {!isSubmitted ?
          <>
              {/* Benefits */}
              <div data-ev-id="ev_b54ea1953d" className="mb-6 space-y-3">
                <div data-ev-id="ev_c792c31585" className="flex items-start gap-3">
                  <div data-ev-id="ev_7291b75559" className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-gold" />
                  </div>
                  <div data-ev-id="ev_ea2cea0d2b">
                    <h4 data-ev-id="ev_4549dcd096" className="font-semibold text-navy">דוח מפורט על הנכסים שלך</h4>
                    <p data-ev-id="ev_57a53ec5b8" className="text-sm text-slate">מיפוי מלא של כל החסכונות הפנסיוניים</p>
                  </div>
                </div>
                
                <div data-ev-id="ev_6cb294dac2" className="flex items-start gap-3">
                  <div data-ev-id="ev_b3384ccac9" className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-4 h-4 text-gold" />
                  </div>
                  <div data-ev-id="ev_3ae0b725af">
                    <h4 data-ev-id="ev_ae3b8e2530" className="font-semibold text-navy">פגישת ייעוץ בזום</h4>
                    <p data-ev-id="ev_5afd1f5a69" className="text-sm text-slate">נדון בדוח ונבנה תוכנית מותאמת אישית</p>
                  </div>
                </div>
                
                <div data-ev-id="ev_c31cc3c7d6" className="flex items-start gap-3">
                  <div data-ev-id="ev_e7d77f761f" className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-gold" />
                  </div>
                  <div data-ev-id="ev_a42959c29e">
                    <h4 data-ev-id="ev_ae84031926" className="font-semibold text-navy">או פגישה פרונטלית</h4>
                    <p data-ev-id="ev_85f264052b" className="text-sm text-slate">במשרדינו או אצלך - מה שנוח לך</p>
                  </div>
                </div>
              </div>
              
              {/* Form */}
              <form data-ev-id="ev_bbce5de328" onSubmit={handleSubmit} className="space-y-4">
                <div data-ev-id="ev_13f3d36726">
                  <label data-ev-id="ev_5fdc4a3e6f" className="block text-sm font-medium text-navy mb-1">שם מלא</label>
                  <div data-ev-id="ev_b962ebdb83" className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                    <input data-ev-id="ev_e4ecae9d38"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  placeholder="הכנס את שמך" />

                  </div>
                </div>
                
                <div data-ev-id="ev_fe27dfff10">
                  <label data-ev-id="ev_51ef41afd5" className="block text-sm font-medium text-navy mb-1">טלפון</label>
                  <div data-ev-id="ev_05dff50d63" className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                    <input data-ev-id="ev_c612d11995"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  placeholder="050-000-0000"
                  dir="ltr" />

                  </div>
                </div>
                
                <div data-ev-id="ev_6dd02e9a2e">
                  <label data-ev-id="ev_0d5cdb5545" className="block text-sm font-medium text-navy mb-1">אימייל</label>
                  <div data-ev-id="ev_c13e62a46b" className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                    <input data-ev-id="ev_fbfebe74e3"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  placeholder="your@email.com"
                  dir="ltr" />

                  </div>
                </div>
                
                <button data-ev-id="ev_9003472f08"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70">

                  {isSubmitting ?
                <>
                      <div data-ev-id="ev_2ba49a7864" className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                      שולח...
                    </> :

                <>
                      <Gift className="w-5 h-5" />
                      קבל את ההטבה עכשיו
                    </>
                }
                </button>
              </form>
              
              {submitError &&
            <p data-ev-id="ev_5001d03830" className="text-red-600 text-sm text-center mt-3 bg-red-50 p-2 rounded-lg">
                  {submitError}
                </p>
            }
              
              <p data-ev-id="ev_f43900880e" className="text-xs text-slate text-center mt-4">
                וולת'טק סוכנות לביטוח | לומדים את התיק הפנסיוני שלך
              </p>
            </> : (

          /* Success State */
          <div data-ev-id="ev_421fbde4e7" className="text-center py-8">
              <div data-ev-id="ev_8d251a8e4b" className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 data-ev-id="ev_32c5ce7517" className="text-2xl font-bold text-navy mb-2">תודה רבה!</h3>
              <p data-ev-id="ev_47d0204322" className="text-slate mb-4">
                קיבלנו את הפרטים שלך.<br data-ev-id="ev_3b6690d5c1" />
                נציג מטעמנו יצור איתך קשר בהקדם לתיאום פגישה.
              </p>
              <button data-ev-id="ev_a258bb0949"
            onClick={handleClose}
            className="text-gold hover:text-gold-dark font-medium">

                סגור חלון
              </button>
            </div>)
          }
        </div>
      </div>
    </div>);

}