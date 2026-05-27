# Agentic Junk Removal Checkout System — Master Strategy (MVP v1)

## Version
v1.0.0

## Purpose

This document defines:
- The true current state of the ZeroShot-Junk-Bot repository
- The corrected architectural direction
- The MVP scope and constraints
- The phased roadmap
- The rules for agent-driven development and versioning

This document is authoritative and must be version-controlled.

---

## 1. Ground Truth: Current Repository Reality

The repository implements a deterministic pricing system.

### Core Pricing Logic

From pricing-logic.js:

total = max(itemSubtotal + basePrice, minimumPrice)

Where:
- itemSubtotal = Σ (item.price × quantity)
- basePrice ≈ 59 (zip-derived, mostly static)
- minimumPrice ≈ 75
- fallback price exists (~30) for unknown items

---

## 2. Pricing Model Type

This is:
- Linear item-based pricing
- Catalog-driven

This is NOT:
- Volume-based pricing
- Weight-based pricing
- Truck utilization pricing

---

## 3. Catalog-Driven System

Pricing intelligence is embedded in the catalog.

Example pattern:
unitPrice = catalogItem.price || catalogItem.pickupPrice

---

## 4. Zip Code Logic

- Minimal variation
- Mostly constant base price
- No real geographic scaling

---

## 5. Critical Risk: Fallback Pricing

Current behavior:
if (!unitPrice) unitPrice = 30;

This must be removed.

---

## 6. Strategic Reframe

This system is NOT an AI pricing engine.

It is:
A deterministic catalog pricing calculator.

---

## 7. Core Insight

The hardest problem is:

Mapping messy user input → correct catalog items

NOT pricing math.

---

## 8. MVP Mandate

### Goal

Replicate functional behavior of LoadUp-style checkout using deterministic pricing and validate with real operators.

---

### Constraints

MVP MUST:
- Use existing pricing model (no new math)
- Be deterministic
- Be explainable
- Be operator-verifiable

---

### Out of Scope

DO NOT BUILD:
- Volume estimation
- Image/video processing
- AI pricing
- Protocol abstractions (MCP/UCP/ACP)
- Odoo integration

---

## 9. MVP System Architecture

### Components

1. Item Extraction Layer
   - Natural language → catalog items

2. Pricing Engine
   - Existing logic

3. Visual Receipt
   - Itemized breakdown

4. Confirmation Layer
   - User validation step

---

## 10. Required Fixes

### Remove fallback pricing

Replace:
unitPrice = 30

With:
Explicit clarification request

---

### Add ambiguity handling

System must detect vague input and request clarification.

---

## 11. Operator Validation System

### Purpose

Convert system into trusted pricing engine.

---

### Method

Collect:
- Operator acceptance (yes/no)
- Expected price
- Notes

---

### Adjustment Rule

ONLY adjust:
- Catalog item prices

DO NOT:
- Change pricing formula

---

## 12. Phased Roadmap

### Phase 1 — MVP
- Lock pricing engine
- Build item extraction
- Build confirmation UX
- Build visual receipt

---

### Phase 2 — Calibration
- Operator testing framework
- Pricing adjustments
- Catalog refinement

---

### Phase 3 — Image Input
- Image → item suggestions
- User confirmation

---

### Phase 4 — Volume Engine
- Object detection
- Size estimation
- Truck utilization

---

### Phase 5 — Hybrid System
- Combine catalog + volume pricing

---

## 13. Development Protocol

### Agent-Driven Development

All strategy docs must:
- Live in repo
- Be versioned
- Be immutable once committed

---

### Suggested Structure

/docs/
  /agent-strategy/
    master-plan-v1.md
    phase-1-spec.md
    phase-2-calibration.md
    /prompts/

---

### Versioning Policy

- v1.0.0 = baseline
- Increment for major changes

---

### Rollback Requirement

All prompts and plans must be:
- Reproducible
- Replayable
- Auditable

---

## 14. Definition of Success

### Users:
- Can describe junk naturally
- See correct item mapping

### Prices:
- Match operator expectations
- Are consistent

### Operators:
- Accept quotes
- Trust outputs

---

## 15. Final Principle

Do not add complexity until the deterministic system is validated.

Pricing correctness and user trust come before all architecture.