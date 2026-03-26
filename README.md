# The Shifting Shape of American Income

Animated visualization of how US household income distribution has changed from 1971 to 2024, rendered as shareable video. Inspired by [Alan Smith's work at the Financial Times](https://www.ft.com/content/98ce14ee-99a6-11e5-95c7-d47aa298f769?syn-25a6b1a6=1) using Pew Research Center methodology.

![2024 income distribution with 1971 reference](https://github.com/FlorinPopaCodes/income-shift/releases/download/v1.0.0/landscape.mp4)

The distribution flattens and shifts right over 50 years: the middle class hollows out as households move into both lower and upper income tiers.

## What this does

A histogram of size-adjusted household income (in constant 2024 dollars) animates through 5-year snapshots from 1971 to 2024. A reference line preserves the 1971 shape for comparison. A shaded band tracks the "middle income" range as it shifts.

Output formats:
- **Landscape** (1920x1080) -- presentations, YouTube
- **Square** (1080x1080) -- Instagram, LinkedIn
- **Vertical** (1080x1920) -- Stories, TikTok, Reels

Rendered as MP4 and WebM via [Remotion](https://remotion.dev).

## Quick start

The repo includes pre-processed data (`video/src/data.json`), so you can preview immediately:

```bash
cd video
bun install
bun run dev          # opens Remotion Studio at localhost:3000
```

To render final videos:

```bash
bun run render.ts    # outputs MP4 + WebM for all 3 formats to ../output/
```

## Reprocessing from source data

If you want to regenerate the data from raw microdata:

1. Create an account at [IPUMS CPS](https://cps.ipums.org/cps/)
2. Create an extract with variables: `YEAR`, `SERIAL`, `MONTH`, `CPSID`, `ASECFLAG`, `HFLAG`, `ASECWTH`, `NUMPREC`, `HHINCOME`, `PERNUM`, `CPSIDP`, `CPSIDV`, `ASECWT`, `ASECWTCVD`, `AGE`
3. Select all ASEC samples (1972-2025)
4. Download the `.dat.gz` and `.xml` codebook into `ipums_extract/`
5. Run the processing script:

```bash
./process              # requires Python 3.10+ and uv
```

This reads the IPUMS extract, applies the methodology below, and writes `video/src/data.json`.

## Methodology

### Income measure

Total household income (`HHINCOME`), adjusted for household size using the square-root equivalence scale and expressed as a 3-person equivalent household, following Pew Research Center practice:

```
adjusted_income = household_income / sqrt(household_size) * sqrt(3)
```

Household-size medians are still computed per year using household-level weights (`ASECWTH`) and exported as diagnostics, but they do not affect the published income series.

After inflation adjustment, negative adjusted incomes are floored at $0 and treated as part of the first bar rather than shown as a separate negative-income range.

### Population

Adults age 18+, weighted by ASEC person supplement weights (`ASECWT`). For survey year 2020, the pipeline uses `ASECWTCVD` when available because IPUMS recommends it for COVID-era ASEC nonresponse adjustment.

For survey year 2014, only the redesigned income-question subsample (`HFLAG=1`) is used. That yields the point labeled 2013, which should be treated as a redesign break rather than a fully comparable continuation of the earlier series.

### Constant dollars

Deflated to 2024 dollars using the Census Bureau's hybrid price index:
- 1967-1977: CPI-U-X1
- 1978-1999: R-CPI-U-RS
- 2000-2024: C-CPI-U

Sources: [Census P-60/279](https://www2.census.gov/programs-surveys/demo/tables/p60/279/annual-index-value_annual-percent-change.xls), [FRED SUUR0000SA0](https://fred.stlouisfed.org/series/SUUR0000SA0).

### Binning

The x-axis uses a non-linear scale with four visual zones to show detail where the data is dense while still capturing the right tail:

| Zone | Income range | Bins | Bin width |
|------|-------------|------|-----------|
| 1 | $0 -- $70k | 14 | $5k |
| 2 | $70k -- $140k | 14 | $5k |
| 3 | $140k -- $280k | 14 | $10k |
| 4 | $280k -- $500k | 11 | $20k |
| Overflow | $500k+ | 1 | -- |

The y-axis shows **density** (% of adults per $1,000 of income). This ensures bar *area* is proportional to population share -- essential for visual accuracy when bins have different widths.

### Middle-income band

Defined as 2/3 to 2x the weighted median, following Pew Research Center methodology. Computed dynamically per year.

## Project structure

```
income-shift/
  process                    # Python data pipeline (standalone, uv shebang)
  video/
    src/
      data.json              # pre-processed distribution data (97KB)
      components/            # React/SVG chart components
      lib/                   # scales, interpolation, timeline, formatting
      layouts/               # responsive dimensions per format
    render.ts                # batch render script
  output/                    # rendered videos (gitignored)
```

## Data citation

Sarah Flood, Miriam King, Renae Rodgers, Steven Ruggles, J. Robert Warren, Daniel Backman, Etienne Breton, Grace Cooper, Julia A. Rivera Drew, Stephanie Richards, David Van Riper, and Kari C.W. Williams. IPUMS CPS: Version 13.0 [dataset]. Minneapolis, MN: IPUMS, 2025. https://doi.org/10.18128/D030.V13.0

## License

Code: MIT. Data: subject to [IPUMS terms of use](https://www.ipums.org/about/terms).
