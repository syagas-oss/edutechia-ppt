---
version: alpha
name: EduTechIA Presentation
description: Visual identity for the EduTechIA interactive presentation app.
colors:
  primary: "#0B132B"
  secondary: "#1C2541"
  tertiary: "#5BC0BE"
  neutral: "#F7F9FC"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  on-tertiary: "#042A2B"
  on-neutral: "#111827"
typography:
  h1:
    fontFamily: "Inter"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: "Inter"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.015em
  body-md:
    fontFamily: "Inter"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: "Inter"
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.08em
rounded:
  sm: 6px
  md: 12px
  lg: 20px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-caps}"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
  card-surface:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-neutral}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

Clean, high-trust educational technology look: deep navy foundations, bright cyan
accent, generous whitespace, and clear typographic hierarchy for storytelling.

## Colors

The palette uses dark blue surfaces for authority and a single vibrant accent for
actions and highlights.

## Typography

Typography prioritizes readability in slides and responsive web layouts, with strong
headings and calm body text.

## Layout

Spacing scales in 8px-like increments to keep rhythm consistent across sections,
cards, and controls.

## Shapes

Corners are softly rounded to balance the technical feel with an approachable
education-focused tone.

## Components

Primary actions should use `button-primary`. Content containers and metrics blocks
should use `card-surface` as their base mapping.
