#!/usr/bin/env python3
"""
IQ Rest — generador de creatividades cuadradas para Facebook/Instagram (1080x1080).
Layout v1: foto a sangre completa + degradado + logo IQ Rest arriba-izq +
titular abajo-izq (SF Pro Heavy) + subtítulo. Sin botón ni URL.

Uso:
  python3 make_ad.py \
      --photo hero-cafe.webp \
      --out fb_ad_es.jpg \
      --headline "La web de tu|restaurante|y carta digital" \
      --sub "Pedidos, reservas y tu menú online,|creado en minutos."

Notas:
  - Las líneas se separan con "|" (cada segmento = una línea).
  - El logo es la baldosa IQ (iq_tile.png) + la palabra "Rest" en blanco.
    "Rest" NO se traduce (es la marca).
  - Fuente: SF Pro (system-ui del sitio iq-rest.com), no Arial.
  - Para cada idioma: cambiar solo --headline y --sub (traducción manual).
"""
import argparse, os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
TILE = os.path.join(HERE, "iq_tile.png")          # baldosa IQ extraída del logo
SF_PATH = "/System/Library/Fonts/SFNS.ttf"        # SF Pro (macOS)

S = 1080
AMBER = (245, 158, 11)
WHITE = (255, 255, 255)


def sf(sz, weight="Regular"):
    f = ImageFont.truetype(SF_PATH, sz)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def _grad_accent(img, x, y, w=150, h=10):
    """Gradient accent bar (matches the hero / buttons), rounded ends."""
    c0, c1 = (255, 73, 41), (249, 158, 31)
    bar = Image.new("RGB", (w, 1))
    for px in range(w):
        t = px / max(1, w - 1)
        bar.putpixel((px, 0), tuple(round(c0[k] + (c1[k] - c0[k]) * t) for k in range(3)))
    bar = bar.resize((w, h))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w, h], h // 2, fill=255)
    img.paste(bar, (x, y), mask)


# 9:16 vertical for Reels / Stories, built so the CENTER square (the middle
# 1080x1080) is identical in layout/margins to the square creative — crop the
# center and you get the square ad. The extra top/bottom is just the photo
# extended, which also keeps the copy clear of the platform UI rails.
SV_W, SV_H = 1080, 1920
OFF = (SV_H - S) // 2   # 420 — top of the centered square band


def build_story(photo_path, out_path, headline_lines, sub_lines, crop_x=0.5):
    # --- photo: crop to 9:16 cover; crop_x shifts the horizontal framing ---
    img = Image.open(photo_path).convert("RGB")
    w, h = img.size
    target = SV_W / SV_H
    cur = w / h
    if cur > target:
        nw = int(h * target)
        x0 = int((w - nw) * crop_x)
        img = img.crop((x0, 0, x0 + nw, h))
    else:
        nh = int(w / target)
        img = img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    img = img.resize((SV_W, SV_H), Image.LANCZOS)

    # --- gradient: same formulas as the square, mapped to the center band
    #     (local ly = y - OFF). Above the band keep the square's top edge tone,
    #     below keep the square's darkest bottom tone — so the center crop
    #     matches the square exactly and the extension blends seamlessly. ---
    black = Image.new("RGB", (SV_W, SV_H), (12, 9, 7))
    alpha = Image.new("L", (1, SV_H), 0)
    for y in range(SV_H):
        ly = y - OFF
        if ly < 0:
            a = 120  # keep the square's top-edge darken above the band
        elif ly >= S:
            a = 205
        else:
            bottom = 205 * (max(0.0, (ly - S * 0.30) / (S * 0.70)) ** 1.15)
            top = 120 * max(0.0, (S * 0.22 - ly) / (S * 0.22)) if ly < S * 0.22 else 0
            a = max(bottom, top)
        alpha.putpixel((0, y), int(a))
    img = Image.composite(black, img, alpha.resize((SV_W, SV_H)))

    d = ImageDraw.Draw(img)

    # --- brand lockup (same offsets as square, shifted into the band) ---
    tile = Image.open(TILE).convert("RGBA")
    ts = 80
    tile = tile.resize((ts, ts), Image.LANCZOS)
    bx, by = 58, 56 + OFF
    img.paste(tile, (bx, by), tile)
    d = ImageDraw.Draw(img)
    d.text((bx + ts + 18, by + ts / 2 - 2), "Rest", font=sf(52, "Heavy"), fill=WHITE, anchor="lm")

    # --- headline / accent / sub: identical math to build(), shifted by OFF ---
    hf = sf(88, "Heavy")
    lh = 98
    n = len(headline_lines)
    y = int(S * 0.46) - max(0, (n - 3)) * lh + OFF
    for ln in headline_lines:
        d.text((60, y), ln, font=hf, fill=WHITE)
        y += lh
    _grad_accent(img, 62, y + 14)
    d = ImageDraw.Draw(img)
    sfont = sf(36, "Regular")
    sy = y + 58
    for ln in sub_lines:
        d.text((60, sy), ln, font=sfont, fill=(238, 233, 228))
        sy += 46

    img.save(out_path, "JPEG", quality=92)
    print("saved", out_path, img.size)


