import { getProfileGradientCookie, setProfileGradientCookie } from '@/components/Avatar/Gradients';
import { useEffect, useState } from 'react';

export function useProfileGradient(color?: string): string {
  const [gradient, setGradient] = useState<string>('');

  useEffect(() => {
    if (color) {
      setProfileGradientCookie(color);
      setGradient(color);
    } else {
      const gradientCookie = getProfileGradientCookie();

      if (gradientCookie) {
        setGradient(gradientCookie);
      } else {
        setGradient('orange');
      }
    }
  }, [gradient, color]);

  // Update value with every render when its value has changed.
  const cookie = getProfileGradientCookie();
  if (cookie !== undefined && gradient !== cookie) {
    setGradient(cookie);
  }

  return gradient;
}
