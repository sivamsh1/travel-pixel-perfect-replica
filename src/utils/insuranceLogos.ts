
/**
 * Constants for insurance provider logos
 */
export const LOGO_PATHS = {
  reliance: '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png',
  godigit: '/lovable-uploads/afa69947-6425-48b3-bba8-6af4da608ab1.png',
  bajaj: '/lovable-uploads/Bajaj.png.png'
} as const;

/**
 * Get insurer key from plan name
 * @param key The plan name or key
 * @returns The insurer key or null if not found
 */
export const getInsurerFromKey = (key: string): keyof typeof LOGO_PATHS | null => {
  const keyLower = key.toLowerCase();
  for (const insurer of Object.keys(LOGO_PATHS)) {
    if (keyLower.includes(insurer)) {
      return insurer as keyof typeof LOGO_PATHS;
    }
  }
  return null;
};
