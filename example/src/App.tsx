import { useState, useCallback, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ArticleSkeleton,
  CardSkeleton,
  ListItemSkeleton,
  ProfileSkeleton,
  Skeleton,
  SkeletonGroup,
  SkeletonThemeProvider,
  useSkeletonAnimation,
} from 'react-native-skeleton-loading';

// ─── Types ────────────────────────────────────────────────────────────────────

type DemoSection =
  | 'basic'
  | 'variants'
  | 'animations'
  | 'presets'
  | 'group'
  | 'hook'
  | 'themes';

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT = '#6C63FF';
const ACCENT_SOFT = '#EEF0FF';
const BG = '#F4F6FB';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6B7280';
const TEXT_MUTED = '#9CA3AF';
const BORDER = '#E5E7EB';

const SECTIONS: { key: DemoSection; label: string; emoji: string }[] = [
  { key: 'basic',      label: 'Basic',      emoji: '⬜' },
  { key: 'variants',   label: 'Variants',   emoji: '🔵' },
  { key: 'animations', label: 'Animations', emoji: '✨' },
  { key: 'presets',    label: 'Presets',    emoji: '🃏' },
  { key: 'group',      label: 'Group',      emoji: '📦' },
  { key: 'hook',       label: 'Hook',       emoji: '🪝' },
  { key: 'themes',     label: 'Themes',     emoji: '🎨' },
];

// ─── Code Badge ───────────────────────────────────────────────────────────────

