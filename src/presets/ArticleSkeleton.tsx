import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '../Skeleton';
import type { SkeletonProps } from '../types';

export interface ArticleSkeletonProps
  extends Pick<SkeletonProps, 'animation' | 'speed' | 'baseColor' | 'highlightColor' | 'delay'> {
  /** Show the hero banner image. Defaults to true. */
  showHero?: boolean;
  /** Number of body paragraph lines. Defaults to 6. */
  paragraphLines?: number;
  /** Show author row (avatar + name + date). Defaults to true. */
  showAuthor?: boolean;
}

/**
 * Full-page article / blog post skeleton:
 *
 * ╔═══════════════════════════════╗
 * ║      [hero image 200px]       ║
 * ╚═══════════════════════════════╝
 *  [●]  Author Name   •  May 2025      ← author row
 *  ████████████████████████            ← H1 title (tall)
 *  ████████████████                    ← subtitle
 *  ─────────────────────────────────
 *  █████████████████████████████████   ← paragraph lines…
 *  ████████████████████████████████
 *  █████████████████████████
 *  …
 */
const ArticleSkeleton = React.memo(function ArticleSkeleton({
  animation = 'shimmer',
  speed = 1400,
  baseColor,
  highlightColor,
  delay = 0,
  showHero = true,
  paragraphLines = 6,
  showAuthor = true,
}: ArticleSkeletonProps) {
  const shared: Partial<SkeletonProps> = {
    animation,
    speed,
    baseColor,
    highlightColor,
  };

  // Irregular line widths for a realistic "paragraph" look
  const bodyWidths = ['100%', '95%', '88%', '100%', '92%', '75%', '100%', '97%'];

  return (
    <View style={styles.article}>
      {/* Hero banner */}
      {showHero && (
        <Skeleton
          {...shared}
          delay={delay}
          width="100%"
          height={220}
          borderRadius={0}
          style={styles.hero}
        />
      )}

      <View style={styles.body}>
        {/* Author row */}
        {showAuthor && (
          <View style={styles.authorRow}>
            <Skeleton
              {...shared}
              delay={delay + 60}
              variant="circle"
              width={36}
              height={36}
              style={styles.authorAvatar}
            />
            <Skeleton
              {...shared}
              delay={delay + 80}
              variant="text"
              width={140}
              height={13}
            />
            <Skeleton
              {...shared}
              delay={delay + 100}
              variant="text"
              width={72}
              height={12}
              style={styles.date}
            />
          </View>
        )}

        {/* Title */}
        <Skeleton
          {...shared}
          delay={delay + 120}
          variant="text"
          width="92%"
          height={28}
          borderRadius={6}
          style={styles.title}
        />
        <Skeleton
          {...shared}
          delay={delay + 160}
          variant="text"
          width="70%"
          height={20}
          borderRadius={6}
          style={styles.subtitle}
        />

        {/* Divider replacement */}
        <Skeleton
          {...shared}
          delay={delay + 200}
          width="100%"
          height={2}
          borderRadius={1}
          style={styles.divider}
        />

        {/* Paragraph lines */}
        {Array.from({ length: Math.min(paragraphLines, 8) }).map((_, i) => (
          <Skeleton
            key={i}
            {...shared}
            delay={delay + 240 + i * 40}
            variant="text"
            width={bodyWidths[i % bodyWidths.length]}
            height={14}
            style={styles.bodyLine}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  article: {
    overflow: 'hidden',
  },
  hero: {
    marginBottom: 0,
  },
  body: {
    padding: 20,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  authorAvatar: {
    marginRight: 4,
  },
  date: {
    marginLeft: 'auto',
  },
  title: {
    marginBottom: 10,
    height: 28,
  },
  subtitle: {
    marginBottom: 20,
  },
  divider: {
    marginBottom: 20,
    opacity: 0.4,
  },
  bodyLine: {
    marginBottom: 10,
  },
});

export default ArticleSkeleton;
export { ArticleSkeleton };
