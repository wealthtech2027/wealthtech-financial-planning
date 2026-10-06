import { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import workshopFamilyFinanceImage from '@/assets/uploads/workshop-family-finance.jpg';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface WorkshopPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkshopPopup({ isOpen, onClose }: WorkshopPopupProps) {
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
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: 'פופאפ סדנת תכנון פיננסי למשפחה'
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
    <div data-ev-id="ev_2c6d725a1a" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div data-ev-id="ev_d470064c94"
      className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
      onClick={handleClose} />

      
      {/* Modal */}
      <div data-ev-id="ev_7fae86db08" className="relative bg-gradient-to-br from-navy to-navy-light rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button data-ev-id="ev_0eb491530b"
        onClick={handleClose}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">

          <X className="w-5 h-5 text-white" />
        </button>
        
        <div data-ev-id="ev_a0b546b0c2" className="grid md:grid-cols-2 gap-0">
          {/* Flyer Image */}
          <div data-ev-id="ev_99e17ca49f" className="relative">
            <img data-ev-id="ev_d02806b380"
            src={workshopFamilyFinanceImage}
            alt="סדנת תכנון פיננסי למשפחה - וולת'טק"
            className="w-full h-full object-cover rounded-r-3xl md:rounded-l-none rounded-t-3xl md:rounded-t-none" />

          </div>
          
          {/* Form Section */}
          <div data-ev-id="ev_fa61b1f09a" className="p-8 flex flex-col justify-center">
            {isSubmitted ?
            <div data-ev-id="ev_ac3d838257" className="text-center py-8">
                <div data-ev-id="ev_695ead145c" className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 data-ev-id="ev_1fe8419a31" className="text-2xl font-bold text-white mb-3">תודה על ההרשמה!</h3>
                <p data-ev-id="ev_b6b9df4c16" className="text-white/80 text-lg mb-6">
                  קיבלנו את הפרטים שלך ונחזור אליך בהקדם עם כל המידע על הסדנה.
                </p>
                <button data-ev-id="ev_d1fe3b06f6"
              onClick={handleClose}
              className="bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3 rounded-xl transition-colors">

                  סגור
                </button>
              </div> :

            <>
                <div data-ev-id="ev_2c736f8c5e" className="mb-6">
                  <span data-ev-id="ev_8a6c06792d" className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                    🎯 סדנה חדשה!
                  </span>
                  <h3 data-ev-id="ev_66c27f8194" className="text-2xl md:text-3xl font-bold text-white mb-3">
                    מעוניינים להשתתף בסדנה?
                  </h3>
                  <p data-ev-id="ev_28778cea58" className="text-white/70">
                    השאירו פרטים ונחזור אליכם עם כל המידע
                  </p>
                </div>
                
                <form data-ev-id="ev_a79e96d004" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input data-ev-id="ev_e909329861"
                type="text"
                placeholder="שם מלא"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />

                  <input data-ev-id="ev_a15bc075d6"
                type="tel"
                placeholder="טלפון"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />

                  <input data-ev-id="ev_ac665765c8"
                type="email"
                placeholder="אימייל"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />

                  
                  {submitError &&
                <p data-ev-id="ev_fd7400777d" className="text-red-400 text-sm text-center">{submitError}</p>
                }
                  
                  <button data-ev-id="ev_6174a0e5f6"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2">

                    {isSubmitting ?
                  <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        שולח...
                      </> :

                  'שלחו לי פרטים'
                  }
                  </button>
                </form>
                
                <p data-ev-id="ev_ff68c8ce85" className="text-white/50 text-xs text-center mt-4">
                  ללא התחייבות • נחזור אליכם תוך 24 שעות
                </p>
              </>
            }
          </div>
        </div>
      </div>
    </div>);

}