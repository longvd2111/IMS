// convert to date
const convertToDay = (timeArray) => {
  // Kiểm tra xem timeArray có tồn tại và có ít nhất 5 phần tử
  if (!timeArray || timeArray.length < 5) {
    return "Invalid date";
  }

  const date = new Date(
    timeArray[0], // Năm
    timeArray[1] - 1, // Tháng (giảm 1 vì tháng trong JS bắt đầu từ 0)
    timeArray[2], // Ngày
    timeArray[3], // Giờ
    timeArray[4] // Phút
  );

  // Chuyển đổi thành chuỗi theo định dạng mong muốn
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const convertToHour = (timeArray) => {
  const date = new Date(
    timeArray[0], // Năm
    timeArray[1] - 1, // Tháng (giảm 1 vì tháng trong JS bắt đầu từ 0)
    timeArray[2], // Ngày
    timeArray[3], // Giờ
    timeArray[4] // Phút
  );
  // Chuyển đổi thành chuỗi theo định dạng mong muốn

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatDayFromApi = (timeArray) => {
  if (!timeArray || timeArray.length < 5) {
    return "Invalid date";
  }

  const date = new Date(
    timeArray[0], // Năm
    timeArray[1] - 1, // Tháng (giảm 1 vì tháng trong JS bắt đầu từ 0)
    timeArray[2], // Ngày
    timeArray[3], // Giờ
    timeArray[4] // Phút
  );

  // Chuyển đổi thành chuỗi theo định dạng mong muốn
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

const isValidDOB = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  return birthDate < today;
};

export {
  convertToDay,
  convertToHour,
  isValidEmail,
  isValidPhone,
  isValidDOB,
  formatDayFromApi,
};