function CodeBadge({ code }: { code: string }) {
  return (
    <View style={styles.codeBadge}>
      <Text style={styles.codeBadgeText}>{code}</Text>
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionTitle({
  title,
  subtitle,
  code,
}: {
  title: string;
  subtitle?: string;
  code?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {code && <CodeBadge code={code} />}
      </View>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

// ─── Demo Card Wrapper ────────────────────────────────────────────────────────

function DemoCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <View style={[styles.demoCard, style]}>{children}</View>;
}

// ─── Demo: Basic ─────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <DemoCard>
      <SectionTitle
        title="Basic Usage"
        subtitle="Pass width, height, borderRadius — that's it."
        code="<Skeleton />"
      />

      {/* Simulates a page title */}
      <View style={styles.demoGroup}>
        <Text style={styles.demoGroupLabel}>Page Title</Text>
        <Skeleton width="70%" height={22} borderRadius={6} style={styles.mb8} />
      </View>

      {/* Simulates a paragraph */}
      <View style={styles.demoGroup}>
        <Text style={styles.demoGroupLabel}>Paragraph</Text>
        <Skeleton width="100%" height={14} borderRadius={4} style={styles.mb6} />
        <Skeleton width="92%" height={14} borderRadius={4} style={styles.mb6} />
        <Skeleton width="78%" height={14} borderRadius={4} style={styles.mb6} />
        <Skeleton width="85%" height={14} borderRadius={4} />
      </View>

      {/* Simulates a button */}
      <View style={styles.demoGroup}>
        <Text style={styles.demoGroupLabel}>Button</Text>
        <Skeleton width={140} height={44} borderRadius={22} />
      </View>
    </DemoCard>
  );
}

// ─── Demo: Variants ───────────────────────────────────────────────────────────

function VariantsDemo() {
  const variants: Array<{
    variant: 'rect' | 'circle' | 'text' | 'rounded';
    label: string;
    desc: string;
    w: number | string;
    h: number;
  }> = [
    { variant: 'rect',    label: 'rect',    desc: 'Default rectangle',       w: 160, h: 48 },
    { variant: 'rounded', label: 'rounded', desc: 'Pill / card shape',        w: 160, h: 48 },
    { variant: 'text',    label: 'text',    desc: 'Auto-height text line',    w: 160, h: 14 },
    { variant: 'circle',  label: 'circle',  desc: 'Avatar / icon placeholder', w: 56, h: 56 },
  ];

  return (
    <DemoCard>
      <SectionTitle
        title="Shape Variants"
        subtitle="Pick a preset shape with the variant prop."
        code='variant="circle"'
      />
      {variants.map(({ variant, label, desc, w, h }) => (
        <View key={variant} style={styles.variantRow}>
          <Skeleton variant={variant} width={w} height={h} />
          <View style={styles.variantMeta}>
            <Text style={styles.variantName}>{`variant="${label}"`}</Text>
            <Text style={styles.variantDesc}>{desc}</Text>
          </View>
        </View>
      ))}
    </DemoCard>
  );
}

// ─── Demo: Animations ────────────────────────────────────────────────────────

function AnimationsDemo() {
  const anims: Array<{
    animation: 'shimmer' | 'pulse' | 'wave' | 'none';
    label: string;
    desc: string;
    color: string;
  }> = [
    { animation: 'shimmer', label: 'shimmer', desc: 'Light sweeps left → right',    color: '#6C63FF' },
    { animation: 'pulse',   label: 'pulse',   desc: 'Fade in / fade out loop',       color: '#10B981' },
    { animation: 'wave',    label: 'wave',    desc: 'Staggered pulse across items',  color: '#F59E0B' },
    { animation: 'none',    label: 'none',    desc: 'Static — no animation',         color: '#94A3B8' },
  ];

  return (
    <DemoCard>
      <SectionTitle
        title="Animation Modes"
        subtitle="Control motion or disable it entirely."
        code='animation="shimmer"'
      />
      {anims.map(({ animation, label, desc, color }) => (
        <View key={animation} style={styles.animRow}>
          <View style={styles.animLabelCol}>
            <View style={[styles.animDot, { backgroundColor: color }]} />
            <View>
              <Text style={styles.animName}>{label}</Text>
              <Text style={styles.animDesc}>{desc}</Text>
            </View>
          </View>
          <Skeleton animation={animation} width={120} height={20} borderRadius={6} />
        </View>
      ))}
    </DemoCard>
  );
}

// ─── Demo: Presets ────────────────────────────────────────────────────────────

function PresetsDemo() {
  return (
    <View>
      <SectionTitle
        title="Built-in Presets"
        subtitle="Drop these anywhere — no configuration needed."
      />

      <DemoCard style={styles.mb12}>
        <Text style={styles.presetTag}>CardSkeleton</Text>
        <CardSkeleton />
      </DemoCard>

      <DemoCard style={styles.mb12}>
        <Text style={styles.presetTag}>ListItemSkeleton × 3</Text>
        <ListItemSkeleton />
        <View style={styles.divider} />
        <ListItemSkeleton delay={80} />
        <View style={styles.divider} />
        <ListItemSkeleton delay={160} />
      </DemoCard>

      <DemoCard style={styles.mb12}>
        <Text style={styles.presetTag}>ProfileSkeleton</Text>
        <ProfileSkeleton />
      </DemoCard>

      <DemoCard style={styles.mb12}>
        <Text style={styles.presetTag}>ArticleSkeleton</Text>
        <ArticleSkeleton paragraphLines={4} />
      </DemoCard>
    </View>
  );
}

// ─── Demo: SkeletonGroup ──────────────────────────────────────────────────────

function GroupDemo() {
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setLoading((prev) => {
      if (prev) {
        // was loading → show content, then reset after 2.5 s
        timerRef.current = setTimeout(() => setLoading(true), 2500);
        return false;
      }
      return true;
    });
  }, []);

  return (
    <DemoCard>
      <SectionTitle
        title="SkeletonGroup"
        subtitle="Wraps children with staggered animation + fade-in when loaded."
        code="<SkeletonGroup loading stagger={90}>"
      />

      {/* Status pill */}
      <View style={[styles.statusPill, { backgroundColor: loading ? ACCENT_SOFT : '#ECFDF5' }]}>
        <View style={[styles.statusDot, { backgroundColor: loading ? ACCENT : '#10B981' }]} />
        <Text style={[styles.statusText, { color: loading ? ACCENT : '#10B981' }]}>
          {loading ? 'Loading…' : 'Content Ready ✓'}
        </Text>
      </View>

      <SkeletonGroup loading={loading} stagger={90}>
        <ListItemSkeleton />
        <View style={styles.divider} />
        <ListItemSkeleton />
        <View style={styles.divider} />
        <ListItemSkeleton />
      </SkeletonGroup>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: loading ? ACCENT : '#10B981' }]}
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>
          {loading ? '▶  Simulate Load Complete' : '↺  Reset to Loading'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.groupHint}>
        Tap the button to toggle between skeleton and real content states.
      </Text>
    </DemoCard>
  );
}

// ─── Demo: useSkeletonAnimation hook ─────────────────────────────────────────

