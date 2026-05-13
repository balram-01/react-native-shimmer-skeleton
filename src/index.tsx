// ─── Core Components ──────────────────────────────────────────────────────────
export { Skeleton } from './Skeleton';
export { SkeletonGroup } from './SkeletonGroup';

// ─── Hook ─────────────────────────────────────────────────────────────────────
export { useSkeletonAnimation } from './useSkeletonAnimation';

// ─── Theme System ─────────────────────────────────────────────────────────────
export {
  themes,
  SkeletonThemeContext,
  SkeletonThemeProvider,
  useSkeletonTheme,
} from './themes';
export type { SkeletonThemeProviderProps, ThemeName } from './themes';

// ─── Preset Layouts ───────────────────────────────────────────────────────────
export {
  CardSkeleton,
  ListItemSkeleton,
  ProfileSkeleton,
  ArticleSkeleton,
} from './presets';
export type {
  CardSkeletonProps,
  ListItemSkeletonProps,
  ProfileSkeletonProps,
  ArticleSkeletonProps,
} from './presets';

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  SkeletonProps,
  SkeletonGroupProps,
  SkeletonTheme,
  SkeletonVariant,
  AnimationType,
  ShimmerDirection,
  UseSkeletonAnimationOptions,
  UseSkeletonAnimationReturn,
} from './types';

// ─── Utils ────────────────────────────────────────────────────────────────────
export { getVariantStyles } from './utils/getVariantStyles';
