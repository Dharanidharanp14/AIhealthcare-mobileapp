import { useTheme } from "../context/ThemeContext.js";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const MIN_YEAR = 1900;
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const YEARS_PER_PAGE = 12;

const CustomCalendar = ({
  visible,
  initialDate = null,
  onCancel,
  onConfirm,
}) => {
  const { colors: COLORS } = useTheme();
  const styles = createStyles(COLORS);
  const today = useMemo(() => new Date(), []);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const startDate = initialDate || new Date();
    return new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  });
  const [pendingDate, setPendingDate] = useState(initialDate);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [yearPageStart, setYearPageStart] = useState(
    () => Math.floor((initialDate || new Date()).getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE
  );

  useEffect(() => {
    if (!visible) return;

    const startDate = initialDate || new Date();
    setCalendarMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
    setPendingDate(initialDate);
    setYearPageStart(
      Math.floor(startDate.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE
    );
    setShowYearPicker(false);
  }, [initialDate, visible]);

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0
  ).getDate();
  const firstWeekday = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1
  ).getDay();
  const calendarCellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const calendarDays = Array.from({ length: calendarCellCount }, (_, index) => {
    const day = index - firstWeekday + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
  const years = Array.from(
    { length: YEARS_PER_PAGE },
    (_, index) => yearPageStart + index
  ).filter((year) => year >= MIN_YEAR && year <= today.getFullYear());

  const changeMonth = (amount) => {
    setPendingDate(null);
    setCalendarMonth((currentMonth) => {
      const nextMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + amount,
        1
      );
      if (nextMonth.getFullYear() < MIN_YEAR) {
        return currentMonth;
      }
      if (
        nextMonth.getFullYear() > today.getFullYear() ||
        (nextMonth.getFullYear() === today.getFullYear() &&
          nextMonth.getMonth() > today.getMonth())
      ) {
        return currentMonth;
      }
      return nextMonth;
    });
  };

  const selectYear = (year) => {
    setCalendarMonth(new Date(year, calendarMonth.getMonth(), 1));
    setPendingDate(null);
    setShowYearPicker(false);
  };

  const selectDate = () => {
    if (pendingDate) onConfirm(pendingDate);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.heading}>
            <View>
              <Text style={styles.eyebrow}>DATE OF BIRTH</Text>
              <Text style={styles.title}>Select a date</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Close calendar"
              onPress={onCancel}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={21} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          {showYearPicker ? (
            <>
              <View style={styles.monthNavigation}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Previous years"
                  disabled={yearPageStart <= MIN_YEAR}
                  onPress={() =>
                    setYearPageStart((start) =>
                      Math.max(MIN_YEAR, start - YEARS_PER_PAGE)
                    )
                  }
                  style={styles.monthArrow}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={
                      yearPageStart <= MIN_YEAR
                        ? COLORS.placeholder
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.monthTitle}>
                  {years[0]} – {years[years.length - 1]}
                </Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Next years"
                  disabled={yearPageStart + YEARS_PER_PAGE > today.getFullYear()}
                  onPress={() =>
                    setYearPageStart((start) =>
                      Math.min(
                        today.getFullYear(),
                        start + YEARS_PER_PAGE
                      )
                    )
                  }
                  style={styles.monthArrow}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={
                      yearPageStart + YEARS_PER_PAGE > today.getFullYear()
                        ? COLORS.placeholder
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.yearGrid}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    accessibilityRole="button"
                    accessibilityLabel={`Select year ${year}`}
                    accessibilityState={{
                      selected: year === calendarMonth.getFullYear(),
                    }}
                    onPress={() => selectYear(year)}
                    style={[
                      styles.yearCell,
                      year === calendarMonth.getFullYear() &&
                        styles.selectedCell,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        year === calendarMonth.getFullYear() &&
                          styles.selectedText,
                      ]}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <>
              <View style={styles.monthNavigation}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Previous month"
                  disabled={
                    calendarMonth.getFullYear() === MIN_YEAR &&
                    calendarMonth.getMonth() === 0
                  }
                  onPress={() => changeMonth(-1)}
                  style={styles.monthArrow}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={
                      calendarMonth.getFullYear() === MIN_YEAR &&
                      calendarMonth.getMonth() === 0
                        ? COLORS.placeholder
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Choose year"
                  onPress={() => {
                    setYearPageStart(
                      Math.floor(
                        calendarMonth.getFullYear() / YEARS_PER_PAGE
                      ) * YEARS_PER_PAGE
                    );
                    setShowYearPicker(true);
                  }}
                  style={styles.monthLabel}
                >
                  <Text style={styles.monthTitle}>
                    {calendarMonth.toLocaleDateString("en-US", {
                      month: "long",
                    })}
                  </Text>
                  <Text style={styles.yearLabel}>{calendarMonth.getFullYear()}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Next month"
                  disabled={
                    calendarMonth.getFullYear() === today.getFullYear() &&
                    calendarMonth.getMonth() === today.getMonth()
                  }
                  onPress={() => changeMonth(1)}
                  style={styles.monthArrow}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={
                      calendarMonth.getFullYear() === today.getFullYear() &&
                      calendarMonth.getMonth() === today.getMonth()
                        ? COLORS.placeholder
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.weekdayRow}>
                {WEEKDAYS.map((day) => (
                  <Text key={day} style={styles.weekday}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.calendarGrid}>
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return (
                      <View key={`empty-${index}`} style={styles.dayCell} />
                    );
                  }

                  const dayDate = new Date(
                    calendarMonth.getFullYear(),
                    calendarMonth.getMonth(),
                    day
                  );
                  const isFuture = dayDate > today;
                  const isSelected =
                    pendingDate &&
                    pendingDate.getFullYear() === dayDate.getFullYear() &&
                    pendingDate.getMonth() === dayDate.getMonth() &&
                    pendingDate.getDate() === dayDate.getDate();
                  const isToday =
                    today.getFullYear() === dayDate.getFullYear() &&
                    today.getMonth() === dayDate.getMonth() &&
                    today.getDate() === dayDate.getDate();

                  return (
                    <TouchableOpacity
                      key={`day-${day}`}
                      accessibilityRole="button"
                      accessibilityLabel={dayDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      accessibilityState={{
                        selected: Boolean(isSelected),
                        disabled: isFuture,
                      }}
                      disabled={isFuture}
                      onPress={() => setPendingDate(dayDate)}
                      style={[
                        styles.dayCell,
                        isSelected && styles.selectedCell,
                        isToday && !isSelected && styles.todayCell,
                        isFuture && styles.disabledCell,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected && styles.selectedText,
                          isFuture && styles.disabledText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          <View style={styles.footer}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={onCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            {!showYearPicker && (
              <TouchableOpacity
                accessibilityRole="button"
                disabled={!pendingDate}
                onPress={selectDate}
                style={[
                  styles.confirmButton,
                  !pendingDate && styles.disabledConfirmButton,
                ]}
              >
                <Text style={styles.confirmText}>Select date</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomCalendar;

const createStyles = (COLORS) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.overlayBlue,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    padding: 20,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  eyebrow: {
    color: COLORS.gray,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 4,
    color: COLORS.darkText,
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: COLORS.inputBackground,
  },
  monthNavigation: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  monthArrow: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: COLORS.softBlue,
  },
  monthLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 5,
  },
  monthTitle: {
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: "700",
  },
  yearLabel: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekday: {
    width: "14.2857%",
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.2857%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
  selectedCell: {
    backgroundColor: COLORS.primary,
  },
  todayCell: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledCell: {
    opacity: 0.45,
  },
  dayText: {
    color: COLORS.darkText,
    fontSize: 14,
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: "700",
  },
  disabledText: {
    color: COLORS.placeholder,
  },
  yearGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8,
  },
  yearCell: {
    width: "25%",
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.inputBackground,
  },
  cancelText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "600",
  },
  confirmButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  disabledConfirmButton: {
    opacity: 0.45,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
