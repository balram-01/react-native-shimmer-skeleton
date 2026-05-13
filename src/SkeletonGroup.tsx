import React, {
  Children,
  useEffect,
  useRef,
  useState,
  isValidElement,
  cloneElement,
  type ReactElement,
} from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { SkeletonGroupProps, SkeletonProps } from './types';

/**
 * `<SkeletonGroup>` manages a group of skeleton children with:
 * - Staggered delay: each `<Skeleton>` child receives an incrementing `delay`
 *   prop so skeletons animate in a wave/ripple pattern.
 * - Content fade-in: when `loading` switches to `false`, the real content
 *   fades in smoothly instead of popping into view.
 *
 * @example
 * <SkeletonGroup loading={isLoading} stagger={80}>
 *   <CardSkeleton />
 *   <CardSkeleton />
 * </SkeletonGroup>
 */
const SkeletonGroup = React.memo(function SkeletonGroup({
  loading,
  stagger = 100,
  children,
  style,
}: SkeletonGroupProps) {
  const fadeAnim = useRef(new Animated.Value(loading ? 0 : 1)).current;
  const [showChildren, setShowChildren] = useState(!loading);

  useEffect(() => {
    if (!loading) {
      // Content is ready → fade real children in
      setShowChildren(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      // Back to loading state → hide real children immediately
      fadeAnim.setValue(0);
      setShowChildren(false);
    }
  }, [loading, fadeAnim]);

  // ── Stagger injection ────────────────────────────────────────────────────
  // Walk through children and inject an incrementing `delay` prop into each
  // child that looks like a Skeleton component (has a `delay` prop slot).
  const staggeredSkeletons = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;

    // Inject stagger delay into any component that accepts a `delay` prop.
    // This covers Skeleton and all preset components.
    const childProps = child.props as SkeletonProps;
    if ('delay' in childProps || 'animation' in childProps) {
      return cloneElement(child as ReactElement<SkeletonProps>, {
        delay: (childProps.delay ?? 0) + index * stagger,
      });
    }

    return child;
  });

  return (
    <View style={[styles.container, style]}>
      {/* Skeleton placeholders — always mounted while loading */}
      {loading && <View style={styles.layer}>{staggeredSkeletons}</View>}

      {/* Real content — fades in when loading=false */}
      {showChildren && (
        <Animated.View style={[styles.layer, { opacity: fadeAnim }]}>
          {children}
        </Animated.View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  layer: {
    width: '100%',
  },
});

export default SkeletonGroup;
export { SkeletonGroup };
