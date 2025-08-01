# Travel Bookly Style Guide

This document summarizes the main UI guidelines and component structure used in the project. Colors and typography tokens come from `constants/Colors.ts`.

## 1. Global Structure
- **Bottom navigation** with four tabs: **Accueil**, **Cartes**, **Carnets**, and **Profil**. Active icons use the primary color while inactive icons use `textTertiary`.
- Each screen may display a **header** with a centered title and optional back button. The header background uses `surface` and bottom border `border`.
- The **main content area** hosts cards, lists or the map view. Components are arranged with generous spacing.

## 2. Color Palette
- `background` – `#FEF7E3` (app background)
- `surface` – `#FFE9C2` (cards, containers)
- `primary` – `#E79E4F` (CTA buttons, visited pins)
- `secondary` – `#FFD69B` (gradients and secondary accents)
- `visited` – `#E79E4F`
- `toVisit` – `#8DA88B`
- `favorite` – `#FFD700`
- `text` – `#3E2A1A`
- `textSecondary` – `#7F5C3E`
- `textTertiary` – `#B3A08A`
- `border` – `#E0C7A5`

These values are defined in [`constants/Colors.ts`](constants/Colors.ts).

## 3. Key Components
- **Primary button** – rounded, `primary` background, white text.
- **Summary card** – rounded corners, light shadow, `surface` background.
- **Journal/itinerary list items** – thumbnail on the left, title and date to the right, separated by a `border` divider.
- **Map component** – Google Maps with custom colors, colored pins (`visited`, `toVisit`, `favorite`) and dark callout.
- **Legend** – colored dots and labels displayed below the map.

## 4. Typography and Spacing
- Title fonts use weight `600`–`700` with sizes `24`–`28` (`Typography.h3` / `Typography.h2`).
- Secondary text (dates, subtitles) uses `14`–`16` size with weight `400`.
- Line height around `1.4` and horizontal/vertical margins between `16` and `24` (`Spacing.md`–`Spacing.lg`).

## 5. Interactions and States
- Tabs switch color between `primary` (active) and `textTertiary` (inactive).
- Tapping a map pin shows a custom callout with a dark background and rounded corners.
- Floating action button "`+`" uses the primary gradient and shadow for elevation.

Google Maps configuration is implemented in [`components/MapScreen.tsx`](components/MapScreen.tsx) using `PROVIDER_GOOGLE` with a warm-toned map style and interactive controls for zoom, reset and map type.
