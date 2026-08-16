from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


SPECS = {
    "contour-clay": {
        "page": 4,
        "box": (545, 205, 955, 920),
        "points": ((5, 58), (350, 0), (392, 13), (410, 707), (0, 685)),
    },
    "contour-stone": {
        "page": 5,
        "box": (420, 170, 700, 800),
        "points": ((7, 62), (260, 0), (275, 18), (275, 620), (5, 577)),
    },
    "contour-mist": {
        "page": 5,
        "box": (475, 950, 725, 1480),
        "points": ((9, 50), (232, 0), (246, 14), (246, 517), (8, 477)),
    },
    "erosion-sand": {
        "page": 6,
        "box": (570, 195, 990, 970),
        "points": (
            (141, 2), (195, 16), (223, 67), (276, 74), (324, 131),
            (344, 219), (381, 281), (397, 370), (375, 453), (401, 533),
            (362, 620), (308, 663), (275, 728), (210, 770), (151, 742),
            (108, 690), (61, 669), (20, 604), (14, 531), (35, 459),
            (15, 390), (38, 311), (56, 230), (76, 164), (102, 84),
        ),
    },
    "erosion-bloom": {
        "page": 7,
        "box": (385, 175, 700, 535),
        "points": (
            (78, 34), (117, 9), (154, 13), (177, 44), (229, 18),
            (273, 37), (298, 74), (300, 127), (281, 171), (307, 218),
            (284, 268), (244, 300), (196, 287), (156, 328), (108, 337),
            (62, 309), (45, 267), (18, 230), (21, 185), (42, 150),
            (29, 102), (48, 61),
        ),
    },
    "erosion-petal": {
        "page": 7,
        "box": (510, 940, 765, 1410),
        "points": (
            (93, 5), (141, 13), (163, 48), (202, 55), (236, 97),
            (244, 151), (228, 199), (249, 246), (234, 306), (205, 344),
            (180, 403), (130, 460), (83, 451), (50, 415), (44, 364),
            (18, 318), (25, 265), (11, 216), (31, 164), (39, 104),
            (60, 54),
        ),
    },
    "fluid-motion-sage": {
        "page": 8,
        "box": (420, 160, 660, 650),
        "points": (
            (94, 3), (145, 10), (179, 37), (203, 79), (218, 133),
            (219, 198), (229, 259), (217, 327), (201, 393), (173, 449),
            (132, 482), (87, 482), (51, 453), (27, 407), (17, 349),
            (23, 291), (9, 232), (18, 171), (29, 110), (52, 54),
        ),
    },
    "fluid-motion-drift": {
        "page": 8,
        "box": (470, 915, 730, 1475),
        "points": (
            (104, 4), (158, 12), (198, 44), (222, 91), (239, 150),
            (241, 219), (250, 286), (240, 353), (222, 425), (192, 490),
            (149, 542), (97, 554), (55, 521), (27, 468), (13, 405),
            (20, 335), (7, 270), (18, 200), (31, 132), (59, 66),
        ),
    },
    "balance-orbit": {"page": 9, "box": (420, 220, 955, 755), "shape": "ellipse"},
    "balance-arc": {
        "page": 10,
        "box": (110, 220, 505, 665),
        "points": ((0, 20), (367, 36), (390, 420), (15, 435)),
    },
    "balance-triad": {"page": 10, "box": (365, 970, 750, 1435), "shape": "ellipse"},
}


def mask_for(size: tuple[int, int], spec: dict) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    inset = 2
    if spec.get("shape") == "ellipse":
        draw.ellipse((inset, inset, size[0] - inset, size[1] - inset), fill=255)
    else:
        draw.polygon(spec["points"], fill=255)
    return mask.filter(ImageFilter.GaussianBlur(0.7))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("page_dir", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    for name, spec in SPECS.items():
        source = Image.open(args.page_dir / f"page-{spec['page']:02d}.png").convert("RGBA")
        crop = source.crop(spec["box"])
        crop.putalpha(mask_for(crop.size, spec))
        padding = max(14, round(max(crop.size) * .025))
        frame = Image.new("RGBA", (crop.width + padding * 2, crop.height + padding * 2), (0, 0, 0, 0))
        frame.alpha_composite(crop, (padding, padding))
        frame.save(args.output_dir / f"{name}.webp", "WEBP", quality=95, method=6)
        print(f"{name}: {frame.width}x{frame.height}")


if __name__ == "__main__":
    main()
