import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '../Skeleton';
import type { SkeletonProps } from '../types';

export interface ListItemSkeletonProps
  extends Pick<SkeletonProps, 'animation' | 'speed' | 'baseColor' | 'highlightColor' | 'delay'> {
  /** Size of the avatar circle. Defaults to 48. */
  avatarSize?: number;
  /** Show the right-side action/timestamp line. Defaults to true. */
  showAction?: boolean;
}

/**
 * Pre-built list-item skeleton:
 *
 *  [●]  ████████████████   ████
 *       ███████████████████████
 *
 * Avatar circle + two text lines + optional timestamp/action.
 */
const ListItemSkeleton = React.memo(function ListItemSkeleton({
  animation = 'shimmer',
  speed = 1400,
  baseColor,
  highlightColor,
  delay = 0,
  avatarSize = 48,
  showAction = true,
}: ListItemSkeletonProps) {
  const shared: Partial<SkeletonProps> = {
    animation,
    speed,
    baseColor,
    highlightColor,
  };

  return (
    <View style={styles.row}>
      {/* Avatar circle */}
      <Skeleton
        {...shared}
        delay={delay}
        variant="circle"
        width={avatarSize}
        height={avatarSize}
        style={styles.avatar}
      />

      {/* Text block */}
      <View style={styles.textBlock}>
        {/* Row 1: name + timestamp */}
        <View style={styles.topRow}>
          <Skeleton
            {...shared}
            delay={delay + 60}
            variant="text"
            width="55%"
            height={15}
          />
          {showAction && (
            <Skeleton
              {...shared}
              delay={delay + 60}
              variant="text"
              width={48}
              height={12}
            />
          )}
        </View>

        {/* Row 2: preview text */}
        <Skeleton
          {...shared}
          delay={delay + 120}
          variant="text"
          width="85%"
          height={13}
          style={styles.secondLine}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  avatar: {
    marginRight: 14,
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    gap: 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  secondLine: {
    marginTop: 0,
  },
});

export default ListItemSkeleton;
export { ListItemSkeleton };