def build(photo_path, out_path, headline_lines, sub_lines, crop_x=0.5):
    # --- foto: recorte cuadrado; crop_x desplaza el encuadre horizontal
    #     (0=izquierda, 0.5=centro, 1=derecha) ---
    img = Image.open(photo_path).convert("RGB")
    w, h = img.size
    side = min(w, h)
    x0 = int((w - side) * crop_x)
    y0 = (h - side) // 2
    img = img.crop((x0, y0, x0 + side, y0 + side)).resize((S, S), Image.LANCZOS)

    # --- degradado inferior (legibilidad) ---
    grad = Image.new("L", (1, S), 0)
    for y in range(S):
        t = max(0, (y - S * 0.30) / (S * 0.70))
        grad.putpixel((0, y), int(205 * t ** 1.15))
    black = Image.new("RGB", (S, S), (12, 9, 7))
    img = Image.composite(black, img, grad.resize((S, S)))
    # --- oscurecido superior suave (para el logo) ---
    topg = Image.new("L", (1, S), 0)
    for y in range(S):
        topg.putpixel((0, y), int(120 * max(0, (S * 0.22 - y) / (S * 0.22))) if y < S * 0.22 else 0)
    img = Image.composite(black, img, topg.resize((S, S)))

    d = ImageDraw.Draw(img)

    # --- marca: baldosa IQ + "Rest" ---
    tile = Image.open(TILE).convert("RGBA")
    ts = 80
    tile = tile.resize((ts, ts), Image.LANCZOS)
    bx, by = 58, 56
    img.paste(tile, (bx, by), tile)
    d = ImageDraw.Draw(img)
    d.text((bx + ts + 18, by + ts / 2 - 2), "Rest", font=sf(52, "Heavy"), fill=WHITE, anchor="lm")

    # --- titular (abajo-izq, equilibrado) ---
    hf = sf(88, "Heavy")
    lh = 98
    n = len(headline_lines)
    y = int(S * 0.46) - max(0, (n - 3)) * lh  # sube si hay >3 líneas
    for ln in headline_lines:
        d.text((60, y), ln, font=hf, fill=WHITE)
        y += lh

    # --- acento en degradado (mismo que la barra del hero / botones) ---
    bar_x, bar_y, bar_w, bar_h = 62, y + 14, 150, 10
    c0 = (255, 73, 41)   # hsl(9,100%,58%)
    c1 = (249, 158, 31)  # hsl(35,95%,55%)
    grad_bar = Image.new("RGB", (bar_w, 1))
    for px in range(bar_w):
        t = px / max(1, bar_w - 1)
        grad_bar.putpixel((px, 0), tuple(round(c0[k] + (c1[k] - c0[k]) * t) for k in range(3)))
    grad_bar = grad_bar.resize((bar_w, bar_h))
    # rounded ends via a rounded-rect mask
    mask = Image.new("L", (bar_w, bar_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, bar_w, bar_h], bar_h // 2, fill=255)
    img.paste(grad_bar, (bar_x, bar_y), mask)
    d = ImageDraw.Draw(img)

    # --- subtítulo ---
    sfont = sf(36, "Regular")
    sy = y + 58
    for ln in sub_lines:
        d.text((60, sy), ln, font=sfont, fill=(238, 233, 228))
        sy += 46

    img.save(out_path, "JPEG", quality=92)
    print("saved", out_path, img.size)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--photo", required=True, help="ruta a la foto de fondo")
    ap.add_argument("--out", required=True, help="archivo JPG de salida")
    ap.add_argument("--headline", required=True, help="líneas separadas por |")
    ap.add_argument("--sub", default="", help="líneas separadas por |")
    a = ap.parse_args()
    hl = [s for s in a.headline.split("|") if s != ""]
    sub = [s for s in a.sub.split("|") if s != ""] if a.sub else []
    build(a.photo, a.out, hl, sub)


if __name__ == "__main__":
    main()
