import { Palette, PaletteColor, TypeBackground } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number]: string;
    }

    interface Palette {
        tertiary: PaletteColor;
        accent: PaletteColor;
        success: PaletteColor;
        warning: PaletteColor;
    }

    interface TypeBackground {
        light: string;
    }
}

