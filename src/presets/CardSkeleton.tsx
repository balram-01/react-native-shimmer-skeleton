import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '../Skeleton';
import type { SkeletonProps } from '../types';

export interface CardSkeletonProps
  extends Pick<SkeletonProps, 'animation' | 'speed' | 'baseColor' | 'highlightColor' | 'delay'> {
  /** Show the image/hero placeholder at the top. Defaults to true. */
  showImage?: boolean;
  /** Number of text lines below the image. Defaults to 3. */
  lines?: number;
}

/**
 * Pre-built card skeleton layout:
 *
 * ┌─────────────────────────┐
 * │   [image placeholder]   │
 * │  ████████████           │  ← title
 * │  ████████████████████   │  ← subtitle
 * │  ████████               │  ← tag/badge
 * └─────────────────────────┘
 */
const CardSkeleton = React.memo(function CardSkeleton({
  animation = 'shimmer',
  speed = 1400,
  baseColor,
  highlightColor,
  delay = 0,
  showImage = true,
  lines = 3,
}: CardSkeletonProps) {
  const shared: Partial<SkeletonProps> = {
    animation,
    speed,
    baseColor,
    highlightColor,
  };

  const lineWidths = ['72%', '88%', '48%'];

  return (
    <View style={styles.card}>
      {/* Hero image */}
      {showImage && (
        <Skeleton
          {...shared}
          delay={delay}
          width="100%"
          height={180}
          borderRadius={12}
          style={styles.image}
        />
      )}

      <View style={styles.content}>
        {/* Title */}
        <Skeleton
          {...shared}
          delay={delay + 60}
          variant="text"
          width={lineWidths[0]}
          height={18}
          style={styles.title}
        />

        {/* Body lines */}
        {Array.from({ length: Math.min(lines - 1, 2) }).map((_, i) => (
          <Skeleton
            key={i}
            {...shared}
            delay={delay + 120 + i * 60}
            variant="text"
            width={lineWidths[i + 1] ?? '60%'}
            height={14}
            style={styles.line}
          />
        ))}

        {/* Tag / badge */}
        <Skeleton
          {...shared}
          delay={delay + 240}
          variant="rounded"
          width={80}
          height={24}
          style={styles.tag}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    marginBottom: 0,
  },
  content: {
    padding: 16,
    gap: 0,
  },
  title: {
    marginBottom: 10,
  },
  line: {
    marginBottom: 8,
  },
  tag: {
    marginTop: 8,
  },
});

export default CardSkeleton;
export { CardSkeleton };
