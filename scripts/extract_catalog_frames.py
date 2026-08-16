from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


FRAME_SPECS = {
    "contour-flow": {"page": 4, "box": (248, 458, 535, 989), "shape": "rect"},
    "erosion": {
        "page": 5,
        "box": (620, 325, 1075, 700),
        "shape": "polygon",
        "points": (
            (76, 69), (170, 48), (231, 79), (283, 59), (355, 68),
            (407, 117), (382, 176), (420, 232), (377, 290), (290, 300),
            (230, 342), (163, 321), (119, 271), (59, 272), (33, 216),
            (71, 164), (48, 111),
        ),
    },
    "fluid-motion": {
        "page": 6,
        "box": (820, 260, 1035, 660),
        "shape": "polygon",
        "points": (
            (90, 4), (150, 14), (190, 64), (207, 129), (195, 205),
            (212, 275), (191, 345), (151, 394), (85, 399), (35, 370),
            (14, 311), (20, 240), (11, 170), (30, 95), (51, 35),
        ),
    },
    "balance": {"page": 7, "box": (62, 545, 528, 1011), "shape": "ellipse"},
    "tidal-landscape": {"page": 8, "box": (170, 650, 390, 1175), "shape": "rect"},
    "lotus-bloom": {"page": 10, "box": (575, 140, 1085, 825), "shape": "ellipse"},
    "eclipse": {"page": 11, "box": (555, 232, 1074, 790), "shape": "ellipse"},
    "moon-phases": {"page": 12, "box": (555, 240, 1045, 390), "shape": "rect"},
    "mountain-mist": {"page": 13, "box": (570, 220, 1060, 470), "shape": "rect"},
    "sun-horizon": {"page": 14, "box": (508, 183, 1072, 895), "shape": "ellipse"},
    "nataraja": {"page": 16, "box": (410, 326, 725, 875), "shape": "ellipse"},
    "ganesha": {"page": 17, "box": (775, 240, 1070, 570), "shape": "ellipse"},
    "shiva": {"page": 18, "box": (585, 190, 830, 610), "shape": "ellipse"},
    "krishna": {"page": 19, "box": (650, 220, 820, 550), "shape": "rect"},
}


def make_mask(size: tuple[int, int], spec: dict) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    inset = 2
    if spec["shape"] == "ellipse":
        draw.ellipse((inset, inset, size[0] - inset, size[1] - inset), fill=255)
    elif spec["shape"] == "polygon":
        draw.polygon(spec["points"], fill=255)
    else:
        draw.rounded_rectangle(
            (inset, inset, size[0] - inset, size[1] - inset),
            radius=max(3, min(size) // 120),
            fill=255,
        )
    return mask.filter(ImageFilter.GaussianBlur(0.8))


def extract_frame(source: Image.Image, spec: dict) -> Image.Image:
    crop = source.crop(spec["box"]).convert("RGBA")
    crop.putalpha(make_mask(crop.size, spec))
    padding = max(18, round(max(crop.size) * 0.025))
    canvas = Image.new("RGBA", (crop.width + padding * 2, crop.height + padding * 2), (0, 0, 0, 0))
    canvas.alpha_composite(crop, (padding, padding))
    return canvas


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract clean HUEVOKE artwork frames from rendered catalog pages.")
    parser.add_argument("page_dir", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    for name, spec in FRAME_SPECS.items():
        source_path = args.page_dir / f"page-{spec['page']:02d}.png"
        source = Image.open(source_path).convert("RGB")
        frame = extract_frame(source, spec)
        frame.save(args.output_dir / f"{name}.webp", "WEBP", quality=94, method=6)
        print(f"{name}: {frame.width}x{frame.height}")


if __name__ == "__main__":
    main()
