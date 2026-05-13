import type { StyleProp, ViewStyle } from 'react-native';
import { Animated } from 'react-native';

// ─── Animation Types ────────────────────────────────────────────────────────

export type AnimationType = 'shimmer' | 'pulse' | 'wave' | 'none';
export type ShimmerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';
export type SkeletonVariant = 'rect' | 'circle' | 'text' | 'rounded';

// ─── Theme Types ─────────────────────────────────────────────────────────────

export interface SkeletonTheme {
  baseColor: string;
  highlightColor: string;
}

// ─── Skeleton Props ──────────────────────────────────────────────────────────

export interface SkeletonProps {
  /** Width of the skeleton. Accepts number (dp) or string ('80%'). */
  width?: number | string;
  /** Height of the skeleton. Accepts number (dp) or string. */
  height?: number | string;
  /** Border radius override. */
  borderRadius?: number;
  /** Shape preset. Overrides borderRadius defaults. */
  variant?: SkeletonVariant;
  /** Animation style. Defaults to 'shimmer'. */
  animation?: AnimationType;
  /** Animation cycle duration in ms. Defaults to 1400. */
  speed?: number;
  /** Delay before animation starts in ms. Defaults to 0. */
  delay?: number;
  /** Direction of shimmer travel. Defaults to 'ltr'. */
  direction?: ShimmerDirection;
  /** Base (background) color of the skeleton. */
  baseColor?: string;
  /** Highlight (shimmer) color of the skeleton. */
  highlightColor?: string;
  /** Additional styles applied to the outer container. */
  style?: StyleProp<ViewStyle>;
  /** Children rendered inside the skeleton (layout skeletons). */
  children?: React.ReactNode;
  /** Test ID for testing. */
  testID?: string;
}

// ─── SkeletonGroup Props ─────────────────────────────────────────────────────

export interface SkeletonGroupProps {
  /** When false, renders children with a fade-in transition. */
  loading: boolean;
  /** Delay (ms) between staggered skeleton children animations. */
  stagger?: number;
  /** Children — should contain Skeleton or preset components. */
  children: React.ReactNode;
  /** Additional styles for the group container. */
  style?: StyleProp<ViewStyle>;
}

// ─── useSkeletonAnimation Options & Return ───────────────────────────────────

export interface UseSkeletonAnimationOptions {
  speed?: number;
  delay?: number;
  animation?: AnimationType;
  direction?: ShimmerDirection;
}

export interface UseSkeletonAnimationReturn {
  animatedValue: Animated.Value;
  shimmerStyle: (width: number) => ViewStyle;
  pulseStyle: ViewStyle;
  isAnimating: boolean;
}
