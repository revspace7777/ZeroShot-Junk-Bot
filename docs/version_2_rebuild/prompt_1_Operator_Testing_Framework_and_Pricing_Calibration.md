# Phase 2 Mega-Prompt: Operator Testing Framework + Pricing Calibration

## CONTEXT

You are working inside the ZeroShot-Junk-Bot repository.

The system currently uses a deterministic pricing model:

total = max(itemSubtotal + basePrice, minimumPrice)

Where:
- itemSubtotal = sum of catalog item prices
- basePrice = zip-based constant
- minimumPrice = floor

The system is catalog-driven and does NOT use:
- volume estimation
- weight logic
- AI pricing

Fallback pricing must NOT be used.

---

## OBJECTIVE

Design and implement a system that enables:

1. Logging of generated quotes
2. Operator review of quotes
3. Structured feedback collection
4. Systematic pricing calibration

---

## REQUIREMENTS

### 1. Quote Logging System

Create:

/src/calibration/quoteLogger.ts

This module must log:

- timestamp
- input text
- extracted items
- item prices
- total price
- zip code

---

### 2. Operator Review Interface

Provide a simple CLI interface.

Operators must be able to:

- View quote details
- Answer:
  - Would you accept this job? (Y/N)
  - What should the correct price be?
  - What is wrong with this quote?

---

### 3. Feedback Storage

Create:

/data/operator-feedback.json

Schema:

{
  "quoteId": "",
  "accepted": true,
  "expectedPrice": 0,
  "notes": ""
}

---

### 4. Calibration Engine

Create:

/src/calibration/calibrationEngine.ts

Responsibilities:

- Analyze feedback data
- Identify items that are consistently mispriced
- Suggest adjustments to catalog item prices

---

### 5. Adjustment Rules

STRICT RULES:

- DO NOT modify pricing formula
- DO NOT introduce volume logic
- DO NOT introduce machine learning

ONLY adjust:
- Catalog item prices

---

### 6. Reporting

Generate:

/reports/pricing-adjustments.md

Include:

- Items needing adjustment
- Current price vs suggested price
- Frequency of complaints
- Confidence level

---

## OUTPUT REQUIREMENTS

- Clean, modular code
- Minimal dependencies
- Easy to run locally
- Clear separation of concerns

---

## SUCCESS CONDITION

System enables iterative loop:

input → quote → operator feedback → pricing refinement

---

## FINAL INSTRUCTION

Focus on building a reliable calibration loop.

Do NOT introduce additional complexity beyond what is specified.