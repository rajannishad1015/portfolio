"""
Strip the baked-in checkerboard background from a portrait PNG.

The supplied image is RGB: the "transparency" is a grey checkerboard painted
into the pixels. This script

  1. measures the two checkerboard greys from the image corners,
  2. marks every neutral (grey) pixel that falls in either grey's range,
  3. keeps only the connected background that touches the image border, so
     grey tones inside the artwork are never punched out,
  4. makes that background transparent,
  5. crops to the artwork, pads it, and writes an optimised PNG.
"""

import sys
from collections import Counter

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = sys.argv[1]
DST = sys.argv[2]
TOL = 15
OUT_WIDTH = 820
PAD = 0.05

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.int16)
h, w, _ = a.shape

# --- 1. The two checkerboard greys, sampled from the corners -------------
samples = []
for box in [(0, 0, 90, 90), (w - 90, 0, w, 90), (0, h - 90, 90, h), (w - 90, h - 90, w, h)]:
    patch = a[box[1] : box[3], box[0] : box[2], 0].ravel()
    samples.extend(int(v) for v in patch)

buckets = Counter(round(v / 5) * 5 for v in samples)
greys: list[int] = []
for value, _ in buckets.most_common(10):
    if all(abs(value - g) > 25 for g in greys):
        greys.append(value)
    if len(greys) == 2:
        break
if len(greys) < 2:
    raise SystemExit(f"could not find two checkerboard greys, got {greys}")

# The two cell tones are not flat — each cell ramps slightly and the
# anti-aliased edges land between the peaks. Allow a generous window
# around each peak; the flood fill below is what protects the artwork.
ranges = [
    (greys[0] - 32, greys[0] + 32),
    (greys[1] - 22, greys[1] + 22),
]
ranges.sort()

# --- 2. Mark pixels that fall in either grey's range ----------------------
grey = a[:, :, 0]
in_light = (grey >= ranges[0][0]) & (grey <= ranges[0][1])
in_dark = (grey >= ranges[1][0]) & (grey <= ranges[1][1])

# Only neutral pixels, so warm illustration tones are never mistaken for
# background.
neutral = (np.abs(a[:, :, 0] - a[:, :, 1]) <= 10) & (
    np.abs(a[:, :, 1] - a[:, :, 2]) <= 10
)
candidate = (in_light | in_dark) & neutral

# --- 3. Keep the connected background that touches the border ------------
labels, count = ndimage.label(candidate)
if count == 0:
    raise SystemExit("no checkerboard found")

border = np.concatenate(
    [labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]]
)
border_ids = {int(v) for v in border if v > 0}
background = np.isin(labels, list(border_ids))

# Despeckle: background-coloured pixels that never joined the main
# background are leftovers of the checkerboard's anti-aliased edges.
sizes = ndimage.sum(candidate, labels, index=np.arange(1, count + 1))
tiny = {index + 1 for index, size in enumerate(sizes) if size < 40}
if tiny:
    background = background | (np.isin(labels, list(tiny)) & candidate)

# --- 4. Write the result --------------------------------------------------
out = np.dstack([a.astype(np.uint8), (~background * 255).astype(np.uint8)])
result = Image.fromarray(out, "RGBA")

bbox = result.getbbox()
if bbox:
    result = result.crop(bbox)

if result.width > OUT_WIDTH:
    height = round(result.height * OUT_WIDTH / result.width)
    result = result.resize((OUT_WIDTH, height), Image.LANCZOS)

# A little transparent padding so the artwork's own outline survives the
# organic clip of the portrait frame.
pad = round(result.width * PAD)
padded = Image.new("RGBA", (result.width + pad * 2, result.height + pad * 2), (0, 0, 0, 0))
padded.paste(result, (pad, pad), result)
padded.save(DST, "PNG", optimize=True)
webp = DST.rsplit(".", 1)[0] + ".webp"
padded.save(webp, "WEBP", quality=88, method=6)
print(
    f"greys={greys} ranges={ranges} removed={int(background.sum())}px -> "
    f"{padded.size[0]}x{padded.size[1]} saved to {DST} and {webp}"
)
