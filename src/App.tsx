/**
 * ⚠️ ROUTING RULES:
 * - Router is in main.tsx. Do NOT add another <BrowserRouter> here or anywhere.
 * - Use <Routes> + <Route> components ONLY. Do NOT use useRoutes().
 * - STATIC IMPORTS ONLY — no React.lazy() or dynamic import().
 * - Import from 'react-router' — NOT 'react-router-dom' (does not exist).
 */
import { Routes, Route } from 'react-router';
import Index from '@/pages/Index';
import Process from '@/pages/Process';
import Media from '@/pages/Media';
import Products from '@/pages/Products';
import Onboarding from '@/pages/Onboarding';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Disclosure from '@/pages/Disclosure';
import UsefulLinks from '@/pages/UsefulLinks';
import PensionReturns from '@/pages/PensionReturns';
import LifeInsuranceCalculator from '@/pages/LifeInsuranceCalculator';
import SavingsCalculator from '@/pages/SavingsCalculator';
import TaxRefundEligibility from '@/pages/TaxRefundEligibility';
import WealthSnapshot from '@/pages/WealthSnapshot';
import WealthTechOne from '@/pages/WealthTechOne';
import RightsCheck from '@/pages/RightsCheck';
import FamilyOffice from '@/pages/FamilyOffice';
import { MobileActionBar } from '@/components/MobileActionBar';

export default function App() {
	return (
		<>
		<Routes>
			<Route path="/" element={<Index />} />
			<Route path="/process" element={<Process />} />
			<Route path="/media" element={<Media />} />
			<Route path="/products" element={<Products />} />
			<Route path="/onboarding" element={<Onboarding />} />
			<Route path="/privacy" element={<PrivacyPolicy />} />
			<Route path="/disclosure" element={<Disclosure />} />
			<Route path="/links" element={<UsefulLinks />} />
			<Route path="/pension-returns" element={<PensionReturns />} />
			<Route path="/life-insurance-calculator" element={<LifeInsuranceCalculator />} />
			<Route path="/savings-calculator" element={<SavingsCalculator />} />
			<Route path="/tax-refund-eligibility" element={<TaxRefundEligibility />} />
			<Route path="/wealth-snapshot" element={<WealthSnapshot />} />
			<Route path="/wealthtech-one" element={<WealthTechOne />} />
			<Route path="/rights-check" element={<RightsCheck />} />
			<Route path="/family-office" element={<FamilyOffice />} />
		</Routes>
		<MobileActionBar />
		</>
	);
}
