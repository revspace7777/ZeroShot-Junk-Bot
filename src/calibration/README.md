# Calibration System

Operator testing framework for validating and refining catalog pricing.

## Overview

This system implements the calibration loop:

```
input → quote → operator feedback → pricing refinement
```

All pricing adjustments target **catalog item prices only**. The pricing formula (`total = max(itemSubtotal + basePrice, minimumPrice)`) is locked and must NOT be changed.

## Tools

### 1. Scenario Runner

Generates test quotes from predefined scenarios and logs them for operator review.

```bash
npm run scenarios
# or: node src/calibration/scenarioRunner.js
```

**Output:** Appends to `data/quote-log.jsonl`, prints summary table.

### 2. Operator Review CLI

Interactive CLI for operators to review quotes and provide structured feedback.

```bash
npm run review
# or: node src/calibration/operatorReview.js
```

**For each quote, the operator answers:**
- Would you accept this job at this price? (Y/N)
- What should the correct price be?
- Notes (optional)

**Output:** Appends to `data/operator-feedback.jsonl`

### 3. Calibration Engine

Analyzes accumulated feedback and identifies mispriced items.

```bash
npm run calibrate
# or: node src/calibration/calibrationEngine.js
```

**Output:** Generates `reports/pricing-adjustments.md` with:
- Items needing adjustment (current price vs. suggested)
- Acceptance rates and confidence levels
- Detailed operator notes

## Data Files

| File | Format | Purpose |
|------|--------|---------|
| `data/quote-log.jsonl` | JSON Lines | Append-only log of all generated quotes |
| `data/operator-feedback.jsonl` | JSON Lines | Append-only log of operator reviews |
| `reports/pricing-adjustments.md` | Markdown | Auto-generated calibration report |

## Workflow

1. **Generate quotes:** `npm run scenarios`
2. **Collect feedback:** `npm run review`
3. **Analyze results:** `npm run calibrate`
4. **Review report:** Open `reports/pricing-adjustments.md`
5. **Update catalog:** Edit `data/items-catalog-new.json` for flagged items
6. **Repeat** until operator acceptance rates stabilize

## Flagging Thresholds

Items are flagged for adjustment when:
- Acceptance rate < 70%, OR
- Average price delta > ±$10
- Minimum 3 reviews required before flagging

## Running Tests

```bash
npm test
# or: node --test tests/pricing/pricingEngine.test.js
```
