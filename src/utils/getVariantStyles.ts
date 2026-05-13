import type { ViewStyle } from 'react-native';
import type { SkeletonVariant } from '../types';

/**
 * Returns baseline ViewStyle for a given skeleton variant.
 * These are defaults and can be overridden via explicit props.
 */
export function getVariantStyles(variant?: SkeletonVariant): ViewStyle {
  switch (variant) {
    case 'circle':
      // Perfect circle — consumer must pass equal width & height
      return { borderRadius: 9999 };
    case 'text':
      // Single text-line skeleton: standard height, slight rounding
      return { borderRadius: 4, height: 14 };
    case 'rounded':
      // Card / pill style
      return { borderRadius: 12 };
    case 'rect':
    default:
      return { borderRadius: 6 };
  }
}
