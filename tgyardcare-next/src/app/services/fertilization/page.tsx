import type { Metadata } from 'next';
import FertilizationContent from './FertilizationContent';

export const metadata: Metadata = {
  title: 'Lawn Fertilization Madison WI | Overseeding | TG Yard Care',
  description: 'Build thick, green lawns in Madison & Dane County with professional fertilization & overseeding programs. Timed to Wisconsin growing cycles. Free lawn analysis!',
  keywords: 'lawn fertilization Madison WI, overseeding Middleton, lawn treatment Waunakee, fertilizer program Sun Prairie, Dane County lawn care, Fitchburg fertilization',
  alternates: { canonical: 'https://tgyardcare.com/services/fertilization' },
};

export default function FertilizationPage() {
  return <FertilizationContent />;
}
