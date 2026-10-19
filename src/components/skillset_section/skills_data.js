// Sticky-note layout of the skillset section, taken from the Figma design
// (page "Second iteration", frame "main"). Sizes are Figma px, converted to rem when rendered.
//
// Every box is { x, y, w, h, rotate }: position and size before rotation, relative to its
// parent (the cluster for titles and notes, the note for its layers), then rotated in degrees
// around its centre. Images live in public/skillset/.

export const SKILL_CLUSTERS = [
  {
    id: "design",
    height: 688.6,
    title: [
      { type: "text", text: "DESIGN", font: "poppins", weight: 300, fontSize: 49.1, x: 671, y: 286, w: 189, h: 74.3 },
      { type: "image", src: "title_design_underline.svg", x: 670.9, y: 363.6, w: 189, h: 9.8, rotate: -1.4 },
    ],
    notes: [
      {
        label: "Adobe After Effects",
        x: 966.4, y: 328.9, w: 246.6, h: 255.2,
        layers: [
          { type: "shadow", src: "shadow_after_effects.svg", x: 17.7, y: 43.9, w: 206.2, h: 198.4, rotate: -12.6 },
          { type: "image", src: "paper_yellow_pale.png", x: 27.8, y: 21.3, w: 195.5, h: 211.7, rotate: -10.8 },
          { type: "text", text: "Adobe After\nEffects", font: "plamenas", fontSize: 31.9, x: 35.8, y: 105.6, w: 189.8, h: 56, rotate: -9.7 },
        ],
      },
      {
        label: "Adobe InDesign",
        x: 880.1, y: 25.6, w: 264.5, h: 275.9,
        layers: [
          { type: "shadow", src: "shadow_indesign.svg", x: 26, y: 42.9, w: 197.9, h: 206, rotate: 6 },
          { type: "image", src: "paper_pink.png", x: 36, y: 31.1, w: 195.1, h: 211.3, rotate: 7.4 },
          { type: "text", text: "Adobe\nInDesign", font: "plamenas", fontSize: 31.7, color: "#262020", x: 40.6, y: 109.6, w: 188.5, h: 56, rotate: 19.8 },
          { type: "image", src: "line_indesign.svg", x: 48.1, y: 160.4, w: 139.4, h: 2.6, rotate: 16.4 },
          { type: "image", src: "line_indesign_2.svg", x: 66.6, y: 171, w: 139.4, h: 0.9, rotate: 16.4 },
        ],
      },
      {
        label: "Adobe Illustrator",
        x: 365.9, y: 0, w: 305.3, h: 308.7,
        layers: [
          { type: "shadow", src: "shadow_illustrator.svg", x: 37, y: 63.9, w: 220.2, h: 211.4, rotate: -22.2 },
          { type: "image", src: "paper_blue.png", x: 44.5, y: 35.2, w: 219.1, h: 237.2, rotate: -18.2 },
          { type: "text", text: "Adobe\nIllustrator", font: "plamenas", fontSize: 35.9, x: 55, y: 120.6, w: 213.1, h: 62, rotate: -13.1 },
          { type: "image", src: "line_illustrator.svg", x: 81.4, y: 184.1, w: 157.7, h: 3, rotate: -16.4 },
          { type: "image", src: "line_illustrator_2.svg", x: 104.9, y: 183, w: 157.7, h: 1, rotate: -16.4 },
        ],
      },
      {
        label: "Adobe Photoshop",
        x: 602.1, y: 435.3, w: 247.9, h: 253.2,
        layers: [
          { type: "shadow", src: "shadow_photoshop.svg", x: 23.2, y: 40.3, w: 194, h: 183.8, rotate: -19.3 },
          { type: "image", src: "paper_blue.png", x: 35.2, y: 26.8, w: 182.8, h: 197.9, rotate: -16.7 },
          { type: "text", text: "Adobe\nPhotoshop", font: "plamenas", fontSize: 29.9, x: 39.2, y: 90.6, w: 177.8, h: 52, rotate: -15.7 },
          { type: "image", src: "line_photoshop.svg", x: 64.5, y: 151.4, w: 131.6, h: 2.5, rotate: -15 },
          { type: "image", src: "line_photoshop_2.svg", x: 84.2, y: 151, w: 131.6, h: 0.8, rotate: -15 },
        ],
      },
      {
        label: "Figma",
        x: 207.7, y: 311.2, w: 311, h: 320.9,
        layers: [
          { type: "shadow", src: "shadow_figma.svg", x: 38.2, y: 59, w: 221.1, h: 221.7, rotate: 13.4 },
          { type: "image", src: "paper_pink.png", x: 50.6, y: 43.9, w: 213.2, h: 230.8, rotate: 14.7 },
          { type: "image", src: "ellipse_figma.svg", x: 74.7, y: 123.3, w: 158.9, h: 70.6, rotate: 17.7 },
          { type: "text", text: "Figma", font: "plamenas", fontSize: 38.5, x: 114.1, y: 143.6, w: 92, h: 34, rotate: 8.1 },
        ],
      },
    ],
  },
  {
    id: "ux-ui",
    height: 830.3,
    title: [
      { type: "text", text: "UX/ UI DESIGN", font: "poppins", weight: 300, fontSize: 45, x: 580.8, y: 303.2, w: 369, h: 204 },
      { type: "image", src: "title_ux_squiggle.svg", x: 600.4, y: 456.6, w: 329.7, h: 54.6, rotate: -2.8 },
    ],
    notes: [
      {
        label: "Researching",
        x: 587.9, y: 0, w: 342.8, h: 350.3,
        layers: [
          { type: "shadow", src: "shadow_researching.svg", x: 52.1, y: 77.6, w: 225.9, h: 216.1, rotate: -1.5 },
          { type: "image", src: "paper_yellow_taped.png", x: 69.3, y: 57.8, w: 215.6, h: 224.8, rotate: 2.7 },
          { type: "text", text: "Researching", font: "plamenas", fontSize: 31, x: 79.2, y: 170.5, w: 195.7, h: 27, rotate: 4.5 },
          { type: "image", src: "ellipse_note.svg", x: 73.2, y: 147.3, w: 200.9, h: 69.2, rotate: 1.7 },
        ],
      },
      {
        label: "Wireframing / Prototyping",
        x: 1005.1, y: 99.9, w: 269.5, h: 267.8,
        layers: [
          { type: "shadow", src: "shadow_wireframing.svg", x: 18.5, y: 32.3, w: 223.7, h: 217, rotate: -14.2 },
          { type: "image", src: "marker_pink_wireframing.png", x: 23, y: 11.6, w: 233.9, h: 217.5, rotate: -5.7 },
          { type: "text", text: "Wireframing", font: "plamenas", fontSize: 30.5, color: "#261e1e", x: 23.5, y: 85, w: 211.1, h: 27, rotate: -8.8 },
          { type: "text", text: "Prototyping", font: "plamenas", fontSize: 30.5, color: "#262020", x: 38.4, y: 155.7, w: 211.1, h: 27, rotate: -7 },
          { type: "image", src: "line_wireframing.svg", x: 54.5, y: 129.6, w: 156.2, h: 3, rotate: -8 },
        ],
      },
      {
        label: "Gamification",
        x: 97, y: 326.3, w: 304.9, h: 315.2,
        layers: [
          { type: "shadow", src: "shadow_gamification.svg", x: 18.4, y: 63.5, w: 234.8, h: 224.6, rotate: 7 },
          { type: "image", src: "marker_blue_gamification.png", x: 28.9, y: 39.8, w: 245.4, h: 246.6, rotate: 13.6, opacity: 0.8 },
          { type: "text", text: "Gamification", font: "plamenas", fontSize: 31, color: "#121719", x: 37.3, y: 151.2, w: 230.6, h: 27, rotate: 10.7 },
          { type: "image", src: "line_gamification.svg", x: 51.3, y: 198, w: 170.6, h: 3.2, rotate: 11.5 },
          { type: "image", src: "line_gamification_2.svg", x: 74.8, y: 209.1, w: 170.6, h: 1.1, rotate: 11.5 },
          { type: "tape", x: 138.1, y: 43.7, w: 90.6, h: 26, rotate: 41.1, opacity: 0.8 },
        ],
      },
      {
        label: "User Testing",
        x: 1103.3, y: 309, w: 356.3, h: 360.8,
        layers: [
          { type: "shadow", src: "shadow_user_testing.svg", x: 46.1, y: 71.7, w: 244, h: 248.9, rotate: -10.5 },
          { type: "image", src: "marker_blue_user_testing.png", x: 49.3, y: 48, w: 257.7, h: 264.9, rotate: -1.9, opacity: 0.8 },
          { type: "text", text: "User Testing", font: "plamenas", fontSize: 35.5, x: 82.7, y: 166.1, w: 192, h: 31, rotate: -7.4 },
          { type: "tape", x: 164.6, y: 47.2, w: 90.6, h: 26, rotate: 0.5, opacity: 0.8 },
        ],
      },
      {
        label: "Journey Mapping",
        x: 851.4, y: 586, w: 187.2, h: 178.6,
        layers: [
          { type: "shadow", src: "shadow_journey_mapping.svg", x: 7.6, y: 20.9, w: 149.1, h: 153.3, rotate: 3.6 },
          { type: "image", src: "marker_green_journey_mapping.png", x: 15.4, y: 16.6, w: 156.4, h: 145.4, rotate: 12.3 },
          { type: "text", text: "Journey\nMapping", font: "plamenas", fontSize: 31, x: 16.8, y: 63, w: 146.1, h: 54, rotate: 7.2 },
        ],
      },
      {
        label: "Design Systems",
        x: 232.4, y: 71, w: 305.1, h: 298.5,
        layers: [
          { type: "shadow", src: "shadow_design_systems.svg", x: 42.8, y: 56.3, w: 207.9, h: 198.9, rotate: -13.9 },
          { type: "image", src: "marker_pink_design_systems.png", x: 51.4, y: 55.5, w: 202.4, h: 187.5, rotate: -5.7 },
          { type: "text", text: "Design\nSystems", font: "poppins", weight: 600, fontSize: 21.5, x: 87.7, y: 118.7, w: 127, h: 64, rotate: -10.3 },
          { type: "image", src: "ellipse_note.svg", x: 47.2, y: 109.5, w: 200.9, h: 69.2, rotate: -23.6 },
        ],
      },
      {
        label: "Interaction Design",
        x: 430.7, y: 523.4, w: 305.4, h: 306.9,
        layers: [
          { type: "shadow", src: "shadow_interaction_design.svg", x: 46, y: 59.4, w: 206.8, h: 197.9, rotate: -13 },
          { type: "image", src: "marker_red_interaction_design.png", x: 51.8, y: 48.9, w: 205, h: 206, rotate: 175, opacity: 0.8 },
          { type: "text", text: "Interaction\nDesign", font: "plamenas", fontSize: 31, color: "#0f0f0f", x: 57.7, y: 119.3, w: 192.1, h: 54, rotate: -8.1 },
          { type: "tape", x: 121.1, y: 39.4, w: 85, h: 24.1, rotate: 7.4, opacity: 0.8 },
        ],
      },
    ],
  },
  {
    id: "development",
    height: 807.9,
    title: [
      { type: "text", text: "DEVELOPMENT", font: "poppins", weight: 300, fontSize: 45, x: 561.8, y: 265.6, w: 369, h: 204 },
      { type: "image", src: "title_development_ellipse.svg", x: 555.2, y: 286.1, w: 333.2, h: 159.7, rotate: -8.7 },
    ],
    notes: [
      {
        label: "HTML",
        x: 936, y: 315.2, w: 363, h: 373.3,
        layers: [
          { type: "shadow", src: "shadow_html.svg", x: 47.1, y: 69, w: 246.2, h: 256.1, rotate: -8 },
          { type: "image", src: "paper_yellow.png", x: 57.8, y: 51.8, w: 249.4, h: 270.1, rotate: -5.7 },
          { type: "image", src: "squiggle_html.svg", x: 96.3, y: 196.3, w: 179.7, h: 28.9, rotate: -2.8 },
          { type: "text", text: "HTML", font: "poppins", weight: 500, fontSize: 31.2, x: 81, y: 148.3, w: 202.2, h: 46.9, rotate: -2.9 },
        ],
      },
      {
        label: "Flutter",
        x: 547, y: 494.6, w: 296.8, h: 313.3,
        layers: [
          { type: "shadow", src: "shadow_github.svg", x: 10.2, y: 40.2, w: 254.6, h: 243.6, rotate: -2.3 },
          { type: "image", src: "paper_pink.png", x: 25.1, y: 23.2, w: 246.5, h: 266.8, rotate: -0.5 },
          { type: "text", text: "Flutter", font: "poppins", fontSize: 34.1, color: "#262020", x: 87.7, y: 119.4, w: 121, h: 51, rotate: 7.2 },
          { type: "image", src: "line_flutter.svg", x: 52.3, y: 181.6, w: 176.1, h: 3.3, rotate: 8.4 },
        ],
      },
      {
        label: "Tailwind CSS",
        x: 1002.5, y: 75.6, w: 253.5, h: 262.6,
        layers: [
          { type: "shadow", src: "shadow_tailwind.svg", x: 18.3, y: 33.7, w: 214.6, h: 213.9, rotate: -13.1 },
          { type: "image", src: "paper_blue.png", x: 28.3, y: 19.9, w: 203.1, h: 219.9, rotate: -9.1 },
          { type: "text", text: "Tailwind CSS", font: "poppins", fontSize: 22.6, x: 49.1, y: 118.1, w: 160, h: 34, rotate: -8.1 },
        ],
      },
      {
        label: "React JS",
        x: 225.2, y: 340.6, w: 278.7, h: 286.6,
        layers: [
          { type: "shadow", src: "shadow_react.svg", x: 17.7, y: 43.5, w: 221, h: 210.8, rotate: -12.4 },
          { type: "image", src: "paper_blue.png", x: 32, y: 22.1, w: 222.5, h: 240.9, rotate: -9.3 },
          { type: "text", text: "React JS", font: "poppins", fontSize: 29.4, x: 75.8, y: 119, w: 140, h: 44, rotate: -6.6 },
          { type: "image", src: "line_react.svg", x: 64.4, y: 173.9, w: 160.1, h: 3, rotate: -7.5 },
          { type: "image", src: "line_react_2.svg", x: 88.3, y: 176.5, w: 160.1, h: 1, rotate: -7.5 },
        ],
      },
      {
        label: "CSS",
        x: 310.8, y: 59.6, w: 212.2, h: 226.2,
        layers: [
          { type: "shadow", src: "shadow_css.svg", x: -5.2, y: 19.3, w: 207.3, h: 212.2, rotate: -0.9 },
          { type: "image", src: "paper_yellow.png", x: 6, y: 2.5, w: 203.6, h: 220.4, rotate: 1.4 },
          { type: "text", text: "CSS", font: "poppins", fontSize: 31.2, x: 78, y: 91.3, w: 66, h: 47, rotate: 2.6 },
        ],
      },
      {
        label: "GitHub",
        x: 640.7, y: 0, w: 257.2, h: 265.4,
        layers: [
          { type: "shadow", src: "shadow_github.svg", x: 15, y: 34.5, w: 215.2, h: 206, rotate: -2.3 },
          { type: "image", src: "paper_pink.png", x: 27.6, y: 20.2, w: 208.3, h: 225.6, rotate: -0.5 },
          { type: "text", text: "GitHub", font: "poppins", fontSize: 27.1, color: "#262020", x: 86.5, y: 104.8, w: 102, h: 41, rotate: 7.2 },
          { type: "image", src: "line_github.svg", x: 64, y: 147.2, w: 135, h: 3.3, rotate: 7.2 },
        ],
      },
    ],
  },
];
