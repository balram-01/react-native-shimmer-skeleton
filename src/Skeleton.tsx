import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import type { SkeletonProps } from './types';
import { useSkeletonAnimation } from './useSkeletonAnimation';
import { useSkeletonTheme } from './themes';
import { getVariantStyles } from './utils/getVariantStyles';

/**
 * The core `<Skeleton>` component.
 *
 * Renders an animated placeholder that mimics the shape of real content.
 * Supports shimmer, pulse, and wave animation modes out of the box.
 *
 * @example
 * // Simple rectangle
 * <Skeleton width={200} height={20} />
 *
 * @example
 * // Circle avatar
 * <Skeleton variant="circle" width={48} height={48} />
 *
 * @example
 * // Text line
 * <Skeleton variant="text" width="80%" />
 */
const Skeleton = React.memo(function Skeleton({
  width,
  height,
  borderRadius,
  variant,
  animation = 'shimmer',
  speed = 1400,
  delay = 0,
  direction = 'ltr',
  baseColor,
  highlightColor,
  style,
  children,
  testID,
}: SkeletonProps) {
  // ── Theme resolution ──────────────────────────────────────────────────────
  const theme = useSkeletonTheme();
  const resolvedBase = baseColor ?? theme.baseColor;
  const resolvedHighlight = highlightColor ?? theme.highlightColor;

  // ── Layout measurement ────────────────────────────────────────────────────
  // We use onLayout to get the actual rendered width so shimmer translateX
  // can be accurately calculated (handles percentage widths, flex, etc.)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const hasMeasured = useRef(false);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    if (!hasMeasured.current || w !== containerSize.width) {
      hasMeasured.current = true;
      setContainerSize({ width: w, height: h });
    }
  }, [containerSize.width]);

  // ── Animation ─────────────────────────────────────────────────────────────
  const { shimmerStyle, pulseStyle } = useSkeletonAnimation({
    speed,
    delay,
    animation,
    direction,
  });

  // ── Variant styles ────────────────────────────────────────────────────────
  const variantStyle = getVariantStyles(variant);
  const resolvedBorderRadius =
    borderRadius !== undefined ? borderRadius : variantStyle.borderRadius;
  const resolvedHeight = height ?? variantStyle.height ?? 16;

  // ── Container style ───────────────────────────────────────────────────────
  const containerStyle: ViewStyle = {
    width: width ?? '100%',
    height: resolvedHeight,
    borderRadius: resolvedBorderRadius as number,
    backgroundColor: resolvedBase,
    overflow: 'hidden',
  };

  // ── Render shimmer highlight ───────────────────────────────────────────────
  const renderShimmer = () => {
    if (animation === 'none') return null;

    if (animation === 'shimmer' || animation === 'wave') {
      // The shimmer panel is wider than the container so its soft edges are
      // clipped cleanly by overflow:hidden on the parent.
      const panelWidth = containerSize.width * 0.65;
      const isVertical = direction === 'ttb' || direction === 'btt';
      const panelSize = isVertical
        ? { width: '100%' as const, height: panelWidth }
        : { width: panelWidth, height: '100%' as const };

      return (
        <Animated.View
          style={[
            styles.shimmerPanel,
            panelSize,
            shimmerStyle(
              isVertical ? containerSize.height : containerSize.width
            ),
          ]}
          pointerEvents="none"
        >
          {/* Left feather */}
          <View
            style={[
              styles.shimmerFeather,
              { backgroundColor: resolvedHighlight, opacity: 0 },
            ]}
          />
          {/* Centre bright band */}
          <View
            style={[
              styles.shimmerCore,
              { backgroundColor: resolvedHighlight },
            ]}
          />
          {/* Right feather */}
          <View
            style={[
              styles.shimmerFeather,
              { backgroundColor: resolvedHighlight, opacity: 0 },
            ]}
          />
        </Animated.View>
      );
    }

    if (animation === 'pulse') {
      return (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: resolvedHighlight },
            pulseStyle,
          ]}
          pointerEvents="none"
        />
      );
    }

    return null;
  };

  return (
    <View
      style={[containerStyle, style]}
      onLayout={onLayout}
      testID={testID}
      accessible
      accessibilityLabel="Loading"
      accessibilityRole="none"
    >
      {/* Children support: layout-skeleton pattern */}
      {children}

      {/* Shimmer overlay — sits on top of children */}
      {renderShimmer()}
    </View>
  );
});

// ─── Shimmer highlight sub-styles ────────────────────────────────────────────
// The shimmer is composed of three strips:
//   [feather(0 opacity)] [bright core] [feather(0 opacity)]
// This creates the illusion of a soft-edged gradient without LinearGradient.
// The feather views use opacity 0 at their outer edges and blend with the
// bright core, giving a credible gradient-lite look.

const styles = StyleSheet.create({
  shimmerPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  shimmerFeather: {
    flex: 1,
    opacity: 0.3,
  },
  shimmerCore: {
    flex: 2,
    opacity: 0.65,
  },
});

export default Skeleton;
export { Skeleton };
