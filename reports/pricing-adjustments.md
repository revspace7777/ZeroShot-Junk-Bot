# Pricing Calibration Report

> Generated: 2026-05-27T05:19:33.668Z

## Summary

| Metric | Value |
|--------|-------|
| Total feedback entries | 12 |
| Unique items reviewed | 13 |
| Items flagged for adjustment | 3 |
| Items within tolerance | 10 |
| Overall acceptance rate | 66.7% |

## Items Needing Adjustment

> [!WARNING]
> These items are consistently mispriced based on operator feedback.
> **Only catalog item prices should be adjusted** — do NOT change the pricing formula.

| Item | Current Price | Suggested Price | Δ | Reviews | Accept Rate | Confidence |
|------|--------------|-----------------|---|---------|-------------|------------|
| Refrigerator | $60.00 | $70.67 | +$10.67 | 3 | 33% | low |
| Couch / Loveseat | $30.00 | $39.25 | +$9.25 | 4 | 50% | low |
| Dresser | $30.00 | $35.33 | +$5.33 | 3 | 67% | low |

### Detailed Feedback

**Refrigerator** (8002)
- "Fridge removal is harder, need more"
- "Heavy appliances need premium"
- "Reasonable for volume"

**Couch / Loveseat** (7412)
- "Two items means more labor"
- "Should be higher with recliner"
- "Reasonable for volume"

**Dresser** (7979)
- "Two items means more labor"
- "Reasonable for volume"

## Items Within Tolerance

| Item | Current Price | Reviews | Accept Rate | Avg Δ | Confidence |
|------|--------------|---------|-------------|-------|------------|
| Mattress - Queen | $35.00 | 3 | 100% | +$0.00 | low |
| Washer | $30.00 | 2 | N/A | N/A | insufficient data |
| Dryer | $30.00 | 2 | N/A | N/A | insufficient data |
| Bed Base/Foundation - Twin | $25.00 | 1 | N/A | N/A | insufficient data |
| Loveseat - Reclining | $75.00 | 1 | N/A | N/A | insufficient data |
| Table - Coffee | $25.00 | 1 | N/A | N/A | insufficient data |
| Television | $50.00 | 2 | N/A | N/A | insufficient data |
| 1 Car Garage Cleanout | $500.00 | 1 | N/A | N/A | insufficient data |
| Stove | $40.00 | 1 | N/A | N/A | insufficient data |
| Dishwasher | $40.00 | 1 | N/A | N/A | insufficient data |

## Recommended Actions

1. Review the flagged items above with the operations team
2. For high-confidence suggestions, update prices in `data/items-catalog-new.json`
3. Re-run scenarios and collect more feedback to validate changes
4. For low-confidence items, collect more operator reviews before adjusting

---

*Thresholds: min 3 reviews, acceptance < 70% or |Δ| > $10*
