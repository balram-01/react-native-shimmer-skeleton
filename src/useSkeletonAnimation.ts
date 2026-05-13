import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { UseSkeletonAnimationOptions, UseSkeletonAnimationReturn } from './types';

/**
 * Core animation hook that powers Skeleton components.
 *
 * Handles:
 * - Shimmer (translateX sweep)
 * - Pulse (opacity breathe)
 * - Wave (same as pulse, consumed by SkeletonGroup for staggering)
 * - Reduced-motion accessibility
 * - Cleanup on unmount
 *
 * @example
 * const { animatedValue, shimmerStyle, pulseStyle } = useSkeletonAnimation({ speed: 1000 });
 */
export function useSkeletonAnimation({
  speed = 1400,
  delay = 0,
  animation = 'shimmer',
  direction = 'ltr',
}: UseSkeletonAnimationOptions = {}): UseSkeletonAnimationReturn {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (animation === 'none') {
      setIsAnimating(false);
      return;
    }

    // Respect the OS "Reduce Motion" accessibility setting
    const checkReducedMotion = async () => {
      const reducedMotion = await AccessibilityInfo.isReduceMotionEnabled();

      if (reducedMotion) {
        // Static state: just show base color, no animation
        animatedValue.setValue(0);
        setIsAnimating(false);
        return;
      }

      setIsAnimating(true);

      animationRef.current = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: speed,
          delay: delay > 0 ? delay : 0,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );

      animationRef.current.start();
    };

    checkReducedMotion();

    return () => {
      animationRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, delay, animation]);

  /**
   * Returns a shimmer style for the highlight overlay.
   * The caller must know its own width to produce the correct translateX range.
   */
  const shimmerStyle = (width: number): ViewStyle => {
    let outputRange: [number, number];

    switch (direction) {
      case 'rtl':
        outputRange = [width, -width];
        break;
      case 'ltr':
      default:
        outputRange = [-width, width];
        break;
    }

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange,
    });

    // For ttb / btt directions we translate on Y instead
    if (direction === 'ttb') {
      const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
      });
      return { transform: [{ translateY }] } as unknown as ViewStyle;
    }

    if (direction === 'btt') {
      const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [width, -width],
      });
      return { transform: [{ translateY }] } as unknown as ViewStyle;
    }

    return { transform: [{ translateX }] } as unknown as ViewStyle;
  };

  /**
   * Returns the opacity style for pulse animation.
   * Oscillates between 1 (full base color) and 0.4 (faded).
   */
  const pulseStyle: ViewStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.4, 1],
    }) as unknown as number,
  };

  return {
    animatedValue,
    shimmerStyle,
    pulseStyle,
    isAnimating,
  };
}
