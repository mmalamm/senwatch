const _calculateAge = (birthday) => { // birthday is a date
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const zodiacObj = {
  'scorpio':'♏',
  'libra':'♎',
  'virgo':'♍',
  'leo':'♌',
  'cancer':'♋',
  'gemini':'♊',
  'pisces':'♓',
  'aquarius':'♒',
  'capricorn':'♑',
  'sagittarius':'♐',
  'taurus':'♉',
  'aries':'♈'
};

const _calculateZodiac = (birthday) => {
  let value;
  let month = birthday.getMonth() + 1;
  let date = birthday.getDate();

  if (month == 1 && date >=20 || month == 2 && date <=18) {value = "aquarius";}
  if (month == 2 && date >=19 || month == 3 && date <=20) {value = "pisces";}
  if (month == 3 && date >=21 || month == 4 && date <=19) {value = "aries";}
  if (month == 4 && date >=20 || month == 5 && date <=20) {value = "taurus";}
  if (month == 5 && date >=21 || month == 6 && date <=21) {value = "gemini";}
  if (month == 6 && date >=22 || month == 7 && date <=22) {value = "cancer";}
  if (month == 7 && date >=23 || month == 8 && date <=22) {value = "leo";}
  if (month == 8 && date >=23 || month == 9 && date <=22) {value = "virgo";}
  if (month == 9 && date >=23 || month == 10 && date <=22) {value = "libra";}
  if (month == 10 && date >=23 || month == 11 && date <=21) {value = "scorpio";}
  if (month == 11 && date >=22 || month == 12 && date <=21) {value = "sagittarius";}
  if (month == 12 && date >=22 || month == 1 && date <=19) {value = "capricorn";}

  return value;
};

const _renderGender = (gender) => {
  switch (gender) {
    case 'M':
      return '♂';
    case 'F':
      return '♀';
    default:
      return 'non-binary';
  }
};

const personalInfo = (sen) => {
  let { dob, gender } = sen;
  let formatDate = dob.replace(/-/g,'/');
  let senDOB = new Date(formatDate + ' EST');
  let age = _calculateAge(senDOB);
  let zodiac = _calculateZodiac(senDOB);
  let genderSym = _renderGender(gender);
  return `Gender:${genderSym} <span class='zodiac' zod=${zodiac[0].toUpperCase() + zodiac.slice(1)} gen=${gender} dob=${dob}>
    Age: ${age} - ${zodiacObj[zodiac]}
  </span>`;
};

export default personalInfo;


// `<span class='zodiac' zod=${zodiac[0].toUpperCase() + zodiac.slice(1)} gen=${gender} dob=${dob}>${age}${genderSym}${zodiacObj[zodiac]}</span>`
