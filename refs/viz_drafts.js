//step 1) get an array of all the senators with oil and gas as donors
let oilmen = senators.filter(sen => {
  if (!sen.crp.candIndustry) return false;
  return sen.crp.candIndustry.industry.filter(
    ind => ind['@attributes'].industry_name === 'Oil & Gas'
  ).length;
});

//step 2) sort the array by sen.crp.candIndustry.industry.filter( ind => ind['@attributes'].industry_name === 'Oil & Gas' )[0]['@attributes'].total
let filterer = sen => {
  return Number(
    sen.crp.candIndustry.industry.filter(
      ind => ind['@attributes'].industry_name === 'Oil & Gas'
    )[0]['@attributes'].total
  );
};

oilmen.sort((b, a) => filterer(a) - filterer(b));

//// age viz draft

const _calculateAge = birthday => {
  // birthday is a date
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

senators.sort(
  (a, b) => _calculateAge(new Date(a.dob)) - _calculateAge(new Date(b.dob))
);
