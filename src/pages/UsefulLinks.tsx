import { useState } from 'react';
import { Link } from 'react-router';
import {
  ExternalLink,
  Building2,
  Landmark,
  Shield,
  Calculator,
  Menu,
  X,
  ChevronLeft,
  Search,
  Globe,
  FileText } from
'lucide-react';
import { Logo } from '@/components/Logo';

interface LinkItem {
  name: string;
  url: string;
  description: string;
  icon?: string;
}

interface LinkCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  links: LinkItem[];
}

export default function UsefulLinks() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories: LinkCategory[] = [
  {
    id: 'government',
    title: 'אתרים ממשלתיים ורשמיים',
    description: 'מידע רשמי, זכויות ושירותים ממשלתיים',
    icon: Landmark,
    color: 'from-blue-500 to-blue-600',
    links: [
    {
      name: 'המסלקה הפנסיונית',
      url: 'https://www.swiftness.co.il/',
      description: 'צפייה בכל החסכונות הפנסיוניים שלך במקום אחד'
    },
    {
      name: 'הר הביטוח',
      url: 'https://harb.cma.gov.il/',
      description: 'איתור פוליסות ביטוח, פנסיה וקופות גמל'
    },
    {
      name: 'רשות המיסים',
      url: 'https://www.gov.il/he/departments/israel_tax_authority',
      description: 'מידע על מס, טפסים ושירותים מקוונים'
    },
    {
      name: 'ביטוח לאומי',
      url: 'https://www.btl.gov.il',
      description: 'זכויות, קצבאות ושירותי ביטוח לאומי'
    },
    {
      name: 'רשות שוק ההון',
      url: 'https://www.gov.il/he/departments/capital_market_authority/govil-landing-page',
      description: 'הרשות המפקחת על ביטוח ופנסיה'
    },
    {
      name: 'סימולטור לחישוב מס הכנסה שנתי לשכירים',
      url: 'https://secapp.taxes.gov.il/shSimulatorMas/main.aspx',
      description: 'חישוב מס הכנסה צפוי לשכירים'
    }]

  },
  {
    id: 'info-portals',
    title: 'פורטלי מידע פנסיוני',
    description: 'השוואות ומידע על מוצרים פיננסיים',
    icon: Calculator,
    color: 'from-emerald-500 to-emerald-600',
    links: [
    {
      name: 'גמל נט',
      url: 'https://gemelnet.cma.gov.il/views/dafmakdim.aspx',
      description: 'השוואת קופות גמל וקרנות השתלמות'
    },
    {
      name: 'ביטוח נט',
      url: 'https://bituachnet.cma.gov.il/bituachTsuotUI/Tsuot/UI/dafmakdim.aspx',
      description: 'השוואת פוליסות ביטוח'
    },
    {
      name: 'פנסיה נט',
      url: 'https://pensyanet.cma.gov.il/',
      description: 'השוואת קרנות פנסיה'
    }]

  },
  {
    id: 'insurance',
    title: 'חברות ביטוח',
    description: 'כניסה לאזור אישי בחברות הביטוח',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    links: [
    {
      name: 'כלל ביטוח',
      url: 'https://www.clalbit.co.il',
      description: 'אזור אישי ללקוחות כלל ביטוח'
    },
    {
      name: 'הפניקס',
      url: 'https://www.fnx.co.il',
      description: 'אזור אישי ללקוחות קבוצת הפניקס'
    },
    {
      name: 'הראל',
      url: 'https://www.harel-group.co.il',
      description: 'אזור אישי ללקוחות הראל'
    },
    {
      name: 'מגדל',
      url: 'https://www.migdal.co.il',
      description: 'אזור אישי ללקוחות מגדל'
    },
    {
      name: 'הכשרה ביטוח',
      url: 'https://www.hcsra.co.il/',
      description: 'אזור אישי ללקוחות הכשרה'
    },
    {
      name: 'מנורה מבטחים',
      url: 'https://www.menoramivt.co.il',
      description: 'אזור אישי ללקוחות מנורה מבטחים'
    },
    {
      name: 'איילון ביטוח',
      url: 'https://www.ayalon-ins.co.il',
      description: 'אזור אישי ללקוחות איילון'
    }]

  },
  {
    id: 'investment',
    title: 'בתי השקעות',
    description: 'כניסה לאזור אישי בבתי השקעות',
    icon: Building2,
    color: 'from-amber-500 to-amber-600',
    links: [
    {
      name: 'פיוניר תכנון פיננסי',
      url: 'https://www.piowealth.com',
      description: 'אזור אישי ללקוחות פיוניר'
    },
    {
      name: 'מיטב דש',
      url: 'https://www.meitav.co.il/',
      description: 'אזור אישי ללקוחות מיטב דש'
    },
    {
      name: 'אלטשולר שחם',
      url: 'https://www.as-invest.co.il/',
      description: 'אזור אישי ללקוחות אלטשולר שחם'
    },
    {
      name: 'מור גמל',
      url: 'https://www.more-invest.co.il',
      description: 'אזור אישי ללקוחות מור'
    },
    {
      name: 'אנליסט',
      url: 'https://www.analyst.co.il',
      description: 'אזור אישי ללקוחות אנליסט'
    },
    {
      name: 'ילין לפידות',
      url: 'https://www.yl-invest.co.il',
      description: 'אזור אישי ללקוחות ילין לפידות'
    }]

  }];


  const filteredCategories = categories.map((cat) => ({
    ...cat,
    links: cat.links.filter((link) =>
    link.name.includes(searchTerm) ||
    link.description.includes(searchTerm)
    )
  })).filter((cat) => cat.links.length > 0 || searchTerm === '');

  return (
    <div data-ev-id="ev_e52f1a6d91" className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_278e5a1418" className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_a7f79fc7d2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_233203651f" className="flex justify-between items-center h-20">
            <Link to="/">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <div data-ev-id="ev_6059d3b75c" className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-slate hover:text-navy transition-colors font-medium">ראשי</Link>
              <Link to="/#about" className="text-slate hover:text-navy transition-colors font-medium">אודות</Link>
              <Link to="/products" className="text-slate hover:text-navy transition-colors font-medium">מוצרים</Link>
              <Link to="/#services" className="text-slate hover:text-navy transition-colors font-medium">שירותים</Link>
              <Link to="/process" className="text-slate hover:text-navy transition-colors font-medium">תהליך עבודה</Link>
              <Link to="/media" className="text-slate hover:text-navy transition-colors font-medium">מדיה</Link>
              <Link to="/pension-returns" className="text-slate hover:text-navy transition-colors font-medium">תשואות פנסיה</Link>
              <Link to="/links" className="text-gold font-medium">קישורים שימושיים</Link>
              <a data-ev-id="ev_6b62fa37ac"
              href="https://surense.com/app/p/9z3sqal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy hover:bg-navy-light text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link
                to="/onboarding"
                className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 py-2.5 rounded-full transition-all">
                התחל תהליך
              </Link>
            </div>

            {/* Mobile menu button */}
            <button data-ev-id="ev_9be4d621d0"
            className="md:hidden p-2 text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen &&
          <div data-ev-id="ev_5da955b0e5" className="md:hidden py-4 border-t border-border">
              <div data-ev-id="ev_b0e0a319e2" className="flex flex-col gap-4">
                <Link to="/" className="text-slate hover:text-navy font-medium py-2">ראשי</Link>
                <Link to="/#about" className="text-slate hover:text-navy font-medium py-2">אודות</Link>
                <Link to="/products" className="text-slate hover:text-navy font-medium py-2">מוצרים</Link>
                <Link to="/#services" className="text-slate hover:text-navy font-medium py-2">שירותים</Link>
                <Link to="/process" className="text-slate hover:text-navy font-medium py-2">תהליך עבודה</Link>
                <Link to="/media" className="text-slate hover:text-navy font-medium py-2">מדיה</Link>
                <Link to="/pension-returns" className="text-slate hover:text-navy font-medium py-2">תשואות פנסיה</Link>
                <Link to="/links" className="text-gold font-medium py-2">קישורים שימושיים</Link>
                <a data-ev-id="ev_8c8161f854"
              href="https://surense.com/app/p/9z3sqal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-lg">

                  <FileText className="w-4 h-4" />
                  להוצאת מידע עדכני
                </a>
                <Link
                to="/onboarding"
                className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 py-2.5 rounded-full text-center transition-all">
                  התחל תהליך
                </Link>
              </div>
            </div>
          }
        </div>
      </nav>

      {/* Hero Section */}
      <section data-ev-id="ev_4472b89d59" className="pt-24 pb-16 bg-gradient-to-br from-navy via-navy to-navy-light relative overflow-hidden">
        <div data-ev-id="ev_7095246bd7" className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div data-ev-id="ev_44175e9fbb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div data-ev-id="ev_ae2c22a916" className="text-center max-w-3xl mx-auto">
            <div data-ev-id="ev_0662a0ccac" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
              <Globe className="w-8 h-8 text-gold" />
            </div>
            <h1 data-ev-id="ev_3d00357e84" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              קישורים שימושיים
            </h1>
            <p data-ev-id="ev_1ce74e2160" className="text-lg text-white/80 mb-8 text-pretty">
              גישה מהירה לאתרים ומערכות חשובים בעולם הפיננסים והביטוח.
              כל המשאבים שתצטרכו לצפייה במידע וניהול הכספים שלכם.
            </p>

            {/* Search */}
            <div data-ev-id="ev_143cdb5281" className="relative max-w-md mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
              <input data-ev-id="ev_c3b029987c"
              type="text"
              placeholder="חפשו אתר או שירות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50" />

            </div>
          </div>
        </div>
      </section>

      {/* Links Grid */}
      <section data-ev-id="ev_695c54a011" className="py-16 bg-light">
        <div data-ev-id="ev_bbd5716c80" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_e936874338" className="flex flex-col gap-12">
            {filteredCategories.map((category) =>
            <div data-ev-id="ev_41c1bfcc6f" key={category.id}>
                {/* Category Header */}
                <div data-ev-id="ev_c7cd714c21" className="flex items-center gap-4 mb-6">
                  <div data-ev-id="ev_438c9ab259" className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div data-ev-id="ev_610c931ad3">
                    <h2 data-ev-id="ev_fea33b9c37" className="text-2xl font-bold text-navy">{category.title}</h2>
                    <p data-ev-id="ev_4d312d9ee2" className="text-slate text-sm">{category.description}</p>
                  </div>
                </div>

                {/* Links Grid */}
                <div data-ev-id="ev_1626e76d4d" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.links.map((link) =>
                <a data-ev-id="ev_514db5c192"
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-5 border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300">

                      <div data-ev-id="ev_37b76320fc" className="flex items-start justify-between gap-3">
                        <div data-ev-id="ev_bc71ab9ccb" className="flex-1">
                          <h3 data-ev-id="ev_34d90e2232" className="font-semibold text-navy group-hover:text-gold transition-colors mb-1">
                            {link.name}
                          </h3>
                          <p data-ev-id="ev_55608d5cef" className="text-sm text-slate">
                            {link.description}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-slate group-hover:text-gold transition-colors flex-shrink-0 mt-0.5" />
                      </div>
                    </a>
                )}
                </div>
              </div>
            )}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 &&
          <div data-ev-id="ev_c94fc8abda" className="text-center py-12">
              <p data-ev-id="ev_d56d8be80a" className="text-slate text-lg">לא נמצאו תוצאות לחיפוש "{searchTerm}"</p>
            </div>
          }
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_7e84a91867" className="py-16 bg-white">
        <div data-ev-id="ev_177f97fdce" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-ev-id="ev_105a490d17" className="text-2xl sm:text-3xl font-bold text-navy mb-4">
            צריכים עזרה בניווט?
          </h2>
          <p data-ev-id="ev_392a37fab4" className="text-slate text-lg mb-8">
            צוות WealthTech כאן כדי לסייע לכם לנווט במערכות הפיננסיות ולמצות את הזכויות שלכם.
          </p>
          <div data-ev-id="ev_e3b76a4810" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/onboarding"
              className="bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center justify-center gap-2">

              התחל תהליך
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link
              to="/#contact"
              className="bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center justify-center gap-2">

              צור קשר
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_4dbcac4cda" className="bg-navy py-12">
        <div data-ev-id="ev_5c57de83dd" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_2b765d7699" className="flex justify-center mb-8">
            <a data-ev-id="ev_115fd26050"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <div data-ev-id="ev_7fbe4999b4" className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo variant="light" />
            
            <div data-ev-id="ev_083ee35335" className="flex items-center gap-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">ראשי</Link>
              <Link to="/products" className="text-white/70 hover:text-white transition-colors">מוצרים</Link>
              <Link to="/process" className="text-white/70 hover:text-white transition-colors">תהליך עבודה</Link>
              <Link to="/media" className="text-white/70 hover:text-white transition-colors">מדיה</Link>
            </div>
            
            <div data-ev-id="ev_db7a76e736" className="flex flex-col items-center md:items-end gap-2">
              <div data-ev-id="ev_1e4446169a" className="text-white/50 text-sm">
                © 2024 WealthTech. כל הזכויות שמורות.
              </div>
              <div data-ev-id="ev_45fe7fd9af" className="flex items-center gap-4">
                <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                  מדיניות פרטיות
                </Link>
                <span data-ev-id="ev_635a0ecc26" className="text-white/30">|</span>
                <Link to="/disclosure" className="text-white/50 hover:text-white text-sm transition-colors">
                  גילוי נאות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}