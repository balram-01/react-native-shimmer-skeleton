import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '../Skeleton';
import type { SkeletonProps } from '../types';

export interface ProfileSkeletonProps
  extends Pick<SkeletonProps, 'animation' | 'speed' | 'baseColor' | 'highlightColor' | 'delay'> {
  /** Avatar circle diameter. Defaults to 88. */
  avatarSize?: number;
  /** Show the two action buttons at the bottom. Defaults to true. */
  showButtons?: boolean;
  /** Number of bio lines. Defaults to 2. */
  bioLines?: number;
}

/**
 * Pre-built profile skeleton:
 *
 *        [●●●●●]         ← large avatar circle (centred)
 *    ████████████        ← display name (centred)
 *    ██████████          ← bio line 1
 *    ████████████████    ← bio line 2
 *   [  Follow  ] [  DM  ]
 */
const ProfileSkeleton = React.memo(function ProfileSkeleton({
  animation = 'shimmer',
  speed = 1400,
  baseColor,
  highlightColor,
  delay = 0,
  avatarSize = 88,
  showButtons = true,
  bioLines = 2,
}: ProfileSkeletonProps) {
  const shared: Partial<SkeletonProps> = {
    animation,
    speed,
    baseColor,
    highlightColor,
  };

  const bioWidths = ['62%', '80%', '55%'];

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Skeleton
        {...shared}
        delay={delay}
        variant="circle"
        width={avatarSize}
        height={avatarSize}
        style={styles.avatar}
      />

      {/* Name */}
      <Skeleton
        {...shared}
        delay={delay + 80}
        variant="text"
        width="48%"
        height={20}
        borderRadius={6}
        style={styles.name}
      />

      {/* Handle / subtitle */}
      <Skeleton
        {...shared}
        delay={delay + 140}
        variant="text"
        width="32%"
        height={14}
        style={styles.handle}
      />

      {/* Bio lines */}
      {Array.from({ length: Math.min(bioLines, 3) }).map((_, i) => (
        <Skeleton
          key={i}
          {...shared}
          delay={delay + 200 + i * 60}
          variant="text"
          width={bioWidths[i] ?? '70%'}
          height={13}
          style={styles.bioLine}
        />
      ))}

      {/* Action buttons */}
      {showButtons && (
        <View style={styles.buttons}>
          <Skeleton
            {...shared}
            delay={delay + 320}
            variant="rounded"
            width={120}
            height={40}
            style={styles.btn}
          />
          <Skeleton
            {...shared}
            delay={delay + 380}
            variant="rounded"
            width={120}
            height={40}
            style={styles.btn}
          />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    marginBottom: 8,
  },
  handle: {
    marginBottom: 16,
  },
  bioLine: {
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  btn: {
    flex: 0,
  },
});

export default ProfileSkeleton;
export { ProfileSkeleton };