function HookDemo() {
  const { animatedValue, shimmerStyle, pulseStyle } = useSkeletonAnimation({
    speed: 1000,
    animation: 'shimmer',
  });

  return (
    <DemoCard>
      <SectionTitle
        title="useSkeletonAnimation"
        subtitle="Use the raw hook to animate any custom shape."
        code="useSkeletonAnimation({ speed: 1000 })"
      />

      {/* Custom shape 1 — wide banner */}
      <Text style={styles.hookShapeLabel}>Custom banner shape</Text>
      <Animated.View style={[styles.customBanner, pulseStyle]}>
        <Animated.View style={[styles.customShimmerStrip, shimmerStyle(300)]} />
      </Animated.View>

      {/* Custom shape 2 — grid */}
      <Text style={[styles.hookShapeLabel, styles.mt12]}>Custom grid shapes</Text>
      <View style={styles.hookGrid}>
        {[0, 1, 2, 3].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.hookGridCell,
              pulseStyle,
              { opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4 + i * 0.1, 0.9],
                }),
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.hookInfoBox}>
        <Text style={styles.hookInfoTitle}>Hook returns:</Text>
        <Text style={styles.hookInfoLine}>{'• animatedValue   Animated.Value (0→1→0)'}</Text>
        <Text style={styles.hookInfoLine}>{'• shimmerStyle(w) translateX style for shimmer'}</Text>
        <Text style={styles.hookInfoLine}>{'• pulseStyle      opacity style for pulse'}</Text>
      </View>
    </DemoCard>
  );
}

// ─── Demo: Themes ─────────────────────────────────────────────────────────────

function ThemesDemo() {
  return (
    <View>
      <SectionTitle
        title="Theme System"
        subtitle="Wrap any tree with SkeletonThemeProvider."
        code='<SkeletonThemeProvider theme="dark">'
      />

      {/* Light (default) */}
      <DemoCard style={styles.mb12}>
        <Text style={styles.presetTag}>theme="light" (default)</Text>
        <CardSkeleton />
      </DemoCard>

      {/* Dark */}
      <SkeletonThemeProvider theme="dark">
        <View style={[styles.demoCard, styles.darkCard, styles.mb12]}>
          <Text style={[styles.presetTag, { color: '#A78BFA' }]}>theme="dark"</Text>
          <CardSkeleton />
          <View style={styles.mt12}>
            <ListItemSkeleton />
            <View style={[styles.divider, { backgroundColor: '#374151' }]} />
            <ListItemSkeleton delay={100} />
          </View>
        </View>
      </SkeletonThemeProvider>

      {/* Blue */}
      <SkeletonThemeProvider theme="blue">
        <View style={[styles.demoCard, styles.blueCard, styles.mb12]}>
          <Text style={[styles.presetTag, { color: '#3B82F6' }]}>theme="blue"</Text>
          <ProfileSkeleton avatarSize={64} bioLines={2} />
        </View>
      </SkeletonThemeProvider>

      {/* Custom */}
      <SkeletonThemeProvider
        theme={{ baseColor: '#FDE68A', highlightColor: '#FEF9C3' }}
      >
        <View style={[styles.demoCard, styles.warmCard]}>
          <Text style={[styles.presetTag, { color: '#D97706' }]}>
            theme={`{ baseColor: '#FDE68A', … }`}
          </Text>
          <Skeleton width="100%" height={16} style={styles.mb6} />
          <Skeleton width="80%" height={16} style={styles.mb6} />
          <Skeleton width="60%" height={16} />
        </View>
      </SkeletonThemeProvider>
    </View>
  );
}

// ─── Tab Bar ─────────────────────────────────────────────────────────────────

