<div align="center">

<br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=6C63FF&height=120&section=header&text=react-native-shimmer-skeleton&fontSize=28&fontColor=ffffff&fontAlignY=38&desc=Beautiful%20%C2%B7%20Performant%20%C2%B7%20Zero%20Dependencies&descAlignY=60&descSize=14" width="100%" />

<br />

[![npm version](https://img.shields.io/npm/v/react-native-shimmer-skeleton?color=6C63FF&style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/react-native-shimmer-skeleton)
[![npm downloads](https://img.shields.io/npm/dm/react-native-shimmer-skeleton?color=10B981&style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/react-native-shimmer-skeleton)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Zero Deps](https://img.shields.io/badge/Dependencies-Zero-brightgreen?style=for-the-badge)](#installation)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=for-the-badge)](#)

<br />

> **Buttery smooth shimmer animations. Zero native code. Drop in anywhere.**

<br />

<!-- Replace with your actual GIF -->
<h2 align="center">Demo</h2>

<div align="center">
  <img src="https://github.com/balram-01/react-native-shimmer-skeleton/raw/main/assets/demo.gif" width="250" alt="Skeleton Loading Demo" />
</div>

<br /><br />

</div>

---

## ✦ Why this library?

Most skeleton libraries make you install `react-native-linear-gradient`, add native linking, and write every placeholder from scratch. This library does none of that.

| | **react-native-shimmer-skeleton** | Others |
|---|:---:|:---:|
| Zero external dependencies | ✅ | ❌ Usually needs linear-gradient |
| `useNativeDriver: true` always | ✅ | ⚠️ Often JS thread |
| 100% TypeScript | ✅ | ⚠️ Partial |
| Shape presets (`circle`, `text`, `rounded`) | ✅ | ⚠️ Rect only |
| Built-in layouts (Card, List, Profile, Article) | ✅ | ❌ |
| Theme system (light / dark / blue / custom) | ✅ | ⚠️ Basic |
| Staggered `SkeletonGroup` | ✅ | ❌ |
| Shimmer in all 4 directions | ✅ | ❌ LTR only |
| Respects OS Reduce Motion | ✅ | ❌ |

---

## 📦 Installation

```bash
# npm
npm install react-native-shimmer-skeleton

# yarn
yarn add react-native-shimmer-skeleton
```

> **No additional setup required.** No linking. No Pods. No Gradle changes.
> Pure JavaScript/TypeScript — works out of the box.

---

## ⚡ Quick Start

```tsx
import { Skeleton } from 'react-native-shimmer-skeleton';

export function ArticleCard() {
  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Skeleton width="100%" height={180} borderRadius={12} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </View>
  );
}
```

That's it. No context providers needed for basic usage.

---

## 📖 Examples

### Basic shapes

```tsx
// Rectangle
<Skeleton width={200} height={20} />
<Skeleton width="80%" height={16} />

// With custom border radius
<Skeleton width="100%" height={120} borderRadius={12} />
```

### Circle avatar

```tsx
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="circle" width={88} height={88} />
```

### Text block

```tsx
<Skeleton variant="text" width="90%" />
<Skeleton variant="text" width="75%" />
<Skeleton variant="text" width="60%" />
```

> `variant="text"` auto-sets `height: 14` and `borderRadius: 4`. No need to specify.

### Drop-in preset layouts

Stop building the same skeletons over and over. Use a preset:

```tsx
import {
  CardSkeleton,
  ListItemSkeleton,
  ProfileSkeleton,
  ArticleSkeleton,
} from 'react-native-shimmer-skeleton';

// Image card with title, subtitle, and badge
<CardSkeleton />

// Avatar row with two text lines
<ListItemSkeleton />

// Centered profile with buttons
<ProfileSkeleton avatarSize={88} />

// Hero image, author row, and paragraph lines
<ArticleSkeleton paragraphLines={6} />
```

### SkeletonGroup — stagger + fade-in

Wrap your list in `SkeletonGroup` and get staggered shimmer and a smooth fade-in when content loads — for free.

```tsx
import { SkeletonGroup, ListItemSkeleton } from 'react-native-shimmer-skeleton';

function Feed({ isLoading, posts }) {
  return (
    <SkeletonGroup loading={isLoading} stagger={80}>
      {isLoading ? (
        <>
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
        </>
      ) : (
        posts.map(post => <PostRow key={post.id} post={post} />)
      )}
    </SkeletonGroup>
  );
}
```

When `loading` flips to `false`, your real content fades in automatically.

### Animation modes

```tsx
<Skeleton animation="shimmer" />  // Light sweeps left → right (default)
<Skeleton animation="pulse"   />  // Breathing opacity effect
<Skeleton animation="wave"    />  // Staggered pulse (best inside SkeletonGroup)
<Skeleton animation="none"    />  // Static — useful with custom logic
```

### Shimmer direction

```tsx
<Skeleton direction="ltr" />   // ← → default
<Skeleton direction="rtl" />   // → ← (Arabic / RTL layouts)
<Skeleton direction="ttb" />   // ↓ top to bottom
<Skeleton direction="btt" />   // ↑ bottom to top
```

### Theme system

```tsx
import { SkeletonThemeProvider } from 'react-native-shimmer-skeleton';

// Built-in themes
<SkeletonThemeProvider theme="dark">
  <MyScreen />
</SkeletonThemeProvider>

// Custom colors
<SkeletonThemeProvider theme={{ baseColor: '#1a1a2e', highlightColor: '#16213e' }}>
  <MyScreen />
</SkeletonThemeProvider>
```

### Auto dark mode

```tsx
import { useColorScheme } from 'react-native';
import { SkeletonThemeProvider } from 'react-native-shimmer-skeleton';

function App() {
  const colorScheme = useColorScheme();
  return (
    <SkeletonThemeProvider theme={colorScheme === 'dark' ? 'dark' : 'light'}>
      <NavigationContainer>
        {/* rest of your app */}
      </NavigationContainer>
    </SkeletonThemeProvider>
  );
}
```

### `useSkeletonAnimation` — custom shapes

Need a skeleton that doesn't fit any preset? Drive your own `Animated.View` with the raw hook:

```tsx
import { useSkeletonAnimation } from 'react-native-shimmer-skeleton';

function DiamondSkeleton() {
  const { pulseStyle, shimmerStyle } = useSkeletonAnimation({ speed: 900 });

  return (
    <Animated.View style={[styles.diamond, pulseStyle]}>
      <Animated.View style={[styles.shimmer, shimmerStyle(containerWidth)]} />
    </Animated.View>
  );
}
```

---

## 📋 API Reference

### `<Skeleton />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `number \| string` | `'100%'` | Width of the skeleton |
| `height` | `number \| string` | `16` | Height of the skeleton |
| `borderRadius` | `number` | variant-dependent | Corner radius |
| `variant` | `'rect' \| 'circle' \| 'text' \| 'rounded'` | `'rect'` | Shape preset |
| `animation` | `'shimmer' \| 'pulse' \| 'wave' \| 'none'` | `'shimmer'` | Animation style |
| `speed` | `number` | `1400` | Animation duration (ms) |
| `delay` | `number` | `0` | Start delay (ms) |
| `direction` | `'ltr' \| 'rtl' \| 'ttb' \| 'btt'` | `'ltr'` | Shimmer travel direction |
| `baseColor` | `string` | `'#E2E8F0'` | Background / base color |
| `highlightColor` | `string` | `'#F8FAFC'` | Shimmer highlight color |
| `style` | `StyleProp<ViewStyle>` | — | Extra styles |
| `testID` | `string` | — | Testing identifier |

---

### `<SkeletonGroup />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `loading` | `boolean` | **required** | Show skeletons when `true`, real content when `false` |
| `stagger` | `number` | `100` | Delay (ms) between each child |
| `children` | `ReactNode` | **required** | Skeleton or real content |
| `style` | `StyleProp<ViewStyle>` | — | Wrapper styles |

---

### `<SkeletonThemeProvider />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark' \| 'blue' \| 'purple' \| 'warm' \| { baseColor, highlightColor }` | `'light'` | Theme name or custom colors object |
| `children` | `ReactNode` | **required** | — |

---

### `useSkeletonAnimation(options)`

```ts
useSkeletonAnimation(options?: {
  speed?: number;       // default 1400
  delay?: number;       // default 0
  animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt';
}): {
  animatedValue: Animated.Value;          // raw value cycling 0 → 1
  shimmerStyle: (width: number) => ViewStyle;  // translateX style
  pulseStyle: ViewStyle;                  // opacity style
  isAnimating: boolean;
}
```

---

### Preset props

<details>
<summary><strong>CardSkeleton</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `showImage` | `boolean` | `true` |
| `lines` | `number` | `3` |
| `animation` | `AnimationType` | `'shimmer'` |
| `speed` | `number` | `1400` |
| `delay` | `number` | `0` |

</details>

<details>
<summary><strong>ListItemSkeleton</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `avatarSize` | `number` | `48` |
| `showAction` | `boolean` | `true` |
| `animation` | `AnimationType` | `'shimmer'` |
| `delay` | `number` | `0` |

</details>

<details>
<summary><strong>ProfileSkeleton</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `avatarSize` | `number` | `88` |
| `showButtons` | `boolean` | `true` |
| `bioLines` | `number` | `2` |
| `animation` | `AnimationType` | `'shimmer'` |

</details>

<details>
<summary><strong>ArticleSkeleton</strong></summary>

| Prop | Type | Default |
|---|---|---|
| `showHero` | `boolean` | `true` |
| `showAuthor` | `boolean` | `true` |
| `paragraphLines` | `number` | `6` |
| `animation` | `AnimationType` | `'shimmer'` |

</details>

---

### Built-in themes

```ts
import { themes } from 'react-native-shimmer-skeleton';

themes.light   // #E2E8F0 / #F8FAFC  — default, works on white
themes.dark    // #2A2A2A / #3D3D3D  — dark surfaces
themes.blue    // #C8D8E8 / #E8F0F8  — cool blue tones
themes.purple  // #D8C8E8 / #EDE8F8  — soft purple
themes.warm    // #E8DDD0 / #F5EFE8  — warm neutral
```

---

## 🏗 Project structure

```
src/
├── index.tsx                   Public API — import everything from here
├── types.ts                    Shared TypeScript interfaces
├── Skeleton.tsx                Core component
├── SkeletonGroup.tsx           Stagger wrapper + fade-in on load
├── useSkeletonAnimation.ts     Animation logic hook
├── themes/
│   └── index.ts                Theme presets, context, SkeletonThemeProvider
├── utils/
│   └── getVariantStyles.ts     variant → ViewStyle mapper
└── presets/
    ├── CardSkeleton.tsx
    ├── ListItemSkeleton.tsx
    ├── ProfileSkeleton.tsx
    ├── ArticleSkeleton.tsx
    └── index.ts
```

---

## ⚡ Performance

Every animation runs on the **UI thread** — never the JavaScript thread.

- `useNativeDriver: true` on every `Animated` call
- `Animated.Value` refs use `useRef`, not `useState` — no re-renders
- All components wrapped in `React.memo`
- Respects OS **Reduce Motion** via `AccessibilityInfo.isReduceMotionEnabled()`
- Zero bridge traffic per animation frame

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

```bash
git clone https://github.com/balram-01/react-native-shimmer-skeleton.git
cd react-native-shimmer-skeleton
yarn install

# Run the example app
cd example && yarn install
yarn example ios       # iOS simulator
yarn example android   # Android emulator
```

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

---

## 📄 License

MIT © [Balram](https://github.com/balram-01)

<br />

<div align="center">

If this saved you time, consider giving it a ⭐ on GitHub — it helps others find it.

<br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=6C63FF&height=80&section=footer" width="100%" />

</div># react-native-shimmer-skeleton
