import type { Metadata } from 'next';
import TeamContent from './TeamContent';

export const metadata: Metadata = {
  title: 'Meet Our Team | TotalGuard Yard Care Madison WI',
  description: "Meet Alex & Vance, Madison's trusted lawn care entrepreneurs. Young, driven & dedicated to excellence. Learn why 500+ homeowners choose TotalGuard!",
  keywords: 'TotalGuard team, Madison lawn care owners, Alex and Vance, local landscaping business, young entrepreneurs',
  alternates: {
    canonical: 'https://tgyardcare.com/team',
  },
};

export default function TeamPage() {
  return <TeamContent />;
}
