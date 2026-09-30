const getDateKey = (daysFromToday) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const appointments = [
  {
    id: "demo-appointment-1",
    date: getDateKey(0),
    time: "10:30 AM",
    doctorName: "Dr. Olivia Turner",
    description: "Follow-up consultation",
  },
  {
    id: "demo-appointment-2",
    date: getDateKey(3),
    time: "2:00 PM",
    doctorName: "Dr. Alexander Bennett",
    description: "Dermatology consultation",
  },
  {
    id: "demo-appointment-3",
    date: getDateKey(7),
    time: "9:15 AM",
    doctorName: "Dr. Sophia Martinez",
    description: "Skin care consultation",
  },
];

export default appointments;
