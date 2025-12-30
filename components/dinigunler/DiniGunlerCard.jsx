import { memo, useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Constants
const FONT_FAMILY = 'Plus Jakarta Sans';

// Design specs (based on 390px design width)
const DESIGN_WIDTH = 390;
const DESIGN_CARD_HEIGHT = 132;
const DESIGN_PADDING = 20;

// Card dimensions from Figma
const CARD_BORDER_RADIUS = 20;  // Radius: 20px
const CARD_BORDER_WIDTH = 0.5;  // Border: 0.5px
const ICON_SIZE = 20;
const TITLE_FONT_SIZE = 18;
const DESCRIPTION_FONT_SIZE = 12;
const DATE_FONT_SIZE = 13;

/**
 * Format remaining days text
 */
const formatRemainingDays = (days) => {
  if (days === 0) return 'Bugün';
  if (days === 1) return '1 Gün';
  return `${days} Gün`;
};

/**
 * Get icon name based on day type
 */
const getIconName = (iconKey) => {
  const iconMap = {
    moon: 'moon',
    calendar: 'calendar',
    star: 'star',
    sunny: 'sunny',
    time: 'time',
    gift: 'gift',
    heart: 'heart',
    sparkles: 'sparkles',
    rocket: 'rocket',
    water: 'water',
  };
  return iconMap[iconKey] || 'calendar';
};

const DiniGunlerCard = memo(({ day }) => {
  // Get current window dimensions for responsive sizing
  const { width: screenWidth } = useWindowDimensions();

  // Responsive calculations
  const scale = screenWidth / DESIGN_WIDTH;
  const cardWidth = screenWidth - (DESIGN_PADDING * 2); // Full width minus padding
  const cardMinHeight = Math.max(DESIGN_CARD_HEIGHT, DESIGN_CARD_HEIGHT * scale);
  const cardPadding = Math.max(14, 16 * scale);
  const rightWidth = Math.min(110, screenWidth * 0.28);
  const lineWidth = Math.min(60, screenWidth * 0.15);
  const kalanSureFontSize = Math.max(13, Math.min(16, 14 * scale));
  const gunSayisiFontSize = Math.max(22, Math.min(28, 26 * scale));

  // Memoize icon to prevent unnecessary lookups
  const iconName = useMemo(() => getIconName(day.icon), [day.icon]);

  // Memoize remaining days text
  const remainingText = useMemo(
    () => formatRemainingDays(day.remainingDays),
    [day.remainingDays]
  );

  // Check if it's today
  const isToday = day.remainingDays === 0;

  // Dynamic card style
  const cardStyle = useMemo(() => ({
    width: cardWidth,
    minHeight: cardMinHeight,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // #FFFFFF 5%
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: CARD_BORDER_WIDTH,
    borderColor: 'rgba(255, 255, 255, 0.5)', // #FFFFFF 50%
    paddingVertical: cardPadding,
    paddingHorizontal: cardPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }), [cardWidth, cardMinHeight, cardPadding]);

  // Dynamic right content style
  const rightContentStyle = useMemo(() => ({
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: rightWidth,
  }), [rightWidth]);

  // Dynamic line style
  const lineStyle = useMemo(() => ({
    width: lineWidth,
    height: 1,
    backgroundColor: '#FFBA4A',
    marginBottom: 4,
  }), [lineWidth]);

  // Dynamic font styles
  const remainingLabelStyle = useMemo(() => ({
    fontFamily: FONT_FAMILY,
    color: '#FFBA4A',
    fontSize: kalanSureFontSize,
    marginBottom: 4,
  }), [kalanSureFontSize]);

  const remainingDaysStyle = useMemo(() => ({
    fontFamily: FONT_FAMILY,
    color: isToday ? '#4ADE80' : '#FFBA4A',
    fontSize: gunSayisiFontSize,
    fontWeight: '700',
  }), [gunSayisiFontSize, isToday]);

  return (
    <View style={cardStyle}>
      {/* Left Content */}
      <View style={styles.leftContent}>
        {/* Title Row */}
        <View style={styles.titleRow}>
          <Ionicons name={iconName} size={ICON_SIZE} color="#FFFFFF" />
          <Text style={styles.dayTitle} numberOfLines={2}>
            {day.name}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{day.description}</Text>

        {/* Date Container */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel} numberOfLines={1}>
            Hicrî Takvim :{' '}
            <Text style={styles.dateValue}>{day.hijriDate}</Text>
          </Text>
          <View style={styles.dateDivider} />
          <Text style={styles.dateLabel} numberOfLines={1}>
            Miladî Takvim :{' '}
            <Text style={styles.dateValue}>{day.gregorianDate}</Text>
          </Text>
        </View>
      </View>

      {/* Right Content */}
      <View style={rightContentStyle}>
        <View style={styles.remainingContainer}>
          <Text style={remainingLabelStyle}>Kalan Süre</Text>
          <View style={lineStyle} />
        </View>
        <Text style={remainingDaysStyle}>
          {remainingText}
        </Text>
      </View>
    </View>
  );
});

DiniGunlerCard.displayName = 'DiniGunlerCard';

const styles = StyleSheet.create({
  leftContent: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  dayTitle: {
    fontFamily: FONT_FAMILY,
    color: '#FFFFFF',
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '700',
    flex: 1,
  },
  description: {
    fontFamily: FONT_FAMILY,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: DESCRIPTION_FONT_SIZE,
    lineHeight: 16,
    marginBottom: 16,
  },
  dateContainer: {
    gap: 6,
  },
  dateDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateLabel: {
    fontFamily: FONT_FAMILY,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: DATE_FONT_SIZE,
  },
  dateValue: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  remainingContainer: {
    alignItems: 'center',
  },
});

export default DiniGunlerCard;

