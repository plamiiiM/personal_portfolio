// Sticky-note layout of the skillset section, taken from the Figma design
// (page "Second iteration", frame "main"). Sizes are Figma px, converted to rem when rendered.
//
// Every box is { x, y, w, h, rotate }: position and size before rotation, relative to its
// parent (the cluster for titles and notes, the note for its layers), then rotated in degrees
// around its centre. Images live in public/skillset/.
//
// The cluster titles are in both languages ({ en, bg }); the Bulgarian words are wider, so their pen strokes are
// drawn longer to match. The sticky notes stay in English in both: they're the industry's names for the skills
// and tools, and their pen strokes are drawn around those words.

export const SKILL_CLUSTERS = [
  {
    id: "design",
    height: 678.4,
    title: {
      en: [
        { type: "text", text: "DESIGN", font: "poppins", weight: 300, fontSize: 49.1, x: 671, y: 274.9, w: 189, h: 74.3 },
        { type: "image", src: "title_design_underline.svg", x: 670.9, y: 352.5, w: 189, h: 9.8, rotate: -1.4 },
      ],
      bg: [
        { type: "text", text: "ДИЗАЙН", font: "poppins", weight: 300, fontSize: 49.1, x: 640, y: 274.9, w: 250, h: 74.3 },
        { type: "image", src: "title_design_underline.svg", x: 642, y: 352.5, w: 245, h: 9.8, rotate: -1.4 },
      ],
    },
    notes: [
      {
        label: "Adobe After Effects",
        x: 967.4, y: 326.4,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 14.7, y: 36.7, w: 204.8, h: 195.9, rotate: -15 },
          { type: "image", src: "note_yellow.png", x: 26.8, y: 16.6, w: 195.5, h: 203.9, rotate: -10.8 },
          { type: "text", text: "Adobe After\nEffects", x: 34.8, y: 98, w: 189.8, h: 53.9, rotate: -9.7 },
        ],
      },
      {
        label: "Adobe InDesign",
        x: 900.1, y: 37.8,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: -0.7, y: 28.7, w: 204.4, h: 195.6, rotate: 3.3 },
          { type: "image", src: "note_pink.png", x: -3.1, y: 11.2, w: 224, h: 224, rotate: 7.4 },
          { type: "text", text: "Adobe\nInDesign", x: 20.6, y: 87.4, w: 188.5, h: 53.9, rotate: 19.8 },
          { type: "image", src: "line_indesign.svg", x: 28.3, y: 136.6, w: 139.4, h: 2.6, rotate: 16.4 },
          { type: "image", src: "line_indesign_2.svg", x: 46.8, y: 147.2, w: 139.4, h: 0.9, rotate: 16.4 },
        ],
      },
      {
        label: "Adobe Illustrator",
        x: 374.7, y: 0,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 24.6, y: 52, w: 229.6, h: 219.6, rotate: -22.3 },
          { type: "image", src: "note_blue.png", x: 35.7, y: 28.5, w: 219.1, h: 228.5, rotate: -18.2 },
          { type: "text", text: "Adobe\nIllustrator", x: 46.1, y: 113.5, w: 213.1, h: 53.9, rotate: -13.1 },
          { type: "image", src: "line_illustrator.svg", x: 71.6, y: 168.9, w: 157.7, h: 3, rotate: -16.4 },
          { type: "image", src: "line_illustrator_2.svg", x: 95.1, y: 167.8, w: 157.7, h: 1, rotate: -16.4 },
        ],
      },
      {
        label: "Adobe Photoshop",
        x: 608.3, y: 432.4,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 19.3, y: 41.8, w: 191.5, h: 183.2, rotate: -20.9 },
          { type: "image", src: "note_blue.png", x: 29, y: 22.3, w: 182.8, h: 190.7, rotate: -16.7 },
          { type: "text", text: "Adobe\nPhotoshop", x: 33, y: 81.5, w: 177.8, h: 53.9, rotate: -15.7 },
          { type: "image", src: "line_photoshop.svg", x: 58.5, y: 144.2, w: 131.6, h: 2.5, rotate: -15 },
          { type: "image", src: "line_photoshop_2.svg", x: 78.2, y: 143.8, w: 131.6, h: 0.8, rotate: -15 },
        ],
      },
      {
        label: "Figma",
        x: 228, y: 324.9,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 10.3, y: 40.2, w: 223.3, h: 213.6, rotate: 10.6 },
          { type: "image", src: "note_pink.png", x: 8, y: 22.1, w: 244.7, h: 244.7, rotate: 14.7 },
          { type: "image", src: "ellipse_figma.svg", x: 54.3, y: 98.5, w: 158.9, h: 70.6, rotate: 17.7 },
          { type: "text", text: "Figma", x: 93.8, y: 122.4, w: 92, h: 27, rotate: 8.1 },
        ],
      },
    ],
  },
  {
    id: "ux-ui",
    height: 749.7,
    title: {
      en: [
        { type: "text", text: "UX/ UI DESIGN", font: "poppins", weight: 300, fontSize: 45, x: 580.8, y: 250.3, w: 369, h: 204 },
        { type: "image", src: "title_ux_squiggle.svg", x: 600.4, y: 403.7, w: 329.7, h: 54.6, rotate: -2.8 },
      ],
      bg: [
        { type: "text", text: "UX/UI ДИЗАЙН", font: "poppins", weight: 300, fontSize: 45, x: 560, y: 250.3, w: 410, h: 204 },
        { type: "image", src: "title_ux_squiggle.svg", x: 579, y: 403.7, w: 371, h: 54.6, rotate: -2.8 },
      ],
    },
    notes: [
      {
        label: "Researching",
        x: 643.8, y: 0,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: -3.8, y: 24.7, w: 225.9, h: 216.1, rotate: -1.5 },
          { type: "image", src: "note_yellow.png", x: 13.4, y: 4.9, w: 215.6, h: 224.8, rotate: 2.7 },
          { type: "text", text: "Researching", x: 23.3, y: 117.5, w: 195.7, h: 27, rotate: 4.5 },
          { type: "image", src: "ellipse_note.svg", x: 17.3, y: 94.3, w: 200.9, h: 69.2, rotate: 1.7 },
        ],
      },
      {
        label: "Wireframing / Prototyping",
        x: 1001.7, y: 34.3,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 10.2, y: 34.3, w: 245.1, h: 234.4, rotate: -9.8 },
          { type: "image", src: "note_pink.png", x: 6.2, y: 11.4, w: 268.5, h: 268.5, rotate: -5.7 },
          { type: "text", text: "Wireframing", x: 26.9, y: 97.7, w: 211.1, h: 27, rotate: -8.8 },
          { type: "text", text: "Prototyping", x: 41.8, y: 168.4, w: 211.1, h: 27, rotate: -7 },
          { type: "image", src: "line_wireframing.svg", x: 57.9, y: 142.3, w: 156.2, h: 3, rotate: -8 },
        ],
      },
      {
        label: "Gamification",
        x: 93.1, y: 283.2,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 10.1, y: 44.9, w: 257.1, h: 245.9, rotate: 9.5 },
          { type: "image", src: "note_blue.png", x: 32.8, y: 25.3, w: 245.4, h: 255.9, rotate: 13.6 },
          { type: "text", text: "Gamification", x: 41.2, y: 141.3, w: 230.6, h: 27, rotate: 10.7 },
          { type: "image", src: "line_gamification.svg", x: 55.2, y: 188.2, w: 170.6, h: 3.2, rotate: 11.5 },
          { type: "image", src: "line_gamification_2.svg", x: 78.7, y: 199.2, w: 170.6, h: 1.1, rotate: 11.5 },
        ],
      },
      {
        label: "User Testing",
        x: 1129.1, y: 298,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 4.4, y: 29, w: 269.9, h: 258.2, rotate: -6 },
          { type: "image", src: "note_blue.png", x: 23.5, y: 4.2, w: 257.7, h: 268.7, rotate: -1.9 },
          { type: "text", text: "User Testing", x: 56.9, y: 126.2, w: 192, h: 27, rotate: -7.4 },
        ],
      },
      {
        label: "Journey Mapping",
        x: 847.5, y: 526,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 5, y: 27.5, w: 163.8, h: 156.7, rotate: 8.2 },
          { type: "image", src: "note_green.png", x: 19.3, y: 14.8, w: 156.4, h: 163.1, rotate: 12.3 },
          { type: "text", text: "Journey\nMapping", x: 20.7, y: 70.1, w: 146.1, h: 53.9, rotate: 7.2 },
        ],
      },
      {
        label: "Design Systems",
        x: 261.1, y: 52.3,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 8.8, y: 29.6, w: 212, h: 202.8, rotate: -9.8 },
          { type: "image", src: "note_pink.png", x: 5.3, y: 9.8, w: 232.3, h: 232.3, rotate: -5.7 },
          { type: "text", text: "Design\nSystems", x: 59.1, y: 89.5, w: 127, h: 53.9, rotate: -10.3 },
          { type: "image", src: "ellipse_note.svg", x: 18.6, y: 75.3, w: 200.9, h: 69.2, rotate: -23.6 },
        ],
      },
      {
        label: "Interaction Design",
        x: 460.2, y: 507,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 7.9, y: 28.7, w: 214.8, h: 205.4, rotate: -9.1 },
          { type: "image", src: "note_yellow.png", x: 22.3, y: 8.5, w: 205, h: 213.8, rotate: -5 },
          { type: "text", text: "Interaction\nDesign", x: 28.2, y: 82.8, w: 192.1, h: 53.9, rotate: -8.1 },
        ],
      },
    ],
  },
  {
    id: "development",
    height: 771.8,
    title: {
      en: [
        { type: "text", text: "DEVELOPMENT", font: "poppins", weight: 300, fontSize: 45, x: 561.8, y: 242.2, w: 369, h: 204 },
        { type: "image", src: "title_development_ellipse.svg", x: 555.2, y: 262.7, w: 333.2, h: 159.7, rotate: -8.7 },
      ],
      bg: [
        { type: "text", text: "РАЗРАБОТКА", font: "poppins", weight: 300, fontSize: 45, x: 561.8, y: 242.2, w: 369, h: 204 },
        { type: "image", src: "title_development_ellipse.svg", x: 555.2, y: 262.7, w: 333.2, h: 159.7, rotate: -8.7 },
      ],
    },
    notes: [
      {
        label: "HTML",
        x: 965.7, y: 336.8,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 10.9, y: 36.6, w: 261.3, h: 250, rotate: -9.9 },
          { type: "image", src: "note_yellow.png", x: 28.1, y: 11.8, w: 249.4, h: 260.1, rotate: -5.7 },
          { type: "image", src: "squiggle_html.svg", x: 66.1, y: 141.5, w: 179.7, h: 28.9, rotate: -2.8 },
          { type: "text", text: "HTML", x: 51.3, y: 113.4, w: 202.2, h: 27, rotate: -2.9 },
        ],
      },
      {
        label: "Flutter",
        x: 551.7, y: 498.2,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 1.7, y: 24.6, w: 258.2, h: 247, rotate: -4.7 },
          { type: "image", src: "note_pink.png", x: -2, y: 1.2, w: 282.9, h: 282.9, rotate: -0.5 },
          { type: "text", text: "Flutter", x: 83, y: 104.4, w: 121, h: 27, rotate: 7.2 },
          { type: "image", src: "line_flutter.svg", x: 49.1, y: 142.6, w: 176.1, h: 3.3, rotate: 8.4 },
        ],
      },
      {
        label: "Tailwind CSS",
        x: 1004.5, y: 61.4,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 13.2, y: 35.5, w: 212.8, h: 203.5, rotate: -13.3 },
          { type: "image", src: "note_blue.png", x: 26.3, y: 14.8, w: 203.1, h: 211.8, rotate: -9.1 },
          { type: "text", text: "Tailwind CSS", x: 47.1, y: 112.4, w: 160, h: 27, rotate: -8.1 },
        ],
      },
      {
        label: "React JS",
        x: 228.3, y: 327.3,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 14.7, y: 39.2, w: 233.1, h: 222.9, rotate: -13.5 },
          { type: "image", src: "note_blue.png", x: 29, y: 16.5, w: 222.5, h: 232, rotate: -9.3 },
          { type: "text", text: "React JS", x: 72.8, y: 117.4, w: 140, h: 27, rotate: -6.6 },
          { type: "image", src: "line_react.svg", x: 60.3, y: 155.3, w: 160.1, h: 3, rotate: -7.5 },
          { type: "image", src: "line_react_2.svg", x: 84.3, y: 157.9, w: 160.1, h: 1, rotate: -7.5 },
        ],
      },
      {
        label: "CSS",
        x: 302.4, y: 40.3,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: -1.6, y: 21.5, w: 213.2, h: 204, rotate: -2.7 },
          { type: "image", src: "note_yellow.png", x: 14.3, y: 2.5, w: 203.6, h: 212.3, rotate: 1.4 },
          { type: "text", text: "CSS", x: 86.4, y: 97.2, w: 66, h: 27, rotate: 2.6 },
        ],
      },
      {
        label: "GitHub",
        x: 651, y: 0,
        layers: [
          { type: "shadow", src: "note_shadow.svg", x: 1.5, y: 20.8, w: 218.3, h: 208.8, rotate: -4.7 },
          { type: "image", src: "note_pink.png", x: -1.7, y: 1, w: 239.2, h: 239.1, rotate: -0.5 },
          { type: "text", text: "GitHub", x: 76.2, y: 88.5, w: 102, h: 27, rotate: 7.2 },
          { type: "image", src: "line_github.svg", x: 54.6, y: 117.1, w: 135, h: 3.3, rotate: 7.2 },
        ],
      },
    ],
  },
];
