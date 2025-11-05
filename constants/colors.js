// Pastel Color Palette for JLPT Master App

export const PastelColors = {
  // Primary Pastels
  primary: '#E8F4FD',        // Pastel Blue
  secondary: '#F0E8FF',      // Pastel Purple
  accent: '#FFE8E8',         // Pastel Pink
  
  // Background Colors
  background: '#FEFEFE',     // Very Light Gray
  cardBackground: '#FFFFFF', // Pure White
  
  // Header Colors
  headerPrimary: '#D4F4E7',  // Light Green for Dictionary
  headerSecondary: '#F0E8FF', // Pastel Purple
  headerAccent: '#FFE8E8',   // Pastel Pink
  
  // Button Colors
  buttonPrimary: '#B8E6B8',  // Pastel Green
  buttonSecondary: '#FFD1DC', // Pastel Pink
  buttonAccent: '#E0E6FF',   // Pastel Lavender
  buttonWarning: '#FFEB9C',  // Pastel Yellow
  buttonDanger: '#FFCCCB',   // Pastel Red
  
  // Text Colors
  textPrimary: '#4A4A4A',    // Soft Dark Gray
  textSecondary: '#6B6B6B',  // Medium Gray
  textLight: '#8A8A8A',      // Light Gray
  textWhite: '#FFFFFF',      // White
  
  // Status Colors
  success: '#C8E6C9',        // Pastel Green
  warning: '#FFF3CD',        // Pastel Yellow
  error: '#F8D7DA',          // Pastel Red
  info: '#D1ECF1',           // Pastel Cyan
  
  // JLPT Level Colors (Pastel)
  jlptN5: '#FFE4E6',         // Pastel Pink
  jlptN4: '#FFF4E6',         // Pastel Orange
  jlptN3: '#E8F5E8',         // Pastel Green
  jlptN2: '#E6F3FF',         // Pastel Blue
  jlptN1: '#F0E6FF',         // Pastel Purple
  
  // Category Colors (Pastel)
  vocabulary: '#FFE4E6',     // Pastel Pink
  kanji: '#E8F5E8',          // Pastel Green
  grammar: '#F0E6FF',        // Pastel Purple
  reading: '#FFF4E6',        // Pastel Orange
  listening: '#E6F3FF',      // Pastel Blue
  
  // Border Colors
  borderLight: '#F0F0F0',    // Very Light Gray
  borderMedium: '#E0E0E0',   // Light Gray
  borderDark: '#D0D0D0',     // Medium Gray
  
  // Shadow Colors
  shadowLight: 'rgba(0,0,0,0.05)',
  shadowMedium: 'rgba(0,0,0,0.1)',
  shadowDark: 'rgba(0,0,0,0.15)',
};

// Gradient Combinations
export const PastelGradients = {
  primaryGradient: ['#E8F4FD', '#F0E8FF'],
  secondaryGradient: ['#FFE8E8', '#FFF4E6'],
  accentGradient: ['#E8F5E8', '#E6F3FF'],
  backgroundGradient: ['#FEFEFE', '#F8F9FA'],
};

// Theme Configuration
export const PastelTheme = {
  colors: PastelColors,
  gradients: PastelGradients,
  
  // Common Styles
  card: {
    backgroundColor: PastelColors.cardBackground,
    borderRadius: 15,
    shadowColor: PastelColors.shadowMedium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  
  input: {
    backgroundColor: PastelColors.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PastelColors.borderLight,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
};