function TabBar({
  active,
  onPress,
}: {
  active: DemoSection;
  onPress: (s: DemoSection) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabBar}
      contentContainerStyle={styles.tabBarContent}
    >
      {SECTIONS.map(({ key, label, emoji }) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onPress(key)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabEmoji}>{emoji}</Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// ─── Inner App (child of SafeAreaProvider) ────────────────────────────────────
// ⚡ FIX: useSafeAreaInsets() MUST be called inside a child of SafeAreaProvider,
//        NOT in the same component that renders <SafeAreaProvider>.

function AppContent() {
  const [activeSection, setActiveSection] = useState<DemoSection>('basic');

  const renderSection = () => {
    switch (activeSection) {
      case 'basic':      return <BasicDemo />;
      case 'variants':   return <VariantsDemo />;
      case 'animations': return <AnimationsDemo />;
      case 'presets':    return <PresetsDemo />;
      case 'group':      return <GroupDemo />;
      case 'hook':       return <HookDemo />;
      case 'themes':     return <ThemesDemo />;
    }
  };

  const currentSection = SECTIONS.find((s) => s.key === activeSection)!;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={CARD_BG}
        translucent={false}
      />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerLogo}>✦</Text>
          <View>
            <Text style={styles.headerTitle}>skeleton-loading</Text>
            <Text style={styles.headerSub}>react-native · v1.0.0 · zero deps · TypeScript</Text>
          </View>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>MIT</Text>
        </View>
      </View>

      {/* ── Section breadcrumb ── */}
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbEmoji}>{currentSection.emoji}</Text>
        <Text style={styles.breadcrumbText}>{currentSection.label}</Text>
      </View>

      {/* ── Tab Bar ── */}
      <TabBar active={activeSection} onPress={setActiveSection} />

      {/* ── Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderSection()}

        <View style={styles.footer}>
          <Text style={styles.footerEmoji}>✨</Text>
          <Text style={styles.footerText}>react-native-skeleton-loading</Text>
          <Text style={styles.footerSub}>Made with ❤️ · MIT License</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
// SafeAreaProvider wraps AppContent — this is the correct pattern.

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: CARD_BG,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
    ...Platform.select({
      android: { elevation: 2 },
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
    }),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogo: {
    fontSize: 22,
    color: ACCENT,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 10,
    color: TEXT_MUTED,
    marginTop: 1,
    letterSpacing: 0.2,
  },
  headerBadge: {
    backgroundColor: ACCENT_SOFT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  headerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: ACCENT,
    letterSpacing: 0.5,
  },

  // ── Breadcrumb ──
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: BG,
  },
  breadcrumbEmoji: { fontSize: 13 },
  breadcrumbText: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ── Tab bar ──
  tabBar: {
    backgroundColor: CARD_BG,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
    flexGrow: 0,
  },
  tabBarContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    gap: 5,
  },
  tabActive: {
    backgroundColor: ACCENT,
  },
  tabEmoji: { fontSize: 12 },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_SECONDARY,
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // ── Scroll ──
  scroll: { flex: 1 },
  scrollContent: {
    padding: 14,
    paddingBottom: 48,
    gap: 0,
  },

  // ── Demo card ──
  demoCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    }),
  },
  darkCard: { backgroundColor: '#111827' },
  blueCard: { backgroundColor: '#EFF6FF' },
  warmCard: { backgroundColor: '#FFFBEB' },

  // ── Section header ──
  sectionHeader: { marginBottom: 18 },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 4,
    lineHeight: 17,
  },

  // ── Code badge ──
  codeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER,
  },
  codeBadgeText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#6C63FF',
    fontWeight: '500',
  },

  // ── Demo group (basic demo) ──
  demoGroup: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  demoGroupLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  // ── Variant rows ──
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  variantMeta: { flex: 1 },
  variantName: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: ACCENT,
    fontWeight: '600',
  },
  variantDesc: {
    fontSize: 11,
    color: TEXT_MUTED,
    marginTop: 2,
  },

  // ── Animation rows ──
  animRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  animLabelCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  animDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  animName: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  animDesc: {
    fontSize: 11,
    color: TEXT_MUTED,
    marginTop: 1,
  },

  // ── Preset tag ──
  presetTag: {
    fontSize: 10,
    fontWeight: '700',
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // ── Group demo ──
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  btn: {
    marginTop: 16,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  groupHint: {
    marginTop: 10,
    fontSize: 11,
    color: TEXT_MUTED,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // ── Hook demo ──
  hookShapeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  customBanner: {
    width: '100%',
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  customShimmerStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
  },
  hookGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  hookGridCell: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  hookInfoBox: {
    marginTop: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  hookInfoTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_SECONDARY,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hookInfoLine: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: TEXT_SECONDARY,
    marginBottom: 3,
    lineHeight: 17,
  },

  // ── Dividers ──
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: BORDER,
    marginVertical: 2,
  },

  // ── Spacing helpers ──
  mb6:  { marginBottom: 6 },
  mb8:  { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mt12: { marginTop: 12 },

  // ── Footer ──
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 4,
  },
  footerEmoji: { fontSize: 20 },
  footerText: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_SECONDARY,
    letterSpacing: -0.2,
  },
  footerSub: {
    fontSize: 11,
    color: TEXT_MUTED,
  },
});